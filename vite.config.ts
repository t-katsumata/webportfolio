import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import webfontDownload from "vite-plugin-webfont-dl";

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    tailwindcss(),
    webfontDownload([
      "https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap",
      "https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,900&display=swap",
      "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap"
    ])
  ],
});
