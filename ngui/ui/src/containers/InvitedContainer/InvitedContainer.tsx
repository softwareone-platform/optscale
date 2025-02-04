import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "components/Logo";
import Redirector from "components/Redirector";
import WrongInvitationEmailAlert from "components/WrongInvitationEmailAlert";
import { useGetToken } from "hooks/useGetToken";
import { useSignOut } from "hooks/useSignOut";
import { SETTINGS_TABS } from "pages/Settings/Settings";
import UserService from "services/UserService";
import { HOME, REGISTER, getSettingsUrl } from "urls";
import { SPACING_6 } from "utils/layouts";
import { getQueryParams, getStringUrl } from "utils/network";

const InvitedContainer = () => {
  const signOut = useSignOut();

  const { token, userId } = useGetToken();

  const navigate = useNavigate();

  const { useGet } = UserService();
  const { isDataReady, user } = useGet(userId);

  const { email: currentEmail = "" } = user;
  const { email: invitationEmail } = getQueryParams();

  const generateInvitedRedirectUrl = () => {
    // /invited for unauthorized
    if (!token) {
      const updatedQuery = getStringUrl({ ...getQueryParams(), invited: true });
      return `${REGISTER}${updatedQuery}`;
    }

    // /invited for authorized with same email
    if (userId && currentEmail === invitationEmail) {
      return getSettingsUrl(SETTINGS_TABS.INVITATIONS);
    }

    // /invited for authorized with different email — no redirect
    return "";
  };

  const redirectUrl = generateInvitedRedirectUrl();

  const onSignOut = () => {
    signOut();
  };

  return (
    <Redirector condition={redirectUrl !== ""} to={redirectUrl}>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Box mb={SPACING_6}>
          <Logo width={200} />
        </Box>
        {isDataReady ? (
          <WrongInvitationEmailAlert
            invitationEmail={invitationEmail}
            currentEmail={currentEmail}
            onGoToDashboard={() => navigate(HOME)}
            onSignOut={onSignOut}
          />
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Redirector>
  );
};

export default InvitedContainer;
