import { describe, expect, it } from "vitest";
import { AUTH_ERROR_CODE } from "./constants";
import { AuthApiError, isEmailNotVerifiedError, isInvalidCredentialsError } from "./errors";

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
    ["nothing at all", undefined]
  ])("refuses to match %s", (_, thrown) => {
    expect(isInvalidCredentialsError(thrown)).toBe(false);
    expect(isEmailNotVerifiedError(thrown)).toBe(false);
  });
});
