#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# The build contexts, the /app mount and ngui-container.sh's ../ngui all resolve from here, so the
# script has to own its directory rather than inherit the caller's.
cd "$SCRIPT_DIR" || exit 1

source "$SCRIPT_DIR/docker/ngui-container.sh"

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

# Help message
show_help() {
    echo "Usage: $0 [options]"
    echo "Options:"
    echo "  -c, --config FILE        Playwright config file (default: $CONFIG_FILE)"
    echo "  -u, --update             Update screenshots. Refuses -S: a committed set is only ever"
    echo "                          rebuilt from its own environment's pixels."
    echo "  -E, --env NAME          Environment preset: local | dev | prerelease | staging | prod"
    echo "                          Targets that preset's URLs and its snapshots/<env>/docker/ folder."
    echo "                          'local' is served from your machine, so it requires -H, -a or -U."
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

# An unknown -E or -S is as much a typo as an unknown flag, so it fails here rather than after a
# docker build. env-config.mjs reads the same table the tests do, so there is nothing to keep in sync.
require_known() {
    local value="$1" listing="$2" flag="$3" allowed
    [ -z "$value" ] && return 0

    allowed="$(node "$SCRIPT_DIR/scripts/env-config.mjs" "$listing")" || exit 1
    if ! printf '%s\n' "$allowed" | grep -qx "$value"; then
        echo "Unknown $flag \"$value\". Choose one of: $(printf '%s' "$allowed" | tr '\n' ' ')"
        exit 1
    fi
}

require_known "$TEST_ENV_NAME" --names -E
require_known "$SNAPSHOT_ENV_NAME" --keys -S

# Both the image tag and the in-container install come from this one value, so a range like
# ^1.52.0 would name no image at all. Checked here rather than at the build, like the flags above.
PLAYWRIGHT_VERSION="$(node -p "require('./package.json').devDependencies['@playwright/test']")" || exit 1
if ! printf '%s' "$PLAYWRIGHT_VERSION" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$'; then
    echo "Error: @playwright/test in package.json is \"$PLAYWRIGHT_VERSION\", which is not an exact version."
    echo "  The container runs mcr.microsoft.com/playwright:v<that>, so it has to name a single release."
    echo "  Pinning it is deliberate: the browser version is what renders the committed screenshots."
    exit 1
fi

# -u writes whatever -S selected, so the pair would re-base one environment's committed screenshots
# on another's pixels. An environment is only ever updated from itself.
if [ "$UPDATE_SCREENSHOTS" = true ] && [ -n "$SNAPSHOT_ENV_NAME" ]; then
    echo "Error: -u/--update cannot be combined with -S/--snapshots"
    echo "  -u would overwrite snapshots/$SNAPSHOT_ENV_NAME/docker/ with pixels rendered against"
    echo "  ${TEST_ENV_NAME:-the environment under test}. Drop -S to update this environment's own screenshots,"
    echo "  or run with -E $SNAPSHOT_ENV_NAME -u to update that one from itself."
    exit 1
fi

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

# A preset served from this machine points the container at itself, so every test would shoot a
# blank page — and with -u it would commit those blanks. The picker holds the same rule in
# scripts/dev-server.mjs, where it can also offer to start the server.
if [ -n "$TEST_ENV_NAME" ] && [ "$URL_EXPLICIT" = false ]; then
    PRESET_URL="$(node "$SCRIPT_DIR/scripts/env-config.mjs" "$TEST_ENV_NAME" baseUrl)" || exit 1
    case "$PRESET_URL" in
        http://localhost*|http://127.0.0.1*|http://0.0.0.0*)
            echo "Error: -E $TEST_ENV_NAME is served from your machine ($PRESET_URL), which inside the test"
            echo "  container means the container itself. Say where the app really is:"
            echo "    -H                     you are already serving it (port $PORT, or -p)"
            echo "    -a API_ENDPOINT        let this script build and serve it"
            echo "    -U URL                 somewhere else entirely"
            exit 1
            ;;
    esac
fi

run_tests() {
    echo "Running tests in Docker container..."
    docker build -t playwright-tests --build-arg "PLAYWRIGHT_VERSION=$PLAYWRIGHT_VERSION" -f docker/Dockerfile.linux . || exit 1

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
    ngui_remove
}

# Runs on any exit, so a failed build or a Ctrl-C doesn't leave the app behind.
trap cleanup EXIT

if [ "$RUN_APP" = true ]; then
    ngui_start "$API_ENDPOINT" "$PORT" "$CI_MODE"
fi

run_tests
