import { Box, Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FormattedMessage } from "react-intl";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import ActionBar from "components/ActionBar";
import InviteEmployeesForm from "components/forms/InviteEmployeesForm";
import PageContentWrapper from "components/PageContentWrapper";
import { USER_MANAGEMENT } from "urls";
import { SPACING_1 } from "../../utils/layouts";

const actionBarDefinition = {
  breadcrumbs: [
    <Link key={1} to={USER_MANAGEMENT} component={RouterLink}>
      <FormattedMessage id="users" />
    </Link>
  ],
  title: {
    text: <FormattedMessage id="inviteUsersTitle" />,
    dataTestId: "lbl_users_invitation"
  }
};

const InviteEmployees = ({ onSubmit, availablePools, isLoadingProps = {} }) => {
  const navigate = useNavigate();

  return (
    <>
      <ActionBar data={actionBarDefinition} />
      <PageContentWrapper>
        <Box className={"MTPBoxShadow"}>
          <Grid container spacing={SPACING_1}>
            <Grid item xs={12} md={6}>
              <InviteEmployeesForm
                availablePools={availablePools}
                onSubmit={onSubmit}
                onCancel={() => navigate(USER_MANAGEMENT)}
                isLoadingProps={isLoadingProps}
              />
            </Grid>
          </Grid>
        </Box>
      </PageContentWrapper>
    </>
  );
};

export default InviteEmployees;
