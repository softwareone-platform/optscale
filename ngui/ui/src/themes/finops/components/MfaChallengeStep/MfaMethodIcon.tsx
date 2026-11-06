import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Box from "@mui/material/Box";
import { MFA_METHOD_TYPE, MfaMethodType } from "@theme/api/auth/signIn";
import AuthenticatorAppIcon from "@theme/icons/AuthenticatorAppIcon";

const ICON_COLOR = "#315CB9";

// Same-width slot for every method, so the method names beside the icons line up in the picker.
const ICON_SLOT_SIZE = 56;

const MfaMethodIcon = ({ type }: { type: MfaMethodType }) => (
  <Box display="flex" alignItems="center" justifyContent="center" flexShrink={0} width={ICON_SLOT_SIZE}>
    {type === MFA_METHOD_TYPE.TOTP ? (
      <AuthenticatorAppIcon sx={{ fontSize: ICON_SLOT_SIZE, color: ICON_COLOR }} data-test-id="icon_authenticator_app" />
    ) : (
      <MailOutlineIcon sx={{ fontSize: 36, color: ICON_COLOR }} data-test-id="icon_email" />
    )}
  </Box>
);

export default MfaMethodIcon;
