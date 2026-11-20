import { describe, expect, it } from "vitest";
import { MfaMethod } from "@theme/api/auth/signIn";
import { MFA_CHALLENGE_VIEW } from "./constants";
import { emailMethod, totpMethod } from "./fixtures";
import {
  formatCountdown,
  getMfaChallengeStage,
  getPreselectedMethod,
  getSelectableMethods,
  isEmailCodeAlreadySent
} from "./utils";

const pendingTotpMethod: MfaMethod = { ...totpMethod, id: "c3f5", is_default: false, confirmed: false };

describe("getSelectableMethods", () => {
  it("leaves out methods whose enrollment was never confirmed", () => {
    expect(getSelectableMethods({ methods: [totpMethod, pendingTotpMethod, emailMethod] })).toEqual([totpMethod, emailMethod]);
  });
});

describe("getPreselectedMethod", () => {
  it("preselects the method named by default_method_id", () => {
    expect(getPreselectedMethod({ methods: [emailMethod, totpMethod], default_method_id: emailMethod.id })).toBe(emailMethod);
  });

  it("asks the visitor to pick when there is no default and several methods", () => {
    expect(getPreselectedMethod({ methods: [totpMethod, emailMethod], default_method_id: null })).toBeNull();
  });

  it("does not preselect a default that was never confirmed", () => {
    expect(
      getPreselectedMethod({ methods: [pendingTotpMethod, totpMethod, emailMethod], default_method_id: pendingTotpMethod.id })
    ).toBeNull();
  });

  it("preselects the only selectable method when there is no default", () => {
    expect(getPreselectedMethod({ methods: [pendingTotpMethod, emailMethod], default_method_id: null })).toBe(emailMethod);
  });
});

describe("isEmailCodeAlreadySent", () => {
  it("is true for the default email method when the challenge says a code went out", () => {
    expect(isEmailCodeAlreadySent({ code_sent: true, default_method_id: emailMethod.id }, emailMethod)).toBe(true);
  });

  it("is false for an email method that is not the default, because code_sent describes the default only", () => {
    expect(isEmailCodeAlreadySent({ code_sent: true, default_method_id: "another-email" }, emailMethod)).toBe(false);
  });

  it("is false for an authenticator app, which is never sent anything", () => {
    expect(isEmailCodeAlreadySent({ code_sent: true, default_method_id: totpMethod.id }, totpMethod)).toBe(false);
  });
});

describe("getMfaChallengeStage", () => {
  const challenge = { methods: [totpMethod, emailMethod], code_sent: false, default_method_id: totpMethod.id };

  it("is the code entry for the selected method", () => {
    expect(getMfaChallengeStage(challenge, { selectedMethodId: totpMethod.id, isPickingMethod: false })).toEqual({
      view: MFA_CHALLENGE_VIEW.CODE_ENTRY,
      method: totpMethod,
      isEmailCodeSent: false
    });
  });

  it("is the picker while the visitor is choosing, or when nothing is selected", () => {
    expect(getMfaChallengeStage(challenge, { selectedMethodId: totpMethod.id, isPickingMethod: true }).view).toBe(
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

describe("formatCountdown", () => {
  it("reads as minutes and zero-padded seconds", () => {
    expect([formatCountdown(300), formatCountdown(65), formatCountdown(9)]).toEqual(["5:00", "1:05", "0:09"]);
  });
});
