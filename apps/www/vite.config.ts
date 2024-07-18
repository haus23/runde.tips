import { vitePlugin as remix } from '@remix-run/dev';
import { flatRoutes } from 'remix-flat-routes';
import { defineConfig } from 'vite';
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    iconsSpritesheet({
      inputDir: 'resources/icons',
      outputDir: 'app/components/icon/icons',
      fileName: 'sprite.svg',
      withTypes: true,
      typesOutputFile: 'app/components/icon/icons/names.d.ts',
      iconNameTransformer: (name) => name[0]?.toLowerCase() + name.slice(1),
    }),
    remix({
      ignoredRouteFiles: ['**/*'],
      routes: async (defineRoutes) => flatRoutes('routes', defineRoutes),
    }),
    tsconfigPaths(),
  ],
});
