import { defineConfig } from "vite";

import devtoolsJson from "vite-plugin-devtools-json";
import tailwindCSS from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    devtoolsJson(),
    tsConfigPaths(),
    tailwindCSS(),
    tanstackStart({
      target: "netlify",
      tsr: {
        generatedRouteTree: "generated/routeTree.gen.ts",
      },
    }),
  ],
});
