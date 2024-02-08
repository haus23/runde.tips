# @tipprunde/www

## 0.0.17

### Patch Changes

- [#8](https://github.com/haus23/runde.tips/pull/8) [`2900977`](https://github.com/haus23/runde.tips/commit/29009774b23f55ddce4acbf2f084ad25b2ee7968) Thanks [@haus23](https://github.com/haus23)! - refactor: Simple wrap the session getter.

- [#8](https://github.com/haus23/runde.tips/pull/8) [`2900977`](https://github.com/haus23/runde.tips/commit/29009774b23f55ddce4acbf2f084ad25b2ee7968) Thanks [@haus23](https://github.com/haus23)! - feat: Implement login workflow. Buggy. Time to work at issue #3

- [#8](https://github.com/haus23/runde.tips/pull/8) [`2900977`](https://github.com/haus23/runde.tips/commit/29009774b23f55ddce4acbf2f084ad25b2ee7968) Thanks [@haus23](https://github.com/haus23)! - feat: Implement login form logic

- [#8](https://github.com/haus23/runde.tips/pull/8) [`2900977`](https://github.com/haus23/runde.tips/commit/29009774b23f55ddce4acbf2f084ad25b2ee7968) Thanks [@haus23](https://github.com/haus23)! - feat: Implement first auth ideas.

- Updated dependencies [[`2900977`](https://github.com/haus23/runde.tips/commit/29009774b23f55ddce4acbf2f084ad25b2ee7968), [`2900977`](https://github.com/haus23/runde.tips/commit/29009774b23f55ddce4acbf2f084ad25b2ee7968), [`2900977`](https://github.com/haus23/runde.tips/commit/29009774b23f55ddce4acbf2f084ad25b2ee7968), [`2900977`](https://github.com/haus23/runde.tips/commit/29009774b23f55ddce4acbf2f084ad25b2ee7968), [`2900977`](https://github.com/haus23/runde.tips/commit/29009774b23f55ddce4acbf2f084ad25b2ee7968), [`2900977`](https://github.com/haus23/runde.tips/commit/29009774b23f55ddce4acbf2f084ad25b2ee7968)]:
  - @tipprunde/db@0.1.2
  - @tipprunde/utils@0.3.0
  - @tipprunde/ui@0.2.1

## 0.0.16

### Patch Changes

- refactor: Add overlay-arrow.

- fix: Use german wordings.

- feat: Add simple link components.

- fix: Remove border styling for current links. Resolves #4

- fix: Increase horizontal gap.

- fix: Hydration error since we have a default scheme. And better dark/light mode switching via color-scheme.

- feat: First try on the link components and the app header.

- Updated dependencies []:
  - @tipprunde/ui@0.2.0
  - @tipprunde/utils@0.2.1
  - @tipprunde/db@0.1.1

## 0.0.15

### Patch Changes

- feat: POC for the db packages.

- refactor: Move helper to utils package.

- Updated dependencies []:
  - @tipprunde/utils@0.2.0
  - @tipprunde/db@0.1.0

## 0.0.14

### Patch Changes

- feat: Finally styled the theme menu.

- feat: Final utils/theme. Resolves #1 und resolves #2

## 0.0.13

### Patch Changes

- feat: Add unstyled but working menu component.

- fix: Icons were renamed. Use library prefix now.

- refactor: Add default colorScheme prop.

## 0.0.12

### Patch Changes

- chore: Update deps. Update Remix to v2.6

- feat: Add minimal styled button with variants.

- refactor: Remove now obsolete live-reload component.

- fix: Typo.

## 0.0.11

### Patch Changes

- refactor: State belong in context. And listen for media query changes.

- refactor: Cleanup and make everything optional.

- feat: Implement support for mediaQuery based colorScheme setting.

## 0.0.10

### Patch Changes

- refactor: Provide a session helper to create ts typed sessions.

- refactor: Switch to default color scheme light.

- refactor: Set theme via setter. Use state for color scheme.

- fix: Spotted the server-only code. And switch to formData.

- feat: Create theme session.

- refactor: Remove all theme related code. Due to problems with code splitting.

- refactor: Redesigned the types. Readded client hints.

- feat: Handle setting and destroying theme session

- fix: Get rid of preloading the svg-files. Annoying console warnings.

- feat: Add provider and hook with the session data. And add a POC in home route.

## 0.0.9

### Patch Changes

- feat: Add remix flat routes and start designing layout.

- refactor: Move app styles to the app. And use meta for color-scheme setting.

- chore: Depend on utils package.

- feat: Fallback to media query on client if no hint available.

- feat: Create theme provider.

- refactor: Provide undefined if client hint not supported.

- feat: Request for client hint header.

## 0.0.8

### Patch Changes

- fix: Preload logo image.

- feat: Add support for svg icons and files.

## 0.0.7

### Patch Changes

- refactor: Adapt to the now internal ui package.

## 0.0.6

### Patch Changes

- chore: Move app styling to the app ;-)

- chore: Update due to now transpiled ui package.

## 0.0.5

### Patch Changes

- chore: Depend on ui package. More a proof of concept by now.

- chore: Rename config file.

## 0.0.4

### Patch Changes

- feat: Import tailwind-config package styles.

## 0.0.3

### Patch Changes

- chore: Depend on @tipprunde/tailwind-config. Add tailwind support.

## 0.0.2

### Patch Changes

- chore: Depend on @tipprunde/typescript-config.

## 0.0.1

### Patch Changes

- chore: Add dedicated port.

- feat: Add initial @tipprunde/www app.
