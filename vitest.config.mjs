import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve("./src")
    }
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"]
  }
});
