export const EMAIL_CODE_FAILURE = Object.freeze({
  NOT_SENT: "not_sent",
  TOO_SOON: "too_soon",
  UNEXPECTED: "unexpected",
} as const);

export const MFA_CHALLENGE_VIEW = Object.freeze({
  NO_SELECTABLE_METHODS: "no_selectable_methods",
  METHOD_PICKER: "method_picker",
  CODE_ENTRY: "code_entry",
} as const);
