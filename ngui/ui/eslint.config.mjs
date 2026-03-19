import hystaxConfig from "@hystax/eslint-config-ui";
import reactPlugin from "eslint-plugin-react";

export default [
  hystaxConfig,
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
    plugins: { react: reactPlugin }
  } // custom rules can be added here
];