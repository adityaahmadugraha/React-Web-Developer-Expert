import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

export default [
  { ignores: ['dist', 'node_modules', 'playwright-report', 'test-results'] },
  ...compat.extends('airbnb', 'airbnb/hooks'),
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      'react-refresh': reactRefresh,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx'] }],
      'react-refresh/only-export-components': 'off',
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'off',
      'no-param-reassign': [
        'error',
        { props: true, ignorePropertyModificationsFor: ['state'] },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react/jsx-props-no-spreading': 'off',
    },
  },
  {
    files: ['**/*.test.js', '**/*.test.jsx', 'src/test/**', 'e2e/**'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
  {
    files: ['eslint.config.js', 'vite.config.js', 'playwright.config.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',
    },
  },
];
