FROM python:3.12.3-slim

WORKDIR /usr/src/app/
ENV PYTHONPATH /usr/src/app/

COPY optscale_client/config_client optscale_client/config_client
COPY optscale_client/rest_api_client optscale_client/rest_api_client
COPY docker_images/deactivatorg/requirements.txt docker_images/deactivatorg/
RUN pip install --no-cache-dir -r docker_images/deactivatorg/requirements.txt

COPY docker_images/deactivatorg/deactivatorg.py docker_images/deactivatorg/

CMD ["python3", "docker_images/deactivatorg/deactivatorg.py"]
