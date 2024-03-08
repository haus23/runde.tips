import { colorSchemeSchema } from '.';

// TODO: Remove fallback to cookie value after decent browser support for client hint headers

export function getHints(request: Request) {
  const colorSchemeHeaderValue = request.headers.get(
    'Sec-CH-Prefers-Color-Scheme',
  );
  const colorSchemeHeader = colorSchemeSchema.safeParse(colorSchemeHeaderValue);

  const colorSchemeCookieValue = getCookieValue(request);
  const colorSchemeCookie = colorSchemeSchema.safeParse(colorSchemeCookieValue);

  return {
    colorScheme: colorSchemeHeader.success
      ? colorSchemeHeader.data
      : colorSchemeCookie.success
        ? colorSchemeCookie.data
        : null,
    fallback: !colorSchemeHeader.success,
  };
}

const cookieName = 'CH-prefers-color-scheme';

function getCookieValue(request: Request) {
  const cookieString = request.headers.get('Cookie') ?? '';
  const value = cookieString
    .split(';')
    .map((c: string) => c.trim())
    .find((c: string) => c.startsWith(`${cookieName}=`))
    ?.split('=')[1];

  return value ?? null;
}
