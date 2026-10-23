import { MFA_METHOD_TYPE } from "@theme/api/auth/signIn/constants";
import { AuthToken, MfaMethod } from "@theme/api/auth/signIn/types";

/**
 * Response bodies taken from the "FFC: TDR FinOps for Cloud MFA" design record
 * (Obtain token / Complete MFA challenge). Kept verbatim so they can be diffed against the
 * real endpoint once the auth service ships the challenge branch.
 */

export const MOCK_USER_ID = "9c2a1f3e-5b47-4a21-8f0c-1d6e8b3a7c42";

/**
 * A real serialized macaroon: location "optscale", identifier MOCK_USER_ID, caveat "mfa:none".
 * Minted once with node-macaroons and pasted here so the mock stays a plain data module while
 * `utils/macaroons` can still deserialize it exactly like a token from the auth service.
 */
export const MOCK_TOKEN =
  "MDAxNmxvY2F0aW9uIG9wdHNjYWxlCjAwMzRpZGVudGlmaWVyIDljMmExZjNlLTViNDctNGEyMS04ZjBjLTFkNmU4YjNhN2M0MgowMDExY2lkIG1mYTpub25lCjAwMmZzaWduYXR1cmUgrrkLrCmb0VcdYWsrr-lUxd9rs-V-iq_yANUMhSBaeHIK";

export const TOTP_METHOD_ID = "a1d3f7c0-2e18-4c9b-9a55-7b0d1c4e6f32";

export const EMAIL_METHOD_ID = "b2e47d91-6c03-4f8a-b1d2-5e9a3c7f0481";

const maskEmail = (email: string) => {
  const [localPart = "", domain = ""] = email.split("@");

  return `${localPart.slice(0, 2)}***@${domain}`;
};

export const getConfirmedMethods = (email: string): MfaMethod[] => [
  {
    id: TOTP_METHOD_ID,
    type: MFA_METHOD_TYPE.TOTP,
    label: "Configured on Google Pixel 10 Pro",
    is_default: true,
    confirmed: true
  },
  {
    id: EMAIL_METHOD_ID,
    type: MFA_METHOD_TYPE.EMAIL,
    label: maskEmail(email),
    is_default: false,
    confirmed: true
  }
];

export const getAuthToken = (email: string): AuthToken => ({
  token: MOCK_TOKEN,
  user_id: MOCK_USER_ID,
  user_email: email,
  created_at: "2026-09-22T09:00:00",
  valid_until: "2026-09-29T09:00:00",
  ip: "127.0.0.1",
  digest: "f0a1b2c3d4e5f60718293a4b5c6d7e8f"
});
