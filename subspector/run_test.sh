#!/usr/bin/env bash
set -e

BUILD_TAG='build'
TEST_IMAGE=subspector_tests:${BUILD_TAG}

docker build -t ${TEST_IMAGE} --build-arg BUILDTAG=${BUILD_TAG} -f subspector/Dockerfile_tests .

echo "Static code analysis>>>"
docker run -i --rm ${TEST_IMAGE} bash -c \
    "uv --project subspector run ruff check --config subspector/pyproject.toml subspector/"
echo "<<<Static code analysis"

echo "Static type checking>>>"
docker run -i --rm ${TEST_IMAGE} bash -c \
    "uv --project subspector run mypy --config-file subspector/pyproject.toml subspector/"
echo "<<<Static type checking"

echo "Alembic down revision tests>>>"
docker run -i --rm ${TEST_IMAGE} bash -c \
    "uv --project subspector run tools/check_alembic_down_revisions/check_alembic_down_revisions.py --alembic_versions_path subspector/subspector_server/alembic/versions"
echo "<<Alembic down revision tests"

echo "Unit tests>>>"
docker run -i --rm ${TEST_IMAGE} \
    bash -c "uv --project subspector run pytest ./subspector/subspector_server/tests/unittests"
echo "<<Unit tests"

docker rmi ${TEST_IMAGE}
