import { ResolveLoginOptions } from "@theme/api/auth/signIn/types";
import { LOGIN_OPTIONS_BODY } from "./fixtures";

/**
 * Stands in for `POST /auth/v2/login_options`. Every address gets the same answer: the TDR pins `methods` to
 * `["password"]` until SSO ships, and an address-dependent answer would leak which e-mails have an account.
 */
export const resolveLoginOptionsMock: ResolveLoginOptions = async () => LOGIN_OPTIONS_BODY;
