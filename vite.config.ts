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
      srcDir: "public",
      filename: "sw.js",
      includeAssets: ["fonts/*.ttf", "images/*.png"],
      manifest: {
        name: "Find My Anime",
        short_name: "Find My Anime",
        description: "Get anime recommendations based on your fave animes",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "screenshots/desktop.png",
            sizes: "1291x699",
            type: "image/png",
            form_factor: "wide",
            label: "Homescreen of Awesome App",
          },
          {
            src: "screenshots/mobile.png",
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
  publicDir: "public",
  assetsInclude: ["**/*.svg", "**/*.png", "**/*.ico"],
});
