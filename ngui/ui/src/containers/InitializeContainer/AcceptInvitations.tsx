import { useMutation } from "@apollo/client";
import NavigationIcon from "@mui/icons-material/Navigation";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import ButtonLoader from "components/ButtonLoader";
import Invitations from "components/Invitations";
import { CREATE_ORGANIZATION } from "graphql/api/restapi/queries";
import { isEmpty as isEmptyArray } from "utils/arrays";
import { SPACING_1, SPACING_2 } from "utils/layouts";

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

const AcceptInvitations = ({
  invitations,
  refetchInvitations,
  refetchOrganizations,
  userEmail,
  organizations,
  getRedirectionPath
}) => {
  const navigate = useNavigate();

  const { classes } = useStyles();

  const [createOrganization, { loading: createOrganizationLoading }] = useMutation(CREATE_ORGANIZATION);

  return (
    <>
      <Box pl={2} pr={2}>
        <Invitations
          invitations={invitations}
          styleProps={{ buttonsJustifyContent: "center" }}
          onSuccessAccept={() => {
            refetchInvitations();
            refetchOrganizations();
          }}
          onSuccessDecline={() => {
            refetchInvitations();
          }}
          isLoading={false}
        />
      </Box>
      <Box>
        <ButtonLoader
          messageId="proceedToOptScale"
          size="medium"
          color="primary"
          variant="contained"
          onClick={() => {
            const redirect = () => navigate(getRedirectionPath(userEmail));

            if (isEmptyArray(organizations)) {
              createOrganization({
                variables: {
                  organizationName: `${userEmail}'s Organization`
                }
              })
                .then(() => refetchOrganizations())
                .then(() => {
                  redirect();
                });
            } else {
              redirect();
            }
          }}
          isLoading={createOrganizationLoading}
          startIcon={<NavigationIcon />}
          customWrapperClass={classes.dashboardButton}
        />
      </Box>
    </>
  );
};

export default AcceptInvitations;
