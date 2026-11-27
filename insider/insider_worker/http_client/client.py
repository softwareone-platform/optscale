import json
import requests
from retrying import retry

# (connect, read) timeouts in seconds. A single Azure retail prices page is
# small; a hung socket must not block the worker forever.
DEFAULT_TIMEOUT = (10, 120)


def retry_if_connection_error(exception):
    if isinstance(exception, (requests.ConnectionError, requests.Timeout)):
        return True
    if isinstance(exception, requests.HTTPError):
        if exception.response.status_code in (503, 504):
            return True
        # retry too many requests
        elif exception.response.status_code in (429,):
            return True
    return False


class Client:
    def __init__(self, verify=True, timeout=DEFAULT_TIMEOUT):
        self._session = None
        self.verify = verify
        self.timeout = timeout

    @property
    def session(self):
        if not self._session:
            self._session = requests.session()
            self._session.verify = self.verify
        return self._session

    @retry(retry_on_exception=retry_if_connection_error, wait_fixed=10000,
           stop_max_attempt_number=10)
    def request(self, url, method):
        response = self.session.request(method, url, timeout=self.timeout)
        response.raise_for_status()
        response_body = None
        # pylint: disable=E1101
        if response.status_code != requests.codes.no_content:
            content_type = response.headers.get('Content-Type', '')
            if 'application/json' in content_type:
                response_body = json.loads(
                    response.content.decode('utf-8'))
            elif 'text/plain' in content_type:
                response_body = response.content.decode()
            else:
                response_body = response.content
        return response.status_code, response_body

    def get(self, url):
        return self.request(url, "GET")

    @retry(retry_on_exception=retry_if_connection_error, wait_fixed=10000,
           stop_max_attempt_number=10)
    def stream(self, url):
        """
        GET a large body without loading it into memory. The caller iterates
        over the returned response (``iter_lines`` / ``iter_content``) and
        closes it. Retries cover the request itself, not a failure while the
        body is being read.
        """
        response = self.session.get(url, stream=True, timeout=self.timeout)
        try:
            response.raise_for_status()
        except requests.HTTPError:
            response.close()
            raise
        return response

    def __del__(self):
        if self._session:
            self._session.close()
