import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // During dev, forward /api calls to the Express backend
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
