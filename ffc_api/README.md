[![Ruff](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/ruff/main/assets/badge/v2.json)](https://github.com/astral-sh/ruff) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=softwareone-platform_ffc-finops-api&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=softwareone-platform_ffc-finops-api) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=softwareone-platform_ffc-finops-api&metric=coverage)](https://sonarcloud.io/summary/new_code?id=softwareone-platform_ffc-finops-operations)

# SoftwareOne FinOps for Cloud API

The API extends SoftwareOne FinOps for Cloud API.

## Create your .env file

You can use the `env.example` as a base to setup your running environment and customize it according to your needs.

```bash
cp env.example .env
```

**Required**: Configure FinOps database connection
**Optional**: Configure OptScale database connection for user endpoints

See [QUICKSTART.md](./QUICKSTART.md) for detailed setup instructions.

### Database Migrations

```bash
# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

## Run tests

`docker compose run --rm app_test`

## Run for Development

`docker compose up app`

Or directly with uvicorn:

```bash
uvicorn app.main:app --reload
```

## Build production image

To build the production image please use the `prod.Dockefile` dockerfile.

> [!IMPORTANT]
> Developers must take care of keep in sync `dev.Dockerfile` and `prod.Dockerfile`.

