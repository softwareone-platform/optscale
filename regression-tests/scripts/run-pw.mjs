#!/usr/bin/env node
// `./run_pw.sh` from an npm script runs under cmd.exe on Windows, which cannot execute it. This
// forwards to the same script through whichever bash the platform has.
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { runToCompletion } from './platform/index.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

runToCompletion(['./run_pw.sh', ...process.argv.slice(2)], { cwd: projectRoot });
