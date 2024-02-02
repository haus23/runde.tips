# Theme

## ColorScheme (Light or Dark Mode)

Das Dark-/Light-Mode Styling basiert auf Tailwind und dem `darkMode: 'class'`-Setting. Zur Unterstützung setze ich auf RadixUI-Colors, die automatisch ebenso die jeweiligen CSS-Klassen.

Die Implementierung im Package `@tipprunde/utils` ist komplett optional aufgebaut:

- Statischer Farbmodus

Einfach im `root.tsx` den gewünschten Modus (`dark` oder `light`) in das `className`-Attribut des `html`-Elementes aufnehmen.

- Session basierter Scheme

Session und Action mit den Helfern erstellen, Session im root-Loader laden und dem ThemeProvider
zusammen mit der Action-Route übergeben. Default-Theme über Optional-Chaining auf dem
html-Dokument setzen.

- Client-Hints basierter Hint

Hints mit dem Helfer laden und dem Provider übergeben. Default-Theme für Browser ohne
Unterstützung wie gehabt im html-Dokument.
