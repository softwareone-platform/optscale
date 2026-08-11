/**
 * Locale manager for the FinOps theme.
 *
 * Drop-in replacement for `@main/translations/localeManager`. The theme resolver
 * redirects base imports of `translations/localeManager` to this module, so it must
 * expose the same public API. It adds:
 *   - Two extra locales (fr-FR, de-DE) on top of the base en-US / es-ES.
 *   - Persistence of the selected locale in localStorage.
 *   - Browser-language detection with fallback to English.
 */
import { currencyCodes } from "utils/currency";
import messagesDeDE from "./de-DE/index";
import messagesEnUS from "./en-US/index";
import messagesEsES from "./es-ES/index";
import messagesFrFR from "./fr-FR/index";
import messagesPlPL from "./pl-PL/index";

const getCurrencySymbol = (currency: string, locale: string) =>
  new Intl.NumberFormat(locale, { style: "currency", currency, currencyDisplay: "narrowSymbol" })
    .formatToParts(1)
    .find((x) => x.type === "currency")?.value;

export const DEFAULT_LOCALE = "en-US";

export const SUPPORTED_LOCALES = {
  "en-US": "English",
  "es-ES": "Español",
  "fr-FR": "Français",
  "de-DE": "Deutsch",
  "pl-PL": "Polski"
} as const;

export type SupportedLocale = keyof typeof SUPPORTED_LOCALES;

export const LOCALE_STORAGE_KEY = "locale";

/**
 * Experimental locales are work-in-progress translations that must stay hidden from
 * regular users until they are complete. They are:
 *   - excluded from the language switcher and initial-locale resolution by default,
 *   - revealed only when the browser opts in via localStorage (see below),
 *   - exempt from the translation-coverage hard gate (translationCoverage.test.ts).
 *
 * To preview an experimental language, run this in the browser devtools console and
 * reload:  localStorage.setItem("experimentalLanguages", "true")
 * To hide them again:  localStorage.removeItem("experimentalLanguages")
 */
// Every language except the default (English) is currently experimental/hidden — only
// English is shown until the others are signed off and removed from this set.
export const EXPERIMENTAL_LOCALES = new Set<SupportedLocale>(
  (Object.keys(SUPPORTED_LOCALES) as SupportedLocale[]).filter((locale) => locale !== DEFAULT_LOCALE)
);

// Invariant: the default (English) locale is the guaranteed fallback and must always be
// visible, so it can never be gated behind the experimental flag.
if (EXPERIMENTAL_LOCALES.has(DEFAULT_LOCALE)) {
  throw new Error(`DEFAULT_LOCALE "${DEFAULT_LOCALE}" must never be marked experimental.`);
}

export const EXPERIMENTAL_LOCALES_STORAGE_KEY = "experimentalLanguages";

export const areExperimentalLocalesEnabled = (): boolean => localStorage.getItem(EXPERIMENTAL_LOCALES_STORAGE_KEY) === "true";

const isSupportedLocale = (value: string | null | undefined): value is SupportedLocale =>
  value != null && value in SUPPORTED_LOCALES;

export const isLocaleVisible = (locale: SupportedLocale): boolean =>
  !EXPERIMENTAL_LOCALES.has(locale) || areExperimentalLocalesEnabled();

// Locales that should appear in the language switcher for the current browser.
export const getVisibleLocales = (): SupportedLocale[] =>
  (Object.keys(SUPPORTED_LOCALES) as SupportedLocale[]).filter(isLocaleVisible);

const detectBrowserLocale = (): SupportedLocale => {
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];

  for (const candidate of candidates) {
    if (isSupportedLocale(candidate)) {
      return candidate;
    }

    // Match by language subtag only, e.g. browser "fr", "fr-CA" -> "fr-FR"
    const language = candidate.split("-")[0].toLowerCase();
    const match = (Object.keys(SUPPORTED_LOCALES) as SupportedLocale[]).find(
      (locale) => locale.split("-")[0].toLowerCase() === language
    );
    if (match) {
      return match;
    }
  }

  return DEFAULT_LOCALE;
};

export const getStoredLocale = (): SupportedLocale | null => {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  // Ignore a persisted experimental locale once it is no longer visible, so users can't
  // get stuck on a hidden language after the preview flag is turned off.
  return isSupportedLocale(stored) && isLocaleVisible(stored) ? stored : null;
};

export const storeLocale = (locale: SupportedLocale): void => {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
};

// Resolves the locale to use on load: persisted choice -> browser language -> English.
export const resolveInitialLocale = (): SupportedLocale => getStoredLocale() ?? detectBrowserLocale();

const getCurrencyConfiguration = (currency: string, rest = {}) => ({
  style: "currency",
  currency,
  minimumFractionDigits: 0,
  ...rest
});

const getCompactCurrencyConfiguration = (currency: string, rest = {}) => ({
  style: "currency",
  currency,
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
  ...rest
});

const numberFormats = {
  ...Object.fromEntries(
    currencyCodes
      .map((code) => [
        [code, getCurrencyConfiguration(code, { currencyDisplay: "narrowSymbol" })],
        [`${code}Compact`, getCompactCurrencyConfiguration(code, { currencyDisplay: "narrowSymbol" })]
      ])
      .flat()
  ),
  percentage: {
    style: "percent"
  },
  percentage2: {
    style: "percent",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  }
};

const formats = { number: numberFormats };

const messagesMap: Record<SupportedLocale, Record<string, string>> = {
  "en-US": messagesEnUS,
  "es-ES": messagesEsES,
  "fr-FR": messagesFrFR,
  "de-DE": messagesDeDE,
  "pl-PL": messagesPlPL
};

export const getMessagesForLocale = (locale: SupportedLocale): Record<string, string> => messagesMap[locale] ?? messagesEnUS;

export const getDefaultMessages = (): Record<string, string> => messagesEnUS;

export const getConfigForLocale = (locale: SupportedLocale) => ({
  locale,
  formats,
  messages: {
    ...messagesEnUS,
    ...getMessagesForLocale(locale)
  },
  defaultLocale: DEFAULT_LOCALE
});

export default (() => {
  const locale = resolveInitialLocale();

  const getConfig = () => getConfigForLocale(locale);

  return {
    getConfig,
    getCurrencySymbol: (currencyCode: string) => getCurrencySymbol(currencyCode, locale)
  };
})();
