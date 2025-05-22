FROM python:3.12.3-slim
LABEL org.opencontainers.image.authors="Hystax"

WORKDIR /usr/src/app
ENV PYTHONPATH /usr/src/app/

COPY bulldozer/bulldozer_api/requirements.txt bulldozer/bulldozer_api/requirements.txt
COPY bulldozer/bulldozer_api/migrations bulldozer/bulldozer_api/migrations

COPY optscale_client/aconfig_cl optscale_client/aconfig_cl
COPY optscale_client/config_client optscale_client/config_client
COPY optscale_client/insider_client optscale_client/insider_client
COPY tools/optscale_time tools/optscale_time

RUN pip install --no-cache-dir -r /usr/src/app/bulldozer/bulldozer_api/requirements.txt

COPY bulldozer/*.py bulldozer/
COPY bulldozer/bulldozer_api/*.py bulldozer/bulldozer_api/

CMD ["python", "-u","/usr/src/app/bulldozer/bulldozer_api/server.py"]
EXPOSE 8896
