import { describe, expect, it } from "vitest";
import { AUTH_ERROR_CODE, AuthApiError } from "api/auth/errors";
import { getPasswordSignInErrorMessageId } from "./passwordSignInError";

const authError = (status: number, errorCode: string) => new AuthApiError({ status, errorCode, reason: "" });

describe("getPasswordSignInErrorMessageId", () => {
  it.each([
    ["a wrong password", authError(403, AUTH_ERROR_CODE.INVALID_CREDENTIALS), "signIn:invalidCredentials"],
    [
      "the user's lockout after 10 wrong codes",
      authError(403, AUTH_ERROR_CODE.TOO_MANY_FAILED_ATTEMPTS),
      "signIn:challengeTooManyFailedAttempts"
    ],
    ["a server error", authError(500, AUTH_ERROR_CODE.INTERNAL_ERROR), "somethingWentWrong"],
    ["a network failure", new TypeError("Failed to fetch"), "somethingWentWrong"]
  ])("says what went wrong for %s", (_, error, messageId) => {
    expect(getPasswordSignInErrorMessageId(error)).toBe(messageId);
  });
});
