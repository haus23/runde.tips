import { vitePlugin as remix } from '@remix-run/dev';
import { flatRoutes } from 'remix-flat-routes';
import { defineConfig } from 'vite';
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    iconsSpritesheet({
      inputDir: 'resources/icons',
      outputDir: 'app/components/ui/icon/icons',
      fileName: 'sprite.svg',
      withTypes: true,
      typesOutputFile: 'app/components/ui/icon/icons/name.d.ts',
      iconNameTransformer: (name) => name[0]?.toLowerCase() + name.slice(1),
    }),
    remix({
      ignoredRouteFiles: ['**/*'],
      routes: async (defineRoutes) =>
        flatRoutes('routes', defineRoutes, { ignoredRouteFiles: ['**/*.md'] }),
    }),
  ],
});
