import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";

import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({

  plugins: [

    react(),

    tailwindcss(),

    VitePWA({

      registerType: "autoUpdate",

      includeAssets: [
        "favicon.svg",
      ],

      manifest: {

        name: "SwasthyaSaathi",

        short_name: "SwasthyaSaathi",

        description:
          "Offline-first healthcare assistant for ASHA workers",

        theme_color: "#1D4ED8",

        background_color: "#F3F4F6",

        display: "standalone",

        scope: "/",

        start_url: "/",

        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      workbox: {

        globPatterns: [
          "**/*.{js,css,html,png,svg,ico}",
        ],

      },

    }),

  ],

});