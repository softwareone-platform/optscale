import type { MfaMethod, MfaMethodType } from "@theme/api/auth/mfaMethod";
import type { AuthToken } from "@theme/api/auth/signIn";
import { ObjectValues } from "utils/types";
import { MFA_STATUS } from "./constants";

export type MfaStatusValue = ObjectValues<typeof MFA_STATUS>;

/** Snake_case throughout: these types describe the auth service payloads verbatim. */
export type MfaMethodDetails = MfaMethod & {
  user_id: string;
  /** `0` while pending. */
  confirmed_at: number;
  created_at: number;
  deleted_at: number;
};

/** A started enrollment, pending until confirmed. Only a `totp` one carries the secret — in this response only. */
export type MfaEnrollment = MfaMethodDetails & {
  secret?: string;
  otpauth_uri?: string;
};

export type MfaStatus = {
  methods: MfaMethodDetails[];
  mfa_enforced: boolean;
  enforcing_organizations: string[];
  status: MfaStatusValue;
};

/** Every methods endpoint acts on one user, as that user. */
type SignedInUserParams = {
  token: string;
  userId: string;
};

type MethodParams = SignedInUserParams & {
  methodId: string;
};

export type GetMfaStatus = (params: SignedInUserParams) => Promise<MfaStatus>;

export type StartMfaEnrollmentParams = SignedInUserParams & {
  type: MfaMethodType;
  label?: string;
};

export type StartMfaEnrollment = (params: StartMfaEnrollmentParams) => Promise<MfaEnrollment>;

export type ConfirmMfaEnrollmentParams = MethodParams & {
  code: string;
};

export type ConfirmMfaEnrollment = (params: ConfirmMfaEnrollmentParams) => Promise<MfaMethodDetails>;

export type UpdateMfaMethodParams = MethodParams & {
  is_default?: boolean;
  label?: string;
};

export type UpdateMfaMethod = (params: UpdateMfaMethodParams) => Promise<MfaMethodDetails>;

export type DeleteMfaMethod = (params: MethodParams) => Promise<void>;

export type ResetMfa = (params: SignedInUserParams) => Promise<void>;

/**
 * Enrolling the first method while signing in: the same routes, authorized by the `enrollment_required` challenge in
 * the body instead of a token, which does not exist yet.
 */
type ChallengeParams = {
  userId: string;
  challengeId: string;
};

export type StartChallengeEnrollmentParams = ChallengeParams & {
  type: MfaMethodType;
  label?: string;
};

export type StartChallengeEnrollment = (params: StartChallengeEnrollmentParams) => Promise<MfaEnrollment>;

export type ConfirmChallengeEnrollmentParams = ChallengeParams & {
  methodId: string;
  code: string;
};

/** The confirmed method, and the token the challenge was holding back until a second factor existed. */
export type ChallengeEnrollmentResult = {
  method: MfaMethodDetails;
  token: AuthToken;
};

export type ConfirmChallengeEnrollment = (params: ConfirmChallengeEnrollmentParams) => Promise<ChallengeEnrollmentResult>;
