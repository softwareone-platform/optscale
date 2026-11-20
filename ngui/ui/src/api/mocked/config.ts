/**
 * Every setting of the mocked API in one place. `vite.config.mts` and `http/mockedApiPlugin.ts` load
 * this file without the path aliases, so it must not import anything.
 */

/** Requests under this prefix are matched against the mocked routes; the rest go straight to the proxy. */
export const MOCKED_PATH_PREFIX = "/api/auth/v2/";

export const MOCKED_HANDLERS_MODULE = "/src/api/mocked/http/handlers.ts";

/** Mock-only route, relative to `/auth/v2`, holding the real session the mocked sign-in hands out. Never proxied. */
export const MOCKED_REAL_SESSION_PATH = "/__mocked__/session";

/** Every mocked call waits this long, so the pending states are visible while clicking through. */
export const MOCK_LATENCY_MS = 600;

/**
 * Any valid address signs in; the password, the e-mailed recovery or verification code and the MFA code are what
 * the mock checks. A mocked password recovery replaces the password until the dev server restarts.
 */
export const MOCK_SIGN_IN_CREDENTIALS = Object.freeze({
  email: "finops.ffc@example.com",
  password: "password",
  verificationCode: "123456",
  mfaCode: "123456"
});

/** Challenge lifetimes, from the TDR's `LoginChallenge` model. Attempts come with each 202 body. */
export const MOCK_LOGIN_CHALLENGE = Object.freeze({
  TTL_SECONDS: 5 * 60,
  // The `mfa_expiring` scenario, short enough to watch the countdown run out.
  SHORT_TTL_SECONDS: 10
});

/** From the auth service: one e-mail code per address and purpose a minute; pending enrollments live 15 minutes. */
export const MOCK_MFA = Object.freeze({
  CODE_THROTTLE_SECONDS: 60,
  PENDING_ENROLLMENT_TTL_SECONDS: 15 * 60,
  EMAIL_CODE_TTL_SECONDS: 10 * 60,
  // Wrong codes a user may enter across challenges within the window before every code answers OA0090.
  USER_FAILED_ATTEMPTS_LIMIT: 10,
  USER_FAILED_ATTEMPTS_WINDOW_SECONDS: 15 * 60
});

/**
 * Organizations the policy routes refuse, standing in for what the mock cannot know: which organizations exist and
 * which the signed-in user manages. Any other id is a known one the user manages.
 */
export const MOCK_AUTH_POLICY = Object.freeze({
  UNKNOWN_ORGANIZATION_ID: "unknown-organization",
  // Has an MFA policy already, which the user can see but not change.
  NOT_MANAGED_ORGANIZATION_ID: "not-managed-organization"
});

/** Carry the dev panel's scenarios to the dev-server middleware alongside the app's own `fetch`. */
export const SIGN_IN_SCENARIO_COOKIE = "finops_mocked_sign_in_scenario";

export const SECURITY_SCENARIO_COOKIE = "finops_mocked_security_scenario";

export const DEV_PANEL_COLLAPSED_STORAGE_KEY = "finops_mocked_api_dev_panel_collapsed";

/**
 * Whether the middleware answers and the dev panel shows — one rule for both, so they cannot disagree.
 * On while the `mfa_login` flag is; `VITE_MOCKED_API=false` points the new UI at a real backend.
 */
export const isMockedApiEnabled = ({ mfaLogin, mockedApiEnv }: { mfaLogin?: boolean; mockedApiEnv?: string }) =>
  mfaLogin === true && mockedApiEnv !== "false";
