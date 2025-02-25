## Custom email templates

The folder `/optscale/email_templates` is used for storing custom email templates.
Custom email templates allows users to overwrite the default emails templates OptScale uses to generate emails from.


## How to overwrite default OptScale email templates?

1. Find an email template file you want to change in [optscale](https://github.com/hystax/optscale/tree/integration/herald/modules/email_generator/templates) sources.

2. Update the required email template html file.

3. Copy the updated file into this folder (`/optscale/email_templates`) on the running OptScale cluster.
!!! Do not change email template file name !!!

4. Trigger sending email to try the changes.
Check herald logs in [kibana](https://hystax.com/documentation/optscale/private_deployments/kibana_logs.html) in case of error.
You may use `send_templates.py` script for debugging.


## How to use send_templates.py?

`send_templates.py` is a [script](https://github.com/hystax/optscale/tree/integration/herald/send_templates.py) in `optscale` repo that uses already running cluster for sending emails to certain users.

The script requires `requests` and `urllib3` installed:
```bash
pip install requests urllib3
```

Script arguments:
`-e`, `--email` - (required) a space-separated list of target email addresses
`--host` - (required) the IP of a running OptScale cluster
`-s`, `--secret` - (required) cluster secret set in [user_templates.yml](https://github.com/hystax/optscale/blob/integration/optscale-deploy/overlay/user_template.yml#L4) during OptScale deployment
`-t`, `--template` - (optional) a space-separated list of target email templates names (without `.html`), if not set emails from the all existing templates are sent

Usage example:
```bash
python3 send_templates.py -e user1@example.com user2@example.com --host 172.22.2.2 -s 7bab161d-2d6b-4af8-b43f-317502e55081 -t alert invite
```

Troubleshooting:
- check the OptScale IP is available from this VM
- check herald logs in [kibana](https://hystax.com/documentation/optscale/private_deployments/kibana_logs.html)
