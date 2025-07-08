FROM debian:bookworm-slim

WORKDIR /out

COPY ./tools/custom_email_templates/templates ./templates
ENV OUTPUT_CUSTOM_TEMPLATES_DIR=/usr/src/app/herald/modules/email_generator/custom_templates

COPY ./tools/custom_email_templates/copy-templates.sh ./copy-templates.sh
RUN chmod +x ./copy-templates.sh


CMD ["bash", "-x", "copy-templates.sh"]
