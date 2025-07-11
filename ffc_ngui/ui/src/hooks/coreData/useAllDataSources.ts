import { useQuery } from "@apollo/client";
import { GET_DATA_SOURCES } from "graphql/api/restapi/queries";
import { useOrganizationInfo } from "../useOrganizationInfo";

export const useAllDataSources = () => {
  const { organizationId } = useOrganizationInfo();

  const { data: { dataSources = [] } = {} } = useQuery(GET_DATA_SOURCES, {
    variables: {
      organizationId
    },
    fetchPolicy: "cache-only"
  });

  return dataSources;
};
