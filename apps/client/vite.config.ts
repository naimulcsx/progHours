/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  cacheDir: "../../node_modules/.vite/client",

  server: {
    port: 4400,
    host: "localhost"
  },

  preview: {
    port: 4300,
    host: "localhost"
  },

  plugins: [react(), viteTsConfigPaths()]

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },
  // define: {
  //   "import.meta.vitest": undefined
  // },
  // test: {
  //   globals: true,
  //   cache: {
  //     dir: "../../node_modules/.vitest"
  //   },
  //   environment: "jsdom",
  //   include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  //   includeSource: ["src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"]
  // }
});
