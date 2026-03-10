import { featureFlags } from "@theme/theme.features";

export const themeFeature = (featureName: string): boolean | undefined => {
  const { [featureName]: featureFlag } = featureFlags;

  return featureFlag;
};
