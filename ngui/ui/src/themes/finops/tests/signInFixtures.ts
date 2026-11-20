import { MFA_METHOD_TYPE, MfaMethod } from "@theme/api/auth/mfaMethod";
import { LOGIN_CHALLENGE_STATE } from "@theme/api/auth/signIn/constants";
import { AuthToken, LoginChallenge } from "@theme/api/auth/signIn/types";
import { getCurrentUTCTimeInSec } from "utils/datetime";

/** Spec-only bodies from the TDR's sign-in examples, shared by every spec that signs in. */

/** The "Obtain token" 201 token — a real macaroon the app can deserialize. */
export const ISSUED_TOKEN: AuthToken = {
  token:
    "MDAxNmxvY2F0aW9uIG9wdHNjYWxlCjAwMzRpZGVudGlmaWVyIDljMmExZjNlLTViNDctNGEyMS04ZjBjLTFkNmU4YjNhN2M0MgowMDExY2lkIG1mYTpub25lCjAwMmZzaWduYXR1cmUgrrkLrCmb0VcdYWsrr-lUxd9rs-V-iq_yANUMhSBaeHIK",
  user_id: "9c2a1f3e-5b47-4a21-8f0c-1d6e8b3a7c42",
  user_email: "finops.ffc@example.com",
  created_at: "2026-09-22T09:00:00",
  valid_until: "2026-09-29T09:00:00",
  ip: "127.0.0.1",
  digest: "f0a1b2c3d4e5f60718293a4b5c6d7e8f"
};

/** The two methods of the "Obtain token — MFA applies" 202. */
export const TOTP_METHOD: MfaMethod = {
  id: "a1d3",
  type: MFA_METHOD_TYPE.TOTP,
  label: "Configured on Google Pixel 10 Pro",
  is_default: true,
  confirmed: true
};

export const EMAIL_METHOD: MfaMethod = {
  id: "b2e4",
  type: MFA_METHOD_TYPE.EMAIL,
  label: "fi***@example.com",
  is_default: false,
  confirmed: true
};

/** The "MFA applies" 202, dated from now so it is not already expired on arrival. */
export const MFA_REQUIRED_CHALLENGE: LoginChallenge = {
  challenge_id: "6d2f4c0e-3b1a-4b7e-9d1e-0f4c2a6b8e91",
  user_id: ISSUED_TOKEN.user_id,
  state: LOGIN_CHALLENGE_STATE.MFA_REQUIRED,
  expires_at: getCurrentUTCTimeInSec() + 5 * 60,
  user_email: "finops.ffc@example.com",
  methods: [TOTP_METHOD, EMAIL_METHOD],
  default_method_id: TOTP_METHOD.id,
  code_sent: false,
  attempts_left: 5
};

/** The "enforced MFA, nothing configured" 202. */
export const ENROLLMENT_REQUIRED_CHALLENGE: LoginChallenge = {
  ...MFA_REQUIRED_CHALLENGE,
  state: LOGIN_CHALLENGE_STATE.ENROLLMENT_REQUIRED,
  methods: [],
  default_method_id: null
};
