#!/usr/bin/env bash
set -e

BUILD_TAG='build'
TEST_IMAGE=ffc_api_tests:${BUILD_TAG}

docker build -t ${TEST_IMAGE} --build-arg BUILDTAG=${BUILD_TAG} -f ffc_api/Dockerfile_tests .

echo "Run Ruff to check code style>>>"
docker run -i --rm ${TEST_IMAGE} bash -c \
    "uv --project ffc_api run ruff check ffc_api"
echo "<<<Ruff check"

echo "Check formatting with Ruff>>>"
docker run -i --rm ${TEST_IMAGE} bash -c \
  "uv --project ffc_api run ruff format --check --diff ffc_api"
echo "<<Ruff format"

echo "Run tests with pytest>>>"
docker run -i --rm ${TEST_IMAGE} bash -c \
    "uv --project ffc_api run pytest --disable-warnings ffc_api"
echo "<<Pytest"

docker rmi ${TEST_IMAGE}
