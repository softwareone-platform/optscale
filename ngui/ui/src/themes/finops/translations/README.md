# Theme translations (FinOps)

This is the FinOps theme's translation layer. `localeManager.ts` here is a **drop-in
replacement** for `@main/translations/localeManager` — the theme resolver redirects base
imports of `translations/localeManager` to this module, so it must expose the same public
API. On top of the base POC (see `src/translations/README.md`) it adds:

- Extra locales (`fr-FR`, `de-DE`, `pl-PL`) on top of the base `en-US` / `es-ES`.
- Persistence of the selected locale in `localStorage` (base POC resets on refresh).
- Browser-language detection with fallback to English.
- **Draft (hidden) locales** gated behind a browser flag — see below.
- A translation-coverage hard gate (`translationCoverage.test.ts`).

## Layout

```
themes/finops/translations/
├── en-US/                       # Theme overrides for the English source (app-override.json)
├── es-ES/  fr-FR/  de-DE/       # Draft locales (hidden by default, exempt from the gate)
├── pl-PL/                       # Draft locale (partial)
├── .missing/                    # Generated: untranslated keys per locale (translator handoff)
├── locales.ts                   # Registry: locale definitions, labels, draft flags
├── localeManager.ts             # Visibility gating, persistence, browser detection, formats
├── translationCoverage.test.ts  # Hard gate: every English app key must be translated
└── reportMissingTranslations.mjs
```

Each locale folder mirrors the same JSON split (`app.json`, `errors.json`, `success.json`,
`finops.json`, `currencies.json`) plus an `index.ts` that merges them. Untranslated keys
fall back to English via the merge in `getConfigForLocale`.

## Draft (hidden) languages

Work-in-progress translations can be shipped without exposing them to regular users. A
locale marked `draft: true` in `locales.ts` (collected into `DRAFT_LOCALES`) is:

- **excluded** from the `LanguageSwitcher` and from initial-locale resolution by default,
- **revealed** only when the current browser opts in via a `localStorage` flag,
- **exempt** from the translation-coverage hard gate until it is promoted.

This lets you test a language in your own browser while it stays invisible to everyone else.

### Enabling a preview

In the running app, open DevTools → **Console**, run this and reload the page:

```js
localStorage.setItem("draftLanguages", "true");
```

The draft language (e.g. **Polski**) now appears in the header language switcher.

### Disabling again

```js
localStorage.removeItem("draftLanguages");
```

Reload. The language disappears from the switcher, and if it was selected the app falls
back to the browser default / English (a persisted hidden locale is ignored by
`getStoredLocale` once it is no longer visible, so you can't get stuck on it).

The flag is per-browser and per-origin — only the browser where you ran the command sees
the language.

## Adding a draft locale

1. Create `themes/finops/translations/<locale>/` with the same JSON files and an
   `index.ts` (copy from an existing locale). Only translate what you need; the rest falls
   back to English.
2. In `locales.ts`, import the bundle and add one entry to `LOCALES`:

   ```ts
   "it-IT": { label: "Italiano", messages: messagesItIT, draft: true }
   ```

`SupportedLocale`, `SUPPORTED_LOCALES` and `DRAFT_LOCALES` are all derived from that
object — no other edits and no type changes needed. A locale added without a flag file
fails `type:check`, since `LOCALE_FLAGS` is a total record.

## Promoting a draft locale to public

1. Remove `draft: true` from the locale's entry in `locales.ts` (the hard gate then
   enforces full coverage for this locale).
2. Fill in the remaining translations and verify everything passes:

   ```bash
   pnpm translate:validate
   ```

   This runs all translation checks together:
   - **ICU validation** — every message compiles as valid ICU MessageFormat.
   - **Coverage** — every non-draft locale translates every English key, and no
     locale defines stray keys.
   - **Missing report** — writes any untranslated keys to `.missing/<locale>.json` as a
     translator handoff.

The language is now visible to all users without any browser flag.
