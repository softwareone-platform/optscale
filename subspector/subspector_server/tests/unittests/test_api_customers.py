from subspector.subspector_server.tests.unittests.test_api_base import TestBase


class TestCustomers(TestBase):
    def test_create_customer_invalid_owner(self):
        for val in [1, {}, None, True]:
            code, response = self.client.customer_create({'owner_id': val})
            assert code == 422
            assert response['detail'][0]['type'] == 'string_type'
        code, response = self.client.customer_create({'owner_id': ''})
        assert code == 422
        assert response['detail'][0]['type'] == 'string_too_short'

    def test_create_customer_invalid_name(self):
        for val in [1, {}, False]:
            code, response = self.client.customer_create({
                'owner_id': 'valid',
                'name': val,
            })
            assert code == 422
            assert response['detail'][0]['type'] == 'string_type'
        code, response = self.client.customer_create({
            'owner_id': 'valid',
            'name': '',
        })
        assert code == 422
        assert response['detail'][0]['type'] == 'string_too_short'

    def test_create_no_default_plan(self):
        code, response = self.client.customer_create({'owner_id': 'valid'})
        assert code == 404

    def test_create_customer(self):
        code, default_plan = self.client.plan_create({
            'name': 'free'
        })
        assert code == 201
        owner_id = 'test_owner'
        code, response = self.client.customer_create({'owner_id': owner_id})
        assert code == 201
        code, response = self.client.get_owner_subscription(owner_id)
        assert code == 200
        assert response['plan']['id'] == default_plan['id']

    def test_create_duplicate_owner(self):
        code, default_plan = self.client.plan_create({
            'name': 'free'
        })
        assert code == 201
        owner_id = 'test_owner'
        code, response = self.client.customer_create({
            'name': 'name_1',
            'owner_id': owner_id,
        })
        assert code == 201

        code, response = self.client.customer_create({
            'name': 'name_2',
            'owner_id': owner_id,
        })
        assert code == 409

    def test_delete_customer_paid_plan(self):
        code, _ = self.client.customer_delete('213')
        assert code == 404
        code, default_plan = self.client.plan_create({
            'name': 'free'
        })
        assert code == 201
        owner_id = 'test_owner'
        code, customer = self.client.customer_create({'owner_id': owner_id})
        assert code == 201
        code, subscriptions = self.client.subscription_list()
        assert code == 200
        assert len(subscriptions) == 1
        code, _ = self.client.customer_delete(owner_id)
        assert code == 204
        code, subscriptions = self.client.subscription_list()
        assert code == 200
        assert len(subscriptions) == 0

    def test_list_customers(self, mocker):
        code, default_plan = self.client.plan_create({
            'name': 'free'
        })
        assert code == 201
        code, cust_1 = self.client.customer_create({'owner_id': 'owner_1'})
        assert code == 201
        code, cust_2 = self.client.customer_create({'owner_id': 'owner_2'})
        assert code == 201

        code, customers = self.client.customer_list()
        assert code == 200
        assert len(customers) == 2
        code, customers = self.client.customer_list(connected_only=True)
        assert code == 200
        assert len(customers) == 0

        mocker.patch(
            'subspector.subspector_server.controllers.plan.find_price',
            return_value={'unit_amount': 1, 'currency': 'usd'}
        )
        code, plan_1 = self.client.plan_create({
            'name': 'pro', 'price_id': '1'
        })
        assert code == 201

        mocker.patch(
            'subspector.subspector_server.controllers.subscription._create_stripe_customer',
            return_value='cust_1',
        )
        mocker.patch(
            'subspector.subspector_server.controllers.subscription._create_stripe_checkout_session',
            return_value={'url': 'session'},
        )
        code, response = self.client.update_owner_subscription(
            'owner_2', plan_1['id'])
        assert code == 200
        code, customers = self.client.customer_list()
        assert code == 200
        assert len(customers) == 2
        code, customers = self.client.customer_list(connected_only=True)
        assert code == 200
        assert len(customers) == 1
        assert customers[0]['id'] == cust_2['id']
