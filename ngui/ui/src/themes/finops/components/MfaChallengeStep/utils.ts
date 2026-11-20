import { MfaMethod } from "@theme/api/auth/mfaMethod";
import { LoginChallenge } from "@theme/api/auth/signIn";
import { EMAIL_CODE_FAILURE, MFA_CHALLENGE_VIEW } from "./constants";
import { EmailCodeFailure, MfaChallengeStage } from "./types";

export const EMAIL_CODE_FAILURE_MESSAGE_ID: Record<EmailCodeFailure, string> = {
  [EMAIL_CODE_FAILURE.TOO_SOON]: "mfaSetup:codeRequestedTooSoon",
  [EMAIL_CODE_FAILURE.UNEXPECTED]: "somethingWentWrong"
};

export const getSelectableMethods = ({ methods }: Pick<LoginChallenge, "methods">): MfaMethod[] =>
  methods.filter(({ confirmed }) => confirmed);

/** The default method when it is selectable, else the only method there is — `null` asks the visitor to pick. */
export const getPreselectedMethod = (challenge: Pick<LoginChallenge, "methods" | "default_method_id">): MfaMethod | null => {
  const selectableMethods = getSelectableMethods(challenge);

  const defaultMethod = selectableMethods.find(({ id }) => id === challenge.default_method_id);

  if (defaultMethod) {
    return defaultMethod;
  }

  return selectableMethods.length === 1 ? selectableMethods[0] : null;
};

export const getMfaChallengeStage = (
  challenge: Pick<LoginChallenge, "methods" | "default_method_id">,
  { selectedMethodId, isPickingMethod }: { selectedMethodId: string | null; isPickingMethod: boolean }
): MfaChallengeStage => {
  const selectableMethods = getSelectableMethods(challenge);

  if (selectableMethods.length === 0) {
    return { view: MFA_CHALLENGE_VIEW.NO_SELECTABLE_METHODS };
  }

  const selectedMethod = selectableMethods.find(({ id }) => id === selectedMethodId);

  if (isPickingMethod || !selectedMethod) {
    return { view: MFA_CHALLENGE_VIEW.METHOD_PICKER };
  }

  return { view: MFA_CHALLENGE_VIEW.CODE_ENTRY, method: selectedMethod };
};
