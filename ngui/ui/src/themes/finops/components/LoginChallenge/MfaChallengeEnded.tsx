import Stack from "@mui/material/Stack";
import { MFA_VERIFICATION_FAILURE, MfaTerminalFailureReason } from "@theme/api/auth/signIn";
import { MfaTerminalFailure } from "@theme/hooks/useLoginChallenge";
import FullWidthButton from "@theme/shared/components/FullWidthButton";
import { getLoginUrl } from "@theme/urls";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { SPACING_3 } from "utils/layouts";

const MESSAGE_ID_BY_REASON: Record<MfaTerminalFailureReason, string> = {
  [MFA_VERIFICATION_FAILURE.CHALLENGE_EXPIRED]: "signIn:challengeExpired",
  [MFA_VERIFICATION_FAILURE.CHALLENGE_LOCKED]: "signIn:challengeLocked",
  [MFA_VERIFICATION_FAILURE.TOO_MANY_FAILED_ATTEMPTS]: "signIn:challengeTooManyFailedAttempts",
  [MFA_VERIFICATION_FAILURE.MFA_ALREADY_SET_UP]: "signIn:challengeMfaAlreadySetUp"
};

/** The challenge can never succeed now, so the only way forward is a fresh sign-in. */
const MfaChallengeEnded = ({ failure }: { failure: MfaTerminalFailure }) => (
  <Stack spacing={SPACING_3}>
    <InlineSeverityAlert
      severity="error"
      messageId={MESSAGE_ID_BY_REASON[failure.reason]}
      messageDataTestId="p_challenge_ended"
    />
    <FullWidthButton link={getLoginUrl(failure.userEmail)} messageId="signIn:signInAgain" dataTestId="btn_sign_in_again" />
  </Stack>
);

export default MfaChallengeEnded;
