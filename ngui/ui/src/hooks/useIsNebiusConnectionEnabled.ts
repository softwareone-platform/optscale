import { useOrganizationFeatures } from "./coreData";

export const useIsNebiusConnectionEnabled = () => {
  const { nebius_connection_enabled: nebiusConnectionEnabled = 0 } = useOrganizationFeatures();

  return nebiusConnectionEnabled === 1;
};
