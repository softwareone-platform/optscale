/** `VITE_MFA_LOGIN=true` turns the MFA work on; anything else, unset included, keeps the original sign-in. */
export const isMfaLoginEnabled = (envValue?: string) => envValue === "true";

// `vite.config.mts` imports this file under Node, where `import.meta.env` does not exist.
export const IS_MFA_LOGIN_ENABLED = isMfaLoginEnabled(import.meta.env?.VITE_MFA_LOGIN);
