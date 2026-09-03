// English messages for the FinOps theme: base @main translations plus theme overrides
// (overrides win).
import app from "@main/translations/en-US/app.json";
import currencies from "@main/translations/en-US/currencies.json";
import error from "@main/translations/en-US/errors.json";
import finOps from "@main/translations/en-US/finops.json";
import success from "@main/translations/en-US/success.json";
import appOverride from "./app-override.json";
import finOpsOverride from "./finops-override.json";

const mainTranslations = { ...app, ...finOps, ...currencies, ...error, ...success };
const themeTranslations = { ...finOpsOverride, ...appOverride };

export default {
  ...mainTranslations,
  ...themeTranslations
};
