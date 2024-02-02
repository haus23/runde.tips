import * as v from 'valibot';
import { ColorSchemeSchema } from './types';

export function getHints(request: Request) {
  const colorSchemeHeaderValue = request.headers.get(
    'Sec-CH-Prefers-Color-Scheme',
  );

  const colorSchemeResult = v.safeParse(
    ColorSchemeSchema,
    colorSchemeHeaderValue,
  );

  return {
    colorScheme: colorSchemeResult.success ? colorSchemeResult.output : null,
  };
}
