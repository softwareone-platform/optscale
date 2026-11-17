#!/usr/bin/env node
// Picks the host implementation once, so nothing downstream has to branch on process.platform.
// Anything genuinely platform-specific belongs in windows.mjs or macos-linux.mjs, not here.
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import process from 'node:process';
import * as macosLinux from './macos-linux.mjs';
import * as windows from './windows.mjs';

export const onWindows = process.platform === 'win32';

const host = onWindows ? windows : macosLinux;

export const { DEV_SERVER_HINT, devServerNeedsShell, envPrefix, stopServerHint } = host;

// Node refuses to spawn a .cmd shim without a shell (CVE-2024-27980), and `npx` is exactly that on
// Windows. Running Playwright's own entry point with this node skips the shim on both platforms,
// and avoids handing arguments like -g 'side modal' to a shell to re-parse.
const withoutNpx = command => {
  if (command[0] !== 'npx' || command[1] !== 'playwright') return command;

  const cli = join(dirname(createRequire(import.meta.url).resolve('@playwright/test')), 'cli.js');
  return [process.execPath, cli, ...command.slice(2)];
};

/**
 * Runs a command to completion with its output attached, and exits this process with its status.
 * Reports a failure to launch as a message rather than a stack trace or a bare exit 1.
 */
export function runToCompletion(command, { cwd, env = {} }) {
  const runnable = host.asRunnable(withoutNpx(command));
  if (runnable.error) {
    console.error(`\n!  ${runnable.error}`);
    process.exit(1);
  }

  const result = spawnSync(runnable.command[0], runnable.command.slice(1), {
    cwd,
    stdio: 'inherit',
    env: { ...process.env, ...env },
  });

  if (result.error) {
    console.error(`\n!  Could not run it (${result.error.code}): ${result.error.message}`);
    process.exit(1);
  }

  process.exit(result.status ?? 1);
}
