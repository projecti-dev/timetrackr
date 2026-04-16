import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@models": path.resolve(__dirname, "src/models"),
      "@store": path.resolve(__dirname, "src/store"),
      "@reducers": path.resolve(__dirname, "src/store/reducers"),
      "@selectors": path.resolve(__dirname, "src/store/selectors"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
