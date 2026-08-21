# OptScale Regression Tests

Visual regression tests for the OptScale UI, using [Playwright](https://playwright.dev/) screenshot comparison.

## Overview

These tests capture screenshots of key UI components and compare them against stored reference screenshots, ensuring visual consistency across releases.

They run under the Playwright project **`FFC`** (FinOps for Cloud), so every reported line reads
`[FFC] › <area> › <scenario>`. Coverage:

- Homepage
- Cloud Accounts
- Expenses
- Events
- Policies
- Pools
- Recommendations
- Resources
- Settings
- Users
- Common UI (header, navigation)

---

## Prerequisites

- **Node.js 20+** (Playwright 1.56 requires ≥ 18; the project's `@types/node` targets 22).
- A running OptScale instance, or a remote URL the tests can reach.
- **Docker** — only needed for `npm run test:docker[:update]` (used to produce the committed screenshots). Local headless runs don't need it.
- **On Windows: Git Bash** (bundled with Git for Windows). `run_pw.sh` is a bash script, and the npm scripts hand it to Git Bash rather than WSL's — inside WSL the container would resolve the host and networking differently. Everything else works from PowerShell.

---

## Setup

### Install dependencies

```bash
npm install
```

`npm install` runs a `postinstall` hook that downloads the Playwright-bundled **Chromium** browser. To re-install or update it manually:

```bash
npx playwright install chromium
```

### Configure environment

```bash
cp .env.example .env
```

Edit `.env` with the appropriate values. The complete list of variables the suite reads lives in [`utils/env.ts`](./utils/env.ts):

| Variable                   | Required? | Description                                                                                                                                                                                                                                                                                        |
| -------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TEST_ENV`                 | no        | Environment preset selecting the base + API URLs: `local` (default) \| `dev` \| `prerelease` \| `staging` \| `prod`. See [Environments](#environments).                                                                                                                                            |
| `BASE_URL_OVERRIDE`        | no        | Overrides the preset's portal URL Playwright points at (CI or ad-hoc runs). Does **not** change which screenshots are compared against — those follow `TEST_ENV`.                                                                                                                                  |
| `API_BASE_URL_OVERRIDE`    | no        | Overrides the preset's cluster URL for proxied API requests — same concept as `VITE_PROXY` in `ngui/ui/.env.sample`.                                                                                                                                                                               |
| `TEST_ACCOUNT_TOKEN_<ENV>` | yes¹      | Per-environment test-account bearer token, sent in the `X-LiveDemo-Token` header — e.g. `TEST_ACCOUNT_TOKEN_PRERELEASE`. `local` and `dev` share `TEST_ACCOUNT_TOKEN_DEV`. There is no shared fallback: each environment reads only its own variable, named in [`env.config.ts`](./env.config.ts). |
| `CI`                       | no        | `true` inside CI — enables `forbidOnly`, raises retries, lowers workers. Playwright sets this automatically.                                                                                                                                                                                       |
| `PW_WORKERS`               | no        | Worker count for CI runs (default `2`). Local runs ignore it and use half the machine's cores, capped at 3 — the dev server, not the CPU, is the limit.                                                                                                                                            |
| `SNAPSHOT_ENV`             | no        | Compare against another environment's screenshots (`dev` \| `prerelease` \| `staging` \| `prod`). Defaults to the environment under test. Moves **only** the screenshots — the token and cached session stay with `TEST_ENV`. Intended as a per-run flag, not a `.env` entry.                      |
| `IGNORE_HTTPS_ERRORS`      | no        | `true` to accept self-signed / expired certificates in the browser context.                                                                                                                                                                                                                        |
| `DEBUG_LOG`                | no        | `true` emits `[DEBUG]`-prefixed messages from `debugLog`.                                                                                                                                                                                                                                          |
| `BROWSER_ERROR_LOGGING`    | no        | `true` forwards browser `console.error` output to the Node test runner.                                                                                                                                                                                                                            |

¹ Required only when `auth.setup.ts` actually mints test-account credentials. `requireEnv('apiBaseUrl', 'testAccountToken')` fails fast with a clear message naming the exact variable, e.g. `Missing required env var: TEST_ACCOUNT_TOKEN_PROD`.

---

## Environments

`TEST_ENV` selects an entry from [`env.config.ts`](./env.config.ts) — the single place where every environment is defined: portal URL, API URL, and the name of the `.env` variable holding its token. Adding an environment means adding one entry there plus its token to `.env`.

Each entry carries a **key** that decides which token, cached session and snapshot folder the run uses — `local` and `dev` share the key `dev`, because they exercise the same deployment and therefore expect the same pixels.

Definitions are checked twice. The **types** allow only a known `key`, a `tokenVar` drawn from `TEST_ACCOUNT_TOKEN_<KEY>`, and `https://` URLs — `http://` is accepted only under the `dev` key, which serves the UI from localhost. The **same rules are re-checked at import time**, before Playwright starts, because the runner transpiles without typechecking; that pass also enforces URL format (bare origin, no trailing slash) and the shared-key invariant, since environments under one key compare against the same screenshots and must therefore call the same API and read the same token.

`BASE_URL_OVERRIDE` / `API_BASE_URL_OVERRIDE` are held to the URL format but deliberately not to the `https://` rule, so pointing a run at a locally served UI (`./run_pw.sh -E prerelease -H`) still works.

| `TEST_ENV`   | Portal URL                              | API URL                              | Key          | Screenshots             |
| ------------ | --------------------------------------- | ------------------------------------ | ------------ | ----------------------- |
| `local`      | `http://localhost:3000`                 | `https://api.finops.s1.today`        | `dev`        | `snapshots/dev/`        |
| `dev`        | `https://portal.finops.s1.today`        | `https://api.finops.s1.today`        | `dev`        | `snapshots/dev/`        |
| `prerelease` | `https://portal.finops.s1.show`         | `https://api.finops.s1.show`         | `prerelease` | `snapshots/prerelease/` |
| `staging`    | `https://portal.finops.s1.live`         | `https://api.finops.s1.live`         | `staging`    | `snapshots/staging/`    |
| `prod`       | `https://portal.finops.softwareone.com` | `https://api.finops.softwareone.com` | `prod`       | `snapshots/prod/`       |

Each key needs its own token in `.env` — `TEST_ACCOUNT_TOKEN_DEV`, `TEST_ACCOUNT_TOKEN_PRERELEASE`, `TEST_ACCOUNT_TOKEN_STAGING`, `TEST_ACCOUNT_TOKEN_PROD`. There is deliberately no shared fallback, so a missing token fails fast instead of authenticating against the wrong deployment. CI must therefore inject the variable for whichever environment it targets.

Pick an environment per run:

```bash
npm run test:prerelease                  # one-off, overrides whatever .env says
npm run test:prod -- --headed            # extra Playwright flags pass straight through
./run_pw.sh -E staging -u                # regenerate that env's screenshots in Docker
```

Or set `TEST_ENV` in `.env` to change the default for every run. If you'd rather be asked than memorise flags, `npm run test:pick` prompts for the environment, the baselines and the run mode, warns when the two imply different clusters, and prints the equivalent command before running it.

### Checking a build against another environment's screenshots

`SNAPSHOT_ENV` (or `-S` in the Docker runner) decouples the screenshots from the environment under test — useful for asking "does my local build still match what prerelease looks like?":

```bash
./run_pw.sh -E prerelease -S dev -H
```

That authenticates against prerelease, points the browser at your local UI, and compares against `snapshots/dev/docker/`. Only the screenshots move: the token and cached session stay with `TEST_ENV`, because those decide which cluster the run can log into at all. Bear in mind that differences between two deployments' data will show up as pixel diffs, so treat the result as a starting point rather than a verdict.

> Running against `prod` mints a test account through `POST /restapi/v2/live_demo` on production. That is a real write to a live system — make sure that is intended.

---

## Running Tests

| Command                      | Description                                                          |
| ---------------------------- | -------------------------------------------------------------------- |
| `npm run test:pick`          | **Interactive picker** — choose environment, baselines and run mode  |
| `npm test`                   | Run all tests headless locally                                       |
| `npm run test:ui`            | Run with the Playwright interactive UI                               |
| `npm run test:headed`        | Run in headed mode (single worker)                                   |
| `npm run test:update`        | Re-generate local snapshots                                          |
| `npm run snapshots:prune`    | Report (or `--delete`) screenshots the committed set no longer names |
| `npm run test:local`         | Run against `localhost:3000` (dev baselines)                         |
| `npm run test:dev`           | Run against `portal.finops.s1.today`                                 |
| `npm run test:prerelease`    | Run against `portal.finops.s1.show`                                  |
| `npm run test:staging`       | Run against `portal.finops.s1.live`                                  |
| `npm run test:prod`          | Run against `portal.finops.softwareone.com`                          |
| `npm run test:docker`        | Run inside Docker (Linux) against whatever `TEST_ENV` selects        |
| `npm run test:docker:update` | Same, updating that environment's baselines                          |
| `npm run report`             | Open the last HTML report                                            |
| `npm run install:browser`    | (Re-)install the Playwright-bundled Chromium browser                 |
| `npm run lint`               | Lint all TypeScript files                                            |
| `npm run lint:fix`           | Lint and auto-fix issues                                             |
| `npm run format`             | Format all files with Prettier                                       |
| `npm run format:check`       | Check formatting without writing                                     |

### Docker runs, per environment

There are no per-environment npm scripts: the executables take an environment directly, which is
shorter than an `npm run` alias and composes without an argument separator.

| Command                                   | What it does                                               |
| ----------------------------------------- | ---------------------------------------------------------- |
| `./run_pw.sh -E dev`                      | Compare against `dev`'s committed baselines                |
| `./run_pw.sh -E dev -u`                   | Regenerate them                                            |
| `./run_pw.sh -E dev tests/pools.spec.ts`  | One spec, against `dev`                                    |
| `./run_pw.sh -E local -H`                 | A locally served build, against `dev`'s baselines          |
| `./scripts/pick-test.mjs`                 | The interactive picker, which prints the command it builds |
| `./scripts/env-config.mjs dev apiBaseUrl` | Resolve one field from the environment table               |

Each environment is its own baseline set, so covering several means running each one — there is no
"all environments" entry point:

```bash
for e in dev prerelease staging; do ./run_pw.sh -E "$e" || echo "FAILED: $e"; done
```

`prod` is absent from that list because `snapshots/prod/` doesn't exist yet, so its first run must be
a reviewed `./run_pw.sh -E prod -u`. `local` is absent because it shares `dev`'s baselines and serves
the UI from the host.

### Docker runner (`run_pw.sh`)

The shell script `run_pw.sh` builds and runs a Linux Docker container to produce platform-independent snapshots. Key flags:

```
-c, --config FILE     Use an alternate Playwright config file (default playwright.config.ts)
-u, --update          Update baseline screenshots
-E, --env NAME        Environment preset (local | dev | prerelease | staging | prod).
                      Uses that preset's URLs and its snapshots/<env>/docker folder.
                      `local` serves the UI from the host, so pair it with -H or -U.
-S, --snapshots KEY   Compare against another environment's baselines
                      (dev | prerelease | staging | prod). Moves only the
                      screenshots; the token and session stay with -E.
-H, --host-app        The app is served from your machine, not the container.
                      Resolves the host gateway for you (port from -p).
-U, --url URL         Override BASE_URL. Cannot be combined with -a.
-p, --port PORT       Host port the app is served on (default 3000)
-a, --run-application API_ENDPOINT
                      Build and serve ngui in a container pointing at API_ENDPOINT, wait
                      until it answers, run the tests, then remove it. For CI, where
                      nothing is serving the app yet.
-k, --keep-running    Leave that container up after the tests finish.
-i, --ci              Set CI=true inside the container
```

Trailing arguments go to `playwright test`; Playwright's own flags go after `--`. Unknown _options_
are rejected before the container starts, so a typo fails fast.

### Testing a UI served from your machine

This suite doesn't build or serve the app — that's ngui's job. Start it however you normally would,
then point a run at it with `-H`, which resolves the container's host gateway for you:

```bash
cd ngui/ui && npm start -- --host        # dev server, reachable from a container
```

**`--host` is required for container runs.** Vite binds loopback only by default
(`host: parseViteHost(VITE_HOST)` in `vite.config.mts`, which is `false` when `VITE_HOST` is unset),
so `localhost:3000` answers from your machine while the test container gets
`net::ERR_CONNECTION_REFUSED at http://host.docker.internal:3000`. Setting `VITE_HOST=true` in
`ngui/ui/.env` has the same effect. `test:pick` checks for this and refuses to start a container run
against a loopback-only server. A `--host` server prints a `Network:` line in its banner; without one
it's loopback-only.

Alternatively use [`ngui/docker-compose.yml`](../ngui/docker-compose.yml) for a built image, which
publishes the port and so is reachable either way:

```bash
./run_pw.sh -E local -H          # localhost:3000, compared against dev's baselines
./run_pw.sh -E prerelease -H     # a local build, against prerelease's cluster and baselines
```

For the second form the account is minted on the remote cluster, so your dev server has to proxy
there too (`VITE_PROXY` in `ngui/ui/.env`) — otherwise login is rejected and every test lands on
`/login`.

### Letting the runner serve the app (`-a`, for CI)

Where nothing is serving the app yet — a CI job on a fresh checkout — `-a` builds ngui, publishes it
on `-p` (default 3000), waits until it answers, runs the tests, then removes it:

```bash
./run_pw.sh -a https://api.finops.s1.today                      # serve, test, tear down
./run_pw.sh -a https://api.finops.s1.today -k                   # leave it up afterwards
./run_pw.sh -a https://api.finops.s1.today -p 4200 -i           # other port, CI=true inside
```

The teardown runs from an `EXIT` trap, so a failed build or a Ctrl-C doesn't leave the container
behind; `-k` opts out and prints the command to remove it yourself. The readiness check is bounded
(90s) and uses `curl -sf`, so an error page doesn't count as ready and a container that never serves
fails with its logs instead of hanging. `-a` and `-U` are mutually exclusive, since `-a` decides the
URL itself.

Note the two URLs in play: readiness is checked from _this_ machine on `http://localhost:$PORT`,
while the tests reach the same app from inside the test container via the host gateway
(`http://host.docker.internal:$PORT` on macOS). Both are reported when the app comes up.

### Reading the environment table (`scripts/env-config.mjs`)

One reader for [`env.config.ts`](./env.config.ts), shared with `test:pick` so the menu and any script
resolve environments from the same source. It works as a CLI too:

```bash
./scripts/env-config.mjs staging apiBaseUrl   # https://api.finops.s1.live
./scripts/env-config.mjs dev tokenVar         # TEST_ACCOUNT_TOKEN_DEV
```

---

## Project Structure

```
regression-tests/
├── tests/                          # Test specs — auto-discovered by Playwright (`testMatch` in `playwright.config.ts`)
│   └── *.spec.ts                   # One file per feature area
│
├── pages/                          # Page Object Models (POM)
│   ├── base-page.ts                # Abstract base class: navigation, waitForLoad, shared locators
│   ├── layout-components.ts        # Header, sidebar and other shared layout elements
│   ├── policy-pages.ts             # Shared template for Anomalies / Policies / Tagging Policies list & create pages
│   ├── index.ts                    # Barrel — every class re-exported here becomes a typed `<className>` fixture
│   └── *.page.ts / *-pages.ts      # One file per feature; re-export from `index.ts` to auto-register
│
├── fixtures/                       # Playwright custom fixtures
│   ├── build-fixtures.ts           # Generic helpers: turn `pages/index.ts` into typed fixture factories
│   └── page.fixture.ts             # `test` export — wires page objects + options (restoreSession, interceptAPI, …) into every spec
│
├── mocks/                          # Static API mock data used for route interceptions
│   ├── constants.ts                # Constants shared across mocks (the `e2e()` marker helper)
│   ├── index.ts                    # Barrel re-exports every `*Interceptions` array
│   └── *.mocks.ts                  # Per-feature payloads + exported `<feature>Interceptions: InterceptionEntry[]`
│
├── setup/
│   ├── auth.setup.ts               # Authenticates once and stores session state for all tests
│   └── test-account-service.ts     # `TestAccountService` — mints test-account credentials via `/restapi/v2/live_demo`
│
├── styles/
│   ├── pre-screenshot-styles.css   # CSS injected before screenshots to ensure pixel-identical rendering
│   └── test-overrides.css          # CSS injected on page load to hide noisy/unstable UI elements
│
├── utils/
│   ├── debug-logging.ts            # `debugLog` / `errorLog` + `attachBrowserErrorLogging`, gated by env flags
│   ├── test-account-session.ts     # Injects localforage, restores the cached test-account session
│   ├── env.ts                      # Reads `process.env.*` (presets from `env.config.ts`) + `requireEnv(...)` validator
│   ├── file.ts                     # `safeReadJsonFile<T>` / `safeWriteJsonFile` helpers
│   ├── interceptor.ts              # Route interception implementation (REST + GraphQL mock routing)
│   ├── screenshots.ts              # `captureScreenshot` helper
│   └── viewport.ts                 # `fitViewportToFullPage` — resizes viewport to fit full `<main>` content
│
├── types/
│   ├── api-response.types.ts       # Typed API response shapes
│   ├── storage.ts                  # `StoredTestAccountSession` — cached session shape on disk
│   ├── interceptor.types.ts        # `InterceptionEntry` (GraphQL/REST mock-route entry)
│   └── index.ts                    # Barrel re-export
│
├── vendor/
│   └── localforage.min.js          # Third-party script injected into the page to mirror app session storage
│
├── snapshots/
│   └── <env>/                      # One folder per environment key
│       ├── docker/                # ✅ Committed — produced in the container
│       └── <platform>/            # ❌ Gitignored — your machine's own set
│
├── docker/
│   ├── Dockerfile.linux            # Linux image used to produce cross-platform baseline snapshots
│   └── ngui-container.sh           # Building and serving the app for `run_pw.sh -a`
│
├── scripts/
│   ├── dev-server.mjs              # The locally served UI: is it reachable, and starting one
│   ├── env-config.mjs              # Single reader for env.config.ts, shared by the picker and shell
│   ├── pick-test.mjs               # `npm run test:pick` — interactive environment/baseline picker
│   ├── platform/                   # Host differences, one file per OS + an index that picks
│   ├── prompt.mjs                  # Console prompting, including the non-interactive path
│   ├── prune-snapshots.mjs         # `npm run snapshots:prune` — screenshots the committed set no longer names
│   ├── runners/                    # One file per place a run happens — docker.mjs, this-machine.mjs
│   ├── run-pw.mjs                  # `npm run test:docker` — runs run_pw.sh on either platform
│   └── snapshots.mjs               # Which screenshots a run compares against, and the warnings
│
├── env.config.ts                   # Environment definitions — URLs + token variable per TEST_ENV
├── playwright.config.ts            # Playwright configuration (timeouts, projects, snapshot paths)
├── run_pw.sh                       # Docker runner script for baseline snapshot generation
├── eslint.config.mjs               # ESLint config (playwright plugin + TypeScript rules)
├── tsconfig.json
├── package.json
└── .env.example                    # Environment variable template
```

---

## Snapshots

Screenshots live at **`snapshots/<env>/<renderer>/`**.

| Folder                           | Produced by                                                  | Committed          |
| -------------------------------- | ------------------------------------------------------------ | ------------------ |
| `snapshots/<env>/docker/`        | `npm run test:docker` / `./run_pw.sh` — inside the container | ✅ Yes             |
| `snapshots/<env>/darwin/` (etc.) | a local run on your machine                                  | ❌ No (gitignored) |

`<env>` is the preset's key (see [Environments](#environments)), so every environment keeps its own expected pixels and `local` + `dev` share one.

`<renderer>` is whatever produced the images: `docker` in the container, otherwise your platform (`darwin`, `win32`, `linux`). Text rasterises differently on each — a macOS run differs from the container's by roughly 1 % of pixels on a typical page — so images are only comparable against ones made the same way. Encoding that in the path makes a cross-platform comparison impossible rather than merely inadvisable, and there is nothing to configure: run in Docker and you compare against the committed screenshots, run locally and you compare against your own.

The container's output is canonical because it is reproducible: fixed image, fixed fonts, and rendering flags that disable the GPU, font hinting and subpixel anti-aliasing. That is what CI compares against.

To regenerate your own screenshots (development only):

```bash
npm run test:update
```

To regenerate the committed ones:

```bash
npm run test:docker:update              # whatever TEST_ENV .env selects
./run_pw.sh -E prerelease -u            # a specific environment
./run_pw.sh -E prerelease -u tests/pools.spec.ts   # one spec in that environment
```

Each environment is a separate baseline set, so a change that shifts pixels needs the compare/update
cycle repeated per environment — there is no "update everything" switch:

```bash
for e in dev prerelease staging; do ./run_pw.sh -E "$e"; done     # see what moved
for e in dev prerelease staging; do ./run_pw.sh -E "$e" -u; done  # then accept it
```

Run the compare pass first. `-u` cannot fail: it overwrites whatever it renders, so running it
blind will absorb unintended drift into the committed set and leave no trace of what changed.

A container run **fails** on a screenshot that doesn't exist yet rather than creating it, so the committed set only ever grows through an explicit `--update-snapshots` that someone reviews. This is enforced by checking for the file before comparing: Playwright writes a missing image whenever it compares — even under `CI`, and even if the resulting error is caught — so the only way to prevent it is not to compare.

Locally, Playwright's normal loop applies: the first run writes the image and fails the test, the next run passes.

### Missing and unused screenshots

Some screenshot names are only known while a test runs (`Recommendations-Card--<title>.png` comes from
the cards the page renders), so there is no static list of them. `snapshots/<env>/docker/` is used as
that list instead: it is the reviewed set, so whatever it holds is what a run is expected to compare.

`npm run test:pick` diffs your target folder against it before asking whether to run, because the two
directions fail differently and neither is loud during a run:

- **Missing locally** — a local run captures the image from the app as it is now and compares nothing.
  A screenshot you never generated therefore _passes_, which is the case worth being told about.
- **Missing in the container** — the run fails on the first one. Cross-checking against an environment
  with fewer committed screenshots (`-S`) is the usual way to hit this.

Files in your own renderer folder that the committed set doesn't name are what a rename or a deleted
spec leaves behind. They cost nothing but never fail either, so nothing surfaces them:

```bash
npm run snapshots:prune                       # report, every environment, your platform's folder
npm run snapshots:prune -- --env dev          # one environment
npm run snapshots:prune -- --delete           # actually remove them
```

Reporting is the default and `--delete` is the only thing that removes a file. The committed
`docker` folders are refused outright — deleting one of those is a `git rm` that a reviewer sees.

---

## Naming

### Test titles

`describe` names the area, `test` names the scenario, so a report reads `[FFC] › Expenses › breakdowns`. The `describe`
is also what scopes `test.use`, so an area with three mock sets is three `describe('Expenses')` blocks rather than one —
that repetition is deliberate and the reported titles still group correctly.

Areas are title-case and match the spec filename (`Cloud accounts` ↔ `cloud-accounts.spec.ts`). Scenarios are sentence
case (`list page`, `connect — AWS`, `snackbar — pending invitation`). Don't prefix titles with the product name — the
`FFC` project in `playwright.config.ts` already supplies it once, for every test. The project name is free to change:
`snapshotPathTemplate` doesn't include `{projectName}`, so it never moves a baseline.

### Screenshot names

`<Feature>-<Area>[--<Variant>].png`, one grammar, three slots:

| Slot      | Holds                                                                        | Examples                                               |
| --------- | ---------------------------------------------------------------------------- | ------------------------------------------------------ |
| `Feature` | The page. A sub-page folds into this token rather than getting its own slot. | `Resources`, `ResourceDetails`, `CloudAccountsConnect` |
| `Area`    | The region captured.                                                         | `Header`, `Container`, `Block`, `Card`, `SideModal`    |
| `Variant` | Which state of that region, after a double dash. Omit when there's only one. | `--Daily`, `--AzureTenant`, `--PendingInvitation`      |

So a sub-page header is `CloudAccountsConnect-Header.png`, not `CloudAccounts-Connect-Header.png` — the same way
`ResourceDetails-Header.png` and `UsersInvite-Header.png` already work. Keep the name matching what the UI calls the
control: the AWS "Standalone" option is `--AwsStandalone…`, so a reviewer diffing the PNG looks for the right button.

Renaming a screenshot is a `git mv` of the baseline in every `snapshots/*/docker/` directory — the pixels don't change,
so it needs no regeneration. Afterwards, `npm run snapshots:prune` shows the old name left behind in your own renderer
folder (see [Missing and unused screenshots](#missing-and-unused-screenshots)).

---

## Timeouts

| Constant             | Value | Purpose                                               |
| -------------------- | ----- | ----------------------------------------------------- |
| `TEST_TIMEOUT`       | 40 s  | Maximum time for a single test                        |
| `ACTION_TIMEOUT`     | 30 s  | Maximum time for a single action (click, fill, …)     |
| `LARGE_DATA_TIMEOUT` | 60 s  | Used explicitly for heavy pages (expenses, resources) |

---

## E2E mock markers

Mock payloads that produce user-visible text embed a `[E2E]` marker in one of their fields. It renders in the UI, and therefore in the screenshots, so a reviewer can tell at a glance that the data came from the test harness rather than a live API.

That is the marker's only job. **Proving an interception fired is the runner's job**: a mock that registers but never intercepts a request now fails the test (see [Interception checks](#interception-checks) below), which is a stronger guarantee than hoping a marked field lands inside the captured region.

There is one marker rather than one per mock, because the thing it communicates — "this is synthetic" — does not vary by payload. It is applied through a helper rather than interpolated by hand, so placement and spacing are not a per-author decision:

```ts
// mocks/constants.ts
export const e2e = (label: string) => `${label} ${MARKER}`;
```

Wrap the label wherever a value is rendered:

```ts
import { e2e } from './constants';

const DataSourcesMock = {
  name: e2e('SoftwareOne'), // renders as 'SoftwareOne [E2E]'
};
```

The marker always trails the label. Don't reintroduce a bare `[E2E]` string to place it elsewhere — a prefixed or unspaced variant reads as a different value in review and drifts from the rest of the suite.

Changing the marker or a label changes every pixel that contains it, so edit and regenerate the screenshots in the same commit:

```bash
npm run test:docker:update
```

---

## Interception checks

Every entry in a spec's `interceptAPI` list is expected to intercept at least one request. If one registers but never fires, the app quietly used live data instead and the test fails on teardown:

```
Error: These interceptions never fired, so the app used live data instead:
  - GraphQL:DataSourcesRenamed
The mock no longer matches what the app requests — check the GraphQL operation name or URL.
```

This catches the failure mode a marker cannot: a renamed GraphQL operation or a changed URL leaves the mock syntactically fine and the screenshot may even still match, while the data behind it is no longer under test. The check only runs on an otherwise-passing test, so a genuine failure isn't buried under a second error.

Note that it proves a mock was _applied_, not that it was _correct_ — a payload whose ids don't match what the page looks up will still render as if there were no data.

---

## Adding a new test

End-to-end walkthrough: add a mock, a page object, and a spec for a hypothetical **Alerts** page at `/alerts`.

### 1. Page Object

Create **`pages/alerts.page.ts`**. Extend `BasePage`, declare locators in the constructor, expose interaction methods.

```ts
// pages/alerts.page.ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class AlertsPage extends BasePage {
  readonly heading: Locator;
  readonly addBtn: Locator;

  constructor(page: Page) {
    super(page, '/alerts'); // 2nd arg = default URL
    this.heading = this.main.getByTestId('lbl_alerts');
    this.addBtn = this.main.getByTestId('btn_add');
  }
}
```

Locators are public, so specs click them directly (`alertsPage.addBtn.click()`). Add a method only when it wraps a
condition or a wait — a one-line `click()` passthrough just adds a name to keep in sync.

Register it in the barrel file so the fixture layer picks it up automatically:

```ts
// pages/index.ts
export * from './alerts.page';
```

That's it — a fixture named `alertsPage` is now available on every spec, derived from the class name (`AlertsPage` → `alertsPage`). See [`fixtures/build-fixtures.ts`](./fixtures/build-fixtures.ts) for how.

### 2. Mock data + interceptions

Create **`mocks/alerts.mocks.ts`**. Every user-visible string gets the E2E marker (see [E2E mock markers](#e2e-mock-markers)).

```ts
// mocks/alerts.mocks.ts
import { e2e } from './constants';
import type { InterceptionEntry } from '@/types';

const AlertsMock = {
  alerts: [
    { id: '1', name: e2e('High-cost resource'), severity: 'high' },
    { id: '2', name: e2e('Idle EC2'), severity: 'low' },
  ],
};

export const alertsInterceptions: InterceptionEntry[] = [
  // GraphQL operations are matched by operation name:
  { gql: 'Alerts', mock: AlertsMock },

  // REST endpoints are matched by URL fragment (RegExp-compatible string):
  // { url: '/restapi/v2/alerts/', mock: AlertsMock },
];
```

Re-export the interceptions from the mocks barrel so specs can import it by name:

```ts
// mocks/index.ts
export * from './alerts.mocks';
```

### 3. Spec

Create **`tests/alerts.spec.ts`**. Import `test` from the **project fixture**, not `@playwright/test` — that's what wires in page objects and `interceptAPI`.

```ts
// tests/alerts.spec.ts
import { test } from '@/fixtures/page.fixture';
import { alertsInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';

test.describe('Alerts', () => {
  test.use({ interceptAPI: { entries: alertsInterceptions } });

  test('list page', async ({ alertsPage }) => {
    await alertsPage.navigateToURL();

    await test.step('List page', async () => {
      await captureScreenshot(alertsPage.main, 'Alerts-Container.png', {
        hoverAnchor: alertsPage.heading,
      });
    });

    await test.step('Create form', async () => {
      await alertsPage.addBtn.click();
      await captureScreenshot(alertsPage.main, 'AlertsCreate-Container.png', {
        hoverAnchor: alertsPage.heading,
      });
    });
  });
});
```

Key points:

- **`test.use({ interceptAPI: { entries } })`** registers the mocks before the spec runs. Must be wrapped in `{ entries: [...] }` — see the comment in `page.fixture.ts`.
- **`alertsPage`** is injected by the fixture — no manual `new AlertsPage(page)`.
- **`captureScreenshot(target, name, opts)`** hovers a stable anchor, waits for the page to idle, and calls `toHaveScreenshot`. Pass `fitViewport: true` for tall pages — it resizes the browser to fit the full `<main>` content (helper lives in `utils/viewport.ts`).
- **Screenshot names** follow `<Feature>-<Area>[--<Variant>].png` (double-dash before the variant). They map 1:1 to
  baseline PNGs under `snapshots/…`. See [Naming](#naming) for what belongs in each slot.
- **Test titles** are `describe` = the area, `test` = the scenario, so reports read `Alerts › list page`. The `describe`
  is also what scopes `test.use`, so one area with three mock sets means three `describe('Alerts')` blocks.

#### Fixture options (passed via `test.use({...})`)

All three options are declared in [`fixtures/page.fixture.ts`](./fixtures/page.fixture.ts); defaults match the "typical regression test" case so most specs only need `interceptAPI`.

| Option           | Default     | What it does                                                                                                                                                                                                                                          |
| ---------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `restoreSession` | `true`      | Injects the cached test-account session into `localforage` on a fresh `/` load so the app starts logged-in. Set to `false` only for specs that exercise the login flow itself.                                                                        |
| `setFixedTime`   | `true`      | Pins the browser clock to `2025-01-25T12:00:00Z` via `page.clock.setFixedTime` so date-dependent UI (charts, "Last seen 3 days ago", etc.) renders identically run-to-run. Set to `false` for specs that rely on real time or test date-picker logic. |
| `interceptAPI`   | `undefined` | Array of REST/GraphQL route mocks (see above). Wrapped in `{ entries: [...] }` to work around a Playwright array-unwrap quirk.                                                                                                                        |

Examples:

```ts
// Login-flow test — start from a clean browser with no session.
test.use({ restoreSession: false });

// Time-travel test — let the clock tick naturally.
test.use({ setFixedTime: false, interceptAPI: { entries: myInterceptions } });
```

### 4. Generate baselines

Screenshots don't exist yet — generate them once, for one spec only:

```bash
./run_pw.sh -E dev -u tests/alerts.spec.ts
```

Review the PNGs in `snapshots/<env>/docker/` and commit them with the new spec.

`-u` never fails — it writes whatever it renders. Run the plain compare first and reach for `-u`
only once you've seen that the diff is the one you intended.

### 5. Run

```bash
# local, single file
npx playwright test tests/alerts.spec.ts

# against the committed baseline, one spec
./run_pw.sh -E dev tests/alerts.spec.ts

# the whole suite, per environment
for e in dev prerelease staging; do ./run_pw.sh -E "$e" || echo "FAILED: $e"; done
```

Trailing arguments reach `playwright test`, so a Docker run can be narrowed to a spec. Playwright's
own flags go after `--` (`./run_pw.sh -E dev -- -g 'side modal'`). Unknown _options_ are still
rejected up front, so a typo fails before the container starts.

### Checklist when adding a new test

- [ ] `pages/<feature>.page.ts` — class extends `BasePage`, locators declared in constructor.
- [ ] `pages/index.ts` — re-export the new page.
- [ ] `mocks/<feature>.mocks.ts` — payload constants + exported `<feature>Interceptions` array.
- [ ] `mocks/index.ts` — re-export the new mocks file.
- [ ] `tests/<feature>.spec.ts` — `import { test } from '@/fixtures/page.fixture'`, `test.use({ interceptAPI })`, `captureScreenshot` per viewpoint.
- [ ] Baselines regenerated with `npm run test:docker:update`.
- [ ] Baseline PNGs and code changes committed together.
