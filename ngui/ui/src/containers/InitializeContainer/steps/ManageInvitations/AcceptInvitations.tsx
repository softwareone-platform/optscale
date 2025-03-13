import NavigationIcon from "@mui/icons-material/Navigation";
import { Box } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import ButtonLoader from "components/ButtonLoader";
import Invitations from "components/Invitations";
import { SPACING_1, SPACING_2 } from "utils/layouts";
import { GET_ORGANIZATIONS } from "graphql/api/restapi/queries";
import { NetworkStatus, useQuery } from "@apollo/client";
import { Error, Loading } from "containers/InitializeContainer/common";

const useStyles = makeStyles()((theme) => ({
  dashboardButton: {
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      right: 40,
      bottom: 40
    },
    padding: theme.spacing(SPACING_2),
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(SPACING_1)
    }
  }
}));

const AcceptInvitations = ({ invitations, refetchInvitations, onProceed }) => {
  const { classes } = useStyles();
  const {
    data: data,
    networkStatus: getOrganizationsNetworkStatus,
    error: getOrganizationsError,
    refetch: refetchOrganizations
  } = useQuery(GET_ORGANIZATIONS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true
  });

  const getOrganizationsLoading = getOrganizationsNetworkStatus === NetworkStatus.loading;
  const getOrganizationsRefetching = getOrganizationsNetworkStatus === NetworkStatus.refetch;

  if (getOrganizationsLoading || getOrganizationsRefetching) {
    return <Loading />;
  }

  if (getOrganizationsError) {
    return <Error />;
  }

  const userHasOrganizations = data && data.organizations.length > 0;

  return (
    <>
      <Box width={{ sm: "600px", md: "900px", lg: "1200px" }}>
        <Invitations
          widget
          invitations={invitations}
          styleProps={{ buttonsJustifyContent: "center" }}
          onSuccessAccept={() => {
            refetchOrganizations();
            refetchInvitations();
          }}
          onSuccessDecline={() => {
            refetchInvitations();
          }}
          isLoading={false}
        />
      </Box>
      <Box>
        {userHasOrganizations && (
          <ButtonLoader
            dataTestId="btn_proceed_to_optscale"
            messageId="proceedToOptScale"
            size="medium"
            color="primary"
            variant="contained"
            onClick={onProceed}
            startIcon={<NavigationIcon />}
            customWrapperClass={classes.dashboardButton}
          />
        )}
      </Box>
    </>
  );
};

export default AcceptInvitations;
