import { useQuery } from "@apollo/client";
import { Box, CircularProgress, Stack } from "@mui/material";
import ActionBar from "components/ActionBar";
import Backdrop from "components/Backdrop";
import Invitations from "components/Invitations";
import PageContentWrapper from "components/PageContentWrapper";
import { GET_INVITATIONS } from "graphql/api/restapi/queries";
import { SPACING_2 } from "utils/layouts";
import { Error } from "../../containers/InitializeContainer/common";

const actionBarDefinition = {
  title: {
    messageId: "pendingInvitationsTitle"
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
        <Stack spacing={SPACING_2}>
          <Box className={"MTPBoxShadow"} />
          <Box width={{ sm: "600px", md: "900px", lg: "1200px" }}>
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
