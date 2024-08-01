import * as v from 'valibot';
import { colorSchemeSchema, cookieName } from './types';

export function getHints(request: Request) {
  const colorSchemeHeaderValue = request.headers.get(
    'Sec-CH-Prefers-Color-Scheme',
  );
  const colorSchemeHeader = v.safeParse(
    colorSchemeSchema,
    colorSchemeHeaderValue,
  );
  let colorScheme = colorSchemeHeader.success ? colorSchemeHeader.output : null;

  // Cookie Fallback
  if (!colorScheme) {
    const colorSchemeCookieValue = getCookieValue(request);
    const colorSchemeCookie = v.safeParse(
      colorSchemeSchema,
      colorSchemeCookieValue,
    );
    colorScheme = colorSchemeCookie.success ? colorSchemeCookie.output : null;
  }

  return {
    colorScheme,
    fallback: !colorSchemeHeader.success,
  };
}

function getCookieValue(request: Request) {
  const cookieString = request.headers.get('Cookie') ?? '';
  const value = cookieString
    .split(';')
    .map((c: string) => c.trim())
    .find((c: string) => c.startsWith(`${cookieName}=`))
    ?.split('=')[1];

  return value ?? null;
}
