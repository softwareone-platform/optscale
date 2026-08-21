# Working in `regression-tests/`

Playwright visual regression suite. Read `README.md` for how to run it; this file is the set of
rules to follow when changing it.

## Style

- Prefer an expressive name over a comment. Rename the variable, or extract a named helper,
  before writing prose.
- Comment only a non-obvious **why** — a constraint, a gotcha, a measured result — in one or two
  lines. No JSDoc block that restates the signature.
- Longer explanations belong in `README.md`, not inline.

## Environments

- `env.config.ts` is the single place an environment is defined: URLs, deployment `key`, and the
  name of its token variable. Adding one means an entry there plus a token in `.env`.
- Entries are typed (`key`, `tokenVar`, `https://` except under `dev`) **and** re-validated at
  import time, because the runner transpiles without typechecking. Keep both in step.
- Never add a token fallback. Each environment reads only its own variable so a missing one fails
  fast instead of authenticating against the wrong cluster. `tokenVar` is validated against the
  entry's `key` for the same reason — the type alone would accept another key's variable.
- Three axes are deliberately independent — changing one must not move the others:

  | Axis                      | Set by                                              |
  | ------------------------- | --------------------------------------------------- |
  | Where the browser points  | `TEST_ENV`, or `BASE_URL_OVERRIDE` / `run_pw.sh -H` |
  | Which account and cluster | `TEST_ENV` only                                     |
  | Which screenshots         | `TEST_ENV`, or `SNAPSHOT_ENV` / `run_pw.sh -S`      |

## Screenshots

- They live at `snapshots/<env>/<renderer>/`. The renderer is a fact about the run — `docker` in
  the container, otherwise the host platform — never a setting.
- `snapshots/*/docker/` is committed and reviewed. It only ever grows through an explicit
  `./run_pw.sh -E <env> -u`. A container run fails on a missing screenshot rather than creating
  one; don't weaken that guard. `-u` refuses `-S`, and a locally served `-E` refuses to run without
  `-H`/`-a`/`-U`, so neither can quietly commit another environment's pixels or a blank page.
- Comparisons are exact. Don't add `maxDiffPixelRatio`/`threshold` to make a cross-platform run
  pass — Docker is the only trustworthy comparison.
- `@playwright/test` is pinned to an exact version, and `docker/Dockerfile.linux` takes it as a
  build arg rather than repeating it. The pin is a property of the committed screenshots: bumping it
  changes the browser that renders them, so it comes with a regenerate-and-review pass.
- Changing a rendered mock value (including the `e2e()` marker) invalidates screenshots. Regenerate
  and commit them together.
- `captureScreenshot` is the only entry point. A spec that positioned the page itself passes
  `skipHover: true` rather than reaching for something lower-level. Never call `toHaveScreenshot`
  directly — that skips the guard above and the idle wait.
- Names are `<Feature>-<Area>[--<Variant>].png`; a sub-page folds into `Feature`
  (`CloudAccountsConnect-Header.png`). Renaming one is a `git mv` in every `snapshots/*/docker/`,
  not a regeneration. See README → Naming.

## Tests

- `describe` = area, `test` = scenario, so reports read `[FFC] › Expenses › breakdowns`. The
  `describe` also scopes `test.use`, so one area with several mock sets means several same-named
  `describe` blocks.
- No product-name prefix on titles — the `FFC` project in `playwright.config.ts` supplies it once.
  Renaming that project is safe: `snapshotPathTemplate` has no `{projectName}`.
- Page-object locators are public: click them from the spec. Add a method only when it wraps a wait
  or a condition, never as a one-line `click()` passthrough.

## Mocks

- Every entry in a spec's `interceptAPI` list must intercept at least one request; an unused one
  fails the test. Scope the list to what that test exercises instead of sharing one big list
  across a `describe`.
- A mock is matched by GraphQL `operationName` or by `url` treated as a **regex**, so absorb ids
  with `[^/]+`.
- Mocked ids must line up with whatever the UI looks them up by. A payload copied verbatim from a
  live response usually won't match, and renders as if there were no data at all.
- User-visible values are wrapped in the shared `e2e()` helper from `mocks/constants.ts`, which
  suffixes the marker. Never interpolate the raw marker string — placement stays uniform.

## Before saying it works

Run `npx tsc --noEmit`, `npm run lint`, `npx prettier --check` on touched files, and the suite.
For screenshot-affecting changes, a local run only proves your own set — the committed ones need
`./run_pw.sh -E <env>`.
