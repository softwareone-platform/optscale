{{- define "migrations_job" -}}
{{- $service_config := index . 0 }}
{{- $ := index . 1 }}

{{- $uv_project := get $service_config "uv_project" | default $service_config.name }}

apiVersion: batch/v1
kind: Job
metadata:
  name: {{ $service_config.name }}-migrations
  namespace: {{ $.Release.Namespace }}
  labels:
    app: {{ $service_config.name }}
    chart: {{ $.Chart.Name }}-{{ $.Chart.Version | replace "+" "_" }}
    release: {{ $.Release.Name }}
  annotations:
    "helm.sh/hook": pre-install,pre-upgrade
    "helm.sh/hook-delete-policy": hook-succeeded,before-hook-creation
spec:
  backoffLimit: 0
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: {{ $service_config.name }}-migrations
          image: "{{ $service_config.image.repository }}:{{ $service_config.image.tag }}"
          imagePullPolicy: {{ $service_config.image.pullPolicy }}
          env:
          - name: HX_ETCD_HOST
            value: {{ $.Values.etcd.service.name }}
          - name: HX_ETCD_PORT
            value: {{ $.Values.etcd.service.externalPort | quote }}
          command: ["/bin/sh", "-c"]
          args:
            - uv run --project "{{ $uv_project }}" db migrate "{{ $service_config.name }}"
      initContainers:
{{- if $.Values.elk.enabled }}
{{ include "wait_for_elk" $ | indent 6 }}
{{- end }}
{{ include "wait_for_service" $.Values.etcd | indent 6 }}
{{- if $service_config.migrations_dependencies }}
{{- range $dependency_service_name := $service_config.migrations_dependencies }}
{{- if eq $dependency_service_name "mariadb" }}
{{ include "wait_mariadb" $ | indent 6 }}
{{- else }}
{{- $dependency_config := get $.Values $dependency_service_name }}
{{ include "wait_for_service" $dependency_config | indent 6 }}
{{- end }}
{{- end }}
{{- end }}
{{- end -}}

