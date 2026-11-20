import { describe, expect, it } from "vitest";
import { AUTH_ERROR_CODE } from "@theme/api/auth/errors";
import { MFA_METHOD_TYPE } from "@theme/api/auth/mfaMethod";
import { MFA_STATUS } from "@theme/api/auth/mfaMethods/constants";
import { ERROR_BODY as POLICY_ERROR_BODY } from "@theme/api/mocked/auth/authPolicies/fixtures";
import { CONFIRMED_WITH_TOKEN_BODY, ENROLLMENT_BODY, ERROR_BODY, STATUS_BODY } from "./fixtures";

// `tsc` checks that every response file has the contract's keys; these check the values JSON cannot type.
describe("the MFA methods and policy JSON responses", () => {
  it("confirms, under a challenge, a method of a type the contract knows", () => {
    expect(Object.values(MFA_METHOD_TYPE)).toContain(CONFIRMED_WITH_TOKEN_BODY.method.type);
  });

  it.each(Object.entries(STATUS_BODY))("%s uses only statuses and method types the contract knows", (_, body) => {
    expect(Object.values(MFA_STATUS)).toContain(body.status);
    expect(Object.values(MFA_METHOD_TYPE)).toEqual(expect.arrayContaining(body.methods.map(({ type }) => type)));
  });

  it.each(Object.entries(ENROLLMENT_BODY))("the %s enrollment is of its own type and still pending", (type, body) => {
    expect(body).toMatchObject({ type, confirmed: false, is_default: false });
  });

  it.each([...Object.entries(ERROR_BODY), ...Object.entries(POLICY_ERROR_BODY)])(
    "%s carries the code AUTH_ERROR_CODE names it by",
    (name, body) => {
      expect(body.error.error_code).toBe(AUTH_ERROR_CODE[name as keyof typeof AUTH_ERROR_CODE]);
    }
  );
});
