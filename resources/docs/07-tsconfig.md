# TypeScript Config

Hier habe ich selbst noch großen Lernbedarf (es wird langsam ...). Ziel ist es wirklich nur
Einstellungen vorzunehmen, die notwendig sind bzw. von denen ich profitiere. Außerdem sollte
ein Fokus auf den Best-Practices sitzen.

Soweit es geht sollte die `tsconfig.json` auch kommentiert sein.

## Imports

Ich werde dem Epic Stack Weg folgen und das imports-Feature von npm/node (package.json)
nutzen. Damit können die Imports-Aliases an einer zentralen Stelle konfiguriert werden
und sowohl Node.js als auch Bundler verstehen diese Syntax.

Da TypeScript diese Syntax noch nicht "erkennt" muss da weiterhin ein Path-Alias gesetzt
werden.

Anders als der Epic Stack setzte ich den Alias aber auf das `app`-Verzeichnis. Tests werden
damit nicht berücksichtigt (falls in einem Ordner `/tests`), aber dann könnten wir auch einen
zweiten Import-Pfad definieren.
