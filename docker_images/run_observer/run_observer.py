import os
import logging
from pymongo import MongoClient, UpdateOne

from optscale_client.config_client.client import Client as ConfigClient
from optscale_client.rest_api_client.client_v2 import Client as RestClient
from tools.optscale_time.optscale_time import utcnow_timestamp

ARCEE_WAIT_TIMEOUT = 600
CHUNK_SIZE = 200
STATE_STARTED = 1
STATE_FINISHED = 2
LOG = logging.getLogger(__name__)


class RunObserver:
    def __init__(self):
        self._config_client = None
        self._restapi_client = None
        self._mongo_client = None
        self.now_ts = utcnow_timestamp()

    @property
    def config_client(self):
        if not self._config_client:
            etcd_host = os.environ.get('HX_ETCD_HOST')
            etcd_port = int(os.environ.get('HX_ETCD_PORT'))
            self._config_client = ConfigClient(host=etcd_host, port=etcd_port)
        return self._config_client

    @property
    def restapi_client(self):
        if not self._restapi_client:
            if self._restapi_client is None:
                self._restapi_client = RestClient(
                    url=self.config_client.restapi_url(),
                    secret=self.config_client.cluster_secret())
        return self._restapi_client

    @property
    def mongo_client(self):
        if not self._mongo_client:
            mongo_params = self.config_client.mongo_params()
            self._mongo_client = MongoClient(mongo_params[0])
        return self._mongo_client

    def get_arcee_timeout(self):
        try:
            return int(self.config_client.get(
                "/bulldozer_worker/arcee_wait_timeout").value)
        except Exception:
            LOG.warning("Arcee wait timeout not found, will use default arcee "
                        "timeout")
            return ARCEE_WAIT_TIMEOUT

    def observe(self):
        LOG.info('Started observing runs')
        arcee_timeout = self.get_arcee_timeout()
        starting_point = self.now_ts - arcee_timeout
        _, organizations = self.restapi_client.organization_list(
            {"is_demo": False, "disabled": False})
        runs_to_update = []
        for organization in organizations["organizations"]:
            run_count = 0
            organization_id = organization["id"]
            _, resp = self.restapi_client.profiling_token_get(organization_id)
            task_ids = [x["_id"] for x in self.mongo_client.arcee.task.find(
                {"token": resp["token"], "deleted_at": 0}, {"_id": 1})]
            for i in range(0, len(task_ids), CHUNK_SIZE):
                task_chunk = task_ids[i:i + CHUNK_SIZE]
                runs = self.mongo_client.arcee.run.find(
                            {"task_id": {"$in": task_chunk},
                             "start": {"$lt": starting_point},
                             "state": STATE_STARTED,
                             "finish": None,
                             "deleted_at": 0},
                            {"_id": 1})
                run_ids = [x["_id"] for x in runs]
                for j in range(0, len(run_ids), CHUNK_SIZE):
                    run_chunk = run_ids[j:j + CHUNK_SIZE]
                    proc_data = self.mongo_client.arcee.proc_data.aggregate([
                        {"$match": {"run_id": {"$in": run_chunk}}},
                        {"$group": {"_id": "$run_id",
                                    "last_ts": {"$max": "$timestamp"}}},
                    ])
                    for data in proc_data:
                        run_id = data["_id"]
                        run_chunk.remove(run_id)
                        last_ts = data["last_ts"]
                        if starting_point > last_ts:
                            ts = last_ts if last_ts else self.now_ts
                            runs_to_update.append(UpdateOne(
                                {"_id": run_id},
                                {"$set": {"finish": ts,
                                          "state": STATE_FINISHED}}))
                            run_count = run_count + 1
                            if len(runs_to_update) >= CHUNK_SIZE:
                                self.mongo_client.arcee.run.bulk_write(
                                    runs_to_update)
                                runs_to_update.clear()
                    if run_chunk:
                        run_count = run_count + len(run_chunk)
                        for run_id in run_chunk:
                            runs_to_update.append(UpdateOne(
                                {"_id": run_id},
                                {"$set": {"finish": self.now_ts,
                                          "state": STATE_FINISHED}}))
            if runs_to_update:
                self.mongo_client.arcee.run.bulk_write(runs_to_update)
                runs_to_update.clear()
            LOG.info(f"Finished processing for organization {organization_id},"
                     f"updated {run_count} runs")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    observer = RunObserver()
    observer.observe()
