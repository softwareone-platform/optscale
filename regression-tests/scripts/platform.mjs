#!/usr/bin/env node
// The one place that knows how macOS and Windows differ, so the picker and the npm scripts do not
// each grow their own guesses. On macOS everything here is a pass-through.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import process from 'node:process';

export const onWindows = process.platform === 'win32';

// Git Bash, never WSL's bash: run_pw.sh keys off $OSTYPE=msys to reach the app through
// host.docker.internal and to skip --network host, and inside WSL both of those decisions flip.
const gitBash = () =>
  [
    process.env.ProgramFiles && resolve(process.env.ProgramFiles, 'Git', 'bin', 'bash.exe'),
    process.env['ProgramFiles(x86)'] && resolve(process.env['ProgramFiles(x86)'], 'Git', 'bin', 'bash.exe'),
    process.env.LOCALAPPDATA && resolve(process.env.LOCALAPPDATA, 'Programs', 'Git', 'bin', 'bash.exe'),
  ].find(candidate => candidate && existsSync(candidate));

export const GIT_BASH_MISSING =
  'Running the container needs Git Bash on Windows. Install Git for Windows, or run ./run_pw.sh from a bash shell yourself.';

/**
 * Windows cannot execute a shebang, so a .sh has to be handed to bash explicitly. Returns the
 * command to spawn, or an error when this machine cannot run it at all.
 */
const shellOut = command => {
  if (!onWindows || !command[0].endsWith('.sh')) return { command };

  const bash = gitBash();
  return bash ? { command: [bash, ...command] } : { error: GIT_BASH_MISSING };
};

// Node refuses to spawn a .cmd shim without a shell (CVE-2024-27980), and `npx` is exactly that on
// Windows. Running Playwright's own entry point with this node skips the shim on both platforms,
// and avoids handing arguments like -g 'side modal' to cmd.exe to re-parse.
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
  const runnable = shellOut(withoutNpx(command));
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
