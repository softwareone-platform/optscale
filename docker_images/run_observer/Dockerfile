FROM python:3.12.3-slim
LABEL org.opencontainers.image.authors="Hystax"

WORKDIR /usr/src/app/
ENV PYTHONPATH /usr/src/app/

COPY tools/optscale_time tools/optscale_time
COPY optscale_client/config_client optscale_client/config_client
COPY optscale_client/rest_api_client optscale_client/rest_api_client

COPY docker_images/run_observer/requirements.txt docker_images/run_observer/
RUN pip install --no-cache-dir -r docker_images/run_observer/requirements.txt

COPY docker_images/run_observer/run_observer.py docker_images/run_observer/run_observer.py

CMD ["python3", "docker_images/run_observer/run_observer.py"]
