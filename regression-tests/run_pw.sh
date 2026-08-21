#!/bin/bash

# Default values
CONFIG_FILE="playwright.config.ts"
UPDATE_SCREENSHOTS=false
CI_MODE=
BASE_URL=""
URL_EXPLICIT=false
HOST_APP=false
TEST_ENV_NAME=""
SNAPSHOT_ENV_NAME=""
PORT=3000
PW_ARGS=()
RUN_APP=false
KEEP_RUNNING=false
API_ENDPOINT=""

# The ngui container publishes its internal 4000 on $PORT of the host.
NGUI_CONTAINER="ngui-container"
NGUI_IMAGE="ngui-app"
NGUI_INTERNAL_PORT=4000
NGUI_READY_TIMEOUT=90

# Help message
show_help() {
    echo "Usage: $0 [options]"
    echo "Options:"
    echo "  -c, --config FILE        Playwright config file (default: $CONFIG_FILE)"
    echo "  -u, --update             Update screenshots"
    echo "  -E, --env NAME          Environment preset: local | dev | prerelease | staging | prod"
    echo "                          Targets that preset's URLs and its snapshots/<env>/docker/ folder."
    echo "                          'local' serves the UI from the host, so pair it with -a or -U."
    echo "  -S, --snapshots KEY     Compare against another environment's screenshots"
    echo "                          (dev | prerelease | staging | prod). Defaults to -E's own."
    echo "                          Moves only the screenshots; the token stays with -E."
    echo "                          Runs here always use snapshots/<env>/docker/ (committed)."
    echo "  -H, --host-app          The app is served from your machine, not the container."
    echo "                          Resolves the host gateway for you (see -p for the port)."
    echo "  -U, --url URL           Base URL for the application"
    echo "  -p, --port PORT         Host port the app is served on (default: $PORT)"
    echo "  -a, --run-application API_ENDPOINT"
    echo "                          Build and serve ngui in a container pointing at API_ENDPOINT,"
    echo "                          wait until it answers, run the tests, then remove it."
    echo "  -k, --keep-running      Leave that container up after the tests finish."
    echo "  -i, --ci                Set CI=true environment variable"
    echo "  -h, --help              Show this help message"
    echo ""
    echo "Or serve the UI yourself (vite, ngui/docker-compose.yml) and point a run at it:"
    echo "  $0 -E local -H"
    echo ""
    echo "Anything that isn't an option is forwarded to 'playwright test', so a run can be"
    echo "narrowed to one spec. Put Playwright's own flags after '--'."
    echo "  $0 -E dev tests/pools.spec.ts"
    echo "  $0 -E dev -u tests/pools.spec.ts"
    echo "  $0 -E dev -- -g 'side modal'"
    exit 0
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -c|--config)
            CONFIG_FILE="$2"
            shift 2
            ;;
        -u|--update)
            UPDATE_SCREENSHOTS=true
            shift
            ;;
        -E|--env)
            TEST_ENV_NAME="$2"
            shift 2
            ;;
        -S|--snapshots)
            SNAPSHOT_ENV_NAME="$2"
            shift 2
            ;;
        -H|--host-app)
            HOST_APP=true
            shift
            ;;
        -U|--url)
            URL_EXPLICIT=true
            BASE_URL="$2"
            shift 2
            ;;
        -p|--port)
            PORT="$2"
            shift 2
            ;;
        -a|--run-application)
            RUN_APP=true
            if [ -z "$2" ] || [[ "$2" =~ ^- ]]; then
                echo "Error: API_ENDPOINT is required when using -a/--run-application"
                show_help
            fi
            API_ENDPOINT="$2"
            shift 2
            ;;
        -k|--keep-running)
            KEEP_RUNNING=true
            shift
            ;;
        -i|--ci)
            CI_MODE=true
            shift
            ;;
        -h|--help)
            show_help
            ;;
        --)
            shift
            PW_ARGS+=("$@")
            break
            ;;
        -*)
            # Still reject unknown *flags*, so a typo fails here instead of inside the container.
            echo "Unknown option: $1"
            show_help
            ;;
        *)
            # Bare arguments are spec paths for Playwright.
            PW_ARGS+=("$1")
            shift
            ;;
    esac
done

# Docker Desktop (macOS, Windows) runs containers inside a VM, so the developer's machine is only
# reachable through the gateway alias and --network host would bind the VM instead. Both Windows
# spellings are listed: Git Bash reports cygwin, MSYS2 reports msys.
case "$OSTYPE" in
    darwin*|msys*|cygwin*|win32) DOCKER_IN_VM=true ;;
    *) DOCKER_IN_VM=false ;;
esac

# Every docker call here carries container-side paths (-w /app, UI_BUILD_PATH); without this a
# Git Bash shell rewrites them into Windows paths on the way through. Ignored off Windows.
export MSYS_NO_PATHCONV=1

# Inside the container `localhost` is the container, so an app served from the developer's
# machine is reached through the host gateway. Only place this rule lives; -H asks for it.
if [ "$DOCKER_IN_VM" = true ]; then
    DEFAULT_BASE_URL="http://host.docker.internal:$PORT"
else
    DEFAULT_BASE_URL="http://0.0.0.0:$PORT"
fi

if [ "$RUN_APP" = true ] && [ -n "$BASE_URL" ]; then
    echo "Error: -U/--url cannot be combined with -a/--run-application"
    echo "  -a publishes the app on port $PORT of this machine and targets it for you."
    exit 1
fi

