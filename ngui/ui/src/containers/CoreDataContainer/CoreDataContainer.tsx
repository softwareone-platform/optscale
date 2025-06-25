import { ReactNode } from "react";
import { ApolloError, useQuery } from "@apollo/client";
import { GET_ORGANIZATION_ALLOWED_ACTIONS } from "graphql/api/auth/queries";
import {
  GET_ORGANIZATIONS,
  GET_DATA_SOURCES,
  GET_CURRENT_EMPLOYEE,
  GET_INVITATIONS,
  GET_ORGANIZATION_FEATURES,
  GET_ORGANIZATION_THEME_SETTINGS,
  GET_ORGANIZATION_PERSPECTIVES
} from "graphql/api/restapi/queries";
import { useCurrentOrganization } from "hooks/useOrganizationInfo";
import { useUpdateScope } from "hooks/useUpdateScope";
import { PENDING_INVITATIONS } from "urls";
import { getSearchParams, removeSearchParam } from "utils/network";

type CoreDataContainerProps = {
  render: (props: {
    organizationId: string;
    error: ApolloError | undefined;
    isLoadingProps: {
      getOrganizationsLoading: boolean;
      getOrganizationAllowedActionsLoading: boolean;
      getCurrentEmployeeLoading: boolean;
      getDataSourcesLoading: boolean;
      getInvitationsLoading: boolean;
      getOrganizationFeaturesLoading: boolean;
      getOrganizationThemeSettingsLoading: boolean;
      getOrganizationPerspectivesLoading: boolean;
    };
  }) => ReactNode;
};

const CoreDataContainer = ({ render }: CoreDataContainerProps) => {
  const updateScope = useUpdateScope();

  const {
    loading: getOrganizationsLoading,
    error: getOrganizationsError,
    data: getOrganizationsData
  } = useQuery(GET_ORGANIZATIONS, {
    onCompleted: (data) => {
      const { organizationId } = getSearchParams() as { organizationId: string };

      if (data.organizations.find((org) => org.id === organizationId)) {
        updateScope({
          newScopeId: organizationId
        });
        removeSearchParam("organizationId");
      }

      if (data.organizations.length === 0) {
        updateScope({
          newScopeId: "none",
          redirectTo: PENDING_INVITATIONS
        });
      }
    }
  });

  const { organizationId } = useCurrentOrganization(getOrganizationsData?.organizations);

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

  const error =
    getOrganizationsError ||
    getOrganizationAllowedActionsError ||
    getCurrentEmployeeError ||
    getDataSourcesError ||
    getInvitationsError ||
    getOrganizationFeaturesError ||
    getOrganizationThemeSettingsError ||
    getOrganizationPerspectivesError;

  return render({
    organizationId,
    error,
    isLoadingProps: {
      getOrganizationsLoading,
      getOrganizationAllowedActionsLoading,
      getCurrentEmployeeLoading,
      getDataSourcesLoading,
      getInvitationsLoading,
      getOrganizationFeaturesLoading,
      getOrganizationThemeSettingsLoading,
      getOrganizationPerspectivesLoading
    }
  });
};

export default CoreDataContainer;
