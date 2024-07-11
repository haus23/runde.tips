# @tipprunde/www


## v0.6.0

[compare changes](https://github.com/haus23/runde.tips/compare/v0.5.5...v0.6.0)

### 🚀 Enhancements

- Add remember-me option in login form ([d715a94](https://github.com/haus23/runde.tips/commit/d715a94))
- Implement rolling cookie for remembered sessions. ([1b8def6](https://github.com/haus23/runde.tips/commit/1b8def6))
- Add migration for the rolling session feature. Finally resolves #120 ([#120](https://github.com/haus23/runde.tips/issues/120))

### 🩹 Fixes

- Upgrade prisma due to bug. ([f515cce](https://github.com/haus23/runde.tips/commit/f515cce))
- Track invalid logins. First solution: email notification. Resolves #34 ([#34](https://github.com/haus23/runde.tips/issues/34))
- Remove remaining traces of (un-) revealed server.js ([79f62f6](https://github.com/haus23/runde.tips/commit/79f62f6))
- Regenerate prisma client in production image ([8b8b666](https://github.com/haus23/runde.tips/commit/8b8b666))

### 🏡 Chore

- **dx:** Update biome ([0c7f626](https://github.com/haus23/runde.tips/commit/0c7f626))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.5.5

[compare changes](https://github.com/haus23/runde.tips/compare/v0.5.4...v0.5.5)

### 🚀 Enhancements

- Implement create championship. Resolves #150 ([#150](https://github.com/haus23/runde.tips/issues/150))

### 🩹 Fixes

- Sync is completed with local championship completed. Resolves #148 ([#148](https://github.com/haus23/runde.tips/issues/148))
- Add initial select component. Resolves #151 ([#151](https://github.com/haus23/runde.tips/issues/151))
- Align table row heights between completed und uncompleted championships. ([4837a03](https://github.com/haus23/runde.tips/commit/4837a03))
- Align layouts. Resolves #149 ([#149](https://github.com/haus23/runde.tips/issues/149))
- Bring back overlay arrows for the menus. ([f661b1f](https://github.com/haus23/runde.tips/commit/f661b1f))
- Deferred the firstore loading. Resolves #145 ([#145](https://github.com/haus23/runde.tips/issues/145))

### 💅 Refactors

- Switch to custom server. ([cdaba69](https://github.com/haus23/runde.tips/commit/cdaba69))
- Reveal custom server and cleanup entry files. ([0f2551e](https://github.com/haus23/runde.tips/commit/0f2551e))
- Change icon sprite generation. Resolves #152 ([#152](https://github.com/haus23/runde.tips/issues/152))

### 🏡 Chore

- Update pnpm ([0018332](https://github.com/haus23/runde.tips/commit/0018332))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.5.4

[compare changes](https://github.com/haus23/runde.tips/compare/v0.5.3...v0.5.4)

### 🩹 Fixes

- Remove theme-switch from header. ([443cb4a](https://github.com/haus23/runde.tips/commit/443cb4a))
- Remove all layout related stylings from doc root. ([1df7b91](https://github.com/haus23/runde.tips/commit/1df7b91))
- Simplify layout. Resolves #139 ([#139](https://github.com/haus23/runde.tips/issues/139))
- Simplify the popovers. Resolves #129 ([#129](https://github.com/haus23/runde.tips/issues/129))

### 💅 Refactors

- Bring back theme switch to manager header ([685de54](https://github.com/haus23/runde.tips/commit/685de54))
- Proof of concept, export provider first. ([806090d](https://github.com/haus23/runde.tips/commit/806090d))
- Export types differently ([c04628d](https://github.com/haus23/runde.tips/commit/c04628d))
- Use the new default export. ([cdf307d](https://github.com/haus23/runde.tips/commit/cdf307d))

### 🏡 Chore

- **dx:** Update biome ([2ecebd0](https://github.com/haus23/runde.tips/commit/2ecebd0))
- **dx:** Update pnpm. ([d6a6bbc](https://github.com/haus23/runde.tips/commit/d6a6bbc))
- Update typings ([fe063f2](https://github.com/haus23/runde.tips/commit/fe063f2))
- Update dev toolchain ([51bc479](https://github.com/haus23/runde.tips/commit/51bc479))
- Patch update prod deps ([c6bd913](https://github.com/haus23/runde.tips/commit/c6bd913))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.5.3

[compare changes](https://github.com/haus23/runde.tips/compare/v0.5.2...v0.5.3)

### 🚀 Enhancements

- Export championships from context ([0ad4f99](https://github.com/haus23/runde.tips/commit/0ad4f99))

### 💅 Refactors

- Move foh-only component away from common components folder. ([6ac460c](https://github.com/haus23/runde.tips/commit/6ac460c))
- Align the API with backend context ([a8902b1](https://github.com/haus23/runde.tips/commit/a8902b1))
- Simplify the select with using the context. ([edc9e92](https://github.com/haus23/runde.tips/commit/edc9e92))
- Eliminate unneeded usePublished- Hook ([cc679c1](https://github.com/haus23/runde.tips/commit/cc679c1))
- Remove redundant foh and manager contexts in favor of an app context. ([0c5a130](https://github.com/haus23/runde.tips/commit/0c5a130))
- Reduce redundant page-title hooks ([5fe3194](https://github.com/haus23/runde.tips/commit/5fe3194))
- Reorganize folder structure. ([664bae3](https://github.com/haus23/runde.tips/commit/664bae3))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.5.2

[compare changes](https://github.com/haus23/runde.tips/compare/v0.5.1...v0.5.2)

### 🩹 Fixes

- Better aligning for toast. See #127 ([#127](https://github.com/haus23/runde.tips/issues/127))
- Change welcome page link. Resolves #130 ([#130](https://github.com/haus23/runde.tips/issues/130))
- Add championship name as keyword. Partially resolves #132 ([#132](https://github.com/haus23/runde.tips/issues/132))
- Refactor manager context. Resolves #128 ([#128](https://github.com/haus23/runde.tips/issues/128))
- Do not try to over implement anything. See #138 ([#138](https://github.com/haus23/runde.tips/issues/138))
- Remove championship select from header. Resolves #138 ([#138](https://github.com/haus23/runde.tips/issues/138))

### 🏡 Chore

- Upgrade prisma and patch update node typings. ([8b697db](https://github.com/haus23/runde.tips/commit/8b697db))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.5.1

[compare changes](https://github.com/haus23/runde.tips/compare/v0.5.0...v0.5.1)

### 🚀 Enhancements

- Add checkbox component. ([4685d60](https://github.com/haus23/runde.tips/commit/4685d60))
- Implement result editing. See #42 ([#42](https://github.com/haus23/runde.tips/issues/42))
- Implement an idea for the API folder. Resolves #107 ([#107](https://github.com/haus23/runde.tips/issues/107))
- Implement tip calculation. ([be29037](https://github.com/haus23/runde.tips/commit/be29037))
- Implement match calculation. ([66d9a94](https://github.com/haus23/runde.tips/commit/66d9a94))
- Add use-case for match result checking. Refine API. ([a52c535](https://github.com/haus23/runde.tips/commit/a52c535))
- Initial implementation of ranking calculation. Resolves #42 ([#42](https://github.com/haus23/runde.tips/issues/42))

### 🩹 Fixes

- Removing weired footer space at results page. ([5cda0a6](https://github.com/haus23/runde.tips/commit/5cda0a6))
- Spotted and solved two bugs. ([6d4fe17](https://github.com/haus23/runde.tips/commit/6d4fe17))
- Fetched the wrong resources. Resolves #133 ([#133](https://github.com/haus23/runde.tips/issues/133))
- Changes mapping to float. Fixes #135 ([#135](https://github.com/haus23/runde.tips/issues/135))

### 💅 Refactors

- Refined validation, submission and added optimistic ui ([a41ad4e](https://github.com/haus23/runde.tips/commit/a41ad4e))
- Working with the Tipprunde API. WIP. See #107 ([#107](https://github.com/haus23/runde.tips/issues/107))

### 📖 Documentation

- Start documenting the use-cases. ([d34462e](https://github.com/haus23/runde.tips/commit/d34462e))

### 🏡 Chore

- **dx:** Update biome. ([cc546f5](https://github.com/haus23/runde.tips/commit/cc546f5))
- Patch updates and align versioning. ([dd7ddfb](https://github.com/haus23/runde.tips/commit/dd7ddfb))
- Patch update deps. ([3f0d308](https://github.com/haus23/runde.tips/commit/3f0d308))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.5.0

[compare changes](https://github.com/haus23/runde.tips/compare/v0.4.2...v0.5.0)

### 🩹 Fixes

- Switching to headlessui solves my results view problems. ([95190b3](https://github.com/haus23/runde.tips/commit/95190b3))
- Switch back to pnpm. See #122 ([#122](https://github.com/haus23/runde.tips/issues/122))
- Restore pnpm dockerfile. ([c5aa823](https://github.com/haus23/runde.tips/commit/c5aa823))
- Missed to remove .npmrc file. ([8937801](https://github.com/haus23/runde.tips/commit/8937801))
- Missed to update prisma path. ([5910513](https://github.com/haus23/runde.tips/commit/5910513))

### 💅 Refactors

- Still evaluating conform. Form update breaks focus handling. ([235b0f9](https://github.com/haus23/runde.tips/commit/235b0f9))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.4.2

[compare changes](https://github.com/haus23/runde.tips/compare/v0.4.1...v0.4.2)

### 🚀 Enhancements

- Create the two forms. ([cf887ea](https://github.com/haus23/runde.tips/commit/cf887ea))
- Add client validation. ([3a3c080](https://github.com/haus23/runde.tips/commit/3a3c080))
- Implement desired features with a raw rac controlled form. ([063e92c](https://github.com/haus23/runde.tips/commit/063e92c))
- Clean-up. Did not manage to implement additionl features. ([5565677](https://github.com/haus23/runde.tips/commit/5565677))

### 🩹 Fixes

- Change table stylings ([5aaacdd](https://github.com/haus23/runde.tips/commit/5aaacdd))
- Drop RAC tables. Resolves #124 ([#124](https://github.com/haus23/runde.tips/issues/124))

### 💅 Refactors

- Trying to use conform with rac. Not working by now. ([8f80e54](https://github.com/haus23/runde.tips/commit/8f80e54))

### 🏡 Chore

- Add conform-to deps. ([561de69](https://github.com/haus23/runde.tips/commit/561de69))
- Simple minor and patch updates. ([267bde2](https://github.com/haus23/runde.tips/commit/267bde2))
- Patch update deps and narrow versions. ([85e8220](https://github.com/haus23/runde.tips/commit/85e8220))
- Update dev deps. ([e4c4864](https://github.com/haus23/runde.tips/commit/e4c4864))
- Upgrade prisma. ([d3020b6](https://github.com/haus23/runde.tips/commit/d3020b6))
- **dx:** Update biome. ([4d7309e](https://github.com/haus23/runde.tips/commit/4d7309e))
- Update remix. ([ba50188](https://github.com/haus23/runde.tips/commit/ba50188))
- Update conform. ([b525b40](https://github.com/haus23/runde.tips/commit/b525b40))
- Update react aria ([9a87501](https://github.com/haus23/runde.tips/commit/9a87501))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.4.1

[compare changes](https://github.com/haus23/runde.tips/compare/v0.4.0...v0.4.1)

### 🚀 Enhancements

- Create a match result abstraction with tests. ([5895038](https://github.com/haus23/runde.tips/commit/5895038))
- Implement manager context. Fixes #110 ([#110](https://github.com/haus23/runde.tips/issues/110))
- Display matches with results. See #42 ([#42](https://github.com/haus23/runde.tips/issues/42))
- Add first wrappers and a future route to demo them. ([6d324ed](https://github.com/haus23/runde.tips/commit/6d324ed))
- Add label and orientation variant. ([ad5912a](https://github.com/haus23/runde.tips/commit/ad5912a))
- Add description and placeholder stylings. ([177d983](https://github.com/haus23/runde.tips/commit/177d983))
- Add first ideas for the field-error ([10c1577](https://github.com/haus23/runde.tips/commit/10c1577))

### 🩹 Fixes

- Start developing the api. And stop here as well. Will go top-down way. ([5e24d75](https://github.com/haus23/runde.tips/commit/5e24d75))
- Use context to build nav items and hide if no championship. See #112 ([#112](https://github.com/haus23/runde.tips/issues/112))
- Add championship select to manager. Resolves #111 ([#111](https://github.com/haus23/runde.tips/issues/111))
- Simplify HoverBox and fixes #113 ([#113](https://github.com/haus23/runde.tips/issues/113))
- Provide an initial tabs wrapper. Fixes #114 ([#114](https://github.com/haus23/runde.tips/issues/114))
- Implement table wrapper. Simplifies usage in ranking. Fixes #115 ([#115](https://github.com/haus23/runde.tips/issues/115))

### 💅 Refactors

- Use championship name as title with no page title set. ([5be7904](https://github.com/haus23/runde.tips/commit/5be7904))
- Remove the optional hook. ([a1e8c3e](https://github.com/haus23/runde.tips/commit/a1e8c3e))
- Make championship-select more flexible using props. ([ea70261](https://github.com/haus23/runde.tips/commit/ea70261))
- Align the foh and manager layouts ([651b5c7](https://github.com/haus23/runde.tips/commit/651b5c7))
- Rename text-field to legacy name. ([1f2c0c8](https://github.com/haus23/runde.tips/commit/1f2c0c8))
- Use the new created text-field wrappers in the results page. ([0eeec6b](https://github.com/haus23/runde.tips/commit/0eeec6b))
- Refine field error handling. ([d153890](https://github.com/haus23/runde.tips/commit/d153890))
- Use new wrappers and remove legacy text-field. ([7bc0c52](https://github.com/haus23/runde.tips/commit/7bc0c52))
- Small style changes. ([42eee5a](https://github.com/haus23/runde.tips/commit/42eee5a))

### 🏡 Chore

- Patch update deps. ([83f1f0f](https://github.com/haus23/runde.tips/commit/83f1f0f))
- Update and clean-up. ([c7ee058](https://github.com/haus23/runde.tips/commit/c7ee058))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.4.0

[compare changes](https://github.com/haus23/runde.tips/compare/v0.3.0...v0.4.0)

### 🚀 Enhancements

- Sync initially current championship with preps for subsequent syncs. Resolves #100 ([#100](https://github.com/haus23/runde.tips/issues/100))
- Start syncing current championshp. See #101 ([#101](https://github.com/haus23/runde.tips/issues/101))
- Implement current ranking. Resolves #40 ([#40](https://github.com/haus23/runde.tips/issues/40))
- Extract popover into hoverbox component. ([978010d](https://github.com/haus23/runde.tips/commit/978010d))

### 🩹 Fixes

- Remaining trace of pnpm removed. ([01912d7](https://github.com/haus23/runde.tips/commit/01912d7))
- Align font weight. ([6cd5c6b](https://github.com/haus23/runde.tips/commit/6cd5c6b))
- Add initial prisma migration. Resolves #69 ([#69](https://github.com/haus23/runde.tips/issues/69))
- Don't break column text on bigger devices. ([e3f1116](https://github.com/haus23/runde.tips/commit/e3f1116))
- Sync current championship. Solves #101 ([#101](https://github.com/haus23/runde.tips/issues/101))
- Add maxAge to totp strategy. Try to solve #104 ([#104](https://github.com/haus23/runde.tips/issues/104))
- Hide points if match not played. ([6b8b6fa](https://github.com/haus23/runde.tips/commit/6b8b6fa))
- Do not rely on object identity. Resolves #105 ([#105](https://github.com/haus23/runde.tips/issues/105))
- Move hoverbox to the left. Better UX. ([b9f7564](https://github.com/haus23/runde.tips/commit/b9f7564))
- Improve mobile styling. Resolves #106 ([#106](https://github.com/haus23/runde.tips/issues/106))
- Added workaround due to https://github.com/adobe/react-spectrum/issues/1513 ([f01f43e](https://github.com/haus23/runde.tips/commit/f01f43e))
- Wrong icon ([b7f8f51](https://github.com/haus23/runde.tips/commit/b7f8f51))
- Provide mobile nav. See #99 ([#99](https://github.com/haus23/runde.tips/issues/99))
- Add mobile nav to manager layout. Resolves #99 ([#99](https://github.com/haus23/runde.tips/issues/99))
- Delay openening to prevent eager press on first nav item. ([372f1aa](https://github.com/haus23/runde.tips/commit/372f1aa))

### 💅 Refactors

- Create text-selected color ([badfff5](https://github.com/haus23/runde.tips/commit/badfff5))
- Remove logs. No use-case for me. Mark #28 as fixed as well. ([#28](https://github.com/haus23/runde.tips/issues/28))
- Add firestoreId columns and drop mapping model. ([a365d52](https://github.com/haus23/runde.tips/commit/a365d52))
- Adapt schema changes. Greatly simplifies syncing scenarios. ([b0426e6](https://github.com/haus23/runde.tips/commit/b0426e6))
- Apply consistent focus styling. ([97fa4aa](https://github.com/haus23/runde.tips/commit/97fa4aa))
- Add migration for the tracking ids. ([052c4b5](https://github.com/haus23/runde.tips/commit/052c4b5))
- Remove offset correction. Not needed any more. ([2cbcfb9](https://github.com/haus23/runde.tips/commit/2cbcfb9))
- Remove unneeded container padding. ([69c28c6](https://github.com/haus23/runde.tips/commit/69c28c6))
- Align hover styling incase some has such a device. ([0611bc9](https://github.com/haus23/runde.tips/commit/0611bc9))
- Recreate current manager layout. Looks more solid. ([2e8ecd6](https://github.com/haus23/runde.tips/commit/2e8ecd6))
- Align pageTitle styles with foh. ([74a7fdc](https://github.com/haus23/runde.tips/commit/74a7fdc))

### 🏡 Chore

- **dx:** Update docker file to npm. ([4ba2f2f](https://github.com/haus23/runde.tips/commit/4ba2f2f))
- **dx:** Simplify workflow. Rename db folder to standard prisma. ([84bdfc7](https://github.com/haus23/runde.tips/commit/84bdfc7))
- **dx:** Slow down package upgrades. ([e6c6846](https://github.com/haus23/runde.tips/commit/e6c6846))
- Patch update deps. ([280c942](https://github.com/haus23/runde.tips/commit/280c942))
- Upgrade remix-utils. ([206a128](https://github.com/haus23/runde.tips/commit/206a128))
- **dx:** Update biome. ([6ef3b0f](https://github.com/haus23/runde.tips/commit/6ef3b0f))
- Upgrade prisma. ([a94b05b](https://github.com/haus23/runde.tips/commit/a94b05b))
- **dx:** Raise usable ECMAScript version. ([dc9f539](https://github.com/haus23/runde.tips/commit/dc9f539))
- Patch update deps. ([99748b4](https://github.com/haus23/runde.tips/commit/99748b4))
- **dx:** Upgrde biome. ([f36d098](https://github.com/haus23/runde.tips/commit/f36d098))
- **dx:** Let biome handle class name sorting. Will do it incrementally. ([85e3e39](https://github.com/haus23/runde.tips/commit/85e3e39))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.3.0

[compare changes](https://github.com/haus23/runde.tips/compare/v0.2.2...v0.3.0)

### 🩹 Fixes

- Just works now. Resolves #82 ([#82](https://github.com/haus23/runde.tips/issues/82))
- Add splat route. Resolves #45 ([#45](https://github.com/haus23/runde.tips/issues/45))
- Invalidate cache after championship sync. ([6c1f2fe](https://github.com/haus23/runde.tips/commit/6c1f2fe))
- Secure all routes. Resolves #92 ([#92](https://github.com/haus23/runde.tips/issues/92))

### 💅 Refactors

- Extract error-boundary. ([57c9caf](https://github.com/haus23/runde.tips/commit/57c9caf))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.2.2

[compare changes](https://github.com/haus23/runde.tips/compare/v0.2.1...v0.2.2)

### 🚀 Enhancements

- Finally add a championship provider. Wasn't that hard ;-) ([36b829f](https://github.com/haus23/runde.tips/commit/36b829f))
- Use context to update nav items and consolidate navigation. ([fe2d520](https://github.com/haus23/runde.tips/commit/fe2d520))
- Implement championship switch. Resolves #41 ([#41](https://github.com/haus23/runde.tips/issues/41))

### 🩹 Fixes

- Invalidate championcache after sync. Resolves 95 ([9f41b2c](https://github.com/haus23/runde.tips/commit/9f41b2c))
- Remove sse toasts. Resolves #94 for now. ([#94](https://github.com/haus23/runde.tips/issues/94))
- Use default cursor on buttons. ([d68b79a](https://github.com/haus23/runde.tips/commit/d68b79a))
- Add robots file. Resolves #97 ([#97](https://github.com/haus23/runde.tips/issues/97))

### 💅 Refactors

- Create an abstraction for long running tasks and there toasts. No sse needed. ([7413bc4](https://github.com/haus23/runde.tips/commit/7413bc4))
- Reimplement long running task handling. Resolves #96. ([#96](https://github.com/haus23/runde.tips/issues/96))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.2.1

[compare changes](https://github.com/haus23/runde.tips/compare/v0.2.0...v0.2.1)

### 🚀 Enhancements

- Basic toast design. ([cb67003](https://github.com/haus23/runde.tips/commit/cb67003))
- Implement a typed node event-emitter. ([2d5450c](https://github.com/haus23/runde.tips/commit/2d5450c))
- Implement sending and receiving SSE toasts. ([ebb96c9](https://github.com/haus23/runde.tips/commit/ebb96c9))
- Add more toast types. ([ee1ed23](https://github.com/haus23/runde.tips/commit/ee1ed23))
- Add redirect with toast method. ([42a9116](https://github.com/haus23/runde.tips/commit/42a9116))
- Bring back first sync actions. ([dbe8c86](https://github.com/haus23/runde.tips/commit/dbe8c86))
- Implement a controlled promise based toast, which can be updated and resolved manually. ([9b409af](https://github.com/haus23/runde.tips/commit/9b409af))
- Implement sse controlled task toasts. Resolves #91 ([#91](https://github.com/haus23/runde.tips/issues/91))
- Implement syncing completed championships. ([5f04e15](https://github.com/haus23/runde.tips/commit/5f04e15))

### 🩹 Fixes

- Generated icon names. Inconsisten and wrong in windows. ([798994e](https://github.com/haus23/runde.tips/commit/798994e))
- Typo in trophy icon name. ([da391ed](https://github.com/haus23/runde.tips/commit/da391ed))
- Set browser color scheme. ([b1353f8](https://github.com/haus23/runde.tips/commit/b1353f8))

### 💅 Refactors

- Extract toast type. ([58b96c5](https://github.com/haus23/runde.tips/commit/58b96c5))
- Provide demo for SSE toast. ([58eb655](https://github.com/haus23/runde.tips/commit/58eb655))
- Update toast type. ([210cfd7](https://github.com/haus23/runde.tips/commit/210cfd7))
- Move cookie toast handling to toaster. ([6061718](https://github.com/haus23/runde.tips/commit/6061718))
- Rename compent colors and complete the button. Resolves #86 ([#86](https://github.com/haus23/runde.tips/issues/86))
- Create collapsible and card component. Visually aligned. Resolves #87 ([#87](https://github.com/haus23/runde.tips/issues/87))
- Adapt the new ui components. ([f0d5de1](https://github.com/haus23/runde.tips/commit/f0d5de1))
- Add simple abstraction layer. Resolves #89 ([#89](https://github.com/haus23/runde.tips/issues/89))
- Style the toast description. Resolves #90 ([#90](https://github.com/haus23/runde.tips/issues/90))
- Implement better component props. ([0faa335](https://github.com/haus23/runde.tips/commit/0faa335))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.2.0

[compare changes](https://github.com/haus23/runde.tips/compare/v0.1.0...v0.2.0)

### 🚀 Enhancements

- Add foh page header. ([8f5aa32](https://github.com/haus23/runde.tips/commit/8f5aa32))
- Add styled ranking back. ([464143c](https://github.com/haus23/runde.tips/commit/464143c))
- Add toolbar ghost btn variant. ([c72e5e6](https://github.com/haus23/runde.tips/commit/c72e5e6))
- Bring back welcome page. ([73fb350](https://github.com/haus23/runde.tips/commit/73fb350))
- Implement theme menu. Simplify ghost button. ([b581073](https://github.com/haus23/runde.tips/commit/b581073))
- Start with textfield ([0cd7451](https://github.com/haus23/runde.tips/commit/0cd7451))
- Extract card and divider components ([8a55b7b](https://github.com/haus23/runde.tips/commit/8a55b7b))
- Add solid button variant. ([93017f0](https://github.com/haus23/runde.tips/commit/93017f0))
- Implement base styling of text-field. ([77bb885](https://github.com/haus23/runde.tips/commit/77bb885))
- Define error text color. ([aaf83bc](https://github.com/haus23/runde.tips/commit/aaf83bc))
- Add description and field-error. Resolves #79 ([#79](https://github.com/haus23/runde.tips/issues/79))
- Add onboarding page. ([7755cd1](https://github.com/haus23/runde.tips/commit/7755cd1))
- Bring back login process. ([b83728a](https://github.com/haus23/runde.tips/commit/b83728a))
- Add user-menu and logout action. ([08017c3](https://github.com/haus23/runde.tips/commit/08017c3))
- Add magic-link route. ([4444229](https://github.com/haus23/runde.tips/commit/4444229))
- Add manager area with layout. ([b592139](https://github.com/haus23/runde.tips/commit/b592139))

### 🩹 Fixes

- Drop NextUI ([cfddc57](https://github.com/haus23/runde.tips/commit/cfddc57))
- Switch to npm. Resolves #73 ([#73](https://github.com/haus23/runde.tips/issues/73))
- Switch to vite. Resolves #74. Breaks tailwind w/o postcss config now. ([#74](https://github.com/haus23/runde.tips/issues/74))
- Use new colors ([7b633e3](https://github.com/haus23/runde.tips/commit/7b633e3))
- Add simple but working popover. Resolves #76 ([#76](https://github.com/haus23/runde.tips/issues/76))
- Implement NavLink wrapper. Resolves #77 ([#77](https://github.com/haus23/runde.tips/issues/77))

### 💅 Refactors

- Emptying the app ... ([95e13f2](https://github.com/haus23/runde.tips/commit/95e13f2))
- Move icon component to its new home. ([f7b7b73](https://github.com/haus23/runde.tips/commit/f7b7b73))
- Reorganize project root folder. ([d0a4313](https://github.com/haus23/runde.tips/commit/d0a4313))
- Go with single react aria packages by now. ([5ea1ab9](https://github.com/haus23/runde.tips/commit/5ea1ab9))
- Use radix colors directly ([e022386](https://github.com/haus23/runde.tips/commit/e022386))
- Import styles as side effect. ([73e464e](https://github.com/haus23/runde.tips/commit/73e464e))
- Switch baxck to tailwindcss v3. ([5ca27a3](https://github.com/haus23/runde.tips/commit/5ca27a3))
- Bring back the color system. ([8753986](https://github.com/haus23/runde.tips/commit/8753986))
- Use RAC plugin. ([efdef84](https://github.com/haus23/runde.tips/commit/efdef84))
- Change design system colors and shadows. ([32b66aa](https://github.com/haus23/runde.tips/commit/32b66aa))
- Simplify card ([bf77a10](https://github.com/haus23/runde.tips/commit/bf77a10))
- Reorganize navigation without championships. ([341ae16](https://github.com/haus23/runde.tips/commit/341ae16))

### 🏡 Chore

- Update biome. ([4f9845d](https://github.com/haus23/runde.tips/commit/4f9845d))
- Ignore local docker compose file. ([90c6467](https://github.com/haus23/runde.tips/commit/90c6467))
- Update typescript. ([4b43ae5](https://github.com/haus23/runde.tips/commit/4b43ae5))
- Drop currently unused framer-motion. ([c7f0b50](https://github.com/haus23/runde.tips/commit/c7f0b50))
- Update tailwind. ([fa338b6](https://github.com/haus23/runde.tips/commit/fa338b6))
- **dx:** Update biome ([0f44665](https://github.com/haus23/runde.tips/commit/0f44665))
- Update deps. ([d7c7ffa](https://github.com/haus23/runde.tips/commit/d7c7ffa))
- **dx:** Use excact version for unreleased packages. ([8f9dd8f](https://github.com/haus23/runde.tips/commit/8f9dd8f))
- Update deps. ([0868d8d](https://github.com/haus23/runde.tips/commit/0868d8d))
- Update biome. ([75273ad](https://github.com/haus23/runde.tips/commit/75273ad))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.1.0

[compare changes](https://github.com/haus23/runde.tips/compare/v0.0.32...v0.1.0)

### 🏡 Chore

- Add readme and license ([a112283](https://github.com/haus23/runde.tips/commit/a112283))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.0.32

[compare changes](https://github.com/haus23/runde.tips/compare/v0.0.31...v0.0.32)

### 🚀 Enhancements

- Add first take on docker file. Works for now. ([50f134d](https://github.com/haus23/runde.tips/commit/50f134d))

### 🩹 Fixes

- Move deps to production deps. ([e8ccdf3](https://github.com/haus23/runde.tips/commit/e8ccdf3))
- No need to ensure connection limit when deploying ([a284673](https://github.com/haus23/runde.tips/commit/a284673))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.0.31

[compare changes](https://github.com/haus23/runde.tips/compare/v0.0.30...v0.0.31)

### 🚀 Enhancements

- Load relevant data. ([29dbb21](https://github.com/haus23/runde.tips/commit/29dbb21))
- Initial take on styling tables. ([140c8c8](https://github.com/haus23/runde.tips/commit/140c8c8))
- Add menu icons. ([af49622](https://github.com/haus23/runde.tips/commit/af49622))
- Add empty header. ([c9a703a](https://github.com/haus23/runde.tips/commit/c9a703a))
- Start styling. ([62a8585](https://github.com/haus23/runde.tips/commit/62a8585))
- Setup nextui. Resolves #52 ([#52](https://github.com/haus23/runde.tips/issues/52))
- Add back minimal header. See issue #54 ([#54](https://github.com/haus23/runde.tips/issues/54))
- Add minimal ranking styles. Resolves #55. Room for improvements.... ([#55](https://github.com/haus23/runde.tips/issues/55))
- Add mobile navmenu in foh. ([7c58fd9](https://github.com/haus23/runde.tips/commit/7c58fd9))
- First take on mobile nav done. ([56a979d](https://github.com/haus23/runde.tips/commit/56a979d))
- First take on the login page. See #58 ([#58](https://github.com/haus23/runde.tips/issues/58))
- First take on onboarding. Resolves #58 ([#58](https://github.com/haus23/runde.tips/issues/58))
- First take on user menu. Resolves #59 ([#59](https://github.com/haus23/runde.tips/issues/59))
- Add mobile nav for manager. Resolves #61 ([#61](https://github.com/haus23/runde.tips/issues/61))
- Add component to set client cookie as fallback for client-hints ([40960aa](https://github.com/haus23/runde.tips/commit/40960aa))
- Implement fallback to cookie based client hints ([8823725](https://github.com/haus23/runde.tips/commit/8823725))
- Add provider-less useTheme hook. ([b3e8970](https://github.com/haus23/runde.tips/commit/b3e8970))
- Listen to color scheme changes if in system mode. ([603d726](https://github.com/haus23/runde.tips/commit/603d726))

### 🩹 Fixes

- Implement account seeding. Resolves #46 ([#46](https://github.com/haus23/runde.tips/issues/46))
- Wrong wrapped overlay arrow. ([1dbad46](https://github.com/haus23/runde.tips/commit/1dbad46))
- Add props to underlying rac table. ([f880182](https://github.com/haus23/runde.tips/commit/f880182))
- Add theme colors. See issue #52 ([#52](https://github.com/haus23/runde.tips/issues/52))
- Add theme menu back. Resolves #56 ([#56](https://github.com/haus23/runde.tips/issues/56))
- Change the buttons. See #60 ([#60](https://github.com/haus23/runde.tips/issues/60))
- Uses cards on sync page. Resolves #60 ([#60](https://github.com/haus23/runde.tips/issues/60))
- Adapt card for welcome page. Resolves #62 ([#62](https://github.com/haus23/runde.tips/issues/62))
- Hide nav items with no championships. Resolves #54 ([#54](https://github.com/haus23/runde.tips/issues/54))
- Use danger color. Resolves #63 ([#63](https://github.com/haus23/runde.tips/issues/63))
- Remove last traces of custom rac components. See #64 ([#64](https://github.com/haus23/runde.tips/issues/64))
- Delete custom rac components. Resolves #64 ([#64](https://github.com/haus23/runde.tips/issues/64))
- Add same-site attribute. ([d53a295](https://github.com/haus23/runde.tips/commit/d53a295))
- Adapt layout export feature. Resolves #18 ([#18](https://github.com/haus23/runde.tips/issues/18))

### 💅 Refactors

- Re-Start with emptied layout. ([c70a650](https://github.com/haus23/runde.tips/commit/c70a650))
- Rename current hook to legacy hook. ([8076364](https://github.com/haus23/runde.tips/commit/8076364))
- Use provider-less hook ([b861882](https://github.com/haus23/runde.tips/commit/b861882))
- Drop legacy implementation ([0cd5851](https://github.com/haus23/runde.tips/commit/0cd5851))
- Reorganize code. ([27de1f1](https://github.com/haus23/runde.tips/commit/27de1f1))
- Provide fallback info via hook ([3e296b6](https://github.com/haus23/runde.tips/commit/3e296b6))

### 🏡 Chore

- Update env template. ([03454f4](https://github.com/haus23/runde.tips/commit/03454f4))
- Update deps. ([61bc1e3](https://github.com/haus23/runde.tips/commit/61bc1e3))
- Add nextui deps. ([54d7dbc](https://github.com/haus23/runde.tips/commit/54d7dbc))

### ❤️ Contributors

- Micha <micha@haus23.net>
- Micha Buchholz <micha@haus23.net>

## v0.0.30

[compare changes](https://github.com/haus23/runde.tips/compare/v0.0.29...v0.0.30)

### 🚀 Enhancements

- Implement missing magic link login. Resolves #33 ([#33](https://github.com/haus23/runde.tips/issues/33))
- Sync auth state over browser tabs. ([3515e4a](https://github.com/haus23/runde.tips/commit/3515e4a))

### 🩹 Fixes

- That was easy. Resolves #22 ([#22](https://github.com/haus23/runde.tips/issues/22))
- Remove strict mode. Resolves #43 ([#43](https://github.com/haus23/runde.tips/issues/43))
- Refactor logout to an action. Resolves #12 ([#12](https://github.com/haus23/runde.tips/issues/12))
- Logging out manually. So precise control over the redirect path. Resolves #44 ([#44](https://github.com/haus23/runde.tips/issues/44))

### 💅 Refactors

- Reveal client entry file. ([2e30b7d](https://github.com/haus23/runde.tips/commit/2e30b7d))

### 🏡 Chore

- Upgrade remix. Nothing special in this release. ([40a31ac](https://github.com/haus23/runde.tips/commit/40a31ac))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.0.29

[compare changes](https://github.com/haus23/runde.tips/compare/v0.0.28...v0.0.29)

### 🚀 Enhancements

- Add global error boundary w/o theme support. Resolves #19 ([#19](https://github.com/haus23/runde.tips/issues/19))
- Add real world email sending back. ([57f963a](https://github.com/haus23/runde.tips/commit/57f963a))
- Add an email template for the send-totp-mail ([2dd2c85](https://github.com/haus23/runde.tips/commit/2dd2c85))
- Implement and send totp mail with resend. ([99141ab](https://github.com/haus23/runde.tips/commit/99141ab))
- (Re-) Implement sending TOTP with postmark. ([25f7a29](https://github.com/haus23/runde.tips/commit/25f7a29))

### 🩹 Fixes

- Fixed refactored class name. ([ac9aa4c](https://github.com/haus23/runde.tips/commit/ac9aa4c))
- Add missing title and charset. Resolves #29 ([#29](https://github.com/haus23/runde.tips/issues/29))

### 💅 Refactors

- Align error with docs. ([0362bb5](https://github.com/haus23/runde.tips/commit/0362bb5))
- Parse env with zod ([1b246e5](https://github.com/haus23/runde.tips/commit/1b246e5))
- Simplify folder structure again. ([12941b0](https://github.com/haus23/runde.tips/commit/12941b0))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.0.28

[compare changes](https://github.com/haus23/runde.tips/compare/v0.0.27...v0.0.28)

### 🚀 Enhancements

- Add provider and hooks to track the current championship. ([42b71ff](https://github.com/haus23/runde.tips/commit/42b71ff))
- Add cache capability for often loaded data. ([9ae7c80](https://github.com/haus23/runde.tips/commit/9ae7c80))
- Start providing error boundaries. See #19 ([#19](https://github.com/haus23/runde.tips/issues/19))

### 🩹 Fixes

- Revert foh routing. And provide fallback with no championships. Resolves #24 ([#24](https://github.com/haus23/runde.tips/issues/24))
- Committed wrong where clause. ([ca49730](https://github.com/haus23/runde.tips/commit/ca49730))
- Bring back rendering of championship name. ([eff7c0f](https://github.com/haus23/runde.tips/commit/eff7c0f))

### 💅 Refactors

- Rename session cookie ([b53d8f9](https://github.com/haus23/runde.tips/commit/b53d8f9))
- Now effectively redirect any championship route to a welcome route w/o championships. See #24 ([#24](https://github.com/haus23/runde.tips/issues/24))
- Move slug checking into hook. ([ecc2736](https://github.com/haus23/runde.tips/commit/ecc2736))
- Decouple cache server code from usage. ([6a3bf77](https://github.com/haus23/runde.tips/commit/6a3bf77))
- Simplify guarding the standings routes. ([74475c1](https://github.com/haus23/runde.tips/commit/74475c1))
- Simplify app state. No need for a context. Basta. ([d7e3f57](https://github.com/haus23/runde.tips/commit/d7e3f57))
- Mark code server only. ([05da7f7](https://github.com/haus23/runde.tips/commit/05da7f7))
- Dropped vite plugin. And temporaryly the error boundary as well. ([68eff50](https://github.com/haus23/runde.tips/commit/68eff50))
- Align build path with vite. Looks better even w/o vite. ([7dea67e](https://github.com/haus23/runde.tips/commit/7dea67e))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.0.27

[compare changes](https://github.com/haus23/runde.tips/compare/v0.0.26...v0.0.27)

### 🩹 Fixes

- Hide nav with no championships. ([f533e5e](https://github.com/haus23/runde.tips/commit/f533e5e))

### 💅 Refactors

- Restructure foh routes. ([cd38a61](https://github.com/haus23/runde.tips/commit/cd38a61))
- Enforce better code style. ([e8cceba](https://github.com/haus23/runde.tips/commit/e8cceba))
- Move loader data loading into hook. ([010aeb9](https://github.com/haus23/runde.tips/commit/010aeb9))
- Move db (and singleton) utilities to utils folder. ([f5f7ac3](https://github.com/haus23/runde.tips/commit/f5f7ac3))
- Move theme related code to utils subfolder. ([27dc08f](https://github.com/haus23/runde.tips/commit/27dc08f))
- Move auth related code to utils subfolder. ([4a594d5](https://github.com/haus23/runde.tips/commit/4a594d5))
- Move firestore and sync code to utils sub folders ([0f771e1](https://github.com/haus23/runde.tips/commit/0f771e1))
- Moved types and schematas to appropriate files. ([ef10d37](https://github.com/haus23/runde.tips/commit/ef10d37))
- Move single use db access functions to file with only usage. ([7b41c56](https://github.com/haus23/runde.tips/commit/7b41c56))

### 🏡 Chore

- **dx:** Enforce more linter rules to track errors. ([f2c0f93](https://github.com/haus23/runde.tips/commit/f2c0f93))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

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
