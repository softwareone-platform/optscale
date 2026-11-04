import { describe, expect, it } from "vitest";
import { CHALLENGE_BODY } from "@theme/api/mocked/auth/signIn/fixtures";
import { MFA_CHALLENGE_VIEW } from "@theme/components/MfaChallengeStep";
import { MFA_CHALLENGE } from "@theme/urls";
import { describeMfaChallengeStage, describeRoute } from "./describeStage";

const [totpMethod, emailMethod] = CHALLENGE_BODY.MFA_TOTP_DEFAULT.methods;

describe("describeRoute", () => {
  it("names the sign-in routes", () => {
    expect(describeRoute(MFA_CHALLENGE)).toBe("MFA challenge");
  });

  it("falls back to the path for any other page", () => {
    expect(describeRoute("/password-recovery")).toBe("/password-recovery");
  });
});

describe("describeMfaChallengeStage", () => {
  it("names the picker", () => {
    expect(describeMfaChallengeStage({ view: MFA_CHALLENGE_VIEW.METHOD_PICKER })).toBe("MfaMethodPicker — choosing a method");
  });

  it("says which method the code entry is for and whether it is the default", () => {
    expect(describeMfaChallengeStage({ view: MFA_CHALLENGE_VIEW.CODE_ENTRY, method: totpMethod, isEmailCodeSent: false })).toBe(
      "MfaCodeEntry — authenticator app (TOTP) · default method"
    );
  });

  it("says whether the e-mail code went out", () => {
    expect(
      describeMfaChallengeStage({ view: MFA_CHALLENGE_VIEW.CODE_ENTRY, method: emailMethod, isEmailCodeSent: false })
    ).toBe("MfaCodeEntry — e-mail, code not sent");
  });
});
