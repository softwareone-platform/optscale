// Which screenshots a run will be measured against, and the ways that choice can mislead.
import { existsSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// snapshots/<key>/docker/ is the committed, reviewed set.
const COMMITTED_RENDERER = 'docker';

const listScreenshots = (key, renderer) => {
  const dir = resolve(projectRoot, 'snapshots', key, renderer);
  return existsSync(dir) ? readdirSync(dir).filter(file => file.endsWith('.png')) : [];
};

export const countScreenshots = (key, renderer) => listScreenshots(key, renderer).length;

/** The folder, spelled the way it is written in menus and warnings. */
export const screenshotDirLabel = (key, renderer) => `snapshots/${key}/${renderer}/`;

// Measured against the environment under test, not against every environment's committed names put
// together: a thinner folder can mean the other deployment simply doesn't render that widget, so a
// union would report a screenshot as owed that the environment can never produce.
function missingFromCommitted(targetKey, referenceKey) {
  const expected = listScreenshots(referenceKey, COMMITTED_RENDERER);
  const present = listScreenshots(targetKey, COMMITTED_RENDERER);

  return { expectedCount: expected.length, missing: expected.filter(name => !present.includes(name)).sort() };
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

  const targetDir = screenshotDirLabel(snapshotEnv, renderer);

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

  // Only worth saying for a container run, which fails on a missing screenshot rather than creating
  // it. Any other renderer captures what it lacks and carries on, so there is nothing to warn about.
  if (renderer === COMMITTED_RENDERER && intent !== 'update') {
    const { expectedCount, missing } = missingFromCommitted(snapshotEnv, environment.key);

    if (missing.length > 0 && missing.length < expectedCount) {
      lines.push(
        `\n!  ${missing.length} of the ${expectedCount} screenshots ${environment.name} captures are not committed` +
          `\n   in ${targetDir}, so this run fails on them:${indented(missing)}` +
          `\n   Add them with \`./run_pw.sh -E ${snapshotEnv} -u\` and commit them for review.`
      );
    }
  }

  return lines;
}
