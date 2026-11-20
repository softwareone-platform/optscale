# Mocked API

Every stand-in for an endpoint the backend has not shipped yet lives here, and **nothing else
does**. The tree mirrors `api/` one level down, so a mock sits at the same path as the contract it
stands in for:

```
api/auth/signIn/createToken.ts          ← the seam, imported by the app
api/mocked/auth/signIn/createTokenMock.ts   ← what it currently points at
```

## How a mock is reached

**Nothing in the app imports a mock.** The app always calls the real transport — `fetch` against
`/auth/v2/…` — and the mock is served _over HTTP by the dev server_:

```
TwoStepLoginForm → useLoginOptions → api/auth/signIn/loginOptions.ts
                                     └─ fetch POST /api/auth/v2/login_options
                                        └─ http/mockedApiPlugin.ts  (dev server middleware)
                                           └─ http/handlers.ts → resolveLoginOptionsMock
```

Two things follow from that, and both are the point:

- The call **shows up in DevTools → Network** with its real status (`200`, `202`, `403`), real
  request body and real response body. Each one is also logged to the dev-server terminal as
  `[mocked-api] POST /auth/v2/tokens → 202`.
- The app already exercises `fetch`, the status branching and the error-envelope parsing. When
  the backend ships, **nothing in `api/` changes** — you set `VITE_MOCKED_API=false` and the same
  request goes upstream through Vite's proxy instead.

`mockedApiPlugin.ts` registers before Vite's `/api` proxy and only inspects paths under
`/api/auth/v2/`. A route absent from `MOCKED_ROUTES` falls straight through to the real backend,
so turning this on does not shadow endpoints that already work.

## The rules

1. **A mock is reachable only through `MOCKED_ROUTES` in `http/handlers.ts`.** Adding an endpoint
   means adding a row there, never an import somewhere in the app.

2. **Types, constants and errors belong to the real module**, not here. A mock imports them from
   `@theme/api/<path>` so it is forced to answer in the contract's shape, and so the shape never
   has to be kept in two places.

3. **Response bodies are copied verbatim** from the design record or a real response capture.
   Keep them as plain literals — no builders, no factories — so they can be diffed against the
   live endpoint later. Cite the source in a comment at the top of the fixtures file.

4. **Mocks carry their own specs.** They are pure async functions, which makes them the cheapest
   thing in the theme to cover, and the spec is what catches a fixture drifting from its contract.

## What is in here now

| Path           | Stands in for                                         | Documented in                                           |
| -------------- | ----------------------------------------------------- | ------------------------------------------------------- |
| `auth/signIn/` | `POST /auth/v2/login_options`, `POST /auth/v2/tokens` | [`api/auth/signIn/README.md`](../auth/signIn/README.md) |

`mockDelay.ts` is shared by all of them: it holds every mocked call for ~600 ms so the pending
states in the UI are visible while clicking through. `http/` holds the dev-server side —
`handlers.ts` (the route table) and `mockedApiPlugin.ts` (the Vite middleware).

## The two switches

| Switch                             | Default   | Controls                                                     |
| ---------------------------------- | --------- | ------------------------------------------------------------ |
| `mfa_login` in `theme.features.ts` | `false`   | Whether the UI uses the two-step login at all                |
| `VITE_MOCKED_API` in `.env`        | on in dev | Whether the dev server answers the routes in `MOCKED_ROUTES` |

Turn the feature flag on to see the flow; leave `VITE_MOCKED_API` alone until the backend ships
the endpoints, then set it to `false` to point the same requests at the real service. The
middleware is `apply: "serve"` — it does not exist in a production build, where these requests go
straight to the backend.

## What the flag reaches

The sign-in mocks are reached only when the `mfa_login` flag in
[`theme.features.ts`](../../theme.features.ts) is `true` — see the sign-in README for what each
scenario does.
