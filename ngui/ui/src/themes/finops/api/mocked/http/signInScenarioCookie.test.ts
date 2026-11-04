import { afterEach, describe, expect, it } from "vitest";
import { DEFAULT_SIGN_IN_SCENARIO, SIGN_IN_SCENARIO } from "@theme/api/mocked/auth/signIn/scenarios";
import { SIGN_IN_SCENARIO_COOKIE } from "@theme/api/mocked/config";
import { readSignInScenarioCookie, writeSignInScenarioCookie } from "./signInScenarioCookie";

const clearCookie = () => {
  document.cookie = `${SIGN_IN_SCENARIO_COOKIE}=; path=/; max-age=0`;
};

describe("readSignInScenarioCookie", () => {
  it("finds the scenario among other cookies", () => {
    expect(readSignInScenarioCookie(`a=1; ${SIGN_IN_SCENARIO_COOKIE}=${SIGN_IN_SCENARIO.MFA_NO_DEFAULT}; b=2`)).toBe(
      SIGN_IN_SCENARIO.MFA_NO_DEFAULT
    );
  });

  it("falls back to the default when the cookie is missing", () => {
    expect(readSignInScenarioCookie("a=1")).toBe(DEFAULT_SIGN_IN_SCENARIO);
  });

  it("falls back to the default for a value that is not a known scenario", () => {
    expect(readSignInScenarioCookie(`${SIGN_IN_SCENARIO_COOKIE}=renamed_long_ago`)).toBe(DEFAULT_SIGN_IN_SCENARIO);
  });
});

describe("writeSignInScenarioCookie", () => {
  afterEach(clearCookie);

  it("stores a scenario the reader gets back from document.cookie", () => {
    writeSignInScenarioCookie(SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT);

    expect(readSignInScenarioCookie(document.cookie)).toBe(SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT);
  });
});
