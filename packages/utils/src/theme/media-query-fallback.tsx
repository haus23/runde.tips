const clientThemeCode = `
(() => {
  const theme = window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';

  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (!themeAlreadyApplied) {
    cl.add(theme);
  }
})();
`;

export function MediaQueryFallback({ ssrTheme }: { ssrTheme: boolean }) {
  return ssrTheme ? null : (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Allowed here only for this script
      dangerouslySetInnerHTML={{ __html: clientThemeCode }}
    />
  );
}
