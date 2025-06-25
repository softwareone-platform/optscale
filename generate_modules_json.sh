#!/usr/bin/env bash
set -euo pipefail

# List of components to exclude
EXCLUDE_LIST=("etcd" "mongo" "mariadb" "redis" "filebeat" "grafana" "grafana_nginx" "elk" "cleanelkdb" "jira_bus" "jira_ui" "slacker")

# Function to check if component is in the exclusion list
should_exclude() {
    local component="$1"
    for excluded in "${EXCLUDE_LIST[@]}"; do
        if [[ "$component" == "$excluded" ]]; then
            return 0
        fi
    done
    return 1
}

# Initialize an array to store JSON objects
entries=()

# Find Dockerfiles
while IFS= read -r -d '' dockerfile; do
    component=$(basename "$(dirname "$dockerfile")")

    if should_exclude "$component"; then
        continue
    fi

    # Escape values for JSON
    entries+=("{\"name\": \"${component}\", \"dockerfile\": \"${dockerfile}\"}")
done < <(find . -mindepth 2 -maxdepth 3 -type f -name 'Dockerfile' ! -name '*test*' ! -name '*.j2' -print0)

# Join entries with comma
joined=$(IFS=, ; echo "${entries[*]}")

# Output final JSON
echo -n "{\"include\": [${joined}]}"
