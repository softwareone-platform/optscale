import uuid

from subspector.subspector_server.tests.unittests.test_api_base import TestBase


class TestPlans(TestBase):
    def test_create(self):
        code, free_plan_1 = self.client.plan_create({
            'name': 'free'
        })
        assert code == 201
        assert free_plan_1['default'] is True
        assert free_plan_1['limits'] == {}

        params = {
            'name': 'free_2',
            'limits': {'some_limit': 10},
            'price_id': None,
            'trial_days': 14,
            'grace_period_days': 10,
        }
        code, free_plan_2 = self.client.plan_create(params)
        assert code == 201
        assert free_plan_2['default'] is True
        for k, v in params.items():
            assert v == free_plan_2[k]
        code, resp = self.client.plan_list()
        assert code == 200
        assert len(resp) == 2
        for plan in resp:
            if plan['id'] == free_plan_2['id']:
                assert plan['default'] is True
            else:
                assert plan['default'] is False

    def test_create_invalid_schema(self):
        code, response = self.client.plan_create({})
        assert code == 422
        assert response['detail'][0]['msg'] == 'Field required'
        code, response = self.client.plan_create({})
        assert code == 422
        assert response['detail'][0]['msg'] == 'Field required'
        for invalid_params in [
            {'name': 123},
            {'limits': '{}'},
            {'price_id': 1},
            {'trial_days': 'one'},
            {'grace_period_days': 'one'},
        ]:
            params = {'name': 'valid'}
            params.update(invalid_params)
            code, response = self.client.plan_create(params)
            assert code == 422
            assert 'Input should be a valid' in response['detail'][0]['msg']
        code, response = self.client.plan_create({
            'name': 'another',
            'default': False,
        })
        assert code == 422
        assert 'Extra inputs' in response['detail'][0]['msg']

        for body in [{'name': ''}, {'name': 't', 'price_id': ''}]:
            code, response = self.client.plan_create(body)
            assert code == 422
            assert response['detail'][0]['type'] == 'string_too_short'
        for p in ['trial_days', 'grace_period_days']:
            code, response = self.client.plan_create({'name': 'name', p: -1})
            assert code == 422
            assert response['detail'][0]['type'] == 'greater_than_equal'

    def test_create_invalid_customer(self):
        invalid_cust_id = str(uuid.uuid4())
        code, response = self.client.plan_create({
            'name': 'free',
            'customer_id': invalid_cust_id,
        })
        assert code == 404
        assert response['detail'] == f'Customer {invalid_cust_id} not found'

    def test_create_price_validate(self, mocker):
        validate_price_mock = mocker.patch(
            'subspector.subspector_server.controllers.plan.find_price',
            return_value={'unit_amount': 150, 'currency': 'usd'}
        )
        body = {'name': 'free', 'price_id': 'price_123'}
        code, response = self.client.plan_create(body)
        assert validate_price_mock.call_count == 1
        assert code == 201
        for k, v in body.items():
            assert v == response[k]
        assert response['price'] == 1.5
        assert response['currency'] == 'usd'

    def test_create_duplicate(self, mocker):
        body = {'name': 'free'}
        code, _ = self.client.plan_create(body)
        assert code == 201
        code, _ = self.client.plan_create(body)
        assert code == 409
        body = {'name': 'free', 'price_id': 'price_123'}
        code, _ = self.client.plan_create(body)
        assert code == 409

        _, customer = self.client.customer_create({'owner_id': 'test'})
        body['customer_id'] = customer['id']
        mocker.patch(
            'subspector.subspector_server.controllers.plan.find_price',
            return_value={'unit_amount': 1, 'currency': 'usd'}
        )
        code, _ = self.client.plan_create(body)
        assert code == 201

        body = {
            'name': 'free_2',
            'price_id': 'price_123',
            'customer_id': customer['id'],
        }
        code, response = self.client.plan_create(body)
        assert code == 409

        _, customer_2 = self.client.customer_create({'owner_id': 'test_2'})
        body['customer_id'] = customer_2['id']
        code, response = self.client.plan_create(body)
        assert code == 201

    def test_list_plans(self):
        code, plan_1 = self.client.plan_create({'name': 'free'})
        assert code == 201
        owner_id = '123'
        code, customer = self.client.customer_create({'owner_id': owner_id})
        assert code == 201
        code, plan_2 = self.client.plan_create({
            'name': 'plan_for_cust',
            'customer_id': customer['id'],
        })
        assert code == 201
        assert plan_2['default'] is False

        code, response = self.client.plan_list()
        assert code == 200
        assert len(response) == 1
        assert response[0]['id'] == plan_1['id']

        code, response = self.client.plan_list(owner_id=owner_id)
        assert code == 200
        assert len(response) == 2

        code, response = self.client.plan_list(str(uuid.uuid4()))
        assert code == 200
        assert len(response) == 1

        self.client.plan_delete(plan_2['id'])

        code, response = self.client.plan_list(owner_id=owner_id)
        assert code == 200
        assert len(response) == 1
        code, response = self.client.plan_list(owner_id=owner_id, include_deleted=True)
        assert code == 200
        assert len(response) == 2

        code, response = self.client.plan_list(
            owner_id=owner_id, include_deleted='invalid'
        )
        assert code == 422

    def test_update_plan(self):
        code, plan = self.client.plan_create({'name': 'free', 'qty_unit': 'unit'})
        assert code == 201
        updates = {
            'limits': {'some_limit': 10},
            'trial_days': 3,
            'grace_period_days': 3,
            'qty_unit': 'another'
        }
        code, updated_plan = self.client.plan_update(plan['id'], updates)
        assert code == 200
        for k, v in updates.items():
            assert v == updated_plan[k]

    def test_update_invalid_schema(self):
        code, plan = self.client.plan_create({'name': 'free'})
        assert code == 201
        for invalid_params in [
            {'name': 'new_name'},
            {'price_id': 'new_price'},
            {'customer_id': 'new_customer'},
            {'limits': '{}'},
            {'trial_days': 'one'},
            {'grace_period_days': 'one'},
            {'default': True},
            {'trial_days': -1},
            {'grace_period_days': -1},
            {'name': ''},
            {'price_id': ''},
        ]:
            params = {'name': 'valid'}
            params.update(invalid_params)
            code, response = self.client.plan_update(plan['id'], params)
            assert code == 422

    def test_delete_plan(self):
        code, free_plan_1 = self.client.plan_create({
            'name': 'free'
        })
        assert code == 201
        code, response = self.client.plan_delete(free_plan_1['id'])
        assert code == 400
        assert response['detail'] == 'Default plan cannot be deleted'
        code, free_plan_2 = self.client.plan_create({
            'name': 'free_2'
        })
        code, response = self.client.plan_delete(free_plan_1['id'])
        assert code == 204
        code, response = self.client.plan_delete(free_plan_2['id'])
        assert code == 400

    def test_invalid_unit_price(self, mocker):
        mocker.patch(
            'subspector.subspector_server.controllers.plan.find_price',
            return_value={'unit_amount': None, 'currency': 'usd'}
        )
        body = {'name': 'free', 'price_id': 'price_123'}
        code, response = self.client.plan_create(body)
        assert code == 400
        assert response['detail'] == 'Price price_123 has invalid price: None'

    def test_invalid_price_currency(self, mocker):
        mocker.patch(
            'subspector.subspector_server.controllers.plan.find_price',
            return_value={'unit_amount':  1, 'currency': 'eur'}
        )
        body = {'name': 'free', 'price_id': 'price_123'}
        code, response = self.client.plan_create(body)
        assert code == 400
        assert response['detail'] == 'Price price_123 has unsupported currency: eur'
