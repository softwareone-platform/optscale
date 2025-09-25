import typer
import enum

from migrate.migrators import AlembicMigrator, MongoMigrator, ClickhouseMigrator

app = typer.Typer()


class DBType(str, enum.Enum):
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
def generate(name: str):
    typer.echo(f"Generating migration: {name}")
    # TODO: Implement the logic to generate a new migration file


# def main():
#     # TODO: CLI - add support for mongo migrator
#     # TODO: CLI - add support for clickhouse migrator
#     parser = argparse.ArgumentParser()
#     # TODO: Add the other services
#     parser.add_argument(
#         'service_name',
#         choices=['rest_api', 'restapi', 'auth', 'herald', 'jira_bus', 'jira-bus', 'katara', 'slacker'],
#     )
#     parser.add_argument('db_type', choices=['mysql', 'mongo', 'clickhouse'])
#     subparsers = parser.add_subparsers()
#     save_config_parser = subparsers.add_parser('save-config')
#     migrate_parser = subparsers.add_parser('migrate')
#     apply_parser = subparsers.add_parser('apply')
#
#     for subparser in (save_config_parser, migrate_parser):
#         subparser.add_argument('-H', '--host', help='Database host',
#                                required=True)
#         subparser.add_argument('-u', '--username', help='Database username',
#                                required=True)
#         subparser.add_argument('-p', '--password', help='Database password',
#                                required=True)
#         subparser.add_argument('-d', '--dbname', help='Database name',
#                                required=True)
#         subparser.add_argument('--port', type=int, help='Database port')
#         subparser.add_argument('--secure', action='store_true',
#                                help='Use secure connection (if supported)')
#
#     migrate_parser.add_argument('-n', '--name', help='Migration name',
#                                 required=True)
#
#     args = parser.parse_args()
#
#     if args.db_type == 'mysql':
#         migrate_parser.set_defaults(func=alembic.migrate)
#         save_config_parser.set_defaults(func=alembic.save_config)
#         apply_parser.set_defaults(func=alembic.apply)
#     elif args.db_type == 'mongo':
#         # TODO
#         # migrate_parser.set_defaults(func=mongo.migrate)
#         # save_config_parser.set_defaults(func=mongo.save_config)
#         parser.error('MongoDB migrator not yet implemented.')
#     elif args.db_type == 'clickhouse':
#         # TODO
#         # migrate_parser.set_defaults(func=clickhouse.migrate)
#         # save_config_parser.set_defaults(func=clickhouse.save_config)
#         parser.error('Clickhouse migrator not yet implemented.')
#     else:
#         parser.error(f'Unsupported database type: {args.db_type}')
#
#     vals = vars(args)
#     if not any(vals.values()):
#         parser.error('No arguments provided.')
#     else:
#         args.func(args)
