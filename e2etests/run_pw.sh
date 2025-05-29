#!/bin/bash

# Default values
CONFIG_FILE="playwright.regression.config.ts"
UPDATE_SCREENSHOTS=false
BASE_URL="http://0.0.0.0:4000"
RUN_APP=false
KEEP_RUNNING=false
API_ENDPOINT=""

# Help message
show_help() {
    echo "Usage: $0 [API_ENDPOINT] [options]"
    echo "Arguments:"
    echo "  API_ENDPOINT            The API endpoint URL to use (optional if FFC_API_ENDPOINT env var is set)"
    echo "Options:"
    echo "  -c, --config FILE        Playwright config file (default: regression-tests/playwright.regression.config.ts)"
    echo "  -u, --update             Update screenshots"
    echo "  -U, --url URL           Base URL for the application (default: http://0.0.0.0:4000)"
    echo "  -a, --run-application   Run the application in ngui folder"
    echo "  -k, --keep-running      Keep the application running after tests complete"
    echo "  -h, --help              Show this help message"
    exit 0
}

# Check if API_ENDPOINT is provided as first argument
if [ $# -gt 0 ] && [[ ! "$1" =~ ^- ]]; then
    API_ENDPOINT="$1"
    shift
fi

# If API_ENDPOINT is not set via argument, try to get it from environment
if [ -z "$API_ENDPOINT" ]; then
    if [ -n "$FFC_API_ENDPOINT" ]; then
        API_ENDPOINT="$FFC_API_ENDPOINT"
    else
        echo
        echo "Error: API_ENDPOINT is required. Either provide it as an argument or set FFC_API_ENDPOINT environment variable."
        echo
        show_help
    fi
fi

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
        -a|--run-application)
            RUN_APP=true
            shift
            ;;
        -k|--keep-running)
            KEEP_RUNNING=true
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

# Check if -U and -a are used together
if [ "$RUN_APP" = true ] && [ "$BASE_URL" != "http://0.0.0.0:4000" ]; then
    echo "Error: Options -U/--url and -a/--run-application cannot be used together"
    echo "When running the application (-a), the URL is fixed to http://0.0.0.0:4000"
    exit 1
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
    
    # Run the tests
    docker run --rm \
        --network host \
        -e BASE_URL=$BASE_URL \
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
        echo "Access URL: http://0.0.0.0:4000"
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
    
    # Start the application using Dockerfile
    docker build -t ngui-app -f ../ngui/Dockerfile ../.
    docker run -d --name ngui-container -p 4000:4000 \
        -e PROXY_URL=$API_ENDPOINT \
        -e KEEPER_ENDPOINT=$API_ENDPOINT \
        -e SLACKER_ENDPOINT=$API_ENDPOINT \
        -e RESTAPI_ENDPOINT=$API_ENDPOINT \
        -e AUTH_ENDPOINT=$API_ENDPOINT \
        -e BUILD_MODE=production \
        -e UI_BUILD_PATH=/usr/src/app/ui \
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
    echo "Waiting for application to be ready..."
    until curl -s http://0.0.0.0:4000 > /dev/null; do
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

