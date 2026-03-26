# FinOps API - Quick Start Guide

## Project Overview

This project extends OptScale API with a dual-database architecture to provide FinOps capabilities:

- **Read-only access to OptScale database** - Query users and other OptScale entities
- **Full control over FinOps database** - Store tags and other FinOps-specific data
- **FastAPI + SQLAlchemy + Alembic** - Modern async Python stack
- **Separate Alembic tracking** - Only FinOps models are tracked by migrations

## Prerequisites

- Python 3.12+
- PostgreSQL database for FinOps data
- (Optional) Access to OptScale PostgreSQL database

## Installation

```bash
# Clone the repository
cd ffc-finops-api

# Install dependencies (using uv)
uv sync

# Or using pip
pip install -e .
```

## Configuration

### 1. Copy environment variables

```bash
cp env.example .env
```

### 2. Configure FinOps Database (Required)

Edit `.env`:

```env
FFC_API_POSTGRES_DB=finops
FFC_API_POSTGRES_USER=finops_user
FFC_API_POSTGRES_PASSWORD="secure_password"
FFC_API_POSTGRES_HOST=localhost
FFC_API_POSTGRES_PORT=5432
```

### 3. Configure OptScale Database (Optional)

To enable OptScale user endpoints, add:

```env
FFC_API_OPTSCALE_POSTGRES_DB=optscale
FFC_API_OPTSCALE_POSTGRES_USER=ffc_readonly
FFC_API_OPTSCALE_POSTGRES_PASSWORD="readonly_password"
FFC_API_OPTSCALE_POSTGRES_HOST=optscale-db.example.com
FFC_API_OPTSCALE_POSTGRES_PORT=5432
```

**Important**: Set up read-only access in OptScale database:

```sql
-- Run these commands in OptScale database
CREATE ROLE ffc_readonly LOGIN PASSWORD 'readonly_password';
GRANT CONNECT ON DATABASE optscale TO ffc_readonly;
GRANT USAGE ON SCHEMA public TO ffc_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO ffc_readonly;

-- Grant SELECT on future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT ON TABLES TO ffc_readonly;
```

## Database Setup

### Initialize Alembic Migrations

```bash
# Create initial migration
alembic revision --autogenerate -m "Initial migration - create tags table"

# Review the generated migration in migrations/versions/

# Apply migration
alembic upgrade head
```

### Verify Database Tables

```bash
# Connect to FinOps database
psql -h localhost -U finops_user -d finops

# Check tables
\dt

# You should see:
# - tags table
# - alembic_version table
```

## Running the Application

### Development Mode

```bash
# Using uvicorn directly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or using the provided script
./entrypoint.sh
```

### Production Mode

```bash
# Using gunicorn with uvicorn workers
gunicorn app.main:app \
  --workers 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000
```

### Using Docker

```bash
# Development
docker-compose up

# Production
docker build -f prod.Dockerfile -t ffc-finops-api .
docker run -p 8000:8000 --env-file .env ffc-finops-api
```

## API Documentation

Once running, visit:

- **Swagger UI**: http://localhost:8000/ops/v1/docs
- **ReDoc**: http://localhost:8000/ops/v1/redoc

## Database Migrations

### Create a new migration

```bash
# After modifying models in app/db/models.py
alembic revision --autogenerate -m "Add new field to tags"
```

### Apply migrations

```bash
# Upgrade to latest
alembic upgrade head

# Upgrade one version
alembic upgrade +1

# Downgrade one version
alembic downgrade -1

# Show current version
alembic current

# Show migration history
alembic history
```
