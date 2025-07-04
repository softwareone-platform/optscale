#!/bin/bash

set -e

mkdir -p "$OUTPUT_CUSTOM_TEMPLATES_DIR"
cp -r ./templates/* "$OUTPUT_CUSTOM_TEMPLATES_DIR"

echo "✅ Done! Generated templates are in $OUTPUT_CUSTOM_TEMPLATES_DIR"
