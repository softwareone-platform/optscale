/**
 * Importing translation JSON files for the application.
 *
 * The imports are divided into two categories:
 * 1. `mainThemeTranslations` translations: These are the base translations located in a shared directory.
 * 2. Local translations: These are the translations specific to the current module.
 *
 * The `Main` translations are imported using relative paths that point to the shared directory.
 * The local translations are imported from the current directory and override mainThemeTranslations properties.
 */
// Main theme translations
import app from "./app.json";
import appOverride from "./appOverride.json";
import currencies from "./currencies.json";
import error from "./errors.json";
import finOps from "./finops.json";
import finOpsOverride from "./finopsOverride.json";
import success from "./success.json";

const mainThemeTranslations = {
  ...app,
  ...finOps,
  ...currencies,
  ...error,
  ...success
};

const localTranslations = { ...finOpsOverride, ...appOverride };

export default {
  ...mainThemeTranslations,
  ...localTranslations
};
