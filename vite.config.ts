import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    minify: false,
    target: "esnext",
    sourcemap: true,
  },
  optimizeDeps: {
    include: ["@mediapipe/tasks-vision"],
    esbuildOptions: {
      target: "esnext", // Ensures proper WASM support
    },
  },
  server: {
    fs: {
      strict: false, // Allows loading external files like WASM
    },
  },
});
