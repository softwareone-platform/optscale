# -------- Base --------
ARG IMAGE=node:20.10.0-alpine3.18
FROM $IMAGE AS generator

WORKDIR /usr/src/app

# -------- Copy & Install --------
COPY . ./tools/custom_email_templates

# COPY package.json ./
# COPY package-lock.json ./
# RUN npm ci

# -------- Run Generator --------
RUN node tools/custom_email_templates/generateEmails.js

# -------- Output Stage --------
FROM debian:bookworm-slim AS output

WORKDIR /out

# Copy generated templates only
COPY --from=generator /usr/src/app/email_templates ./email_templates

ENV OUTPUT_CUSTOM_TEMPLATES_DIR=/usr/src/app/herald/modules/email_generator/custom_template

COPY ./copy-templates.sh ./copy-templates.sh
RUN chmod +x ./copy-templates.sh

CMD ["bash", "-x", "copy-templates.sh"]
