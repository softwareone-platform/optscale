import { useDataSourcesQuery } from "graphql/__generated__/hooks/restapi";
import { useOrganizationInfo } from "../useOrganizationInfo";

export const useAllDataSources = () => {
  const { organizationId } = useOrganizationInfo();

  const { data: { dataSources = [] } = {} } = useDataSourcesQuery({
    variables: {
      organizationId
    },
    fetchPolicy: "cache-only"
  });

  return dataSources;
};
