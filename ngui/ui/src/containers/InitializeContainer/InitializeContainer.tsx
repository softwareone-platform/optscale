import { useQuery } from "@apollo/client";
import { Box, Stack, CircularProgress } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Navigate } from "react-router-dom";
import Logo from "components/Logo";
import PageTitle from "components/PageTitle";
import { GET_ORGANIZATIONS, GET_INVITATIONS } from "graphql/api/restapi/queries";
import { useGetToken } from "hooks/useGetToken";
import { HOME, NEXT_QUERY_PARAMETER_NAME, SHOW_POLICY_QUERY_PARAM, USER_EMAIL_QUERY_PARAMETER_NAME } from "urls";
import { isEmpty as isEmptyArray } from "utils/arrays";
import { SPACING_6 } from "utils/layouts";
import { getQueryParams } from "utils/network";
import AcceptInvitations from "./AcceptInvitations";
import SetupOrganization from "./SetupOrganization";

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

  const getSearchParams = () => {
    const searchParams = [showPolicyQueryParameter ? `${SHOW_POLICY_QUERY_PARAM}=${showPolicyQueryParameter}` : ""].join("&");
    return searchParams;
  };

  return `${getNextPath()}?${getSearchParams()}`;
};

const InitializeContainer = () => {
  const { userEmail } = useGetToken();

  const {
    data: organizations,
    loading: getOrganizationsLoading,
    error: getOrganizationsError,
    refetch: refetchOrganizations
  } = useQuery(GET_ORGANIZATIONS, {
    fetchPolicy: "network-only"
  });

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
      return <SetupOrganization userEmail={userEmail} refetchOrganizations={refetchOrganizations} />;
    }

    return <Navigate to={getRedirectionPath(userEmail)} />;
  };

  return (
    <Stack spacing={SPACING_6} alignItems="center">
      <Box>
        <Logo width={200} dataTestId="img_logo" />
      </Box>
      {isLoading ? (
        <>
          <Box pr={2} pl={2}>
            <PageTitle dataTestId="p_initializing" align="center">
              <FormattedMessage id="initializingOptscale" />
            </PageTitle>
          </Box>
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
