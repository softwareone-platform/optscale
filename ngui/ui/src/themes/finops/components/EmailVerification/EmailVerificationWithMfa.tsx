import { useState } from "react";
import { CreateTokenResponse } from "@theme/api/auth/signIn";
import { CodeSignInStep, SignedInStep, useProceedToApp } from "@theme/components/CodeSignIn";
import ConfirmEmailVerificationCodeForm from "components/forms/ConfirmEmailVerificationCodeForm";
import Greeter from "components/Greeter";

/**
 * Upstream's e-mail verification, its code sign-in going through MFA. The address is verified once the code is
 * accepted, so the success screen comes first and a challenge waits behind "Proceed".
 */
const EmailVerificationWithMfa = () => {
  const proceedToApp = useProceedToApp();

  const [signIn, setSignIn] = useState<CreateTokenResponse | null>(null);

  return (
    <Greeter
      content={
        signIn ? (
          <SignedInStep messageId="emailVerifiedSuccessfully" onProceed={() => proceedToApp(signIn, { showPolicy: true })} />
        ) : (
          <CodeSignInStep
            descriptionMessageId="emailVerificationDescription"
            CodeForm={ConfirmEmailVerificationCodeForm}
            onSignIn={setSignIn}
          />
        )
      }
    />
  );
};

export default EmailVerificationWithMfa;
