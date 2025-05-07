#!/usr/bin/env bash
set -e

BUILD_TAG='build'

SERVICES=("bulldozer_api" "bulldozer_worker")
for SERVICE in "${SERVICES[@]}"
do
    echo "Started testing ${SERVICE}>>>"
    TEST_IMAGE="${SERVICE}_tests"
    docker build -t ${TEST_IMAGE}:${BUILD_TAG} --build-arg IMAGE=${SERVICE} -f bulldozer/${SERVICE}/Dockerfile_tests .

    echo "Pycodestyle tests>>>"
    docker run -i --rm ${TEST_IMAGE}:${BUILD_TAG} bash -c "pycodestyle bulldozer"
    echo "<<<Pycodestyle tests"

    echo "Pylint tests>>>"
    docker run -i --rm ${TEST_IMAGE}:${BUILD_TAG} \
        bash -c "pylint --rcfile=bulldozer/.pylintrc --fail-under=9 --fail-on=E,F ./bulldozer"
    echo "<<<Pylint tests"

    if [[ "${SERVICE}" == "bulldozer_api" ]]; then
        echo "Unit tests>>>"
        docker run -i --rm ${TEST_IMAGE}:${BUILD_TAG} \
            bash -c "pytest ./bulldozer/bulldozer_api/tests/"
        echo "<<Unit tests"
    fi

    docker rmi ${TEST_IMAGE}:${BUILD_TAG}
    echo "<<<Finished testing ${SERVICE}"
done
