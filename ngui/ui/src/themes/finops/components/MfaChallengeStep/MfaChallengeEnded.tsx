import Stack from "@mui/material/Stack";
import { MFA_VERIFICATION_FAILURE, MfaTerminalFailureReason } from "@theme/api/auth/signIn";
import { MfaTerminalFailure } from "@theme/hooks/useLoginChallenge";
import { getLoginUrl } from "@theme/urls";
import Button from "components/Button";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { SPACING_3 } from "utils/layouts";

const MESSAGE_ID_BY_REASON: Record<MfaTerminalFailureReason, string> = {
  [MFA_VERIFICATION_FAILURE.CHALLENGE_EXPIRED]: "signIn:challengeExpired",
  [MFA_VERIFICATION_FAILURE.CHALLENGE_LOCKED]: "signIn:challengeLocked"
};

/** The challenge can never succeed now, so the only way forward is a fresh sign-in. */
const MfaChallengeEnded = ({ failure }: { failure: MfaTerminalFailure }) => (
  <Stack spacing={SPACING_3}>
    <InlineSeverityAlert
      severity="error"
      messageId={MESSAGE_ID_BY_REASON[failure.reason]}
      messageDataTestId="p_challenge_ended"
    />
    <Button
      variant="contained"
      color="primary"
      size="large"
      fullWidth
      link={getLoginUrl(failure.userEmail)}
      messageId="signIn:signInAgain"
      dataTestId="btn_sign_in_again"
    />
  </Stack>
);

export default MfaChallengeEnded;
