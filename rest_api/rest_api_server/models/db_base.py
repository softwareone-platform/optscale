from retrying import retry
from sqlalchemy.orm import scoped_session, sessionmaker

import rest_api.rest_api_server.models.models as model_base

DEFAULT_STOP_MAX_ATTEMPT_NUMBER = 300
DEFAULT_WAIT_FIXED = 1000
DEFAULT_RETRY_ARGS = dict(
    stop_max_attempt_number=DEFAULT_STOP_MAX_ATTEMPT_NUMBER,
    wait_fixed=DEFAULT_WAIT_FIXED
)


def should_retry(exception):
    return True


class BaseDB(object):
    uses_migrations = False

    def __init__(self, config=None):
        self._engine = None
        self._config = config

    @staticmethod
    def session(engine):
        """
        scoped session is a factory that maps results of scopefunc to sessions
        so if scopefunc returns request object, scoped_session returns
        the same session for a single request,
        but different sessions for different requests.
        """
        return scoped_session(sessionmaker(bind=engine))

    @retry(**DEFAULT_RETRY_ARGS, retry_on_exception=should_retry)
    def create_all(self):
        model_base.Base.metadata.create_all(self.engine)

    @property
    def engine(self):
        if not self._engine:
            self._engine = self._get_engine()
        return self._engine

    def _get_engine(self):
        raise NotImplementedError
