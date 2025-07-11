import { SCOPE_TYPES } from "utils/constants";
import { useCurrentEmployee } from "./coreData/useCurrentEmployee";
import { useIsAllowed, useIsAllowedForSome } from "./useAllowedActions";

// TODO: There are thoughts to change the approach here, to make it more readable and flexible. The discussed options can be seen at the link - https://gitlab.com/hystax/ngui/-/merge_requests/1669
const getAllowedActionsConfiguration = (employeeId, resourceId, currentEmployeeId) => {
  if (!employeeId) {
    return { requiredActions: ["MANAGE_RESOURCES"] };
  }
  if (employeeId === currentEmployeeId) {
    return { entityType: SCOPE_TYPES.RESOURCE, entityId: resourceId, requiredActions: ["MANAGE_OWN_RESOURCES"] };
  }
  return { entityType: SCOPE_TYPES.RESOURCE, entityId: resourceId, requiredActions: ["MANAGE_RESOURCES"] };
};

export const useIsAllowedToManageResourceConstraint = (employeeId, resourceId) => {
  const { id: currentEmployeeId } = useCurrentEmployee();

  const configuration = getAllowedActionsConfiguration(employeeId, resourceId, currentEmployeeId);

  const isAllowed = useIsAllowed(configuration);

  return isAllowed;
};

/**
 *
 * @param {array} configuration - array of `{ employeesId, resourceId }` pairs
 * @returns a boolean flag which indicates if a user is able to manage some resource constraint
 */
export const useIsAllowedToManageAnyResourceConstraint = (configuration) => {
  const { id: currentEmployeeId } = useCurrentEmployee();

  const allowedActionsConfiguration = configuration.map(({ resourceId, employeeId }) =>
    getAllowedActionsConfiguration(employeeId, resourceId, currentEmployeeId)
  );

  return useIsAllowedForSome(allowedActionsConfiguration);
};
