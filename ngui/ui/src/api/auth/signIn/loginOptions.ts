import { postAuth } from "../request";
import { LoginOptions, ResolveLoginOptions } from "./types";

/** `POST /auth/v2/login_options` — the email step of sign-in. */
export const resolveLoginOptions: ResolveLoginOptions = async ({ email }) => {
  const { data } = await postAuth<LoginOptions>("/login_options", { email });

  return data;
};
