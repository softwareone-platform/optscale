import MarkAsUnreadOutlinedIcon from "@mui/icons-material/MarkAsUnreadOutlined";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { FormattedMessage } from "react-intl";
import { DOCS_MARKETPLACE_PENDING_INVITATIONS } from "@theme/urls";
import { MPT_SPACING_1, MPT_SPACING_4, SPACING_4 } from "@theme/utils/layouts";
import FormButtonsWrapper from "components/FormButtonsWrapper";
import Invitation from "components/Invitation";
import TypographyLoader from "components/TypographyLoader";
import InvitationActionsContainer from "containers/InvitationActionsContainer";
import { createGroupsObjectFromArray, isEmptyArray } from "utils/arrays";
import useStyles from "./Invitations.styles";

interface InvitationAssignment {
  scope_type: string;
}

interface InvitationData {
  owner_name: string;
  owner_email: string;
  id: string;
  organization: string;
  invite_assignments: InvitationAssignment[];
}

interface InvitationsProps {
  invitations: InvitationData[];
  onSuccessAccept: (id: string) => void;
  onSuccessDecline: (id: string) => void;
  isLoading?: boolean;
  styleProps?: {
    buttonsJustifyContent?: string;
  };
  widget?: boolean;
}

const NoInvitationsPending = ({ widget = false }: { widget: boolean }) => {
  const { classes } = useStyles();
  return (
    <Grid item md={6} lg={4} key={"noPendingInvitationsLeft"} className={widget ? classes.gridBox : ""}>
      <Box textAlign={widget ? "center" : "left"}>
        {widget && (
          <Typography marginBottom={MPT_SPACING_1}>
            <MarkAsUnreadOutlinedIcon sx={{ fontSize: 100 }} />
          </Typography>
        )}
        <Typography component="h4" variant="subtitle1" marginBottom={MPT_SPACING_4}>
          <FormattedMessage id="noPendingInvitationsLeft" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage
            id="noPendingInvitationsLeftDescription"
            values={{
              invitationDocsLink: (chunks) => (
                <a href={DOCS_MARKETPLACE_PENDING_INVITATIONS} target="_blank" rel="noreferrer">
                  {chunks}
                </a>
              )
            }}
          />
        </Typography>
      </Box>
    </Grid>
  );
};

const Invitations = ({
  invitations,
  onSuccessAccept,
  onSuccessDecline,
  isLoading = false,
  styleProps = {},
  widget = false
}: InvitationsProps) => {
  const { classes } = useStyles();

  if (isLoading) {
    return <TypographyLoader linesCount={4} />;
  }

  return (
    <Grid
      container
      direction="row"
      spacing={SPACING_4}
      sx={{
        justifyContent: widget ? "center" : "flexStart",
        alignItems: "stretch"
      }}
    >
      {isEmptyArray(invitations) && <NoInvitationsPending widget={widget} />}
      {invitations.map(({ owner_name: name, owner_email: email, id, organization, invite_assignments: assignments }) => {
        const organizationNameInvitedTo = organization;

        const { pool: invitesToPools = [], organization: invitesToOrganization = [] } = createGroupsObjectFromArray(
          assignments,
          "scope_type"
        );

        return (
          <Grid item md={6} lg={4} key={id} className={widget ? classes.gridBox : classes.grid}>
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
