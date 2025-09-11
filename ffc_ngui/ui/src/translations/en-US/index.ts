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

import mainThemeTranslations from "../../../../../ngui/ui/src/translations/en-US";
import appOverride from "./app.json";
import currenciesOverride from "./currencies.json";
import errorOverride from "./errors.json";
import finOpsOverride from "./finops.json";
import successOverride from "./success.json";

export default {
  ...mainThemeTranslations,
  ...appOverride,
  ...currenciesOverride,
  ...errorOverride,
  ...finOpsOverride,
  ...successOverride
};
