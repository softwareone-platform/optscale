import { useQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import Backdrop from "components/Backdrop";
import { GET_ORGANIZATION_ALLOWED_ACTIONS } from "graphql/api/auth/queries";
import {
  GET_ORGANIZATIONS,
  GET_DATA_SOURCES,
  GET_CURRENT_EMPLOYEE,
  GET_INVITATIONS,
  GET_ORGANIZATION_FEATURES,
  GET_OPTSCALE_CAPABILITY,
  GET_ORGANIZATION_THEME_SETTINGS,
  GET_ORGANIZATION_PERSPECTIVES
} from "graphql/api/restapi/queries";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { useUpdateScope } from "hooks/useUpdateScope";
import { getQueryParams, removeQueryParam } from "utils/network";

const CoreDataContainer = ({ children }) => {
  const updateScope = useUpdateScope();

  const { loading: getOrganizationsLoading, error: getOrganizationsError } = useQuery(GET_ORGANIZATIONS, {
    onCompleted: (data) => {
      const { organizationId } = getQueryParams() as { organizationId: string };

      if (data.organizations.find((org) => org.id === organizationId)) {
        updateScope({
          newScopeId: organizationId
        });
        removeQueryParam("organizationId");
      }
    }
  });

  const { organizationId } = useOrganizationInfo();

  const skipRequest = !organizationId;

  const { loading: getOrganizationAllowedActionsLoading, error: getOrganizationAllowedActionsError } = useQuery(
    GET_ORGANIZATION_ALLOWED_ACTIONS,
    {
      variables: {
        requestParams: {
          organization: organizationId
        }
      },
      skip: skipRequest
    }
  );

  const { loading: getCurrentEmployeeLoading, error: getCurrentEmployeeError } = useQuery(GET_CURRENT_EMPLOYEE, {
    variables: {
      organizationId
    },
    skip: skipRequest
  });

  const { loading: getDataSourcesLoading, error: getDataSourcesError } = useQuery(GET_DATA_SOURCES, {
    variables: {
      organizationId
    },
    skip: skipRequest
  });

  const { loading: getInvitationsLoading, error: getInvitationsError } = useQuery(GET_INVITATIONS, {
    skip: skipRequest
  });

  const { loading: getOrganizationFeaturesLoading, error: getOrganizationFeaturesError } = useQuery(GET_ORGANIZATION_FEATURES, {
    variables: {
      organizationId
    },
    skip: skipRequest
  });

  const { loading: getOptscaleCapabilityLoading, error: getOptscaleCapabilityError } = useQuery(GET_OPTSCALE_CAPABILITY, {
    skip: skipRequest,
    variables: {
      organizationId
    }
  });

  const { loading: getOrganizationThemeSettingsLoading, error: getOrganizationThemeSettingsError } = useQuery(
    GET_ORGANIZATION_THEME_SETTINGS,
    {
      variables: {
        organizationId
      },
      skip: skipRequest
    }
  );

  const { loading: getOrganizationPerspectivesLoading, error: getOrganizationPerspectivesError } = useQuery(
    GET_ORGANIZATION_PERSPECTIVES,
    {
      variables: {
        organizationId
      },
      skip: skipRequest
    }
  );

  const isLoading =
    getOrganizationsLoading ||
    getOrganizationAllowedActionsLoading ||
    getCurrentEmployeeLoading ||
    getDataSourcesLoading ||
    getInvitationsLoading ||
    getOrganizationFeaturesLoading ||
    getOptscaleCapabilityLoading ||
    getOrganizationThemeSettingsLoading ||
    getOrganizationPerspectivesLoading;

  const error =
    getOrganizationsError ||
    getOrganizationAllowedActionsError ||
    getCurrentEmployeeError ||
    getDataSourcesError ||
    getInvitationsError ||
    getOrganizationFeaturesError ||
    getOptscaleCapabilityError ||
    getOrganizationThemeSettingsError ||
    getOrganizationPerspectivesError;

  if (isLoading) {
    return (
      <Backdrop aboveDrawers>
        <CircularProgress />
      </Backdrop>
    );
  }

  return error ? "tbd error" : children;
};

export default CoreDataContainer;
