from collections import defaultdict
from datetime import timedelta
from bumiworker.bumiworker.consts import ArchiveReason
from bumiworker.bumiworker.modules.base import ArchiveBase
from bumiworker.bumiworker.modules.recommendations.abandoned_load_balancers import (
    AbandonedLBs as AbandonedLBsRecommendation,
    SUPPORTED_CLOUD_TYPES
)
from tools.optscale_time import utcnow


class AbandonedLBs(ArchiveBase, AbandonedLBsRecommendation):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.reason_description_map[ArchiveReason.RECOMMENDATION_APPLIED] = (
            self.reason_description_map[ArchiveReason.RESOURCE_DELETED])

    @property
    def supported_cloud_types(self):
        return SUPPORTED_CLOUD_TYPES

    def _get(self, previous_options, optimizations, cloud_accounts_map,
             **kwargs):
        days_threshold = previous_options['days_threshold']
        start_date = utcnow() - timedelta(days=days_threshold)
        thresholds_map = self._get_thresholds(
            previous_options['bytes_sent_threshold'],
            previous_options['packets_sent_threshold'],
            previous_options['requests_threshold']
        )
        account_optimizations_map = defaultdict(list)
        for optimization in optimizations:
            account_optimizations_map[optimization['cloud_account_id']].append(
                optimization)

        lbs_by_account = self.get_active_resources(
            list(account_optimizations_map.keys()), start_date,
            'Load Balancer')

        result = []
        for cloud_account_id, optimizations_ in account_optimizations_map.items():
            if cloud_account_id not in cloud_accounts_map:
                for optimization in optimizations_:
                    self._set_reason_properties(
                        optimization, ArchiveReason.CLOUD_ACCOUNT_DELETED)
                    result.append(optimization)
                continue

            account_lbs = lbs_by_account[cloud_account_id]
            resource_id_lb_map = {lb['_id']: lb for lb in account_lbs}
            for optimization in optimizations_:
                resource_id = optimization['resource_id']
                lb = resource_id_lb_map.get(resource_id)
                if not lb:
                    reason = ArchiveReason.RECOMMENDATION_APPLIED
                elif not self._are_below_metrics(
                        cloud_account_id, resource_id, start_date,
                        thresholds_map):
                    reason = ArchiveReason.RECOMMENDATION_IRRELEVANT
                else:
                    reason = ArchiveReason.OPTIONS_CHANGED
                self._set_reason_properties(optimization, reason)
                result.append(optimization)
        return result


def main(organization_id, config_client, created_at, **kwargs):
    return AbandonedLBs(
        organization_id, config_client, created_at).get()
