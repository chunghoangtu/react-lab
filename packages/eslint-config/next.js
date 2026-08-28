import eslintPluginNext from "@next/eslint-plugin-next";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import baseConfig from "./base.js";
import { defineConfig, globalIgnores } from "eslint/config";

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export default defineConfig([
  ...baseConfig,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    extends: [eslintPluginReactHooks.configs.flat.recommended],
    plugins: {
      "@next/next": eslintPluginNext,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules,
    },
  },
]);
