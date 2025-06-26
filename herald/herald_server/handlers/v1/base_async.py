import logging

from herald.herald_server.exceptions import Err
from herald.herald_server.handlers.v1.base import BaseHandler
from tools.optscale_exceptions.common_exc import ConflictException, NotFoundException, WrongArgumentsException
from tools.optscale_exceptions.http_exc import OptHTTPError

LOG = logging.getLogger(__name__)


class BaseAsyncCollectionHandler(BaseHandler):
    def _validate_params(self, **kwargs):
        pass

    async def post(self, **url_params):
        data = self._request_body()
        data.update(url_params)
        self._validate_params(**data)
        try:
            res = await self.controller.create(**data)
        except WrongArgumentsException as exc:
            raise OptHTTPError.from_opt_exception(400, exc)
        except NotFoundException as exc:
            raise OptHTTPError.from_opt_exception(404, exc)
        except ConflictException as exc:
            raise OptHTTPError.from_opt_exception(409, exc)
        self.set_status(201)
        self.write(res.to_json())


class BaseAsyncItemHandler(BaseHandler):
    def _validate_params(self, item, **kwargs):
        pass

    async def _get_item(self, item_id, **kwargs):
        res = await self.controller.get(item_id, **kwargs)
        if res is None:
            raise OptHTTPError(404, Err.G0002, [item_id])
        return res

    async def get(self, id, **kwargs):
        try:
            item = await self._get_item(id, **kwargs)
            self._validate_params(item, **kwargs)
            self.write(item.to_json())
        except NotFoundException as exc:
            raise OptHTTPError.from_opt_exception(404, exc)

    async def patch(self, id, **kwargs):
        data = self._request_body()
        item = await self._get_item(id)
        self._validate_params(item, **kwargs)
        try:
            res = await self.controller.edit(id, **data)
        except WrongArgumentsException as exc:
            raise OptHTTPError.from_opt_exception(400, exc)
        except NotFoundException as exc:
            raise OptHTTPError.from_opt_exception(404, exc)
        except ConflictException as exc:
            raise OptHTTPError.from_opt_exception(409, exc)
        self.write(res.to_json())

    async def delete(self, id, **kwargs):
        item = await self._get_item(id)
        self._validate_params(item, **kwargs)
        try:
            await self.controller.delete(id, **kwargs)
        except NotFoundException as exc:
            raise OptHTTPError.from_opt_exception(404, exc)
        except WrongArgumentsException as exc:
            raise OptHTTPError.from_opt_exception(400, exc)
        self.set_status(204)
