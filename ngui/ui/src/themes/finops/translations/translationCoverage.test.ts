import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { DEFAULT_LOCALE, DRAFT_LOCALES, SUPPORTED_LOCALES, type SupportedLocale } from "./localeManager";

/**
 * Coverage gate for the `app` namespace: every public locale must translate every English
 * key, and no locale may define stray keys. Catches drift when the upstream `@main` English
 * source changes. Paths resolved from the package root (cwd).
 */
const THEME = "src/themes/finops/translations";
const BASE = "src/translations";

const read = (p: string): Record<string, string> => JSON.parse(fs.readFileSync(p, "utf8"));
const readIfExists = (p: string): Record<string, string> => (fs.existsSync(p) ? read(p) : {});

const referenceKeys = new Set<string>([
  ...Object.keys(read(`${BASE}/en-US/app.json`)),
  ...Object.keys(readIfExists(`${THEME}/en-US/app-override.json`))
]);

const coveredKeys = (locale: string): Set<string> =>
  new Set<string>([
    ...Object.keys(readIfExists(`${THEME}/${locale}/app.json`)),
    ...Object.keys(readIfExists(`${THEME}/${locale}/app-override.json`))
  ]);

// Draft locales are exempt from the completeness gate (WIP) but still stray-checked.
const allLocales = (Object.keys(SUPPORTED_LOCALES) as SupportedLocale[]).filter((locale) => locale !== DEFAULT_LOCALE);
const gatedLocales = allLocales.filter((locale) => !DRAFT_LOCALES.has(locale));

describe("Theme translation coverage (app namespace)", () => {
  it.each(gatedLocales)("%s translates every English app key", (locale) => {
    const covered = coveredKeys(locale);
    const missing = [...referenceKeys].filter((key) => !covered.has(key)).sort();
    expect({ locale, missing }).toEqual({ locale, missing: [] });
  });

  it.each(allLocales)("%s defines no keys that are missing from English / the other languages", (locale) => {
    const covered = coveredKeys(locale);
    const stale = [...covered].filter((key) => !referenceKeys.has(key)).sort();
    expect({ locale, stale }).toEqual({ locale, stale: [] });
  });

  it("never marks the default (English) locale as draft", () => {
    expect(DRAFT_LOCALES.has(DEFAULT_LOCALE)).toBe(false);
  });
});
