import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { MFA_METHOD_TYPE, MfaMethodType } from "api/auth/mfaMethod";
import AuthenticatorAppIcon from "icons/AuthenticatorAppIcon";
import useStyles from "./MfaMethodIcon.styles";

const MfaMethodIcon = ({ type }: { type: MfaMethodType }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.methodIconSlot}>
      {type === MFA_METHOD_TYPE.TOTP ? (
        <AuthenticatorAppIcon className={classes.authenticatorAppIcon} data-test-id="icon_authenticator_app" />
      ) : (
        <MailOutlineIcon className={classes.emailIcon} data-test-id="icon_email" />
      )}
    </div>
  );
};

export default MfaMethodIcon;
