#!/usr/bin/env bash
set -e

FIND_CMD="find . -mindepth 2 -maxdepth 3 -print | grep Dockerfile | grep -vE '(test|.j2)'"
BUILD_TAG="latest"

REGISTRY=""

if [[ -z "$1" ]]; then
    echo "You must specify the docker registry"
    exit 1
else
    REGISTRY="$1"
fi


if [[ ! -z "$2" ]]; then
    BUILD_TAG="$2"
fi



for DOCKERFILE in $(eval ${FIND_CMD} | xargs)
do
    COMPONENT=$(echo "${DOCKERFILE}" | awk -F '/' '{print $(NF-1)}')
    echo "Building image for ${COMPONENT}, build tag: ${BUILD_TAG}"
    docker build -t ${REGISTRY}/${COMPONENT}:${BUILD_TAG} -f ${DOCKERFILE} .
    docker push ${REGISTRY}/${COMPONENT}:${BUILD_TAG}
done
