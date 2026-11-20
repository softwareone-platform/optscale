---
name: ngui-ui
description: Conventions and values for the optscale FinOps for Cloud frontend (ngui/ui) — the themes/finops vs src boundary and the theme resolver, alias names, script commands, which checks are already red on main, shared component and hook inventory, test provider stack, i18n namespaces and the translation coverage gate. Use whenever a task touches ngui/ui.
---

# ngui/ui — FinOps for Cloud frontend

**The one rule that outranks everything else: a feature goes in `src/`; `src/themes/finops/` holds
only what is this product's own — its look and its copy.**

`src/` is upstream OptScale plus this fork's features (the MFA work), and must build and run with no
theme selected. Upstream arrives as `⚠️ Sync upstream/integration -> main` commits, so in a file
upstream owns, add lines rather than reshaping it. The theme holds style files, locale files and
overrides of upstream files; the Vite `ThemeResolver` plugin redirects imports to them at build time.
See [Theme resolver and the `src/` boundary](#theme-resolver-and-the-src-boundary) for how resolution
behaves, including two traps.

This skill covers the frontend only. The rest of the `optscale` monorepo — the Python services,
`regression-tests/` — is out of its scope. The stack is **React + MUI 5 + tss-react**, tested with
**Vitest**; it uses neither `@swo/design-system` nor `@mpt-extension/sdk`.

## Where the rules live

Repo-local docs that are authoritative on their own topic:

| Doc                                                                                                 | Authoritative on                             |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| [`src/utils/themeResolver/README.md`](../../../src/utils/themeResolver/README.md)                   | How theme override resolution works          |
| [`src/themes/finops/translations/README.md`](../../../src/themes/finops/translations/README.md)     | Locales, draft locales, the coverage gate    |
| [`src/themes/finops/utils/features/README.md`](../../../src/themes/finops/utils/features/README.md) | Theme feature flags                          |
| [`regression-tests/CLAUDE.md`](../../../../../regression-tests/CLAUDE.md)                           | The Playwright visual suite (separate scope) |

## Canonical config — code is truth

Read these before trusting any prose, here or elsewhere:

| File                                              | Generates                                                                                                 |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [`tsconfig.json`](../../../tsconfig.json)         | `baseUrl: "src"` and the alias table                                                                      |
| [`vite.config.mts`](../../../vite.config.mts)     | `ThemeResolver(VITE_APP_THEME)`, `tsconfigPaths()`, Vitest config                                         |
| [`eslint.config.mjs`](../../../eslint.config.mjs) | The `src/` vs `src/themes/finops` lint boundary, **with the reason**                                      |
| [`.prettierrc.cjs`](../../../.prettierrc.cjs)     | `trailingComma: "none"`, `printWidth: 128`, double quotes                                                 |
| `.env`                                            | `VITE_APP_THEME=finops`, `VITE_PROXY`, `VITE_MFA_LOGIN`, ports (gitignored); `.env.sample` documents each |

Two prettier configs exist and differ: [`ngui/.prettierrc.cjs`](../../../../.prettierrc.cjs) sets
`trailingComma: "es5"`, the nested [`.prettierrc.cjs`](../../../.prettierrc.cjs) sets `"none"`. The
nested one wins for everything under `ngui/ui`.

## Path aliases

| Alias      | Resolves to           | Use for                                                                        |
| ---------- | --------------------- | ------------------------------------------------------------------------------ |
| `@theme/*` | `src/themes/finops/*` | Theme files, **from inside the theme only** — `src/` never imports `@theme/…`  |
| `@main/*`  | `src/*`               | Reaching upstream **from inside the theme**                                    |
| bare       | `src/*` (`baseUrl`)   | `components/…`, `utils/…`, `urls`, `hooks/…` — main, subject to theme redirect |

Declared in **two** places that must stay in step:

- [`tsconfig.json`](../../../tsconfig.json) → `compilerOptions.paths` (what `tsc` and the editor see)
- [`vite.config.mts`](../../../vite.config.mts) → `tsconfigPaths()` reads the above, **plus**
  `ThemeResolver`, which rewrites bare imports at resolve time and has no tsconfig equivalent.
  **TypeScript does not know theme overrides exist** — `tsc` checks every bare import against the
  `src/` file, so a prop a feature needs goes on the `src/` component, and on its theme override too.

## Scripts and verification

Run from `ngui/ui/`:

| Command                   | Does                                                                    |
| ------------------------- | ----------------------------------------------------------------------- |
| `pnpm start` / `pnpm dev` | Vite dev server on :3000, proxying `/api` to `VITE_PROXY`               |
| `pnpm build`              | Production build (**the real gate** — see below)                        |
| `pnpm test`               | Vitest watch                                                            |
| `pnpm lint`               | ESLint, `--max-warnings=0` — **`src/themes/finops` only**, see below    |
| `pnpm type:check`         | `tsc --noEmit` (**already red** — see below)                            |
| `pnpm prettier:check`     | Prettier over `src/themes/finops/**`                                    |
| `pnpm translate:validate` | ICU validation + coverage gate + missing-key report                     |
| `pnpm fix`                | `lint:fix` + `translate:sort` + `translate:fix` (**don't** — see below) |
| `pnpm check:all`          | `lint` + `translate:check` + `prettier:check` + `build`                 |

### Handoff chain before calling anything done

```bash
cd ngui/ui
npx vitest run <the spec folders you touched>
pnpm lint                                 # must be clean
npx prettier --write <the files you staged>    # exact command below
pnpm build                                # resolves the theme + lazy page imports
pnpm translate:validate                   # only if you touched translations
```

`pnpm lint` and `pnpm prettier:check` skip `src/` outside the theme, so a file you add or move there is
checked by neither. Lint those files with the ignore lifted, and `npx prettier --check` them by path:

```js
// /tmp/eslint.src.mjs — then: npx eslint --config /tmp/eslint.src.mjs <files>
import config from "<absolute path>/ngui/ui/eslint.config.mjs";
export default config.filter((entry) => !(entry.ignores?.includes("src/*") && Object.keys(entry).length === 1));
```

Only your own files: upstream's keep upstream's formatting.

### Three checks are already failing on `main` — diff, don't chase

Measured 2026-10-19 on a clean tree; `type:check` and `translate:validate` re-measured 2026-11-04 with
the same result. Treat these as the baseline, not as something you broke:

| Check                     | Pre-existing state                                                                                                                                                                       |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm type:check`         | **~15,300 error lines**, ~1,470 of them inside `src/themes/finops`. Not a usable gate. Baseline it before your first edit, then diff — recipe below. Your files must add **zero** lines. |
| `pnpm translate:validate` | 5 coverage failures for `awsUseExternalId` and `regionScope*`. Confirm your keys are absent from the diff.                                                                               |
| `pnpm prettier:check`     | `src/themes/finops/utils/features/README.md` is unformatted. Leave it; don't sweep it into your diff.                                                                                    |

`pnpm build` **is** clean, and is the only check that exercises the theme resolver and the lazy page
imports. Treat a green build as the real signal.

Line numbers shift as you edit, so compare the `tsc` runs without `(line,col)` — a raw `diff` reports
every error below your change as new:

```bash
npx tsc --noEmit > /tmp/tsc-base.txt    # before the first edit
npx tsc --noEmit > /tmp/tsc-after.txt   # when done
diff <(sed -E 's/\([0-9]+,[0-9]+\)//' /tmp/tsc-base.txt | sort -u) \
     <(sed -E 's/\([0-9]+,[0-9]+\)//' /tmp/tsc-after.txt | sort -u) | grep '^>'   # empty = nothing new
```

Running prettier over the whole theme reformats unrelated files, so format only what you staged:

```bash
git diff --cached --name-only --relative --diff-filter=d -- src | grep -E '\.(ts|tsx|json|md)$' | xargs -r npx prettier --write
```

`--relative` turns the monorepo-root paths (`ngui/ui/src/…`) into ones that resolve from `ngui/ui`.
`xargs -r` skips prettier when nothing is staged — a bare `npx prettier --write` with no files waits on
stdin forever. In zsh an unquoted `$FILES` is one argument, so don't collect the list in a variable.

### `translate:sort` rewrites upstream

`pnpm translate:sort` — and `pnpm fix`, which runs it — re-sorts **every** locale file, upstream
`src/translations/**` included, breaking the `src/` boundary in one go. Don't run either; if it happened,
`git checkout -- src/translations`. Add keys by hand instead: the theme locale files don't share one sort
order, so put a new key next to its namespace neighbours in each file and check the file still parses.

### Seeing the mocked API answer

The mocks run inside the dev server's Node SSR loader, which neither Vitest nor `pnpm build` touches —
a mock that imports a browser-only module breaks only here. Drive them on a second dev server:

```bash
npx vite --port 3123 --strictPort &
curl -s -X POST localhost:3123/api/auth/v2/tokens -H 'Content-Type: application/json' \
  -H 'Cookie: finops_mocked_sign_in_scenario=mfa_totp_default' \
  -d '{"email":"finops.ffc@example.com","password":"password"}'   # → 202 challenge
pkill -f "vite --port 3123"
```

Each answer is also logged as `[mocked-api] POST /auth/v2/tokens → 202`. `vite.config.mts` loads
`mockedApiPlugin.ts` without the path aliases, so the plugin may only `import type` from `handlers.ts`,
plus the import-free `src/api/mocked/config.ts` that holds every mock setting.

The mocks answer only while `VITE_MFA_LOGIN=true`; `VITE_MOCKED_API=false` sends the same routes to
`VITE_PROXY` instead. Both are read when the dev server starts — restart it after changing `.env`.

## Repo layout

```
ngui/
├── server/                  # Apollo BFF — GraphQL resolvers over the REST services
└── ui/
    ├── .env                 # VITE_APP_THEME=finops
    ├── vite.config.mts
    └── src/
        ├── …                # MAIN — upstream OptScale plus this fork's features
        │   ├── components/ containers/ pages/ hooks/ utils/ layouts/
        │   ├── api/         # redux-middleware REST actions (apiAction); api/auth/ and api/mocked/ are ours
        │   ├── graphql/__generated__/   # codegen output
        │   ├── tests/       # TestProvider.tsx (upstream), renderWithProviders and friends (ours)
        │   ├── vendor/      # third-party code copied verbatim, ESLint-ignored
        │   └── utils/themeResolver/     # the override plugin
        └── themes/finops/   # THE THEME — styles, locales, overrides of main files
            ├── api/ components/ containers/ contexts/ hooks/
            ├── icons/ layouts/ pages/ shared/ translations/ utils/
            ├── theme.ts theme.features.ts urls.ts
```

A file under `themes/finops/` mirrors the main path it overrides —
`themes/finops/components/Foo/Foo.tsx` replaces `components/Foo/Foo.tsx`. A theme file with no main
counterpart is reachable only through an explicit `@theme/…` import, from another theme file.

**An override replaces the whole main file.** Wiring added to a main file that the theme overrides
(`AuthorizationContainer`, `ProfileMenu`, `HeaderButtons`, `Greeter`, `BaseLayout`, `Dashboard`,
`Settings`, `Button`, `utils/constants`) must be added to the override as well, or the themed app
never runs it.

`themes/finops/shared/` holds fork-only building blocks that aren't overrides — `ResponsiveStack`,
`DividerHorizontal`, `LabelColon`, `DataSourceTagCell`.

`src/api/mocked/` holds every endpoint stand-in, plus `devPanel/` — the dev-only scenario
panel. `components/MockedApiDevPanelSlot` lazy-loads it in development (rendered by `Greeter` and the
signed-in layout) and is the only app code that reaches into `api/mocked/`.

`src/api/auth/` also holds the REST client for the auth service the MFA work talks to directly
(`request.ts`, `errors.ts` with `AuthApiError` and `AUTH_ERROR_CODE`, one folder per resource), beside
upstream's redux files.

`src/vendor/` holds packages that could not be installed — `qrcode-generator`, because
`pnpm add` fails `trustPolicy: no-downgrade` on `chokidar@4.0.3`. Each has a README with its source and
version; swap it for the package once installing works.

### Giving a feature its themed look

The component and a palette-based `Foo.styles.ts` (`theme.palette`, `theme.spacing`) go in `src/`; the
theme adds `themes/finops/components/Foo/Foo.styles.ts` with the `MPT_*` tokens and the same class
names. The component's `./Foo.styles` import is redirected to it. A colour or spacing written inline in
the `.tsx` cannot be overridden — give it a class.

### Replacing an upstream component behind a flag

Leave upstream's file as it is, put the new version in a sibling, and let the folder's `index.ts`
export a third file that picks between them:

```tsx
const MfaAwarePasswordRecovery = () => (useIsMfaLoginEnabled() ? <PasswordRecoveryWithMfa /> : <PasswordRecovery />);
```

A bare import of a main component _from a theme file_ gets main's barrel, which is what still
redirects to a theme override (trap 1 below) — import the folder, not the file, when you want that.

### Adding a page + route

Four touchpoints, all in `src/`:

1. `pages/<Name>/{<Name>.tsx,index.ts}`
2. The path constant in [`urls.ts`](../../../src/urls.ts)
3. `utils/routes/<name>Route.ts` extending `utils/routes/baseRoute`
4. Register it in [`utils/routes/index.ts`](../../../src/utils/routes/index.ts)

A page only this product has goes in `themes/finops/pages/` with its route in
`themes/finops/utils/routes/`, and its name in the page check of the theme's
[`baseRoute.ts`](../../../src/themes/finops/utils/routes/baseRoute.ts) — that is what points the lazy
`import()` at the theme page directory.

Pre-token pages set `isTokenRequired = false` and `layout = null`. Vite builds the dynamic-import
glob at transform time, so **a new page directory needs a dev-server restart**.

## Shared wrappers

No bespoke wrapper layer ships. Compose MUI 5 directly, and reach for these upstream components
before hand-rolling:

| Component                        | Use for                                                                                                          |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `components/forms/common/fields` | `TextInput`, `PasswordInput`, `Selector`, `Checkbox` — react-hook-form bound, render their own validation errors |
| `components/InlineSeverityAlert` | In-page error/info banner; takes `messageId` **xor** `text`                                                      |
| `components/SnackbarAlert`       | Transient toast                                                                                                  |
| `components/ButtonLoader`        | Submit button with a pending state                                                                               |
| `components/Greeter`             | The signed-out two-column shell (login, MFA, registration)                                                       |
| `components/Redirector`          | Conditional `<Navigate>`                                                                                         |
| `components/PageContentWrapper`  | Signed-in page chrome, paired with `components/ActionBar`                                                        |

Components the MFA work built, meant for reuse (`components/…`):

| Component               | Use for                                                                                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AddMfaMethod`          | Choose, set up and confirm a method — the content of the `AddMfaMethodModal` side modal; the caller passes its `MfaEnrollmentCalls`                |
| `MfaMethodIcon`         | A method type's icon, plus `MFA_METHOD_NAME_MESSAGE_ID`                                                                                            |
| `MfaChallengeStep`      | The sign-in MFA screen (`/mfa`); `MfaEnrollmentStep` is the enforced setup (`/mfa-enrollment`)                                                     |
| `LoginChallenge`        | What `/mfa` and `/mfa-enrollment` share: `LoginChallengeScreen`, `useChallengeEnding`, `BackToLoginButton`, `MfaChallengeEnded`, `formatCountdown` |
| `SignInCard`            | A pre-app step as one card on the page background (the invitation screen's look)                                                                   |
| `Button`                | `isLoading`: disabled, spinner in place of the start icon — in main's and in the theme override                                                    |
| `InfoChip`              | The info-coloured chip: "Default", "Already set up"                                                                                                |
| `FullWidthButton`       | The sign-in screens' large, full-width, filled button                                                                                              |
| `MfaMethodTile`         | A method as one bordered tile: picker (radio), code entry, add dialog (button), Security (menu)                                                    |
| `CodeSignIn`            | E-mailed-code sign-in step, success step and `useProceedToApp` for recovery and verification                                                       |
| `MfaSecuritySettings`   | Profile → Security: the methods list, set default, remove                                                                                          |
| `OrganizationMfaPolicy` | Settings → Security: the organization's "Enforce MFA" switch, confirmed in `ChangeMfaEnforcementModal`                                             |
| `MfaSetupPrompt`        | Dismissable home-page nudge for users without MFA                                                                                                  |
| `MockedApiDevPanelSlot` | The dev panel's mount point — see above                                                                                                            |

OptScale has no centred modals: an extra step opens a **side modal**. A class in
`components/SideModalManager/SideModals/` (the MFA ones extend `sideModalBase<Payload>()` for a typed payload) is
opened with `hooks/useOpenTypedSideModal` — the typed wrapper of `useOpenSideModal`. The manager lives in `index.tsx`, so it
works on signed-out pages too, and closes on a route change only. `renderWithProviders` mounts it for specs.

Styling is **tss-react `makeStyles`** in a sibling `*.styles.ts` — not CSS modules, not `styled`.
Use the `sx` prop for one-offs.

## CSS prefix

None. There is no shared class namespace — tss-react generates scoped class names per component.

## Shared hooks

In `themes/finops/hooks/` (overrides and theme-only hooks) and `src/hooks/` (the MFA ones) — browse
the folders for the current list:

| Hook                          | Purpose                                                         |
| ----------------------------- | --------------------------------------------------------------- |
| `useIsFeatureEnabled`         | Theme flag first, then the organization's server-side features  |
| `useAllowedActions`           | Permission checks for a scope                                   |
| `useFetchAndDownload`         | Authenticated file download                                     |
| `useIsMfaLoginEnabled`        | Whether the MFA work is on (`VITE_MFA_LOGIN`)                   |
| `useAsyncCall`                | One-shot API call + its pending flag; what endpoint hooks wrap  |
| `useLoginOptions`             | The sign-in email step — resolves an address's auth methods     |
| `useCreateToken`              | The sign-in password step                                       |
| `useLoginChallenge`           | MFA router state — read, start (`useStartLoginChallenge`), end  |
| `useCompleteSignIn`           | Stores an issued token; shared by every sign-in path            |
| `useSecondsUntil`             | Countdown to a unix timestamp, ticking once a second            |
| `useCompleteLoginChallenge`   | The MFA step's code check                                       |
| `useFinishLoginChallenge`     | Where a passed challenge's token goes — app or back to recovery |
| `useFetchedResource`          | Loading / error / loaded state of one fetch, with `refetch`     |
| `useMfaStatus`                | The signed-in user's MFA status, with `refetch`                 |
| `useOrganizationMfaPolicy`    | Whether the organization enforces MFA; enforce, stop enforcing  |
| `useSignedInMfaEnrollment`    | `AddMfaMethod` calls as the signed-in user                      |
| `useSignedInMfaMethodActions` | Set default / remove a method as the signed-in user             |
| `coreData/useAllDataSources`  | Data-source list from the core-data cache                       |

Upstream hooks worth knowing before writing your own: `useOrganizationInfo`, `useGetToken`,
`useApiState` / `useApiData` (the redux REST layer), `useRoutePath`.

## Shared utils

`themes/finops/utils/` — `layouts.ts` (`MPT_*` colour and spacing tokens), `constants.ts`,
`strings.ts`, `organization.ts`, `analytics.ts`, `fonts.ts`, `types.ts`, `features/themeFeature.ts`,
`menus/mainMenu.tsx`, `routes/`.

Each re-exports its upstream namesake (`export * from "@main/utils/…"`) and adds on top — import
from `@theme/utils/…` to get both.

## Test-utils inventory

**There is no `@testing-library`.** Specs use `createRoot` + `act` from `react-dom/test-utils` and
query with `container.querySelector("[data-test-id='…']")`.

- [`src/tests/TestProvider.tsx`](../../../src/tests/TestProvider.tsx) — redux-mock-store +
  `ThemeProviderWrapper` + `IntlProvider` + `MemoryRouter`. Fine for smoke tests, but it **hardcodes
  `MemoryRouter` with no props**, so you cannot nest a router to seed route state, and it supplies
  neither an Apollo client nor an `alerts` slice.
- Rendering a component that reaches `Greeter` or `ThemeProviderWrapper`: use
  [`tests/renderWithProviders`](../../../src/tests/renderWithProviders.tsx). It
  takes an `initialEntry` (route state included) and the `<Route>` elements, supplies the alerts
  slice, `MockedProvider`, `ThemeProviderWrapper`, `IntlProvider` and `MemoryRouter`, and sets
  `IS_REACT_ACT_ENVIRONMENT`. `ThemeProviderWrapper` pulls organization theme settings through
  Apollo; without `MockedProvider` you get an opaque Apollo `Invariant Violation`.
- `tests/dom` finds and clicks by `data-test-id` across the whole document (portals, side modals);
  `tests/typeInto` types into an input the way React sees it; `tests/LandingPage` and
  `tests/signInFixtures` hold what the sign-in specs share.
- A spec in `src/` that imports `./Foo` runs the theme override of `Foo` when one exists, while `tsc`
  checks it against main's — mock the modules both versions import.
- No shared factory or `mockResponse` util ships. Keep fixtures beside the module under test and
  promote only on the second duplicate.
- Specs are co-located `*.test.ts(x)`. Pure logic is by far the cheapest thing to cover here —
  prefer testing a mock transport or a util over a rendered tree.

## i18n and locales

- **react-intl**, not i18next. `<FormattedMessage id="key" values={{ … }} />` in JSX, `useIntl()`
  for strings. There is no `useFixedT`.
- Key separator is **`:`** for namespaced keys — `signIn:mfaRequiredTitle`,
  `awsAuthenticationTypeAlert:accessKeyP1`. Keys are flat strings, not nested objects.
- Namespaces per locale: `app`, `errors`, `success`, `finops`, `currencies`. English is upstream
  `src/translations/en-US/*.json` **plus** theme `app-override.json` / `finops-override.json`
  (overrides win); every other locale lives wholly in the theme.
- A feature's English keys go in `src/translations/en-US/app.json`, in sorted position (plain
  `Array.sort` order); `app-override.json` is for copy that differs from upstream's.
- **A new English key must be translated in every non-draft locale** (`de-DE`, `fr-FR`, `es-ES`,
  `nl-NL`, `ja-JP`), or
  [`translationCoverage.test.ts`](../../../src/themes/finops/translations/translationCoverage.test.ts)
  fails. `pl-PL` is `draft: true` and exempt. Add new keys in sorted position.
- Draft locales are revealed per-browser with `localStorage.setItem("draftLanguages", "true")`.
- Registry is [`translations/locales.ts`](../../../src/themes/finops/translations/locales.ts);
  `localeManager.ts` is a drop-in replacement for the upstream one and must keep the same public API.

## Theme resolver and the `src/` boundary

`ThemeResolver` hooks Vite's `resolveId`: it resolves an import normally, then, if an equivalent
file exists under `src/themes/finops/`, redirects to it. Two traps that cost real debugging time:

1. **Redirection happens through upstream barrels, not directly.** A theme file importing
   `components/forms/LoginForm` hits upstream's `index.ts`, whose own `import "./LoginForm"` is what
   gets redirected to the theme component. So a theme folder holding only `Foo.tsx` and no
   `index.ts` is still reached — but only via that upstream barrel.
2. **`tsc` is blind to all of it.** A bare import resolves to the override at runtime and is
   typechecked against the main signature, so the two must accept the same props.

**The importer decides.** An import written in a `src/` file is redirected whenever the theme has a
file at the same path; an import written in a theme file never is. So moving a file from the theme to
`src/` changes what its direct-file imports (`hooks/useAllowedActions`, `utils/layouts`) resolve to.

Changing the active theme is `VITE_APP_THEME` in `.env` (currently `finops`; `src/themes/` holds
only that one).

## This repo's answers to the per-project questions

| Question                         | Answer                                                                                                                                                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Package manager                  | `pnpm` 10.33.0, Node 22.16.0, workspace `ngui/{ui,server}`                                                                                                                                                               |
| Where does new code go?          | A feature: `src/`. Its branded styles, non-English copy and anything only this product has: `src/themes/finops/`                                                                                                         |
| Server state                     | Two layers: Apollo GraphQL against `ngui/server` (`graphql/__generated__/hooks/*`) **and** a legacy redux REST middleware (`src/api/*`, `apiAction`). Follow whatever the surrounding feature already uses.              |
| Client state                     | redux + redux-persist; `initialize` in `containers/InitializeContainer/redux` holds the session                                                                                                                          |
| Forms                            | react-hook-form via `components/forms/common/fields`                                                                                                                                                                     |
| Routing                          | react-router-dom 6; route classes in `utils/routes/`, rendered by `components/App`                                                                                                                                       |
| Mocking a not-yet-built endpoint | Served over HTTP by the dev server: `src/api/mocked/` mirroring the real path, bodies as JSON in `api/mocked/responses/`, on with `VITE_MFA_LOGIN=true`, off with `VITE_MOCKED_API=false`                                |
| Feature flags                    | Product switches: [`theme.features.ts`](../../../src/themes/finops/theme.features.ts) + `useIsFeatureEnabled`. The MFA work: `utils/mfaLogin.ts` + `useIsMfaLoginEnabled`, on with `VITE_MFA_LOGIN=true`, off when unset |
| Generated GraphQL types          | Every field is nullable (`data?.token?.token`). Narrow once at the call site, never cast. Apollo runs with the default `errorPolicy: "none"`, so a failed mutation rejects and a resolved one carries `data`.            |

## Git

| Value          | This repo                                                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default branch | **`main`** (not `master`); `integration` tracks upstream, `release/N` for releases                                                                            |
| Remote         | `git@github.com:softwareone-platform/optscale.git`                                                                                                            |
| Tracker key    | `MPT-` (Jira: `softwareone.atlassian.net`)                                                                                                                    |
| Branch shape   | `feature/MPT-12345-kebab-summary`, `fix/MPT-12345-kebab-summary`                                                                                              |
| Commit style   | Mixed, and not parsed. Most of `main` is `MPT-12345 Sentence describing the change`; the MFA feature commits are `feat:`/`fix:`. Match the branch you are on. |
| Merges         | PRs into `main`; upstream arrives as `⚠️ Sync upstream/integration -> main` commits                                                                           |

## Do not touch

| Path                                         | Why                                                                          |
| -------------------------------------------- | ---------------------------------------------------------------------------- |
| Upstream's own lines in `src/**`             | Reformatting or reshaping them turns every upstream sync into a conflict     |
| `src/graphql/__generated__/`                 | codegen output — change `*.graphql` and run `pnpm codegen` from `ngui/`      |
| `src/themes/finops/translations/.missing/`   | Generated gap report, gitignored                                             |
| `build/`, `storybook/`, `node_modules/`      | Build output                                                                 |
| `src/themes/finops/utils/features/README.md` | Already fails `prettier:check` on `main`; reformatting it is diff noise      |
| `src/vendor/`                                | Verbatim third-party copies — replace with the package, don't edit           |
| `src/api/mocked/responses/`                  | Verbatim API captures and TDR bodies — copy new ones in, never generate them |
| `regression-tests/snapshots/*/docker/`       | Reviewed screenshots — regenerate only via `./run_pw.sh -E <env> -u`         |

## Keeping this file honest

Change a script name, alias, locale or shared component in the same commit that changes this file.
The three "already failing" baselines are dated — re-measure rather than trusting the numbers, and
update the date.
