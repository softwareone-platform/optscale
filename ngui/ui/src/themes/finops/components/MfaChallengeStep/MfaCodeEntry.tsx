import { FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { MfaMethod } from "@theme/api/auth/signIn";
import VerificationCodeInput from "@theme/components/VerificationCodeInput";
import { VERIFICATION_CODE_LENGTH } from "@theme/components/VerificationCodeInput/constants";
import Button from "components/Button";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { SPACING_2, SPACING_3 } from "utils/layouts";
import BackToLoginButton from "./BackToLoginButton";
import ChallengeStatus from "./ChallengeStatus";
import { MFA_METHOD_NAME_MESSAGE_ID } from "./constants";
import useStyles from "./MfaChallengeStep.styles";
import MfaMethodIcon from "./MfaMethodIcon";
import MfaMethodInstructions from "./MfaMethodInstructions";
import { MfaCodeError } from "./types";

type MfaCodeEntryProps = {
  method: MfaMethod;
  isEmailCodeSent: boolean;
  onVerify: (code: string) => void;
  isVerifying: boolean;
  error: MfaCodeError | null;
  secondsUntilExpiry: number;
  attemptsLeft: number | null;
  onUseDifferentMethod?: () => void;
};

const MfaCodeEntry = ({
  method,
  isEmailCodeSent,
  onVerify,
  isVerifying,
  error,
  secondsUntilExpiry,
  attemptsLeft,
  onUseDifferentMethod
}: MfaCodeEntryProps) => {
  const { classes } = useStyles();

  const [code, setCode] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onVerify(code);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={SPACING_3}>
        <Typography fontWeight="bold" data-test-id="p_approve_sign_in_request">
          <FormattedMessage id="signIn:approveSignInRequest" />
        </Typography>
        <div className={classes.methodCard} data-test-id={`mfa_method_${method.type}`}>
          <MfaMethodIcon type={method.type} />
          <Typography className={classes.methodName}>
            <FormattedMessage id={MFA_METHOD_NAME_MESSAGE_ID[method.type]} />
          </Typography>
        </div>
        <MfaMethodInstructions method={method} isEmailCodeSent={isEmailCodeSent} />
        <Typography fontWeight="bold" align="center">
          <FormattedMessage id="signIn:enterVerificationCode" values={{ length: VERIFICATION_CODE_LENGTH }} />
        </Typography>
        <VerificationCodeInput value={code} onChange={setCode} disabled={isVerifying} autoFocus />
        <ChallengeStatus secondsUntilExpiry={secondsUntilExpiry} attemptsLeft={attemptsLeft} />
        {error && <InlineSeverityAlert severity="error" messageId={error.messageId} messageDataTestId="p_code_error" />}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={isVerifying || code.length < VERIFICATION_CODE_LENGTH}
            startIcon={isVerifying ? <CircularProgress size={20} color="inherit" /> : undefined}
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
