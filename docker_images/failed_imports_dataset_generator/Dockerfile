FROM python:3.12.3-slim
LABEL org.opencontainers.image.authors="Hystax"

WORKDIR /usr/src/app/
ENV PYTHONPATH /usr/src/app/

COPY optscale_client/config_client optscale_client/config_client
COPY tools/optscale_time tools/optscale_time
COPY docker_images/failed_imports_dataset_generator/requirements.txt docker_images/failed_imports_dataset_generator/
RUN pip install --no-cache-dir -r docker_images/failed_imports_dataset_generator/requirements.txt

COPY docker_images/failed_imports_dataset_generator/failed_imports_dataset_generator.py docker_images/failed_imports_dataset_generator/

CMD ["python", "docker_images/failed_imports_dataset_generator/failed_imports_dataset_generator.py"]
