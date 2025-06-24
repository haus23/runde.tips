import { index, prefix, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/foh/_index.tsx'),
  ...prefix('hinterhof', [index('routes/hinterhof/_index.tsx')]),
] satisfies RouteConfig;
