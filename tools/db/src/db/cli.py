import os
import re

import typer
from optscale_client.config_client.client import Client as ConfigClient

from db.migrators import AlembicMigrator, ClickhouseMigrator, MongoMigrator
from db.utils import PROJECT_ROOT

app = typer.Typer()


def get_config_client() -> ConfigClient:
    config_client = ConfigClient(
        host=os.environ.get("HX_ETCD_HOST"),
        port=int(os.environ.get("HX_ETCD_PORT")),
    )
    config_client.wait_configured()

    return config_client


def get_migrator(service_name: str):
    # We need to normalize the service name as the service names on k8s can be slightly different from
    # the actual python package names (e.g. rest_api vs restapi). It's best to accept either format,
    # so that the CLI can be easily used in any context

    match re.sub(r"[-_]+", "", service_name.lower()):
        case "restapi":
            return AlembicMigrator(
                service_path=PROJECT_ROOT / "rest_api" / "rest_api_server",
                config_client=get_config_client(),
                db_params_etcd_path="/restdb",
            )
        case "auth":
            return AlembicMigrator(
                service_path=PROJECT_ROOT / "auth" / "auth_server",
                config_client=get_config_client(),
                db_params_etcd_path="/authdb",
            )
        case "herald":
            return AlembicMigrator(
                service_path=PROJECT_ROOT / "herald" / "herald_server",
                config_client=get_config_client(),
                db_params_etcd_path="/heralddb",
            )
        case "jirabus":
            return AlembicMigrator(
                service_path=PROJECT_ROOT / "jira_bus" / "jira_bus_server",
                config_client=get_config_client(),
                db_params_etcd_path="/jirabusdb",
            )
        case "katara":
            return AlembicMigrator(
                service_path=PROJECT_ROOT / "katara" / "katara_service",
                config_client=get_config_client(),
                db_params_etcd_path="/kataradb",
            )
        case "slacker":
            return AlembicMigrator(
                service_path=PROJECT_ROOT / "slacker" / "slacker_server",
                config_client=get_config_client(),
                db_params_etcd_path="/slackerdb",
            )
        case "rispworker":
            return ClickhouseMigrator(
                service_path=PROJECT_ROOT / "risp" / "risp_worker",
                config_client=get_config_client(),
                database_name="risp",
            )
        case "metroculusworker":
            return ClickhouseMigrator(
                service_path=PROJECT_ROOT / "metroculus" / "metroculus_worker",
                config_client=get_config_client(),
                database_name="default",  # NOTE: This is intentional and correct for metroculus
            )
        case "geminiworker":
            return ClickhouseMigrator(
                service_path=PROJECT_ROOT / "gemini" / "gemini_worker",
                config_client=get_config_client(),
                database_name="gemini",
            )
        case "insiderworker":
            return MongoMigrator(
                service_path=PROJECT_ROOT / "insider" / "insider_worker",
                config_client=get_config_client(),
                database_name="insider",
            )
        case "diworker":
            return MongoMigrator(
                service_path=PROJECT_ROOT / "diworker" / "diworker",
                config_client=get_config_client(),
                database_name="restapi",  # NOTE: This is intentional and correct for the diworker
            )
        case _:
            raise ValueError(f"Unknown service name: {service_name}")


@app.command()
def migrate(service_name: str = typer.Argument(..., help="Service name")):
    migrator = get_migrator(service_name)
    migrator.migrate()


@app.command()
def generate(
    service_name: str = typer.Argument(..., help="Service name"),
    name: str = typer.Argument(..., help="Migration name"),
):
    migrator = get_migrator(service_name)

    if migrator.__class__ is not AlembicMigrator:
        typer.echo("Migration generation is only supported for MySQL (Alembic) for now.")
        raise typer.Exit(code=1)

    migrator.generate_migration(name)
