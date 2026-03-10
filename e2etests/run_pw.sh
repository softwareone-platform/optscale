#!/bin/bash

# Default values
CONFIG_FILE="playwright.regression.config.ts"
UPDATE_SCREENSHOTS=false
RUN_APP=false
KEEP_RUNNING=false
API_ENDPOINT=""
CI_MODE=
BASE_URL=""
PORT=3000

# Help message
show_help() {
    echo "Usage: $0 [options]"
    echo "Options:"
    echo "  -c, --config FILE        Playwright config file (default: regression-tests/playwright.regression.config.ts)"
    echo "  -u, --update             Update screenshots"
    echo "  -U, --url URL           Base URL for the application (default: $DEFAULT_BASE_URL)"
    echo "  -p, --port PORT         Port to use for the application (default: $PORT)"
    echo "  -a, --run-application API_ENDPOINT   Run the application in ngui folder with specified API endpoint"
    echo "  -k, --keep-running      Keep the application running after tests complete"
    echo "  -i, --ci                Set CI=true environment variable"
    echo "  -h, --help              Show this help message"
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
        -U|--url)
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
                echo "Error: API_ENDPOINT is required when using -a/--run-application option"
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
        *)
            echo "Unknown option: $1"
            show_help
            ;;
    esac
done

# Set DEFAULT_BASE_URL with new port
if [[ "$OSTYPE" == "darwin"* ]] || [[ "$OSTYPE" == "msys"* ]]; then
    DEFAULT_BASE_URL="http://host.docker.internal:$PORT"
else
    DEFAULT_BASE_URL="http://0.0.0.0:$PORT"
fi

# Set BASE_URL based on options
if [ "$RUN_APP" = true ]; then
    if [ -n "$BASE_URL" ]; then
        echo "Error: Options -U/--url and -a/--run-application cannot be used together"
        echo "When running the application (-a), the URL is fixed to http://0.0.0.0:$PORT"
        exit 1
    fi
    BASE_URL="http://0.0.0.0:$PORT"
elif [ -z "$BASE_URL" ]; then
    BASE_URL="$DEFAULT_BASE_URL"
fi

# Function to run tests in Docker container
run_tests() {
    echo "Running tests in Docker container..."

    # Build the test container
    docker build -t playwright-tests -f docker/Dockerfile.linux .

    # Build test arguments
    TEST_ARGS="--config=$CONFIG_FILE"

    # Add update screenshots flag if specified
    if [ "$UPDATE_SCREENSHOTS" = true ]; then
        TEST_ARGS="$TEST_ARGS --update-snapshots"
    fi

    # Build environment variables
    ENV_ARGS="-e BASE_URL=$BASE_URL"
    if [ "$CI_MODE" = true ]; then
        ENV_ARGS="$ENV_ARGS -e CI=true"
    fi

    ENV_ARGS="$ENV_ARGS -e IS_REGRESSION_RUN=true"

    # Run the tests
    docker run --rm \
        --network host \
        $ENV_ARGS \
        -v $(pwd):/app \
        -v /app/node_modules \
        -w /app \
        playwright-tests npx playwright test $TEST_ARGS
}

# Function to cleanup containers
cleanup() {
    if [ "$RUN_APP" = true ] && [ "$KEEP_RUNNING" = false ]; then
        echo "Cleaning up containers..."
        if docker ps -a --format '{{.Names}}' | grep -q "^ngui-container$"; then
            echo "Stopping and removing ngui-container..."
            docker stop ngui-container
            docker rm ngui-container
        fi
    elif [ "$KEEP_RUNNING" = true ]; then
        echo "Keeping application container running..."
        echo "Container name: ngui-container"
        echo "Access URL: $BASE_URL"
    fi
}

# Function to run the application
run_application() {
    echo "Starting ngui application..."

    # Check if container exists and stop it
    if docker ps -a --format '{{.Names}}' | grep -q "^ngui-container$"; then
        echo "Stopping existing ngui-container..."
        docker stop ngui-container
        docker rm ngui-container
    fi

    # Build environment variables
    ENV_ARGS="-e PROXY_URL=$API_ENDPOINT \
        -e KEEPER_ENDPOINT=$API_ENDPOINT \
        -e SLACKER_ENDPOINT=$API_ENDPOINT \
        -e RESTAPI_ENDPOINT=$API_ENDPOINT \
        -e AUTH_ENDPOINT=$API_ENDPOINT \
        -e BUILD_MODE=production \
        -e UI_BUILD_PATH=/usr/src/app/ui"

    if [ "$CI_MODE" = true ]; then
        ENV_ARGS="$ENV_ARGS -e CI=true"
    fi

    # Start the application using Dockerfile
    docker build -t ngui-app -f ../ngui/Dockerfile ../.
    docker run -d --name ngui-container -p $PORT:4000 \
        $ENV_ARGS \
        ngui-app

    # Wait for container to be running with timeout
    echo "Waiting for container to start..."
    TIMEOUT=30
    COUNTER=0
    until docker ps --format '{{.Names}}' | grep -q "^ngui-container$"; do
        sleep 1
        COUNTER=$((COUNTER + 1))
        if [ $COUNTER -ge $TIMEOUT ]; then
            echo "Error: Container failed to start within $TIMEOUT seconds"
            echo "Container logs:"
            docker logs ngui-container
            exit 1
        fi
    done

    # Wait for the application to be ready
    echo "Waiting for application at $BASE_URL to be ready..."
    until curl -s $BASE_URL > /dev/null; do
        sleep 1
    done

    echo "Application is ready!"
}

# Set up trap to ensure cleanup happens on script exit
trap cleanup EXIT

# Run the application if requested
if [ "$RUN_APP" = true ]; then
    run_application
fi

# Run tests
run_tests
