import collections.abc
import logging
import numbers
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from jinja2 import TemplateNotFound

from herald.modules.email_generator.context_generator import get_custom_context, get_default_context
from herald.modules.email_generator.utils import get_environment

LOG = logging.getLogger(__name__)


def does_template_exist(template_name: str) -> bool:
    try:
        get_environment().get_template(template_name)
        return True
    except TemplateNotFound as e:
        LOG.error(f"Template {template_name} does not exist: {e}")
        return False


def _generate_context(template_params, config_client):
    def update_context(template, params):
        for key, value in params.items():
            if isinstance(value, collections.abc.Mapping):
                template[key] = update_context(template.get(key, {}), value)
            else:
                template[key] = value
        return template

    def get_numbered_params(params_dict):
        numbered_dict = {}
        for key, value in params_dict.items():
            if isinstance(value, numbers.Number):
                numbered_dict[key] = value
        return numbered_dict

    def update_template_style(numbered_dict):
        style = {}
        display_visibility_name = "element_visibility_%s"
        for key, value in numbered_dict.items():
            style[display_visibility_name % key] = "table-row" if value else "none"
        return style

    def generate_control_panel_parameters(organization_map):
        control_panel_keys_map = {"id": "organizationId"}
        list_params = []
        for input_key, output_key in control_panel_keys_map.items():
            if organization_map.get(input_key):
                list_params.append("%s=%s" % (output_key, organization_map[input_key]))
        return "?" + "&".join(list_params) if list_params else None

    default_context = get_default_context()
    custom_context = get_custom_context()
    for k in default_context:
        if k in custom_context:
            for k2, v2 in custom_context[k].items():
                default_context[k][k2] = v2
    texts = template_params.get("texts", {})
    numbered_dict = get_numbered_params(texts)
    organization_info = texts.get("organization", {})
    texts["control_panel_parameters"] = generate_control_panel_parameters(organization_info)
    texts["etcd"] = {}
    texts["etcd"]["control_panel_link"] = config_client.get("/public_ip").value
    context = update_context(default_context, template_params)
    context["style"] = update_template_style(numbered_dict)
    for k, etcd_k in context.get("etcd", {}).items():
        etcd_v = ""
        try:
            etcd_v = config_client.get(etcd_k).value
        except Exception:
            pass
        context["etcd"].update({k: etcd_v})
    return context


def generate_email(config_client, to, subject, template_params, template_type="default", reply_to_email=None):
    msg = MIMEMultipart("related")
    msg["Subject"] = subject
    msg["To"] = to
    if reply_to_email:
        msg["reply-to"] = reply_to_email
    template_params = template_params if template_params else {}
    context = _generate_context(template_params, config_client)
    msg.attach(_generate_body(context, template_type))
    return msg


def _generate_body(context, template_type):
    template_name = "%s.html" % template_type
    template = get_environment().get_template(template_name)
    body = MIMEText(template.render(context), "html")
    return body
