import type { RouteConfig } from '@react-router/dev/routes';
import { index, prefix, route } from '@react-router/dev/routes';

export default [
  index('routes/foh/_index.tsx'),
  route('/spieler', 'routes/foh/players.tsx'),
  route('/login', 'routes/(auth)/login.tsx'),
  route('/logout', 'routes/(auth)/logout.ts'),
  route('/verify', 'routes/(auth)/verify.tsx'),
  ...prefix('hinterhof', [index('routes/hinterhof/_index.tsx')]),
] satisfies RouteConfig;
