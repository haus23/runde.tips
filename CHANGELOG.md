# @tipprunde/www


## v0.0.26

[compare changes](https://github.com/haus23/runde.tips/compare/v0.0.25...v0.0.26)

### 🚀 Enhancements

- Prepare syncing of championships. ([df1a3c1](https://github.com/haus23/runde.tips/commit/df1a3c1))
- Add missing championship data models. ([dd6e280](https://github.com/haus23/runde.tips/commit/dd6e280))
- Use cases for championship syncs. ([008083d](https://github.com/haus23/runde.tips/commit/008083d))
- Implement simple insert sync method. ([e202d8a](https://github.com/haus23/runde.tips/commit/e202d8a))

### 🏡 Chore

- Patch update deps. ([7d1c795](https://github.com/haus23/runde.tips/commit/7d1c795))
- **dx:** Set formatter for prisma files. ([ace7956](https://github.com/haus23/runde.tips/commit/ace7956))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.0.25

[compare changes](https://github.com/haus23/runde.tips/compare/v0.0.24...v0.0.25)

### 🚀 Enhancements

- Add simple disclosure component. ([f80b25c](https://github.com/haus23/runde.tips/commit/f80b25c))
- Add master data models for teams and leagues. ([6f7e266](https://github.com/haus23/runde.tips/commit/6f7e266))
- Implement syncing players. ([e8cce61](https://github.com/haus23/runde.tips/commit/e8cce61))
- Start handling the master data syncings. ([290b9ad](https://github.com/haus23/runde.tips/commit/290b9ad))
- Add feedback while syncing. ([3f52b62](https://github.com/haus23/runde.tips/commit/3f52b62))
- Syncing teams ([89d96d2](https://github.com/haus23/runde.tips/commit/89d96d2))
- Syncing leagues ([8879055](https://github.com/haus23/runde.tips/commit/8879055))
- Syncing rulesets. ([f5c3214](https://github.com/haus23/runde.tips/commit/f5c3214))

### 🩹 Fixes

- Include server folder. Seems to be ignored otherwise. ([70a4751](https://github.com/haus23/runde.tips/commit/70a4751))

### 💅 Refactors

- Load all championships from firestore - not just published. ([9557535](https://github.com/haus23/runde.tips/commit/9557535))

### 🏡 Chore

- **release:** V0.0.24 ([6062f46](https://github.com/haus23/runde.tips/commit/6062f46))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.0.24

[compare changes](https://github.com/haus23/runde.tips/compare/v0.0.23...v0.0.24)

### 🚀 Enhancements

- Load data from firestore. Proof-of-concept works. ([5ab7a2a](https://github.com/haus23/runde.tips/commit/5ab7a2a))

### 🩹 Fixes

- Update notice about the sync backend reasons. ([a82fdf7](https://github.com/haus23/runde.tips/commit/a82fdf7))
- Provide sample .env file ([73c9d5e](https://github.com/haus23/runde.tips/commit/73c9d5e))

### 💅 Refactors

- Move api code to server folder. ([35f2b17](https://github.com/haus23/runde.tips/commit/35f2b17))

### 🏡 Chore

- Initialize and configure firestore. ([f816bfb](https://github.com/haus23/runde.tips/commit/f816bfb))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## 0.0.23

### Patch Changes

- refactor: Refactor monorepo into single project.

## 0.0.22

### Patch Changes

- refactor: Move logo component to www app

- refactor: Move simplified icon component to www app.

- refactor: Move handling for adding icons to www app.

- refactor: prepare moving ui package components to www app.

- refactor: Move tsconfig to www app. Removed last package.

- refactor: Move tailwind config to www app. Finally delete tw config package.

- refactor: Move icons build script to www app.

- refactor: Finally remove all rac code to www app and delete ui package.

## 0.0.21

### Patch Changes

- [`2636326`](https://github.com/haus23/runde.tips/commit/2636326e8e72d5dc3c7d3aaf64ddbd81abaea706) Thanks [@haus23](https://github.com/haus23)! - fix: Remove currently unused vite-env-only plugin.

- [`2636326`](https://github.com/haus23/runde.tips/commit/2636326e8e72d5dc3c7d3aaf64ddbd81abaea706) Thanks [@haus23](https://github.com/haus23)! - refactor: Upgrade isbot and simplify usage.

- [`2636326`](https://github.com/haus23/runde.tips/commit/2636326e8e72d5dc3c7d3aaf64ddbd81abaea706) Thanks [@haus23](https://github.com/haus23)! - chore: Upgrade remix. Vite plugin now stable.

- [`2636326`](https://github.com/haus23/runde.tips/commit/2636326e8e72d5dc3c7d3aaf64ddbd81abaea706) Thanks [@haus23](https://github.com/haus23)! - fix: Remove debug info.

- [`2636326`](https://github.com/haus23/runde.tips/commit/2636326e8e72d5dc3c7d3aaf64ddbd81abaea706) Thanks [@haus23](https://github.com/haus23)! - chore: Update typings.

- Updated dependencies [[`2636326`](https://github.com/haus23/runde.tips/commit/2636326e8e72d5dc3c7d3aaf64ddbd81abaea706), [`2636326`](https://github.com/haus23/runde.tips/commit/2636326e8e72d5dc3c7d3aaf64ddbd81abaea706), [`2636326`](https://github.com/haus23/runde.tips/commit/2636326e8e72d5dc3c7d3aaf64ddbd81abaea706), [`2636326`](https://github.com/haus23/runde.tips/commit/2636326e8e72d5dc3c7d3aaf64ddbd81abaea706), [`2636326`](https://github.com/haus23/runde.tips/commit/2636326e8e72d5dc3c7d3aaf64ddbd81abaea706), [`2636326`](https://github.com/haus23/runde.tips/commit/2636326e8e72d5dc3c7d3aaf64ddbd81abaea706)]:
  - @tipprunde/ui@0.2.4
  - @tipprunde/db@0.2.1

## 0.0.20

### Patch Changes

- refactor: Align session secret. No need to use more than one.

- refactor: Move action into resource route.

- refactor: Move theme menu to common components folder.

- fix: Make logo link a block. Simplifies clicking.

- fix: Add borders

- refactor: Move path alias again to the app folder.

- refactor: Rethink button colors.

- feat: Add icons for master data nav items.

- fix: remove padding from content. Instead set margin in layout. Items are clickable again.

- feat: Handling toasts on server side (WIP).

- fix: Cleaner header and nav styling. Resolves #10

- feat: Implement raw toast handling (via server).

- feat: Add theme menu to manager layout.

- Updated dependencies []:
  - @tipprunde/ui@0.2.3

## 0.0.19

### Patch Changes

- refactor: Initial take on nav styling.

- feat: Integrate sonner toast library.

- feat: Secure the manager routes.

- refactor: Simplify icon usage.

- refactor: Clean up and add manager link.

- feat: Minimal implementation for cache invalidation on backend.

- feat: Add simple user menu.

- refactor: Use topnav variant for navlinks

- feat: Add initial manager routes and layout.

- feat: Add logout route.

- fix: Small layout change. Left padding mismatch.

- Updated dependencies []:
  - @tipprunde/ui@0.2.2
  - @tipprunde/db@0.2.0

## 0.0.18

### Patch Changes

- [#9](https://github.com/haus23/runde.tips/pull/9) [`38c2cec`](https://github.com/haus23/runde.tips/commit/38c2cec7e94e6887fe5a81fb7bb4e9312a3212d3) Thanks [@haus23](https://github.com/haus23)! - refactor: Move theme code from utils package into app.

- [#9](https://github.com/haus23/runde.tips/pull/9) [`38c2cec`](https://github.com/haus23/runde.tips/commit/38c2cec7e94e6887fe5a81fb7bb4e9312a3212d3) Thanks [@haus23](https://github.com/haus23)! - refactor: Move server code directory.

- [#9](https://github.com/haus23/runde.tips/pull/9) [`38c2cec`](https://github.com/haus23/runde.tips/commit/38c2cec7e94e6887fe5a81fb7bb4e9312a3212d3) Thanks [@haus23](https://github.com/haus23)! - refactor: Reorganize server code. Change path alias.

- [#9](https://github.com/haus23/runde.tips/pull/9) [`38c2cec`](https://github.com/haus23/runde.tips/commit/38c2cec7e94e6887fe5a81fb7bb4e9312a3212d3) Thanks [@haus23](https://github.com/haus23)! - refactor: Drop auth from utils. Use remix-auth-totp instead.

- [#9](https://github.com/haus23/runde.tips/pull/9) [`38c2cec`](https://github.com/haus23/runde.tips/commit/38c2cec7e94e6887fe5a81fb7bb4e9312a3212d3) Thanks [@haus23](https://github.com/haus23)! - refactor: Remove remaining helpers to app.

- [#9](https://github.com/haus23/runde.tips/pull/9) [`38c2cec`](https://github.com/haus23/runde.tips/commit/38c2cec7e94e6887fe5a81fb7bb4e9312a3212d3) Thanks [@haus23](https://github.com/haus23)! - refactor: Reorganize sessions and theme related server code.

- Updated dependencies [[`38c2cec`](https://github.com/haus23/runde.tips/commit/38c2cec7e94e6887fe5a81fb7bb4e9312a3212d3), [`38c2cec`](https://github.com/haus23/runde.tips/commit/38c2cec7e94e6887fe5a81fb7bb4e9312a3212d3)]:
  - @tipprunde/db@0.1.3

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
