import { useQuery } from "@apollo/client";
import { GET_ORGANIZATIONS } from "graphql/api/restapi/queries";

export const useOrganizations = () => {
  const { data: { organizations = [] } = {} } = useQuery(GET_ORGANIZATIONS, {
    fetchPolicy: "cache-only"
  });

  return organizations;
};
