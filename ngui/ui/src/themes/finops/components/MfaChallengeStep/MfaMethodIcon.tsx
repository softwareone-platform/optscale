import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { MFA_METHOD_TYPE, MfaMethodType } from "@theme/api/auth/signIn";
import AuthenticatorAppIcon from "@theme/icons/AuthenticatorAppIcon";
import useStyles from "./MfaChallengeStep.styles";

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
