FROM python:3.12.3-slim
LABEL org.opencontainers.image.authors="Hystax"

ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH /usr/src/app/

WORKDIR /usr/src/app/

COPY optscale_client/config_client optscale_client/config_client
COPY optscale_client/rest_api_client optscale_client/rest_api_client
COPY tools/optscale_time tools/optscale_time
COPY tools/optscale_data tools/optscale_data


COPY bi_exporter/requirements.txt bi_exporter/requirements.txt

RUN pip install --no-cache-dir -r /usr/src/app/bi_exporter/requirements.txt

COPY bi_exporter/bumblebi bi_exporter/bumblebi

CMD ["python", "-u","/usr/src/app/bi_exporter/bumblebi/exporter/main.py"]
