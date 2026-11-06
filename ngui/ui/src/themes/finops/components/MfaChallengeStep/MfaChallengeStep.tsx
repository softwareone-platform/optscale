import { useCallback, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getMfaVerificationFailure,
  LoginChallenge,
  MFA_VERIFICATION_FAILURE,
  MfaTerminalFailureReason
} from "@theme/api/auth/signIn";
import { useCompleteLoginChallenge } from "@theme/hooks/useCompleteLoginChallenge";
import { useCompleteSignIn } from "@theme/hooks/useCompleteSignIn";
import { useEndLoginChallenge, useLoginChallenge, useMfaTerminalFailure } from "@theme/hooks/useLoginChallenge";
import { useSecondsUntil } from "@theme/hooks/useSecondsUntil";
import Greeter from "components/Greeter";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { INITIALIZE, LOGIN } from "urls";
import { SPACING_3 } from "utils/layouts";
import BackToLoginButton from "./BackToLoginButton";
import { MFA_CHALLENGE_VIEW } from "./constants";
import MfaChallengeEnded from "./MfaChallengeEnded";
import useStyles from "./MfaChallengeStep.styles";
import MfaCodeEntry from "./MfaCodeEntry";
import MfaMethodPicker from "./MfaMethodPicker";
import { MfaCodeError } from "./types";
import { getMfaChallengeStage, getPreselectedMethod, getSelectableMethods } from "./utils";

const NoSelectableMethods = () => (
  <Stack spacing={SPACING_3}>
    <InlineSeverityAlert
      severity="error"
      messageId="signIn:noVerificationMethods"
      messageDataTestId="p_no_verification_methods"
    />
    <BackToLoginButton />
  </Stack>
);

const MfaChallengeContent = ({ challenge }: { challenge: LoginChallenge }) => {
  const navigate = useNavigate();
  const endLoginChallenge = useEndLoginChallenge();
  const completeSignIn = useCompleteSignIn();
  const { onCompleteLoginChallenge, isLoading: isVerifying } = useCompleteLoginChallenge();
  const secondsUntilExpiry = useSecondsUntil(challenge.expires_at);

  const selectableMethods = getSelectableMethods(challenge);

  const [selectedMethodId, setSelectedMethodId] = useState(() => getPreselectedMethod(challenge)?.id ?? null);
  // Only "use a different method" sets this; with nothing selected the stage opens the picker anyway.
  const [isPickingMethod, setIsPickingMethod] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(challenge.attempts_left);
  const [codeError, setCodeError] = useState<MfaCodeError | null>(null);
  const [rejectedCodeCount, setRejectedCodeCount] = useState(0);

  const stage = getMfaChallengeStage(challenge, { selectedMethodId, isPickingMethod });

  const endChallenge = useCallback(
    (reason: MfaTerminalFailureReason) => endLoginChallenge({ reason, userEmail: challenge.user_email }),
    [endLoginChallenge, challenge.user_email]
  );

  useEffect(() => {
    if (secondsUntilExpiry === 0) {
      endChallenge(MFA_VERIFICATION_FAILURE.CHALLENGE_EXPIRED);
    }
  }, [secondsUntilExpiry, endChallenge]);

  const verifyCode = async (methodId: string, code: string) => {
    setCodeError(null);

    try {
      completeSignIn(await onCompleteLoginChallenge({ challenge_id: challenge.challenge_id, method_id: methodId, code }));
      navigate(INITIALIZE, { replace: true });
    } catch (error) {
      const failure = getMfaVerificationFailure(error);

      switch (failure.kind) {
        case MFA_VERIFICATION_FAILURE.INVALID_CODE:
          // The service's count wins; without it, one attempt was spent.
          setAttemptsLeft((previous) => failure.attemptsLeft ?? previous - 1);
          setCodeError({ messageId: "signIn:invalidVerificationCode" });
          setRejectedCodeCount((count) => count + 1);
          return;
        case MFA_VERIFICATION_FAILURE.CHALLENGE_EXPIRED:
        case MFA_VERIFICATION_FAILURE.CHALLENGE_LOCKED:
          endChallenge(failure.kind);
          return;
        case MFA_VERIFICATION_FAILURE.UNEXPECTED:
          // Nothing says the challenge is spent, so the entered code stays for another try.
          setCodeError({ messageId: "somethingWentWrong" });
      }
    }
  };

  switch (stage.view) {
    case MFA_CHALLENGE_VIEW.NO_SELECTABLE_METHODS:
      return <NoSelectableMethods />;
    case MFA_CHALLENGE_VIEW.METHOD_PICKER:
      return (
        <MfaMethodPicker
          methods={selectableMethods}
          initiallySelectedMethodId={selectedMethodId}
          onUseSelectedMethod={(methodId) => {
            setSelectedMethodId(methodId);
            setIsPickingMethod(false);
            setCodeError(null);
          }}
          onBack={() => (selectedMethodId ? setIsPickingMethod(false) : navigate(LOGIN))}
        />
      );
    case MFA_CHALLENGE_VIEW.CODE_ENTRY:
      return (
        <MfaCodeEntry
          // A new method, or a rejected code, starts from an empty, focused code input.
          key={`${stage.method.id}:${rejectedCodeCount}`}
          method={stage.method}
          isEmailCodeSent={stage.isEmailCodeSent}
          onVerify={(code) => verifyCode(stage.method.id, code)}
          isVerifying={isVerifying}
          error={codeError}
          secondsUntilExpiry={secondsUntilExpiry}
          attemptsLeft={attemptsLeft}
          onUseDifferentMethod={selectableMethods.length > 1 ? () => setIsPickingMethod(true) : undefined}
        />
      );
    default:
      return null;
  }
};

const MfaChallengeStep = () => {
  const { classes } = useStyles();

  const challenge = useLoginChallenge();
  const terminalFailure = useMfaTerminalFailure();

  // Landing here with neither means the password was never verified in this session.
  if (!challenge && !terminalFailure) {
    return <Navigate replace to={LOGIN} />;
  }

  return (
    <Greeter
      content={
        <Stack spacing={SPACING_3} className={classes.content}>
          <Typography align="center" data-test-id="p_signing_in_as">
            <FormattedMessage id="signIn:signingInAs" values={{ email: challenge?.user_email ?? terminalFailure?.userEmail }} />
          </Typography>
          {challenge ? (
            // Keyed by challenge: a fresh challenge (e.g. re-run from the dev panel) starts from its own default.
            <MfaChallengeContent key={challenge.challenge_id} challenge={challenge} />
          ) : (
            terminalFailure && <MfaChallengeEnded failure={terminalFailure} />
          )}
        </Stack>
      }
    />
  );
};

export default MfaChallengeStep;
