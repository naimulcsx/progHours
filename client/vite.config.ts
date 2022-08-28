import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 80,
  },
  plugins: [tsconfigPaths(), react()],
  build: {
    rollupOptions: {
      input: {
        // the default entry point
        app: "./index.html",
        "service-worker": "./service-worker.js",
      },
      output: {
        entryFileNames: (assetInfo) => {
          return assetInfo.name === "service-worker"
            ? "[name].js" // put service worker in root
            : "assets/js/[name]-[hash].js" // others in `assets/js/`
        },
      },
    },
  },
})
