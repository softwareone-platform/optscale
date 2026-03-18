/**
 * Application translations for the FinOps theme (en-US locale).
 *
 * This module combines:
 * 1. Base translations from the main theme (`@main/translations`)
 * 2. Theme-specific overrides that customize or extend the base translations
 *
 * The final export merges both sources, with local overrides taking precedence
 * over the main theme translations.
 */

// Base translations from the main theme
import app from "@main/translations/en-US/app.json";
import currencies from "@main/translations/en-US/currencies.json";
import error from "@main/translations/en-US/errors.json";
import finOps from "@main/translations/en-US/finops.json";
import success from "@main/translations/en-US/success.json";
// FinOps theme-specific translation overrides
import appOverride from "./app-override.json";
import finOpsOverride from "./finops-override.json";

// Merge base translations
const mainTranslations = {
  ...app,
  ...finOps,
  ...currencies,
  ...error,
  ...success
};

// Merge theme-specific overrides
const themeTranslations = { ...finOpsOverride, ...appOverride };

// Export final translations with local overrides taking precedence
export default {
  ...mainTranslations,
  ...themeTranslations
};
