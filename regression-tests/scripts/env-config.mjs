#!/usr/bin/env node
// Single reader for env.config.ts, so the picker and the shell scripts resolve environments from
// the same table rather than repeating URLs. Transpiled in memory because the config is TypeScript
// and validates itself at import time.
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export function loadEnvConfig() {
  const source = readFileSync(resolve(projectRoot, 'env.config.ts'), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const module = { exports: {} };
  new Function('module', 'exports', outputText)(module, module.exports);
  return module.exports;
}

// CLI form, for shell callers: `node scripts/env-config.mjs dev apiBaseUrl`
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [name, field = 'apiBaseUrl'] = process.argv.slice(2);
  const { ENVIRONMENTS } = loadEnvConfig();
  const definition = ENVIRONMENTS[name];

  if (!definition) {
    console.error(`Unknown environment "${name ?? ''}". Choose one of: ${Object.keys(ENVIRONMENTS).join(' | ')}`);
    process.exit(1);
  }
  if (!(field in definition)) {
    console.error(`Unknown field "${field}". Available: ${Object.keys(definition).join(' | ')}`);
    process.exit(1);
  }

  process.stdout.write(String(definition[field]));
}
