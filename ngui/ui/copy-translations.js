// copy-translations.js
const fs = require("fs");
const path = require("path");

// source and destination
const srcDir = path.resolve(__dirname, "../../ngui/ui/src/translations/en-US");
const destDir = path.resolve(__dirname, "src/translations/en-US");

// ensure destination directory exists
fs.mkdirSync(destDir, { recursive: true });

// copy only .json files
fs.readdirSync(srcDir).forEach((file) => {
    if (file.endsWith(".json")) {
        const srcFile = path.join(srcDir, file);
        const destFile = path.join(destDir, file);
        fs.copyFileSync(srcFile, destFile);
        console.log(`Copied: ${file}`);
    }
});

console.log("✅ Translation files copied successfully.");
