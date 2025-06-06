import { GET_POOL_ALLOWED_ACTIONS, GET_RESOURCE_ALLOWED_ACTIONS } from "api/auth/actionTypes";
import { useApiData } from "hooks/useApiData";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { hasIntersection, getLength, isIdentical } from "utils/arrays";
import { SCOPE_TYPES } from "utils/constants";
import { useOrganizationAllowedActions } from "./coreData/useOrganizationAllowedActions";

const CHECK_PERMISSION_CONDITION = Object.freeze({
  OR: "or",
  AND: "and"
});

const getComparingFunction = (condition) =>
  ({
    [CHECK_PERMISSION_CONDITION.OR]: (requiredActions, allowedActions) => hasIntersection(requiredActions, allowedActions),
    [CHECK_PERMISSION_CONDITION.AND]: (requiredActions, allowedActions) => isIdentical(requiredActions, allowedActions)
  })[condition];

const isAllowed = (requiredActions, allowedActions, condition = CHECK_PERMISSION_CONDITION.OR) => {
  if (getLength(requiredActions) === 0) {
    return true;
  }

  if (getLength(allowedActions) === 0) {
    return false;
  }

  return getComparingFunction(condition)(requiredActions, allowedActions);
};

const getLabel = (entityType) => {
  switch (entityType) {
    case SCOPE_TYPES.POOL:
      return GET_POOL_ALLOWED_ACTIONS;
    case SCOPE_TYPES.RESOURCE:
      return GET_RESOURCE_ALLOWED_ACTIONS;
    default:
      return "";
  }
};

const useScopedAllowedActions = (entityType, entityId) => {
  const { organizationId } = useOrganizationInfo();

  const label = getLabel(entityType);

  const id = entityType === SCOPE_TYPES.ORGANIZATION ? organizationId : entityId;

  const {
    apiData: { allowedActions = {} }
  } = useApiData(label);

  const organizationAllowedActions = useOrganizationAllowedActions();

  if (!organizationId) {
    return [];
  }

  if (organizationAllowedActions && entityType === SCOPE_TYPES.ORGANIZATION) {
    return organizationAllowedActions[organizationId] || [];
  }

  return allowedActions[id] || [];
};

export const useAllAllowedActions = () => {
  const {
    apiData: { allowedActions: poolAllowedAction = {} }
  } = useApiData(GET_POOL_ALLOWED_ACTIONS);

  const {
    apiData: { allowedActions: resourceAllowedAction = {} }
  } = useApiData(GET_RESOURCE_ALLOWED_ACTIONS);

  const organizationAllowedActions = useOrganizationAllowedActions();

  return {
    [SCOPE_TYPES.POOL]: poolAllowedAction,
    [SCOPE_TYPES.RESOURCE]: resourceAllowedAction,
    [SCOPE_TYPES.ORGANIZATION]: organizationAllowedActions
  };
};

export type IsAllowedProperties = {
  entityId?: string;
  entityType?: string;
  requiredActions?: string[];
  condition?: "and" | "or";
};

/**
 * @description We can check permissions for three types of entities - organization, pool, resource.
 * @param {string} entityType - One of the organization, pool, resource, etc.
 * @param {string} entityId
 * @param {string} condition - One of "and", "or"
 * @returns True or False based on whether the user has the required actions for the specified entity.
 */
export const useIsAllowed = ({
  entityId,
  entityType = SCOPE_TYPES.ORGANIZATION,
  requiredActions = [],
  condition
}: IsAllowedProperties) => {
  const scopedAllowedActions = useScopedAllowedActions(entityType, entityId);

  return isAllowed(requiredActions, scopedAllowedActions, condition);
};

/**
 *
 * @param {Object[]} configuration - An array of configuration objects where each object describes what `entityId`, `entityType`, and `requiredActions` should be checked
 * @param {string} configuration[].entityId
 * @param {string} configuration[].entityType
 * @param {array} configuration[].requiredActions
 * @returns a boolean flag which indicates if a user has permissions to manage some entity described in the `configuration` array
 */
export const useIsAllowedForSome = (configuration) => {
  const allEntityTypesAllowedAction = useAllAllowedActions();

  return configuration.some(({ requiredActions, entityId, entityType, condition }) => {
    const entityAllowedActions = allEntityTypesAllowedAction[entityType][entityId] ?? [];

    return isAllowed(requiredActions, entityAllowedActions, condition);
  });
};

export const useAllowedItems = ({ entityType = SCOPE_TYPES.ORGANIZATION, entityId, items }) => {
  const scopedAllowedActions = useScopedAllowedActions(entityType, entityId);

  return items
    .map((item) =>
      isAllowed(item.requiredActions, scopedAllowedActions, item.condition) ? item : item.renderIfNotAllowed || null
    )
    .filter(Boolean);
};

export const useFilterByPermissions = ({ entitiesIds, entitiesType, permissions, condition }) => {
  const label = getLabel(entitiesType);

  const {
    apiData: { allowedActions = {} }
  } = useApiData(label);

  const organizationAllowedActions = useOrganizationAllowedActions();

  const allowedEntityActions = entitiesType === SCOPE_TYPES.ORGANIZATION ? organizationAllowedActions : allowedActions;

  return entitiesIds.filter((entityId) => isAllowed(permissions, allowedEntityActions[entityId] || [], condition));
};
