# Changelog


## v0.1.0-pre.5

[compare changes](https://github.com/haus23/runde.tips/compare/v0.1.0-pre.4...v0.1.0-pre.5)

### 🚀 Enhancements

- Use authenticated user to render navs. Resolves #11 ([#11](https://github.com/haus23/runde.tips/issues/11))
- Install tanstack form lib and start using composed form pattern. Resolves #50 ([#50](https://github.com/haus23/runde.tips/issues/50))
- Make text-field a composed tanstack form field. Resolves #51 ([#51](https://github.com/haus23/runde.tips/issues/51))
- Using the form field. RAC validation works. Resolves #52 ([#52](https://github.com/haus23/runde.tips/issues/52))
- Add server validation. Works. Resolves #54 ([#54](https://github.com/haus23/runde.tips/issues/54))
- Integrate tanstack errors. Resolves #53 ([#53](https://github.com/haus23/runde.tips/issues/53))
- Implement a later requirement. TextField must be controlled in some cases. ([d1c6efe](https://github.com/haus23/runde.tips/commit/d1c6efe))
- Add minimal styling for disabled buttons. ([ef1eb0e](https://github.com/haus23/runde.tips/commit/ef1eb0e))
- Add subscription button. As predicted: resolves #47 ([#47](https://github.com/haus23/runde.tips/issues/47))

### 🩹 Fixes

- Set autocomplete mode. ([d1a8c9a](https://github.com/haus23/runde.tips/commit/d1a8c9a))
- Add custom focus styling. Resolves #41 ([#41](https://github.com/haus23/runde.tips/issues/41))

### 💅 Refactors

- Delegate to change event handler. Works now as controlled input. ([e1df364](https://github.com/haus23/runde.tips/commit/e1df364))
- Move hook files to hooks folder. ([29ea5a9](https://github.com/haus23/runde.tips/commit/29ea5a9))

### 🏡 Chore

- Update deps. ([185964e](https://github.com/haus23/runde.tips/commit/185964e))
- Upgrade vite. ([dab0a3f](https://github.com/haus23/runde.tips/commit/dab0a3f))

## v0.1.0-pre.4

[compare changes](https://github.com/haus23/runde.tips/compare/v0.1.0-pre.3...v0.1.0-pre.4)

### 🚀 Enhancements

- Load authenticated user or null. Fixes #48 as well. ([#48](https://github.com/haus23/runde.tips/issues/48))
- Respect authenticated user in the guards. Resolves #21 ([#21](https://github.com/haus23/runde.tips/issues/21))
- Add players route to better test logout. ([1384fa7](https://github.com/haus23/runde.tips/commit/1384fa7))
- Add logout route. See #10 ([#10](https://github.com/haus23/runde.tips/issues/10))
- Add sidenav variant ([99266d7](https://github.com/haus23/runde.tips/commit/99266d7))
- Add logout actions. Resolves #10 ([#10](https://github.com/haus23/runde.tips/issues/10))

### 💅 Refactors

- Split schema tables and relations into separate files. ([0a2ec86](https://github.com/haus23/runde.tips/commit/0a2ec86))

## v0.1.0-pre.3

[compare changes](https://github.com/haus23/runde.tips/compare/v0.1.0-pre.2...v0.1.0-pre.3)

### 🚀 Enhancements

- Add initial wrapper for otp-input. ([b590cd7](https://github.com/haus23/runde.tips/commit/b590cd7))
- Pass through onComplete event. ([d235443](https://github.com/haus23/runde.tips/commit/d235443))
- Validate submitted TOTP code. Resolves #38 ([#38](https://github.com/haus23/runde.tips/issues/38))
- Create an app session. Persisted for one year after every change. ([124769c](https://github.com/haus23/runde.tips/commit/124769c))
- Implement toaster and toasts. Resolves #30 and closes #42 as well. ([#30](https://github.com/haus23/runde.tips/issues/30), [#42](https://github.com/haus23/runde.tips/issues/42))
- Implement server toasts. Resolves #31 ([#31](https://github.com/haus23/runde.tips/issues/31))
- Redirect to verify with server toast. ([9e03143](https://github.com/haus23/runde.tips/commit/9e03143))
- Restore last auth data - if any. ([20f42b6](https://github.com/haus23/runde.tips/commit/20f42b6))
- Redirect on errors. Resolve #44 ([#44](https://github.com/haus23/runde.tips/issues/44))
- Add session table. ([85c9620](https://github.com/haus23/runde.tips/commit/85c9620))
- Create app session in db. Resolves #40 ([#40](https://github.com/haus23/runde.tips/issues/40))
- Logs the user in and redirects to home. Resolves #39 and resolves ([#39](https://github.com/haus23/runde.tips/issues/39))

### 🩹 Fixes

- Switch default env. Resolves #37 ([#37](https://github.com/haus23/runde.tips/issues/37))
- Use direct connection for migrations. ([6cd811b](https://github.com/haus23/runde.tips/commit/6cd811b))

### 💅 Refactors

- Include schema in drizzle instance to enable queries. ([b3482a6](https://github.com/haus23/runde.tips/commit/b3482a6))
- Finally my first color. Same as browser default for dark mode: rgba(0,0,0,0) ([d05118f](https://github.com/haus23/runde.tips/commit/d05118f))

### 🏡 Chore

- Update react router. ([9b11bd9](https://github.com/haus23/runde.tips/commit/9b11bd9))
- **dx:** Update biome. ([efadb01](https://github.com/haus23/runde.tips/commit/efadb01))
- Update icons ([96daf74](https://github.com/haus23/runde.tips/commit/96daf74))
- Update drizzle-kit. ([eedb07a](https://github.com/haus23/runde.tips/commit/eedb07a))
- Update node typings. ([d6c1089](https://github.com/haus23/runde.tips/commit/d6c1089))

## v0.1.0-pre.2

[compare changes](https://github.com/haus23/runde.tips/compare/v0.1.0-pre.1...v0.1.0-pre.2)

### 🚀 Enhancements

- Create TOTP code. Resolves #25 ([#25](https://github.com/haus23/runde.tips/issues/25))
- Add verify code route. Resolves #4 ([#4](https://github.com/haus23/runde.tips/issues/4))
- Redirect to verify-route after validating email. Resolves #27 ([#27](https://github.com/haus23/runde.tips/issues/27))
- Create auth session. Resolves #3 ([#3](https://github.com/haus23/runde.tips/issues/3))
- Guard the verify route. See #2 ([#2](https://github.com/haus23/runde.tips/issues/2))
- Add verifications table ([0c8165c](https://github.com/haus23/runde.tips/commit/0c8165c))
- Create prisma client. No need for singleton up to now. ([db82823](https://github.com/haus23/runde.tips/commit/db82823))
- Store TOTP metadata in database to make verifying possible. ([25debe0](https://github.com/haus23/runde.tips/commit/25debe0))
- Implement sending TOTP code email. Resolves #26 ([#26](https://github.com/haus23/runde.tips/issues/26))
- Update env vars. ([b56b461](https://github.com/haus23/runde.tips/commit/b56b461))

### 🩹 Fixes

- Use correct package with import. ([00040b6](https://github.com/haus23/runde.tips/commit/00040b6))
- Prepare environments. Resolves #23 ([#23](https://github.com/haus23/runde.tips/issues/23))
- Generate prisma client via postinstall-script. ([f89e94a](https://github.com/haus23/runde.tips/commit/f89e94a))
- Add binary targets for Netlify ([6f19f40](https://github.com/haus23/runde.tips/commit/6f19f40))
- Try workaround. ([65d82ba](https://github.com/haus23/runde.tips/commit/65d82ba))
- Run prisma generate with no-engine flag. ([8eccb46](https://github.com/haus23/runde.tips/commit/8eccb46))
- Rerun the client generation in front of build. ([eeb1a05](https://github.com/haus23/runde.tips/commit/eeb1a05))
- Enable type checking. Resolves #36 ([#36](https://github.com/haus23/runde.tips/issues/36))
- Add missing attempts column. ([02689ee](https://github.com/haus23/runde.tips/commit/02689ee))
- Switch to prisma. Update local dev tooling. Resolves #35 ([#35](https://github.com/haus23/runde.tips/issues/35))
- Remove prisma from build script. ([4fbf494](https://github.com/haus23/runde.tips/commit/4fbf494))
- Remove last trace of prisma. ([ef643a0](https://github.com/haus23/runde.tips/commit/ef643a0))

### 💅 Refactors

- Move generated code to folder outside of app. ([1198425](https://github.com/haus23/runde.tips/commit/1198425))
- Send totp emails during development via resend. ([d519770](https://github.com/haus23/runde.tips/commit/d519770))
- Move schema into app folder. ([15d59d6](https://github.com/haus23/runde.tips/commit/15d59d6))

### 🏡 Chore

- Update tailwindcss ([3ab19d9](https://github.com/haus23/runde.tips/commit/3ab19d9))
- Revert the workaround in last commit. ([7b15fad](https://github.com/haus23/runde.tips/commit/7b15fad))
- Install postgres lib, drizzle orm and kit. ([b2c9a76](https://github.com/haus23/runde.tips/commit/b2c9a76))
- Configure drizzle. ([008e3bd](https://github.com/haus23/runde.tips/commit/008e3bd))
- Add tables for users and verifications. ([1500d6d](https://github.com/haus23/runde.tips/commit/1500d6d))
- **dx:** Prepare staging environment with dev db. ([8cb4a93](https://github.com/haus23/runde.tips/commit/8cb4a93))

## v0.1.0-pre.1

[compare changes](https://github.com/haus23/runde.tips/compare/v0.1.0-pre.0...v0.1.0-pre.1)

### 🚀 Enhancements

- Add minimal input wrapper. Resolves #16 ([#16](https://github.com/haus23/runde.tips/issues/16))
- Add minimal text-field wrapper. Resolves #17 ([#17](https://github.com/haus23/runde.tips/issues/17))
- Add simple form wrapper. Resolves #20 ([#20](https://github.com/haus23/runde.tips/issues/20))
- Add minimal button wrapper. Resolves #18 ([#18](https://github.com/haus23/runde.tips/issues/18))
- Validate env vars. Resolves #22 ([#22](https://github.com/haus23/runde.tips/issues/22))
- Add initial user email validation. ([760bf3f](https://github.com/haus23/runde.tips/commit/760bf3f))
- Add first take on the login form. Validates email. Resolves #24 ([#24](https://github.com/haus23/runde.tips/issues/24))

### 🩹 Fixes

- Increase padding. ([657f483](https://github.com/haus23/runde.tips/commit/657f483))
- Make main full size. ([0b2b2fd](https://github.com/haus23/runde.tips/commit/0b2b2fd))

### 💅 Refactors

- Add some form styling. Could keep client code smaller. ([d3531a5](https://github.com/haus23/runde.tips/commit/d3531a5))

### 🏡 Chore

- Install React Aria Components (RAC). See #13 ([#13](https://github.com/haus23/runde.tips/issues/13))

## v0.1.0-pre.0

[compare changes](https://github.com/haus23/runde.tips/compare/v0.0.4...v0.1.0-pre.0)

### 🚀 Enhancements

- Add login route. Resolves #1 ([#1](https://github.com/haus23/runde.tips/issues/1))
- Implement initial take on route guards. See #2. ([#2](https://github.com/haus23/runde.tips/issues/2))
- Add guards to the routes. See #2 ([#2](https://github.com/haus23/runde.tips/issues/2))

### 💅 Refactors

- Do not hardcode required role. ([3d2e8eb](https://github.com/haus23/runde.tips/commit/3d2e8eb))

### 🏡 Chore

- **dx:** Enforce separated type imports. ([5116104](https://github.com/haus23/runde.tips/commit/5116104))
- Install and configure prisma. ([52c5f71](https://github.com/haus23/runde.tips/commit/52c5f71))
- **dx:** Move generated prisma client into app folder. ([5411a53](https://github.com/haus23/runde.tips/commit/5411a53))
- Add prisma client to build scripts ([cd436ab](https://github.com/haus23/runde.tips/commit/cd436ab))

## v0.0.4

[compare changes](https://github.com/haus23/runde.tips/compare/v0.0.3...v0.0.4)

### 🚀 Enhancements

- Add minimal styling to the link wrappers. ([71a784d](https://github.com/haus23/runde.tips/commit/71a784d))
- Add initial sidebar styling. ([6aa6794](https://github.com/haus23/runde.tips/commit/6aa6794))

### 💅 Refactors

- Drop all(!) color styling for now. ([99b74fa](https://github.com/haus23/runde.tips/commit/99b74fa))

### 🏡 Chore

- **dx:** Add and configure biome. ([d979dd6](https://github.com/haus23/runde.tips/commit/d979dd6))
- **dx:** Add check script and run the script. ([b55406a](https://github.com/haus23/runde.tips/commit/b55406a))
- **dx:** Use sorted tailwind classes. ([d8e31be](https://github.com/haus23/runde.tips/commit/d8e31be))
- **dx:** Add class variance authority tooling. ([3d2ddb6](https://github.com/haus23/runde.tips/commit/3d2ddb6))
- **dx:** Lint sorted classes. ([7458170](https://github.com/haus23/runde.tips/commit/7458170))

## v0.0.3

[compare changes](https://github.com/haus23/runde.tips/compare/v0.0.2...v0.0.3)

### 🚀 Enhancements

- Initial take on color system. ([51cff8e](https://github.com/haus23/runde.tips/commit/51cff8e))
- Add logo component. ([6011cfb](https://github.com/haus23/runde.tips/commit/6011cfb))
- Initial component wrapper, a link. ([3fc7317](https://github.com/haus23/runde.tips/commit/3fc7317))
- Initial take on the nav layout concept. ([a62a947](https://github.com/haus23/runde.tips/commit/a62a947))

### 🏡 Chore

- **dx:** Add path alias. ([7c765ff](https://github.com/haus23/runde.tips/commit/7c765ff))

## v0.0.2

[compare changes](https://github.com/haus23/runde.tips/compare/v0.0.1...v0.0.2)

### 🚀 Enhancements

- Initial take on route structuring. ([d368a82](https://github.com/haus23/runde.tips/commit/d368a82))

### 💅 Refactors

- Use React 19 meta tags. Simplify layout. ([29369c7](https://github.com/haus23/runde.tips/commit/29369c7))

### 🏡 Chore

- **dx:** Add the chrome dev-tools plugin. ([abe9960](https://github.com/haus23/runde.tips/commit/abe9960))
- **dx:** Add tailwindcss. ([42c3bd0](https://github.com/haus23/runde.tips/commit/42c3bd0))

## v0.0.1


### 🏡 Chore

- Create project. Initial commit. ([9c0d3e6](https://github.com/haus23/runde.tips/commit/9c0d3e6))
- Add readme and license. ([6eec716](https://github.com/haus23/runde.tips/commit/6eec716))
- Create initial react router framework app. ([3635dd9](https://github.com/haus23/runde.tips/commit/3635dd9))
- Add build script. ([6474b42](https://github.com/haus23/runde.tips/commit/6474b42))
- Add netlify plugin to build toolchain. ([593c22d](https://github.com/haus23/runde.tips/commit/593c22d))

