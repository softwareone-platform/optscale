import { MFA_METHOD_TYPE, MfaMethodType } from "@theme/api/auth/signIn";

export const MFA_METHOD_NAME_MESSAGE_ID: Record<MfaMethodType, string> = {
  [MFA_METHOD_TYPE.TOTP]: "signIn:authenticatorApp",
  [MFA_METHOD_TYPE.EMAIL]: "signIn:emailVerificationCode"
};

export const MFA_CHALLENGE_VIEW = Object.freeze({
  NO_SELECTABLE_METHODS: "no_selectable_methods",
  METHOD_PICKER: "method_picker",
  CODE_ENTRY: "code_entry"
} as const);
