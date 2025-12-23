import uuid

from subspector.subspector_server.tests.unittests.test_api_base import TestBase


class TestSubscriptions(TestBase):
    def _prepare_plan(
        self, name='default_free', price_id=None, customer_id=None, **kwargs
    ):
        code, plan = self.client.plan_create({
            'name': name,
            'price_id': price_id,
            'customer_id': customer_id,
            **kwargs,
        })
        assert code == 201
        return plan

    def _prepare_customer(self, owner_id: str):
        code, customer = self.client.customer_create({'owner_id': owner_id})
        assert code == 201
        return customer

    def test_get_owner_subscription(self):
        plan = self._prepare_plan()
        customer = self._prepare_customer('test_owner')
        code, response = self.client.get_owner_subscription(customer['owner_id'])
        assert code == 200
        assert response['plan']['id'] == plan['id']
        assert response['status'] == 'active'

    def test_get_owner_subscription_not_found(self):
        code, response = self.client.get_owner_subscription('invalid')
        assert code == 404

    def test_list_subscriptions(self):
        code, response = self.client.subscription_list()
        assert code == 200
        assert response == []
        plan = self._prepare_plan()
        customer_1 = self._prepare_customer('test_1')
        customer_2 = self._prepare_customer('test_2')
        code, response = self.client.subscription_list()
        assert code == 200
        assert len(response) == 2
        for subscription in response:
            assert subscription['plan_id'] == plan['id']
            assert subscription['status'] == 'active'
            assert subscription['customer_id'] in [
                customer_1['id'],
                customer_2['id'],
            ]

    def test_update_subscription(self, mocker):
        plan = self._prepare_plan()
        mocker.patch(
            'subspector.subspector_server.controllers.plan.find_price',
            return_value={'unit_amount': 1, 'currency': 'usd'}
        )
        plan_1 = self._prepare_plan('test_1', price_id='test')
        owner_id = str(uuid.uuid4())
        customer = self._prepare_customer(owner_id)
        code, response = self.client.subscription_list()
        subscription = response[0]
        assert subscription['plan_id'] == plan['id']
        assert subscription['customer_id'] == customer['id']
        task_mock = mocker.patch(
            'subspector.subspector_server.controllers.subscription._publish_task')
        params = {
            'price_id': plan_1['price_id'],
            'quantity': 2,
            'status': 'suspended',
            'stripe_status': 'incomplete',
            'stripe_subscription_id': 'subs_123',
            'end_date': 23,
            'cancel_at_period_end': True,
            'grace_period_start': 123,
        }
        code, response = self.client.subscription_update(subscription['id'], params)
        assert code == 200
        params.pop('price_id')
        assert response['plan_id'] == plan_1['id']
        for key, value in params.items():
            assert response[key] == value
        task_mock.assert_called_once_with(mocker.ANY, customer['owner_id'], 10)

        task_mock.reset_mock()
        params = {
            'stripe_status': 'past_due',
        }
        code, response = self.client.subscription_update(subscription['id'], params)
        assert code == 200
        task_mock.assert_called_once_with(mocker.ANY, customer['owner_id'], 5)

        task_mock.reset_mock()
        params = {
            'status': 'suspended',
            'cancel_at_period_end': False,
            'end_date': 12345,
            'updated_at': 1231456,
            'grace_period_start': 324234,
        }
        code, response = self.client.subscription_update(subscription['id'],
                                                         params)
        assert code == 200
        task_mock.assert_not_called()

    def test_update_extra_params(self):
        plan = self._prepare_plan()
        customer = self._prepare_customer('test_1')
        code, response = self.client.subscription_list()
        subscription = response[0]
        assert subscription['plan_id'] == plan['id']
        assert subscription['customer_id'] == customer['id']
        for param in ['id', 'created_at', 'deleted_at', 'customer_id', 'extra']:
            code, response = self.client.subscription_update(
                subscription['id'], {param: 'value'}
            )
            assert code == 422
            assert response['detail'][0]['type'] == 'extra_forbidden'

    def test_update_invalid_params(self):
        plan = self._prepare_plan()
        customer = self._prepare_customer('test_1')
        code, response = self.client.subscription_list()
        subscription = response[0]
        assert subscription['plan_id'] == plan['id']
        assert subscription['customer_id'] == customer['id']

        code, response = self.client.subscription_update(
            subscription['id'], {'price_id': 'value'}
        )
        assert code == 404

        for invalid_body in [
            {'price_id': None},
            {'price_id': 1},
            {'quantity': 0},
            {'quantity': 'test'},
            {'quantity': None},
            {'status': None},
            {'status': 'invalid'},
            {'status': 1},
            {'stripe_status': 'invalid'},
            {'stripe_status': 1},
            {'stripe_subscription_id': 1},
            {'end_date': 'test'},
            {'end_date': None},
            {'cancel_at_period_end': 2},
            {'cancel_at_period_end': None},
            {'cancel_at_period_end': 'str'},
            {'grace_period_start': None},
            {'grace_period_start': 'str'},
        ]:
            code, response = self.client.subscription_update(
                subscription['id'], invalid_body
            )
            assert code == 422

    def test_change_plan_invalid(self, mocker):
        plan = self._prepare_plan()
        customer = self._prepare_customer('test_1')
        code, response = self.client.subscription_list()
        subscription = response[0]
        assert subscription['plan_id'] == plan['id']
        assert subscription['customer_id'] == customer['id']
        customer_2 = self._prepare_customer('test_2')

        mocker.patch(
            'subspector.subspector_server.controllers.plan.find_price',
            return_value={'unit_amount': 1, 'currency': 'usd'}
        )
        plan_1 = self._prepare_plan(
            'test_1', price_id='test', customer_id=customer_2['id']
        )
        code, response = self.client.update_owner_subscription(
            customer['owner_id'], plan_1['id']
        )
        assert code == 404
        code, response = self.client.update_owner_subscription(
            str(uuid.uuid4()), plan_1['id']
        )
        assert code == 404
        code, response = self.client.update_owner_subscription(
            customer['owner_id'], str(uuid.uuid4())
        )
        assert code == 404
        code, response = self.client.update_owner_subscription(customer['owner_id'])
        assert code == 400
        code, response = self.client.update_owner_subscription(None, plan_1['id'])
        assert code == 404

    def test_change_free_plan(self):
        plan = self._prepare_plan()
        owner_id = 'test_owner'
        customer = self._prepare_customer(owner_id)
        code, response = self.client.subscription_list()
        subscription = response[0]
        assert subscription['plan_id'] == plan['id']
        assert subscription['customer_id'] == customer['id']

        plan_2 = self._prepare_plan('test_2')
        code, response = self.client.update_owner_subscription(owner_id, plan_2['id'])
        assert code == 200
        assert response['result'] == 'plan_changed'

        code, response = self.client.get_owner_subscription(owner_id)
        assert code == 200
        assert response['plan']['id'] == plan_2['id']

    def test_change_plan_flow(self, mocker):
        plan = self._prepare_plan()
        customer = self._prepare_customer('test_1')
        code, response = self.client.subscription_list()
        subscription = response[0]
        assert subscription['plan_id'] == plan['id']
        assert subscription['customer_id'] == customer['id']

        mocker.patch(
            'subspector.subspector_server.controllers.plan.find_price',
            return_value={'unit_amount': 1, 'currency': 'usd'}
        )
        trial_days = 3
        plan_1 = self._prepare_plan('test_1', price_id='test', trial_days=trial_days)
        mocker.patch(
            'subspector.subspector_server.controllers.subscription._create_stripe_customer',
            return_value='cust_1',
        )
        checkout_mock = mocker.patch(
            'subspector.subspector_server.controllers.subscription._create_stripe_checkout_session',
            return_value={'url': 'session'},
        )
        code, response = self.client.update_owner_subscription(
            customer['owner_id'], plan_1['id']
        )
        assert code == 200
        checkout_mock.assert_called_with(
            'cust_1', plan_1['price_id'], 'localhost', trial_days)
        assert response['result'] == 'checkout_session_created'
        assert response['url'] == 'session'

        # mock worker after payment
        mocker.patch(
            'subspector.subspector_server.controllers.subscription._publish_task')
        code, response = self.client.subscription_update(
            subscription['id'], {'price_id': plan_1['price_id'],
                                 'stripe_status': 'trialing'}
        )
        assert code == 200
        assert response['plan_id'] == plan_1['id']
        mocker.patch(
            'subspector.subspector_server.controllers.subscription._get_stripe_subscription',
            return_value={'id': 'subs_1', 'status': 'active'},
        )
        portal_mock = mocker.patch(
            'subspector.subspector_server.controllers.subscription._create_stripe_billing_portal',
            return_value={'url': 'portal'},
        )
        code, response = self.client.update_owner_subscription(customer['owner_id'])
        portal_mock.assert_called_with('cust_1', 'localhost')
        assert response['result'] == 'billing_portal_created'
        assert response['url'] == 'portal'

        plan_2 = self._prepare_plan('test_2', price_id='test_2', trial_days=trial_days)
        mocker.patch(
            'subspector.subspector_server.controllers.subscription._update_stripe_subscription_price'
        )
        code, response = self.client.update_owner_subscription(
            customer['owner_id'], plan_2['id']
        )
        assert code == 200
        assert response['result'] == 'plan_changed'

        # mock worker after prorations
        code, response = self.client.subscription_update(
            subscription['id'], {'price_id': plan_2['price_id']}
        )
        assert code == 200
        assert response['plan_id'] == plan_2['id']

        mocker.patch(
            'subspector.subspector_server.controllers.subscription._cancel_stripe_subscription'
        )
        code, response = self.client.update_owner_subscription(
            customer['owner_id'], plan['id']
        )
        assert code == 200
        assert response['result'] == 'subscription_canceled'

        mocker.patch(
            'subspector.subspector_server.controllers.subscription._reactivate_stripe_subscription'
        )
        mocker.patch(
            'subspector.subspector_server.controllers.subscription._get_stripe_subscription',
            return_value={
                'id': 'subs_1',
                'status': 'active',
                'cancel_at_period_end': True,
            },
        )
        code, response = self.client.update_owner_subscription(
            customer['owner_id'], plan_2['id']
        )
        assert code == 200
        assert response['result'] == 'subscription_reactivated'

        # mock worker after canceled subscription
        code, response = self.client.subscription_update(
            subscription['id'],
            {'price_id': plan_2['price_id'], 'stripe_status': 'canceled'},
        )
        assert code == 200
        assert response['plan_id'] == plan['id']
        mocker.patch(
            'subspector.subspector_server.controllers.subscription._get_stripe_subscription',
            return_value={'id': 'subs_1', 'status': 'canceled'},
        )
        code, response = self.client.update_owner_subscription(
            customer['owner_id'], plan_1['id']
        )
        assert code == 200
        assert response['result'] == 'checkout_session_created'
        # 0 trial days on second checkout
        checkout_mock.assert_called_with(
            'cust_1', plan_1['price_id'], 'localhost', 0)
