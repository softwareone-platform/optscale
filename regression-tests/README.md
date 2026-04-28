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

- **Node.js 20+** (Playwright 1.56 requires ≥ 18; the project's `@types/node` targets 22).
- A running OptScale instance, or a remote URL the tests can reach.
- **Docker** — only needed for `npm run test:docker[:update]` (used to regenerate cross-platform baseline snapshots). Local headless runs don't need it.

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

| Variable                 | Required? | Description                                                                                                           |
|--------------------------|-----------|-----------------------------------------------------------------------------------------------------------------------|
| `BASE_URL`               | no        | Portal URL Playwright points at. Defaults to `http://0.0.0.0:3000`.                                                   |
| `API_BASE_URL`           | yes¹      | Cluster URL to proxy API requests to — same concept as `VITE_PROXY` in `ngui/ui/.env.sample`.                         |
| `LIVE_DEMO_TOKEN`        | yes¹      | Bearer token the demo-account endpoint expects in the `X-LiveDemo-Token` header.                                      |
| `CI`                     | no        | `true` inside CI — enables `forbidOnly`, raises retries, lowers workers. Playwright sets this automatically.          |
| `IS_REGRESSION_RUN`      | no        | `true` → snapshots compared against `snapshots/baseline/<host>/`. Unset → `snapshots/local/<platform>/` (gitignored). |
| `IGNORE_HTTPS_ERRORS`    | no        | `true` to accept self-signed / expired certificates in the browser context.                                           |
| `DEBUG_LOG`              | no        | `true` emits `[DEBUG]`-prefixed messages from `debugLog`.                                                             |
| `BROWSER_ERROR_LOGGING`  | no        | `true` forwards browser `console.error` output to the Node test runner.                                               |

¹ Required only when `auth.setup.ts` actually mints demo-account credentials. `requireEnv('apiBaseUrl', 'liveDemoToken')` fails fast with a clear message if either is missing.

---

## Running Tests

| Command                      | Description                                                              |
|------------------------------|--------------------------------------------------------------------------|
| `npm test`                   | Run all tests headless locally                                           |
| `npm run test:ui`            | Run with the Playwright interactive UI                                   |
| `npm run test:headed`        | Run in headed mode (single worker)                                       |
| `npm run test:update`        | Re-generate local snapshots                                              |
| `npm run test:docker`        | Run all tests inside Docker (Linux) — used to produce baseline snapshots |
| `npm run test:docker:update` | Run inside Docker and update baseline snapshots                          |
| `npm run report`             | Open the last HTML report                                                |
| `npm run install:browser`    | (Re-)install the Playwright-bundled Chromium browser                     |
| `npm run lint`               | Lint all TypeScript files                                                |
| `npm run lint:fix`           | Lint and auto-fix issues                                                 |
| `npm run format`             | Format all files with Prettier                                           |
| `npm run format:check`       | Check formatting without writing                                         |

### Docker runner (`run_pw.sh`)

The shell script `run_pw.sh` builds and runs a Linux Docker container to produce platform-independent snapshots. Key flags:

```
-c, --config FILE     Use an alternate Playwright config file
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
│   ├── e2e-markers.ts              # Central registry of `[E2E_*]` marker constants
│   ├── index.ts                    # Barrel re-exports every `*Interceptions` array
│   └── *.mocks.ts                  # Per-feature payloads + exported `<feature>Interceptions: InterceptionEntry[]`
│
├── setup/
│   ├── auth.setup.ts               # Authenticates once and stores session state for all tests
│   └── demo-account-service.ts     # `DemoAccountService` — mints demo-account credentials via `/restapi/v2/live_demo`
│
├── styles/
│   ├── pre-screenshot-styles.css   # CSS injected before screenshots to ensure pixel-identical rendering
│   └── test-overrides.css          # CSS injected on page load to hide noisy/unstable UI elements
│
├── utils/
│   ├── debug-logging.ts            # `debugLog` / `errorLog` + `attachBrowserErrorLogging`, gated by env flags
│   ├── demo-account-session.ts     # Injects localforage, restores the cached demo-account session
│   ├── env.ts                      # Single source of truth for `process.env.*` + `requireEnv(...)` validator
│   ├── file.ts                     # `safeReadJsonFile<T>` / `safeWriteJsonFile` helpers
│   ├── interceptor.ts              # Route interception implementation (REST + GraphQL mock routing)
│   ├── screenshots.ts              # `captureScreenshot` helper
│   └── viewport.ts                 # `fitViewportToFullPage` — resizes viewport to fit full `<main>` content
│
├── types/
│   ├── api-response.types.ts       # Typed API response shapes
│   ├── enums.ts                    # Shared enums (roles, policy types, storage-state paths, …)
│   ├── interceptor.types.ts        # `InterceptionEntry` (GraphQL/REST mock-route entry)
│   └── index.ts                    # Barrel re-export
│
├── vendor/
│   └── localforage.min.js          # Third-party script injected into the page to mirror app session storage
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

| Folder                        | When used                                                                             | Committed         |
|-------------------------------|---------------------------------------------------------------------------------------|-------------------|
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
| `TEST_TIMEOUT`       | 40 s  | Maximum time for a single test                        |
| `ACTION_TIMEOUT`     | 30 s  | Maximum time for a single action (click, fill, …)     |
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
    super(page, '/alerts');                       // 2nd arg = default URL
    this.heading = this.main.getByTestId('lbl_alerts');
    this.addBtn  = this.main.getByTestId('btn_add');
  }

  async clickAddBtn(): Promise<void> {
    await this.addBtn.click();
  }
}
```

Register it in the barrel file so the fixture layer picks it up automatically:

```ts
// pages/index.ts
export * from './alerts.page';
```

That's it — a fixture named `alertsPage` is now available on every spec, derived from the class name (`AlertsPage` → `alertsPage`). See [`fixtures/build-fixtures.ts`](./fixtures/build-fixtures.ts) for how.

### 2. Mock data + interceptions

Create **`mocks/alerts.mocks.ts`**. Every user-visible string gets an E2E marker (see [E2E mock markers](#e2e-mock-markers)).

```ts
// mocks/alerts.mocks.ts
import { E2E_A } from './e2e-markers';          // add `export const E2E_A = '[E2E_A]';`
import type { InterceptionEntry } from '@/types';

const AlertsMock = {
  alerts: [
    { id: '1', name: `High-cost resource ${E2E_A}`, severity: 'high' },
    { id: '2', name: `Idle EC2 ${E2E_A}`,           severity: 'low'  },
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

test.describe(() => {
  test.use({ interceptAPI: { entries: alertsInterceptions } });

  test('FFC: Alerts', async ({ alertsPage }) => {
    await alertsPage.navigateToURL();

    await test.step('List page', async () => {
      await captureScreenshot(alertsPage.main, 'Alerts-Container.png', {
        hoverAnchor: alertsPage.heading,
      });
    });

    await test.step('Create form', async () => {
      await alertsPage.clickAddBtn();
      await captureScreenshot(alertsPage.main, 'Alerts-Create--Container.png', {
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
- **Screenshot names** follow `<Feature>-<Area>--<Variant>.png` (double-dash before the variant). They map 1:1 to baseline PNGs under `snapshots/…`.

#### Fixture options (passed via `test.use({...})`)

All three options are declared in [`fixtures/page.fixture.ts`](./fixtures/page.fixture.ts); defaults match the "typical regression test" case so most specs only need `interceptAPI`.

| Option           | Default     | What it does                                                                                                                                                                                                                                          |
|------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `restoreSession` | `true`      | Injects the cached live-demo session into `localforage` on a fresh `/` load so the app starts logged-in. Set to `false` only for specs that exercise the login flow itself.                                                                           |
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

Screenshots don't exist yet — generate them once:

```bash
npm run test:docker:update -- tests/alerts.spec.ts
```

Review the PNGs in `snapshots/baseline/<host>/` and commit them with the new spec.

### 5. Run

```bash
# local, single file
npx playwright test tests/alerts.spec.ts

# against the regression baseline
npm run test:docker -- tests/alerts.spec.ts
```

### Checklist when adding a new test

- [ ] `pages/<feature>.page.ts` — class extends `BasePage`, locators declared in constructor.
- [ ] `pages/index.ts` — re-export the new page.
- [ ] `mocks/<feature>.mocks.ts` — payload constants + exported `<feature>Interceptions` array.
- [ ] `mocks/e2e-markers.ts` — new `E2E_*` constant if the feature has its own domain.
- [ ] `mocks/index.ts` — re-export the new mocks file.
- [ ] `tests/<feature>.spec.ts` — `import { test } from '@/fixtures/page.fixture'`, `test.use({ interceptAPI })`, `captureScreenshot` per viewpoint.
- [ ] Baselines regenerated with `npm run test:docker:update`.
- [ ] Baseline PNGs and code changes committed together.
