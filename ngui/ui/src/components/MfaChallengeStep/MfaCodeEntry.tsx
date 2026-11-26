import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { MfaMethod } from "api/auth/mfaMethod";
import FullWidthButton from "components/FullWidthButton";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { BackToLoginLink } from "components/LoginChallenge";
import MfaMethodTile from "components/MfaMethodTile";
import { useVerificationCodeEntry } from "components/VerificationCodeInput/useVerificationCodeEntry";
import VerificationCodeField from "components/VerificationCodeInput/VerificationCodeField";
import { SPACING_2, SPACING_3 } from "utils/layouts";
import AttemptsLeft from "./AttemptsLeft";
import CenteredTextButton from "./CenteredTextButton";
import { EMAIL_CODE_FAILURE } from "./constants";
import MfaMethodInstructions from "./MfaMethodInstructions";
import { EmailCodeStatus, MfaCodeError } from "./types";
import { EMAIL_CODE_FAILURE_MESSAGE_ID } from "./utils";

type MfaCodeEntryProps = {
  method: MfaMethod;
  /** Only for an e-mail method. */
  emailCode?: EmailCodeStatus;
  onVerify: (code: string) => void;
  isVerifying: boolean;
  error: MfaCodeError | null;
  /** Shown once a code was rejected. */
  attemptsLeft: number | null;
  onUseDifferentMethod?: () => void;
  /** Where "Sign in again" leads when no code can reach the user. */
  signInAgainUrl: string;
};

const MfaCodeEntry = ({
  method,
  emailCode,
  onVerify,
  isVerifying,
  error,
  attemptsLeft,
  onUseDifferentMethod,
  signInAgainUrl,
}: MfaCodeEntryProps) => {
  const { code, setCode, isCodeComplete, handleSubmit } = useVerificationCodeEntry(onVerify);
  // No code went out and none can be asked for, so there is nothing to enter: only a fresh sign-in sends one.
  const isCodeUnavailable = emailCode?.failure === EMAIL_CODE_FAILURE.NOT_SENT && !emailCode.onResend;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={SPACING_3}>
        <Typography fontWeight="bold" data-test-id="p_approve_sign_in_request">
          <FormattedMessage id="signIn:approveSignInRequest" />
        </Typography>
        <MfaMethodTile type={method.type} testId={`mfa_method_${method.type}`} />
        <MfaMethodInstructions method={method} emailCode={emailCode} />
        {!isCodeUnavailable && (
          <>
            <VerificationCodeField value={code} onChange={setCode} disabled={isVerifying} autoFocus />
            {attemptsLeft !== null && <AttemptsLeft count={attemptsLeft} />}
          </>
        )}
        {!isCodeUnavailable && error && (
          <InlineSeverityAlert severity="error" messageId={error.messageId} messageDataTestId="p_code_error" />
        )}
        {emailCode?.failure && (
          <InlineSeverityAlert
            severity="error"
            messageId={EMAIL_CODE_FAILURE_MESSAGE_ID[emailCode.failure]}
            messageDataTestId="p_email_code_error"
          />
        )}
        {isCodeUnavailable && (
          <BackToLoginLink to={signInAgainUrl} messageId="signIn:signInAgain" dataTestId="link_sign_in_again" />
        )}
        {emailCode?.onResend && (
          <CenteredTextButton
            messageId="signIn:resendCode"
            onClick={emailCode.onResend}
            disabled={emailCode.isSending}
            dataTestId="btn_resend_email_code"
          />
        )}
        {onUseDifferentMethod && (
          <CenteredTextButton
            messageId="signIn:useDifferentMethod"
            onClick={onUseDifferentMethod}
            dataTestId="btn_use_different_method"
          />
        )}
        <Stack spacing={SPACING_2}>
          {!isCodeUnavailable && (
            <FullWidthButton
              type="submit"
              disabled={!isCodeComplete}
              isLoading={isVerifying}
              messageId="signIn:verify"
              dataTestId="btn_verify"
            />
          )}
          <BackToLoginLink />
        </Stack>
      </Stack>
    </form>
  );
};

export default MfaCodeEntry;
