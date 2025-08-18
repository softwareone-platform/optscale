#!/usr/bin/env bash

# ./build.sh [tag]

BUILD_TOOL="docker"
INPUT_TAG=""

if [[ $# -ge 1 ]]; then
    INPUT_TAG="$1"
fi

BUILD_TAG=${INPUT_TAG:-'local'}

echo "Building image for ngui, build tag: ${BUILD_TAG}"
docker build -t ngui:${BUILD_TAG} -f ngui/Dockerfile .
