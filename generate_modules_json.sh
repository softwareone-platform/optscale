#!/usr/bin/env bash
set -e

FIND_CMD="find . -mindepth 2 -maxdepth 3 -print | grep Dockerfile | grep -vE '(test|.j2)'"

MATRIX=""

for DOCKERFILE in $(eval ${FIND_CMD} | xargs)
do
    COMPONENT=$(echo "${DOCKERFILE}" | awk -F '/' '{print $(NF-1)}')
    MATRIX="${MATRIX}{\"name\": \"${COMPONENT}\",\"dockerfile\": \"$DOCKERFILE\"},"
done

MATRIX="[${MATRIX::-1}]"

echo -n "{\"include\": $MATRIX}"
