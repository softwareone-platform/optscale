import { useIsAllowed } from "./useAllowedActions";

export const useIsManageBillingSubscriptionAllowed = () => useIsAllowed({ requiredActions: ["EDIT_PARTNER"] });
