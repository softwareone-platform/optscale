FROM python:3.12.3-slim

WORKDIR /usr/src/app/
ENV PYTHONPATH /usr/src/app/

COPY optscale_client/config_client optscale_client/config_client
COPY optscale_client/insider_client optscale_client/insider_client
COPY optscale_client/rest_api_client optscale_client/rest_api_client
COPY tools/cloud_adapter tools/cloud_adapter
COPY tools/optscale_time tools/optscale_time

COPY docker_images/resource_discovery/requirements.txt docker_images/resource_discovery/
RUN pip install --no-cache-dir -r docker_images/resource_discovery/requirements.txt

COPY docker_images/resource_discovery/scheduler.py docker_images/resource_discovery/worker.py docker_images/resource_discovery/

CMD ["python3", "docker_images/resource_discovery/worker.py"]
