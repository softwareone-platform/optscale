import { useOrganizationFeatures } from "@main/hooks/coreData/useOrganizationFeatures";
import { themeFeature } from "../utils/features/themeFeature";

export const useIsFeatureEnabled = (featureName: string) => {
  const { [featureName]: featureFlag = 0 } = useOrganizationFeatures();
  const themeFeatureFlag = themeFeature(featureName);

  if (themeFeatureFlag !== undefined) {
    return themeFeatureFlag;
  }

  return featureFlag === 1;
};
