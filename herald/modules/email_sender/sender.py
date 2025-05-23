import logging
import os
import smtplib
import ssl
from email.utils import parseaddr

from herald.herald_server.utils import is_email_format, is_valid_port

CRYPTOGRAPHIC_PROTOCOLS = ["TLS", "SSL"]

LOG = logging.getLogger(__name__)


def send_email(message, config_client=None):
    if config_client is not None:
        smtp_params = config_client.smtp_params()
        if smtp_params is not None:
            if _is_valid_smtp_params(smtp_params):
                server, port, email, login, password, protocol = smtp_params
                _, from_email = parseaddr(email)
                if not login:
                    LOG.warning("SMTP login is not set. Using email instead")
                    login = from_email

                message["From"] = email
                _send_email_to_user_smtp(server, port, from_email, login, password, message, protocol)
                return
            else:
                LOG.warning("User SMTP parameters are not valid")
    _send_email_from_default_service(message)


def _is_valid_smtp_params(params):
    if params is None:
        return False
    server, port, email, login, password, protocol = params
    for value in (server, email, password):
        if value is None:
            return False
    if not isinstance(server, str):
        return False
    _, from_email = parseaddr(email)
    if not is_email_format(from_email):
        return False
    if protocol.upper() not in CRYPTOGRAPHIC_PROTOCOLS:
        return False
    return is_valid_port(port)


def _send_email_smtp_ssl(server, port, email, login, password, message):
    context = ssl._create_unverified_context()
    with smtplib.SMTP_SSL(server, port, context=context) as smtp_server:
        smtp_server.login(login, password)
        smtp_server.sendmail(email, message.get("To"), message.as_string())


def _send_email_smtp_tls(server, port, email, login, password, message):
    with smtplib.SMTP(server, port) as smtp_server:
        smtp_server.starttls()
        smtp_server.login(login, password)
        smtp_server.sendmail(email, message.get("To"), message.as_string())


def _send_email_to_user_smtp(server, port, email, login, password, message, protocol):
    send_func = {"SSL": _send_email_smtp_ssl, "TLS": _send_email_smtp_tls}.get(protocol)

    try:
        send_func(server, port, email, login, password, message)
    except Exception as e:
        LOG.error(
            "Could not send mail using server %s (protocol %s) and port "
            "%s with email %s. Error %s" % (server, protocol, port, email, str(e))
        )


def _send_email_from_default_service(message):
    sendmail_location = "/usr/sbin/sendmail"
    p = os.popen("%s -t -i" % sendmail_location, "w")
    p.write(message.as_string())
    p.close()
