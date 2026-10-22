# FFC: TDR FinOps for Cloud MFA

| **PM** | @Pokarowski, Tomasz |
| --- | --- |
| **Business design review** | [FFC: Multi‑Factor Authentication (MFA) & Single Sign‑On (SSO)](https://softwareone.atlassian.net/wiki/spaces/mpt/pages/7517831464/FFC+Multi+Factor+Authentication+MFA+Single+Sign+On+SSO) |
| **Architect** | @Faraone, Francesco |
| **Development team** | [MPT - Turing](https://softwareone.atlassian.net/people/team/2db3732c-37ab-485d-85e5-83964391a3db) (@Aleksandra Ovchinnikova (Deactivated)@Di Mariano, Antonio@Faraone, Francesco@Wolosz, Dawid@Zielonka, Michal) |
| **Presentation recording** | link to the recording from the meeting |
| **Presentation date** | time, when the presentation will take place |
| **Epic/task** | [MPT-25258](https://softwareone.atlassian.net/browse/MPT-25258) |

# Table of Contents

# Introduction

FinOps for Cloud currently supports users authentication with an email and a password (Google/Microsoft sign-in exists in OptScale but is not used in the FFC deployment) and receive a long-lived bearer token from the `auth` service. There is no second factor and an organization has no way to require one. Enterprise clients increasingly ask for MFA as a precondition for onboarding, and the same clients will later ask for SSO, which the BDR covers together with MFA.

This TDR covers the MFA half of the BDR and proposes to implement it natively in optscale, in the `auth` service that already owns identity, tokens and the email verification codes used for password recovery. Users will be able to add an authenticator app (TOTP) and/or an email one-time code as a second factor, the login becomes two-step (email → *Continue* → password → code), which is also will be an entry point for SSO. An organization will have an option to enforce MFA through an authentication policy in portal by organization manager.

SSO and UI changes are **out of scope** of this TDR - only the optscale API is covered here.

# Requirements

## Functional Requirements

- Login must be two-step: user enters email and clicks **Continue**; the system resolves the authentication method for that email. No redirect happens before continue is invoked.
- If the user has at least one confirmed MFA method or MFA enforced by organization, MFA verification is required before a token is issued. MFA applies only to local authentication.
- A user can configure MFA in new page **Profile → Security**. Supported methods are Authenticator app and email verification code.
- Authenticator enrollment shows a QR code and the manual key (the user must enter a valid 6-digit code in this case), the method is stored as active only after successful verification.
- New security page lists configured methods, at least one option must be added and set as default if MFA is enabled, with ability to add, remove and set as default.
- During login the default method is pre-selected, the user may choose to use a different method. Access is granted only after a valid code confirmation.
- MFA is configured per user and available to all roles. 
- Organization can enforce MFA. In this case it is mandatory for all its users and user without a method must enroll one before the first token is issued.
- A user belonging to several organizations is treated as enforced if any of them enforces MFA.

## Integration Requirements

- Policy management and MFA reset are exposed as cluster secret endpoints on `auth` (`Secret` header, same mechanism as existing service-to-service calls).
- Email codes are sent through `herald` (`auth` gets the `herald-client` dependency).
- Use `pyotp` library for one time password management.

# Mockups

New page *Profile → Security*

Configuration of MFA


MFA during login

MFA enforced, but not setup



# Solution Overview

All MFA logic is added to the `auth` service. It will change the process of issuing tokens and introduce challenges (MFA for now and SSO in future).

Currently tokens are created via `POST /auth/v2/tokens`, this endpoint validates credentials and immediately writes a row to Token table. To validate a simple check that token row exists and the macaroon verify is invoked with no caveat inspection. Therefore the intermediate state needed for challenge cannot be a token of any kind. Instead token controller after the existing succeed user check should call the new `MfaController` whether MFA applies:

- if user has at least one confirmed method, it creates a `LoginChallenge` in state `mfa_required` and answer `202` with the challenge and the list of methods;
- if user has none but an organization enforces MFA, challenge in state `enrollment_required` with `202` answer and page to configure a method;
- otherwise answer `201` with a token, exactly as current implementation.

The client then calls `POST /auth/v2/tokens` again with `challenge_id` + `code` + `method_id`. On success the challenge is consumed and `create_user_token` issues the macaroon with a caveat `mfa:<totp|email>`. Token handling therefore stays in exactly one method.

## Enforcement resolution

MFA enforcement is a property of an organization and will be stored as an authentication policy. At login, `auth` looks up the organizations the user belongs to and checks whether any of them has MFA enforced, if at least one does, the user is treated as enforced. The policy object should be generic enough so that it can later hold domain-level settings and SSO configuration without a new model.

## Enforced without a method

If an enforced user signs in with a correct password but has no second factor yet, the system does not issue a token. Instead it returns a short-lived enrollment required challenge and the UI guides the user straight into the add authentication method dialog. That challenge is proof that the password was already verified, and is what authorizes the enrollment calls for the next five minutes, so no session exists until the second factor is in place. As soon as the method is confirmed, the same request returns the token and the user access portal without signing in again.

## Email one time code

Email codes are built on the mechanism already used for password recovery and email verification. It will use the same storage, throttling and invalidation of previous codes. MFA codes are marked with their own purpose and live for ten minutes, so a code issued for password recovery can never be used to pass MFA and vice versa. The `auth` service sends the message itself through `herald` using a dedicated template.

## Authenticator app

Authenticator app codes follow the standard TOTP algorithm (RFC 6238) with default parameters, so Microsoft Authenticator, Google Authenticator, Authy, 1Password works without vendor-specific integration. During enrollment the server generates the shared secret and returns it once, together with a standard provisioning URI, then browser renders the QR code from that URI and shows the manual key as a fallback. A code is accepted only once and within a small time tolerance.

## Operator actions

Resetting a user MFA are exposed as service-to-service operations on `auth`, protected by the cluster secret, so the support ticket process can be fulfilled by internal tooling without any UI.

# Login processing workflow

## Sign in process

**What the **`202`** challenge returns.** In both states the body is the same object: `challenge_id` (single-use and valid 5 or 10 minutes), `state` (`mfa_required` or `enrollment_required`), `expires_at`, `user_email`, `methods` (the user's confirmed methods with `id`, `type`, `label`, `is_default`), `default_method_id` and `code_sent`. No token is issued at this point.

**Requesting an email code during login.** If the default method is email, the code is sent together with the `202`. If the user switches to email via *Use a different method* (or clicks *Resend*), after validation new code will be sent via separate API call. Nothing is sent for an authenticator app — it generates the code locally.

## MFA challenge

## MFA enrollment (including simple add MFA method scenario)

# Model Schema

### MFAMethod

| **Field** | **Type** | **Constraints** | **Example** | **Description** |
| --- | --- | --- | --- | --- |
| id | string (uuid) | READONLY | `d6ce1bbd-c150-47dc-bde7-c8027f1d1724` | Method identifier |
| user\_id | string | FK to `user.id` | `fd41f952-279b-49dc-8a9f-5dafc55ee1ca` | Owner of the method |
| type | enum | `topt email`One active method per type per user | `totp` | Method type |
| secret | string | OPTIONALReturned only in the POST  response fortotp | `JBSWY3DPEHPK3PXP` | Shared TOTP secret, stored encrypted |
| label | string | OPTIONAL | `Configured on Google Pixel 10 Pro` | Free text shown under the method (device info) |
| is\_default | boolean |  | `true` | Preselected method at login |
| confirmed\_at | integer (unix timestamp) | default `0` (pending) | `1758480000` | When the enrollment code was verified. Pending rows older than 15 min are discarded |
| last\_used\_step | integer | not null, default `0`, TOTP only | `58616000` | Replay protection |
| created\_at | integer (unix timestamp) |  | `1758480000` | Creation time |
| deleted\_at | integer (unix timestamp) | default `0` (= not deleted) | `0` | Deletion time |

### LoginChallenge

| **Field** | **Type** | **Constraints** | **Example** | **Description** |
| --- | --- | --- | --- | --- |
| id | string (uuid) | READONLY | `d6ce1bbd-c150-47dc-bde7-c8027f1d1724` | Challenge identifier |
| user\_id | string | FK to `user.id` | `fd41f952-279b-49dc-8a9f-5dafc55ee1ca` | User who passed the password |
| state | enum | `mfa_required enrollment_required` | `mfa_required` | Whether the user must verify or first enroll |
| expires\_at | integer (unix timestamp) | Creation time + 5 or 10 minutes | `1758480000` | Expiry of the challenge, expired rows are ignored and cleaned lazily |
| attempts | integer | default `0`, max `5` | `3` | Failed code entries, on the 5th failure the row is consumed as failed |
| created\_at | integer (unix timestamp) |  | `1758480000` | Creation time |
| deleted\_at | integer (unix timestamp) | default `0` (= not deleted) | `0` | Set when the challenge is consumed (token issued, first method confirmed, operator reset) or locked |

### AuthPolicy

| **Field** | **Type** | **Constraints** | **Example** | **Description** |
| --- | --- | --- | --- | --- |
| id | string (uuid) | READONLY | `d6ce1bbd-c150-47dc-bde7-c8027f1d1724` | Policy identifier |
| scope\_type | enum | `organization domain`Domain value will be needed for SSO later | `organization` | Kind of scope the policy applies to |
| scope\_id | string |  | `d6ce1bbd-c150-47dc-bde7-c8027f1d1724` | Organization id (`Assignment.resource_id`) |
| purpose | enum | `mfa sso` | `mfa` | Members of this scope must pass MFA on local login |
| created\_at | integer (unix timestamp) |  | `1758480000` | Creation time |
| deleted\_at | integer (unix timestamp) | default `0` (= not deleted) | `0` | Deletion time |

### Verification code

New field for existing model VerificationCode

| **Field** | **Type** | **Constraints** | **Example** | **Description** |
| --- | --- | --- | --- | --- |
| purpose | enum | `password mfa` | `mfa` | Separates MFA codes from recovery/verification codes so one can never satisfy the other |

# API

All endpoints will be implemented under `/auth/v2`. Error format is the existing optscale one (`{"error": {"error_code": "OA00xx", "reason": "…"}}`).

## Object Representation

#### MfaMethod

| **Field** | **Type** | **Example** | **Description** |
| --- | --- | --- | --- |
| id | string (uuid) | `a1d3…` |  |
| type | enum | `totp` | `totp` or `email` |
| label | string | `Configured on Google Pixel 10 Pro` | Free text shown under the method (device info). For `email` the server sets a masked address |
| is\_default | boolean | `true` |  |
| confirmed | boolean | `true` | `false` while the enrolment code has not been entered. Source: `MFAMethod.confirmed_at > 0` |
| created\_at | integer (unix ts) | `1758480000` |  |
| secret | string (base32) | `JBSWY3DPEHPK3PXP` |  |
| otpauth\_uri | string | `otpauth://totp/FinOps%20for%20Cloud:reto…?secret=…&issuer=FinOps%20for%20Cloud&digits=6&period=30` | Rendered by the browser as the QR code, built at enrollment: `otpauth://totp/{issuer}:{user.email}?secret={secret}&issuer={issuer}&digits=6&period=30` |

#### MfaStatus

| **Field** | **Type** | **Example** | **Description** |
| --- | --- | --- | --- |
| methods | MfaMethod\[\] | `[…]` | Methods shown on the Security page |
| mfa\_enforced | boolean | `true` | Whether any of the user's organizations enforces MFA |
| enforcing\_organizations | string\[\] | `["4f1e…"]` | Organizations that enforce (for the "Enforced by organization" tooltip) |
| status | enum | `enforced` | `enforced`, `configured` or `not_configured`. |

#### LoginChallenge

| **Field** | **Type** | **Example** | **Description** |
| --- | --- | --- | --- |
| challenge\_id | string | `6d2f…` |  |
| state | enum | `mfa_required` | `mfa_required` or `enrollment_required` |
| expires\_at | integer (unix timestamp) | `1758480300` |  |
| user\_email | string | `reto.mayer@example.com` | For "Signing in as …" |
| methods | MfaMethod\[\] | `[…]` | Confirmed methods to pick from, for enrollment list is empty |
| default\_method\_id | string \| null | `a1d3…` |  |
| code\_sent | boolean | `true` | Tells the UI not to request a code again. `true` if the default method is `email` and a code was sent when the challenge was created |
| attempts\_left | integer | `5` |  |

#### AuthPolicy

| **Field** | **Type** | **Example** | **Description** |
| --- | --- | --- | --- |
| scope\_type | enum | `organization` | `organization` or `domain` |
| scope\_id | string | `4f1e…` | Organization id |
| purpose | enum | `mfa` | `mfa` or `sso` |
| updated\_at | integer (unix timestamp) \| null | `1758480000` |  |

#### LoginOptions

| **Field** | **Type** | **Example** | **Description** |
| --- | --- | --- | --- |
| methods | string\[\] | `["password"]` | Methods offered after *Continue*. Will be constant `["password"]` until SSO, later derived from the `domain` policy of the email domain |
| sso | object | `{"state":"not_configured"}` | Reserved for SSO resolution |

#### Token

| **Field** | **Type** | **Example** | **Description** |
| --- | --- | --- | --- |
| token | string | `MDAxY…` | Macaroon built by `MacaroonToken.create()` now will add caveat `mfa:<type>` where type is totp, email or none. |

Plus user\_id, user\_email, valid\_until, ip, digest, created\_at fields that already exist.

## API Definition

| **Verb** | **Endpoint** | **Function** | **Explanation** |
| --- | --- | --- | --- |
| POST | `/auth/v2/login_options` | Resolve login options | Step 1 of the two-step login. Accepts `{email}`, returns [LoginOptions](https://softwareone.atlassian.net/wiki/spaces/mpt/pages/edit-v2/7959379996#LoginOptions). |
| POST | `/auth/v2/tokens` | Obtain token (existing) | `{email, password}` or `{email, verification_code}` → `201 Token` or `202 LoginChallenge` when MFA applies. |
| POST | `/auth/v2/tokens` | Complete MFA challenge | `{challenge_id, code, method_id?}` → verifies the code, consumes the challenge, returns `201 Token` with caveat `mfa:<type>`. |
| POST | `/auth/v2/login_challenges/{challenge_id}/codes` | Send e-mail code for a challenge | `{method_id}` of an `email` method → sends OTP via herald. Throttled (1/min). `204` |
| GET | `/auth/v2/users/{user_id}/mfa_methods` | Get MFA methods | Returns [MfaStatus](https://softwareone.atlassian.net/wiki/spaces/mpt/pages/edit-v2/7959379996#MfaStatus) |
| POST | `/auth/v2/users/{user_id}/mfa_methods` | Start enrollment | `{type, label?}` → `201 MfaMethod` (pending). For `totp` includes `secret` + `otpauth_uri`, for `email` additionally sends the code |
| POST | `/auth/v2/users/{user_id}/mfa_methods/{method_id}/confirm` | Confirm enrollment | `{code, challenge_id?}` → `200 MfaMethod` (confirmed). With `challenge_id` → `201 {method, token}`. First confirmed method becomes default |
| PATCH | `/auth/v2/users/{user_id}/mfa_methods/{method_id}` | Update method | `{is_default?}`, `{label?}` → `200 MfaMethod` |
| DELETE | `/auth/v2/users/{user_id}/mfa_methods/{method_id}` | Remove method | `204` |
| DELETE | `/auth/v2/users/{user_id}/mfa_methods` | Reset MFA (available for organization admin) | Soft-deletes all methods of the user and invalidates their token, `204` |
| GET | `/auth/v2/auth_policies?scope_type=organization&scope_id={org_id}` | List policies | Returns [AuthPolicy](https://softwareone.atlassian.net/wiki/spaces/mpt/pages/edit-v2/7959379996#AuthPolicy) |
| POST | `/auth/v2/auth_policies` | Create policy (available for organization manager) | `{scope_type, scope_id, purpose}` → `201 AuthPolicy` |
| DELETE | `/auth/v2/auth_policies/{policy_id}` | Delete policy (available for organization manager) | Soft-deletes the row, `204` |

#### Resolve login options

Request

```
POST /auth/v2/login_options
{ "email": "finops.ffc@example.com" }
```

Response `200`

```json
{ "methods": ["password"], "sso": { "state": "not_configured" } }
```

#### Obtain token — MFA applies

Request

```
POST /auth/v2/tokens
{ "email": "finops.ffc@example.com", "password": "•••" }
```

Response `202`

```json
{
  "challenge_id": "6d2f4c0e-3b1a-4b7e-9d1e-0f4c2a6b8e91",
  "state": "mfa_required",
  "expires_at": 1758480300,
  "user_email": "finops.ffc@example.com",
  "methods": [
    { "id": "a1d3…", "type": "totp",  "label": "Configured on Google Pixel 10 Pro", "is_default": true,  "confirmed": true },
    { "id": "b2e4…", "type": "email", "label": "fi***@example.com",                "is_default": false, "confirmed": true }
  ],
  "default_method_id": "a1d3…",
  "code_sent": false,
  "attempts_left": 5
}
```

Response `202` - enforced MFA, nothing configured

```json
{ 
  "challenge_id": "…",
  "state": "enrollment_required",
  "expires_at": 1758480300,
  "user_email": "finops.ffc@example.com",
  "methods": [],
  "default_method_id": null,
  "code_sent": false,
  "attempts_left": 5
}
```

#### Complete MFA challenge

Request

```
POST /auth/v2/tokens
{ "challenge_id": "6d2f4c0e-…", "method_id": "a1d3…", "code": "482913" }
```

Response `201` - same body as today's token response, the macaroon carries `mfa:totp`.

```json
{ 
  "token": "MDAxY…",
  "user_id": "9c2a…",
  "user_email": "finops.ffc@example.com",
  "created_at": "2026-09-22T09:00:00",
  "valid_until": "2026-09-29T09:00:00",
  "digest": "…"
}
```

Errors: `403` wrong code or no more attempts,  `404` unknown/expired/consumed challenge.

#### Send e-mail code for a challenge

Request

```
POST /auth/v2/login_challenges/6d2f4c0e-…/codes
{ "method_id": "b2e4…" }
```

Response `204`

Errors: `403` code requested less than a minute ago or`404`

#### Get MFA status

Request

```
GET /auth/v2/users/9c2a…/mfa_methods
```

Response `200`

```json
{
  "methods": [
    { 
      "id": "a1d3…",
      "type": "totp",
      "label": "Configured on Google Pixel 10 Pro",
      "is_default": true,
      "confirmed": true,
      "created_at": 1758400000
    }
  ],
  "mfa_enforced": true,
  "enforcing_organizations": ["4f1e…"],
  "status": "enforced"
}
```

#### Start enrollment (authenticator app)

Request

```
POST /auth/v2/users/9c2a…/mfa_methods
{ "type": "totp", "label": "Configured on Google Pixel 10 Pro" }
```

Response `201`

```json
{ 
  "id": "a1d3…",
  "type": "totp",
  "label": "Configured on Google Pixel 10 Pro",
  "is_default": false,
  "confirmed": false,
  "created_at": 1758480000,
  "secret": "JBSWY3DPEHPK3PXP",
  "otpauth_uri": "otpauth://totp/FinOps%20for%20Cloud:reto.mayer%40example.comsecret=JBSWY3DPEHPK3PXP&issuer=FinOps%20for%20Cloud&digits=6&period=30"
}
```

For `{ "type": "email" }` the response has no `secret`/`otpauth_uri`, a code is sent to the account email

#### Confirm enrollment

Request

```
POST /auth/v2/users/9c2a…/mfa_methods/a1d3…/confirm
{ "code": "482913" }
```

Response `200` -  `MfaMethod` with `confirmed: true` (and `is_default: true` if it is the first)

Request with a challenge:

```json
{ "code": "482913", "challenge_id": "6d2f4c0e-…" }
```

Response `201`

```json
{ 
  "method": { 
    "id": "a1d3…",
    "type": "totp",
    "is_default": true,
    "confirmed": true, 
    "label": "…",
    "created_at": 1758480000 
  },
  "token": { 
    "token": "MDAxY…", 
    "user_id": "9c2a…", 
    "user_email": "finops.ffc@example.com", 
    "valid_until": "…",
    "created_at": "…",
    "ip": "…",
    "digest": "…"
  }
}
```

#### Update / remove a method

Request

```
PATCH /auth/v2/users/9c2a…/mfa_methods/b2e4…
{ "is_default": true }
```

Response `200` with `MfaMethod`.

Request

```
DELETE /auth/v2/users/9c2a…/mfa_methods/a1d3…
```

Response `204`. 

#### Reset MFA

Request

```
DELETE /auth/v2/users/9c2a…/mfa_methods
```

Response `204`. All methods soft-deleted, all tokens of the user deleted, pending challenges consumed.

#### Organization policies

Request

```
GET /auth/v2/auth_policies?scope_type=organization&scope_id=4f1e…
```

Response `200`

```json
[{ "scope_type": "organization", "scope_id": "4f1e…", "purpose": "mfa", "updated_at": null }]
```

#### Enforce organization MFA

Request

```
POST /auth/v2/auth_policies
{ "scope_type": "organization", "scope_id": "4f1e…", "purpose": "mfa" }
```

Response `201`.

```json
{ 
  "id": "c7e1…",
  "scope_type": "organization",
  "scope_id": "4f1e…", 
  "purpose": "mfa",
  "created_at": 1758480000
}
```

#### Stop enforcing

Request

```
DELETE /auth/v2/auth_policies/c7e1…
```

Response `204`.

# Limitations

| **Limitation** | **Scope/Description** |
| --- | --- |
| Token issuing | Existing `POST /auth/v2/tokens` workflow stays as is: every current caller keeps receiving `201` with a token. A new branch returns `202` with a login challenge only when the user has an MFA method configured or their organization enforces MFA. The challenge is completed by a second call to the same endpoint. Cluster-secret issuance by `user_id` is untouched. Password-recovery login (`verification_code`) also passes through the challenge to avoid bypass possibility |
| User self-registration | Untouched. Registration still returns a token immediately (no MFA method exists yet). MFA is a separate, later step: a banner or a post-registration prompt leading to Profile → Security. Enforcement applies only once the user belongs to an organization that enforces MFA (at the next login) |
| MFA recovery | Self-service via the authenticator's shared secret: at enrolment the manual key is shown next to the QR code with guidance to store it securely (in password manager for example). A user restores the same method on a new device by entering the key, no server action needed |
| Sign in using third party provider | Untouched. MFA applies to local (password) authentication only |

# Effort estimation

TBD

# Materials

**\<Link to vimeo recording of the Design Review Meeting\>**

design-review
