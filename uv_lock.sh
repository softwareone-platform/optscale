#!/usr/bin/env bash

find . -type f -name pyproject.toml -print0 \
  | xargs -0 -n1 -I{} sh -c '
    cd "$(dirname "{}")" || exit
    echo "Locking: $(pwd)"
    uv lock
  '
