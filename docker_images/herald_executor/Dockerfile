FROM python:3.12.3-slim

WORKDIR /usr/src/app/
ENV PYTHONPATH /usr/src/app/

COPY optscale_client/auth_client optscale_client/auth_client
COPY optscale_client/config_client optscale_client/config_client
COPY optscale_client/rest_api_client optscale_client/rest_api_client
COPY optscale_client/herald_client optscale_client/herald_client
COPY tools/optscale_time tools/optscale_time

COPY docker_images/herald_executor/requirements.txt docker_images/herald_executor/
RUN pip install --no-cache-dir -r docker_images/herald_executor/requirements.txt

COPY docker_images/herald_executor/worker.py docker_images/herald_executor/

CMD ["python3", "docker_images/herald_executor/worker.py"]
