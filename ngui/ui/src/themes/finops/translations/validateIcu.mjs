// Checks every translation string parses as valid ICU MessageFormat (same parser react-intl
// uses at runtime), so a malformed plural/brace/tag fails here instead of crashing a screen.
// Exits non-zero on failure. Run via `pnpm translate:validate` from the package root.
import fs from "node:fs";
import { createRequire } from "node:module";

const req = createRequire(import.meta.url);
const reqIntl = createRequire(req.resolve("react-intl"));
const reqParser = createRequire(reqIntl.resolve("intl-messageformat"));
const { parse } = reqParser("@formatjs/icu-messageformat-parser");

const THEME = "src/themes/finops/translations";
const BASE = "src/translations";

const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const readIfExists = (p) => (fs.existsSync(p) ? read(p) : {});

const locales = fs
  .readdirSync(THEME, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
  .map((entry) => entry.name);

const messagesForLocale = (locale) =>
  locale === "en-US"
    ? { ...read(`${BASE}/en-US/app.json`), ...readIfExists(`${THEME}/en-US/app-override.json`) }
    : { ...readIfExists(`${THEME}/${locale}/app.json`), ...readIfExists(`${THEME}/${locale}/app-override.json`) };

let totalBroken = 0;

for (const locale of locales) {
  const messages = messagesForLocale(locale);
  const keys = Object.keys(messages);
  let broken = 0;
  for (const key of keys) {
    try {
      parse(messages[key]);
    } catch (e) {
      broken++;
      totalBroken++;
      console.error(`  BROKEN ${locale} ${key} — ${e.message}`);
    }
  }
  console.log(`${locale}: ${keys.length} messages — ${broken ? `${broken} BROKEN` : "all valid ICU"}`);
}

if (totalBroken) {
  console.error(`\n${totalBroken} message(s) are not valid ICU MessageFormat.`);
  process.exit(1);
}
console.log("\nAll messages compile as valid ICU MessageFormat.");
