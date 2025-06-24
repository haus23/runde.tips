import type { RouteConfig } from '@react-router/dev/routes';
import { index, prefix, route } from '@react-router/dev/routes';

export default [
  index('routes/foh/_index.tsx'),
  route('/login', 'routes/(auth)/login.tsx'),
  ...prefix('hinterhof', [index('routes/hinterhof/_index.tsx')]),
] satisfies RouteConfig;
