import { useQuery } from "@apollo/client";
import { GET_ORGANIZATION_THEME_SETTINGS } from "graphql/api/restapi/queries";
import { useOrganizationInfo } from "../useOrganizationInfo";

export const useOrganizationThemeSettings = () => {
  const { organizationId } = useOrganizationInfo();

  const { data: { organizationThemeSettings = {} } = {} } = useQuery(GET_ORGANIZATION_THEME_SETTINGS, {
    fetchPolicy: "cache-only",
    variables: {
      organizationId
    }
  });

  return organizationThemeSettings;
};
