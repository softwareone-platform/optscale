import { useCallback, useEffect, useState } from "react";

type FetchedResource<TData> =
  | { status: "loading"; data: TData | null }
  | { status: "error"; data: TData | null }
  | { status: "loaded"; data: TData };

/**
 * Loads on mount and again whenever `fetchResource` changes identity, so pass a memoised function.
 * `refetch` keeps the last data on screen while it reloads, and never rejects.
 */
export const useFetchedResource = <TData>(fetchResource: () => Promise<TData>) => {
  const [state, setState] = useState<FetchedResource<TData>>({ status: "loading", data: null });

  const refetch = useCallback(async () => {
    setState((previous) => ({ status: "loading", data: previous.data }));

    try {
      setState({ status: "loaded", data: await fetchResource() });
    } catch {
      setState((previous) => ({ status: "error", data: previous.data }));
    }
  }, [fetchResource]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { ...state, refetch };
};
