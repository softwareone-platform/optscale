#!/usr/bin/env node
// Interactive launcher. Prints the equivalent command before running it, so the flags stay learnable.
import { spawn } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { networkInterfaces } from 'node:os';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { loadEnvConfig } from './env-config.mjs';
import { binary, onWindows, runToCompletion } from './platform.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const countScreenshots = (key, renderer) => {
  const dir = resolve(projectRoot, 'snapshots', key, renderer);
  return existsSync(dir) ? readdirSync(dir).filter(file => file.endsWith('.png')).length : 0;
};

// A pipe delivers every line at once and readline drops the ones no question() awaits, so
// scripted input is drained up front. That also makes the picker usable non-interactively.
const interactive = process.stdin.isTTY;
const rl = interactive ? createInterface({ input: process.stdin, output: process.stdout }) : null;

const scripted = interactive
  ? []
  : (
      await new Promise(resolveInput => {
        let buffer = '';
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', chunk => (buffer += chunk));
        process.stdin.on('end', () => resolveInput(buffer));
      })
    )
      .split('\n')
      .map(line => line.trim());

const ask = async question => {
  if (!interactive) {
    const answer = scripted.shift() ?? '';
    console.log(`${question}${answer}`);
    return answer;
  }
  return new Promise(resolvePrompt => rl.question(question, answer => resolvePrompt(answer.trim())));
};

async function choose(title, options) {
  console.log(`\n${title}`);
  options.forEach((option, index) => console.log(`  ${index + 1}) ${option.label}`));

  const answer = await ask(`Select [1-${options.length}] (default 1): `);
  const index = answer === '' ? 0 : Number(answer) - 1;
  if (!Number.isInteger(index) || index < 0 || index >= options.length) {
    console.error(`\nNot a valid choice: "${answer}"`);
    process.exit(1);
  }
  return options[index].value;
}

const pad = (text, width) => text.padEnd(width);

const LOOPBACK = /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/;

const localPort = baseUrl => new URL(baseUrl).port || '3000';

const DEV_SERVER_DIR = resolve(projectRoot, '..', 'ngui', 'ui');
// `--host` is not optional: vite binds localhost only by default, which a container cannot reach.
const DEV_SERVER_HINT = onWindows ? 'cd ngui\\ui; npm start -- --host' : 'cd ngui/ui && npm start -- --host';
const DEV_SERVER_TIMEOUT_S = 40;

const stopHint = baseUrl =>
  onWindows
    ? `stop it with: Get-Process -Id (Get-NetTCPConnection -LocalPort ${localPort(baseUrl)} -State Listen).OwningProcess | Stop-Process`
    : `stop it with: kill $(lsof -ti:${localPort(baseUrl)})`;

const isServing = async url => {
  try {
    return (await fetch(url, { signal: AbortSignal.timeout(2000) })).ok;
  } catch {
    return false;
  }
};

// A container reaches the host over one of these, never over loopback, so serving on one of them is
// the honest test of "the test container will see this". 169.254.* is skipped because Windows keeps
// an APIPA address on every idle adapter and macOS self-assigns the same range — neither routes.
const externalAddresses = () =>
  Object.values(networkInterfaces())
    .flat()
    .filter(candidate => candidate?.family === 'IPv4' && !candidate.internal && !candidate.address.startsWith('169.254.'))
    .map(candidate => candidate.address);

const onHost = (url, hostname) => {
  const rewritten = new URL(url);
  rewritten.hostname = hostname;
  return rewritten.toString();
};

/**
 * A loopback environment needs something serving the UI, and for a container run it must be bound to
 * more than loopback. Offers to start one, detached — a dev server shouldn't die with the test run.
 */
async function ensureServing(baseUrl, fromContainer) {
  // Any one of them answering proves the bind is not loopback-only; a VPN or virtual adapter among
  // them would make "the first one" the wrong thing to judge by.
  const external = externalAddresses();
  const reachable = async () =>
    fromContainer && external.length
      ? (await Promise.all(external.map(address => isServing(onHost(baseUrl, address))))).some(Boolean)
      : isServing(baseUrl);

  if (await reachable()) return true;

  // Serving, but only on loopback: the localhost probe passes while the container gets refused.
  if (fromContainer && (await isServing(baseUrl))) {
    console.log(
      `\n!  ${baseUrl} answers here, but not on ${external.join(' or ')} — so it is bound to loopback` +
        `\n   only and the test container will get ECONNREFUSED. Vite needs --host to listen on every` +
        `\n   interface. Restart it with:  ${DEV_SERVER_HINT}`
    );
    return false;
  }

  console.log(`\n!  Nothing is serving ${baseUrl}, so every test would shoot a blank page.`);
  if (!/^y/i.test(await ask(`Start it now (${DEV_SERVER_HINT})? [y/N]: `))) {
    console.log(`\n   Start it yourself, then run this again:  ${DEV_SERVER_HINT}`);
    return false;
  }

  const server = spawn(binary('npm'), ['start', '--', '--host'], { cwd: DEV_SERVER_DIR, detached: true, stdio: 'ignore' });
  // An unhandled 'error' event would kill the picker with a raw stack trace.
  server.on('error', error => console.log(`\n!  Could not start it (${error.code}). Start it by hand:  ${DEV_SERVER_HINT}`));
  server.unref();

  process.stdout.write('   Waiting for it');
  for (let second = 0; second < DEV_SERVER_TIMEOUT_S; second++) {
    await new Promise(wait => setTimeout(wait, 1000));
    if (await reachable()) {
      console.log(`\n   Up. It keeps running after this — ${stopHint(baseUrl)}`);
      return true;
    }
    process.stdout.write('.');
  }

  console.log(`\n!  Still nothing after ${DEV_SERVER_TIMEOUT_S}s. Start it by hand to see why:  ${DEV_SERVER_HINT}`);
  return false;
}

