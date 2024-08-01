# Node Version and Package Manager

- Node Version

Die Node-Version wird auf die aktuelle LTS-Version eingestellt. Einstellung in
der `package.json`. Dies muss auch im Docker-Image berücksichtigt werden.

- Package Manager

Die App verwendet `pnpm`. Siehe auch hierzu die `package.json`. Zudem muss im
Docker-Image `corepack` enabled werden.

- Monorepo / Workspaces

Um die Integration und Modifikation der UI-Bibliothek von der Anwendung zu
separieren, habe ich einen PNPM-Workspace aufgesetzt. Zudem setze ich auch
schon auf die PNPM-Kataloge, um die Dependencies besser zu versionieren.

Kleiner Nachteil aktuell: es wird noch nicht alles für die Kataloge
unterstützt.
