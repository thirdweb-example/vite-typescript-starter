import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const defaultConfig = {
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
        process: {},
      },
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === "serve") {
    //dev config
    return {
      ...defaultConfig,
      define: {
        process: {
          env: "development",
        },
      },
    };
  }

  //prod config
  return defaultConfig;
});
