import logging
from docker_images.keeper_executor.events import Events
from docker_images.keeper_executor.executors.main_events import (
    MainEventExecutor
)

LOG = logging.getLogger(__name__)


class MlEventsExecutor(MainEventExecutor):
    @property
    def action_event_map(self):
        return {
            'task_created': Events.N0123,
            'task_deleted': Events.N0124,
            'task_updated': Events.N0125,
            'task_metric_updated': Events.N0126,
            'metric_created': Events.N0127,
            'metric_deleted': Events.N0128,
            'metric_updated': Events.N0129,
            'run_started': Events.N0130,
            'run_failed': Events.N0131,
            'run_deleted': Events.N0132,
            'run_state_updated': Events.N0133,
            'platform_created': Events.N0134,
            'leaderboard_template_created': Events.N0135,
            'leaderboard_template_deleted': Events.N0136,
            'leaderboard_template_updated': Events.N0137,
            'leaderboard_created': Events.N0138,
            'leaderboard_deleted': Events.N0139,
            'leaderboard_updated': Events.N0140,
            'dataset_created': Events.N0141,
            'dataset_deleted': Events.N0142,
            'dataset_updated': Events.N0143,
            'model_created': Events.N0144,
            'model_deleted': Events.N0145,
            'model_updated': Events.N0146,
            'model_version_created': Events.N0147,
            'model_version_deleted': Events.N0148,
            'model_version_updated': Events.N0149,
            'artifact_created': Events.N0150,
            'artifact_deleted': Events.N0151,
            'artifact_updated': Events.N0152,
            'runset_template_created': Events.N0153,
            'runset_template_deleted': Events.N0154,
            'runset_template_updated': Events.N0155,
            'runset_created': Events.N0156,
            'runset_state_updated': Events.N0157,
            'runner_created': Events.N0158,
            'runner_state_updated': Events.N0159,
            'runner_destroyed': Events.N0160
        }

    def _execute(self, event, task):
        action = task.get('action')
        object_id = task.get('object_id')
        object_type = task.get('object_type')
        required_params = [object_id, object_type, action]
        if any(map(lambda x: x is None, required_params)):
            raise Exception('Invalid task received: {}'.format(task))
        profiling_token = task.get('profiling_token')
        infrastructure_token = task.get('infrastructure_token')
        if infrastructure_token:
            _, data = self.rest_cl.profiling_token_by_infrastructure_token_get(
                infrastructure_token
            )
        elif profiling_token:
            _, data = self.rest_cl.profiling_token_info_get(
                profiling_token
            )
        else:
            raise Exception('Invalid task received: {}'.format(task))
        task['organization_id'] = data['organization_id']
        return super()._execute(event, task)
