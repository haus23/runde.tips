import type { ColorScheme } from './types';

export function getHints(request: Request): {
  colorScheme: ColorScheme | undefined;
} {
  const colorSchemeHeaderValue = request.headers.get(
    'Sec-CH-Prefers-Color-Scheme',
  );

  return {
    colorScheme:
      colorSchemeHeaderValue === 'dark' || colorSchemeHeaderValue === 'light'
        ? colorSchemeHeaderValue
        : undefined,
  };
}
