import { describe, expect, it } from "vitest";
import { AUTH_ERROR_CODE, LOGIN_CHALLENGE_STATE, LOGIN_METHOD, MFA_METHOD_TYPE } from "@theme/api/auth/signIn/constants";
import { CHALLENGE_BODY, ERROR_BODY, LOGIN_OPTIONS_BODY } from "./fixtures";

// `tsc` checks that every response file has the contract's keys; these check the values JSON cannot type.
describe("the JSON responses", () => {
  it.each(Object.entries(CHALLENGE_BODY))("%s uses only states and method types the contract knows", (_, body) => {
    expect(Object.values(LOGIN_CHALLENGE_STATE)).toContain(body.state);
    expect(Object.values(MFA_METHOD_TYPE)).toEqual(expect.arrayContaining(body.methods.map(({ type }) => type)));
  });

  it("offers only login methods the contract knows", () => {
    expect(Object.values(LOGIN_METHOD)).toEqual(expect.arrayContaining(LOGIN_OPTIONS_BODY.methods));
  });

  it.each(Object.entries(ERROR_BODY))("%s carries the code AUTH_ERROR_CODE names it by", (name, body) => {
    expect(body.error.error_code).toBe(AUTH_ERROR_CODE[name as keyof typeof AUTH_ERROR_CODE]);
  });
});
