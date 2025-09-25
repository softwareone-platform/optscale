#!/usr/bin/env bash

set -euo pipefail

echo "Formatting>>>"
uv --directory tools/db run ruff format --check --diff
echo "<<<Formatting"

echo "Linting>>>"
uv --directory tools/db run ruff check
echo "<<<Linting"

echo "Tests>>>"
uv --directory tools/db run pytest
echo "<<<Tests"
