import Stack from "@mui/material/Stack";
import { MFA_VERIFICATION_FAILURE, MfaTerminalFailureReason } from "api/auth/signIn";
import FullWidthButton from "components/FullWidthButton";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { MfaTerminalFailure, useChallengeContinuation } from "hooks/useLoginChallenge";
import { getLoginUrl } from "urls";
import { SPACING_3 } from "utils/layouts";

const MESSAGE_ID_BY_REASON: Record<MfaTerminalFailureReason, string> = {
  [MFA_VERIFICATION_FAILURE.CHALLENGE_EXPIRED]: "signIn:challengeExpired",
  [MFA_VERIFICATION_FAILURE.CHALLENGE_LOCKED]: "signIn:challengeLocked",
  [MFA_VERIFICATION_FAILURE.MFA_METHOD_REMOVED]: "signIn:challengeMfaMethodRemoved",
  [MFA_VERIFICATION_FAILURE.TOO_MANY_FAILED_ATTEMPTS]: "signIn:challengeTooManyFailedAttempts",
  [MFA_VERIFICATION_FAILURE.MFA_ALREADY_SET_UP]: "signIn:challengeMfaAlreadySetUp",
};

/** The challenge can never succeed now, so the only way forward is a fresh sign-in. */
const MfaChallengeEnded = ({ failure }: { failure: MfaTerminalFailure }) => {
  const continuation = useChallengeContinuation();

  return (
    <Stack spacing={SPACING_3}>
      <InlineSeverityAlert
        severity="error"
        messageId={MESSAGE_ID_BY_REASON[failure.reason]}
        messageDataTestId="p_challenge_ended"
      />
      <FullWidthButton
        link={getLoginUrl(failure.userEmail, continuation?.search)}
        messageId="signIn:signInAgain"
        dataTestId="btn_sign_in_again"
      />
    </Stack>
  );
};

export default MfaChallengeEnded;
