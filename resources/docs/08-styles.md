# Styling

Natürlich setzt das Projekt auf Tailwind CSS. Dabei achte ich bei der
Konfiguration auf beste Kompatibilität zum kommenden Tailwind v4.

Es gelten folgende Prinzipien:

- Mobile First
- Dark-Mode Support (über `class`-Name)

## React Aria Components

Als Headless UI-Bibliothek wird fast ausschließlich auf die
[React Aria](https://react-spectrum.adobe.com/react-aria/index.html)
Bibliothek von Adobe gesetzt.

Bisherige Ausnahmen:

- Tabs-Komponente [HeadlessUI](https://headlessui.com/) - das könnte
nochmal überprüft werden
- Command-Komponente [cmdk](https://cmdk.paco.me/) - perfekte Implementierung

## Farb-System

Größtenteils die RadixUI Farb-Palette genutzt und keine Tailwind-Farben benutzt
(außer Black und White).

Um die Radix-UI Farbpalette optimal zu nutzen, werden in der `app/styles.css` die Farben
importiert und mit CSS-Variablen genutzt. So reicht ein einfaches Replace-Kommando in
dieser Datei aus, wenn ich die Palette wechseln will.

In der `tailwind.config.ts` werden dann die CSS-Variablen auf Tailwind-Farben abgebildet.
Dies wird dann ab Tailwind v4 nicht mehr notwendig sein.

Links:

- Aliasing: https://www.radix-ui.com/colors/docs/overview/aliasing

## Tailwind v4

Bei der letzten Evaluation (damals noch im Alpha-State) gab es zwei Showstopper:

- Keine Plugins mgl (brauche ich für die RAC)
- Fehlender Support im VS Code Plugin

