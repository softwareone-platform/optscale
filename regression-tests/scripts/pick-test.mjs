#!/usr/bin/env node
// Interactive launcher. Prints the equivalent command before running it, so the flags stay
// learnable. The decisions live here; how each one is carried out lives in the modules it calls.
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureServing, isLoopback } from './dev-server.mjs';
import { loadEnvConfig } from './env-config.mjs';
import { envPrefix, runToCompletion } from './platform/index.mjs';
import { ask, choose, closePrompt, pad } from './prompt.mjs';
import * as docker from './runners/docker.mjs';
import * as thisMachine from './runners/this-machine.mjs';
import { countScreenshots, screenshotDirLabel, warnings } from './snapshots.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const askEnvironment = environments =>
  choose(
    'Where should the browser point?',
    Object.entries(environments).map(([name, definition]) => ({
      label: `${pad(name, 12)} ${definition.baseUrl}`,
      value: { name, ...definition },
    }))
  );

const askMode = () =>
  choose(
    'How should it run?',
    [docker, thisMachine].flatMap(runner => runner.modes.map(({ label, ui }) => ({ label, value: { runner, ui } })))
  );

// Named by folder rather than by environment: `local` and `dev` share one, so a name would be a
// second way of saying it that can disagree with the path the run actually reads.
const askIntent = ownScreenshots =>
  choose('What should this run do?', [
    { label: `${pad('compare', 13)}against ${ownScreenshots}`, value: 'compare' },
    { label: `${pad('cross-check', 13)}against another environment's screenshots`, value: 'cross' },
    { label: `${pad('update', 13)}overwrite ${ownScreenshots}`, value: 'update' },
  ]);

const askSnapshotEnv = (keys, ownKey, renderer) =>
  choose(
    `Compare against which environment's screenshots? (rendered by ${renderer})`,
    keys
      .filter(key => key !== ownKey)
      .map(key => ({
        label: `${pad(key, 12)} ${screenshotDirLabel(key, renderer)} (${countScreenshots(key, renderer)} screenshots)`,
        value: key,
      }))
  );

async function confirmAndRun(command, env) {
  const prefix = envPrefix(Object.entries(env).map(([key, value]) => `${key}=${value}`));
  console.log(`\n$ ${[prefix, ...command].filter(Boolean).join(' ')}\n`);

  const confirmation = await ask('Run it? [Y/n]: ');
  closePrompt();
  if (/^n/i.test(confirmation)) return;

  runToCompletion(command, { cwd: projectRoot, env });
}

async function main() {
  const { ENVIRONMENTS, ENVIRONMENT_KEYS } = loadEnvConfig();

  const environment = await askEnvironment(ENVIRONMENTS);
  const { runner, ui } = await askMode();

  // Asked after the mode, because a container needs the server bound beyond loopback and a local
  // run doesn't — the requirement differs, so the check has to know which one this is.
  if (isLoopback(environment.baseUrl) && !(await ensureServing(environment.baseUrl, runner.servesAppFromHost))) {
    closePrompt();
    return;
  }

  const intent = await askIntent(screenshotDirLabel(environment.key, runner.renderer));

  // Only a cross-check has a folder to choose. Plain compare uses this environment's own, and an
  // update writes it — offering another there would re-base it on foreign pixels.
  const snapshotEnv = intent === 'cross' ? await askSnapshotEnv(ENVIRONMENT_KEYS, environment.key, runner.renderer) : environment.key;

  warnings({ environments: ENVIRONMENTS, environment, snapshotEnv, renderer: runner.renderer, intent }).forEach(line => console.log(line));

  const { command, env } = runner.build({ environment, intent, snapshotEnv, ui });

  return confirmAndRun(command, env);
}

main();
