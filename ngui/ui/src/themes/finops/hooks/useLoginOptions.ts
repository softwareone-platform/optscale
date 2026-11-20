import { resolveLoginOptions } from "@theme/api/auth/signIn";
import { useAsyncCall } from "@theme/hooks/useAsyncCall";

/**
 * Drives the email step of sign-in: resolves which authentication methods an address offers,
 * before any password is asked for.
 */
export const useLoginOptions = () => {
  const { onCall: onResolveLoginOptions, isLoading } = useAsyncCall(resolveLoginOptions);

  return { onResolveLoginOptions, isLoading };
};
