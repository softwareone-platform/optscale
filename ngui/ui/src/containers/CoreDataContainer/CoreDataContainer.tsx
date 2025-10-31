import { ReactNode } from "react";
import { ApolloError } from "@apollo/client";
import { useOrganizationAllowedActionsQuery } from "graphql/__generated__/hooks/auth";
import {
  useCurrentEmployeeQuery,
  useDataSourcesQuery,
  useInvitationsQuery,
  useOrganizationFeaturesQuery,
  useOrganizationPerspectivesQuery,
  useOrganizationsQuery,
  useOrganizationThemeSettingsQuery
} from "graphql/__generated__/hooks/restapi";
import { useCurrentOrganization } from "hooks/useOrganizationInfo";
import { useSignOut } from "hooks/useSignOut";
import { useUpdateScope } from "hooks/useUpdateScope";
<<<<<<< HEAD
import { isEmptyArray } from "utils/arrays";
=======
import { PENDING_INVITATIONS } from "urls";
>>>>>>> main
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
  const signOut = useSignOut();

  const {
    loading: getOrganizationsLoading,
    error: getOrganizationsError,
    data: getOrganizationsData
  } = useOrganizationsQuery({
    onCompleted: (data) => {
      const { organizationId } = getSearchParams() as { organizationId: string };

      const { organizations } = data;

      if (isEmptyArray(organizations)) {
        signOut();
        return;
      }

      if (organizations.find((org) => org.id === organizationId)) {
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

  const { loading: getOrganizationAllowedActionsLoading, error: getOrganizationAllowedActionsError } =
    useOrganizationAllowedActionsQuery({
      variables: {
        requestParams: {
          organization: organizationId
        }
      },
      skip: skipRequest
    });

  const { loading: getCurrentEmployeeLoading, error: getCurrentEmployeeError } = useCurrentEmployeeQuery({
    variables: {
      organizationId
    },
    skip: skipRequest
  });

  const { loading: getDataSourcesLoading, error: getDataSourcesError } = useDataSourcesQuery({
    variables: {
      organizationId
    },
    skip: skipRequest
  });

  const { loading: getInvitationsLoading, error: getInvitationsError } = useInvitationsQuery({
    skip: skipRequest
  });

  const { loading: getOrganizationFeaturesLoading, error: getOrganizationFeaturesError } = useOrganizationFeaturesQuery({
    variables: {
      organizationId
    },
    skip: skipRequest
  });

  const { loading: getOrganizationThemeSettingsLoading, error: getOrganizationThemeSettingsError } =
    useOrganizationThemeSettingsQuery({
      variables: {
        organizationId
      },
      skip: skipRequest
    });

  const { loading: getOrganizationPerspectivesLoading, error: getOrganizationPerspectivesError } =
    useOrganizationPerspectivesQuery({
      variables: {
        organizationId
      },
      skip: skipRequest
    });

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
