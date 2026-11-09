import { ResolveLoginOptions } from "@theme/api/auth/signIn/types";
import { MOCK_LATENCY_MS } from "@theme/api/mocked/config";
import { delay } from "@theme/api/mocked/mockDelay";
import { LOGIN_OPTIONS_BODY } from "./fixtures";

/**
 * Stands in for `POST /auth/v2/login_options` — step 1 of the two-step login.
 *
 * The answer is deliberately the same for every address: the TDR pins `methods` to a constant
 * `["password"]` until SSO ships, and an address-dependent answer would leak which e-mails have
 * an account.
 */
export const resolveLoginOptionsMock: ResolveLoginOptions = async () => {
  await delay(MOCK_LATENCY_MS);

  return LOGIN_OPTIONS_BODY;
};
