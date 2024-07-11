# Theme

## ColorScheme (Light or Dark Mode)

Das Dark-/Light-Mode Styling basiert im Wesentlichen auf den CSS-Variablen
(`:root` und `.dark` - Variablen in der `styles.css`). Dazu muss der Tailwind
`darkMode` aber zusätzlich auf `class` gestellt werden, damit ich keine
unliebsamen Überraschungen erlebe. Zudem kann optional dann auch der
Tailwind Selektor genutzt werden (aktuell ohne Nutzung).

## ThemeColor

Es ist einiges vorbereitet, aber noch nicht zu Ende entwickelt. Zur Zeit wird
auch nur eine Farbe genutzt: `grass`. In den Dateien im `app/utils/theme` Ordner
steckt schon der Code um alternativ auch `violet` zu nutzen. Es fehlt die
Color-Switch Komponente, die Farben aus der Palette in der `styles.css` und
schließlich das Setzen der CSS-Klasse zur Auswahl der Palette.
