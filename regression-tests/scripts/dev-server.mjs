// The UI served from this machine: whether a run needs one, whether it is reachable, and starting
// one when it is not.
import { spawn } from 'node:child_process';
import { networkInterfaces } from 'node:os';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { DEV_SERVER_HINT, devServerNeedsShell, stopServerHint } from './platform/index.mjs';
import { ask } from './prompt.mjs';

const LOOPBACK = /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/;

export const isLoopback = baseUrl => LOOPBACK.test(baseUrl);

export const localPort = baseUrl => new URL(baseUrl).port || '3000';

const DEV_SERVER_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'ngui', 'ui');
const DEV_SERVER_TIMEOUT_S = 40;

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

// `--host` is not optional for a container run: vite binds localhost only by default.
const start = () => {
  // shell:true because npm is a .cmd shim on Windows that spawn will not run otherwise; safe here
  // only because every argument is a literal.
  const server = spawn('npm', ['start', '--', '--host'], {
    cwd: DEV_SERVER_DIR,
    detached: true,
    stdio: 'ignore',
    shell: devServerNeedsShell,
  });
  // An unhandled 'error' event would kill the picker with a raw stack trace.
  server.on('error', error => console.log(`\n!  Could not start it (${error.code}). Start it by hand:  ${DEV_SERVER_HINT}`));
  server.unref();
};

/**
 * A loopback environment needs something serving the UI, and for a container run it must be bound to
 * more than loopback. Offers to start one, detached — a dev server shouldn't die with the test run.
 */
export async function ensureServing(baseUrl, fromContainer) {
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

  start();

  process.stdout.write('   Waiting for it');
  for (let second = 0; second < DEV_SERVER_TIMEOUT_S; second++) {
    await new Promise(wait => setTimeout(wait, 1000));
    if (await reachable()) {
      console.log(`\n   Up. It keeps running after this — ${stopServerHint(localPort(baseUrl))}`);
      return true;
    }
    process.stdout.write('.');
  }

  console.log(`\n!  Still nothing after ${DEV_SERVER_TIMEOUT_S}s. Start it by hand to see why:  ${DEV_SERVER_HINT}`);
  return false;
}
