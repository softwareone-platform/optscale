import { describe, expect, it } from "vitest";
import { AUTH_ERROR_CODE, AuthApiError } from "../errors";
import { MFA_VERIFICATION_FAILURE } from "./constants";
import { getAttemptsLeft, getMfaVerificationFailure, isEmailNotVerifiedError, isInvalidCredentialsError } from "./errors";

const authError = (errorCode: string) => new AuthApiError({ status: 403, errorCode, reason: "nope" });

describe("AuthApiError", () => {
  it("keeps the reason as the message, so an unhandled rejection still reads sensibly", () => {
    expect(authError(AUTH_ERROR_CODE.INVALID_CREDENTIALS).message).toBe("nope");
  });
});

describe("the error predicates", () => {
  it("tell the two sign-in failures apart", () => {
    const invalidCredentials = authError(AUTH_ERROR_CODE.INVALID_CREDENTIALS);
    const emailNotVerified = authError(AUTH_ERROR_CODE.EMAIL_NOT_VERIFIED);

    expect([isInvalidCredentialsError(invalidCredentials), isEmailNotVerifiedError(invalidCredentials)]).toEqual([true, false]);
    expect([isInvalidCredentialsError(emailNotVerified), isEmailNotVerifiedError(emailNotVerified)]).toEqual([false, true]);
  });

  it("does not match an error code the predicate is not about", () => {
    const internalError = authError(AUTH_ERROR_CODE.INTERNAL_ERROR);

    expect(isInvalidCredentialsError(internalError)).toBe(false);
    expect(isEmailNotVerifiedError(internalError)).toBe(false);
  });

  /**
   * A dropped connection rejects with a TypeError, not an AuthApiError. Matching it would send
   * the visitor to /email-verification on a network outage.
   */
  it.each([
    ["a transport failure", new TypeError("Failed to fetch")],
    ["a plain object that looks the part", { errorCode: AUTH_ERROR_CODE.EMAIL_NOT_VERIFIED }],
    ["nothing at all", undefined],
  ])("refuses to match %s", (_, thrown) => {
    expect(isInvalidCredentialsError(thrown)).toBe(false);
    expect(isEmailNotVerifiedError(thrown)).toBe(false);
  });
});

describe("getMfaVerificationFailure", () => {
  it("reads a wrong code as retryable, with the attempts the service says are left", () => {
    const error = new AuthApiError({ status: 403, errorCode: AUTH_ERROR_CODE.INVALID_MFA_CODE, reason: "nope", params: [3] });

    expect(getMfaVerificationFailure(error)).toEqual({ kind: MFA_VERIFICATION_FAILURE.INVALID_CODE, attemptsLeft: 3 });
  });

  it("keeps a wrong code retryable when the attempts count is missing or unreadable", () => {
    const error = new AuthApiError({ status: 403, errorCode: AUTH_ERROR_CODE.INVALID_MFA_CODE, reason: "nope", params: ["x"] });

    expect(getMfaVerificationFailure(error)).toEqual({ kind: MFA_VERIFICATION_FAILURE.INVALID_CODE, attemptsLeft: null });
  });

  it("reads the last wrong code as a locked challenge", () => {
    const error = new AuthApiError({ status: 403, errorCode: AUTH_ERROR_CODE.MFA_ATTEMPTS_EXCEEDED, reason: "nope" });

    expect(getMfaVerificationFailure(error).kind).toBe(MFA_VERIFICATION_FAILURE.CHALLENGE_LOCKED);
  });

  it("reads the user's limit of wrong codes across challenges as terminal", () => {
    expect(getMfaVerificationFailure(authError(AUTH_ERROR_CODE.TOO_MANY_FAILED_ATTEMPTS)).kind).toBe(
      MFA_VERIFICATION_FAILURE.TOO_MANY_FAILED_ATTEMPTS
    );
  });

  it("reads any 404 as an expired challenge, whatever code it carries", () => {
    const error = new AuthApiError({ status: 404, errorCode: "OA0053", reason: "Not found" });

    expect(getMfaVerificationFailure(error).kind).toBe(MFA_VERIFICATION_FAILURE.CHALLENGE_EXPIRED);
  });

  it("reads a 404 for the method, not the challenge, as a method removed meanwhile", () => {
    const error = new AuthApiError({ status: 404, errorCode: AUTH_ERROR_CODE.NOT_FOUND, reason: "MFAMethod not found" });

    expect(getMfaVerificationFailure(error).kind).toBe(MFA_VERIFICATION_FAILURE.MFA_METHOD_REMOVED);
  });

  it("does not call a network failure or an unknown 403 terminal", () => {
    expect(getMfaVerificationFailure(new TypeError("Failed to fetch")).kind).toBe(MFA_VERIFICATION_FAILURE.UNEXPECTED);
    expect(getMfaVerificationFailure(authError(AUTH_ERROR_CODE.INVALID_CREDENTIALS)).kind).toBe(
      MFA_VERIFICATION_FAILURE.UNEXPECTED
    );
  });
});

describe("getAttemptsLeft", () => {
  it("reads the count a wrong code under a challenge carries", () => {
    const error = new AuthApiError({ status: 403, errorCode: AUTH_ERROR_CODE.INVALID_MFA_CODE, reason: "nope", params: [4] });

    expect(getAttemptsLeft(error)).toBe(4);
  });

  it.each([
    ["a wrong code without a challenge, which counts nothing", authError(AUTH_ERROR_CODE.INVALID_AUTHENTICATION_CODE)],
    ["a wrong code under a challenge without a count", authError(AUTH_ERROR_CODE.INVALID_MFA_CODE)],
    ["a transport failure", new TypeError("Failed to fetch")],
  ])("has no count for %s", (_, error) => {
    expect(getAttemptsLeft(error)).toBeNull();
  });
});
