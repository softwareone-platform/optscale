import { MFA_METHOD_TYPE, MfaMethodType } from "api/auth/mfaMethod";

export const MFA_METHOD_NAME_MESSAGE_ID: Record<MfaMethodType, string> = {
  [MFA_METHOD_TYPE.TOTP]: "signIn:authenticatorApp",
  [MFA_METHOD_TYPE.EMAIL]: "signIn:emailVerificationCode",
};
