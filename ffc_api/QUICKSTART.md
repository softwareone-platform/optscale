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

```sql
CREATE DATABASE IF NOT EXISTS `{FFC_API_DB_NAME}`
DEFAULT CHARACTER SET `utf8mb4`
DEFAULT COLLATE `utf8mb4_unicode_ci`
```

After applying migrations for the first time, check that collacte is set to `utf8mb4_unicode_ci` and not overwritten to `utf8mb4_0900_ai_ci`:

```sql
SHOW TABLE STATUS FROM `{FFC_API_DB_NAME}` LIKE 'tags';
```

If you see `utf8mb4_0900_ai_ci` collation, run the following command to fix it:

```sql
ALTER TABLE `{FFC_API_DB_NAME}`.tags
CONVERT TO CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci
```

### Initialize Alembic Migrations

```bash
# Review the generated migration in migrations/versions/

# Apply migration, run from ffc_api_server directory where alembic.ini is located or specify the path to alembic.ini
alembic upgrade head
```
