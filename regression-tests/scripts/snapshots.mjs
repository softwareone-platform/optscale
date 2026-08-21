// Which screenshots a run will be measured against, and the ways that choice can mislead.
import { existsSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export const countScreenshots = (key, renderer) => {
  const dir = resolve(projectRoot, 'snapshots', key, renderer);
  return existsSync(dir) ? readdirSync(dir).filter(file => file.endsWith('.png')).length : 0;
};

/** Everything worth saying before a run starts, as lines to print. Empty when nothing is off. */
export function warnings({ environments, environment, snapshotEnv, renderer, intent }) {
  const lines = [];

  // Comparing against screenshots from another cluster is legitimate but easy to do by accident.
  const snapshotTwin = Object.values(environments).find(definition => definition.key === snapshotEnv);
  if (snapshotTwin && snapshotTwin.apiBaseUrl !== environment.apiBaseUrl) {
    lines.push(
      `\n!  ${environment.name} calls ${environment.apiBaseUrl}, but the "${snapshotEnv}" screenshots` +
        `\n   were captured against ${snapshotTwin.apiBaseUrl}. Differences may reflect the` +
        `\n   deployments rather than your code.`
    );
  }

  if (countScreenshots(snapshotEnv, renderer) === 0 && intent !== 'update') {
    lines.push(
      `\n!  snapshots/${snapshotEnv}/${renderer}/ is empty. A local run writes the missing images` +
        `\n   and continues; a container run fails, since those are the committed ones.`
    );
  }

  if (intent === 'update') {
    lines.push(`\n   Updating snapshots/${snapshotEnv}/${renderer}/`);
    if (renderer === 'docker') {
      lines.push(`\n!  That is the committed, reviewed set. An update never fails, so diff the PNGs before` + `\n   committing them.`);
    }
  }

  return lines;
}
