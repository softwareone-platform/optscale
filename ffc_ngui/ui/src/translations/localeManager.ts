import { currencyCodes } from "utils/currency";
import messagesEnUS from "./en-US/index";

const getCurrencySymbol = (currency, locale) =>
  new Intl.NumberFormat(locale, { style: "currency", currency, currencyDisplay: "narrowSymbol" })
    .formatToParts(1)
    .find((x) => x.type === "currency").value;

const DEFAULT_LOCALE = "en-US";

export default (() => {
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

  const localeConfigMap = {
    [DEFAULT_LOCALE]: {
      formats: {
        number: {
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
        }
      }
    }
  };

  // Check translations for forbidden strings
  const checkForbiddenStrings = (obj: Record<string, unknown>, forbidden = ["OptScale", "optScale"], path = ""): string[] => {
    const issues: string[] = [];

    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;

      if (typeof value === "string") {
        forbidden.forEach((term) => {
          if (value.includes(term)) {
            issues.push(`Found forbidden term "${term}" in translation at path: ${currentPath}`);
          }
        });
      } else if (value && typeof value === "object" && !Array.isArray(value)) {
        issues.push(...checkForbiddenStrings(value as Record<string, unknown>, forbidden, currentPath));
      }
    });
    return issues;
  };

  const forbiddenIssues = checkForbiddenStrings(messagesEnUS);
  if (forbiddenIssues.length > 0) {
    throw new Error(`Translation validation failed:\n${forbiddenIssues.join("\n")}`);
  }

  const messagesMap = {
    [DEFAULT_LOCALE]: messagesEnUS
  };

  const locale = messagesMap[navigator.language] ? navigator.language : DEFAULT_LOCALE;

  const getConfig = () => ({ ...localeConfigMap[locale], locale, messages: messagesMap[locale] });

  return {
    getConfig,
    getCurrencySymbol: (currencyCode) => getCurrencySymbol(currencyCode, locale)
  };
})();
