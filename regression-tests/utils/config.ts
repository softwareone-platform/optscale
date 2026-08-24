import fs from 'fs';
import os from 'os';
import { env } from './env';

// Text rasterises differently per platform, so screenshots are only comparable against ones
// made the same way. Putting the renderer in the path makes a cross-platform comparison
// impossible rather than merely inadvisable.
const isContainerRun = fs.existsSync('/.dockerenv');
const renderer = isContainerRun ? 'docker' : os.platform();

export const config = {
  ...env,

  /** Milliseconds. */
  timeouts: {
    probe: 2_000,
    click: 10_000,
    viewportStable: 10_000,
  },

  snapshotsAreShared: isContainerRun,

  renderer,

  paths: {
    snapshotDir: `./snapshots/${env.snapshotEnv}/${renderer}`,
    snapshotTemplate: `./snapshots/${env.snapshotEnv}/${renderer}/{arg}{ext}`,
    testAccountSessionFile: `.cache/${env.envKey}-session.json`,
  },
} as const;

export { requireEnv } from './env';
