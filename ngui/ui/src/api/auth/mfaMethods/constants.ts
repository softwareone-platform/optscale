/** `MfaStatus.status` — `enforced` wins over `configured` when both hold, as in the TDR example. */
export const MFA_STATUS = Object.freeze({
  ENFORCED: "enforced",
  CONFIGURED: "configured",
  NOT_CONFIGURED: "not_configured",
} as const);
