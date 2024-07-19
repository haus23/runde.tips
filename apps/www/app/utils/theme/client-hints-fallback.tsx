import { cookieName } from './types';

const clientHintsCode = `
(() => {
  const cookies = document.cookie.split(';').map(c => c.trim()).reduce((acc, cur) => {
    const [key, value] = cur.split('=');
    acc[key] = value;
    return acc;
  }, {});

  const currentCookieColorScheme = cookies['${cookieName}'];
  const colorScheme = window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';

  if (currentCookieColorScheme !== colorScheme && navigator.cookieEnabled) {
      document.cookie = '${cookieName}' + '=' + colorScheme + '; Max-Age=31536000; path=/; SameSite=Lax';
      window.location.reload();
  }
})();
`;

export function ClientHintsFallback() {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Allowed here only for this script
      dangerouslySetInnerHTML={{ __html: clientHintsCode }}
    />
  );
}
