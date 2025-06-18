import json
import logging

from herald.herald_server.exceptions import Err
from herald.herald_server.processors.base import BaseProcessor
from herald.modules.email_generator.context_generator import generate_event_template_params
from herald.modules.email_generator.generator import generate_email
from herald.modules.email_sender.sender import send_email
from tools.optscale_exceptions.common_exc import WrongArgumentsException

LOG = logging.getLogger(__name__)


class EmailProcessor(BaseProcessor):
    @staticmethod
    def validate_payload(payload):
        if "email" not in payload:
            raise WrongArgumentsException(Err.G0019, [])

    @staticmethod
    def create_tasks(event, reactions, config_client=None):
        tasks = []
        for reaction in reactions:
            payload = json.loads(reaction.payload)
            subject, template_params = generate_event_template_params(event, config_client)
            task = EmailProcessor.generate_task(subject, payload.get("email"), template_params=template_params)
            tasks.append(task)
        return tasks

    @staticmethod
    def process_email_task(email_task, config_client):
        email_list = email_task.get("email")
        template_type = email_task.get("template_type")
        subject = email_task.get("subject")
        template_params = email_task.get("template_params")
        reply_to_email = email_task.get("reply_to_email")
        for email in email_list:
            task = EmailProcessor.generate_task(subject, email, template_type, template_params, reply_to_email)
            EmailProcessor.process_task(task, config_client)

    @staticmethod
    def generate_task(subject, email, template_type=None, template_params=None, reply_to_email=None):
        task = {
            "reaction_type": "EMAIL",
            "subject": subject,
            "to": email,
            "template_type": template_type,
            "template_params": template_params,
            "reply_to_email": reply_to_email,
        }
        return task

    @staticmethod
    def process_task(task, config_client=None):
        LOG.info("sending email to %s", task.get("to"))
        email = generate_email(
            config_client,
            task.get("to"),
            task.get("subject"),
            task.get("template_params"),
            task.get("template_type"),
            task.get("reply_to_email"),
        )
        send_email(email, config_client)
