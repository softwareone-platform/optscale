import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthToken, CREATE_TOKEN_STATUS, CreateTokenResponse } from "@theme/api/auth/signIn";
import { CodeSignInStep, SignedInStep, useProceedToApp } from "@theme/components/CodeSignIn";
import { useRecoveryToken, useStartLoginChallenge } from "@theme/hooks/useLoginChallenge";
import ConfirmVerificationCodeForm from "components/forms/ConfirmVerificationCodeForm";
import Greeter from "components/Greeter";
import SendVerificationCodeContainer from "containers/SendVerificationCodeContainer";
import { getSearchParams, updateSearchParams } from "utils/network";
import NewPasswordStep from "./NewPasswordStep";

type RecoveryStep =
  | { name: "send_code" }
  | { name: "confirm_code" }
  | { name: "new_password"; recoveryToken: AuthToken }
  | { name: "password_changed"; signIn: CreateTokenResponse };

const getInitialStep = (recoveryToken: AuthToken | null): RecoveryStep => {
  // Back from the challenge the code sign-in led to.
  if (recoveryToken) {
    return { name: "new_password", recoveryToken };
  }

  const { email } = getSearchParams() as { email?: string };

  return email ? { name: "confirm_code" } : { name: "send_code" };
};

/**
 * Upstream's password recovery, its sign-ins going through MFA: the code sign-in and the one with the new password
 * can each answer a `202`. A challenge on the code hands its token back here, to set the new password with.
 */
const PasswordRecoveryWithMfa = () => {
  const { search } = useLocation();
  const recoveryToken = useRecoveryToken();
  const startLoginChallenge = useStartLoginChallenge();
  const proceedToApp = useProceedToApp();

  const [step, setStep] = useState(() => getInitialStep(recoveryToken));

  const continueAfterCodeSignIn = (signIn: CreateTokenResponse) => {
    if (signIn.status === CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED) {
      startLoginChallenge(signIn.data, { continuation: { returnsToPasswordRecovery: true, search } });
      return;
    }

    setStep({ name: "new_password", recoveryToken: signIn.data });
  };

  const renderStep = () => {
    switch (step.name) {
      case "send_code":
        return (
          <SendVerificationCodeContainer
            onSuccess={(email: string) => {
              updateSearchParams({ email });
              setStep({ name: "confirm_code" });
            }}
          />
        );
      case "confirm_code":
        return (
          <CodeSignInStep
            descriptionMessageId="pleaseEnterVerificationCodeSentTo"
            CodeForm={ConfirmVerificationCodeForm}
            onSignIn={continueAfterCodeSignIn}
          />
        );
      case "new_password":
        return (
          <NewPasswordStep
            recoveryToken={step.recoveryToken}
            onSignIn={(signIn) => setStep({ name: "password_changed", signIn })}
          />
        );
      case "password_changed":
        return <SignedInStep messageId="passwordChangedSuccessfully" onProceed={() => proceedToApp(step.signIn)} />;
      default:
        return null;
    }
  };

  return <Greeter content={renderStep()} />;
};

export default PasswordRecoveryWithMfa;
