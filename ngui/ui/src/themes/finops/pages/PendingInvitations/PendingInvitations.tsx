import { useState } from "react";
import { NetworkStatus } from "@apollo/client";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Error } from "@main/containers/InitializeContainer/common";
import { MPT_SPACING_2, SPACING_2 } from "@theme/utils/layouts";
import ActionBar from "components/ActionBar";
import Backdrop from "components/Backdrop";
import Invitations from "components/Invitations";
import PageContentWrapper from "components/PageContentWrapper";
import ProceedToApplication from "containers/InitializeContainer/steps/ProceedToApplication";
import { useInvitationsQuery, useOrganizationsQuery } from "graphql/__generated__/hooks/restapi";

const actionBarDefinition = {
  title: {
    messageId: "noOrganizations.pendingInvitations"
  }
};

const PendingInvitations = () => {
  const [proceedToNext, setProceedToNext] = useState(false);
  const { networkStatus: getOrganizationsNetworkStatus, refetch: refetchOrganizations } = useOrganizationsQuery({
    notifyOnNetworkStatusChange: true
  });

  const {
    data: invitations,
    loading: getInvitationsLoading,
    error: getInvitationsError,
    refetch: refetchInvitations
  } = useInvitationsQuery({
    fetchPolicy: "network-only"
  });

  const getOrganizationsLoading = getOrganizationsNetworkStatus === NetworkStatus.loading;
  const getOrganizationsRefetching = getOrganizationsNetworkStatus === NetworkStatus.refetch;

  const isLoading = getInvitationsLoading;
  const error = getInvitationsError;

  if (isLoading || getOrganizationsLoading || getOrganizationsRefetching) {
    return (
      <Backdrop aboveDrawers>
        <CircularProgress />
      </Backdrop>
    );
  }

  if (error) {
    return <Error />;
  }

  if (proceedToNext) {
    return <ProceedToApplication />;
  }

  return (
    <>
      <ActionBar data={actionBarDefinition} />
      <PageContentWrapper>
        <Stack spacing={SPACING_2} width={"100%"}>
          <Box className={"MTPBoxShadow"}>
            <Typography component="h1" variant="subtitle1" marginBottom={MPT_SPACING_2}>
              <FormattedMessage id="noOrganizations.welcomeHeader" />
            </Typography>
            <Typography variant="body1">
              <FormattedMessage id="noOrganizations.welcome" />
            </Typography>
          </Box>
          <Box>
            <Invitations
              widget
              invitations={invitations.invitations}
              styleProps={{ buttonsJustifyContent: "center" }}
              onSuccessAccept={() => {
                refetchOrganizations();
                refetchInvitations();
                setProceedToNext(true);
              }}
              onSuccessDecline={() => {
                refetchInvitations();
              }}
              isLoading={false}
            />
          </Box>
        </Stack>
      </PageContentWrapper>
    </>
  );
};

export default PendingInvitations;
