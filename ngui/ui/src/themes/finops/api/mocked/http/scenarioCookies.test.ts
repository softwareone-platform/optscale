import { afterEach, describe, expect, it } from "vitest";
import { DEFAULT_SECURITY_SCENARIO, SECURITY_SCENARIO } from "@theme/api/mocked/auth/mfaMethods/scenarios";
import { DEFAULT_SIGN_IN_SCENARIO, SIGN_IN_SCENARIO } from "@theme/api/mocked/auth/signIn/scenarios";
import { SECURITY_SCENARIO_COOKIE, SIGN_IN_SCENARIO_COOKIE } from "@theme/api/mocked/config";
import {
  readSecurityScenarioCookie,
  readSignInScenarioCookie,
  writeSecurityScenarioCookie,
  writeSignInScenarioCookie
} from "./scenarioCookies";

const clearCookies = () => {
  [SIGN_IN_SCENARIO_COOKIE, SECURITY_SCENARIO_COOKIE].forEach((name) => {
    document.cookie = `${name}=; path=/; max-age=0`;
  });
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

describe("readSecurityScenarioCookie", () => {
  it("reads its own cookie, not the sign-in one beside it", () => {
    const cookieHeader = `${SIGN_IN_SCENARIO_COOKIE}=${SIGN_IN_SCENARIO.MFA_NO_DEFAULT}; ${SECURITY_SCENARIO_COOKIE}=${SECURITY_SCENARIO.TOTP_ONLY}`;

    expect(readSecurityScenarioCookie(cookieHeader)).toBe(SECURITY_SCENARIO.TOTP_ONLY);
  });

  it("falls back to the default for a value that is not a known scenario", () => {
    expect(readSecurityScenarioCookie(`${SECURITY_SCENARIO_COOKIE}=${SIGN_IN_SCENARIO.MFA_NO_DEFAULT}`)).toBe(
      DEFAULT_SECURITY_SCENARIO
    );
  });
});

describe("writing a scenario cookie", () => {
  afterEach(clearCookies);

  it("stores each scenario where its reader gets it back from document.cookie", () => {
    writeSignInScenarioCookie(SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT);
    writeSecurityScenarioCookie(SECURITY_SCENARIO.ENFORCED_NO_METHODS);

    expect(readSignInScenarioCookie(document.cookie)).toBe(SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT);
    expect(readSecurityScenarioCookie(document.cookie)).toBe(SECURITY_SCENARIO.ENFORCED_NO_METHODS);
  });
});
