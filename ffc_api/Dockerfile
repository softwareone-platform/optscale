FROM python:3.12-slim

RUN apt-get update && apt-get install -y \
    gcc \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    curl \
    ipython3 \
    && rm -rf /var/lib/apt/lists/*


COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /usr/src/app
ENV PYTHONPATH=/usr/src/app

COPY optscale_client optscale_client
COPY tools tools

COPY ffc_api/__init__.py ffc_api/__init__.py
COPY ffc_api/ffc_api_server ffc_api/ffc_api_server
COPY ffc_api/pyproject.toml ffc_api/pyproject.toml
COPY ffc_api/uv.lock ffc_api/uv.lock
COPY ffc_api/README.md ffc_api/README.md

RUN uv --project ffc_api sync --locked --no-dev

# used to store the report being processed. Automatically deleted
VOLUME ["/usr/src/app/reports"]

CMD ["uv", "--project", "ffc_api", "run", "--no-sync", "uvicorn", "ffc_api.ffc_api_server.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
EXPOSE 8000
