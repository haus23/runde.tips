# @tipprunde/utils

## 0.2.1

### Patch Changes

- fix: Hydration error since we have a default scheme. And better dark/light mode switching via color-scheme.

## 0.2.0

### Minor Changes

- feat: Add misc utilities: singleton and invariant.

- feat: Add helper to handle readonly arrays.

## 0.1.0

### Minor Changes

- feat: Final utils/theme. Resolves #1 und resolves #2

## 0.0.5

### Patch Changes

- refactor: Provide a future-proof complete setTheme method.

- refactor: Use completed theme as state.

- refactor: Add default colorScheme prop.

## 0.0.4

### Patch Changes

- chore: Update deps. Update Remix to v2.6

## 0.0.3

### Patch Changes

- refactor: State belong in context. And listen for media query changes.

- refactor: Cleanup and make everything optional.

- feat: Implement support for mediaQuery based colorScheme setting.

## 0.0.2

### Patch Changes

- refactor: Provide a session helper to create ts typed sessions.

- refactor: Set theme via setter. Use state for color scheme.

- fix: Spotted the server-only code. And switch to formData.

- refactor: Redesigned the types. Readded client hints.

- feat: Handle setting and destroying theme session

- feat: Add provider and hook with the session data. And add a POC in home route.

## 0.0.1

### Patch Changes

- feat: Fallback to media query on client if no hint available.

- feat: Create theme provider.

- refactor: Provide undefined if client hint not supported.

- feat: Respect client hint header.

- feat: Watch media query changes on client.

- chore: Create package utils. First subpath export: theme.
