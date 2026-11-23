import { MFA_METHOD_TYPE, MfaMethodType } from "api/auth/mfaMethod";
import { MFA_STATUS } from "api/auth/mfaMethods/constants";
import {
  ConfirmMfaEnrollment,
  DeleteMfaMethod,
  GetMfaStatus,
  MfaEnrollment,
  MfaMethodDetails,
  MfaStatus,
  ResetMfa,
  StartMfaEnrollment,
  UpdateMfaMethod
} from "api/auth/mfaMethods/types";
import { MOCK_MFA, MOCK_SIGN_IN_CREDENTIALS } from "api/mocked/config";
import { authError } from "api/mocked/errorBodies";
import { findMfaEnforcingOrganizations } from "api/mocked/state/authPolicies";
import { UserMfa } from "api/mocked/state/mockState";
import { loadUserMfa, recordEmailCodeSent, setUserMethods } from "api/mocked/state/userMfa";
import { getCurrentUTCTimeInSec } from "utils/datetime";
import { ERROR_BODY, issueEnrollment, STATUS_BODY } from "./fixtures";
import { DEFAULT_SECURITY_SCENARIO, SECURITY_SCENARIO, SecurityScenario } from "./scenarios";

/**
 * Stand in for `/auth/v2/users/{user_id}/mfa_methods…`, following the auth service's rules and error codes
 * (`auth/auth_server/controllers/mfa_method.py`). Each is typed off the real call, so a contract change breaks it.
 */

// Keyed by every scenario, so a new one fails to compile until it names its starting point.
const SCENARIO_SEED: Record<SecurityScenario, MfaStatus> = {
  [SECURITY_SCENARIO.NO_METHODS]: STATUS_BODY.NO_METHODS,
  [SECURITY_SCENARIO.TOTP_ONLY]: STATUS_BODY.TOTP_ONLY,
  [SECURITY_SCENARIO.TOTP_AND_EMAIL]: STATUS_BODY.TOTP_AND_EMAIL,
  [SECURITY_SCENARIO.ENFORCED_NO_METHODS]: STATUS_BODY.ENFORCED_NO_METHODS,
  [SECURITY_SCENARIO.ENFORCED_WITH_METHODS]: STATUS_BODY.ENFORCED_WITH_METHODS,
  [SECURITY_SCENARIO.INTERNAL_ERROR]: STATUS_BODY.NO_METHODS,
  [SECURITY_SCENARIO.EMAIL_SERVICE_DOWN]: STATUS_BODY.NO_METHODS
};

const loadSignedInUser = ({ token, userId }: { token: string; userId: string }, scenario: SecurityScenario) => {
  if (!token) {
    throw authError(ERROR_BODY.TOKEN_REQUIRED);
  }

  return loadUserMfa({ userId, scenario, seed: SCENARIO_SEED[scenario] });
};

const findMethod = (user: UserMfa, methodId: string) => {
  const method = user.methods.find(({ id }) => id === methodId);

  if (!method) {
    throw authError(ERROR_BODY.NOT_FOUND, ["MFAMethod", methodId]);
  }

  return method;
};

// The secret leaves the service once, in the enrollment response.
const toMethodDetails = ({ secret: _secret, otpauth_uri: _otpauthUri, ...method }: MfaEnrollment): MfaMethodDetails => method;

export const getMfaStatusMock = async (
  params: Parameters<GetMfaStatus>[0],
  scenario: SecurityScenario = DEFAULT_SECURITY_SCENARIO
): ReturnType<GetMfaStatus> => {
  const user = loadSignedInUser(params, scenario);

  if (scenario === SECURITY_SCENARIO.INTERNAL_ERROR) {
    throw authError(ERROR_BODY.INTERNAL_ERROR);
  }

  // The Security page lists what protects the account — a pending enrollment does not yet.
  const methods = user.methods.filter(({ confirmed }) => confirmed).map(toMethodDetails);

  // Enforced by the scenario's organizations, or by any an MFA policy was since created for.
  const enforcingOrganizations = [...new Set([...user.enforcingOrganizations, ...findMfaEnforcingOrganizations()])];
  const isMfaEnforced = user.mfaEnforced || enforcingOrganizations.length > 0;

  const getStatus = () => {
    if (isMfaEnforced) {
      return MFA_STATUS.ENFORCED;
    }

    return methods.length > 0 ? MFA_STATUS.CONFIGURED : MFA_STATUS.NOT_CONFIGURED;
  };

  return {
    methods,
    mfa_enforced: isMfaEnforced,
    enforcing_organizations: enforcingOrganizations,
    status: getStatus()
  };
};

