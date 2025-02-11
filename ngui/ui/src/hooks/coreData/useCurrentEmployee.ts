import { useQuery } from "@apollo/client";
import { GET_CURRENT_EMPLOYEE } from "graphql/api/restapi/queries";
import { useOrganizationInfo } from "../useOrganizationInfo";

export const useCurrentEmployee = () => {
  const { organizationId } = useOrganizationInfo();

  const { data } = useQuery(GET_CURRENT_EMPLOYEE, {
    variables: {
      organizationId
    },
    fetchPolicy: "cache-only"
  });

  // The current user is not always returned by the API in some corner test cases
  return data?.currentEmployee ?? {};
};
