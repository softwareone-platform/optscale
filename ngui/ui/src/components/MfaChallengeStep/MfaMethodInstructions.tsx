import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { MFA_METHOD_TYPE, MfaMethod } from "api/auth/mfaMethod";
import useStyles from "./MfaChallengeStep.styles";
import { EmailCodeStatus } from "./types";

type MfaMethodInstructionsProps = {
  method: MfaMethod;
  emailCode?: Pick<EmailCodeStatus, "isSent" | "isSending">;
};

const getInstructionsMessageId = (method: MfaMethod, emailCode: MfaMethodInstructionsProps["emailCode"]) => {
  if (method.type === MFA_METHOD_TYPE.TOTP) {
    return "signIn:totpInstructions";
  }

  if (emailCode?.isSending) {
    return "signIn:sendingEmailCode";
  }

  // Until a code went out there is nothing to point at; the code entry says what went wrong instead.
  return emailCode?.isSent ? "signIn:emailCodeSent" : null;
};

const MfaMethodInstructions = ({ method, emailCode }: MfaMethodInstructionsProps) => {
  const { classes } = useStyles();

  const messageId = getInstructionsMessageId(method, emailCode);

  return (
    <div className={classes.instructions} data-test-id="mfa_method_instructions">
      {method.is_default && (
        <Typography variant="subtitle1" fontWeight="bold" data-test-id="p_default_method">
          <FormattedMessage id="signIn:defaultMethod" />
        </Typography>
      )}
      {messageId && (
        <Typography data-test-id="p_method_instructions">
          <FormattedMessage id={messageId} values={{ email: method.label }} />
        </Typography>
      )}
    </div>
  );
};

export default MfaMethodInstructions;
