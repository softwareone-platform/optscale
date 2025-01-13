import { useQuery } from "@apollo/client";
import { GET_OPTSCALE_MODE } from "graphql/api/restapi/queries";
import { useOrganizationInfo } from "../useOrganizationInfo";

export const useGetOptscaleMode = () => {
  const { organizationId } = useOrganizationInfo();

  const { data } = useQuery(GET_OPTSCALE_MODE, {
    fetchPolicy: "cache-only",
    variables: {
      organizationId
    }
  });

  return {
    optscaleMode: data?.optscaleMode ?? {}
  };
};
