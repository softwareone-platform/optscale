# FinOps API - Quick Start Guide

## Project Overview

This project extends OptScale API to support FinOps needs:

- **Read-only access to restapi and auth database** – Query cloud accounts, organizations and other entities
- **Full control over FinOps database** – Store tags and other FinOps-specific data, database name should be configured in `.env`
- **FastAPI + SQLAlchemy + Alembic** - Modern async Python stack
- **Separate Alembic tracking** – migrations track only FinOps models

## Configuration

### 1. Copy environment variables

```bash
cp env.example .env
```

### 2. Configure etcd and FinOps database

Edit `.env`:

```env
FFC_API_ETCD_HOST=127.0.0.1
FFC_API_ETCD_PORT=2379
FFC_API_DB_NAME="ffc-api-db"
```

Other settings required for database connection and cross-service communication will be configured automatically
from etcd.


## Database Setup

### Create Database

**Important**: This step is required only once to create the database.

```bash
CREATE DATABASE IF NOT EXISTS `{FFC_API_DB_NAME}`
DEFAULT CHARACTER SET `utf8mb4`
DEFAULT COLLATE `utf8mb4_unicode_ci`
```

### Initialize Alembic Migrations

```bash
# Review the generated migration in migrations/versions/

# Apply migration
alembic upgrade head
```
