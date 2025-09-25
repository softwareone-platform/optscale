import enum

import typer

from db.migrators import AlembicMigrator, ClickhouseMigrator, MongoMigrator

app = typer.Typer()


class DBType(enum.Enum):
    mysql = "mysql"
    mongo = "mongo"
    clickhouse = "clickhouse"


@app.command()
def migrate(
    db_type: DBType = typer.Argument(..., help="Type of the database"),
    service_name: str = typer.Argument(..., help="Service name"),
    host: str = typer.Option(..., help="Database host"),
    username: str = typer.Option(..., help="Database username"),
    password: str = typer.Option(..., help="Database password"),
    dbname: str = typer.Option(..., help="Database name"),
    port: int = typer.Option(..., help="Database port"),
    secure: bool = typer.Option(False, is_flag=True, help="Use secure connection (if supported)"),
):
    if db_type == DBType.mysql:
        migrator_cls = AlembicMigrator
    elif db_type == DBType.mongo:
        migrator_cls = MongoMigrator
    elif db_type == DBType.clickhouse:
        migrator_cls = ClickhouseMigrator
    else:
        typer.echo(f"Unsupported database type: {db_type}")
        raise typer.Exit(code=1)

    migrator = migrator_cls(
        service_name=service_name,
        db_host=host,
        db_port=port,
        db_username=username,
        db_password=password,
        db_name=dbname,
        db_secure=secure,
    )

    migrator.migrate()


@app.command()
def generate(
    db_type: DBType = typer.Argument(..., help="Type of the database"),
    service_name: str = typer.Argument(..., help="Service name"),
    name: str = typer.Argument(..., help="Migration name"),
    host: str = typer.Option(..., help="Database host"),
    username: str = typer.Option(..., help="Database username"),
    password: str = typer.Option(..., help="Database password"),
    dbname: str = typer.Option(..., help="Database name"),
    port: int = typer.Option(..., help="Database port"),
):
    if db_type != DBType.mysql:
        typer.echo("Migration generation is only supported for MySQL (Alembic) for now.")
        raise typer.Exit(code=1)

    migrator = AlembicMigrator(
        service_name=service_name,
        db_host=host,
        db_port=port,
        db_username=username,
        db_password=password,
        db_name=dbname,
    )
    migrator.generate_migration(name)
