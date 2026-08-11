// Writes untranslated English strings per locale to <theme>/.missing/<locale>.json as a
// translator handoff. Run via `pnpm translate:validate` from the package root.
import fs from "node:fs";

const THEME = "src/themes/finops/translations";
const BASE = "src/translations";

const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const readIfExists = (p) => (fs.existsSync(p) ? read(p) : {});

const reference = {
  ...read(`${BASE}/en-US/app.json`),
  ...readIfExists(`${THEME}/en-US/app-override.json`)
};
const referenceKeys = Object.keys(reference);

const locales = fs
  .readdirSync(THEME, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== "en-US" && !entry.name.startsWith("."))
  .map((entry) => entry.name);

const outDir = `${THEME}/.missing`;
let totalMissing = 0;

for (const locale of locales) {
  const covered = new Set([
    ...Object.keys(readIfExists(`${THEME}/${locale}/app.json`)),
    ...Object.keys(readIfExists(`${THEME}/${locale}/app-override.json`))
  ]);
  const missing = referenceKeys.filter((key) => !covered.has(key));
  const stale = [...covered].filter((key) => !(key in reference));

  console.log(`${locale}: ${missing.length} missing, ${stale.length} stale (of ${referenceKeys.length} English app keys)`);
  if (stale.length) {
    console.log(`  stale: ${stale.slice(0, 20).join(", ")}${stale.length > 20 ? " …" : ""}`);
  }

  totalMissing += missing.length;
  if (missing.length) {
    fs.mkdirSync(outDir, { recursive: true });
    const payload = Object.fromEntries(missing.map((key) => [key, reference[key]]));
    fs.writeFileSync(`${outDir}/${locale}.json`, `${JSON.stringify(payload, null, 2)}\n`);
    console.log(`  → wrote ${missing.length} English strings to ${outDir}/${locale}.json`);
  }
}

console.log(
  totalMissing
    ? `\n${totalMissing} untranslated key(s) total. Translate the files in ${outDir}/ and merge them into the locale app-override.json.`
    : "\nAll locales fully cover the English app keys."
);
