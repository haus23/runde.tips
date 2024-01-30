import { type Options, defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
  format: 'esm',
  dts: true,
  external: ['react'],
  treeshake: true,
  minify: true,
  clean: true,
  ...options,
}));
