# Icons

Um der gängigen aktuellen Praxis zu folgen
[Best way to manage icons](https://benadam.me/thoughts/react-svg-sprites/),
setze ich auch nicht auf ein Icon-Paket - jedenfalls solange dieses ebenfalls
nicht ein SVG-Sprite nutzen.

## Verwendete Icons

Die Icon-Files (SVG-Icons) liegen im Verzeichnis `resources/icons`. Sie können dort
manuell abgelegt werden - oder über das Tool [sly](https://sly-cli.fly.dev/)
heruntergeladen werden. Default-Iconset ist das [Lucide Set](https://lucide.dev/).

## Erzeugen des Sprites

Hier setze ich mittlerweile auf ein Vite-Plugin. Diese Entscheidung muss nicht
final sein.

Plugin: https://github.com/forge42dev/vite-plugin-icons-spritesheet

