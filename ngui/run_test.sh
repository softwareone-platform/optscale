#!/usr/bin/env bash
set -e

BUILD_TAG='build'
TEST_IMAGE=ngui_tests:${BUILD_TAG}
UI_DIR=/usr/src/app/ui

docker build -t ${TEST_IMAGE} --build-arg BUILDTAG=${BUILD_TAG} -f ngui/Dockerfile_tests .

echo "Linter>>>"
docker run -i --rm ${TEST_IMAGE} sh -c "cd ${UI_DIR} && pnpm lint:check"
echo "<<<Linter"

echo "Prettier>>>"
docker run -i --rm ${TEST_IMAGE} sh -c "cd ${UI_DIR} && pnpm prettier:check"
echo "<<Prettier"

echo "Translations order test>>>"
docker run -i --rm ${TEST_IMAGE} sh -c "cd ${UI_DIR} && pnpm run translate:test"
echo "<<<Translations order test"

docker rmi ${TEST_IMAGE}
