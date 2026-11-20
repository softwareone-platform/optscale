import { MFA_METHOD_TYPE, MfaMethod } from "@theme/api/auth/signIn";

/** Spec-only: the two methods from the TDR's "Obtain token — MFA applies" 202 example. */

export const totpMethod: MfaMethod = {
  id: "a1d3",
  type: MFA_METHOD_TYPE.TOTP,
  label: "Configured on Google Pixel 10 Pro",
  is_default: true,
  confirmed: true
};

export const emailMethod: MfaMethod = {
  id: "b2e4",
  type: MFA_METHOD_TYPE.EMAIL,
  label: "fi***@example.com",
  is_default: false,
  confirmed: true
};
