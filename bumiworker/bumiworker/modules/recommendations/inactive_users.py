import logging
from collections import OrderedDict
from datetime import datetime, timezone
from bumiworker.bumiworker.modules.inactive_users_base import InactiveUsersBase


DEFAULT_DAYS_THRESHOLD = 90
INTERVAL = 300
GCP_METRIC_NAME = 'iam.googleapis.com/service_account/authn_events_count'
MSEC_IN_SEC = 1000
LOG = logging.getLogger(__name__)


class InactiveUsers(InactiveUsersBase):
    SUPPORTED_CLOUD_TYPES = [
        'aws_cnr',
        'gcp_cnr',
        'nebius'
    ]

    def __init__(self, organization_id, config_client, created_at):
        super().__init__(organization_id, config_client, created_at)
        self.option_ordered_map = OrderedDict({
            'days_threshold': {'default': DEFAULT_DAYS_THRESHOLD},
            'skip_cloud_accounts': {'default': []}
        })

    def list_users(self, cloud_adapter):
        cloud_type = cloud_adapter.config['type']
        if cloud_type == 'nebius':
            result = []
            for folder_id in cloud_adapter.folders:
                result.extend(cloud_adapter.service_accounts_list(folder_id))
        elif cloud_type == 'gcp_cnr':
            result = cloud_adapter.service_accounts_list()
        else:
            result = cloud_adapter.list_users()
        return result

    def handle_aws_user(self, user, now, cloud_adapter, days_threshold):
        inactive_threshold = self._get_inactive_threshold(days_threshold)

        def is_outdated(last_used_):
            return self._is_outdated(now, last_used_, inactive_threshold)

        is_old_user = is_outdated(user.get('CreateDate', now))
        password_last_used = self._get_password_last_used(user)
        is_password_unused = is_outdated(password_last_used)
        if not is_old_user or not is_password_unused:
            return

        access_keys_last_used = self._get_access_keys_last_used(
            user, cloud_adapter)
        is_access_keys_unused = is_outdated(access_keys_last_used)

        if is_password_unused and is_access_keys_unused:
            last_used = max(access_keys_last_used, password_last_used)
            return {
                'user_name': user['UserName'],
                'user_id': user['UserId'],
                'last_used': int(last_used.timestamp())
            }

    def handle_gcp_user(self, user, now, cloud_adapter, days_threshold):
        last_used = 0
        service_account_id = user.unique_id
        inactive_threshold = self._get_inactive_threshold(days_threshold)
        end_date = now
        # there is no created_at for service account, so extend dates range to
        # try to get last_used
        start_date = now - inactive_threshold - inactive_threshold
        service_account_usage = cloud_adapter.get_metric(
            GCP_METRIC_NAME, [service_account_id], INTERVAL, start_date,
            end_date, id_field='unique_id'
        )
        used_dates = [
            point.interval.end_time for data in service_account_usage
            for point in data.points if point.value.double_value != 0
        ]
        if used_dates:
            last_used_dt = max(used_dates)
            last_used = int(last_used_dt.timestamp())
            if not self._is_outdated(now, last_used_dt, inactive_threshold):
                return
        return {
            'user_name': user.display_name,
            'user_id': service_account_id,
            'last_used': last_used
        }

    def handle_nebius_user(self, user, now, cloud_adapter, days_threshold):
        service_account_id = user['id']
        folder_id = user['folderId']
        created_at = datetime.strptime(
            user['createdAt'], '%Y-%m-%dT%H:%M:%SZ').replace(tzinfo=timezone.utc)
        inactive_threshold = self._get_inactive_threshold(days_threshold)
        is_old_user = self._is_outdated(now, created_at, inactive_threshold)
        if not is_old_user:
            return
        end_date = now
        start_date = now - inactive_threshold
        service_account_usage = cloud_adapter.get_service_account_metrics(
            [service_account_id], start_date, end_date, folder_id
        )

        metrics = service_account_usage.get('metrics', [])
        data = []
        for metric in metrics:
            data.extend(metric.get('timeseries', {}).get('int64Values', []))
        if all(x == 0 for x in data):
            last_used = 0
            previous_usage = cloud_adapter.get_service_account_metrics(
                [service_account_id], created_at, start_date, folder_id)
            for metric in previous_usage.get('metrics', []):
                timeseries = metric.get('timeseries', {})
                previous_usage = timeseries.get('int64Values', [])
                previous_usage_dates = timeseries.get('timestamps', [])

                usage_tuples = zip(
                    reversed(previous_usage_dates), reversed(previous_usage))
                usage_date = next(
                    (date for date, usage in usage_tuples if usage), None)
                if usage_date is not None:
                    usage_ts = usage_date // MSEC_IN_SEC
                    last_used = max(last_used, usage_ts)
            return {
                'user_name': user['name'],
                'user_id': service_account_id,
                'last_used': last_used
            }

    def handle_user(self, user, now, cloud_adapter, days_threshold):
        cloud_type = cloud_adapter.config['type']
        cloud_func_map = {
            "aws_cnr": self.handle_aws_user,
            "gcp_cnr": self.handle_gcp_user,
            "nebius": self.handle_nebius_user,
        }
        func = cloud_func_map[cloud_type]
        return func(user, now, cloud_adapter, days_threshold)


def main(organization_id, config_client, created_at, **kwargs):
    return InactiveUsers(organization_id, config_client, created_at).get()


def get_module_email_name():
    return 'Inactive IAM users'
