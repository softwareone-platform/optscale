import logging
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Any, Dict, List, Tuple
from datetime import datetime, date, timedelta

from tools.cloud_adapter.cloud import Cloud as CloudAdapter
from tools.cloud_adapter.clouds.aws import Aws
from tools.optscale_time.optscale_time import startday

from bumiworker.bumiworker.modules.abandoned_base import S3AbandonedBucketsBase
from bumiworker.bumiworker.modules.constants import (
    PRICES,
    IT_MONITOR_FEE_PER_1000,
    RETURN_LIMIT,
    BYTES_PER_GIB,
    ACCESS_PATTERNS,
    IT_POSITIVE_STATUS,
    FREQUENT_TIER_THRESHOLD_DAYS,
    INFREQUENT_TIER_THRESHOLD_DAYS,
)

BYTES_IN_GB = 1024 ** 3
CHUNK_SIZE = 200
LOG = logging.getLogger(__name__)


def _current_monthly_cost(total_gb: float,
                          tiers_gb: List[Tuple[str, float]]) -> float:
    """
    Estimate current monthly storage cost for the bucket.
    - If we have per-tier breakdown (tiers_gb), sum gb * PRICES[tier].
    - Otherwise, assume all at Standard price.
    """
    if tiers_gb:
        cost = 0.0
        for item in tiers_gb:
            name, size_gb = item
            price = PRICES.get(name, PRICES["Standard"])
            cost += size_gb * price
        return cost
    return total_gb * PRICES["Standard"]


def _classify_access_tier_from_last_checked(last_checked: Any, today: date) -> str:
    """
    Infer access pattern ('frequent' | 'infrequent' | 'archive') from recency:
      - ≤ 30 days since most recent 'last_checked'  -> 'frequent'
      - 31–60 days                                   -> 'infrequent'
      - > 60 days or no dates                        -> 'archive'
    """
    if not last_checked:
        return ACCESS_PATTERNS[2]
    most_recent = max(last_checked)
    delta = (today - most_recent).days
    if delta <= FREQUENT_TIER_THRESHOLD_DAYS:
        return ACCESS_PATTERNS[0]
    elif delta <= INFREQUENT_TIER_THRESHOLD_DAYS:
        return ACCESS_PATTERNS[1]
    else:
        return ACCESS_PATTERNS[2]


def _it_price_per_gb_for_access_tier(access_tier: str) -> float:
    """
    Map inferred access class to the corresponding IT storage price.
    """
    tier = (access_tier or "").lower()
    if tier == ACCESS_PATTERNS[1]:
        return PRICES["IT_IA"]
    if tier == ACCESS_PATTERNS[2]:
        return PRICES["IT_AIA"]
    return PRICES["IT_FA"]


def _intelligent_tiering_cost_by_access(total_gb: float, eligible_objects: int, access_tier: str) -> float:
    """
    Project monthly cost under S3 Intelligent-Tiering for a bucket:
      IT storage cost (per GB) + monitoring fee per 1,000 objects.

      cost_it = total_gb * IT_price(access_tier) + (objects / 1000) * IT_MONITOR_FEE_PER_1000
    """
    price_per_gb = _it_price_per_gb_for_access_tier(access_tier)
    storage = total_gb * price_per_gb
    monitor = float(eligible_objects) * IT_MONITOR_FEE_PER_1000
    return storage + monitor


