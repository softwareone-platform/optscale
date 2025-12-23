from subspector.subspector_server.tests.unittests.test_api_base import TestBase
from subspector.subspector_server.utils import get_current_timestamp


class TestEvents(TestBase):
    @staticmethod
    def _generate_webhook_body(
        stripe_subscription_id,
        stripe_customer_id,
        price_id,
        cancel_at_period_end=False,
        quantity=1,
        stripe_status='active',
        current_period_end=None,
        created_at=None,
    ):
        if not current_period_end:
            current_period_end = get_current_timestamp()
        if not created_at:
            created_at = get_current_timestamp()
        return {
            'created': created_at,
            'data': {
                'object': {
                    'cancel_at_period_end': cancel_at_period_end,
                    'customer': stripe_customer_id,
                    'id': stripe_subscription_id,
                    'items': {
                        'data': [
                            {
                                'current_period_end': current_period_end,
                                'price': {
                                    'id': price_id,
                                },
                                'quantity': quantity,
                            }
                        ],
                    },
                    'status': stripe_status,
                }
            },
            'id': 'evt_1Rpk8FGfhzciRwUdMa06d1BW',
            'type': 'customer.subscription.created',
        }

    def test_webhook_invalid_customer(self, mocker):
        payload = self._generate_webhook_body('1', '1', '1')
        code, response = self.client.post('events', body=payload)
        assert code == 404
        assert response['detail'] == 'Customer 1 not found'

    def test_webhook_not_existing_price(self, mocker):
        code, _ = self.client.plan_create({'name': 'free'})
        assert code == 201
        code, customer = self.client.customer_create({'owner_id': '123'})
        assert code == 201

        stripe_customer_id = 'cust_1'
        valid_price = 'price_123'
        mocker.patch(
            'subspector.subspector_server.controllers.plan.find_price',
            return_value={'unit_amount': 1, 'currency': 'usd'}
        )
        code, plan = self.client.plan_create({
            'name': 'pro',
            'price_id': valid_price,
            'trial_days': 1
        })
        assert code == 201

        mocker.patch(
            'subspector.subspector_server.controllers.subscription._create_stripe_customer',
            return_value=stripe_customer_id,
        )
        checkout_mock = mocker.patch(
            'subspector.subspector_server.controllers.subscription._create_stripe_checkout_session',
            return_value={'url': 'session'},
        )
        code, response = self.client.update_owner_subscription(
            customer['owner_id'], plan['id']
        )
        assert code == 200
        checkout_mock.assert_called_with(
            stripe_customer_id, plan['price_id'], 'localhost', 1)

        not_ex_price = 'not_existing_price'
        payload = self._generate_webhook_body(
            stripe_subscription_id='subs_1',
            stripe_customer_id=stripe_customer_id,
            price_id=not_ex_price,
            created_at=get_current_timestamp() + 1,
        )
        code, response = self.client.post('events', body=payload)
        assert code == 404

    def test_webhook(self, mocker):
        code, free_plan = self.client.plan_create({
            'name': 'free'
        })
        assert code == 201
        code, customer = self.client.customer_create({'owner_id': '123'})
        assert code == 201

        stripe_customer_id = 'cust_1'
        valid_price = 'price_123'
        mocker.patch(
            'subspector.subspector_server.controllers.plan.find_price',
            return_value={'unit_amount': 1, 'currency': 'usd'}
        )
        code, plan = self.client.plan_create({
            'name': 'pro',
            'price_id': valid_price,
            'trial_days': 1,
        })
        assert code == 201

        mocker.patch(
            'subspector.subspector_server.controllers.subscription._create_stripe_customer',
            return_value=stripe_customer_id,
        )
        checkout_mock = mocker.patch(
            'subspector.subspector_server.controllers.subscription._create_stripe_checkout_session',
            return_value={'url': 'session'},
        )
        code, response = self.client.update_owner_subscription(
            customer['owner_id'], plan['id']
        )
        assert code == 200
        checkout_mock.assert_called_with(
            stripe_customer_id, plan['price_id'], 'localhost', 1)

        task_mock = mocker.patch(
            'subspector.subspector_server.controllers.subscription._publish_task')
        payload = self._generate_webhook_body(
            stripe_subscription_id='subs_1',
            stripe_customer_id=stripe_customer_id,
            price_id=valid_price,
            created_at=get_current_timestamp() + 1,
        )
        code, response = self.client.post('events', body=payload)
        assert code == 200
        assert response is None
        task_mock.assert_called_once_with(mocker.ANY, customer['owner_id'], 10)

        code, response = self.client.subscription_list()
        assert code == 200
        subscription = response[0]
        assert subscription['plan_id'] == plan['id']
        assert subscription['updated_at'] == payload['created']
        assert subscription['stripe_subscription_id'] == 'subs_1'
        assert subscription['customer_id'] == customer['id']

        payload = self._generate_webhook_body(
            stripe_subscription_id='subs_1',
            stripe_customer_id=stripe_customer_id,
            price_id=valid_price,
            created_at=get_current_timestamp() - 100,
        )
        get_subscription_mock = mocker.patch(
            'subspector.subspector_server.controllers.event._get_stripe_subscription',
            return_value=payload['data']['object'],
        )
        task_mock.reset_mock()
        code, response = self.client.post('events', body=payload)
        get_subscription_mock.assert_called_with('subs_1')
        assert code == 200
        assert response is None
        task_mock.assert_not_called()

        code, response = self.client.subscription_list()
        assert code == 200
        subscription = response[0]
        assert subscription['plan_id'] == plan['id']
        assert subscription['stripe_subscription_id'] == 'subs_1'
        assert subscription['customer_id'] == customer['id']

        payload = self._generate_webhook_body(
            stripe_subscription_id='subs_1',
            stripe_customer_id=stripe_customer_id,
            price_id=valid_price,
            stripe_status='canceled',
            created_at=get_current_timestamp() + 2,
        )
        task_mock.reset_mock()
        code, response = self.client.post('events', body=payload)
        assert code == 200
        code, response = self.client.subscription_list()
        assert code == 200
        subscription = response[0]
        assert subscription['plan_id'] == free_plan['id']
        assert subscription['stripe_subscription_id'] is None
        task_mock.assert_called_once_with(mocker.ANY, customer['owner_id'], 10)
