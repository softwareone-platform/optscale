import { describe, expect, it } from "vitest";
import { MfaMethod } from "@theme/api/auth/mfaMethod";
import { EMAIL_METHOD, TOTP_METHOD } from "@theme/tests/signInFixtures";
import { MFA_CHALLENGE_VIEW } from "./constants";
import { getMfaChallengeStage, getPreselectedMethod, getSelectableMethods } from "./utils";

const pendingTotpMethod: MfaMethod = { ...TOTP_METHOD, id: "c3f5", is_default: false, confirmed: false };

describe("getSelectableMethods", () => {
  it("leaves out methods whose enrollment was never confirmed", () => {
    expect(getSelectableMethods({ methods: [TOTP_METHOD, pendingTotpMethod, EMAIL_METHOD] })).toEqual([
      TOTP_METHOD,
      EMAIL_METHOD
    ]);
  });
});

describe("getPreselectedMethod", () => {
  it("preselects the method named by default_method_id", () => {
    expect(getPreselectedMethod({ methods: [EMAIL_METHOD, TOTP_METHOD], default_method_id: EMAIL_METHOD.id })).toBe(
      EMAIL_METHOD
    );
  });

  it("asks the visitor to pick when there is no default and several methods", () => {
    expect(getPreselectedMethod({ methods: [TOTP_METHOD, EMAIL_METHOD], default_method_id: null })).toBeNull();
  });

  it("does not preselect a default that was never confirmed", () => {
    expect(
      getPreselectedMethod({ methods: [pendingTotpMethod, TOTP_METHOD, EMAIL_METHOD], default_method_id: pendingTotpMethod.id })
    ).toBeNull();
  });

  it("preselects the only selectable method when there is no default", () => {
    expect(getPreselectedMethod({ methods: [pendingTotpMethod, EMAIL_METHOD], default_method_id: null })).toBe(EMAIL_METHOD);
  });
});

describe("getMfaChallengeStage", () => {
  const challenge = { methods: [TOTP_METHOD, EMAIL_METHOD], default_method_id: TOTP_METHOD.id };

  it("is the code entry for the selected method", () => {
    expect(getMfaChallengeStage(challenge, { selectedMethodId: TOTP_METHOD.id, isPickingMethod: false })).toEqual({
      view: MFA_CHALLENGE_VIEW.CODE_ENTRY,
      method: TOTP_METHOD
    });
  });

  it("is the picker while the visitor is choosing, or when nothing is selected", () => {
    expect(getMfaChallengeStage(challenge, { selectedMethodId: TOTP_METHOD.id, isPickingMethod: true }).view).toBe(
      MFA_CHALLENGE_VIEW.METHOD_PICKER
    );
    expect(getMfaChallengeStage(challenge, { selectedMethodId: null, isPickingMethod: false }).view).toBe(
      MFA_CHALLENGE_VIEW.METHOD_PICKER
    );
  });

  it("is the dead end when no method is confirmed, whatever was selected", () => {
    expect(
      getMfaChallengeStage({ ...challenge, methods: [pendingTotpMethod] }, { selectedMethodId: null, isPickingMethod: false })
        .view
    ).toBe(MFA_CHALLENGE_VIEW.NO_SELECTABLE_METHODS);
  });
});
