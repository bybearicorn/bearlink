import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/dockerbuild/**",
      "**/jest.config.ts",
      ".eslintrc.js",
      "**/eslint.config.mjs",
      "*/scripts/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  comments.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      // plugins: {
      //  jest, // if using jest and relevant plugin (import jest from 'eslint-plugin-jest';)
      // }
    },
    rules: {
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-restricted-exports": ["error", { restrictDefaultExports: { direct: true } }],
      "no-restricted-imports": ["error", { patterns: ["../../*"] }],
      "no-restricted-syntax": [
        "error",
        {
          selector: ":matches(PropertyDefinition, MethodDefinition) > PrivateIdentifier.key",
          message: "Use `private` instead of '#'",
        },
      ],
      "prefer-const": ["error", { destructuring: "all" }],
      "@eslint-community/eslint-comments/require-description": ["error", { ignore: ["eslint-enable"] }],
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": "allow-with-description",
          "ts-check": false,
          "ts-nocheck": false,
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-floating-promises": ["error"],
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": ["error", { args: "none", ignoreRestSiblings: true }],
      "@typescript-eslint/return-await": ["error", "in-try-catch"],
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  // Prettier compatibility configuration (MUST BE LAST)
  // This disables ESLint rules that would conflict with Prettier formatting and adds prettier rules
  eslintPluginPrettierRecommended,
]);
