import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "components/Logo";
import Redirector from "components/Redirector";
import WrongInvitationEmailAlert from "components/WrongInvitationEmailAlert";
import { useGetToken } from "hooks/useGetToken";
import { useSignOut } from "hooks/useSignOut";
import UserService from "services/UserService";
import { HOME, REGISTER, getSettingsUrl } from "urls";
import { SETTINGS_TABS } from "utils/constants";
import { SPACING_6 } from "utils/layouts";
import { stringifySearchParams, getSearchParams } from "utils/network";

const InvitedContainer = () => {
  const signOut = useSignOut();

  const { token, userId } = useGetToken();

  const navigate = useNavigate();

  const { useGet } = UserService();
  const { isDataReady, user } = useGet(userId);

  const { email: currentEmail = "" } = user;
  const { email: invitationEmail } = getSearchParams();

  const generateInvitedRedirectUrl = () => {
    // /invited for unauthorized
    if (!token) {
      const updateQuery = stringifySearchParams({ ...getSearchParams(), invited: true });
      return `${REGISTER}?${updateQuery}`;
    }

    // /invited for authorized with same email
    if (userId && typeof invitationEmail === "string" && currentEmail.toLowerCase() === invitationEmail.toLowerCase()) {
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
