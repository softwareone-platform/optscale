import json
import logging
from collections import defaultdict

from rest_api.rest_api_server.controllers.base_async import BaseAsyncControllerWrapper
from rest_api.rest_api_server.controllers.breakdown_expense import BreakdownBaseController
from rest_api.rest_api_server.controllers.expense import NOT_SET_NAME
from tools.optscale_data.clickhouse import ExternalDataConverter

LOG = logging.getLogger(__name__)
DAY_IN_SECONDS = 86400


class BreakdownMetaController(BreakdownBaseController):
    def _aggregate_resource_data(self, match_query, **kwargs):
        breakdown_by = kwargs['breakdown_by']
        key = f'$meta.{breakdown_by}'
        group_stage = {
            '_id': {
                'breakdown_by': key,
                'cluster_type_id': '$cluster_type_id',
                'day': {'$trunc': {
                    '$divide': ['$first_seen', DAY_IN_SECONDS]
                }},
            },
            'resources': {'$addToSet': '$_id'},
        }
        res = self.resources_collection.aggregate([
            {'$match': match_query},
            {'$group': group_stage}
        ], allowDiskUse=True)
        return res

    def _extract_values_from_data(self, resources_data, breakdown_by):
        clusters = set()
        cnt_map = defaultdict(int)
        resources_table = []
        for data in resources_data:
            _id = data.pop('_id')
            cluster_type_id = _id.get('cluster_type_id')
            r_ids = data.pop('resources', [])
            if cluster_type_id:
                clusters.update(r_ids)
                continue
            breakdown_by_value = json.dumps(_id.get('breakdown_by'))
            resources_table.extend(
                [{'id': r_id, 'breakdown_by': breakdown_by_value} for r_id in r_ids])
            cnt_map[breakdown_by_value] += len(r_ids)
        if clusters and not resources_table:
            sub_resources = self.resources_collection.find(
                {'cluster_id': {'$in': list(clusters)}, 'deleted_at': 0},
                ['meta'])
            for s in sub_resources:
                breakdown_by_value = json.dumps(
                    s.get('meta', {}).get(breakdown_by))
                resources_table.append(
                    {'id': s['_id'], 'breakdown_by': breakdown_by_value}
                )
                cnt_map[breakdown_by_value] += 1
        return resources_table, cnt_map

    def get_breakdown_expenses(self, cloud_account_ids, resources, breakdown_by):
        expenses = self.execute_clickhouse(
            query=f"""
                SELECT resources.breakdown_by, sum(cost*sign)
                FROM expenses
                JOIN resources ON expenses.resource_id = resources.id
                WHERE expenses.date >= %(start_date)s
                    AND expenses.date <= %(end_date)s
                    AND cloud_account_id in %(cloud_account_ids)s
                GROUP BY resources.breakdown_by
            """,
            parameters={
                'start_date': self.start_date,
                'end_date': self.end_date,
                'cloud_account_ids': list(cloud_account_ids)
            },
            external_data=ExternalDataConverter()([{
                'name': 'resources',
                'structure': [
                    ('id', 'String'),
                    ('breakdown_by', 'Nullable(String)'),
                ],
                'data': resources
            }]),
        )
        return {e[0]: e[1] for e in expenses}

    def process_data(self, resources_data, organization_id, filters, **kwargs):
        breakdown_by = filters['breakdown_by']
        extracted_values = self._extract_values_from_data(
            resources_data, breakdown_by)
        resources_table, cnt_map = extracted_values
        _, organization_cloud_accs = self.get_organization_and_cloud_accs(
            organization_id)
        cloud_account_ids = list(map(lambda x: x.id, organization_cloud_accs))
        expenses = self.get_breakdown_expenses(
            cloud_account_ids, resources_table, breakdown_by)
        breakdown = []
        for value, cnt in cnt_map.items():
            breakdown.append({
                breakdown_by: json.loads(value) or NOT_SET_NAME,
                'cost': expenses.get(value, 0),
                'count': cnt
            })
        return {
            'breakdown': breakdown,
            'start_date': self.start_date,
            'end_date': self.end_date,
        }


class BreakdownMetaAsyncController(BaseAsyncControllerWrapper):
    def _get_controller_class(self):
        return BreakdownMetaController
