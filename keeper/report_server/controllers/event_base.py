import re
import logging
import hashlib
from requests import HTTPError
from mongoengine.queryset.visitor import Q

from keeper.report_server.exceptions import Err
from keeper.report_server.model import ReadEvent, Event
from keeper.report_server.controllers.base import BaseController

from tools.optscale_exceptions.common_exc import UnauthorizedException


LOG = logging.getLogger(__name__)


class EventBaseController(BaseController):
    def __init__(self, mongo_client, config):
        super().__init__(mongo_client, config)

    def get_poll_resources(self, token):
        return self.get_resources(token, "POLL_EVENT")

    def get_ack_resources(self, token):
        return self.get_resources(token, "ACK_EVENT")

    def get_token_meta(self, digests):
        """
        Get token meta such as user id from auth
        :return:
        """
        self.auth_client.secret = self._config.cluster_secret()
        try:
            _, token_meta_dict = self.auth_client.token_meta_get(digests)
        except HTTPError as exc:
            if exc.response.status_code == 401:
                raise UnauthorizedException(Err.OK0003, [])
            raise
        return token_meta_dict

    @staticmethod
    def get_events(
        time_start, time_end, evt_classes, levels, object_types, ack_only,
            limit, description_like
    ):
        # pylint: disable=no-member
        events = Event.objects().order_by("-time")
        if time_start:
            events = events(Q(time__gte=time_start))
        if time_end:
            events = events(Q(time__lt=time_end))
        if evt_classes:
            events = events(Q(evt_class__in=evt_classes))
        if levels:
            events = events(Q(level__in=levels))
        if object_types:
            events = events(Q(object_type__in=object_types))
        if ack_only:
            events = events(Q(ack=True))
        if description_like:
            regex = re.compile(f'.*{description_like}.*', re.IGNORECASE)
            events = events(Q(description=regex))
        if limit:
            events = events[:limit]
        return events

    def get_reads(self, user_id):
        pipeline = [
            {"$match": {"user_id": user_id}},
            {
                "$lookup": {
                    "from": "event",
                    "localField": "event",
                    "foreignField": "_id",
                    "as": "read_event",
                }
            },
            {"$unwind": "$read_event"},
            {"$project": {"event": "$event", "_id": 0}},
        ]
        # pylint: disable=no-member
        ccd = ReadEvent.objects.aggregate(*pipeline)
        return dict(map(lambda x: (str(x["event"]), True), ccd))

    def get_meta_by_token(self, token):
        user_digest = list(
            map(lambda x: hashlib.md5(x.encode("utf-8"), usedforsecurity=False).hexdigest(), [token])
        )[0]
        token_meta = self.get_token_meta([user_digest]).get(user_digest, {})
        return token_meta

    def get_user_id_by_token(self, token):
        return self.get_meta_by_token(token).get("user_id", "")
