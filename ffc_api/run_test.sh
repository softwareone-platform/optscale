#!/usr/bin/env bash
set -e

BUILD_TAG='build'
TEST_IMAGE=ffc_api_tests:${BUILD_TAG}

docker build -t ${TEST_IMAGE} --build-arg BUILDTAG=${BUILD_TAG} -f ffc_api/Dockerfile_tests .

echo "Pycodestyle tests>>>"
docker run -i --rm ${TEST_IMAGE} bash -c \
    "uv --project ffc_api run pycodestyle --ignore=E712,W503 --exclude=.venv --max-line-length=100 ffc_api"
echo "<<<Pycodestyle tests"

echo "Pylint tests>>>"
docker run -i --rm ${TEST_IMAGE} bash -c \
  "uv --project ffc_api run pylint --rcfile=ffc_api/.pylintrc --fail-under=9 --fail-on=E,F ./ffc_api"
echo "<<Pylint tests"

echo "Unit tests>>>"
docker run -i --rm ${TEST_IMAGE} bash -c \
    "uv --project ffc_api run pytest --disable-warnings"
echo "<<Unit tests"

docker rmi ${TEST_IMAGE}
