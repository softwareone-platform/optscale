import math
from collections import defaultdict
from datetime import datetime
from typing import Optional

from requests.exceptions import HTTPError

from rest_api.rest_api_server.controllers.base_async import (
    BaseAsyncControllerWrapper)
from rest_api.rest_api_server.controllers.profiling.base import (
    ArceeObject, BaseProfilingController, RunCostsMixin, format_dataset)
from rest_api.rest_api_server.exceptions import Err
from rest_api.rest_api_server.models.enums import RunStates

from tools.optscale_exceptions.common_exc import NotFoundException
from tools.optscale_time import utcnow_timestamp

DAY_IN_HOURS = 24
BYTES_IN_MB = 1024 * 1024


class RunBulkController(BaseProfilingController):

    def bulk_runs_get(self, task_id, profiling_token, run_ids):
        try:
            runs = self.bulk_gen_runs(profiling_token, task_id, run_ids)
            for run in runs:
                ArceeObject.format(run)
                if 'dataset' in run:
                    run['dataset'] = format_dataset(run.get('dataset', {}))
            return runs
        except HTTPError as ex:
            if ex.response.status_code == 404:
                raise NotFoundException(
                    Err.OE0002, ['Task', task_id])
            raise


class RunController(BaseProfilingController, RunCostsMixin):
    def formatted_run(
            self, run, task_metrics, datasets, run_costs, console=None,
            include_console=False
    ):
        state = run['state']
        run['status'] = RunStates(state).name
        finish = run.get('finish')
        if not finish and state == RunStates.running:
            finish = utcnow_timestamp()
        run['duration'] = finish - run.get('start') if finish else None
        run['cost'] = run_costs.get(run['id'], 0)
        run['metrics'] = task_metrics
        if run.get('runset_id'):
            run['runset'] = {
                'id': run.pop('runset_id'),
                'name': run.pop('runset_name', None)
            }
        run['dataset'] = datasets.get(run.pop('dataset_id', None))
        if include_console:
            run['console'] = console
        return run

    def _get_datasets(
            self, dataset_ids: set[str], profiling_token: str
    ) -> dict[str, dict]:
        if not dataset_ids:
            return {}
        datasets = self.list_datasets(profiling_token, include_deleted=True)
        datasets_dict = {d['id']: format_dataset(d) for d in filter(
            lambda x: x['id'] in dataset_ids, datasets)}
        if len(dataset_ids) != len(datasets_dict):
            not_found = list(filter(
                lambda x: x not in datasets_dict.keys(), dataset_ids))
            raise NotFoundException(
                Err.OE0002, ['Dataset', ', '.join(not_found)])
        return datasets_dict

    def __get_console(self, run_id: str, profiling_token: str) -> Optional[dict]:
        try:
            console = self.get_console(profiling_token, run_id)
        except HTTPError as ex:
            if ex.response.status_code == 404:
                return
            raise
        return {
            'output': console.get('output'),
            'error': console.get('error')
        }

    def get(self, organization_id, run_id, profiling_token):
        try:
            run = self.get_run(profiling_token, run_id)
        except HTTPError as ex:
            if ex.response.status_code == 404:
                raise NotFoundException(Err.OE0002, ['Run', run_id])
            raise
        cloud_accounts_ids = self.get_cloud_account_ids(organization_id)
        run_costs = self._get_run_costs(cloud_accounts_ids, [run])
        metrics = self.__get_task_metrics(
            run['task_id'], profiling_token)
        datasets = {}
        if run.get('dataset_id'):
            datasets = self._get_datasets({run['dataset_id']}, profiling_token)
        console = self.__get_console(run_id, profiling_token)
        return self.formatted_run(
            run, metrics, datasets, run_costs, console, include_console=True)

    def list(self, organization_id, task_id, profiling_token, **kwargs):
        start_date = kwargs.get('start_date')
        end_date = kwargs.get('end_date')
        try:
            data = self.list_task_runs(profiling_token, task_id)
        except HTTPError as ex:
            if ex.response.status_code == 404:
                raise NotFoundException(
                    Err.OE0002, ['Task', task_id])
            raise
        runs = []
        dataset_ids = set()
        for run in data:
            run_start = run['start']
            if start_date and start_date > run_start:
                continue
            if end_date and end_date < run_start:
                continue
            runs.append(run)
            if run.get('dataset_id'):
                dataset_ids.add(run['dataset_id'])
        cloud_accounts_ids = self.get_cloud_account_ids(organization_id)
        run_costs = self._get_run_costs(cloud_accounts_ids, runs)
        metrics = self.__get_task_metrics(task_id, profiling_token)
        datasets = self._get_datasets(dataset_ids, profiling_token)
        return sorted([
            self.formatted_run(run, metrics, datasets, run_costs) for run in runs
        ], key=lambda d: d['start'])

    def __get_task_metrics(self, task_id, profiling_token):
        try:
            task = self.get_task(profiling_token, task_id)
        except HTTPError as ex:
            if ex.response.status_code == 404:
                raise NotFoundException(Err.OE0002, ['Task', task_id])
            raise
        return task['metrics']

    def get_cloud_account_ids(self, organization_id):
        return list(self._get_cloud_accounts(organization_id).keys())

    def breakdown_get(self, organization_id, run_id, profiling_token):
        def _aggregate(values, func_name):
            functions = {
                'avg': lambda x: sum(x) / len(x),
                'max': lambda x: max(x),
                'sum': lambda x: sum(x),
                'last': lambda x: x[-1]
            }
            return functions.get(func_name)(values)

        try:
            run = self.get_run(profiling_token, run_id)
            logs = self.list_logs(profiling_token, run_id)
            milestones = self.list_milestones(profiling_token, run_id)
            stages = self.list_stages(profiling_token, run_id)
            proc_data = self.list_proc_data(profiling_token, run_id)
        except HTTPError as ex:
            if ex.response.status_code == 404:
                raise NotFoundException(Err.OE0002, ['Run', run_id])
            raise
        metrics = self.__get_task_metrics(
            run['task_id'], profiling_token)
        executors = run.get('executors', [])
        log_times = list(map(lambda x: x['timestamp'], logs)) or [run['start']]
        min_time = math.ceil(min([min(log_times), run['start']]))
        max_time = math.ceil(max([max(log_times), run.get('finish') or 0]))
        metric_function_map = {g['key']: g.get('func') for g in metrics}
        result = {}
        for p in proc_data:
            t = math.ceil(p['timestamp'])
            if t not in result:
                result[t] = defaultdict(lambda: defaultdict(list))
            instance_id = p.get('instance_id')
            if instance_id:
                result[t]['metrics']['executors_count'].append(instance_id)
            proc_stats = p.get('proc_stats', {})
            for stats_key, fields_map in {
                'ps_stats': {
                    'ram': 'used_ram_mb',
                    'cpu': 'cpu_percent'
                },
                'gpu_stats': {
                    'gpu_load': 'avg_gpu_load',
                    'gpu_memory_free': 'avg_gpu_memory_free',
                    'gpu_memory_total': 'avg_gpu_memory_total',
                    'gpu_memory_used': 'avg_gpu_memory_used'
                }
            }.items():
                stats = proc_stats.get(stats_key, {})
                for k, v in fields_map.items():
                    value = stats.get(v)
                    if value is not None:
                        result[t]['metrics'][k].append(value)
            proc = proc_stats.get('proc', {})
            process_cpu = proc.get('cpu')
            if process_cpu is not None:
                result[t]['metrics']['process_cpu'].append(process_cpu)
            process_ram = proc.get('mem', {}).get('vms', {}).get('t')
            if process_ram is not None:
                result[t]['metrics']['process_ram'].append(
                    process_ram / BYTES_IN_MB)
        for log in logs:
            t = math.ceil(log['timestamp'])
            if t not in result:
                result[t] = defaultdict(lambda: defaultdict(list))
            for k, v in log.get('data', {}).items():
                if k not in metric_function_map:
                    continue
                if isinstance(v, str):
                    v = float(v)
                result[t]['data'][k].append(v)
        for i in range(min_time, max_time + 1):
            breakdown = result.get(i)
            if not breakdown:
                result[i] = dict(metrics={}, data={})
                continue
            count = result[i]['metrics'].pop('executors_count', [])
            for key in ['metrics', 'data']:
                fields = list(result[i][key].keys())
                for k in fields:
                    objects = result[i][key].get(k)
                    if objects:
                        func = metric_function_map.get(k) or 'avg'
                        result[i][key][k] = _aggregate(objects, func)
            result[i]['metrics']['executors_count'] = len(set(count))
        return {
            'executors': executors,
            'breakdown': result,
            'milestones': milestones,
            'stages': stages,
        }

    def delete(self, id, profiling_token):
        try:
            self.delete_run(profiling_token, id)
        except HTTPError as ex:
            if ex.response.status_code == 404:
                raise NotFoundException(Err.OE0002, ['Run', id])
            raise


class RunAsyncController(BaseAsyncControllerWrapper):
    def _get_controller_class(self):
        return RunController


class RunBulkAsyncController(BaseAsyncControllerWrapper):
    def _get_controller_class(self):
        return RunBulkController
