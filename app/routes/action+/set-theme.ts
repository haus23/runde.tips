import { createThemeAction } from '#utils/theme/theme.server';

export async function loader() {
  throw new Response('Not found', { status: 404 });
}

export const action = createThemeAction();
