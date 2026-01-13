FROM python:3.12.3-slim

ENV PYTHONPATH /usr/src/app/
WORKDIR /usr/src/app/

COPY optscale_client/config_client optscale_client/config_client
COPY optscale_client/rest_api_client optscale_client/rest_api_client
COPY optscale_client/subspector_async_client optscale_client/subspector_async_client
COPY docker_images/bailiff/requirements.txt docker_images/bailiff/
RUN pip install --no-cache-dir -r docker_images/bailiff/requirements.txt

COPY docker_images/bailiff/*.py docker_images/bailiff/

CMD ["python3", "docker_images/bailiff/worker.py"]
