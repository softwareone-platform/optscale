import { useOrganizationFeatures } from "./coreData/useOrganizationFeatures";

export const useIsFeatureEnabled = (featureName: string) => {
  const { [featureName]: featureFlag = 0 } = useOrganizationFeatures();

  return featureFlag === 1;
};
