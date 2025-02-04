import { useOrganizationFeatures } from "./coreData";

export const useIsFeatureEnabled = (featureName) => {
  const { [featureName]: featureFlag = 0 } = useOrganizationFeatures();

  return featureFlag === 1;
};
