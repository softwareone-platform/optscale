import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { DEFAULT_LOCALE, EXPERIMENTAL_LOCALES, SUPPORTED_LOCALES, type SupportedLocale } from "./localeManager";

/**
 * Hard gate: every English app key must be translated in every theme locale.
 *
 * Because the base (English) source lives in `@main` and is merged in from an upstream
 * integration branch we do not control, new keys can appear in the English `app.json`
 * (or theme `app-override.json`) without us noticing. This test fails on such drift,
 * listing the untranslated keys so they can be filled (see `pnpm translate:missing`).
 *
 * Scope: the `app` namespace (base `app.json` + theme `app-override.json`) — the strings
 * we actively maintain translations for. Paths are resolved from the package root (cwd).
 */
const THEME = "src/themes/finops/translations";
const BASE = "src/translations";

const read = (p: string): Record<string, string> => JSON.parse(fs.readFileSync(p, "utf8"));
const readIfExists = (p: string): Record<string, string> => (fs.existsSync(p) ? read(p) : {});

// English app surface the theme exposes: base @main app keys + theme app overrides (incl. theme-only keys).
const referenceKeys = new Set<string>([
  ...Object.keys(read(`${BASE}/en-US/app.json`)),
  ...Object.keys(readIfExists(`${THEME}/en-US/app-override.json`))
]);

const coveredKeys = (locale: string): Set<string> =>
  new Set<string>([
    ...Object.keys(readIfExists(`${THEME}/${locale}/app.json`)),
    ...Object.keys(readIfExists(`${THEME}/${locale}/app-override.json`))
  ]);

// Experimental locales are work-in-progress and intentionally exempt from the hard gate
// until they are complete and promoted out of EXPERIMENTAL_LOCALES.
const locales = (Object.keys(SUPPORTED_LOCALES) as SupportedLocale[]).filter(
  (locale) => locale !== DEFAULT_LOCALE && !EXPERIMENTAL_LOCALES.has(locale)
);

describe("Theme translation coverage (app namespace)", () => {
  it.each(locales)("%s translates every English app key", (locale) => {
    const covered = coveredKeys(locale);
    const missing = [...referenceKeys].filter((key) => !covered.has(key)).sort();
    expect({ locale, missing }).toEqual({ locale, missing: [] });
  });

  it.each(locales)("%s has no stale keys that were removed from English", (locale) => {
    const covered = coveredKeys(locale);
    const stale = [...covered].filter((key) => !referenceKeys.has(key)).sort();
    expect({ locale, stale }).toEqual({ locale, stale: [] });
  });
});
