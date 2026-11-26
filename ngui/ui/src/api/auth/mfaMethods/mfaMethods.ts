import { requestAuth } from "../request";
import {
  ChallengeEnrollmentResult,
  ConfirmChallengeEnrollment,
  ConfirmMfaEnrollment,
  DeleteMfaMethod,
  GetMfaStatus,
  MfaEnrollment,
  MfaMethodDetails,
  MfaStatus,
  ResetMfa,
  StartChallengeEnrollment,
  StartMfaEnrollment,
  UpdateMfaMethod,
} from "./types";

/**
 * `/auth/v2/users/{user_id}/mfa_methods` — the user's own MFA methods, as that user. Starting and confirming an
 * enrollment also take an `enrollment_required` sign-in challenge instead of a token.
 */

const methodsPath = (userId: string) => `/users/${encodeURIComponent(userId)}/mfa_methods`;

const methodPath = (userId: string, methodId: string) => `${methodsPath(userId)}/${encodeURIComponent(methodId)}`;

export const getMfaStatus: GetMfaStatus = async ({ token, userId }) => {
  const { data } = await requestAuth<MfaStatus>(methodsPath(userId), { method: "GET", token });

  return data;
};

/** `201`, pending. For `totp` the response holds the secret and `otpauth_uri`; for `email` the code is sent. */
export const startMfaEnrollment: StartMfaEnrollment = async ({ token, userId, type, label }) => {
  const { data } = await requestAuth<MfaEnrollment>(methodsPath(userId), { body: { type, label }, token });

  return data;
};

/** `200`, confirmed; the first confirmed method becomes the default. */
export const confirmMfaEnrollment: ConfirmMfaEnrollment = async ({ token, userId, methodId, code }) => {
  const { data } = await requestAuth<MfaMethodDetails>(`${methodPath(userId, methodId)}/confirm`, { body: { code }, token });

  return data;
};

/** As `startMfaEnrollment`, under a sign-in challenge. */
export const startChallengeEnrollment: StartChallengeEnrollment = async ({ userId, challengeId, type, label }) => {
  const { data } = await requestAuth<MfaEnrollment>(methodsPath(userId), { body: { type, label, challenge_id: challengeId } });

  return data;
};

/** `201 {method, token}`: confirming consumes the challenge and finishes the sign-in. */
export const confirmChallengeEnrollment: ConfirmChallengeEnrollment = async ({ userId, challengeId, methodId, code }) => {
  const { data } = await requestAuth<ChallengeEnrollmentResult>(`${methodPath(userId, methodId)}/confirm`, {
    body: { code, challenge_id: challengeId },
  });

  return data;
};

export const updateMfaMethod: UpdateMfaMethod = async ({ token, userId, methodId, is_default, label }) => {
  const { data } = await requestAuth<MfaMethodDetails>(methodPath(userId, methodId), {
    method: "PATCH",
    body: { is_default, label },
    token,
  });

  return data;
};

export const deleteMfaMethod: DeleteMfaMethod = async ({ token, userId, methodId }) => {
  await requestAuth(methodPath(userId, methodId), { method: "DELETE", token });
};

/** Removes every method of the user and signs them out everywhere. */
export const resetMfa: ResetMfa = async ({ token, userId }) => {
  await requestAuth(methodsPath(userId), { method: "DELETE", token });
};
