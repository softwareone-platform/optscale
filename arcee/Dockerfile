FROM python:3.12.3-slim
LABEL org.opencontainers.image.authors="Hystax"

WORKDIR /usr/src/app/
ENV PYTHONPATH /usr/src/app/

COPY arcee/arcee_receiver/requirements.txt arcee/arcee_receiver/requirements.txt
COPY optscale_client/aconfig_cl optscale_client/aconfig_cl
COPY optscale_client/config_client optscale_client/config_client
COPY tools/optscale_time tools/optscale_time

RUN pip install --no-cache-dir -r /usr/src/app/arcee/arcee_receiver/requirements.txt

COPY arcee/arcee_receiver/migrations arcee/arcee_receiver/migrations
COPY arcee/arcee_receiver/*.py arcee/arcee_receiver/
COPY arcee/arcee_receiver/modules/*.py arcee/arcee_receiver/modules/

CMD ["python", "-u","/usr/src/app/arcee/arcee_receiver/server.py"]
EXPOSE 8891
