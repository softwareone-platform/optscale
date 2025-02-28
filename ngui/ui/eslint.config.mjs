import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPrettier from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import globals from "globals";

export default [
  {
    files: [`src/**/*.{ts,tsx}`],
    ignores: ["src/stories/**"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": typescriptPlugin,
      import: eslintPluginImport,
      "unused-imports": unusedImportsPlugin,
      prettier: eslintPluginPrettier
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.builtin,
        // TODO: Split test and ui configs
        ...globals.jest,
        vi: true
      }
    },
    settings: {
      "import/resolver": {
        node: {
          // if unset, default is just '.js', but it must be re-added explicitly if set
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          moduleDirectory: ["node_modules", "src/"]
        }
      },
      react: {
        version: "detect"
      },
      "import/ignore": ["node_modules"]
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...eslintPluginImport.flatConfigs.recommended.rules,
      "class-methods-use-this": "error",
      "no-param-reassign": [
        "error",
        {
          props: true,
          ignorePropertyModificationsFor: [
            "acc", // for reduce accumulators
            "accumulator", // for reduce accumulators
            "ctx" // for canvas context
          ]
        }
      ],
      "no-underscore-dangle": [
        "error",
        {
          allowAfterThis: true,
          allowAfterThisConstructor: true
        }
      ],
      "jsx-quotes": "warn",
      "no-multi-spaces": "warn",
      "no-const-assign": "warn",
      "constructor-super": "warn",
      "valid-typeof": "warn",
      "no-extra-semi": "warn",
      "comma-dangle": [
        "warn",
        {
          arrays: "never",
          objects: "never"
        }
      ],
      "max-params": ["warn", 3],
      "no-this-before-super": "warn",
      "no-undef": "warn",
      "no-unreachable": "warn",
      "no-bitwise": "off",
      "no-console": "off",
      "default-param-last": "off",
      "arrow-body-style": ["warn", "as-needed"],

      "unused-imports/no-unused-imports": "warn",

      "react/jsx-uses-vars": "error",
      "react/no-typos": "warn",
      "react/jsx-tag-spacing": "warn",
      "react/jsx-boolean-value": "warn",
      "react/no-array-index-key": "warn",
      "react/jsx-wrap-multilines": "warn",
      "react/self-closing-comp": "warn",
      "react/jsx-closing-bracket-location": "warn",
      "react/require-render-return": "warn",
      "react/prefer-es6-class": "warn",
      "react/prefer-stateless-function": "warn",
      "react/jsx-uses-react": "warn",
      "react/no-multi-comp": "off",
      "react/display-name": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-function": "off",
      // https://typescript-eslint.io/rules/no-unused-vars/#how-to-use
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true
        }
      ],

      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],

          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before"
            }
          ],

          pathGroupsExcludedImportTypes: ["react"],

          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ],
      "import/no-extraneous-dependencies": "off",
      "import/prefer-default-export": "off",

      "prettier/prettier": "error",
      ...eslintConfigPrettier.rules
    }
  }
];
