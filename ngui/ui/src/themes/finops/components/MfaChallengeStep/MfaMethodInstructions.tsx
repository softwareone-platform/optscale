import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { MFA_METHOD_TYPE, MfaMethod } from "@theme/api/auth/signIn";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import useStyles from "./MfaChallengeStep.styles";

type MfaMethodInstructionsProps = {
  method: MfaMethod;
  isEmailCodeSent: boolean;
};

const MfaMethodInstructions = ({ method, isEmailCodeSent }: MfaMethodInstructionsProps) => {
  const { classes } = useStyles();

  // Requesting a code for a non-default email method is POST /login_challenges/{id}/codes — not built yet.
  if (method.type === MFA_METHOD_TYPE.EMAIL && !isEmailCodeSent) {
    return <InlineSeverityAlert messageId="signIn:challengeNotImplemented" messageDataTestId="p_email_code_not_implemented" />;
  }

  return (
    <div className={classes.instructions} data-test-id="mfa_method_instructions">
      {method.is_default && (
        <Typography variant="subtitle1" fontWeight="bold" data-test-id="p_default_method">
          <FormattedMessage id="signIn:defaultMethod" />
        </Typography>
      )}
      <Typography data-test-id="p_method_instructions">
        {method.type === MFA_METHOD_TYPE.TOTP ? (
          <FormattedMessage id="signIn:totpInstructions" />
        ) : (
          <FormattedMessage id="signIn:emailCodeSent" values={{ email: method.label }} />
        )}
      </Typography>
    </div>
  );
};

export default MfaMethodInstructions;
