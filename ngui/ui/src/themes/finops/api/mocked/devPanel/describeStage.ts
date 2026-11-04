import { MFA_METHOD_TYPE } from "@theme/api/auth/signIn";
import { MFA_CHALLENGE_VIEW, MfaChallengeStage } from "@theme/components/MfaChallengeStep";
import { MFA_CHALLENGE, MFA_ENROLLMENT } from "@theme/urls";
import { LOGIN } from "urls";

const ROUTE_DESCRIPTION: Record<string, string> = {
  [LOGIN]: "Sign-in — email / password step",
  [MFA_CHALLENGE]: "MFA challenge",
  [MFA_ENROLLMENT]: "MFA enrollment (placeholder screen)"
};

export const describeRoute = (pathname: string) => ROUTE_DESCRIPTION[pathname] ?? pathname;

export const describeMfaChallengeStage = (stage: MfaChallengeStage) => {
  switch (stage.view) {
    case MFA_CHALLENGE_VIEW.NO_SELECTABLE_METHODS:
      return "NoSelectableMethods — error, no confirmed method";
    case MFA_CHALLENGE_VIEW.METHOD_PICKER:
      return "MfaMethodPicker — choosing a method";
    case MFA_CHALLENGE_VIEW.CODE_ENTRY: {
      const { method, isEmailCodeSent } = stage;
      const methodDescription =
        method.type === MFA_METHOD_TYPE.TOTP
          ? "authenticator app (TOTP)"
          : `e-mail, code ${isEmailCodeSent ? "sent" : "not sent"}`;

      return `MfaCodeEntry — ${methodDescription}${method.is_default ? " · default method" : ""}`;
    }
  }
};
