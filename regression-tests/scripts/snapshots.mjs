// Which screenshots a run will be measured against, and the ways that choice can mislead.
import { existsSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// snapshots/<key>/docker/ is the committed, reviewed set, so it is the list of screenshots any
// other renderer is expected to hold.
export const COMMITTED_RENDERER = 'docker';

export const screenshotDir = (key, renderer) => resolve(projectRoot, 'snapshots', key, renderer);

export const listScreenshots = (key, renderer) => {
  const dir = screenshotDir(key, renderer);
  return existsSync(dir) ? readdirSync(dir).filter(file => file.endsWith('.png')) : [];
};

export const countScreenshots = (key, renderer) => listScreenshots(key, renderer).length;

/** What `snapshots/<targetKey>/<renderer>/` holds too little or too much of, against a committed set. */
export function diffAgainstCommitted({ targetKey, renderer, referenceKey = targetKey }) {
  const expected = listScreenshots(referenceKey, COMMITTED_RENDERER);
  const present = listScreenshots(targetKey, renderer);

  return {
    expectedCount: expected.length,
    presentCount: present.length,
    missing: expected.filter(name => !present.includes(name)).sort(),
    unused: present.filter(name => !expected.includes(name)).sort(),
  };
}

const LISTED_AT_MOST = 8;

const indented = names =>
  [...names.slice(0, LISTED_AT_MOST), ...(names.length > LISTED_AT_MOST ? [`… and ${names.length - LISTED_AT_MOST} more`] : [])]
    .map(name => `\n     ${name}`)
    .join('');

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

  const targetDir = `snapshots/${snapshotEnv}/${renderer}/`;

  if (countScreenshots(snapshotEnv, renderer) === 0 && intent !== 'update') {
    lines.push(
      `\n!  ${targetDir} is empty. A local run writes the missing images` +
        `\n   and continues; a container run fails, since those are the committed ones.`
    );
  }

  if (intent === 'update') {
    lines.push(`\n   Updating ${targetDir}`);
    if (renderer === COMMITTED_RENDERER) {
      lines.push(`\n!  That is the committed, reviewed set. An update never fails, so diff the PNGs before` + `\n   committing them.`);
    }
  }

  // A container run measures the committed set itself, so what it can be short of is whatever the
  // environment under test has committed. Any other renderer is short against its own environment's.
  const referenceKey = renderer === COMMITTED_RENDERER ? environment.key : snapshotEnv;
  const { expectedCount, missing, unused } = diffAgainstCommitted({ targetKey: snapshotEnv, renderer, referenceKey });

  if (missing.length > 0 && missing.length < expectedCount && intent !== 'update') {
    const consequence =
      renderer === COMMITTED_RENDERER
        ? `\n   A container run fails on a missing screenshot rather than creating one.`
        : `\n   This run captures them from the app as it is now, so nothing is compared for those.`;

    lines.push(
      `\n!  ${missing.length} of ${expectedCount} screenshots in snapshots/${referenceKey}/${COMMITTED_RENDERER}/ are not in` +
        `\n   ${targetDir}:${indented(missing)}` +
        consequence
    );
  }

  if (unused.length > 0 && renderer !== COMMITTED_RENDERER) {
    lines.push(
      `\n!  ${unused.length} file(s) in ${targetDir} are not in the committed set — a rename or a` +
        `\n   deleted spec leaves those behind:${indented(unused)}` +
        `\n   Review them with \`npm run snapshots:prune\`.`
    );
  }

  return lines;
}
