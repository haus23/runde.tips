import { colorSchemeSchema } from '#types';

export function getHints(request: Request) {
  const colorSchemeHeaderValue = request.headers.get(
    'Sec-CH-Prefers-Color-Scheme',
  );

  const colorSchemeResult = colorSchemeSchema.safeParse(colorSchemeHeaderValue);

  return {
    colorScheme: colorSchemeResult.success ? colorSchemeResult.data : null,
  };
}
