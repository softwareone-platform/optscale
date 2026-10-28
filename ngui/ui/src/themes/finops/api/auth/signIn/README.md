# Sign-in (two-step login)

Front-end implementation of the two-step login described in **FFC: TDR FinOps for Cloud MFA**
(Confluence → _Login processing workflow_).

## The feature flag

The whole thing sits behind `mfa_login` in
[`theme.features.ts`](../../../theme.features.ts), **off by default**. With the flag off,
`AuthorizationContainer` renders the original single-step `LoginForm` against the existing
`createToken` GraphQL mutation and nothing here runs. Flip it to `true` to get the two-step form
and the mocked transport:

```ts
mfa_login: true;
```

Because the transport is mocked, a successful sign-in gets into the app shell but the first real
API call returns 401 — see [The mocked token](#the-mocked-token). Keep the flag off anywhere but a
dev machine.

## Step 1 — the email step

Entering an address and pressing **Continue** calls `POST /auth/v2/login_options` with `{ email }`
and gets back which methods that address can authenticate with. Nothing navigates before
_Continue_ is pressed. The answer is a constant `{ methods: ["password"], sso: { state:
"not_configured" } }` — the TDR pins it there until SSO ships, and an address-dependent answer
would leak which e-mails have an account. The form then shows the password field with the address
held read-only above it.

## Step 2 — the password step

Submitting the password calls `POST /auth/v2/tokens` with `{ email, password }` and the answer
decides where the visitor goes next:

| Answer                             | What happens                                                                        |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| `201` Token                        | Sign-in completes: the macaroon is processed and the app redirects to `/initialize` |
| `202` `state: mfa_required`        | Routed to `/mfa` with the challenge in router state                                 |
| `202` `state: enrollment_required` | Routed to `/mfa-enrollment` with the challenge in router state                      |
| `403` `OA0037`                     | Stays on the password step: email kept, password cleared and refocused              |
| `403` `OA0073`                     | Routed to `/email-verification` (pre-existing behaviour)                            |
| anything else                      | Stays on the password step with a generic message                                   |

`/mfa` and `/mfa-enrollment` are placeholders — the verification and enrollment screens are a
separate piece of work. They read the challenge through `useLoginChallenge` and bounce back to
`/login` when there is none, because arriving without one means no password was ever verified.

## The transport

This directory is the real thing: `request.ts` does a `fetch`, `createToken.ts` and
`loginOptions.ts` are thin calls on top of it. **There is no mock in here and no swap to make** —
the app issues the same request it will issue in production, and you can read it in
DevTools → Network.

What stands in for the service is the dev server: `VITE_MOCKED_API` (on by default in dev) lets a
Vite middleware answer these two routes locally. When the auth service ships them, set it to
`false` and the identical request goes upstream through the proxy. The machinery and the rules
are in [`api/mocked/README.md`](../../mocked/README.md).

`request.ts` turns any non-2xx answer into an `AuthApiError` carrying the optscale error envelope
(`{"error": {"error_code": "OA00xx", "reason": "…"}}`), and hands the HTTP status back alongside
the body, because sign-in branches on `201` versus `202`.

The mocked answers use the bodies from the TDR and are held ~600 ms by `api/mocked/mockDelay.ts`,
so the pending states are visible while clicking through.

### Reaching each scenario

The password is always `password`. Anything else answers as invalid credentials, which is also how
you exercise the recoverable error state. The outcome for a correct password is chosen from the
**email local part**:

| Email                               | Outcome                             |
| ----------------------------------- | ----------------------------------- |
| `mfa_anypostfix@example.com`        | `202` `mfa_required`                |
| `enroll_anypostfix@example.com`     | `202` `enrollment_required`         |
| `unverified_anypostfix@example.com` | `403` `OA0073` (email not verified) |
| `error_anypostfix@example.com`      | `500` `OA0061` (generic error)      |
| anything else                       | `201` with a token                  |

Matching ignores case and surrounding whitespace.

### The mocked token

The mocked module's `fixtures.ts` holds a real serialized macaroon (location `optscale`, caveat
`mfa:none`) so
`utils/macaroons` deserializes it exactly like a token from the auth service, and the normal
`initialize` → `/initialize` redirect runs unchanged. It is **not** accepted by any backend: a
mocked sign-in gets into the app shell, then the first real API call returns 401. Swap in the real
transport to sign in against a live environment.
