import type { ColorScheme } from './types';

export function getHints(
  request: Request,
  fallback: { colorScheme: ColorScheme } = { colorScheme: 'dark' },
) {
  const colorScheme = request.headers.get('Sec-CH-Prefers-Color-Scheme');

  return { colorScheme: (colorScheme as ColorScheme) ?? fallback.colorScheme };
}