class S3IntelligentTiering(S3AbandonedBucketsBase):
    """
    Identify S3 buckets that are good candidates for enabling Intelligent-Tiering
    and estimate the potential monthly saving.
    """
    SUPPORTED_CLOUD_TYPES = ["aws_cnr"]

    def __init__(self, organization_id, config_client, created_at):
        super().__init__(organization_id, config_client, created_at)
        self.option_ordered_map = {
            "excluded_pools": {
                "default": {},
                "clean_func": self.clean_excluded_pools},
            "skip_cloud_accounts": {"default": []},
        }

    def _aggregate_resources(self, cloud_account_id: str) -> List[Dict[str, Any]]:
        """
        Pull bucket docs for the given cloud account with only the fields we need
        for candidate selection and saving computation.
        """
        pipeline = [
            {"$match": {
                "resource_type": "Bucket",
                "cloud_account_id": cloud_account_id,
                "active": True,
                "deleted_at": 0
            }},
            {"$project": {
                "_id": 0,
                "resource_id": "$_id",
                "cloud_account_id": 1,
                "bucket_name": {"$ifNull": ["$name", "$cloud_resource_id"]},
                "it_status_bucket": "$meta.it_status_bucket",
                "pool_id": 1,
                "owner_id": "$owner_id",
                "employee_id": "$employee_id",
                "region": 1,
                "has_lifecycle": "$meta.has_lifecycle",
                "lifecycle_rules": "$meta.lifecycle_rules"
            }}
        ]
        return self.mongo_client.restapi.resources.aggregate(pipeline)

    def _aggregate_get_requests(self, cloud_account_id, start_date,
                                cloud_resource_ids):
        """
        Get `last_checked` dates for buckets by collecting expenses related to
        GetRequests metric.
        """
        return self.mongo_client.restapi.raw_expenses.aggregate([
            {
                "$match": {
                    "$and": [
                        {"resource_id": {"$in": cloud_resource_ids}},
                        {"cloud_account_id": cloud_account_id},
                        {"start_date": {"$gte": start_date}},
                        {"lineItem/Operation":  "GetObject"},
                    ]
                }
            },
            {
                "$group": {
                    "_id": "$resource_id",
                    "last_checked": {"$push": "$start_date"}
                }
            }
        ], allowDiskUse=True)

    @staticmethod
    def _bytes_to_gbs(value_bytes):
        return round(value_bytes / BYTES_IN_GB, 3)

    @staticmethod
    def _get_it_storage_size(aws: Aws, today: datetime, bucket: str,
                             region: str) -> List[Tuple[str, float]]:
        """
        Get BucketSizeBytes metrics from CloudWatch for IT storage candidates
        """
        storage_types = [
            'IntelligentTieringFAStorage',
            'IntelligentTieringIAStorage',
            'IntelligentTieringAAStorage',
            'IntelligentTieringAIAStorage',
            'IntelligentTieringDAAStorage',
        ]

        def _display_name(storage_type):
            mapping = {
                'IntelligentTieringFAStorage': 'IT_FA',
                'IntelligentTieringIAStorage': 'IT_IA',
                'IntelligentTieringAAStorage': 'IT_AA',
                'IntelligentTieringAIAStorage': 'IT_AIA',
                'IntelligentTieringDAAStorage': 'IT_DAA',
            }
            return mapping.get(storage_type, storage_type)

        tiers = []
        metric_queries = []
        for i, st in enumerate(storage_types):
            q_id = f"size_{i}"
            metric_queries.append({
                "Id": q_id,
                "MetricStat": {
                    "Metric": {
                        "Namespace": "AWS/S3",
                        "MetricName": "BucketSizeBytes",
                        "Dimensions": [
                            {"Name": "BucketName", "Value": bucket},
                            {"Name": "StorageType", "Value": st},
                        ],
                    },
                    "Period": 24 * 60 * 60,
                    "Stat": "Average",
                },
                "ReturnData": True,
            })
        metrics = aws.get_cloud_watch_metric_data(
            region, metric_queries, today,
            today - timedelta(days=2))
        for md in metrics.get("MetricDataResults", []):
            values = md.get("Values") or []
            if not values:
                continue
            storage = storage_types[int(md["Id"].split("_")[-1])]
            tiers.append((_display_name(storage), values[0]))
        return tiers

    def _candidates_and_savings(self,
                                region_candidates: Dict[str, List[str]],
                                buckets_map: Dict[str, Any],
                                aws: Aws,
                                today: datetime,
                                stats: Dict[str, int]) -> List[Tuple[str, float]]:
        """
        Core decision point: determine if bucket is an IT candidate and compute saving.

        Get number of objects and storage sizes per tier in bucket via s3
        client. Use CloudWatch for getting INTELLIGENT_TIERING storages sizes
        """
        buckets_data = {}
        result = []
        cw_clients = {
            region: aws.session.client("cloudwatch", region_name=region)
            for region in region_candidates
        }
        max_workers = min(20, sum(len(v) for v in region_candidates.values()))
        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            futures = []
            for region, buckets in region_candidates.items():
                cloudwatch = cw_clients[region]
                for bucket in buckets:
                    futures.append(executor.submit(
                        aws.get_bucket_storage_info, cloudwatch, bucket, ))
            for f in as_completed(futures):
                res = f.result()
                if res:
                    buckets_data.update(res)
        for bucket, data in buckets_data.items():
            total_gb = self._bytes_to_gbs(data["total_size_bytes"])
            object_count = data["object_count"]
            if total_gb <= 0 or object_count <= 0:
                stats["empty"] += 1
                continue
            tiers_bytes = data["tiers"]
            if "STANDARD" not in tiers_bytes:
                stats["no_standard_storage"] += 1
                continue
            if "INTELLIGENT_TIERING" in tiers_bytes:
                it_tiers = self._get_it_storage_size(
                    aws, today, bucket, buckets_map[bucket]["region"])
                tiers_bytes.pop("INTELLIGENT_TIERING")
                tiers_bytes.update(it_tiers)

            storage_price_map = {
                "STANDARD": "Standard",
                "STANDARD_IA": "Standard-IA",
                "ONEZONE_IA": "One Zone-IA",
                "REDUCED_REDUNDANCY": "RRS",
                "GLACIER": "Glacier",
                "GLACIER_IR": "Glacier Instant Retrieval",
                "DEEP_ARCHIVE": "Deep Archive",
                "INTELLIGENT_TIERING": "Intelligent Tiering",
            }
            tiers_gb = [(storage_price_map.get(k, k), self._bytes_to_gbs(v))
                        for k, v in tiers_bytes.items()]
            access_tier = buckets_map[bucket]["access_tier"]
            cost_now = _current_monthly_cost(total_gb, tiers_gb)
            cost_it = _intelligent_tiering_cost_by_access(
                total_gb, object_count, access_tier)
            saving = round(max(0.0, cost_now - cost_it), 2)
            if saving > 0:
                result.append((bucket, saving))
            else:
                stats["zero_savings"] += 1
        return result

    def _cloud_account_names(self) -> Dict[str, str]:
        """
        Best-effort mapping {cloud_account_id: cloud_account_name}.
        """
        try:
            out: Dict[str, str] = {}
            for a in self.get_cloud_accounts():
                if isinstance(a, str):
                    continue
                if isinstance(a, dict):
                    aid = a.get("id") or a.get("_id")
                    if aid:
                        out[aid] = a.get("name")
            return out
        except Exception:
            return {}

    def get(self, **kwargs) -> List[Dict[str, Any]]:
        """
        Iterate cloud accounts, fetch buckets, apply candidate logic,
        and return a list of candidate items with computed 'saving'.
        """
        options = self.get_options()
        excluded_pools = set((options.get("excluded_pools") or {}).keys())
        skip_accounts = set(options.get("skip_cloud_accounts") or [])
        ca_names = self._cloud_account_names()
        employees = self.get_employees()
        pools = self.get_pools()
        today = startday(datetime.now())
        stats = {
            "total_buckets": 0,
            "it_status": 0,
            "lifecycle_rules": 0,
            "frequent_access_tier": 0,
            "zero_savings": 0,
            "empty": 0,
            "no_standard_storage": 0
        }

        items: List[Dict[str, Any]] = []
        for ca_id, ca in self.get_cloud_accounts(
                supported_cloud_types=self.SUPPORTED_CLOUD_TYPES,
                skip_cloud_accounts=skip_accounts).items():
            buckets_map = {}
            docs = self._aggregate_resources(ca_id)
            for d in docs:
                stats["total_buckets"] += 1
                if excluded_pools and d.get("pool_id") in excluded_pools:
                    continue

                it_status = str(d.get("it_status_bucket", "")).lower()
                it_on = it_status in IT_POSITIVE_STATUS
                if it_on:
                    stats["it_status"] += 1
                    continue

                has_lifecycle_flag = bool(d.get("has_lifecycle"))
                lifecycle_rules = d.get("lifecycle_rules")
                if has_lifecycle_flag or (
                        isinstance(lifecycle_rules, list) and len(
                        lifecycle_rules) > 0):
                    stats["lifecycle_rules"] += 1
                    continue

                buckets_map[d["bucket_name"]] = d

            region_candidates = defaultdict(list)
            buckets = list(buckets_map.keys())
            for i in range(0, len(buckets), CHUNK_SIZE):
                chunk = buckets[i:i + CHUNK_SIZE]
                get_req_start_date = today - timedelta(days=60)
                get_requests = self._aggregate_get_requests(
                    ca_id, get_req_start_date, chunk)
                for data in get_requests:
                    bucket = data["_id"]
                    last_checked = data["last_checked"]
                    access_tier = _classify_access_tier_from_last_checked(
                        last_checked, today)
                    if access_tier == "frequent":
                        buckets_map.pop(bucket, None)
                        stats["frequent_access_tier"] += 1
                        continue
                    region = buckets_map[bucket]["region"]
                    buckets_map[bucket]["access_tier"] = access_tier
                    region_candidates[region].append(bucket)
                # add buckets with not used data
                empty_access_tier = _classify_access_tier_from_last_checked(
                    [], today)
                for bucket in chunk:
                    region = buckets_map.get(bucket, {}).get("region")
                    if region and bucket not in region_candidates[region]:
                        region_candidates[region].append(bucket)
                        buckets_map[bucket]["access_tier"] = empty_access_tier

            ca.update(ca["config"])
            aws = CloudAdapter.get_adapter(ca)
            eval_res = self._candidates_and_savings(
                region_candidates, buckets_map, aws, today, stats)
            for res in eval_res:
                bucket_name, saving = res
                bucket = buckets_map.get(bucket_name, {})
                items.append({
                    "resource_id": bucket.get("resource_id"),
                    "resource_name":  bucket.get("bucket_name"),
                    "cloud_resource_id":  bucket.get("bucket_name"),
                    "region": bucket.get("region"),
                    "cloud_account_id": bucket.get("cloud_account_id"),
                    "cloud_type": "aws_cnr",
                    "owner": self._extract_owner(
                        bucket.get("owner_id") or bucket.get("employee_id"),
                        employees),
                    "pool": self._extract_pool(bucket.get("pool_id"), pools),
                    "is_excluded": bucket.get("pool_id") in excluded_pools,
                    "is_with_intelligent_tiering": False,
                    "detected_at": self.created_at,
                    "cloud_account_name": ca_names.get(
                        bucket.get("cloud_account_id")),
                    "saving": saving,
                })
            LOG.error("[IT] Cloud account %s buckets statistics: %s",
                      ca_id, stats)
        return items


def main(organization_id, config_client, created_at, **kwargs):
    """
    Entry point used by the worker: returns (data, options, error).
    """
    mod = S3IntelligentTiering(organization_id, config_client, created_at)
    data = mod.get()
    options = mod.get_options()
    error = None
    return data, options, error


def get_module_email_name():
    return "S3 Intelligent-Tiering candidates"
