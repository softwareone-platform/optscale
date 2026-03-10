#!/bin/bash

set -e

mkdir -p "$OUTPUT_CUSTOM_FILTERS_DIR"
cp -r ./filters/* "$OUTPUT_CUSTOM_FILTERS_DIR"

echo "✅ Done! Custom filters have been copied to $OUTPUT_CUSTOM_FILTERS_DIR"
