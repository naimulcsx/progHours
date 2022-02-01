import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
const path = require("path")

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 80
  },
  plugins: [react()],
})
