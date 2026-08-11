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

// All translated locales, and the subset that is held to the full-coverage hard gate.
// Experimental locales are work-in-progress and exempt from the *completeness* gate until
// they are promoted out of EXPERIMENTAL_LOCALES — but they are still checked for stray keys.
const allLocales = (Object.keys(SUPPORTED_LOCALES) as SupportedLocale[]).filter((locale) => locale !== DEFAULT_LOCALE);
const gatedLocales = allLocales.filter((locale) => !EXPERIMENTAL_LOCALES.has(locale));

describe("Theme translation coverage (app namespace)", () => {
  it.each(gatedLocales)("%s translates every English app key", (locale) => {
    const covered = coveredKeys(locale);
    const missing = [...referenceKeys].filter((key) => !covered.has(key)).sort();
    expect({ locale, missing }).toEqual({ locale, missing: [] });
  });

  // Stray keys (present in one locale but not in the English source, and therefore absent
  // from the other languages) are always a bug — a typo or a leftover from a removed/renamed
  // English key — since they would silently never render. Enforced for every locale,
  // including experimental ones.
  it.each(allLocales)("%s defines no keys that are missing from English / the other languages", (locale) => {
    const covered = coveredKeys(locale);
    const stale = [...covered].filter((key) => !referenceKeys.has(key)).sort();
    expect({ locale, stale }).toEqual({ locale, stale: [] });
  });
});
