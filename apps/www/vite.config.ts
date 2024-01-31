import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
  },
  server: {
    port: 5001,
  },
  plugins: [remix()],
});
