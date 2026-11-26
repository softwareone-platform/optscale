import { ObjectValues } from "utils/types";

export const MFA_METHOD_TYPE = Object.freeze({
  TOTP: "totp",
  EMAIL: "email",
} as const);

export type MfaMethodType = ObjectValues<typeof MFA_METHOD_TYPE>;

/** Snake_case: the auth service payload verbatim, in a login challenge and under `/mfa_methods` alike. */
export type MfaMethod = {
  id: string;
  type: MfaMethodType;
  // `null` for an authenticator app enrolled without one; an e-mail method always carries the masked address.
  label: string | null;
  is_default: boolean;
  confirmed: boolean;
};
