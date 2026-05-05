import hystaxConfig from "@hystax/eslint-config-ui";
import reactPlugin from "eslint-plugin-react";

export default [
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
  {
    rules: { "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }] },
    ignores: [],
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          moduleDirectory: ["node_modules", "src/"]
        },
        typescript: {
          project: "./tsconfig.json"
        }
      },
      "import/ignore": ["node_modules"]
    },
    languageOptions: {},
    plugins: { react: reactPlugin },
  }
];
