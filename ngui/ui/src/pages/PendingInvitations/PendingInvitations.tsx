import { useQuery } from "@apollo/client";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import ActionBar from "components/ActionBar";
import Backdrop from "components/Backdrop";
import Invitations from "components/Invitations";
import PageContentWrapper from "components/PageContentWrapper";
import { GET_INVITATIONS } from "graphql/api/restapi/queries";
import { MPT_SPACING_2, SPACING_2 } from "utils/layouts";
import { Error } from "../../containers/InitializeContainer/common";

const actionBarDefinition = {
  title: {
    messageId: "noOrganizations.pendingInvitations"
  }
};

const PendingInvitations = () => {
  const {
    data: invitations,
    loading: getInvitationsLoading,
    error: getInvitationsError,
    refetch: refetchInvitations
  } = useQuery(GET_INVITATIONS, {
    fetchPolicy: "network-only"
  });

  const isLoading = getInvitationsLoading;

  const error = getInvitationsError;

  if (isLoading) {
    return (
      <Backdrop aboveDrawers>
        <CircularProgress />
      </Backdrop>
    );
  }

  if (error) {
    return <Error />;
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
                refetchInvitations();
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
