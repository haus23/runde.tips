# Theme

Das Theme-Handling von NextUI basiert auf CSS-Klassen. Also ist zunächst
zwingend in der Tailwind-Config `darkMode: 'class'` notwendig.

## ColorScheme (Light or Dark Mode)

Das effektive ColorScheme wird wie folgt bestimmt (Präzedenz steigend):

1. Default: light
2. Client Hints:
  - Der Server Entry fordert per Response-Header Client-Hints an
  - Im Root-Loader werden die Hints gelesen (falls unterstützt)
  - Browser ohne Unterstützung von Client Hints erzeugen ein Fallback-Cookie
  - Überwache das bevorzugte ColorScheme des Browsers
3. Session:
  - Beim Theme-Wechsel ein Session-Cookie erzeugen


## ThemeColor

Durch den Einsatz von NextUI bedarf es lediglich der Entwicklung neuer
Themes und deren Auswahl im erweiterten Theme-Menu.
