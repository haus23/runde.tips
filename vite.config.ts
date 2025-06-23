import { defineConfig } from "vite";

import { reactRouter } from "@react-router/dev/vite";
import netlifyPlugin from "@netlify/vite-plugin-react-router";
import tailwindCss from "@tailwindcss/vite";
import devtoolsJson from "vite-plugin-devtools-json";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    devtoolsJson(),
    tsconfigPaths(),
    tailwindCss(),
    reactRouter(),
    netlifyPlugin(),
  ],
});
