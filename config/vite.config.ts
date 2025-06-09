import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/ZENTHRAFINAL/",  // FONTOS: repo neved, GitHub Pages path
  plugins: [react()],
});
