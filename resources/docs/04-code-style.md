# Code Style

Das Projekt geht all-in mit [Biome](https://biomejs.dev/) als Formatter und Linter -
unterstützt vom Editoconfig-Projekt.

## Entscheidungen

- Single Quotes
- Indent with two spaces
- Imports without extensions

Letzteres bekomme ich noch nicht konfiguriert für die Auto-Imports mit
absolutem Pfad und Nutzung des Path-Aliases / `package.json` - Imports.

## VS Code Extensions

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)

## VS Code Settings

- `"editor.formatOnSave": true`
- `"editor.defaultFormatter": "biomejs.biome"`

Für weitere Anpassungen siehe `.vscode/settings.json`.

