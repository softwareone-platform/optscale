import { MfaMethod } from "@theme/api/auth/signIn";
import { MFA_CHALLENGE_VIEW } from "./constants";

/** Which screen the challenge shows. */
export type MfaChallengeStage =
  | { view: typeof MFA_CHALLENGE_VIEW.NO_SELECTABLE_METHODS }
  | { view: typeof MFA_CHALLENGE_VIEW.METHOD_PICKER }
  | { view: typeof MFA_CHALLENGE_VIEW.CODE_ENTRY; method: MfaMethod; isEmailCodeSent: boolean };

export type MfaCodeError = {
  messageId: "signIn:invalidVerificationCode" | "somethingWentWrong";
};
