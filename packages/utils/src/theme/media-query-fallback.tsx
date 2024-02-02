import { useTheme } from './theme-provider';

const clientThemeCode = `
(() => {
  const theme = window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';

  const cl = document.documentElement.classList;
  cl.toggle(theme, true);
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
