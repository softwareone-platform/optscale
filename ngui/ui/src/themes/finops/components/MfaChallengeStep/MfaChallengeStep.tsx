import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { MFA_METHOD_TYPE } from "@theme/api/auth/mfaMethod";
import { getMfaVerificationFailure, LoginChallenge, MFA_VERIFICATION_FAILURE } from "@theme/api/auth/signIn";
import { BackToLoginButton, LoginChallengeScreen, useChallengeEnding } from "@theme/components/LoginChallenge";
import { useCompleteLoginChallenge } from "@theme/hooks/useCompleteLoginChallenge";
import { useFinishLoginChallenge } from "@theme/hooks/useFinishLoginChallenge";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { LOGIN } from "urls";
import { SPACING_3 } from "utils/layouts";
import { MFA_CHALLENGE_VIEW } from "./constants";
import MfaCodeEntry from "./MfaCodeEntry";
import MfaMethodPicker from "./MfaMethodPicker";
import { MfaCodeError } from "./types";
import { useChallengeEmailCode } from "./useChallengeEmailCode";
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
  const finishLoginChallenge = useFinishLoginChallenge();
  const { onCompleteLoginChallenge, isLoading: isVerifying } = useCompleteLoginChallenge();
  const { secondsUntilExpiry, endChallenge, endExpiredChallenge } = useChallengeEnding(challenge);

  const selectableMethods = getSelectableMethods(challenge);

  const [selectedMethodId, setSelectedMethodId] = useState(() => getPreselectedMethod(challenge)?.id ?? null);
  // Only "use a different method" sets this; with nothing selected the stage opens the picker anyway.
  const [isPickingMethod, setIsPickingMethod] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(challenge.attempts_left);
  const [codeError, setCodeError] = useState<MfaCodeError | null>(null);
  const [rejectedCodeCount, setRejectedCodeCount] = useState(0);

  const stage = getMfaChallengeStage(challenge, { selectedMethodId, isPickingMethod });

  const emailCode = useChallengeEmailCode({ challenge, onChallengeGone: endExpiredChallenge });
  const { isSent: isEmailCodeSent, isSending: isEmailCodeSending, failure: emailCodeFailure, send: sendEmailCode } = emailCode;

  const emailMethodId =
    stage.view === MFA_CHALLENGE_VIEW.CODE_ENTRY && stage.method.type === MFA_METHOD_TYPE.EMAIL ? stage.method.id : null;

  // Opening an e-mail method that has no code yet sends one; a failed send waits for Resend instead of retrying.
  useEffect(() => {
    if (emailMethodId && !isEmailCodeSent && !isEmailCodeSending && !emailCodeFailure) {
      sendEmailCode(emailMethodId);
    }
  }, [emailMethodId, isEmailCodeSent, isEmailCodeSending, emailCodeFailure, sendEmailCode]);

  const verifyCode = async (methodId: string, code: string) => {
    setCodeError(null);

    try {
      finishLoginChallenge(await onCompleteLoginChallenge({ challenge_id: challenge.challenge_id, method_id: methodId, code }));
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
        case MFA_VERIFICATION_FAILURE.TOO_MANY_FAILED_ATTEMPTS:
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
          emailCode={
            emailMethodId
              ? {
                  isSent: isEmailCodeSent,
                  isSending: isEmailCodeSending,
                  failure: emailCodeFailure,
                  secondsUntilResend: emailCode.secondsUntilResend,
                  onResend: () => sendEmailCode(emailMethodId)
                }
              : undefined
          }
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

const MfaChallengeStep = () => (
  <LoginChallengeScreen
    // Keyed by challenge: a fresh challenge (e.g. re-run from the dev panel) starts from its own default.
    renderChallenge={(challenge) => <MfaChallengeContent key={challenge.challenge_id} challenge={challenge} />}
  />
);

export default MfaChallengeStep;
