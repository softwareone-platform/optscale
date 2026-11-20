import type { MfaMethodType } from "api/auth/mfaMethod";
import type { MfaEnrollment, MfaMethodDetails } from "api/auth/mfaMethods";
import { ObjectValues } from "utils/types";
import { ADD_MFA_METHOD_STEP, ENROLLMENT_FAILURE } from "./constants";

export type AddMfaMethodStep = ObjectValues<typeof ADD_MFA_METHOD_STEP>;

export type EnrollmentFailure = ObjectValues<typeof ENROLLMENT_FAILURE>;

/**
 * How the dialog reaches the auth service. The Security page passes the signed-in user's calls
 * (`useSignedInMfaEnrollment`); the enforced setup will pass ones that go through the login challenge.
 */
export type MfaEnrollmentCalls = {
  start: (type: MfaMethodType) => Promise<MfaEnrollment>;
  confirm: (params: { methodId: string; code: string }) => Promise<MfaMethodDetails>;
};
