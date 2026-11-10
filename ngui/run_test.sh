#!/usr/bin/env bash
set -e

TEST_IMAGE=ngui_tests:source

WORKDIR=/usr/src/app
UI_DIR=${WORKDIR}/ui

docker build -t ${TEST_IMAGE} --target source -f ngui/Dockerfile .

echo "Linter NGUI >>>"
docker run -i --rm ${TEST_IMAGE} sh -c "cd ${WORKDIR} && pnpm check"
echo "<<<Linter"

echo "Check code quality UI >>>"
docker run -i --rm ${TEST_IMAGE} sh -c "cd ${UI_DIR} && pnpm check:all"
echo "<<<Check code quality UI "

echo "Translations order test>>>"
docker run -i --rm ${TEST_IMAGE} sh -c "cd ${UI_DIR} && pnpm run translate:test"
echo "<<<Translations order test"

docker rmi ${TEST_IMAGE}
