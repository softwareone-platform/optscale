// The service sends one e-mail code per address and purpose a minute.
export const RESEND_EMAIL_CODE_AFTER_SECONDS = 60;

export const EMAIL_CODE_FAILURE = Object.freeze({
  TOO_SOON: "too_soon",
  UNEXPECTED: "unexpected"
} as const);

export const MFA_CHALLENGE_VIEW = Object.freeze({
  NO_SELECTABLE_METHODS: "no_selectable_methods",
  METHOD_PICKER: "method_picker",
  CODE_ENTRY: "code_entry"
} as const);
