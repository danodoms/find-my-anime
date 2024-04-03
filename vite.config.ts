import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: { enabled: true },
      registerType: "autoUpdate",
      strategies: "injectManifest",
      srcDir: "/src/public",
      filename: "sw.js",
      manifest: {
        name: "Find My Anime",
        short_name: "Find My Anime",
        description: "Get anime recommendations based on your fave animes",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/src/public/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/src/public/screenshots/desktop.png",
            sizes: "1291x699",
            type: "image/png",
            form_factor: "wide",
            label: "Homescreen of Awesome App",
          },
          {
            src: "/src/public/screenshots/mobile.png",
            sizes: "1082x2402",
            type: "image/png",
            form_factor: "narrow",
            label: "Homescreen of Awesome App",
          },
        ],
      },
    }),
  ],
  base: "",
});
