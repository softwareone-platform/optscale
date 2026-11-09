/**
 * Every setting of the mocked API in one place. `vite.config.mts` and `http/mockedApiPlugin.ts` load
 * this file without the path aliases, so it must not import anything.
 *
 * Response bodies are not settings — they are JSON files in `responses/`.
 */

/** Requests under this prefix are matched against the mocked routes; the rest go straight to the proxy. */
export const MOCKED_PATH_PREFIX = "/api/auth/v2/";

export const MOCKED_HANDLERS_MODULE = "/src/themes/finops/api/mocked/http/handlers.ts";

/** Every mocked call waits this long, so the pending states are visible while clicking through. */
export const MOCK_LATENCY_MS = 600;

/** Any valid address signs in; the password and the MFA code are what the mock checks. */
export const MOCK_SIGN_IN_CREDENTIALS = Object.freeze({
  email: "finops.ffc@example.com",
  password: "password",
  mfaCode: "123456"
});

/** Challenge lifetimes, from the TDR's `LoginChallenge` model. Attempts come with each 202 body. */
export const MOCK_LOGIN_CHALLENGE = Object.freeze({
  TTL_SECONDS: 5 * 60,
  // The `mfa_expiring` scenario, short enough to watch the countdown run out.
  SHORT_TTL_SECONDS: 10
});

/** Carries the dev panel's scenario to the dev-server middleware alongside the app's own `fetch`. */
export const SIGN_IN_SCENARIO_COOKIE = "finops_mocked_sign_in_scenario";

export const DEV_PANEL_COLLAPSED_STORAGE_KEY = "finops_mocked_api_dev_panel_collapsed";

/**
 * Whether the middleware answers and the dev panel shows — one rule for both, so they cannot disagree.
 * On while the `mfa_login` flag is; `VITE_MOCKED_API=false` points the new UI at a real backend.
 */
export const isMockedApiEnabled = ({ mfaLogin, mockedApiEnv }: { mfaLogin?: boolean; mockedApiEnv?: string }) =>
  mfaLogin === true && mockedApiEnv !== "false";
