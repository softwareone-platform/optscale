import { useMutation } from "@apollo/client";
import ContentBackdropLoader from "components/ContentBackdropLoader";
import {
  GET_ORGANIZATION_THEME_SETTINGS,
  UPDATE_ORGANIZATION_THEME_SETTINGS
} from "graphql/api/restapi/queries/restapi.queries";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";

const OrganizationThemeSettingsContainer = ({ children }) => {
  const { organizationId } = useOrganizationInfo();

  const [updateOrganizationThemeSettingsMutation, { loading }] = useMutation(UPDATE_ORGANIZATION_THEME_SETTINGS, {
    update: (cache, { data: { updateOrganizationThemeSettings } }) => {
      cache.writeQuery({
        query: GET_ORGANIZATION_THEME_SETTINGS,
        variables: { organizationId },
        data: {
          organizationThemeSettings: updateOrganizationThemeSettings
        }
      });
    }
  });

  const onUpdate = (data) =>
    updateOrganizationThemeSettingsMutation({
      variables: {
        organizationId,
        value: data
      }
    });

  return <ContentBackdropLoader isLoading={loading}>{children(onUpdate)}</ContentBackdropLoader>;
};

export default OrganizationThemeSettingsContainer;
