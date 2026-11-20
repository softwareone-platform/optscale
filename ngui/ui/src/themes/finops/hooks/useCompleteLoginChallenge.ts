import { completeLoginChallenge } from "@theme/api/auth/signIn";
import { useAsyncCall } from "@theme/hooks/useAsyncCall";

/** Drives the MFA step of sign-in. Rejects with an `AuthApiError`; sort it with `getMfaVerificationFailure`. */
export const useCompleteLoginChallenge = () => {
  const { onCall: onCompleteLoginChallenge, isLoading } = useAsyncCall(completeLoginChallenge);

  return { onCompleteLoginChallenge, isLoading };
};
