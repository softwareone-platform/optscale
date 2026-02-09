import { themeFeature } from "../utils/features/themeFeature";
import { useOrganizationFeatures } from "./coreData/useOrganizationFeatures";

export const useIsFeatureEnabled = (featureName: string) => {
  const { [featureName]: featureFlag = 0 } = useOrganizationFeatures();
  const themeFeatureFlag = themeFeature(featureName);

  if (themeFeatureFlag !== undefined) {
    return themeFeatureFlag;
  }

  return featureFlag === 1;
};