# -U names a URL outright; -H and -a both mean "the app is on this machine", which from inside the
# test container is the host gateway. Either way the caller has chosen, which is what URL_EXPLICIT
# records — an -E preset supplies its own URL otherwise.
if [ -z "$BASE_URL" ]; then
    BASE_URL="$DEFAULT_BASE_URL"
    { [ "$HOST_APP" = true ] || [ "$RUN_APP" = true ]; } && URL_EXPLICIT=true
fi

run_tests() {
    echo "Running tests in Docker container..."
    docker build -t playwright-tests -f docker/Dockerfile.linux . || exit 1

    TEST_ARGS=("--config=$CONFIG_FILE")
    [ "$UPDATE_SCREENSHOTS" = true ] && TEST_ARGS+=("--update-snapshots")

    # A preset supplies its own URLs, so only force BASE_URL_OVERRIDE when the caller named one.
    DOCKER_ARGS=()
    [ -n "$TEST_ENV_NAME" ] && DOCKER_ARGS+=(-e "TEST_ENV=$TEST_ENV_NAME")
    if [ -z "$TEST_ENV_NAME" ] || [ "$URL_EXPLICIT" = true ]; then
        DOCKER_ARGS+=(-e "BASE_URL_OVERRIDE=$BASE_URL")
    fi
    [ -n "$SNAPSHOT_ENV_NAME" ] && DOCKER_ARGS+=(-e "SNAPSHOT_ENV=$SNAPSHOT_ENV_NAME")
    [ "$CI_MODE" = true ] && DOCKER_ARGS+=(-e "CI=true")

    # Host networking only where the daemon shares the host's stack, i.e. Linux.
    [ "$DOCKER_IN_VM" = false ] && DOCKER_ARGS+=(--network host)

    # Git Bash reports /c/... which docker does not accept as a mount source; pwd -W gives C:/...
    HOST_CWD="$(pwd -W 2>/dev/null || pwd)"

    docker run --rm \
        "${DOCKER_ARGS[@]}" \
        -v "$HOST_CWD:/app" \
        -v /app/node_modules \
        -w /app \
        playwright-tests npx playwright test "${TEST_ARGS[@]}" "${PW_ARGS[@]}"
}

ngui_container_exists() {
    docker ps -a --format '{{.Names}}' | grep -q "^${NGUI_CONTAINER}$"
}

remove_ngui_container() {
    if ngui_container_exists; then
        docker stop "$NGUI_CONTAINER" >/dev/null 2>&1
        docker rm "$NGUI_CONTAINER" >/dev/null 2>&1
    fi
}

# Builds and serves ngui, then blocks until it actually answers. A bounded wait matters: the
# original loop here had no timeout, so a container that never came up hung the run forever.
run_application() {
    echo "Starting ngui application..."
    remove_ngui_container

    # Every service endpoint points at the same cluster; the UI proxies to it.
    NGUI_ENV_ARGS=(
        -e "PROXY_URL=$API_ENDPOINT"
        -e "KEEPER_ENDPOINT=$API_ENDPOINT"
        -e "SLACKER_ENDPOINT=$API_ENDPOINT"
        -e "RESTAPI_ENDPOINT=$API_ENDPOINT"
        -e "AUTH_ENDPOINT=$API_ENDPOINT"
        -e "BUILD_MODE=production"
        -e "UI_BUILD_PATH=/usr/src/app/ui"
    )
    [ "$CI_MODE" = true ] && NGUI_ENV_ARGS+=(-e "CI=true")

    docker build -t "$NGUI_IMAGE" -f ../ngui/Dockerfile ../. || exit 1
    docker run -d --name "$NGUI_CONTAINER" -p "$PORT:$NGUI_INTERNAL_PORT" \
        "${NGUI_ENV_ARGS[@]}" "$NGUI_IMAGE" || exit 1

    # Checked from this machine, so localhost — the tests reach the same app via $BASE_URL.
    HEALTH_URL="http://localhost:$PORT"
    echo "Waiting up to ${NGUI_READY_TIMEOUT}s for $HEALTH_URL ..."
    WAITED=0
    # -f so an error page doesn't count as ready; plain -s returns 0 for a 500.
    until curl -sf -o /dev/null "$HEALTH_URL"; do
        if ! docker ps --format '{{.Names}}' | grep -q "^${NGUI_CONTAINER}$"; then
            echo "Error: $NGUI_CONTAINER exited before serving. Logs:"
            docker logs "$NGUI_CONTAINER" 2>&1 | tail -40
            exit 1
        fi
        sleep 1
        WAITED=$((WAITED + 1))
        if [ "$WAITED" -ge "$NGUI_READY_TIMEOUT" ]; then
            echo "Error: $HEALTH_URL did not answer within ${NGUI_READY_TIMEOUT}s. Logs:"
            docker logs "$NGUI_CONTAINER" 2>&1 | tail -40
            exit 1
        fi
    done
    echo "Application is ready at $HEALTH_URL (tests will use $BASE_URL)"
}

cleanup() {
    if [ "$RUN_APP" != true ]; then
        return
    fi
    if [ "$KEEP_RUNNING" = true ]; then
        echo "Keeping $NGUI_CONTAINER running on http://localhost:$PORT"
        echo "Remove it with: docker stop $NGUI_CONTAINER && docker rm $NGUI_CONTAINER"
        return
    fi
    echo "Removing $NGUI_CONTAINER..."
    remove_ngui_container
}

# Runs on any exit, so a failed build or a Ctrl-C doesn't leave the app behind.
trap cleanup EXIT

if [ "$RUN_APP" = true ]; then
    run_application
fi

run_tests
