import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**', 'playwright-report/**', 'test-results/**', '**/localforage.min.js'],
  },
  eslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...(Array.isArray(tseslint.configs.recommendedTypeChecked)
      ? tseslint.configs.recommendedTypeChecked[0]
      : tseslint.configs.recommendedTypeChecked),
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    ...eslint.configs.recommended,
  },
  ...(Array.isArray(playwright.configs['flat/recommended'])
    ? playwright.configs['flat/recommended']
    : [playwright.configs['flat/recommended']]),
  {
    files: ['tests/**/*.ts'],
    rules: {
      // `captureScreenshot` wraps an `expect(...).toHaveScreenshot(...)` call —
      // treat it as an assertion so tests using only the helper aren't flagged.
      'playwright/expect-expect': ['warn', {
        assertFunctionNames: ['captureScreenshot'],
      }],
      'playwright/no-conditional-in-test': 'off',
    },
  },
  ...(Array.isArray(prettier) ? prettier : [prettier]),
];
