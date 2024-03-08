import { useEffect } from 'react';
import { useTheme } from './theme';

const cookieName = 'CH-prefers-color-scheme';

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
  const { theme, mode } = useTheme();

  useEffect(() => {
    if (mode === 'client') {
      const handleChange = (ev: MediaQueryListEvent) => {
        const colorScheme = ev.matches ? 'light' : 'dark';
        if (theme.colorScheme !== colorScheme && navigator.cookieEnabled) {
          document.cookie = `${cookieName}=${colorScheme}; Max-Age=31536000; path=/; SameSite=Lax`;
          window.location.reload();
        }
      };

      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery?.removeEventListener('change', handleChange);
    }
  }, [theme, mode]);

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Allowed here only for this script
      dangerouslySetInnerHTML={{ __html: clientHintsCode }}
    />
  );
}
