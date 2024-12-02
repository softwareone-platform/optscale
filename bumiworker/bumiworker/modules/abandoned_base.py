from collections import defaultdict
from datetime import datetime, timedelta, timezone
from bumiworker.bumiworker.modules.base import (
    ArchiveBase, ArchiveReason, ModuleBase, DAYS_IN_MONTH
)
from tools.optscale_time import utcnow, startday


class AbandonedBase(ModuleBase):
    def _get(self):
        raise NotImplementedError()

    def get_active_resources(self, cloud_account_ids, start_date,
                             resource_type):
        resources = self.mongo_client.restapi.resources.find({
            'cloud_account_id': {
                '$in': cloud_account_ids
            },
            'active': True,
            'resource_type': resource_type,
            'first_seen': {'$lt': int(start_date.timestamp())}
        })
        resources_by_account_map = {x: [] for x in cloud_account_ids}
        for res in resources:
            account_id = res['cloud_account_id']
            resources_by_account_map[account_id].append(res)
        return resources_by_account_map

    def get_avg_daily_expenses(self, resource_ids, start_date):
        today = startday(utcnow())
        start_date = startday(start_date)
        external_table = [{'id': r_id} for r_id in resource_ids]
        query = """
                    SELECT resource_id, sum(cost * sign), min(date)
                    FROM expenses
                    JOIN resources ON resource_id = resources.id
                        AND date >= %(start_date)s
                        AND date != %(today)s
                        AND cost != 0
                    GROUP BY resource_id
                """
        expenses = self.clickhouse_client.execute(
            query=query,
            external_tables=[{
                'name': 'resources',
                'structure': [('id', 'String')],
                'data': external_table
            }],
            params={
                'today': today,
                'start_date': start_date
            }
        )
        result = {}
        for expense in expenses:
            days = (today - expense[2]).days
            result[expense[0]] = (expense[1] / days)
        return result

    def get_month_saving_by_daily_avg_expenses(self, resource_ids, start_date):
        result = {}
        daily_expenses = self.get_avg_daily_expenses(resource_ids, start_date)
        for resource_id, expenses in daily_expenses.items():
            result[resource_id] = expenses * DAYS_IN_MONTH
        return result


class S3AbandonedBucketsBase(AbandonedBase):
    SUPPORTED_CLOUD_TYPES = []

    def _get_data_size_request_metrics(self, cloud_account_id,
                                       cloud_resource_ids, start_date,
                                       days_threshold):
        raise NotImplementedError

    @staticmethod
    def _are_below_thresholds(res_data_request_map, metric_threshold_map):
        resource_ids = []
        for res_id, data_request_map in res_data_request_map.items():
            if all(data_request_map.get(key, 0) <= threshold_value
                   for key, threshold_value in metric_threshold_map.items()):
                resource_ids.append(res_id)
        return resource_ids

    @staticmethod
    def metrics_result(data_req_map):
        raise NotImplementedError

    def get_metric_threshold_map(self):
        raise NotImplementedError

    @property
    def days_threshold(self):
        return self.get_options().get('days_threshold')

    @property
    def skip_cloud_accounts(self):
        return self.get_options().get('skip_cloud_accounts')

    @property
    def excluded_pools(self):
        return self.get_options().get('excluded_pools')

    def _get(self):
        now = utcnow()
        start_date = now - timedelta(days=self.days_threshold)

        cloud_accounts = self.get_cloud_accounts(self.SUPPORTED_CLOUD_TYPES,
                                                 self.skip_cloud_accounts)
        buckets_by_account = self.get_active_resources(
            list(cloud_accounts.keys()), start_date, 'Bucket')
        employees = self.get_employees()
        pools = self.get_pools()

        metric_threshold_map = self.get_metric_threshold_map()

        result = []
        for account in cloud_accounts.values():
            cloud_account_id = account['id']
            cloud_type = account['type']
            account_buckets = buckets_by_account[cloud_account_id]
            if account_buckets:
                bucket_cloud_resource_map = {
                    account_bucket['cloud_resource_id']: account_bucket
                    for account_bucket in account_buckets}
                res_data_request_map = self._get_data_size_request_metrics(
                    cloud_account_id, list(bucket_cloud_resource_map.keys()),
                    start_date, self.days_threshold)
                matched_res_ids = self._are_below_thresholds(
                    res_data_request_map, metric_threshold_map)
                matched_bucket_res_ids = [
                    bucket_cloud_resource_map[res_id]['_id']
                    for res_id in matched_res_ids]
                expenses = self.get_month_saving_by_daily_avg_expenses(
                    matched_bucket_res_ids, start_date)
                for cloud_res_id in matched_res_ids:
                    bucket = bucket_cloud_resource_map[cloud_res_id]
                    bucket_id = bucket['_id']
                    data_req_map = res_data_request_map[cloud_res_id]
                    saving = expenses.get(bucket_id, 0)
                    if saving > 0:
                        base_result_dict = {
                            'cloud_resource_id': bucket['cloud_resource_id'],
                            'resource_name': bucket.get('name'),
                            'resource_id': bucket_id,
                            'cloud_account_id': bucket['cloud_account_id'],
                            'cloud_type': cloud_type,
                            'cloud_account_name': account['name'],
                            'region': bucket.get('region'),
                            'owner': self._extract_owner(
                                bucket.get('employee_id'), employees),
                            'pool': self._extract_pool(
                                bucket.get('pool_id'), pools),
                            'is_excluded': bucket.get(
                                'pool_id') in self.excluded_pools,
                            'saving': saving
                        }
                        base_result_dict.update(
                            self.metrics_result(data_req_map))
                        result.append(base_result_dict)
        return result


