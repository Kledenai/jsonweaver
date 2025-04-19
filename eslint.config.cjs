// eslint.config.cjs
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const parser = require("@typescript-eslint/parser");

/** @type {import('eslint-define-config').FlatESLintConfigItem[]} */
const config = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

module.exports = config;
