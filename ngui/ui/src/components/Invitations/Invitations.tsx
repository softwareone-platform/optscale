import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { FormattedMessage } from "react-intl";
import FormButtonsWrapper from "components/FormButtonsWrapper";
import Invitation from "components/Invitation";
import TypographyLoader from "components/TypographyLoader";
import InvitationActionsContainer from "containers/InvitationActionsContainer";
import { createGroupsObjectFromArray, isEmpty as isEmptyArray } from "utils/arrays";
import { SPACING_4 } from "utils/layouts";
import useStyles from "./Invitations.styles";

const Invitations = ({ invitations, onSuccessAccept, onSuccessDecline, isLoading = false, styleProps = {} }) => {
  const { classes } = useStyles();

  if (isLoading) {
    return <TypographyLoader linesCount={4} />;
  }

  if (isEmptyArray(invitations)) {
    return <FormattedMessage id="noPendingInvitationsLeft" />;
  }

  return (
    <Grid
      container
      direction="row"
      spacing={SPACING_4}
      sx={{
        alignItems: "stretch"
      }}
    >
      {invitations.map(({ owner_name: name, owner_email: email, id, organization, invite_assignments: assignments }) => {
        const organizationNameInvitedTo = organization;

        const { pool: invitesToPools = [], organization: invitesToOrganization = [] } = createGroupsObjectFromArray(
          assignments,
          "scope_type"
        );

        return (
          <Grid item md={6} lg={4} key={id} className={classes.grid}>
            <Box>
              <Invitation
                owner={{ name, email }}
                organizationNameInvitedTo={organizationNameInvitedTo}
                invitesToOrganization={invitesToOrganization}
                invitesToPools={invitesToPools}
              />
              <FormButtonsWrapper mt={2} justifyContent={styleProps.buttonsJustifyContent} horizontal>
                <InvitationActionsContainer
                  buttonSize="large"
                  invitationId={id}
                  onSuccessAccept={onSuccessAccept}
                  onSuccessDecline={onSuccessDecline}
                />
              </FormButtonsWrapper>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Invitations;
