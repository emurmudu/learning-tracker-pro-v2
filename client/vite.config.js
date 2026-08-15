import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Learning Tracker Pro",
        short_name: "Learning Tracker",
        description:
          "A smart learning tracker for managing learning goals, plans, and progress.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",

        icons: [
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/dashboard-wide.png",
            sizes: "1280x682",
            type: "image/png",
            form_factor: "wide",
            label: "Learning Tracker Pro dashboard",
          },
          {
            src: "/screenshots/dashboard-mobile.png",
            sizes: "478x673",
            type: "image/png",
            form_factor: "narrow",
            label: "Learning Tracker Pro mobile dashboard",
          },
        ],
      },
    }),
  ],
});