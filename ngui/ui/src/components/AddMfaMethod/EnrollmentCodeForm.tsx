import { ReactNode } from "react";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import Button from "components/Button/Button";
import FormButtonsWrapper from "components/FormButtonsWrapper";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { useVerificationCodeEntry } from "components/VerificationCodeInput/useVerificationCodeEntry";
import VerificationCodeField from "components/VerificationCodeInput/VerificationCodeField";
import { SPACING_2, SPACING_3 } from "utils/layouts";
import { ENROLLMENT_FAILURE } from "./constants";
import { EnrollmentState } from "./useEnrollment";
import { ENROLLMENT_FAILURE_MESSAGE_ID } from "./utils";

type EnrollmentCodeFormProps = {
  /** What to do before a code can be entered — scan the QR, or send the e-mail. */
  children: ReactNode;
  enrollmentState: EnrollmentState;
  onClose: () => void;
};

/** The part both setups share: the 6-digit code, what went wrong, and Close / Verify. */
const EnrollmentCodeForm = ({ children, enrollmentState, onClose }: EnrollmentCodeFormProps) => {
  const { enrollment, isConfirming, failure, attemptsLeft, start, confirm } = enrollmentState;
  const { code, setCode, isCodeComplete, handleSubmit } = useVerificationCodeEntry(confirm);

  const canEnterCode = Boolean(enrollment);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={SPACING_3}>
        {children}
        <Divider />
        <Stack spacing={SPACING_2}>
          <VerificationCodeField value={code} onChange={setCode} disabled={!canEnterCode || isConfirming} />
        </Stack>
        {failure && (
          <InlineSeverityAlert
            severity="error"
            messageId={ENROLLMENT_FAILURE_MESSAGE_ID[failure]}
            messageDataTestId="p_mfa_setup_error"
          />
        )}
        {failure === ENROLLMENT_FAILURE.INVALID_CODE && attemptsLeft !== null && (
          <Typography variant="caption" color="error" align="center" data-test-id="p_mfa_setup_attempts_left">
            <FormattedMessage id="signIn:attemptsLeft" values={{ count: attemptsLeft }} />
          </Typography>
        )}
        {failure === ENROLLMENT_FAILURE.EXPIRED && (
          <Button
            variant="outlined"
            color="primary"
            messageId="mfaSetup:startAgain"
            onClick={start}
            dataTestId="btn_mfa_setup_start_again"
          />
        )}
      </Stack>
      <FormButtonsWrapper>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!canEnterCode || !isCodeComplete}
          isLoading={isConfirming}
          messageId="signIn:verify"
          dataTestId="btn_verify_mfa_method"
        />
        <Button variant="outlined" messageId="cancel" onClick={onClose} dataTestId="btn_cancel_add_mfa_method" />
      </FormButtonsWrapper>
    </form>
  );
};

export default EnrollmentCodeForm;
