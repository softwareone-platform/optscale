#!/usr/bin/env python
import argparse
import logging
import os
import re
import sys
from operator import itemgetter
from os.path import isfile, join
from uuid import UUID

import requests
import urllib3
from email_test_data import EMAIL_TEST_DATA

REGEX_EMAIL = '^[a-z0-9!#$%&\'*+/=?`{|}~\\^\\-\\+_()]+(\\.[a-z0-9!#$%&\'*+/=' \
              r'?`{|}~\^\-\+_()]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,18})$'

LOG = logging.getLogger(__name__)


def set_args(arguments):
    def check_email(checked):
        return re.search(REGEX_EMAIL, checked)

    def check_uuid(checked):
        try:
            return str(UUID(checked, version=4)) == checked
        except ValueError:
            return False

    temp_emails = [] if not os.environ.get('TARGET_EMAILS') else os.environ.get('TARGET_EMAILS').split(' ')
    temp_secret = os.environ.get('CLUSTER_SECRET')
    temp_host = os.environ.get('CLUSTER_HOST')
    temp_templates = list(EMAIL_TEST_DATA) if not os.environ.get('TEMPLATES') else os.environ.get('TEMPLATES').split(' ')
    params = {
        'emails': temp_emails,
        'secret': temp_secret,
        'host': temp_host,
        'templates': temp_templates
    }
    find_error = False
    if arguments.emails:
        params['emails'] = arguments.emails
    if arguments.secret:
        params['secret'] = arguments.secret
    if arguments.host:
        params['host'] = arguments.host
    if arguments.templates:
        params['templates'] = arguments.templates
    for k, v in params.items():
        if not v:
            LOG.error("%s not specified" % k)
            find_error = True
    bad_emails = []
    for email in params['emails']:
        if not check_email(email):
            bad_emails.append(email)
    if bad_emails:
        LOG.error('Invalid email specified: %s' % ', '.join(bad_emails))
        find_error = True
    if not check_uuid(params['secret']):
        LOG.error('Invalid secret specified')
        find_error = True
    bad_templates = []
    for template in params['templates']:
        if template not in list(EMAIL_TEST_DATA):
            bad_templates.append(template)
    if bad_templates:
        LOG.error('Invalid template specified: %s' % ', '.join(bad_templates))
        find_error = True
    return params, find_error


def check_templates():
    excluded_templates = ['default']
    templates_path = './modules/email_generator/templates'
    if os.path.exists(templates_path):
        ready_templates = EMAIL_TEST_DATA.keys()
        existing_templates = []
        files = [f for f in os.listdir(templates_path) if isfile(join(templates_path, f))]
        for file in files:
            filename, file_extension = os.path.splitext(file)
            if file_extension != '.html':
                continue
            if filename in excluded_templates:
                continue
            existing_templates.append(filename)
        non_ready_templates = list(set(existing_templates) - set(ready_templates))
        if non_ready_templates:
            LOG.warning('WARNING! Found templates that are not included in the'
                        ' script! Please add the following templates to the '
                        'script: %s!' % ', '.join(non_ready_templates))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('-e', '--email', nargs='*', dest='emails',
                        help='Target email (it is possible to specify several times)')
    parser.add_argument('-s', '--secret', help='Cluster secret')
    parser.add_argument('--host', help='Cluster IP')
    parser.add_argument('-t', '--template', nargs='*', dest='templates',
                        help='Target template (it is possible to specify several times)')
    args = parser.parse_args()
    params, bad_args = set_args(args)
    if bad_args:
        sys.exit(1)
    logging.basicConfig(level=logging.INFO)
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

    for template_type in sorted(params['templates']):
        LOG.info(f'Sending {template_type} email')
        data = EMAIL_TEST_DATA.get(template_type).copy()
        if template_type == 'weekly_expense_report':
            data['template_params']['texts']['pools'] = sorted(
                data['template_params']['texts']['pools'],
                key=itemgetter('cost'), reverse=True)
        data['email'] = params['emails']
        requests.post(
            url='https://{}/herald/v2/email'.format(params['host']),
            headers={'Secret': params['secret']},
            verify=False,
            json=data,
        )

    if sorted(params['templates']) == sorted(EMAIL_TEST_DATA.keys()):
        check_templates()
    LOG.info('Done')
