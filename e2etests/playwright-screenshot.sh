set -ex

if [ -t 0 ] ; then
    ARGS="-i"
else
    ARGS=""
fi

docker run ${ARGS} --rm \
  -p 9323:9323 \
  -v "$PWD/tests:/app/tests" \
  -v "$PWD/tests/screenshots:/app/tests/screenshots" \
  -v "$PWD/playwright.screenshot.config.ts:/app/playwright.screenshot.config.ts" \
  -v "$PWD/playwright-report/:/app/playwright-report" \
  -v "$PWD/api-requests/:/app/api-requests" \
  -v "$PWD/.env.local:/app/.env.local" \
  -v "$PWD/package.json:/app/package.json" \
  -v "$PWD/fixtures/:/app/fixtures" \
  -v "$PWD/.cache/:/app/.cache" \
  -v "$PWD/pages/:/app/pages" \
  -v "$PWD/setup/:/app/setup" \
  -v "$PWD/test-data/:/app/test-data" \
  -v "$PWD/utils/:/app/utils" \
  -e "CI=${CI}" \
  --add-host=host.docker.internal:host-gateway \
  -t playwright-screenshot-tests \
  npm run "$@"
