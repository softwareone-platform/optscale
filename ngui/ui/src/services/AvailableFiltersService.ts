import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { getAvailableFilters } from "api";
import { GET_AVAILABLE_FILTERS } from "api/restapi/actionTypes";
import { useApiData } from "hooks/useApiData";
import { useApiState } from "hooks/useApiState";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import {
  START_DATE_FILTER,
  END_DATE_FILTER,
  CLOUD_ACCOUNT_ID_FILTER,
  OWNER_ID_FILTER,
  SERVICE_NAME_FILTER,
  REGION_FILTER,
  RESOURCE_TYPE_FILTER,
  ACTIVE_FILTER,
  RECOMMENDATIONS_FILTER,
  CONSTRAINT_VIOLATED_FILTER,
  K8S_NODE_FILTER,
  TAG_FILTER,
  WITHOUT_TAG_FILTER,
  K8S_NAMESPACE_FILTER,
  POOL_ID_FILTER,
  K8S_SERVICE_FILTER,
  NETWORK_TRAFFIC_FROM_FILTER,
  NETWORK_TRAFFIC_TO_FILTER,
  EMPTY_UUID,
  FIRST_SEEN_FROM_FILTER,
  FIRST_SEEN_TO_FILTER,
  LAST_SEEN_FROM_FILTER,
  LAST_SEEN_TO_FILTER
} from "utils/constants";

export const mapAvailableFilterKeys = (params) => ({
  pool_id: params[POOL_ID_FILTER],
  cloud_account_id: params[CLOUD_ACCOUNT_ID_FILTER],
  owner_id: params[OWNER_ID_FILTER],
  service_name: params[SERVICE_NAME_FILTER],
  region: params[REGION_FILTER],
  resource_type: params[RESOURCE_TYPE_FILTER],
  active: params[ACTIVE_FILTER],
  recommendations: params[RECOMMENDATIONS_FILTER],
  constraint_violated: params[CONSTRAINT_VIOLATED_FILTER],
  k8s_node: params[K8S_NODE_FILTER],
  tag: params[TAG_FILTER],
  without_tag: params[WITHOUT_TAG_FILTER],
  k8s_namespace: params[K8S_NAMESPACE_FILTER],
  k8s_service: params[K8S_SERVICE_FILTER],
  traffic_from: params[NETWORK_TRAFFIC_FROM_FILTER],
  traffic_to: params[NETWORK_TRAFFIC_TO_FILTER],
  first_seen_gte: params[FIRST_SEEN_FROM_FILTER],
  first_seen_lte: params[FIRST_SEEN_TO_FILTER],
  last_seen_gte: params[LAST_SEEN_FROM_FILTER],
  last_seen_lte: params[LAST_SEEN_TO_FILTER]
});

export const mapFiltersToApiParams = (filters) => {
  const getObjectValue = (getter) => (obj) => {
    if (obj === null) {
      return EMPTY_UUID;
    }

    if (typeof getter === "function") {
      return getter(obj);
    }

    return obj[getter];
  };

  return {
    pool_id: filters.pool?.map(getObjectValue("id")),
    cloud_account_id: filters.cloud_account?.map(getObjectValue("id")),
    owner_id: filters.owner?.map(getObjectValue("id")),
    service_name: filters.service_name?.map(getObjectValue("name")),
    region: filters.region?.map(getObjectValue("name")),
    resource_type: filters.resource_type?.map(getObjectValue((obj) => `${obj.name}:${obj.type}`)),
    active: filters.active,
    recommendations: filters.recommendations,
    constraint_violated: filters.constraint_violated,
    k8s_node: filters.k8s_node?.map(getObjectValue("name")),
    tag: filters.tag,
    without_tag: filters.without_tag,
    k8s_namespace: filters.k8s_namespace?.map(getObjectValue("name")),
    k8s_service: filters.k8s_service?.map(getObjectValue("name")),
    traffic_from: filters.traffic_from?.map(getObjectValue((obj) => `${obj.name}:${obj.cloud_type}`)),
    traffic_to: filters.traffic_to?.map(getObjectValue((obj) => `${obj.name}:${obj.cloud_type}`))
  };
};

export const useGet = (params = {}, exceptions) => {
  const dispatch = useDispatch();
  const { organizationId } = useOrganizationInfo();
  const {
    apiData: { filter_values: filters }
  } = useApiData(GET_AVAILABLE_FILTERS, { filter_values: {} });

  const { isLoading, shouldInvoke } = useApiState(GET_AVAILABLE_FILTERS, {
    organizationId,
    start_date: params[START_DATE_FILTER],
    end_date: params[END_DATE_FILTER]
  });

  useEffect(() => {
    if (shouldInvoke) {
      dispatch(
        getAvailableFilters(organizationId, {
          start_date: params[START_DATE_FILTER],
          end_date: params[END_DATE_FILTER]
        })
      );
    }
  }, [dispatch, shouldInvoke, params, organizationId]);

  const filtersWithoutExceptions = useMemo(
    () =>
      exceptions
        ? Object.fromEntries(Object.entries(filters).filter(([filterBackendName]) => !exceptions.includes(filterBackendName)))
        : filters,
    [exceptions, filters]
  );

  return { isLoading, filters: filtersWithoutExceptions };
};

const useIsLoading = () => {
  const { isLoading } = useApiState(GET_AVAILABLE_FILTERS);

  return isLoading;
};

function AvailableFiltersService() {
  return { useGet, useIsLoading };
}

export default AvailableFiltersService;
