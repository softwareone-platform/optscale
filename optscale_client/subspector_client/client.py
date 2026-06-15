import json
import logging
from abc import ABCMeta
from urllib.parse import urlencode

import requests
from retrying import retry

LOG = logging.getLogger(__name__)


def retry_if_connection_error(exception):
    if isinstance(exception, requests.ConnectionError):
        return True
    if isinstance(exception, requests.HTTPError):
        if exception.response.status_code in (503,):
            return True
    return False


def query_url(**query):
    query = {key: value for key, value in query.items() if value is not None}
    encoded_query = urlencode(query, doseq=True)
    return "?" + encoded_query


class AbstractHttpProvider(metaclass=ABCMeta):
    def __init__(self, secret="", ip=None):
        self._secret = secret
        self._ip = ip

    @property
    def headers(self):
        headers = {"Secret": str(self._secret), "Content-type": "application/json"}
        if self._ip:
            headers.update({"X-Forwarded-For": self._ip})
        return headers

    @property
    def secret(self):
        return self._secret

    @secret.setter
    def secret(self, value):
        self._secret = value

    @property
    def ip(self):
        return self._ip


class RequestsHttpProvider(AbstractHttpProvider):
    def __init__(self, url, secret="", verify=True, ip=None):
        self.url = url
        self.verify = verify
        self.session = requests.session()
        super().__init__(secret, ip)

    @retry(
        stop_max_delay=10000,
        wait_fixed=1000,
        retry_on_exception=retry_if_connection_error,
    )
    def request(self, url, method, data=None):
        full_url = self.url + url
        response = self.session.request(
            method, full_url, data=data, headers=self.headers, verify=self.verify
        )
        response.raise_for_status()
        response_body = None
        if response.status_code != requests.codes.no_content:
            response_body = json.loads(response.content.decode("utf-8"))
        return response.status_code, response_body

    def close(self):
        self.session.close()


class Client:
    def __init__(
        self,
        address="127.0.0.1",
        port="80",
        api_version="v2",
        url=None,
        http_provider=None,
        secret="",
        verify=True,
        ip=None,
    ):
        if http_provider is None:
            if url is None:
                url = "http://%s:%s" % (address, port)
            http_provider = RequestsHttpProvider(url, secret, verify, ip)
        self._http_provider = http_provider
        self._api_version = api_version

    def _url(self, sub_url):
        return f"/subspector/{self._api_version}/{sub_url}"

    def _request(self, url, method, body=None):
        data = None
        if body is not None:
            data = json.dumps(body)
        return self._http_provider.request(url=self._url(url),
                                           method=method, data=data)

    def get(self, url, body=None):
        return self._request(url, "GET", body)

    def post(self, url, body):
        return self._request(url, "POST", body)

    def put(self, url, body):
        return self._request(url, "PUT", body)

    def patch(self, url, body):
        return self._request(url, "PATCH", body)

    def delete(self, url):
        return self._request(url, "DELETE")

    @property
    def secret(self):
        return self._http_provider.secret

    @secret.setter
    def secret(self, value):
        self._http_provider.secret = value

    @staticmethod
    def plans_url(_id=None):
        url = 'plans'
        if _id:
            url += '/%s' % _id
        return url

    def plan_create(self, params):
        return self.post(self.plans_url(), params)

    def plan_list(self, owner_id=None, include_deleted=False):
        query_params = {'include_deleted': include_deleted}
        if owner_id:
            query_params['owner_id'] = owner_id
        return self.get(self.plans_url() + query_url(**query_params))

    def plan_delete(self, _id):
        return self.delete(self.plans_url(_id))

    def plan_update(self, _id, params):
        return self.patch(self.plans_url(_id), params)

    @staticmethod
    def customers_url(_id=None):
        url = 'customers'
        if _id:
            url += '/%s' % _id
        return url

    def customer_create(self, params):
        return self.post(self.customers_url(), params)

    def customer_list(self, connected_only=False):
        query_params = {'connected_only': connected_only}
        return self.get(self.customers_url() + query_url(**query_params))

    @staticmethod
    def subscriptions_url(_id=None):
        url = 'subscriptions'
        if _id:
            url += '/%s' % _id
        return url

    def subscription_update(self, _id, params):
        return self.patch(self.subscriptions_url(_id), params)

    def subscription_list(self):
        return self.get(self.subscriptions_url())

    @staticmethod
    def owners_url(owner_id):
        return 'owners/%s' % owner_id

    @staticmethod
    def owner_subscription_url(owner_id):
        return '%s/subscription' % Client.owners_url(owner_id)

    @staticmethod
    def owner_customer_url(owner_id):
        return '%s/customer' % Client.owners_url(owner_id)

    def update_owner_subscription(self, owner_id, plan_id=None):
        return self.patch(self.owner_subscription_url(owner_id), {
            'plan_id': plan_id
        })

    def get_owner_subscription(self, owner_id):
        return self.get(self.owner_subscription_url(owner_id))

    def customer_delete(self, owner_id):
        return self.delete(self.owner_customer_url(owner_id))

    def close(self):
        self._http_provider.close()
