import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      src: "src/",
    },
  },
  build: {
    outDir: "build",
  },
  publicDir: "public",
});
