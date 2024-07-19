# Theme

Das Theme-Handling von NextUI basiert auf CSS-Klassen. Also ist zunächst
zwingend in der Tailwind-Config `darkMode: 'class'` notwendig.

## ColorScheme (Light or Dark Mode)

Das effektive ColorScheme wird wie folgt bestimmt (Präzedenz steigend):

1. Default: light

## ThemeColor

Es ist einiges vorbereitet, aber noch nicht zu Ende entwickelt. Zur Zeit wird
auch nur eine Farbe genutzt: `grass`. In den Dateien im `app/utils/theme` Ordner
steckt schon der Code um alternativ auch `violet` zu nutzen. Es fehlt die
Color-Switch Komponente, die Farben aus der Palette in der `styles.css` und
schließlich das Setzen der CSS-Klasse zur Auswahl der Palette.
