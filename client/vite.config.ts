import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") }
  },
  server: {
    host: true,         // écoute sur 0.0.0.0 dans le conteneur
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true, // <— force le watcher à sonder le FS
      interval: 300
    },
    hmr: {
      host: "localhost", // <— le navigateur se connecte à l’hôte
      port: 5173         //     (le port mappé)
      // clientPort: 5173 // alternative
    }
  },
  preview: { port: 5173, strictPort: true },
  envPrefix: "VITE_",
  optimizeDeps: { include: ["styled-components"] }
});
