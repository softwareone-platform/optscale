import { postAuth } from "./request";
import { LoginOptions, ResolveLoginOptions } from "./types";

/**
 * `POST /auth/v2/login_options` — the email step of sign-in.
 *
 * The auth service does not expose this route yet; in dev the mocked API plugin answers it
 * instead. See [`api/mocked/README.md`](../../mocked/README.md).
 */
export const resolveLoginOptions: ResolveLoginOptions = async ({ email }) => {
  const { data } = await postAuth<LoginOptions>("/login_options", { email });

  return data;
};
