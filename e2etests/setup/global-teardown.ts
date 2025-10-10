import { cleanUpDirectoryIfEnabled } from '../utils/test-after-all-utils';

async function globalTeardown() {
  await cleanUpDirectoryIfEnabled('./tests/downloads');
}

export default globalTeardown;
