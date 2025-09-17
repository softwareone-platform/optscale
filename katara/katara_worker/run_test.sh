#!/usr/bin/env bash
set -e

BUILD_TAG='build'
TEST_IMAGE=katara_worker_tests:${BUILD_TAG}

docker build -t ${TEST_IMAGE} --build-arg BUILDTAG=${BUILD_TAG} -f katara/katara_worker/Dockerfile_tests .

echo "Pycodestyle tests>>>"
docker run -i --rm ${TEST_IMAGE} \
    bash -c "uv --project katara/katara_worker run pycodestyle --exclude=.venv katara"
echo "<<<Pycodestyle tests"

echo "Pylint tests>>>"
docker run -i --rm ${TEST_IMAGE} \
    bash -c "uv --project katara/katara_worker run pylint --rcfile=katara/katara_worker/.pylintrc --fail-under=9 --fail-on=E,C,F ./katara"

docker rmi ${TEST_IMAGE}
