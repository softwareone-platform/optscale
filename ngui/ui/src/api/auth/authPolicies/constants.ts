export const AUTH_POLICY_SCOPE_TYPE = Object.freeze({
  ORGANIZATION: "organization",
  // Reserved for SSO, not managed yet.
  DOMAIN: "domain",
} as const);

export const AUTH_POLICY_PURPOSE = Object.freeze({
  MFA: "mfa",
  SSO: "sso",
} as const);
