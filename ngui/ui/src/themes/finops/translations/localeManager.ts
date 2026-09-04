import { currencyCodes } from "utils/currency";
import {
  DEFAULT_LOCALE,
  EXPERIMENTAL_LOCALES,
  SUPPORTED_LOCALES,
  getDefaultMessages,
  getMessagesForLocale,
  type SupportedLocale
} from "./locales";

export * from "./locales";
export const LOCALE_STORAGE_KEY = "locale";
export const EXPERIMENTAL_LOCALES_STORAGE_KEY = "experimentalLanguages";

export const areExperimentalLocalesEnabled = (): boolean => localStorage.getItem(EXPERIMENTAL_LOCALES_STORAGE_KEY) === "true";

export const isLocaleVisible = (locale: SupportedLocale): boolean =>
  !EXPERIMENTAL_LOCALES.has(locale) || areExperimentalLocalesEnabled();

export const getVisibleLocales = (): SupportedLocale[] =>
  (Object.keys(SUPPORTED_LOCALES) as SupportedLocale[]).filter(isLocaleVisible);

const isSupportedLocale = (value: string | null | undefined): value is SupportedLocale =>
  value != null && value in SUPPORTED_LOCALES;

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
  return isSupportedLocale(stored) && isLocaleVisible(stored) ? stored : null;
};

export const storeLocale = (locale: SupportedLocale): void => {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
};

export const resolveInitialLocale = (): SupportedLocale => getStoredLocale() ?? detectBrowserLocale();

const getCurrencySymbol = (currency: string, locale: string) =>
  new Intl.NumberFormat(locale, { style: "currency", currency, currencyDisplay: "narrowSymbol" })
    .formatToParts(1)
    .find((x) => x.type === "currency")?.value;

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

export const getConfigForLocale = (locale: SupportedLocale) => ({
  locale,
  formats,
  messages: {
    ...getDefaultMessages(),
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
