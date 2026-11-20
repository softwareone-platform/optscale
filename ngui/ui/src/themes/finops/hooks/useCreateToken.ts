import { createToken } from "@theme/api/auth/signIn";
import { useAsyncCall } from "@theme/hooks/useAsyncCall";

/**
 * Drives the password step of sign-in. Rejects with an `AuthApiError` so the caller can tell
 * invalid credentials from anything else.
 */
export const useCreateToken = () => {
  const { onCall: onCreateToken, isLoading } = useAsyncCall(createToken);

  return { onCreateToken, isLoading };
};
