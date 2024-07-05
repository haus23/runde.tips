# Node Version and Package Manager

- Node Version

Die Node-Version wird auf die aktuelle LTS-Version eingestellt. Siehe `package.json`.
Dies muss auch im Docker-Image berücksichtigt werden.

- Package Manager

Im Gegensatz zum Epic Stack verwendet die App `pnpm`. Siehe auch hierzu die `package.json`. Zudem muss im Docker-Image `corepack` enabled werden.

