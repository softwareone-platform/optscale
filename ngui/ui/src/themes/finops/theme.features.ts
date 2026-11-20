type FeatureFlags = {
  [key: string]: boolean | undefined;
};

/** `VITE_MFA_LOGIN=true` turns the MFA work on; anything else, unset included, keeps upstream's sign-in. */
export const isMfaLoginEnabled = (envValue?: string) => envValue === "true";

export const featureFlags: FeatureFlags = {
  organization_creation_allowed: false,
  organization_edit_allowed: false,
  product_tour: false,
  paid_organization: true,
  kubernetes_data_source: false,
  // `vite.config.mts` imports this file under Node, where `import.meta.env` does not exist.
  mfa_login: isMfaLoginEnabled(import.meta.env?.VITE_MFA_LOGIN)
};
