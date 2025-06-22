import { defineConfig } from "vite";

import { reactRouter } from "@react-router/dev/vite";
import netlifyPlugin from "@netlify/vite-plugin-react-router";
import tailwindCss from "@tailwindcss/vite";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  plugins: [devtoolsJson(), tailwindCss(), reactRouter(), netlifyPlugin()],
});
