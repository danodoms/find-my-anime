import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Find My Anime",
        short_name: "Find My Anime",
        description: "Get anime recommendations based on your fave animes",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/src/public/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  base: "",
});
