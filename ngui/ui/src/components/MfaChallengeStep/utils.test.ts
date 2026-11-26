import { describe, expect, it } from "vitest";
import { MfaMethod } from "api/auth/mfaMethod";
import { EMAIL_METHOD, TOTP_METHOD } from "tests/signInFixtures";
import { MFA_CHALLENGE_VIEW } from "./constants";
import { getMfaChallengeStage, getPreselectedMethod, getSelectableMethods } from "./utils";

const pendingTotpMethod: MfaMethod = { ...TOTP_METHOD, id: "c3f5", is_default: false, confirmed: false };

const WITH_CODE_REQUESTS = { canRequestEmailCode: true };
const WITHOUT_CODE_REQUESTS = { canRequestEmailCode: false };

describe("getSelectableMethods", () => {
  it("leaves out methods whose enrollment was never confirmed", () => {
    expect(
      getSelectableMethods(
        { methods: [TOTP_METHOD, pendingTotpMethod, EMAIL_METHOD], default_method_id: TOTP_METHOD.id },
        WITH_CODE_REQUESTS
      )
    ).toEqual([TOTP_METHOD, EMAIL_METHOD]);
  });

  it("leaves out an e-mail method that is not the default when no code can be requested", () => {
    expect(
      getSelectableMethods({ methods: [TOTP_METHOD, EMAIL_METHOD], default_method_id: TOTP_METHOD.id }, WITHOUT_CODE_REQUESTS)
    ).toEqual([TOTP_METHOD]);
  });

  it("keeps the default e-mail method when no code can be requested", () => {
    expect(
      getSelectableMethods({ methods: [TOTP_METHOD, EMAIL_METHOD], default_method_id: EMAIL_METHOD.id }, WITHOUT_CODE_REQUESTS)
    ).toEqual([TOTP_METHOD, EMAIL_METHOD]);
  });

  it("offers several authenticator apps as one, the default among them", () => {
    const firstApp: MfaMethod = { ...TOTP_METHOD, id: "c3f6", is_default: false };

    expect(
      getSelectableMethods(
        { methods: [firstApp, TOTP_METHOD, EMAIL_METHOD], default_method_id: TOTP_METHOD.id },
        WITH_CODE_REQUESTS
      )
    ).toEqual([TOTP_METHOD, EMAIL_METHOD]);
  });

  it("offers several authenticator apps as the first of them when none is the default", () => {
    const secondApp: MfaMethod = { ...TOTP_METHOD, id: "c3f6", is_default: false };

    expect(
      getSelectableMethods(
        { methods: [TOTP_METHOD, secondApp, EMAIL_METHOD], default_method_id: EMAIL_METHOD.id },
        WITH_CODE_REQUESTS
      )
    ).toEqual([TOTP_METHOD, EMAIL_METHOD]);
  });
});

describe("getPreselectedMethod", () => {
  it("preselects the method named by default_method_id", () => {
    expect(
      getPreselectedMethod({ methods: [EMAIL_METHOD, TOTP_METHOD], default_method_id: EMAIL_METHOD.id }, WITH_CODE_REQUESTS)
    ).toBe(EMAIL_METHOD);
  });

  it("asks the visitor to pick when there is no default and several methods", () => {
    expect(
      getPreselectedMethod({ methods: [TOTP_METHOD, EMAIL_METHOD], default_method_id: null }, WITH_CODE_REQUESTS)
    ).toBeNull();
  });

  it("does not preselect a default that was never confirmed", () => {
    expect(
      getPreselectedMethod(
        { methods: [pendingTotpMethod, TOTP_METHOD, EMAIL_METHOD], default_method_id: pendingTotpMethod.id },
        WITH_CODE_REQUESTS
      )
    ).toBeNull();
  });

  it("preselects the only selectable method when there is no default", () => {
    expect(
      getPreselectedMethod({ methods: [pendingTotpMethod, EMAIL_METHOD], default_method_id: null }, WITH_CODE_REQUESTS)
    ).toBe(EMAIL_METHOD);
  });

  it("preselects the authenticator app when the e-mail method beside it cannot get a code", () => {
    expect(getPreselectedMethod({ methods: [TOTP_METHOD, EMAIL_METHOD], default_method_id: null }, WITHOUT_CODE_REQUESTS)).toBe(
      TOTP_METHOD
    );
  });
});

describe("getMfaChallengeStage", () => {
  const challenge = { methods: [TOTP_METHOD, EMAIL_METHOD], default_method_id: TOTP_METHOD.id };

  it("is the code entry for the selected method", () => {
    expect(
      getMfaChallengeStage(challenge, { selectedMethodId: TOTP_METHOD.id, isPickingMethod: false, ...WITH_CODE_REQUESTS })
    ).toEqual({
      view: MFA_CHALLENGE_VIEW.CODE_ENTRY,
      method: TOTP_METHOD,
    });
  });

  it("is the picker while the visitor is choosing, or when nothing is selected", () => {
    expect(
      getMfaChallengeStage(challenge, { selectedMethodId: TOTP_METHOD.id, isPickingMethod: true, ...WITH_CODE_REQUESTS }).view
    ).toBe(MFA_CHALLENGE_VIEW.METHOD_PICKER);
    expect(
      getMfaChallengeStage(challenge, { selectedMethodId: null, isPickingMethod: false, ...WITH_CODE_REQUESTS }).view
    ).toBe(MFA_CHALLENGE_VIEW.METHOD_PICKER);
  });

  it("is the dead end when no method is confirmed, whatever was selected", () => {
    expect(
      getMfaChallengeStage(
        { ...challenge, methods: [pendingTotpMethod] },
        { selectedMethodId: null, isPickingMethod: false, ...WITH_CODE_REQUESTS }
      ).view
    ).toBe(MFA_CHALLENGE_VIEW.NO_SELECTABLE_METHODS);
  });

  it("is the dead end when the only method is an e-mail that is not the default and cannot get a code", () => {
    expect(
      getMfaChallengeStage(
        { methods: [EMAIL_METHOD], default_method_id: null },
        { selectedMethodId: null, isPickingMethod: false, ...WITHOUT_CODE_REQUESTS }
      ).view
    ).toBe(MFA_CHALLENGE_VIEW.NO_SELECTABLE_METHODS);
  });
});
