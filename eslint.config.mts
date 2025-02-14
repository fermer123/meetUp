import globals from 'globals';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';

import depSort from 'eslint-plugin-sort-react-dependency-arrays';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import unusedImports from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';
import eslintReact from 'eslint-plugin-react';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config({
  ...js.configs.recommended,
  plugins: {
    'sort-react-dependency-arrays': depSort,
    'react-hooks': reactHooks,
    react: eslintReact,
    'simple-import-sort': simpleImportSort,
    'unused-imports': unusedImports,
    'jsx-a11y': jsxA11y,
    import: importPlugin,
    prettier: prettierPlugin,
    'typescript-eslint': tseslint.plugin,
    '@typescript-eslint': tsPlugin,
    'react-refresh': reactRefresh,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  languageOptions: {
    parser: typescriptParser,
    globals: {
      ...globals.node,
      ...globals.browser,
      ...globals.es2021,
    },
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  files: ['**/*.{js,ts,jsx,tsx}'],
  rules: {
    ...prettierConfig.rules,
    'import/no-cycle': 'off',
    'no-debugger': 'warn',
    'prefer-const': 'warn',
    '@typescript-eslint/no-floating-promises': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 'off',
    'no-empty-pattern': 'warn',
    'object-shorthand': 'warn',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    'no-extra-boolean-cast': 'warn',
    'no-empty': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-anonymous-default-export': [
      'error',
      {
        allowAnonymousFunction: true,
        allowArrowFunction: true,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: true,
      },
    ],
    'react/jsx-filename-extension': [1, {extensions: ['.tsx', '.ts']}],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // `react` first, `next` second, then packages starting with a character
          ['^react$', '^next', '^[a-z]'],
          // Packages starting with `@`
          ['^@'],
          // Packages starting with `~`
          ['^~'],
          // Imports starting with `../`
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Imports starting with `./`
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports
          ['^.+\\.s?css$'],
          // Side effect imports
          ['^\\u0000'],
        ],
      },
    ],
  },
});
