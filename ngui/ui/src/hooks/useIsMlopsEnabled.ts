import { useIsFeatureEnabled } from "./useIsFeatureEnabled";

export const useIsMlopsEnabled = (): boolean => useIsFeatureEnabled("mlops_enabled");
