import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 80,
  },
  plugins: [
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      manifest: {
        id: "0.2.3",
        theme_color: "#171923",
        background_color: "#171923",
        display: "standalone",
        scope: "/",
        start_url: "/",
        short_name: "progHours",
        name: "progHours",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    tsconfigPaths(),
    react(),
  ],
})
