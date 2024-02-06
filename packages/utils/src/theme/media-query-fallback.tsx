import { useTheme } from './theme-provider';

const clientThemeCode = `
(() => {
  const theme = window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
  const otherTheme = theme === 'light' ? 'dark' : 'light';

  const cl = document.documentElement.classList;
  cl.toggle(theme, true);
  cl.toggle(otherTheme, false);

  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark';
    } else if (theme === 'light') {
      meta.content = 'light';
    }
  }
})();
`;

export function MediaQueryFallback() {
  const { mediaQueryFallback, isSSR } = useTheme();
  return mediaQueryFallback && !isSSR ? (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Allowed here only for this script
      dangerouslySetInnerHTML={{ __html: clientThemeCode }}
    />
  ) : null;
}
