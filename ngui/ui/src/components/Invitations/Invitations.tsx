import { useMemo } from "react";
import MarkAsUnreadOutlinedIcon from "@mui/icons-material/MarkAsUnreadOutlined";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { FormattedMessage } from "react-intl";
import FormButtonsWrapper from "components/FormButtonsWrapper";
import Invitation from "components/Invitation";
import TypographyLoader from "components/TypographyLoader";
import InvitationActionsContainer from "containers/InvitationActionsContainer";
import { DOCS_MARKETPLACE_PENDING_INVITATIONS } from "urls";
import { createGroupsObjectFromArray, isEmpty as isEmptyArray } from "utils/arrays";
import { MPT_SPACING_1, MPT_SPACING_4, SPACING_4 } from "utils/layouts";
import useStyles from "./Invitations.styles";

interface InvitationAssignment {
  scope_id: string;
  scope_type: string;
  purpose: string;
  uniqueKey?: string;
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

interface UniqueInvitationsData extends InvitationData {
  children: InvitationData[];
}

const Invitations = ({
  invitations,
  onSuccessAccept,
  onSuccessDecline,
  isLoading = false,
  styleProps = {},
  widget = false
}: InvitationsProps) => {
  const { classes } = useStyles();

  // To be extracted to helper function or custom hook
  const uniqueInvitations: UniqueInvitationsData[] = useMemo(() => {
    const uniqueInvitationsMap = new Map<string, UniqueInvitationsData>();
    invitations.forEach((invitation) => {
      const { owner_email: email, organization } = invitation;
      const key = `${email}-${organization}`;
      const existingInvitation = uniqueInvitationsMap.get(key);
      if (existingInvitation) {
        existingInvitation.children = existingInvitation.children || [];
        existingInvitation.children.push(invitation);
      } else {
        uniqueInvitationsMap.set(key, {
          ...invitation,
          children: [{ ...invitation }]
        });
      }
    });

    return Array.from(uniqueInvitationsMap.values()).map((invitation) => {
      const invitationAssignments = invitation.children
        .reduce<InvitationAssignment[]>(
          (assignments, childInvitations) => assignments.concat(childInvitations.invite_assignments),
          []
        )
        .map((assignment) => ({
          ...assignment,
          uniqueKey: `${assignment.scope_type}_${assignment.purpose}`
        }));

      const uniqueAssignments = Array.from(new Set(invitationAssignments.map((assignment) => assignment.uniqueKey)))
        .map((uniqueKey) => invitationAssignments.find((assignment) => assignment.uniqueKey === uniqueKey))
        .filter((assignment) => assignment !== undefined);

      return {
        ...invitation,
        invite_assignments: uniqueAssignments,
        children: invitation.children || []
      };
    });
  }, [invitations]);

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
      {uniqueInvitations.map(({ owner_name: name, owner_email: email, id, organization, invite_assignments: assignments }) => {
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
