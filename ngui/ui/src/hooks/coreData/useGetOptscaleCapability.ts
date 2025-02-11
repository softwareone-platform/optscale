import { useQuery } from "@apollo/client";
import { GET_OPTSCALE_CAPABILITY } from "graphql/api/restapi/queries";
import { useOrganizationInfo } from "../useOrganizationInfo";

export const useGetOptscaleCapability = () => {
  const { organizationId } = useOrganizationInfo();

  const { data } = useQuery(GET_OPTSCALE_CAPABILITY, {
    fetchPolicy: "cache-only",
    variables: {
      organizationId
    }
  });

  return {
    optscaleCapability: data?.optscaleCapability ?? {}
  };
};
