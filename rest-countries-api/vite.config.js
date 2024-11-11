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
  server: {},
  build: {
    outDir: "dist",
    sourcemap: true, // Enable source maps for easier debugging
    rollupOptions: {
      output: {
        // Specify custom output settings if needed
      },
    },
  },
});
