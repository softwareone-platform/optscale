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

const getCurrencySymbol = (currency, locale) =>
  new Intl.NumberFormat(locale, { style: "currency", currency, currencyDisplay: "narrowSymbol" })
    .formatToParts(1)
    .find((x) => x.type === "currency").value;

export const DEFAULT_LOCALE = "en-US";

export const SUPPORTED_LOCALES = {
  "en-US": "English",
  "es-ES": "Español",
  "fr-FR": "Français",
  "de-DE": "Deutsch"
} as const;

export type SupportedLocale = keyof typeof SUPPORTED_LOCALES;

export const LOCALE_STORAGE_KEY = "locale";

const isSupportedLocale = (value: string | null | undefined): value is SupportedLocale =>
  value != null && value in SUPPORTED_LOCALES;

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
  return isSupportedLocale(stored) ? stored : null;
};

export const storeLocale = (locale: SupportedLocale): void => {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
};

// Resolves the locale to use on load: persisted choice -> browser language -> English.
export const resolveInitialLocale = (): SupportedLocale => getStoredLocale() ?? detectBrowserLocale();

const getCurrencyConfiguration = (currency, rest = {}) => ({
  style: "currency",
  currency,
  minimumFractionDigits: 0,
  ...rest
});

const getCompactCurrencyConfiguration = (currency, rest = {}) => ({
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
  "de-DE": messagesDeDE
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
    getCurrencySymbol: (currencyCode) => getCurrencySymbol(currencyCode, locale)
  };
})();
