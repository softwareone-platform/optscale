import logging
from slack_sdk.web.client import WebClient

from slacker.slacker_server.utils import retry_too_many_requests

LOG = logging.getLogger(__name__)


class SlackClient(WebClient):
    def __init__(self, installation_store, **kwargs):
        self._installation_store = installation_store
        super().__init__(**kwargs)

    def get_client(self, team_id=None):
        bot = self._installation_store.find_bot(
            team_id=team_id, enterprise_id=None)
        return WebClient(token=bot.bot_token)

    def get_bot_conversations(self, team_id=None, exclude_archived=True,
                              types='public_channel, private_channel'):
        client = self.get_client(team_id=team_id)
        conversation_list = []
        cursor = ''
        while True:
            resp = retry_too_many_requests(
                client.users_conversations, cursor=cursor, team_id=team_id,
                types=types, limit=1000, exclude_archived=exclude_archived)
            cursor = resp['response_metadata']['next_cursor']
            conversation_list.extend(resp['channels'])
            if not cursor:
                break
        return conversation_list

    def chat_post(self, *, channel_id=None, team_id=None, **kwargs):
        client = self.get_client(team_id=team_id)
        return client.chat_postMessage(channel=channel_id, **kwargs)
