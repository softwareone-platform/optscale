import { NetworkStatus, useQuery } from "@apollo/client";
import { Box, Stack, CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";
import Logo from "components/Logo";
import { GET_ORGANIZATIONS, GET_INVITATIONS } from "graphql/api/restapi/queries";
import { useGetToken } from "hooks/useGetToken";
import { HOME, NEXT_QUERY_PARAMETER_NAME, SHOW_POLICY_QUERY_PARAM, USER_EMAIL_QUERY_PARAMETER_NAME } from "urls";
import { isEmpty as isEmptyArray } from "utils/arrays";
import { SPACING_6 } from "utils/layouts";
import { getQueryParams } from "utils/network";
import AcceptInvitations from "./AcceptInvitations";
import SetupOrganization from "./SetupOrganization";
import { Title } from "./Title";

const getRedirectionPath = (scopeUserEmail: string) => {
  const {
    [NEXT_QUERY_PARAMETER_NAME]: next = HOME,
    [USER_EMAIL_QUERY_PARAMETER_NAME]: userEmailQueryParameter,
    [SHOW_POLICY_QUERY_PARAM]: showPolicyQueryParameter = false
  } = getQueryParams() as {
    [NEXT_QUERY_PARAMETER_NAME]: string;
    [USER_EMAIL_QUERY_PARAMETER_NAME]: string;
    [SHOW_POLICY_QUERY_PARAM]: string;
  };

  const getNextPath = () => {
    if (userEmailQueryParameter) {
      return userEmailQueryParameter === scopeUserEmail ? next : HOME;
    }

    return next;
  };

  const nextPath = getNextPath();

  const url = new URL(nextPath, window.location.origin);

  // Add showPolicy param if needed
  if (showPolicyQueryParameter) {
    url.searchParams.set(SHOW_POLICY_QUERY_PARAM, showPolicyQueryParameter);
  }

  // Return just the pathname and search parts, removing the origin
  return `${url.pathname}${url.search}`;
};

const InitializeContainer = () => {
  const { userEmail } = useGetToken();

  const {
    data: organizations,
    networkStatus: getOrganizationsNetworkStatus,
    error: getOrganizationsError,
    refetch: refetchOrganizations
  } = useQuery(GET_ORGANIZATIONS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true
  });

  const getOrganizationsLoading = getOrganizationsNetworkStatus === NetworkStatus.loading;
  const getOrganizationsRefetching = getOrganizationsNetworkStatus === NetworkStatus.refetch;

  const {
    data: invitations,
    loading: getInvitationsLoading,
    error: getInvitationsError,
    refetch: refetchInvitations
  } = useQuery(GET_INVITATIONS, {
    fetchPolicy: "network-only"
  });

  const isLoading = getOrganizationsLoading || getInvitationsLoading;

  const error = getOrganizationsError || getInvitationsError;

  const renderContent = () => {
    if (!isEmptyArray(invitations?.invitations ?? [])) {
      return (
        <AcceptInvitations
          invitations={invitations?.invitations ?? []}
          refetchInvitations={refetchInvitations}
          refetchOrganizations={refetchOrganizations}
          userEmail={userEmail}
          organizations={organizations?.organizations ?? []}
          getRedirectionPath={getRedirectionPath}
        />
      );
    }

    if (isEmptyArray(organizations?.organizations ?? [])) {
      return (
        <SetupOrganization
          userEmail={userEmail}
          refetchOrganizations={refetchOrganizations}
          isLoading={{
            getOrganizationsLoading: getOrganizationsRefetching
          }}
        />
      );
    }

    return (
      <>
        <Title messageId="initializingOptscale" dataTestId="p_initializing" />
        <Navigate to={getRedirectionPath(userEmail)} />
      </>
    );
  };

  return (
    <Stack spacing={SPACING_6} alignItems="center">
      <Box>
        <Logo width={200} dataTestId="img_logo" />
      </Box>
      {isLoading ? (
        <>
          <Title messageId="initializingOptscale" dataTestId="p_initializing" />
          <Box height={60}>
            <CircularProgress data-test-id="svg_loading" />
          </Box>
        </>
      ) : (
        <>{error ? <div>Display error(s), possible actions are TBD</div> : renderContent()}</>
      )}
    </Stack>
  );
};

export default InitializeContainer;
