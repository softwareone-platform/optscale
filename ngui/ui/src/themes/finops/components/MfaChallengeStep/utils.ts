import { LoginChallenge, MFA_METHOD_TYPE, MfaMethod } from "@theme/api/auth/signIn";
import { MFA_CHALLENGE_VIEW } from "./constants";
import { MfaChallengeStage } from "./types";

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

/** `code_sent` describes the default method only: the service mails a code with the 202 when that method is email. */
export const isEmailCodeAlreadySent = (
  challenge: Pick<LoginChallenge, "code_sent" | "default_method_id">,
  method: Pick<MfaMethod, "id" | "type">
) => method.type === MFA_METHOD_TYPE.EMAIL && challenge.code_sent && method.id === challenge.default_method_id;

export const getMfaChallengeStage = (
  challenge: Pick<LoginChallenge, "methods" | "code_sent" | "default_method_id">,
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

  return {
    view: MFA_CHALLENGE_VIEW.CODE_ENTRY,
    method: selectedMethod,
    isEmailCodeSent: isEmailCodeAlreadySent(challenge, selectedMethod)
  };
};

/** `m:ss`, the way a countdown reads. */
export const formatCountdown = (totalSeconds: number) =>
  `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
