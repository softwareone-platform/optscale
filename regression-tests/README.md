# OptScale Regression Tests

Visual regression tests for the OptScale UI, using [Playwright](https://playwright.dev/) screenshot comparison.

## Overview

These tests capture screenshots of key UI components and compare them against stored **baseline** snapshots, ensuring visual consistency across releases.

Tests are tagged with `@swo_regression` and cover:

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

- Node.js 18+
- A running OptScale instance (or use the built-in Docker runner against a remote URL)

---

## Setup

### Install dependencies

```bash
npm install
npx playwright install chromium
```

### Configure environment

```bash
cp .env.example .env
```

Edit `.env` with the appropriate values:

| Variable                   | Description                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| `BASE_URL`                 | URL of the OptScale instance to test against                                                     |
| `DEFAULT_USER_ID`          | ID of the test user                                                                              |
| `DEFAULT_AUTH_USER_ID`     | Auth user ID for the test user                                                                   |
| `DEFAULT_ORG_ID`           | Organization ID used by tests                                                                    |
| `CLUSTER_SECRET`           | Cluster secret / admin password                                                                  |
| `IGNORE_HTTPS_ERRORS`      | Set to `true` to ignore TLS certificate errors                                                   |
| `BROWSER_ERROR_LOGGING`    | Enable browser console error capture                                                             |
| `DEBUG_LOG`                | Enable verbose debug logging                                                                     |
| `LIVE_DEMO_API`            | Live demo API endpoint                                                                           |
| `LIVE_DEMO_TOKEN`          | Live demo auth token                                                                             |
| `DEV` / `TEST` / `STAGING` | Convenience URLs for different environments                                                      |
| `CLEAN_UP`                 | Set to `true` to delete test data after each run (use `false` when debugging)                    |
| `IS_REGRESSION_RUN`        | When set, snapshots are stored in `snapshots/baseline/` instead of `snapshots/local/<platform>/` |

---

## Running Tests

| Command                      | Description                                                              |
| ---------------------------- | ------------------------------------------------------------------------ |
| `npm test`                   | Run all tests headless locally                                           |
| `npm run test:ui`            | Run with the Playwright interactive UI                                   |
| `npm run test:headed`        | Run in headed mode (single worker)                                       |
| `npm run test:update`        | Re-generate local snapshots                                              |
| `npm run test:docker`        | Run all tests inside Docker (Linux) — used to produce baseline snapshots |
| `npm run test:docker:update` | Run inside Docker and update baseline snapshots                          |
| `npm run report`             | Open the last HTML report                                                |
| `npm run lint`               | Lint all TypeScript files                                                |
| `npm run lint:fix`           | Lint and auto-fix issues                                                 |
| `npm run format`             | Format all files with Prettier                                           |
| `npm run format:check`       | Check formatting without writing                                         |

### Docker runner (`run_pw.sh`)

The shell script `run_pw.sh` builds and runs a Linux Docker container to produce platform-independent snapshots. Key flags:

```
-u, --update          Update baseline screenshots
-U, --url URL         Override BASE_URL
-p, --port PORT       Port for the local app (default 4000)
-a, --run-application Run the ngui app inside the container pointing at API_ENDPOINT
-k, --keep-running    Keep the container alive after tests finish
-i, --ci              Set CI=true inside the container
```

---

## Project Structure

```
regression-tests/
├── tests/                          # Test specs — one file per feature area
│   ├── homepage.spec.ts
│   ├── cloud-accounts.spec.ts
│   ├── expenses.spec.ts
│   ├── events.spec.ts
│   ├── policies.spec.ts
│   ├── pools.spec.ts
│   ├── recommendations.spec.ts
│   ├── resources.spec.ts
│   ├── settings.spec.ts
│   ├── users.spec.ts
│   └── common-ui.spec.ts
│
├── pages/                          # Page Object Models (POM)
│   ├── base-page.ts                # Abstract base class: navigation, waitForLoad, takeScreenshot, shared locators
│   ├── layout-components.ts        # Header, sidebar and other shared layout elements
│   ├── simple-pages.ts             # Lightweight POMs for pages with minimal interactions (Events, HomePage, Pools, …)
│   ├── policy-pages.ts             # Shared template + concrete POMs for Anomalies / Policies / Tagging Policies list & create pages
│   ├── cloud-accounts-pages.ts     # Cloud account list and detail pages
│   ├── expenses-pages.ts           # Raw expenses and breakdown pages
│   ├── resources-pages.ts          # Resource list and detail pages
│   ├── users-pages.ts              # User management pages
│   └── index.ts                    # Barrel re-exports for all page objects
│
├── fixtures/                       # Playwright custom fixtures
│   ├── api.fixture.ts              # AuthClient + REST helpers exposed as `api` fixture
│   └── page.fixture.ts             # All page object instances wired into tests as fixtures
│
├── mocks/                          # Static API mock data used for route interceptions
│   ├── e2e-markers.ts              # Central registry of `[E2E_*]` marker constants
│   ├── *.mocks.ts                  # Response payloads per feature
│   └── *-interceptions.mocks.ts    # Route interception configurations per feature
│
├── setup/
│   └── auth.setup.ts               # Authenticates once and stores session state for all tests
│
├── styles/
│   ├── pre-screenshot-styles.css   # CSS injected before screenshots to ensure pixel-identical rendering
│   └── test-overrides.css          # CSS injected on page load to hide noisy/unstable UI elements
│
├── utils/
│   ├── auth-session-storage/       # Helpers for reading/writing auth tokens from localforage
│   ├── debug-logging.ts            # Conditional debug/error logging controlled by DEBUG_LOG env var
│   ├── file.ts                     # File system helpers (PDF conversion, image comparison)
│   ├── interceptor.ts              # Route interception helpers (REST + GraphQL mock routing)
│   └── screenshots.ts              # captureScreenshot + waitForPageIdle helpers
│
├── types/
│   ├── api-response.types.ts       # Typed API response shapes
│   ├── enums.ts                    # Shared enums (roles, policy types, …)
│   └── interceptor.types.ts        # Types for route interception entries
│
├── snapshots/
│   ├── baseline/                   # ✅ Committed — canonical baselines generated via Docker
│   └── local/                      # ❌ Gitignored — local-only snapshots for development
│
├── docker/
│   └── Dockerfile.linux            # Linux image used to produce cross-platform baseline snapshots
│
├── playwright.config.ts            # Playwright configuration (timeouts, projects, snapshot paths)
├── run_pw.sh                       # Docker runner script for baseline snapshot generation
├── eslint.config.mjs               # ESLint config (playwright plugin + TypeScript rules)
├── tsconfig.json
├── package.json
└── .env.example                    # Environment variable template
```

---

## Snapshots

| Folder                        | When used                                                                             | Committed          |
| ----------------------------- | ------------------------------------------------------------------------------------- | ------------------ |
| `snapshots/baseline/`         | Generated by `npm run test:docker` / `npm run test:docker:update` inside Linux Docker | ✅ Yes             |
| `snapshots/local/<platform>/` | Generated locally on macOS / Windows / Linux                                          | ❌ No (gitignored) |

Only **baseline** snapshots are pixel-perfect and cross-platform — they are produced inside a Linux Docker container with all rendering flags applied (no GPU, no font hinting, no anti-aliasing). These are the snapshots used for CI comparison.

**Local** snapshots (`snapshots/local/`) are for development convenience only and are gitignored. They may differ slightly from baseline due to OS-level font rendering differences.

To regenerate **local** snapshots (development only):

```bash
npm run test:update
```

To regenerate **baseline** (canonical) snapshots:

```bash
npm run test:docker:update
```

---

## Timeouts

| Constant             | Value | Purpose                                               |
| -------------------- | ----- | ----------------------------------------------------- |
| `TEST_TIMEOUT`       | 30 s  | Maximum time for a single test                        |
| `ACTION_TIMEOUT`     | 20 s  | Maximum time for a single action (click, fill, …)     |
| `LARGE_DATA_TIMEOUT` | 60 s  | Used explicitly for heavy pages (expenses, resources) |

---

## E2E mock markers

Every mock payload that produces user-visible text (names, titles, resource ids, descriptions…) embeds a short **marker** inside one of its fields. The marker is visible in the rendered UI — and therefore in the baseline screenshot — so a reviewer can tell at a glance that the data on screen came from the test harness rather than a live API.

### Central registry

All markers are defined once in [`mocks/e2e-markers.ts`](./mocks/e2e-markers.ts) as plain exported constants:

```ts
// mocks/e2e-markers.ts
export const E2E_CDS = '[E2E_CDS]';   // cloud-accounts.mocks.ts → DataSourcesMock
export const E2E_EV  = '[E2E_EV]';    // events.mocks.ts          → EventsRegressionMock
// …
```

Mock files import only the markers they need and interpolate them into payload values with a template literal:

```ts
import { E2E_CDS } from './e2e-markers';

const DataSourcesMock = {
  name: `SoftwareOne ${E2E_CDS}`,   // renders as 'SoftwareOne [E2E_CDS]'
  // …
};
```

Benefits over hard-coding the string:

- Renaming a marker is a **one-line change** in `e2e-markers.ts`.
- `grep E2E_CDS` finds every usage, definition, and import in one sweep.
- TypeScript catches typos at compile time — you cannot import a marker that doesn't exist.
- `imports` at the top of each mock file advertise which markers the file contains.

### Convention

```
[E2E_<F><C>]
```

- **`E2E_`** — literal prefix, identical everywhere.
- **`<F>`** — uppercase first letter of the mock file name
  (`cloud-accounts.mocks.ts` → `C`, `homepage.mocks.ts` → `H`, `policies.mocks.ts` → `P`, …).
- **`<C>`** — 1–3 uppercase letters abbreviating the mock constant's distinguishing part (omit the file-domain word if the file letter already encodes it, and omit the `Mock` / `Response` suffix).
- Optional `_<variant>` suffix distinguishes multiple uses of the same payload
  (e.g. `[E2E_PR_Modal]` = `PoolsMock` rendered inside a modal).

Example: `DataSourcesMock` in `cloud-accounts.mocks.ts` → `[E2E_CDS]`
&nbsp;&nbsp;&nbsp;&nbsp;(`C` from file + `DS` from *DataSources*).

### Adding a new marker

1. Add one line to `mocks/e2e-markers.ts`:
   ```ts
   export const E2E_NEW = '[E2E_NEW]';   // <file>.mocks.ts → <MockConstant>
   ```
2. Import it in the target mock file and interpolate it into any user-visible value:
   ```ts
   import { E2E_NEW } from './e2e-markers';
   const MyMock = { name: `Example ${E2E_NEW}` };
   ```
3. Regenerate baselines — the new marker now appears in the rendered UI:
   ```bash
   npm run test:docker:update
   ```

### Changing a marker's rendered string

Changing the value of an `E2E_*` constant in `e2e-markers.ts` changes every pixel that contains it and invalidates the affected baselines. To do it safely:

1. Edit the constant in `mocks/e2e-markers.ts`.
2. Regenerate baselines with `npm run test:docker:update`.
3. Commit the constant edit **and** the updated baseline PNGs together.

No mock file needs to be touched — all usages are variable references.
