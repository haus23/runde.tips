import { flatRoutes } from 'remix-flat-routes';

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  serverBuildPath: 'build/server/index.js',
  assetsBuildDirectory: 'build/client',
  ignoredRouteFiles: ['**/*'],
  routes: async (defineRoutes) =>
    flatRoutes('routes', defineRoutes, { ignoredRouteFiles: ['**/*.md'] }),
};
