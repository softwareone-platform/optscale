import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { MFA_METHOD_TYPE, MfaMethod } from "api/auth/mfaMethod";
import { getMfaVerificationFailure, LoginChallenge, MFA_VERIFICATION_FAILURE } from "api/auth/signIn";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { BackToLoginLink, LoginChallengeScreen, useChallengeEnding } from "components/LoginChallenge";
import { useCompleteLoginChallenge } from "hooks/useCompleteLoginChallenge";
import { useFinishLoginChallenge } from "hooks/useFinishLoginChallenge";
import { useIsMfaChallengeCodesEnabled } from "hooks/useIsMfaChallengeCodesEnabled";
import { useChallengeContinuation } from "hooks/useLoginChallenge";
import { getLoginUrl, LOGIN } from "urls";
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
    <BackToLoginLink />
  </Stack>
);

const MfaChallengeContent = ({ challenge }: { challenge: LoginChallenge }) => {
  const navigate = useNavigate();
  const finishLoginChallenge = useFinishLoginChallenge();
  const { onCompleteLoginChallenge, isLoading: isVerifying } = useCompleteLoginChallenge();
  const { endChallenge, endExpiredChallenge } = useChallengeEnding(challenge);
  const canRequestEmailCode = useIsMfaChallengeCodesEnabled();
  const continuation = useChallengeContinuation();

  const selectableMethods = getSelectableMethods(challenge, { canRequestEmailCode });

  const [selectedMethodId, setSelectedMethodId] = useState(
    () => getPreselectedMethod(challenge, { canRequestEmailCode })?.id ?? null
  );
  // Only "use a different method" sets this; with nothing selected the stage opens the picker anyway.
  const [isPickingMethod, setIsPickingMethod] = useState(false);
  // Unknown, and not shown, until a code is rejected.
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [codeError, setCodeError] = useState<MfaCodeError | null>(null);
  const [rejectedCodeCount, setRejectedCodeCount] = useState(0);

  const stage = getMfaChallengeStage(challenge, { selectedMethodId, isPickingMethod, canRequestEmailCode });

  const emailCode = useChallengeEmailCode({
    challenge,
    canRequestCode: canRequestEmailCode,
    onChallengeGone: endExpiredChallenge,
  });
  const { isSent: isEmailCodeSent, isSending: isEmailCodeSending, failure: emailCodeFailure, send: sendEmailCode } = emailCode;

  const emailMethodId =
    stage.view === MFA_CHALLENGE_VIEW.CODE_ENTRY && stage.method.type === MFA_METHOD_TYPE.EMAIL ? stage.method.id : null;

  // Opening an e-mail method that has no code yet sends one; a failed send waits for Resend instead of retrying.
  useEffect(() => {
    if (canRequestEmailCode && emailMethodId && !isEmailCodeSent && !isEmailCodeSending && !emailCodeFailure) {
      sendEmailCode(emailMethodId);
    }
  }, [canRequestEmailCode, emailMethodId, isEmailCodeSent, isEmailCodeSending, emailCodeFailure, sendEmailCode]);

  const verifyCode = async (method: MfaMethod, code: string) => {
    setCodeError(null);

    // The screen does not say which authenticator app it means, so a code from any of the user's apps is accepted.
    const methodId = method.type === MFA_METHOD_TYPE.TOTP ? undefined : method.id;

    try {
      finishLoginChallenge(await onCompleteLoginChallenge({ challenge_id: challenge.challenge_id, method_id: methodId, code }));
    } catch (error) {
      const failure = getMfaVerificationFailure(error);

      switch (failure.kind) {
        case MFA_VERIFICATION_FAILURE.INVALID_CODE:
          // The service's count wins; without it, one attempt was spent.
          setAttemptsLeft((previous) => failure.attemptsLeft ?? (previous ?? challenge.attempts_left) - 1);
          setCodeError({ messageId: "signIn:invalidVerificationCode" });
          setRejectedCodeCount((count) => count + 1);
          return;
        case MFA_VERIFICATION_FAILURE.CHALLENGE_EXPIRED:
        case MFA_VERIFICATION_FAILURE.CHALLENGE_LOCKED:
        case MFA_VERIFICATION_FAILURE.MFA_METHOD_REMOVED:
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
                  onResend: canRequestEmailCode ? () => sendEmailCode(emailMethodId) : undefined,
                }
              : undefined
          }
          onVerify={(code) => verifyCode(stage.method, code)}
          isVerifying={isVerifying}
          error={codeError}
          attemptsLeft={attemptsLeft}
          onUseDifferentMethod={selectableMethods.length > 1 ? () => setIsPickingMethod(true) : undefined}
          signInAgainUrl={getLoginUrl(challenge.user_email, continuation?.search)}
        />
      );
    default:
      return null;
  }
};

const MfaChallengeStep = () => (
  <LoginChallengeScreen
    // Keyed by challenge: a new challenge on the same route starts from its own default, not the old one's state.
    renderChallenge={(challenge) => <MfaChallengeContent key={challenge.challenge_id} challenge={challenge} />}
  />
);

export default MfaChallengeStep;
