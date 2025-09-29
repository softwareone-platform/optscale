import tools.optscale_time as opttime
from datetime import datetime, timezone, timedelta
from unittest.mock import patch
from rest_api.rest_api_server.tests.unittests.test_api_base import TestApiBase
from rest_api.rest_api_server.utils import get_nil_uuid


class TestBreakdownMetaApi(TestApiBase):

    def setUp(self, version='v2'):
        super().setUp(version)
        _, self.org = self.client.organization_create(
            {'name': "organization"})
        self.org_id = self.org['id']
        patch('rest_api.rest_api_server.controllers.cloud_account.'
              'CloudAccountController._configure_report').start()
        self.p_create_rule = patch(
            'rest_api.rest_api_server.controllers.rule.RuleController.'
            'create_rule').start()
        cloud_acc1 = {
            'name': 'cloud_acc1',
            'type': 'aws_cnr',
            'config': {
                'access_key_id': 'key',
                'secret_access_key': 'secret',
                'config_scheme': 'create_report'
            }
        }
        cloud_acc2 = {
            'name': 'cloud_acc2',
            'type': 'kubernetes_cnr',
            'config': {
                'url': 'https://test.cnr',
                'port': 4433,
                'password': 'secret',
                'user': 'user',
                'cost_model': {}
            }
        }
        self.auth_user_id_1 = self.gen_id()
        self.auth_user_id_2 = self.gen_id()
        _, self.employee1 = self.client.employee_create(
            self.org_id,
            {'name': 'name1', 'auth_user_id': self.auth_user_id_1})
        _, self.employee2 = self.client.employee_create(
            self.org_id,
            {'name': 'name2', 'auth_user_id': self.auth_user_id_2})
        _, self.cloud_acc1 = self.create_cloud_account(
            self.org_id, cloud_acc1, auth_user_id=self.auth_user_id_1)
        _, self.cloud_acc2 = self.create_cloud_account(
            self.org_id, cloud_acc2, auth_user_id=self.auth_user_id_2)

        _, self.sub_pool1 = self.client.pool_create(self.org_id, {
            'name': 'sub1',
            'parent_id': self.org['pool_id'],
        })
        _, self.sub_pool2 = self.client.pool_create(self.org_id, {
            'name': 'sub2',
            'parent_id': self.sub_pool1['id'],
        })
        self.update_default_owner_for_pool(self.org['pool_id'],
                                           self.employee1['id'])

    def _create_resource(self, cloud_account_id, name='default_name',
                         r_type='default_type', **kwargs):
        code, resource = self.cloud_resource_create(
            cloud_account_id, {
                'cloud_resource_id': self.gen_id(), 'name': name,
                'resource_type': r_type, **kwargs
            })
        self.assertEqual(code, 201)
        return resource

    def test_breakdown_meta_withot_breakdown_by(self):
        start_ts = int(datetime(2022, 2, 1).timestamp())
        code, response = self.client.breakdown_meta_get(
            self.org_id, start_ts, start_ts, None)
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['error_code'], 'OE0216')

    def test_breakdown_meta_unexpected_filters(self):
        start_ts = int(datetime(2022, 2, 1).timestamp())
        filters = {
            'unexpected': 'value',
        }
        code, response = self.client.breakdown_meta_get(
            self.org_id, start_ts, start_ts, 'os', filters)
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['error_code'], 'OE0212')

    def test_breakdown_meta_dates_values(self):
        filters = {
            'cloud_account_id': [self.cloud_acc1['id']],
        }
        min_timestamp = 0
        max_timestamp = int(datetime.max.replace(
            tzinfo=timezone.utc).timestamp()) - 1
        code, response = self.client.breakdown_meta_get(
            self.org_id, min_timestamp - 1, max_timestamp, 'test', filters)
        self.assertEqual(code, 400)
        self.verify_error_code(response, 'OE0224')
        code, response = self.client.breakdown_meta_get(
            self.org_id, min_timestamp, max_timestamp + 1, 'test', filters)
        self.assertEqual(code, 400)
        self.verify_error_code(response, 'OE0224')

        code, response = self.client.breakdown_meta_get(
            self.org_id, min_timestamp - 1, 0, 'test', filters)
        self.assertEqual(code, 400)
        self.verify_error_code(response, 'OE0224')

    def test_breakdown_meta_limit(self):
        time = opttime.utcnow_timestamp()
        code, response = self.client.breakdown_meta_get(
            self.org_id, time, time + 1, 'test', {'limit': 1})
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['error_code'], 'OE0212')

    def test_invalid_organization(self):
        day_in_month = datetime(2020, 1, 14)

        time = int(day_in_month.timestamp())
        valid_aws_cloud_acc = {
            'name': 'my cloud_acc',
            'type': 'aws_cnr',
            'config': {
                'access_key_id': 'key',
                'secret_access_key': 'secret',
                'config_scheme': 'create_report'
            }
        }
        code, cloud_acc1 = self.create_cloud_account(
            self.org_id, valid_aws_cloud_acc)
        self.assertEqual(code, 201)
        _, organization2 = self.client.organization_create(
            {'name': "organization2"})
        filters = {
            'cloud_account_id': [cloud_acc1['id']]
        }
        code, response = self.client.breakdown_meta_get(
            organization2['id'], time, time + 1, 'test', filters)
        self.assertEqual(code, 404)
        self.verify_error_code(response, 'OE0470')

    def test_breakdown_meta(self):
        start = int(datetime(2022, 2, 1).timestamp())
        end = int(datetime(2022, 3, 1).timestamp())

        day_1_ts = int(datetime(2022, 2, 2, tzinfo=timezone.utc).timestamp())
        res1 = self._create_resource(
            self.cloud_acc1['id'], first_seen=day_1_ts, last_seen=day_1_ts,
            meta={'os': 'win', 'arch': 'x64'})
        res2 = self._create_resource(
            self.cloud_acc1['id'], first_seen=day_1_ts, last_seen=day_1_ts,
            meta={'os': 'win'})
        self.expenses = [
            {
                'cloud_account_id': self.cloud_acc1['id'],
                'resource_id': res1['id'],
                'date': datetime(2022, 2, 1),
                'cost': 10,
                'sign': 1
            },
            {
                'cloud_account_id': self.cloud_acc1['id'],
                'resource_id': res2['id'],
                'date': datetime(2022, 2, 1),
                'cost': 15,
                'sign': 1
            },
        ]
        code, response = self.client.breakdown_meta_get(
            self.org_id, start, end, 'os')
        self.assertEqual(code, 200)
        expected_breakdown = [{'cost': 25, 'count': 2, 'os': 'win'}]
        self.assertEqual(response['breakdown'], expected_breakdown)

        code, response = self.client.breakdown_meta_get(
            self.org_id, start, end, 'arch')
        self.assertEqual(code, 200)
        expected_breakdown = [
            {'arch': '(not set)', 'cost': 15, 'count': 1},
            {'arch': 'x64', 'cost': 10, 'count': 1}
        ]
        self.assertEqual(response['breakdown'], expected_breakdown)

    def test_breakdown_meta_incorrect_identity(self):
        start = int(datetime(2022, 2, 1).timestamp())
        end = int(datetime(2022, 3, 1).timestamp())

        day_1_ts = int(datetime(2022, 2, 2, tzinfo=timezone.utc).timestamp())
        res = self._create_resource(
            self.cloud_acc1['id'], first_seen=day_1_ts, last_seen=day_1_ts,
            r_type='Instance')
        self.expenses = [
            {
                'cloud_account_id': self.cloud_acc1['id'],
                'resource_id': res['id'],
                'date': datetime(2022, 2, 1),
                'cost': 10,
                'sign': 1
            },
        ]
        code, response = self.client.breakdown_meta_get(
            self.org_id, start, end, 'test', {'resource_type': 'Instance:unknown'})
        self.assertEqual(code, 400)
        self.verify_error_code(response, 'OE0499')

    def test_empty_breakdown_meta(self):
        start = int(datetime(2022, 2, 1).timestamp())
        end = int(datetime(2022, 3, 1).timestamp())
        code, response = self.client.breakdown_meta_get(
            self.org_id, start, end, 'test')
        self.assertEqual(code, 200)
        self.assertEqual(response['breakdown'], [])

    def test_breakdown_meta_without_expenses(self):
        start = int(datetime(2022, 2, 1).timestamp())
        end = int(datetime(2022, 3, 1).timestamp())

        day_1_ts = int(datetime(2022, 2, 2, tzinfo=timezone.utc).timestamp())
        self._create_resource(
            self.cloud_acc1['id'], first_seen=day_1_ts, last_seen=day_1_ts,
            meta={'os': 'linux'})
        self._create_resource(
            self.cloud_acc1['id'], first_seen=day_1_ts, last_seen=day_1_ts,
            meta={'os': 'windows'})
        code, response = self.client.breakdown_meta_get(
            self.org_id, start, end, 'os')
        self.assertEqual(code, 200)
        expected_breakdown = [
            {'cost': 0, 'count': 1, 'os': 'linux'},
            {'cost': 0, 'count': 1, 'os': 'windows'}
        ]
        self.assertEqual(response['breakdown'], expected_breakdown)

    def test_breakdown_meta_expenses_sum(self):
        start = int(datetime(2022, 2, 1).timestamp())
        end = int(datetime(2022, 3, 1).timestamp())

        day_1_ts = int(datetime(2022, 2, 2, tzinfo=timezone.utc).timestamp())
        res1 = self._create_resource(
            self.cloud_acc1['id'], first_seen=day_1_ts, last_seen=day_1_ts,
            meta={'os': 'windows', 'arch': 'x64'})
        cost_map = {
            datetime(2022, 1, 31): 5,
            datetime(2022, 2, 1): 10,
            datetime(2022, 2, 2): 20,
            datetime(2022, 3, 2): 30

        }
        for dt, cost in cost_map.items():
            self.expenses.append({
                'cloud_account_id': self.cloud_acc1['id'],
                'resource_id': res1['id'],
                'date': dt,
                'cost': cost,
                'sign': 1
            })
        code, response = self.client.breakdown_meta_get(
            self.org_id, start, end, 'arch')
        self.assertEqual(code, 200)
        expected_breakdown = [
            {'arch': 'x64', 'cost': 30, 'count': 1},
        ]
        self.assertEqual(response['breakdown'], expected_breakdown)

    def test_breakdown_meta_clusters(self):
        code, cluster_type = self.client.cluster_type_create(
            self.org_id, {'name': 'awesome', 'tag_key': 'tag1'})
        self.assertEqual(code, 201)
        dt = datetime(2021, 2, 1, tzinfo=timezone.utc)
        first_seen = int((dt - timedelta(days=1)).timestamp())
        last_seen = int(dt.timestamp())
        self._create_resource(
            self.cloud_acc1['id'], tags={'tag1': 'val1'}, region='us-east',
            first_seen=first_seen, last_seen=last_seen,
            meta={'os': 'windows'})
        self._create_resource(
            self.cloud_acc1['id'], tags={'tag2': 'val2'},
            first_seen=first_seen, last_seen=last_seen,
            meta={'os': 'windows'})
        self._create_resource(
            self.cloud_acc1['id'], tags={'tag1': 'val1', 'tag3': 'val3'},
            region='us-west', first_seen=first_seen, last_seen=last_seen,
            meta={'os': 'linux', 'arch': 'x64'}
        )
        self._create_resource(
            self.cloud_acc1['id'], tags={'tag3': 'val3'}, region='us-test',
            first_seen=first_seen, last_seen=last_seen
        )

        expected_breakdown = [
            {'os': '(not set)', 'cost': 0, 'count': 1},
            {'os': 'linux', 'cost': 0, 'count': 1},
            {'os': 'windows', 'cost': 0, 'count': 2}
        ]
        code, response = self.client.breakdown_meta_get(
            self.org_id, first_seen, last_seen, 'os')
        self.assertEqual(code, 200)
        self.assertEqual(expected_breakdown, response['breakdown'])

        code, response = self.client.breakdown_meta_get(
            self.org_id, first_seen, last_seen, 'os',
            {'cloud_account_id': self.cloud_acc1['id']})
        self.assertEqual(code, 200)
        self.assertEqual(expected_breakdown, response['breakdown'])

        code, response = self.client.breakdown_meta_get(
            self.org_id, first_seen, last_seen, 'os',
            {'region': get_nil_uuid()})
        self.assertEqual(code, 200)
        expected_breakdown = [
            {'cost': 0, 'count': 1, 'os': 'windows'}
        ]
        self.assertEqual(expected_breakdown, response['breakdown'])

        code, response = self.client.breakdown_meta_get(
            self.org_id, first_seen, last_seen, 'os',
            {'resource_type': '%s:cluster' % cluster_type['name']})
        self.assertEqual(code, 200)
        expected_breakdown = [
            {'os': 'windows', 'cost': 0, 'count': 1},
            {'os': 'linux', 'cost': 0, 'count': 1}
        ]
        self.assertEqual(expected_breakdown, response['breakdown'])

    def test_breakdown_meta_traffic_filters(self):
        start = int(datetime(2022, 2, 1).timestamp())
        end = int(datetime(2022, 3, 1).timestamp())

        day_1_ts = int(datetime(2022, 2, 2, tzinfo=timezone.utc).timestamp())
        res1 = self._create_resource(
            self.cloud_acc1['id'], first_seen=day_1_ts, last_seen=day_1_ts,
            meta={'os': 'win', 'arch': 'x64'})
        res2 = self._create_resource(
            self.cloud_acc1['id'], first_seen=day_1_ts, last_seen=day_1_ts,
            meta={'os': 'linux'}
        )
        res3 = self._create_resource(
            self.cloud_acc1['id'], first_seen=day_1_ts, last_seen=day_1_ts,
            meta={'os': 'win'})
        self.expenses = [
            {
                'cloud_account_id': self.cloud_acc1['id'],
                'resource_id': res1['id'],
                'date': datetime(2022, 2, 1),
                'cost': 10,
                'sign': 1
            },
            {
                'cloud_account_id': self.cloud_acc1['id'],
                'resource_id': res2['id'],
                'date': datetime(2022, 2, 1),
                'cost': 15,
                'sign': 1
            },
            {
                'cloud_account_id': self.cloud_acc1['id'],
                'resource_id': res3['id'],
                'date': datetime(2022, 2, 1),
                'cost': 30,
                'sign': 1
            },
        ]
        self.traffic_expenses = [
            {
                'cloud_account_id': self.cloud_acc1['id'],
                'resource_id': res1['cloud_resource_id'],
                'date': int(datetime(2022, 2, 1).timestamp()),
                'type': 1,
                'from': 'from_1',
                'to': 'to_1',
                'usage': 1,
                'cost': 1,
                'sign': 1
            },
            {
                'cloud_account_id': self.cloud_acc1['id'],
                'resource_id': res2['cloud_resource_id'],
                'date': int(datetime(2022, 2, 1).timestamp()),
                'type': 1,
                'from': 'from_2',
                'to': 'to_2',
                'usage': 2,
                'cost': 2,
                'sign': 1
            }
        ]
        for body in [
            {
                'traffic_from': 'from_2:aws_cnr'
            },
            {
                'traffic_to': 'to_2:aws_cnr'
            }
        ]:
            code, response = self.client.breakdown_meta_get(
                self.org_id, start, end, 'os', body)
            self.assertEqual(code, 200)
            self.assertEqual(len(response['breakdown']), 1)
            self.assertEqual(response['breakdown'][0],
                             {'os': 'linux', 'cost': 15, 'count': 1})

        for body in [
            {
                'traffic_from': ['from_2:aws_cnr', 'from_1:aws_cnr']
            },
            {
                'traffic_to': ['to_1:aws_cnr', 'to_2:aws_cnr', 'to_3:azure']
            },
            {
                'traffic_from': 'ANY'
            },
            {
                'traffic_to': 'ANY'
            },
        ]:
            code, response = self.client.breakdown_meta_get(
                self.org_id, start, end, 'os', body)
            self.assertEqual(code, 200)
            self.assertEqual(len(response['breakdown']), 2)
            self.assertEqual(response['breakdown'], [
                {'os': 'linux', 'cost': 15, 'count': 1},
                {'os': 'win', 'cost': 10, 'count': 1}
            ])

        code, response = self.client.breakdown_meta_get(
            self.org_id, start, end, 'os')
        self.assertEqual(code, 200)
        self.assertEqual(response['breakdown'], [
            {'os': 'linux', 'cost': 15, 'count': 1},
            {'os': 'win', 'cost': 40, 'count': 2}
        ])

    def test_breakdown_meta_filter_by_first_seen(self):
        day_in_month = datetime(2025, 1, 1)
        time = int(day_in_month.timestamp())
        resource1 = self._create_resource(
            self.cloud_acc1['id'], name='res1', first_seen=time,
            last_seen=time + 1, meta={'os': 'win'})
        resource2 = self._create_resource(
            self.cloud_acc1['id'], name='res2', first_seen=time - 1,
            last_seen=time, tags={'os': 'lin'})
        expenses = [
            {
                'cost': 300,
                'date': day_in_month,
                'cloud_acc': self.cloud_acc1['id'],
                'resource_id': resource1['id'],
            },
            {
                'cost': 70,
                'date': day_in_month,
                'cloud_acc': self.cloud_acc1['id'],
                'resource_id': resource2['id'],
            }
        ]

        for e in expenses:
            self.expenses.append({
                'cost': e['cost'],
                'date': e['date'],
                'resource_id': e['resource_id'],
                'cloud_account_id': e['cloud_acc'],
                'sign': 1
            })

        filters = {'first_seen_lte': time - 1}
        code, response = self.client.breakdown_meta_get(
            self.org_id, time - 1, time + 1, 'os', filters)
        self.assertEqual(code, 200)
        self.assertEqual(len(response['breakdown']), 1)
        self.assertEqual(response['breakdown'][0]['cost'], 70)

        filters = {'first_seen_lte': time + 1}
        code, response = self.client.breakdown_meta_get(
            self.org_id, time - 1, time + 1, 'os', filters)
        self.assertEqual(code, 200)
        self.assertEqual(len(response['breakdown']), 2)

        filters = {'first_seen_gte': time - 1}
        code, response = self.client.breakdown_meta_get(
            self.org_id, time - 1, time + 1, 'os', filters)
        self.assertEqual(code, 200)
        self.assertEqual(len(response['breakdown']), 2)

        filters = {'first_seen_gte': time}
        code, response = self.client.breakdown_meta_get(
            self.org_id, time - 1, time + 1, 'os', filters)
        self.assertEqual(code, 200)
        self.assertEqual(len(response['breakdown']), 1)
        self.assertEqual(response['breakdown'][0]['cost'], 300)

    def test_breakdown_meta_filter_by_last_seen(self):
        day_in_month = datetime(2025, 1, 1)
        time = int(day_in_month.timestamp())
        resource1 = self._create_resource(
            self.cloud_acc1['id'], name='res1', first_seen=time,
            last_seen=time + 1, meta={'test': 'val1'})
        resource2 = self._create_resource(
            self.cloud_acc1['id'], name='res2', first_seen=time - 1,
            last_seen=time, meta={'test': 'val2'})
        expenses = [
            {
                'cost': 300,
                'date': day_in_month,
                'cloud_acc': self.cloud_acc1['id'],
                'resource_id': resource1['id'],
            },
            {
                'cost': 70,
                'date': day_in_month,
                'cloud_acc': self.cloud_acc1['id'],
                'resource_id': resource2['id'],
            }
        ]

        for e in expenses:
            self.expenses.append({
                'cost': e['cost'],
                'date': e['date'],
                'resource_id': e['resource_id'],
                'cloud_account_id': e['cloud_acc'],
                'sign': 1
            })

        filters = {'last_seen_lte': time}
        code, response = self.client.breakdown_meta_get(
            self.org_id, time - 1, time + 1, 'test', filters)
        self.assertEqual(code, 200)
        self.assertEqual(len(response['breakdown']), 1)
        self.assertEqual(response['breakdown'][0]['cost'], 70)

        filters = {'last_seen_lte': time + 1}
        code, response = self.client.breakdown_meta_get(
            self.org_id, time - 1, time + 1, 'test', filters)
        self.assertEqual(code, 200)
        self.assertEqual(len(response['breakdown']), 2)

        filters = {'last_seen_gte': time}
        code, response = self.client.breakdown_meta_get(
            self.org_id, time - 1, time + 1, 'test', filters)
        self.assertEqual(code, 200)
        self.assertEqual(len(response['breakdown']), 2)

        filters = {'last_seen_gte': time + 1}
        code, response = self.client.breakdown_meta_get(
            self.org_id, time - 1, time + 1, 'test', filters)
        self.assertEqual(code, 200)
        self.assertEqual(len(response['breakdown']), 1)
        self.assertEqual(response['breakdown'][0]['cost'], 300)

    def test_breakdown_meta_types(self):
        start = int(datetime(2022, 2, 1).timestamp())
        end = int(datetime(2022, 3, 1).timestamp())

        day_1_ts = int(datetime(2022, 2, 2, tzinfo=timezone.utc).timestamp())
        meta_values = [
            ['1', '2'], 'win', {'key': 'value'}, None, 2, True
        ]
        for meta_value in meta_values:
            self._create_resource(
                self.cloud_acc1['id'], first_seen=day_1_ts, last_seen=day_1_ts,
                meta={'os': meta_value})
        code, response = self.client.breakdown_meta_get(
            self.org_id, start, end, 'os')
        self.assertEqual(len(response['breakdown']), len(meta_values))
        self.assertEqual(code, 200)
        self.assertEqual(response['breakdown'], [
            {'os': 2, 'cost': 0, 'count': 1},
            {'os': '(not set)', 'cost': 0, 'count': 1},
            {'os': 'win', 'cost': 0, 'count': 1},
            {'os': {'key': 'value'}, 'cost': 0, 'count': 1},
            {'os': ['1', '2'], 'cost': 0, 'count': 1},
            {'os': True, 'cost': 0, 'count': 1}
        ])
