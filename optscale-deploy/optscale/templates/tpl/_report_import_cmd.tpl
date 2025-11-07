{{- define "report_import_schedule_cmd" -}}
set -e
set +x

DATA_PAYLOAD='{"period": '"$PERIOD"'}'
URL="http://{{ .Values.rest_api.service.name }}:{{ .Values.rest_api.service.externalPort }}/restapi/v2/schedule_imports"

SECRET_MASKED="$(printf '%*s' ${#CLUSTER_SECRET} '' | tr ' ' '*')"
set -x
echo "curl -sS -X POST -f -H \"Content-Type: application/json\" -H \"Secret: $SECRET_MASKED\" -d '$DATA_PAYLOAD' $URL"

set +x
curl -sS -X POST -f \
  -H "Content-Type: application/json" \
  -H "Secret: $CLUSTER_SECRET" \
  -d "$DATA_PAYLOAD" \
  "$URL"
set -x
{{- end -}}
