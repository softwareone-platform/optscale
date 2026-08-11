/**
 * Locale manager for the FinOps theme — a drop-in replacement for
 * `@main/translations/localeManager` (the theme resolver swaps it in). Exposes the same API
 * plus extra locales, localStorage persistence, and experimental-language gating.
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

// Experimental locales are hidden from users (and exempt from the completeness gate) until
// signed off — shown only when the browser opts in via
// localStorage.setItem("experimentalLanguages", "true"). Currently, every language but English.
export const EXPERIMENTAL_LOCALES = new Set<SupportedLocale>(
  (Object.keys(SUPPORTED_LOCALES) as SupportedLocale[]).filter((locale) => locale !== DEFAULT_LOCALE)
);

// English is the guaranteed fallback and must always be visible.
if (EXPERIMENTAL_LOCALES.has(DEFAULT_LOCALE)) {
  throw new Error(`DEFAULT_LOCALE "${DEFAULT_LOCALE}" must never be marked experimental.`);
}

export const EXPERIMENTAL_LOCALES_STORAGE_KEY = "experimentalLanguages";

export const areExperimentalLocalesEnabled = (): boolean => localStorage.getItem(EXPERIMENTAL_LOCALES_STORAGE_KEY) === "true";

const isSupportedLocale = (value: string | null | undefined): value is SupportedLocale =>
  value != null && value in SUPPORTED_LOCALES;

export const isLocaleVisible = (locale: SupportedLocale): boolean =>
  !EXPERIMENTAL_LOCALES.has(locale) || areExperimentalLocalesEnabled();

export const getVisibleLocales = (): SupportedLocale[] =>
  (Object.keys(SUPPORTED_LOCALES) as SupportedLocale[]).filter(isLocaleVisible);

const detectBrowserLocale = (): SupportedLocale => {
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];

  // Skip hidden locales so a non-English browser stays on English until sign-off.
  for (const candidate of candidates) {
    if (isSupportedLocale(candidate) && isLocaleVisible(candidate)) {
      return candidate;
    }

    // Match by language subtag only, e.g. browser "fr", "fr-CA" -> "fr-FR"
    const language = candidate.split("-")[0].toLowerCase();
    const match = (Object.keys(SUPPORTED_LOCALES) as SupportedLocale[]).find(
      (locale) => locale.split("-")[0].toLowerCase() === language && isLocaleVisible(locale)
    );
    if (match) {
      return match;
    }
  }

  return DEFAULT_LOCALE;
};

export const getStoredLocale = (): SupportedLocale | null => {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  // Drop a persisted locale that's no longer visible so users can't get stuck on it.
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