class S3AbandonedBucketsArchiveBase(ArchiveBase, S3AbandonedBucketsBase):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.reason_description_map[ArchiveReason.RECOMMENDATION_APPLIED] = (
            'bucket deleted')

    @property
    def supported_cloud_types(self):
        return list(self.SUPPORTED_CLOUD_TYPES)

    def get_previous_metric_threshold_map(self, previous_options):
        raise NotImplementedError

    def get_buckets_below_thresholds(self, cloud_account_id, start_date,
                                     previous_options, buckets):
        res_data_request_map = self._get_data_size_request_metrics(
            cloud_account_id, buckets,
            start_date, self.days_threshold)
        metric_threshold_map = self.get_previous_metric_threshold_map(
            previous_options)
        return self._are_below_thresholds(
            res_data_request_map, metric_threshold_map)

    def _get(self, previous_options, optimizations, cloud_accounts_map,
             **kwargs):
        now = datetime.now(tz=timezone.utc)
        days_threshold = previous_options['days_threshold']
        start_date = now - timedelta(days_threshold)

        account_optimizations_map = defaultdict(list)
        for optimization in optimizations:
            account_optimizations_map[optimization['cloud_account_id']].append(
                optimization)

        buckets_by_account = self.get_active_resources(
            list(cloud_accounts_map.keys()), start_date, 'Bucket')

        result = []
        for cloud_account_id, optimizations_ in account_optimizations_map.items():
            if cloud_account_id not in cloud_accounts_map:
                for optimization in optimizations_:
                    self._set_reason_properties(
                        optimization, ArchiveReason.CLOUD_ACCOUNT_DELETED)
                    result.append(optimization)
                continue

            buckets = buckets_by_account.get(cloud_account_id, [])
            bucket_ids = [x['cloud_resource_id'] for x in buckets]
            buckets_below_thresholds = self.get_buckets_below_thresholds(
                cloud_account_id, start_date, previous_options, bucket_ids)

            for optimization in optimizations_:
                if optimization['cloud_resource_id'] not in bucket_ids:
                    reason = ArchiveReason.RECOMMENDATION_APPLIED
                elif optimization[
                        'cloud_resource_id'] not in buckets_below_thresholds:
                    reason = ArchiveReason.RECOMMENDATION_IRRELEVANT
                else:
                    reason = ArchiveReason.OPTIONS_CHANGED
                self._set_reason_properties(optimization, reason)
                result.append(optimization)
        return result
