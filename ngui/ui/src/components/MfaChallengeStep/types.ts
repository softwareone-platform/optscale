import { MfaMethod } from "api/auth/mfaMethod";
import { ObjectValues } from "utils/types";
import { EMAIL_CODE_FAILURE, MFA_CHALLENGE_VIEW } from "./constants";

/** Which screen the challenge shows. */
export type MfaChallengeStage =
  | { view: typeof MFA_CHALLENGE_VIEW.NO_SELECTABLE_METHODS }
  | { view: typeof MFA_CHALLENGE_VIEW.METHOD_PICKER }
  | { view: typeof MFA_CHALLENGE_VIEW.CODE_ENTRY; method: MfaMethod };

export type MfaCodeError = {
  messageId: "signIn:invalidVerificationCode" | "somethingWentWrong";
};

export type EmailCodeFailure = ObjectValues<typeof EMAIL_CODE_FAILURE>;

/** What the code entry shows for an e-mail method: whether its code went out, and when another may. */
export type EmailCodeStatus = {
  isSent: boolean;
  isSending: boolean;
  failure: EmailCodeFailure | null;
  secondsUntilResend: number;
  onResend: () => void;
};
