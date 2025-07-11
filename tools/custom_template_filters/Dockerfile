FROM debian:bookworm-slim

WORKDIR /out

# Copy generated templates only

ENV OUTPUT_CUSTOM_FILTERS_DIR=/usr/src/app/herald/modules/email_generator/custom_filters

COPY ./tools/custom_template_filters/filters ./filters
COPY ./tools/custom_template_filters/copy-filters.sh ./copy-filters.sh
RUN chmod +x ./copy-filters.sh

CMD ["bash", "-x", "copy-filters.sh"]