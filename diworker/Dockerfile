FROM python:3.12.3-slim
WORKDIR /src
ENV PYTHONPATH=/src

COPY optscale_client/herald_client optscale_client/herald_client
COPY optscale_client/config_client optscale_client/config_client
COPY optscale_client/insider_client optscale_client/insider_client
COPY optscale_client/rest_api_client optscale_client/rest_api_client
COPY tools/cloud_adapter tools/cloud_adapter
COPY tools/optscale_data tools/optscale_data
COPY tools/optscale_time tools/optscale_time

COPY diworker/*.py diworker/
COPY diworker/requirements.txt diworker/requirements.txt
RUN pip install --no-cache-dir -r diworker/requirements.txt
COPY diworker/diworker diworker/diworker

# used to store the report being processed. Automatically deleted
VOLUME ["/src/reports"]

CMD ["/src/diworker/diworker/main.py"]
