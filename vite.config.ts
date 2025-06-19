import { defineConfig } from "vite";

import devtoolsJson from "vite-plugin-devtools-json";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    devtoolsJson(),
    tsConfigPaths(),
    tanstackStart({
      target: "netlify",
      tsr: {
        generatedRouteTree: "generated/routeTree.gen.ts",
      },
    }),
  ],
});
