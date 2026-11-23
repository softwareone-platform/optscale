import { isInvalidCredentialsError, isTooManyFailedAttemptsError } from "api/auth/signIn";

/** What the password step says when the sign-in is refused; anything unexpected stays retryable. */
export const getPasswordSignInErrorMessageId = (error: unknown) => {
  if (isTooManyFailedAttemptsError(error)) {
    return "signIn:challengeTooManyFailedAttempts";
  }

  return isInvalidCredentialsError(error) ? "signIn:invalidCredentials" : "somethingWentWrong";
};
