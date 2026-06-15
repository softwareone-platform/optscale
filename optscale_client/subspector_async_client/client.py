import json
import logging
from abc import ABCMeta
from urllib.parse import urlencode
import httpx
from tenacity import retry, wait_fixed, stop_after_delay, retry_if_exception

LOG = logging.getLogger(__name__)


def query_url(**query):
    query = {k: v for k, v in query.items() if v is not None}
    encoded_query = urlencode(query, doseq=True)
    return "?" + encoded_query if encoded_query else ""


def retry_if_connection_error(exception):
    if isinstance(exception, httpx.ConnectError):
        return True
    if isinstance(exception, httpx.HTTPStatusError):
        if exception.response.status_code == 503:
            return True
    return False


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


class AsyncHttpProvider(AbstractHttpProvider):
    def __init__(self, url, secret="", verify=True, ip=None):
        super().__init__(secret, ip)
        self.url = url
        self.verify = verify
        self.session = httpx.AsyncClient(verify=verify, follow_redirects=True)

    async def close(self):
        await self.session.aclose()

    @retry(
        wait=wait_fixed(1),
        stop=stop_after_delay(10),
        retry=retry_if_exception(retry_if_connection_error)
    )
    async def request(self, url, method, data=None):
        full_url = self.url + url
        response = await self.session.request(
            method, full_url, content=data, headers=self.headers
        )
        response.raise_for_status()
        if response.status_code == 204:
            return response.status_code, None
        return response.status_code, response.json()


class AsyncClient:
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
                url = f"http://{address}:{port}"
            http_provider = AsyncHttpProvider(url, secret, verify, ip)
        self._http_provider = http_provider
        self._api_version = api_version

    def _url(self, sub_url):
        return f"/subspector/{self._api_version}/{sub_url}"

    async def _request(self, url, method, body=None):
        data = None
        if body is not None:
            data = json.dumps(body)
        return await self._http_provider.request(
            url=self._url(url), method=method, data=data)

    async def get(self, url, body=None):
        return await self._request(url, "GET", body)

    async def post(self, url, body):
        return await self._request(url, "POST", body)

    async def put(self, url, body):
        return await self._request(url, "PUT", body)

    async def patch(self, url, body):
        return await self._request(url, "PATCH", body)

    async def delete(self, url):
        return await self._request(url, "DELETE")

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
            url += f'/{_id}'
        return url

    async def plan_create(self, params):
        return await self.post(self.plans_url(), params)

    async def plan_list(self, owner_id=None, include_deleted=False):
        query_params = {'include_deleted': include_deleted}
        if owner_id:
            query_params['owner_id'] = owner_id
        return await self.get(self.plans_url() + query_url(**query_params))

    async def plan_delete(self, _id):
        return await self.delete(self.plans_url(_id))

    async def plan_update(self, _id, params):
        return await self.patch(self.plans_url(_id), params)

    @staticmethod
    def customers_url(_id=None):
        url = 'customers'
        if _id:
            url += f'/{_id}'
        return url

    async def customer_create(self, params):
        return await self.post(self.customers_url(), params)

    async def customer_list(self, connected_only=False):
        query_params = {'connected_only': connected_only}
        return await self.get(self.customers_url() + query_url(**query_params))

    @staticmethod
    def subscriptions_url(_id=None):
        url = 'subscriptions'
        if _id:
            url += f'/{_id}'
        return url

    async def subscription_update(self, _id, params):
        return await self.patch(self.subscriptions_url(_id), params)

    async def subscription_list(self):
        return await self.get(self.subscriptions_url())

    @staticmethod
    def owners_url(owner_id):
        return f'owners/{owner_id}'

    @staticmethod
    def owner_subscription_url(owner_id):
        return f'{AsyncClient.owners_url(owner_id)}/subscription'

    @staticmethod
    def owner_customer_url(owner_id):
        return f'{AsyncClient.owners_url(owner_id)}/customer'

    async def update_owner_subscription(self, owner_id, plan_id=None):
        return await self.patch(self.owner_subscription_url(owner_id),
                                {'plan_id': plan_id})

    async def get_owner_subscription(self, owner_id):
        return await self.get(self.owner_subscription_url(owner_id))

    async def customer_delete(self, owner_id):
        return await self.delete(self.owner_customer_url(owner_id))

    async def close(self):
        await self._http_provider.close()
