/** `VITE_MFA_CHALLENGE_CODES=true` lets the sign-in ask for another e-mail code — a route not deployed yet. */
export const IS_MFA_CHALLENGE_CODES_ENABLED = import.meta.env.VITE_MFA_CHALLENGE_CODES === "true";

/** `VITE_CURRENT_PASSWORD_CHECK=true` sends the current password with a password change — the auth service ignores it so far. */
export const IS_CURRENT_PASSWORD_CHECK_ENABLED = import.meta.env.VITE_CURRENT_PASSWORD_CHECK === "true";
