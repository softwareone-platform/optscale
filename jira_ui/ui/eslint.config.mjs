import babelParser from "@babel/eslint-parser";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPrettier from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import globals from "globals";

const extensions = ["js", "jsx"];

export default [
  {
    files: [`src/**/*.{${extensions.join(",")}}`],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      import: eslintPluginImport,
      "unused-imports": unusedImportsPlugin,
      prettier: eslintPluginPrettier
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ["@babel/preset-react"]
        }
      },
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.builtin
      }
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: extensions.map((extension) => `.${extension}`),
          moduleDirectory: ["node_modules", "src/"]
        }
      },
      react: {
        version: "detect"
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
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
