import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        // target: 'https://kdt-react-2-team02.elicecoding.com',
      },
    },
  },
  resolve: {
    alias: {
      "@consts": path.resolve(__dirname, "./src/consts"),
    },
  },
});
