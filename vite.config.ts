import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ToDo-App/",
  plugins: [eslintPlugin(), vue()],
});
