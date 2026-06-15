FROM python:3.12.3-slim

WORKDIR /usr/src/app/
ENV PYTHONPATH /usr/src/app/

COPY optscale_client/config_client optscale_client/config_client
COPY optscale_client/subspector_async_client optscale_client/subspector_async_client
COPY tools/stripe_client tools/stripe_client
COPY docker_images/subsyncer/requirements.txt docker_images/subsyncer/
RUN pip install --no-cache-dir -r docker_images/subsyncer/requirements.txt

COPY docker_images/subsyncer/subsyncer.py docker_images/subsyncer/

CMD ["python3", "docker_images/subsyncer/subsyncer.py"]
