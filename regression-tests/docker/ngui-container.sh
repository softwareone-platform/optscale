#!/bin/bash
# Building and serving the ngui app in a container, for `run_pw.sh -a`. Sourced, not executed —
# run_pw.sh owns the run; this file owns nothing but that container's lifecycle.
# The ngui container publishes its internal 4000 on the host port it is given.
NGUI_CONTAINER="ngui-container"
NGUI_IMAGE="ngui-app"
NGUI_INTERNAL_PORT=4000
NGUI_READY_TIMEOUT=90

ngui_container_exists() {
    docker ps -a --format '{{.Names}}' | grep -q "^${NGUI_CONTAINER}$"
}

ngui_remove() {
    if ngui_container_exists; then
        docker stop "$NGUI_CONTAINER" >/dev/null 2>&1
        docker rm "$NGUI_CONTAINER" >/dev/null 2>&1
    fi
}

# Builds and serves ngui, then blocks until it actually answers. A bounded wait matters: the
# original loop here had no timeout, so a container that never came up hung the run forever.
# Usage: ngui_start API_ENDPOINT PORT CI_MODE
ngui_start() {
    local api_endpoint="$1" port="$2" ci_mode="$3"

    echo "Starting ngui application..."
    ngui_remove

    # Every service endpoint points at the same cluster; the UI proxies to it.
    local env_args=(
        -e "PROXY_URL=$api_endpoint"
        -e "KEEPER_ENDPOINT=$api_endpoint"
        -e "SLACKER_ENDPOINT=$api_endpoint"
        -e "RESTAPI_ENDPOINT=$api_endpoint"
        -e "AUTH_ENDPOINT=$api_endpoint"
        -e "BUILD_MODE=production"
        -e "UI_BUILD_PATH=/usr/src/app/ui"
    )
    [ "$ci_mode" = true ] && env_args+=(-e "CI=true")

    docker build -t "$NGUI_IMAGE" -f ../ngui/Dockerfile ../. || exit 1
    docker run -d --name "$NGUI_CONTAINER" -p "$port:$NGUI_INTERNAL_PORT" \
        "${env_args[@]}" "$NGUI_IMAGE" || exit 1

    # Checked from this machine, so localhost — the tests reach the same app via their base URL.
    local health_url="http://localhost:$port"
    local waited=0
    echo "Waiting up to ${NGUI_READY_TIMEOUT}s for $health_url ..."
    # -f so an error page doesn't count as ready; plain -s returns 0 for a 500.
    until curl -sf -o /dev/null "$health_url"; do
        if ! docker ps --format '{{.Names}}' | grep -q "^${NGUI_CONTAINER}$"; then
            echo "Error: $NGUI_CONTAINER exited before serving. Logs:"
            docker logs "$NGUI_CONTAINER" 2>&1 | tail -40
            exit 1
        fi
        sleep 1
        waited=$((waited + 1))
        if [ "$waited" -ge "$NGUI_READY_TIMEOUT" ]; then
            echo "Error: $health_url did not answer within ${NGUI_READY_TIMEOUT}s. Logs:"
            docker logs "$NGUI_CONTAINER" 2>&1 | tail -40
            exit 1
        fi
    done
    echo "Application is ready at $health_url"
}
