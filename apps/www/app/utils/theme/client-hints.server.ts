import { safeParse } from 'valibot';
import { colorSchemeSchema } from './types';

export function getHints(request: Request) {
  const colorSchemeHeaderValue = request.headers.get(
    'Sec-CH-Prefers-Color-Scheme',
  );
  const colorSchemeHeader = safeParse(
    colorSchemeSchema,
    colorSchemeHeaderValue,
  );

  return {
    colorScheme: colorSchemeHeader.success ? colorSchemeHeader.output : null,
    fallback: !colorSchemeHeader.success,
  };
}
