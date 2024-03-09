import { vitePlugin as remix } from '@remix-run/dev';
import tailwindcss from '@tailwindcss/vite';
import { flatRoutes } from 'remix-flat-routes';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    remix({
      ignoredRouteFiles: ['**/*'],
      routes: async (defineRoutes) =>
        flatRoutes('routes', defineRoutes, { ignoredRouteFiles: ['**/*.md'] }),
    }),
  ],
});
