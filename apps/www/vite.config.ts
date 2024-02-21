import { vitePlugin as remix } from '@remix-run/dev';
import { flatRoutes } from 'remix-flat-routes';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
  },
  server: {
    port: 5001,
  },
  plugins: [
    remix({
      ignoredRouteFiles: ['**/*'],
      routes: async (defineRoutes) =>
        flatRoutes('routes', defineRoutes, { ignoredRouteFiles: ['**/*.md'] }),
    }),
  ],
});
