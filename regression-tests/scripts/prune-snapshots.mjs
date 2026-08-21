#!/usr/bin/env node
// Screenshots a renderer holds that the committed set no longer names — what a rename or a deleted
// spec leaves behind. Reports by default; deletes only when asked.
import { existsSync, rmSync } from 'node:fs';
import { relative } from 'node:path';
import process from 'node:process';
import { loadEnvConfig } from './env-config.mjs';
import { COMMITTED_RENDERER, diffAgainstCommitted, screenshotDir } from './snapshots.mjs';

const USAGE = `Usage: node scripts/prune-snapshots.mjs [options]

  --env KEY        Only this environment's screenshots (default: every one that has a folder)
  --renderer NAME  Renderer to prune (default: ${process.platform})
  --delete         Actually remove the files
  -h, --help       Show this message

The committed ${COMMITTED_RENDERER} sets are reviewed in git, so they are never pruned here.`;

function parseArgs(argv) {
  const options = { renderer: process.platform, deleting: false };

  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index];
    if (argument === '--delete') options.deleting = true;
    else if (argument === '-h' || argument === '--help') options.help = true;
    else if (argument === '--env' || argument === '--renderer') {
      const value = argv[++index];
      if (!value) fail(`${argument} needs a value.`);
      options[argument === '--env' ? 'key' : 'renderer'] = value;
    } else fail(`Unknown option: ${argument}`);
  }

  return options;
}

function fail(message) {
  console.error(`${message}\n\n${USAGE}`);
  process.exit(1);
}

const { ENVIRONMENT_KEYS } = loadEnvConfig();
const options = parseArgs(process.argv.slice(2));

if (options.help) {
  console.log(USAGE);
  process.exit(0);
}

if (options.renderer === COMMITTED_RENDERER) {
  fail(`snapshots/*/${COMMITTED_RENDERER}/ is the committed set. Remove one of those with \`git rm\` so the deletion is reviewed.`);
}

if (options.key && !ENVIRONMENT_KEYS.includes(options.key)) {
  fail(`Unknown environment "${options.key}". Choose one of: ${ENVIRONMENT_KEYS.join(' | ')}`);
}

const keys = (options.key ? [options.key] : ENVIRONMENT_KEYS).filter(key => existsSync(screenshotDir(key, options.renderer)));

if (keys.length === 0) {
  console.log(`No snapshots/*/${options.renderer}/ folder to prune${options.key ? ` for "${options.key}"` : ''}.`);
  process.exit(0);
}

let pruned = 0;

for (const key of keys) {
  const dir = screenshotDir(key, options.renderer);
  const { presentCount, expectedCount, unused } = diffAgainstCommitted({ targetKey: key, renderer: options.renderer });
  const shortDir = relative(process.cwd(), dir);

  console.log(`\n${shortDir}  ${presentCount} file(s), against ${expectedCount} committed`);

  if (expectedCount === 0) {
    console.log(`  Nothing committed for "${key}", so every file here would look unused. Skipped.`);
    continue;
  }

  if (unused.length === 0) {
    console.log('  Nothing unused.');
    continue;
  }

  for (const name of unused) {
    console.log(`  ${options.deleting ? 'deleted' : 'unused '} ${name}`);
    if (options.deleting) rmSync(`${dir}/${name}`);
  }
  pruned += unused.length;
}

if (pruned > 0 && !options.deleting) {
  console.log(`\n${pruned} file(s) would be removed. Re-run with --delete to remove them.`);
}
