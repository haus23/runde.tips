import netlifyPlugin from '@netlify/vite-plugin-react-router';
import { reactRouter } from '@react-router/dev/vite';
import tailwindCss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    devtoolsJson(),
    tsconfigPaths(),
    tailwindCss(),
    reactRouter(),
    netlifyPlugin(),
  ],
});
