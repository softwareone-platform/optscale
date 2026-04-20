# SoftwareOne FinOps for Cloud API

The API extends SoftwareOne FinOps for Cloud API.

## Create your .env file

You can use the `env.example` as a base to set up your running environment and customize it according to your needs.

```bash
cp env.example .env
```


### Database Migrations

```bash
# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

## Run tests

`run_tests.sh`

## Run for Development

Build image from optscale directory:

`docker build -t ffc_api:build --build-arg BUILDTAG=build -f ffc_api/Dockerfile .`

Run image:

`docker run --env-file ffc_api/.env -p 8095:8000 ffc_api:build`

Or directly with uvicorn:

```bash
uv run uvicorn ffc_api_server.app.main:app --host 0.0.0.0 --port 8095
```
