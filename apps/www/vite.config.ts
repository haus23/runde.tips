import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5001,
  },
  plugins: [remix()],
});
