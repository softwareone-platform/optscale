import { postAuth } from "./request";
import { LoginOptions, ResolveLoginOptions } from "./types";

/**
 * `POST /auth/v2/login_options` — the email step of sign-in.
 *
 * The route exists on the auth service's `feature/mfa` branch but is not deployed yet; in dev the
 * mocked API plugin in `api/mocked/` answers it instead.
 */
export const resolveLoginOptions: ResolveLoginOptions = async ({ email }) => {
  const { data } = await postAuth<LoginOptions>("/login_options", { email });

  return data;
};
