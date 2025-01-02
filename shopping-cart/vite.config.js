import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "__tests__/setup.js",
  },
  server: {},

  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {},
    },
  },
});
