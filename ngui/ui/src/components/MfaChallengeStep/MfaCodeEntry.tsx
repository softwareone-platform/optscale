import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { MfaMethod } from "api/auth/mfaMethod";
import FullWidthButton from "components/FullWidthButton";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { BackToLoginButton, formatCountdown } from "components/LoginChallenge";
import MfaMethodTile from "components/MfaMethodTile";
import { useVerificationCodeEntry } from "components/VerificationCodeInput/useVerificationCodeEntry";
import VerificationCodeField from "components/VerificationCodeInput/VerificationCodeField";
import { SPACING_2, SPACING_3 } from "utils/layouts";
import ChallengeStatus from "./ChallengeStatus";
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
  secondsUntilExpiry: number;
  attemptsLeft: number;
  onUseDifferentMethod?: () => void;
};

const MfaCodeEntry = ({
  method,
  emailCode,
  onVerify,
  isVerifying,
  error,
  secondsUntilExpiry,
  attemptsLeft,
  onUseDifferentMethod
}: MfaCodeEntryProps) => {
  const { code, setCode, isCodeComplete, handleSubmit } = useVerificationCodeEntry(onVerify);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={SPACING_3}>
        <Typography fontWeight="bold" data-test-id="p_approve_sign_in_request">
          <FormattedMessage id="signIn:approveSignInRequest" />
        </Typography>
        <MfaMethodTile type={method.type} testId={`mfa_method_${method.type}`} />
        <MfaMethodInstructions method={method} emailCode={emailCode} />
        <VerificationCodeField value={code} onChange={setCode} disabled={isVerifying} autoFocus />
        <ChallengeStatus secondsUntilExpiry={secondsUntilExpiry} attemptsLeft={attemptsLeft} />
        {error && <InlineSeverityAlert severity="error" messageId={error.messageId} messageDataTestId="p_code_error" />}
        {emailCode?.failure && (
          <InlineSeverityAlert
            severity="error"
            messageId={EMAIL_CODE_FAILURE_MESSAGE_ID[emailCode.failure]}
            messageDataTestId="p_email_code_error"
          />
        )}
        {emailCode && (
          <Box display="flex" justifyContent="center">
            <Link
              component="button"
              type="button"
              color="primary"
              disabled={emailCode.isSending || emailCode.secondsUntilResend > 0}
              onClick={emailCode.onResend}
              data-test-id="btn_resend_email_code"
            >
              {emailCode.secondsUntilResend > 0 ? (
                <FormattedMessage id="signIn:resendCodeIn" values={{ time: formatCountdown(emailCode.secondsUntilResend) }} />
              ) : (
                <FormattedMessage id="signIn:resendCode" />
              )}
            </Link>
          </Box>
        )}
        {onUseDifferentMethod && (
          <Box display="flex" justifyContent="center">
            <Link
              component="button"
              type="button"
              color="primary"
              onClick={onUseDifferentMethod}
              data-test-id="btn_use_different_method"
            >
              <FormattedMessage id="signIn:useDifferentMethod" />
            </Link>
          </Box>
        )}
        <Stack spacing={SPACING_2}>
          <FullWidthButton
            type="submit"
            disabled={!isCodeComplete}
            isLoading={isVerifying}
            messageId="signIn:verify"
            dataTestId="btn_verify"
          />
          <BackToLoginButton />
        </Stack>
      </Stack>
    </form>
  );
};

export default MfaCodeEntry;
