import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  tsr: {
    appDirectory: "src",
  },
  server: {
    preset: "netlify",
  },
  vite: {
    optimizeDeps: {
      esbuildOptions: {
        target: "esnext",
        supported: {
          "top-level-await": true,
        },
      },
    },
    build: {
      target: "esnext",
    },
    esbuild: {
      supported: {
        "top-level-await": true,
      },
    },
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
