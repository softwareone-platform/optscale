import hystaxConfig from "@hystax/eslint-config-ui";
import reactPlugin from "eslint-plugin-react";

export default [
  {
    // Third-party code copied verbatim; see src/vendor/qrcode-generator/README.md.
    ignores: ["src/vendor/**"]
  },
  ...hystaxConfig,
  {
    files: ["**/graphql/__generated__/**"],
    rules: {
      "no-redeclare": "off",
    },
  },
  // Temporary rule to avoid warnings during checks with eslint-config-ui@2.1.0
  {
    files: ["**/BookingsCalendar.tsx", "**/datetime.ts"],
    rules: { "import/no-duplicates": "off" },
  },
  // custom rules can be added here
];
