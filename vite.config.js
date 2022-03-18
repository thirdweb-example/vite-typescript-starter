import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const defaultConfig = {
  plugins: [react()],
};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === "serve") {
    //dev config
    return {
      ...defaultConfig,
      define: {
        global: "globalThis",
        process: {
          env: "development",
        },
      },
    };
  }

  //prod config
  return { ...defaultConfig, define: { global: "globalThis" } };
});
