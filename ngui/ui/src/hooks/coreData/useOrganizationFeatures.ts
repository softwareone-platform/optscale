import { useQuery } from "@apollo/client";
import { GET_ORGANIZATION_FEATURES } from "graphql/api/restapi/queries";
import { useOrganizationInfo } from "../useOrganizationInfo";

export const useOrganizationFeatures = () => {
  const { organizationId } = useOrganizationInfo();

  const { data: { organizationFeatures = {} } = {} } = useQuery(GET_ORGANIZATION_FEATURES, {
    fetchPolicy: "cache-only",
    variables: {
      organizationId
    }
  });

  return organizationFeatures;
};
