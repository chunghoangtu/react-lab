import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    ui: true,
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
