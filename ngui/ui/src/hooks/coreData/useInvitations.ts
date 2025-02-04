import { useQuery } from "@apollo/client";
import { GET_INVITATIONS } from "graphql/api/restapi/queries";
import { useOrganizationInfo } from "../useOrganizationInfo";

export const useInvitations = () => {
  const { organizationId } = useOrganizationInfo();

  const { data: { invitations = [] } = {} } = useQuery(GET_INVITATIONS, {
    variables: {
      organizationId
    },
    fetchPolicy: "cache-only"
  });

  return invitations;
};
