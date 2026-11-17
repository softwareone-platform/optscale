import { useEffect } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { handleSuccess } from "@main/api/actionCreators";
import { MINUTE } from "@main/api/constants";
import { GET_ORG_DATASOURCES_TAGS, SET_ORG_DATASOURCES_TAGS } from "@main/api/restapi/actionTypes";
import { apiAction, getApiUrl, hashParams } from "@main/api/utils";
import { useApiData } from "@main/hooks/useApiData";
import { useApiState } from "@main/hooks/useApiState";

export type DataSourceTag = {
  name: string;
  value: string;
};

type DataSource = {
  id: string;
  tags: DataSourceTag[];
};

const API_URL = getApiUrl("ffc", "v1");

const getDataSourcesTags = (organizationId: string) =>
  apiAction({
    url: `${API_URL}/client/organizations/${organizationId}/datasources`,
    method: "GET",
    onSuccess: (data, label) => {
      const mappedData = data.reduce(
        (acc: Record<string, DataSourceTag[]>, item: DataSource) => {
          const { id, tags } = item;
          acc[id] = tags;

          return acc;
        },
        {} as Record<string, DataSourceTag[]>
      );

      return handleSuccess(SET_ORG_DATASOURCES_TAGS)(mappedData, label);
    },
    label: GET_ORG_DATASOURCES_TAGS,
    ttl: 30 * MINUTE,
    hash: hashParams({ organizationId })
  });

export const useDataSourceTagsByOrg = (organizationId: string) => {
  const dispatch = useDispatch();
  const { apiData: { dataSourcesTags: tags } = {} } = useApiData(GET_ORG_DATASOURCES_TAGS);
  const { isLoading, shouldInvoke } = useApiState(GET_ORG_DATASOURCES_TAGS, {
    organizationId
  });

  useEffect(() => {
    if (organizationId && shouldInvoke) {
      dispatch(getDataSourcesTags(organizationId));
    }
  }, [dispatch, organizationId, shouldInvoke]);

  return {
    isLoading,
    shouldInvoke,
    tags
  };
};