const askIntent = () =>
  choose('What should this run do?', [
    { label: "compare      against this environment's own screenshots", value: 'compare' },
    { label: "cross-check  against another environment's screenshots", value: 'cross' },
    { label: "update       overwrite this environment's screenshots", value: 'update' },
  ]);

async function confirmAndRun(command, env = {}) {
  const prefix = Object.entries(env)
    .map(([key, value]) => `${key}=${value}`)
    .join(' ');
  console.log(`\n$ ${[prefix, ...command].filter(Boolean).join(' ')}\n`);

  const confirmation = await ask('Run it? [Y/n]: ');
  rl?.close();
  if (/^n/i.test(confirmation)) return;

  runToCompletion(command, { cwd: projectRoot, env });
}

async function main() {
  const { ENVIRONMENTS, ENVIRONMENT_KEYS } = loadEnvConfig();

  const environment = await choose(
    'Where should the browser point?',
    Object.entries(ENVIRONMENTS).map(([name, definition]) => ({
      label: `${pad(name, 12)} ${definition.baseUrl}`,
      value: { name, ...definition },
    }))
  );

  const mode = await choose('How should it run?', [
    { label: 'docker       container — compares against the committed screenshots', value: 'docker' },
    { label: 'headless     locally, no window', value: 'headless' },
    { label: 'ui           Playwright UI mode — for stepping through a run', value: 'ui' },
  ]);

  // Asked after the mode, because a container needs the server bound beyond loopback and a local
  // run doesn't — the requirement differs, so the check has to know which one this is.
  if (LOOPBACK.test(environment.baseUrl) && !(await ensureServing(environment.baseUrl, mode === 'docker'))) {
    rl?.close();
    return;
  }

  // Screenshots are per renderer, so only the choice of which environment's pixels is open.
  const renderer = mode === 'docker' ? 'docker' : process.platform;

  const intent = await askIntent();

  // Only a cross-check has a folder to choose. Plain compare uses this environment's own, and an
  // update writes it — offering another there would re-base it on foreign pixels.
  let snapshotEnv = environment.key;
  if (intent === 'cross') {
    snapshotEnv = await choose(
      `Compare against which environment's screenshots? (rendered by ${renderer})`,
      ENVIRONMENT_KEYS.filter(key => key !== environment.key).map(key => ({
        label: `${pad(key, 12)} snapshots/${key}/${renderer}/ (${countScreenshots(key, renderer)} screenshots)`,
        value: key,
      }))
    );
  }

  // Comparing against screenshots from another cluster is legitimate but easy to do by accident.
  const snapshotTwin = Object.values(ENVIRONMENTS).find(definition => definition.key === snapshotEnv);
  if (snapshotTwin && snapshotTwin.apiBaseUrl !== environment.apiBaseUrl) {
    console.log(
      `\n!  ${environment.name} calls ${environment.apiBaseUrl}, but the "${snapshotEnv}" screenshots` +
        `\n   were captured against ${snapshotTwin.apiBaseUrl}. Differences may reflect the` +
        `\n   deployments rather than your code.`
    );
  }
  if (countScreenshots(snapshotEnv, renderer) === 0 && intent !== 'update') {
    console.log(
      `\n!  snapshots/${snapshotEnv}/${renderer}/ is empty. A local run writes the missing images` +
        `\n   and continues; a container run fails, since those are the committed ones.`
    );
  }

  if (intent === 'update') {
    console.log(`\n   Updating snapshots/${snapshotEnv}/${renderer}/`);
    if (renderer === 'docker') {
      console.log(`\n!  That is the committed, reviewed set. An update never fails, so diff the PNGs before` + `\n   committing them.`);
    }
  }

  const env = { TEST_ENV: environment.name };
  if (snapshotEnv !== environment.key) env.SNAPSHOT_ENV = snapshotEnv;

  let command;
  if (mode === 'docker') {
    command = ['./run_pw.sh', '-E', environment.name];
    if (intent === 'update') command.push('-u');
    if (snapshotEnv !== environment.key) command.push('-S', snapshotEnv);

    // A loopback environment is served from the host, which run_pw.sh reaches via -H.
    if (LOOPBACK.test(environment.baseUrl)) {
      command.push('-H');
      if (localPort(environment.baseUrl) !== '3000') command.push('-p', localPort(environment.baseUrl));
    }
    delete env.SNAPSHOT_ENV;
    delete env.TEST_ENV;
  } else {
    command = ['npx', 'playwright', 'test', ...(mode === 'ui' ? ['--ui'] : []), ...(intent === 'update' ? ['--update-snapshots'] : [])];
  }

  return confirmAndRun(command, env);
}

main();
