import { describe, expect, it } from "vitest";
import { SECURITY_SCENARIO } from "@theme/api/mocked/auth/mfaMethods/scenarios";
import { SIGN_IN_SCENARIO } from "@theme/api/mocked/auth/signIn/scenarios";
import { getFittingSecurityScenario } from "./scenarioLinks";

describe("getFittingSecurityScenario", () => {
  it("keeps the picked state while it fits the sign-in scenario", () => {
    expect(getFittingSecurityScenario(SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT, SECURITY_SCENARIO.TOTP_ONLY)).toBe(
      SECURITY_SCENARIO.TOTP_ONLY
    );
  });

  it("moves to the first fitting state when it does not — no methods for a user MFA just verified", () => {
    expect(getFittingSecurityScenario(SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT, SECURITY_SCENARIO.NO_METHODS)).toBe(
      SECURITY_SCENARIO.TOTP_AND_EMAIL
    );
  });

  it("keeps whatever was picked while the picker is hidden, so going back restores it", () => {
    expect(getFittingSecurityScenario(SIGN_IN_SCENARIO.REAL_SIGN_IN, SECURITY_SCENARIO.NO_METHODS)).toBe(
      SECURITY_SCENARIO.NO_METHODS
    );
  });
});
