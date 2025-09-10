/**
 * Importing translation JSON files for the application.
 *
 * The imports are divided into two categories:
 * 1. `Main` translations: These are the base translations located in a shared directory.
 * 2. Local translations: These are the translations specific to the current module.
 *
 * The `Main` translations are imported using relative paths that point to the shared directory.
 * The local translations are imported from the current directory.
 */

// Importing main translation files from the shared directory
import appMain from "../../../../../ngui/ui/src/translations/en-US/app.json";
import currenciesMain from "../../../../../ngui/ui/src/translations/en-US/currencies.json";
import errorMain from "../../../../../ngui/ui/src/translations/en-US/errors.json";
import finOpsMain from "../../../../../ngui/ui/src/translations/en-US/finops.json";
import successMain from "../../../../../ngui/ui/src/translations/en-US/success.json";
// Importing local translation files from the current directory
import app from "./app.json";
import currencies from "./currencies.json";
import error from "./errors.json";
import finOps from "./finops.json";
import success from "./success.json";

// Each pair of main and local translations is combined into a single object.
// This ensures that local translations override the main translations where keys overlap.

const appMerged = { ...appMain, ...app }; // Merges main and local app translations
const errorMerged = { ...errorMain, ...error }; // Merges main and local error translations
const successMerged = { ...successMain, ...success }; // Merges main and local success translations
const finOpsMerged = { ...finOpsMain, ...finOps }; // Merges main and local finOps translations
const currenciesMerged = { ...currenciesMain, ...currencies }; // Merges main and local currencies translations

const allTranslations = { ...appMerged, ...errorMerged, ...successMerged, ...finOpsMerged, ...currenciesMerged };

export default allTranslations;
