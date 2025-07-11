import { useShallowEqualSelector } from "hooks/useShallowEqualSelector";
import { ALERTS } from "./reducer";
import { StoredAlert } from "./types";

export const useAllAlertsSelector = (organizationId: string): StoredAlert[] => {
  const allAlerts = useShallowEqualSelector((state) => {
    const alerts = state[ALERTS];

    const currentOrganizationAlerts = alerts[organizationId] || [];

    return currentOrganizationAlerts;
  });
  return allAlerts;
};
