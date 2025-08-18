#!/usr/bin/env python

import argparse
import configparser
import logging
import os
import subprocess
import sys
import pathlib
import shlex

LOG = logging.getLogger()
LOG.addHandler(logging.StreamHandler())
LOG.setLevel(logging.DEBUG)

PROJECT_ROOT = pathlib.Path(__file__).parent.parent.parent.resolve()


class ConfigTemplate:
    connection_string = 'mysql+mysqlconnector://%s:%s@%s/%s'

    def __init__(self, service_name):
        self.service_name = service_name
        self.config = None

    @property
    def path(self):
        if self.service_name in ("rest_api", "restapi"):
            return PROJECT_ROOT / 'rest_api' / 'rest_api_server'
        elif self.service_name == "auth":
            return PROJECT_ROOT / 'auth' / 'auth_server'
        elif self.service_name == "herald":
            return PROJECT_ROOT / 'herald' / 'herald_server'
        elif self.service_name in ("jira_bus", "jira-bus"):
            return PROJECT_ROOT / 'jira_bus' / 'jira_bus_server'
        elif self.service_name == "katara":
            return PROJECT_ROOT / 'katara' / 'katara_service'
        elif self.service_name == "slacker":
            return PROJECT_ROOT / 'slacker' / 'slacker_server'
        else:
            raise ValueError(f"Unknown service name: {self.service_name}")

    def load(self, name='alembic.template'):
        config = configparser.ConfigParser()
        config.read(str(self.path / name))
        self.config = config
        return self.config

    def save(self, host, username, password, db, file_name='alembic.ini'):
        config = self.load()
        config.set(
            'alembic',
            'sqlalchemy.url',
            self.connection_string % (username, password, host, db))
        
        with (self.path / file_name).open('w') as fh:
            config.write(fh)

    def execute(self, cmd_parts):
        cmd_parts = list(map(str, cmd_parts))
        full_cmd = shlex.join(cmd_parts)
        
        LOG.debug('Executing command %s', full_cmd)
        myenv = os.environ.copy()
        myenv['PYTHONPATH'] = str(PROJECT_ROOT)

        proc = subprocess.Popen(cmd_parts, stdout=subprocess.PIPE, env=myenv, cwd=self.path)
        out, err = proc.communicate()
        LOG.debug('Command: %s output: %s, err: %s, retcode: %s', full_cmd, out, err, proc.returncode)

        if proc.returncode != 0:
            sys.exit(proc.returncode)

def migrate(args):
    template = ConfigTemplate(args.service_name)
    template.save(args.host, args.username, args.password, args.dbname)
    cmd = ['alembic', 'revision', '--autogenerate', '-m', str(args.name)]
    template.execute(cmd)

def save_config(args):
    template = ConfigTemplate(args.service_name)
    template.save(args.host, args.username, args.password, args.dbname)

def apply(args):
    template = ConfigTemplate(args.service_name)
    cmd = ['alembic', '-c', (template.path / 'alembic.ini').resolve(), 'upgrade', 'head']
    template.execute(cmd)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'service_name',
        choices=['rest_api', 'restapi', 'auth', 'herald', 'jira_bus', 'jira-bus', 'katara', 'slacker'],
    )
    subparsers = parser.add_subparsers()
    save_config_parser = subparsers.add_parser('save-config')
    migrate_parser = subparsers.add_parser('migrate')

    for subparser in (save_config_parser, migrate_parser):
        subparser.add_argument('-H', '--host', help='Database host',
                               required=True)
        subparser.add_argument('-u', '--username', help='Database username',
                               required=True)
        subparser.add_argument('-p', '--password', help='Database password',
                               required=True)
        subparser.add_argument('-d', '--dbname', help='Database name',
                               required=True)
        
    migrate_parser.add_argument('-n', '--name', help='Migration name',
                                required=True)
    migrate_parser.set_defaults(func=migrate)
    save_config_parser.set_defaults(func=save_config)
    
    apply_parser = subparsers.add_parser('apply')
    apply_parser.set_defaults(func=apply)
    args = parser.parse_args()
    vals = vars(args)
    if not any(vals.values()):
        parser.error('No arguments provided.')
    else:
        args.func(args)


if __name__ == '__main__':
    main()
