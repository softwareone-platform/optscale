import { useOrganizationFeatures } from "./coreData/useOrganizationFeatures";

export const useIsNebiusConnectionEnabled = () => {
  const { nebius_connection_enabled: nebiusConnectionEnabled = 0 } = useOrganizationFeatures();

  return nebiusConnectionEnabled === 1;
};
