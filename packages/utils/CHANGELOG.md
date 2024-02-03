# @tipprunde/utils

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
