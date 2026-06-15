FROM python:3.12.11-slim
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
LABEL org.opencontainers.image.authors="Hystax"

WORKDIR /usr/src/app/
ENV PYTHONPATH /usr/src/app/

COPY tools tools
COPY optscale_client optscale_client

COPY subspector/__init__.py subspector/__init__.py
COPY subspector/pyproject.toml subspector/pyproject.toml
COPY subspector/uv.lock subspector/uv.lock

RUN uv --project subspector sync --locked --no-dev

COPY subspector/*.py subspector/
COPY subspector/subspector_server/api subspector/subspector_server/api
COPY subspector/subspector_server/controllers subspector/subspector_server/controllers
COPY subspector/subspector_server/models subspector/subspector_server/models
COPY subspector/subspector_server/schemas subspector/subspector_server/schemas
COPY subspector/subspector_server/*.py subspector/subspector_server/
COPY subspector/subspector_server/alembic subspector/subspector_server/alembic

EXPOSE 8800

CMD ["uv", "run", "--project", "subspector", "uvicorn", "subspector.subspector_server.server:make_app", "--factory", "--host", "0.0.0.0", "--port", "8800"]
