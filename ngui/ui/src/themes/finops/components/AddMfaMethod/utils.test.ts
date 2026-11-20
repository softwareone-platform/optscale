import { describe, expect, it } from "vitest";
import { AUTH_ERROR_CODE, AuthApiError } from "@theme/api/auth/errors";
import { ENROLLMENT_FAILURE } from "./constants";
import { getEnrollmentFailure } from "./utils";

const authError = (status: number, errorCode: string) => new AuthApiError({ status, errorCode, reason: "" });

describe("getEnrollmentFailure", () => {
  it.each([
    [403, AUTH_ERROR_CODE.INVALID_AUTHENTICATION_CODE, ENROLLMENT_FAILURE.INVALID_CODE],
    [403, AUTH_ERROR_CODE.INVALID_MFA_CODE, ENROLLMENT_FAILURE.INVALID_CODE],
    [409, AUTH_ERROR_CODE.MFA_METHOD_EXISTS, ENROLLMENT_FAILURE.ALREADY_SET_UP],
    [409, AUTH_ERROR_CODE.MFA_METHOD_ALREADY_CONFIRMED, ENROLLMENT_FAILURE.ALREADY_SET_UP],
    [403, AUTH_ERROR_CODE.CODE_REQUESTED_TOO_SOON, ENROLLMENT_FAILURE.CODE_REQUESTED_TOO_SOON],
    [503, AUTH_ERROR_CODE.SERVICE_UNAVAILABLE, ENROLLMENT_FAILURE.EMAIL_UNAVAILABLE],
    [404, AUTH_ERROR_CODE.NOT_FOUND, ENROLLMENT_FAILURE.EXPIRED],
    [500, AUTH_ERROR_CODE.INTERNAL_ERROR, ENROLLMENT_FAILURE.UNEXPECTED]
  ])("sorts %i %s as %s", (status, errorCode, failure) => {
    expect(getEnrollmentFailure(authError(status, errorCode))).toBe(failure);
  });

  it("treats any 404 as an expired setup, whatever its code", () => {
    expect(getEnrollmentFailure(authError(404, ""))).toBe(ENROLLMENT_FAILURE.EXPIRED);
  });

  it("treats a network failure as unexpected", () => {
    expect(getEnrollmentFailure(new TypeError("Failed to fetch"))).toBe(ENROLLMENT_FAILURE.UNEXPECTED);
  });
});
