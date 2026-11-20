---
name: ngui-ui
description: Project-specific bindings for the optscale FinOps for Cloud frontend (ngui/ui). Resolves the concrete values the portable skills reference abstractly — the themes/finops vs src boundary and the theme resolver, alias names, script commands, which checks are already red on main, shared component and hook inventory, test provider stack, i18n namespaces and the translation coverage gate. Use whenever a task touches ngui/ui, in combination with frontend-rules, frontend-react, unit-testing, unit-testing-vitest and git-workflow.
---

# ngui/ui — FinOps for Cloud frontend

**The one rule that outranks everything else: write in `src/themes/finops/`, never in `src/`.**

`src/` is upstream OptScale code, kept byte-identical so upstream syncs stay mechanical (see the
`⚠️ Sync upstream/integration -> main` commits). To change upstream behaviour, **copy the file into
the matching path under `src/themes/finops/` and edit the copy** — the Vite `ThemeResolver` plugin
redirects imports to it at build time. See
[Theme resolver and the `src/` boundary](#theme-resolver-and-the-src-boundary) for how resolution
actually behaves, including two traps.

This skill covers the frontend only. The rest of the `optscale` monorepo — the Python services,
`regression-tests/` — is out of its scope.

## Which skills to load

| Task                                | Load alongside this file               |
| ----------------------------------- | -------------------------------------- |
| Any frontend file                   | `frontend-rules`                       |
| A `.tsx`, hook, context or form     | `frontend-rules` + `frontend-react`    |
| Writing or fixing a spec            | `unit-testing` + `unit-testing-vitest` |
| Mock-driven prototype of a new view | `poc-builder`                          |
| Branch, commit or PR                | `git-workflow`                         |

**Do not load** `mpt-frontend-standards`, `mpt-design-system` or `mpt-module-testing`. Those assume
`@swo/design-system` / `@mpt-extension/sdk`; this app is **MUI 5 + tss-react** and imports neither.
`unit-testing-jest` does not apply either — the runner is Vitest.

## Where the rules live

The portable skills carry the rules; this file carries the values. Repo-local docs that are
authoritative on their own topic:

| Doc                                                                                                   | Authoritative on                              |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [`src/utils/themeResolver/README.md`](../../../src/utils/themeResolver/README.md)                     | How theme override resolution works           |
| [`src/themes/finops/translations/README.md`](../../../src/themes/finops/translations/README.md)       | Locales, draft locales, the coverage gate     |
| [`src/themes/finops/utils/features/README.md`](../../../src/themes/finops/utils/features/README.md)   | Theme feature flags                           |
| [`src/themes/finops/api/mocked/README.md`](../../../src/themes/finops/api/mocked/README.md)           | Where mocked endpoints live and the seam rule |
| [`src/themes/finops/api/auth/signIn/README.md`](../../../src/themes/finops/api/auth/signIn/README.md) | The two-step sign-in flow and its two seams   |
| [`regression-tests/CLAUDE.md`](../../../../../regression-tests/CLAUDE.md)                             | The Playwright visual suite (separate scope)  |

## Canonical config — code is truth

Read these before trusting any prose, here or elsewhere:

| File                                              | Generates                                                            |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| [`tsconfig.json`](../../../tsconfig.json)         | `baseUrl: "src"` and the alias table                                 |
| [`vite.config.mts`](../../../vite.config.mts)     | `ThemeResolver(VITE_APP_THEME)`, `tsconfigPaths()`, Vitest config    |
| [`eslint.config.mjs`](../../../eslint.config.mjs) | The `src/` vs `src/themes/finops` lint boundary, **with the reason** |
| [`.prettierrc.cjs`](../../../.prettierrc.cjs)     | `trailingComma: "none"`, `printWidth: 128`, double quotes            |
| `.env`                                            | `VITE_APP_THEME=finops`, `VITE_PROXY`, ports (gitignored)            |

Two prettier configs exist and differ: [`ngui/.prettierrc.cjs`](../../../../.prettierrc.cjs) sets
`trailingComma: "es5"`, the nested [`.prettierrc.cjs`](../../../.prettierrc.cjs) sets `"none"`. The
nested one wins for everything under `ngui/ui`.

## Path aliases

| Alias      | Resolves to           | Use for                                                                            |
| ---------- | --------------------- | ---------------------------------------------------------------------------------- |
| `@theme/*` | `src/themes/finops/*` | Anything this fork owns                                                            |
| `@main/*`  | `src/*`               | Reaching upstream **from inside the theme**                                        |
| bare       | `src/*` (`baseUrl`)   | `components/…`, `utils/…`, `urls`, `hooks/…` — upstream, subject to theme redirect |

Declared in **two** places that must stay in step:

- [`tsconfig.json`](../../../tsconfig.json) → `compilerOptions.paths` (what `tsc` and the editor see)
- [`vite.config.mts`](../../../vite.config.mts) → `tsconfigPaths()` reads the above, **plus**
  `ThemeResolver`, which rewrites bare imports at resolve time and has no tsconfig equivalent.
  **TypeScript does not know theme overrides exist** — which is why a theme component that adds a
  prop must be imported via its explicit `@theme/…` path, or `tsc` typechecks the upstream version.

## Scripts and verification

Run from `ngui/ui/`:

| Command                   | Does                                                      |
| ------------------------- | --------------------------------------------------------- |
| `pnpm start` / `pnpm dev` | Vite dev server on :3000, proxying `/api` to `VITE_PROXY` |
| `pnpm build`              | Production build (**the real gate** — see below)          |
| `pnpm test`               | Vitest watch                                              |
| `pnpm lint`               | ESLint, `--max-warnings=0`                                |
| `pnpm type:check`         | `tsc --noEmit` (**already red** — see below)              |
| `pnpm prettier:check`     | Prettier over `src/themes/finops/**`                      |
| `pnpm translate:validate` | ICU validation + coverage gate + missing-key report       |
| `pnpm fix`                | `lint:fix` + `translate:sort` + `translate:fix`           |
| `pnpm check:all`          | `lint` + `translate:check` + `prettier:check` + `build`   |

### Handoff chain before calling anything done

```bash
cd ngui/ui
npx vitest run src/themes/finops/<area>   # the specs you touched
pnpm lint                                 # must be clean
npx prettier --write 'src/themes/finops/**/*.{ts,tsx,json,md}'
pnpm build                                # resolves the theme + lazy page imports
pnpm translate:validate                   # only if you touched translations
```

### Three checks are already failing on `main` — diff, don't chase

Measured 2026-10-19 on a clean tree. Treat these as the baseline, not as something you broke:

| Check                     | Pre-existing state                                                                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm type:check`         | **~15,300 error lines**, ~1,470 of them inside `src/themes/finops`. Not a usable gate. Baseline it (`npx tsc --noEmit > /tmp/tsc-base.txt` on a clean tree), then confirm your files contribute **zero** new lines. |
| `pnpm translate:validate` | 5 coverage failures for `awsUseExternalId` and `regionScope*`. Confirm your keys are absent from the diff.                                                                                                          |
| `pnpm prettier:check`     | `src/themes/finops/utils/features/README.md` is unformatted. Leave it; don't sweep it into your diff.                                                                                                               |

`pnpm build` **is** clean, and is the only check that exercises the theme resolver and the lazy page
imports. Treat a green build as the real signal.

Running prettier over the whole theme reformats unrelated files. Pass explicit paths, or
`git checkout --` the collateral before committing.

## Repo layout

```
ngui/
├── server/                  # Apollo BFF — GraphQL resolvers over the REST services
└── ui/
    ├── .env                 # VITE_APP_THEME=finops
    ├── vite.config.mts
    └── src/
        ├── …                # UPSTREAM — read freely, never edit
        │   ├── components/ containers/ pages/ hooks/ utils/ layouts/
        │   ├── api/         # redux-middleware REST actions (apiAction)
        │   ├── graphql/__generated__/   # codegen output
        │   ├── tests/TestProvider.tsx
        │   └── utils/themeResolver/     # the override plugin
        └── themes/finops/   # THIS FORK'S CODE — everything you write
            ├── api/ components/ containers/ contexts/ hooks/
            ├── icons/ layouts/ pages/ shared/ translations/ utils/
            ├── theme.ts theme.features.ts urls.ts
```

A file under `themes/finops/` mirrors the upstream path it overrides —
`themes/finops/components/Foo/Foo.tsx` replaces `components/Foo/Foo.tsx`. Files with no upstream
counterpart (new work) are reachable only through an explicit `@theme/…` import.

`themes/finops/shared/` holds fork-only building blocks that aren't overrides — `ResponsiveStack`,
`DividerHorizontal`, `LabelColon`, `DataSourceTagCell`.

### Adding a page + route

Four touchpoints, all in the theme:

1. `themes/finops/pages/<Name>/{<Name>.tsx,index.ts}`
2. The path constant in [`themes/finops/urls.ts`](../../../src/themes/finops/urls.ts)
3. `themes/finops/utils/routes/<name>Route.ts` extending `@theme/utils/routes/baseRoute`
4. Register it in [`themes/finops/utils/routes/index.ts`](../../../src/themes/finops/utils/routes/index.ts),
   **and add the page name to `THEME_PAGES`** in
   [`baseRoute.ts`](../../../src/themes/finops/utils/routes/baseRoute.ts) — that set is what points
   the lazy `import()` at the theme page directory instead of upstream's.

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

Styling is **tss-react `makeStyles`** in a sibling `*.styles.ts` — not CSS modules, not `styled`.
Use the `sx` prop for one-offs.

## CSS prefix

None. There is no shared class namespace — tss-react generates scoped class names per component.

## Shared hooks

In `themes/finops/hooks/` — browse the folder for the current list:

| Hook                         | Purpose                                                        |
| ---------------------------- | -------------------------------------------------------------- |
| `useIsFeatureEnabled`        | Theme flag first, then the organization's server-side features |
| `useAllowedActions`          | Permission checks for a scope                                  |
| `useFetchAndDownload`        | Authenticated file download                                    |
| `useAsyncCall`               | One-shot API call + its pending flag; what endpoint hooks wrap |
| `useLoginOptions`            | The sign-in email step — resolves an address's auth methods    |
| `useCreateToken`             | The sign-in password step                                      |
| `useLoginChallenge`          | Reads the MFA challenge out of router state                    |
| `coreData/useAllDataSources` | Data-source list from the core-data cache                      |

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
- Rendering a theme component that reaches `Greeter` or `ThemeProviderWrapper` needs a local
  provider stack: `Provider store={mockStore({ [ALERTS]: {} })}` → `MockedProvider` (from
  `@apollo/client/testing`) → `ThemeProviderWrapper` → `IntlProvider` → `MemoryRouter initialEntries`.
  Working example:
  [`LoginChallengeStep.test.tsx`](../../../src/themes/finops/components/LoginChallengeStep/LoginChallengeStep.test.tsx).
  `ThemeProviderWrapper` pulls organization theme settings through Apollo; without `MockedProvider`
  you get an opaque Apollo `Invariant Violation`.
- Set `globalThis.IS_REACT_ACT_ENVIRONMENT = true` at the top of a render spec, or React 18 floods
  the output with act() warnings.
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
2. **`tsc` is blind to all of it.** When a theme override widens a component's props, import it by
   its explicit `@theme/components/.../Foo` path. Importing it bare resolves correctly at runtime
   and fails typecheck against the upstream signature.

The `@main/` prefix is a readability convention meaning "I mean upstream"; it is not a hard guard,
because the plugin's own anti-recursion checks compare against `themes/finops/` while the paths it
sees are prefixed `src/`.

Changing the active theme is `VITE_APP_THEME` in `.env` (currently `finops`; `src/themes/` holds
only that one).

## This repo's answers to the per-project questions

| Question                         | Answer                                                                                                                                                                                                      |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Package manager                  | `pnpm` 10.33.0, Node 22.16.0, workspace `ngui/{ui,server}`                                                                                                                                                  |
| Where does new code go?          | `src/themes/finops/` — always                                                                                                                                                                               |
| Server state                     | Two layers: Apollo GraphQL against `ngui/server` (`graphql/__generated__/hooks/*`) **and** a legacy redux REST middleware (`src/api/*`, `apiAction`). Follow whatever the surrounding feature already uses. |
| Client state                     | redux + redux-persist; `initialize` in `containers/InitializeContainer/redux` holds the session                                                                                                             |
| Forms                            | react-hook-form via `components/forms/common/fields`                                                                                                                                                        |
| Routing                          | react-router-dom 6; route classes in `utils/routes/`, rendered by `components/App`                                                                                                                          |
| Mocking a not-yet-built endpoint | The mock goes in [`api/mocked/`](../../../src/themes/finops/api/mocked/README.md) mirroring the real path; the real `api/` module keeps the contract and a one-line swap seam                               |
| Feature flags                    | [`theme.features.ts`](../../../src/themes/finops/theme.features.ts) + `useIsFeatureEnabled`                                                                                                                 |

## Git

| Value          | This repo                                                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default branch | **`main`** (not `master`); `integration` tracks upstream, `release/N` for releases                                                                              |
| Remote         | `git@github.com:softwareone-platform/optscale.git`                                                                                                              |
| Tracker key    | `MPT-` (Jira: `softwareone.atlassian.net`)                                                                                                                      |
| Branch shape   | `feature/MPT-12345-kebab-summary`, `fix/MPT-12345-kebab-summary`                                                                                                |
| Commit style   | `MPT-12345 Sentence describing the change` — **not** Conventional Commits, and not parsed. A few `feat:`/`fix:` commits exist; follow the dominant `MPT-` form. |
| Merges         | PRs into `main`; upstream arrives as `⚠️ Sync upstream/integration -> main` commits                                                                             |

Never run `git commit` yourself — stage only your own paths and hand the message over.

## Do not touch

| Path                                         | Why                                                                              |
| -------------------------------------------- | -------------------------------------------------------------------------------- |
| `src/**` outside `src/themes/`               | Upstream, kept byte-identical for mechanical syncs. Copy into the theme instead. |
| `src/graphql/__generated__/`                 | codegen output — change `*.graphql` and run `pnpm codegen` from `ngui/`          |
| `src/themes/finops/translations/.missing/`   | Generated gap report, gitignored                                                 |
| `build/`, `storybook/`, `node_modules/`      | Build output                                                                     |
| `src/themes/finops/utils/features/README.md` | Already fails `prettier:check` on `main`; reformatting it is diff noise          |
| `regression-tests/snapshots/*/docker/`       | Reviewed screenshots — regenerate only via `./run_pw.sh -E <env> -u`             |

## Keeping this file honest

Change a script name, alias, locale or shared component in the same commit that changes this file.
The three "already failing" baselines are dated — re-measure rather than trusting the numbers, and
update the date. Verify with:

```bash
node ~/.claude/validate-skills.mjs ngui/ui/.claude/skills
```
