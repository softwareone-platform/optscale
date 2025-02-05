import { useQuery } from "@apollo/client";
import { GET_CURRENT_EMPLOYEE } from "graphql/api/restapi/queries";
import { useOrganizationInfo } from "../useOrganizationInfo";

export const useCurrentEmployee = () => {
  const { organizationId } = useOrganizationInfo();

  const { data: { currentEmployee = {} } = {} } = useQuery(GET_CURRENT_EMPLOYEE, {
    variables: {
      organizationId
    },
    fetchPolicy: "cache-only"
  });

  return currentEmployee;
};
