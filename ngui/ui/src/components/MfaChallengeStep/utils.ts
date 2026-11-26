import { MFA_METHOD_TYPE, MfaMethod } from "api/auth/mfaMethod";
import { LoginChallenge } from "api/auth/signIn";
import { EMAIL_CODE_FAILURE, MFA_CHALLENGE_VIEW } from "./constants";
import { EmailCodeFailure, MfaChallengeStage } from "./types";

export const EMAIL_CODE_FAILURE_MESSAGE_ID: Record<EmailCodeFailure, string> = {
  [EMAIL_CODE_FAILURE.NOT_SENT]: "signIn:emailCodeNotSent",
  [EMAIL_CODE_FAILURE.TOO_SOON]: "mfaSetup:codeRequestedTooSoon",
  [EMAIL_CODE_FAILURE.UNEXPECTED]: "somethingWentWrong",
};

type ChallengeMethods = Pick<LoginChallenge, "methods" | "default_method_id">;

type CodeRequests = {
  /** Off, the only e-mail code is the one the 202 sent to the default method. */
  canRequestEmailCode: boolean;
};

export const getSelectableMethods = (
  { methods, default_method_id: defaultMethodId }: ChallengeMethods,
  { canRequestEmailCode }: CodeRequests
): MfaMethod[] => {
  const usableMethods = methods.filter(
    ({ id, type, confirmed }) => confirmed && (canRequestEmailCode || type !== MFA_METHOD_TYPE.EMAIL || id === defaultMethodId)
  );

  // A code from any of the user's authenticator apps is accepted, so all of them are one choice: the default, else the first.
  const authenticatorApps = usableMethods.filter(({ type }) => type === MFA_METHOD_TYPE.TOTP);
  const authenticatorApp = authenticatorApps.find(({ id }) => id === defaultMethodId) ?? authenticatorApps[0];

  return usableMethods.filter((method) => method.type !== MFA_METHOD_TYPE.TOTP || method === authenticatorApp);
};

/** The default method when it is selectable, else the only method there is — `null` asks the visitor to pick. */
export const getPreselectedMethod = (challenge: ChallengeMethods, codeRequests: CodeRequests): MfaMethod | null => {
  const selectableMethods = getSelectableMethods(challenge, codeRequests);

  const defaultMethod = selectableMethods.find(({ id }) => id === challenge.default_method_id);

  if (defaultMethod) {
    return defaultMethod;
  }

  return selectableMethods.length === 1 ? selectableMethods[0] : null;
};

export const getMfaChallengeStage = (
  challenge: ChallengeMethods,
  {
    selectedMethodId,
    isPickingMethod,
    canRequestEmailCode,
  }: { selectedMethodId: string | null; isPickingMethod: boolean } & CodeRequests
): MfaChallengeStage => {
  const selectableMethods = getSelectableMethods(challenge, { canRequestEmailCode });

  if (selectableMethods.length === 0) {
    return { view: MFA_CHALLENGE_VIEW.NO_SELECTABLE_METHODS };
  }

  const selectedMethod = selectableMethods.find(({ id }) => id === selectedMethodId);

  if (isPickingMethod || !selectedMethod) {
    return { view: MFA_CHALLENGE_VIEW.METHOD_PICKER };
  }

  return { view: MFA_CHALLENGE_VIEW.CODE_ENTRY, method: selectedMethod };
};
