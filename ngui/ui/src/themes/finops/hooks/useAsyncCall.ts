import { useCallback, useState } from "react";

/**
 * Wraps a one-shot API call with its own pending flag.
 *
 * Rejections are left to propagate — the caller is the one that can tell an expected failure
 * from an unexpected one. Only `isLoading` is owned here.
 */
export const useAsyncCall = <TParams, TResult>(call: (params: TParams) => Promise<TResult>) => {
  const [isLoading, setIsLoading] = useState(false);

  const onCall = useCallback(
    async (params: TParams): Promise<TResult> => {
      setIsLoading(true);

      try {
        return await call(params);
      } finally {
        setIsLoading(false);
      }
    },
    [call]
  );

  return { onCall, isLoading };
};