/** Starts an enrollment for a loaded user — the signed-in route and the sign-in challenge's route share it. */
export const startEnrollmentFor = (
  user: UserMfa,
  { userId, type, label }: { userId: string; type: MfaMethodType; label?: string }
): MfaEnrollment => {
  // Several authenticator apps tell themselves apart by the name the user gives each.
  if (type === MFA_METHOD_TYPE.TOTP && label === undefined) {
    throw authError(ERROR_BODY.NOT_PROVIDED, ["label"]);
  }

  // Only one e-mail method: it always mails the account's own address.
  if (type === MFA_METHOD_TYPE.EMAIL && user.methods.some((method) => method.type === type && method.confirmed)) {
    throw authError(ERROR_BODY.MFA_METHOD_EXISTS, [type]);
  }

  // Only the signed-in user can pick this scenario; an enrollment under a sign-in challenge always sends.
  if (type === MFA_METHOD_TYPE.EMAIL && user.scenario === SECURITY_SCENARIO.EMAIL_SERVICE_DOWN) {
    throw authError(ERROR_BODY.SERVICE_UNAVAILABLE);
  }

  if (type === MFA_METHOD_TYPE.EMAIL && !recordEmailCodeSent(userId)) {
    throw authError(ERROR_BODY.CODE_REQUESTED_TOO_SOON);
  }

  const enrollment = issueEnrollment({ type, userId, label });

  // Starting again replaces an unfinished enrollment of the same type; confirmed ones stay.
  setUserMethods(userId, [...user.methods.filter((method) => method.type !== type || method.confirmed), enrollment]);

  return enrollment;
};

/** Confirms a loaded user's pending method — shared like `startEnrollmentFor`. */
export const confirmEnrollmentFor = (
  user: UserMfa,
  { methodId, code }: { methodId: string; code: string },
  nowSeconds = getCurrentUTCTimeInSec()
) => {
  const method = findMethod(user, methodId);

  if (method.confirmed) {
    throw authError(ERROR_BODY.MFA_METHOD_ALREADY_CONFIRMED, [methodId]);
  }

  // An e-mail enrollment starts when its code goes out, so the code is as old as the method; it lapses before the
  // enrollment does, and the service answers it as a wrong one.
  const isEmailCodeExpired =
    method.type === MFA_METHOD_TYPE.EMAIL && nowSeconds - method.created_at >= MOCK_MFA.EMAIL_CODE_TTL_SECONDS;

  // No attempt limit: the pending method stays for another try until it expires.
  if (code !== MOCK_SIGN_IN_CREDENTIALS.mfaCode || isEmailCodeExpired) {
    throw authError(ERROR_BODY.INVALID_AUTHENTICATION_CODE);
  }

  method.is_default = !user.methods.some((other) => other.confirmed);
  method.confirmed = true;
  method.confirmed_at = nowSeconds;

  return toMethodDetails(method);
};

export const startMfaEnrollmentMock = async (
  { type, label, ...params }: Parameters<StartMfaEnrollment>[0],
  scenario: SecurityScenario = DEFAULT_SECURITY_SCENARIO
): ReturnType<StartMfaEnrollment> =>
  startEnrollmentFor(loadSignedInUser(params, scenario), { userId: params.userId, type, label });

export const confirmMfaEnrollmentMock = async (
  { methodId, code, ...params }: Parameters<ConfirmMfaEnrollment>[0],
  scenario: SecurityScenario = DEFAULT_SECURITY_SCENARIO
): ReturnType<ConfirmMfaEnrollment> => confirmEnrollmentFor(loadSignedInUser(params, scenario), { methodId, code });

export const updateMfaMethodMock = async (
  { methodId, is_default, label, ...params }: Parameters<UpdateMfaMethod>[0],
  scenario: SecurityScenario = DEFAULT_SECURITY_SCENARIO
): ReturnType<UpdateMfaMethod> => {
  const user = loadSignedInUser(params, scenario);
  const method = findMethod(user, methodId);

  // The default can only move to another method, and an e-mail method keeps the masked address as its name.
  if (is_default === false || (label !== undefined && method.type === MFA_METHOD_TYPE.EMAIL)) {
    throw authError(ERROR_BODY.INVALID_VALUE, [is_default === false ? "is_default" : "label"]);
  }

  if (is_default === true && !method.confirmed) {
    throw authError(ERROR_BODY.MFA_METHOD_NOT_CONFIRMED, [methodId]);
  }

  if (label !== undefined) {
    method.label = label;
  }

  if (is_default === true) {
    for (const other of user.methods) {
      other.is_default = other === method;
    }
  }

  return toMethodDetails(method);
};

const isMfaEnforcedFor = (user: UserMfa) => user.mfaEnforced || findMfaEnforcingOrganizations().length > 0;

export const deleteMfaMethodMock = async (
  { methodId, ...params }: Parameters<DeleteMfaMethod>[0],
  scenario: SecurityScenario = DEFAULT_SECURITY_SCENARIO
): ReturnType<DeleteMfaMethod> => {
  const user = loadSignedInUser(params, scenario);
  const method = findMethod(user, methodId);
  const otherConfirmed = user.methods.filter((other) => other !== method && other.confirmed);

  if (method.confirmed && otherConfirmed.length === 0 && isMfaEnforcedFor(user)) {
    throw authError(ERROR_BODY.LAST_MFA_METHOD_ENFORCED);
  }

  user.methods = user.methods.filter((other) => other !== method);

  // The oldest remaining confirmed method takes over as the default.
  const [successor] = [...otherConfirmed].sort((a, b) => a.created_at - b.created_at);

  if (method.is_default && successor) {
    successor.is_default = true;
  }
};

export const resetMfaMock = async (
  params: Parameters<ResetMfa>[0],
  scenario: SecurityScenario = DEFAULT_SECURITY_SCENARIO
): ReturnType<ResetMfa> => {
  const user = loadSignedInUser(params, scenario);

  user.methods = [];
};
