import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The reverse of `translationCoverage`. That gate asks whether every locale covers the
 * English keys, so a key deleted together with its translations keeps it green — which is
 * how `fileDownloadingError*` was lost during the theme extraction (a18450f1) and rendered
 * as a raw id in the download-error dialog until someone reported it. This gate asks the
 * other direction: does every message id the source renders still resolve in English?
 * Paths resolved from the package root (cwd).
 */
const SOURCE_ROOT = "src";
const BASE = "src/translations/en-US";
const THEME = "src/themes/finops/translations/en-US";

const ENGLISH_SOURCES = [
  `${BASE}/app.json`,
  `${BASE}/errors.json`,
  `${BASE}/success.json`,
  `${BASE}/finops.json`,
  `${BASE}/currencies.json`,
  `${THEME}/app-override.json`,
  `${THEME}/finops-override.json`
];

// Stories pass prose straight to messageId as sample text, so their "ids" are never keys.
const IGNORED_DIRECTORIES = new Set(["node_modules", "stories"]);

/**
 * Only ids written as literals can be checked. `messageId={expr}` call sites (~96 of them)
 * resolve at runtime and stay outside this gate.
 */
const MESSAGE_ID_PATTERNS = [
  /<FormattedMessage\s[^>]*?\bid="([^"]+)"/g,
  /\bformatMessage\(\s*\{\s*id:\s*"([^"]+)"/g,
  /\b[a-zA-Z]*[mM]essageId="([^"]+)"/g
];

const readKeys = (file: string): string[] => Object.keys(JSON.parse(fs.readFileSync(file, "utf8")));

const isScannableSource = (name: string) =>
  (name.endsWith(".ts") || name.endsWith(".tsx")) && !name.includes(".test.") && !name.includes(".spec.");

const collectSourceFiles = (directory: string): string[] =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return IGNORED_DIRECTORIES.has(entry.name) ? [] : collectSourceFiles(entryPath);
    }

    return isScannableSource(entry.name) ? [entryPath] : [];
  });

const collectRenderedMessageIds = (files: string[]): Map<string, Set<string>> => {
  const idToFiles = new Map<string, Set<string>>();

  files.forEach((file) => {
    const contents = fs.readFileSync(file, "utf8");

    MESSAGE_ID_PATTERNS.forEach((pattern) => {
      [...contents.matchAll(pattern)].forEach(([, id]) => {
        const renderedIn = idToFiles.get(id) ?? new Set<string>();

        idToFiles.set(id, renderedIn.add(file));
      });
    });
  });

  return idToFiles;
};

/**
 * Vitest's default diff reports the array as `[ Array(1) ]` and hides the contents behind a
 * click, so the ids go in the assertion message instead — that line is what every reporter
 * prints first.
 */
const describeUndefinedIds = (undefinedIds: [string, Set<string>][]) =>
  [
    `${undefinedIds.length} message id(s) rendered by the source but missing from the English translations:`,
    ...undefinedIds.map(([id, files]) => `  ${id}  →  ${[...files].sort().join(", ")}`),
    `Add each key to ${THEME}/app-override.json, or stop rendering it.`
  ].join("\n");

const englishKeys = new Set(ENGLISH_SOURCES.flatMap(readKeys));
const sourceFiles = collectSourceFiles(SOURCE_ROOT);
const renderedMessageIds = collectRenderedMessageIds(sourceFiles);

describe("Rendered message id coverage (English source)", () => {
  it("defines every message id the source renders", () => {
    const undefinedIds = [...renderedMessageIds].filter(([id]) => !englishKeys.has(id)).sort(([a], [b]) => a.localeCompare(b));

    expect(
      undefinedIds.map(([id]) => id),
      describeUndefinedIds(undefinedIds)
    ).toEqual([]);
  });

  // A broken walker returns nothing and makes the gate above pass vacuously.
  it("scans a plausible number of source files", () => {
    expect(sourceFiles.length).toBeGreaterThan(1000);
  });
});
