import { getHints } from './client-hints.server';

export async function getTheme(request: Request) {
  return {
    hints: getHints(request),
  };
}
