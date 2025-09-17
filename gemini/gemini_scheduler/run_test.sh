#!/usr/bin/env bash
set -e

BUILD_TAG='build'
TEST_IMAGE=gemini_scheduler_tests:${BUILD_TAG}

docker build -t ${TEST_IMAGE} --build-arg BUILDTAG=${BUILD_TAG} -f gemini/gemini_scheduler/Dockerfile_tests .

echo "Pycodestyle tests>>>"
docker run -i --rm ${TEST_IMAGE} \
    bash -c "uv --project gemini/gemini_scheduler run pycodestyle --exclude=.venv --max-line-length=120 gemini"
echo "<<<Pycodestyle tests"

echo "Pylint tests>>>"
docker run -i --rm ${TEST_IMAGE} \
    bash -c "uv --project gemini/gemini_scheduler run pylint --rcfile=.pylintrc --fail-under=8 --fail-on=E,F ./gemini"
echo "<<<Pylint tests"

docker rmi ${TEST_IMAGE}
