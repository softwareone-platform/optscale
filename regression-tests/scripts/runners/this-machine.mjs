// A run on this machine rather than in the container, headless or in Playwright's UI mode. Its
// screenshots are per platform and gitignored, so only the container's set is compared across
// machines. Paired with docker.mjs — both files export the same names.
import process from 'node:process';

export const modes = [
  { label: 'headless     locally, no window', ui: false },
  { label: 'ui           Playwright UI mode — for stepping through a run', ui: true },
];

export const renderer = process.platform;

export const servesAppFromHost = false;

export function build({ environment, intent, snapshotEnv, ui }) {
  const command = ['npx', 'playwright', 'test'];

  if (ui) command.push('--ui');
  if (intent === 'update') command.push('--update-snapshots');

  const env = { TEST_ENV: environment.name };
  if (snapshotEnv !== environment.key) env.SNAPSHOT_ENV = snapshotEnv;

  return { command, env };
}
