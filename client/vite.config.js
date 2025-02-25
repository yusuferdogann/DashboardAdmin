import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["react-country-state-dropdown"],
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["html2canvas"],
    },
  },
});
