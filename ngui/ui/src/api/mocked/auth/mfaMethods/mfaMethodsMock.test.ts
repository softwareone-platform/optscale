import { afterEach, describe, expect, it, vi } from "vitest";
import { AUTH_POLICY_PURPOSE, AUTH_POLICY_SCOPE_TYPE } from "api/auth/authPolicies/constants";
import { AUTH_ERROR_CODE } from "api/auth/errors";
import { MFA_METHOD_TYPE } from "api/auth/mfaMethod";
import { MFA_STATUS } from "api/auth/mfaMethods/constants";
import { createAuthPolicyMock, deleteAuthPolicyMock } from "api/mocked/auth/authPolicies/authPoliciesMock";
import { MOCK_MFA, MOCK_SIGN_IN_CREDENTIALS } from "api/mocked/config";
import { resetMockState } from "api/mocked/state/mockState";
import {
  confirmMfaEnrollmentMock,
  deleteMfaMethodMock,
  getMfaStatusMock,
  resetMfaMock,
  startMfaEnrollmentMock,
  updateMfaMethodMock
} from "./mfaMethodsMock";
import { SECURITY_SCENARIO } from "./scenarios";

const CODE = MOCK_SIGN_IN_CREDENTIALS.mfaCode;

const TOTP = { type: MFA_METHOD_TYPE.TOTP, label: "My phone" };

// The store outlives each test, like the dev server's; a fresh user id keeps every test on its own row.
let userCount = 0;
const newUser = () => {
  userCount += 1;
  return { token: "MDAxY", userId: `mfa-user-${userCount}` };
};

describe("getMfaStatusMock", () => {
  it.each([
    [SECURITY_SCENARIO.NO_METHODS, MFA_STATUS.NOT_CONFIGURED, 0],
    [SECURITY_SCENARIO.TOTP_ONLY, MFA_STATUS.CONFIGURED, 1],
    [SECURITY_SCENARIO.TOTP_AND_EMAIL, MFA_STATUS.CONFIGURED, 2],
    [SECURITY_SCENARIO.ENFORCED_NO_METHODS, MFA_STATUS.ENFORCED, 0],
    [SECURITY_SCENARIO.ENFORCED_WITH_METHODS, MFA_STATUS.ENFORCED, 1]
  ])("starts %s as %s with %i methods", async (scenario, status, methodCount) => {
    const mfa = await getMfaStatusMock(newUser(), scenario);

    expect(mfa.status).toBe(status);
    expect(mfa.methods).toHaveLength(methodCount);
  });

  it("lists the seeded methods as the signed-in user's own", async () => {
    const user = newUser();

    const { methods } = await getMfaStatusMock(user, SECURITY_SCENARIO.TOTP_AND_EMAIL);

    expect(methods.map(({ user_id }) => user_id)).toEqual([user.userId, user.userId]);
  });

  it("answers 500 under the server error scenario", async () => {
    await expect(getMfaStatusMock(newUser(), SECURITY_SCENARIO.INTERNAL_ERROR)).rejects.toMatchObject({
      status: 500,
      errorCode: AUTH_ERROR_CODE.INTERNAL_ERROR
    });
  });

  it("answers 401 without a token", async () => {
    await expect(getMfaStatusMock({ ...newUser(), token: "" })).rejects.toMatchObject({
      status: 401,
      errorCode: AUTH_ERROR_CODE.TOKEN_REQUIRED
    });
  });

  it("starts the user over when the dev panel picks another scenario", async () => {
    const user = newUser();
    await startMfaEnrollmentMock({ ...user, ...TOTP }, SECURITY_SCENARIO.NO_METHODS);

    const mfa = await getMfaStatusMock(user, SECURITY_SCENARIO.TOTP_AND_EMAIL);

    expect(mfa.methods.map(({ type }) => type)).toEqual([MFA_METHOD_TYPE.TOTP, MFA_METHOD_TYPE.EMAIL]);
  });
});

describe("startMfaEnrollmentMock", () => {
  it("hands out the TOTP secret and provisioning URI once, in the pending enrollment", async () => {
    const enrollment = await startMfaEnrollmentMock({ ...newUser(), type: MFA_METHOD_TYPE.TOTP, label: "My phone" });

    expect(enrollment).toMatchObject({ type: MFA_METHOD_TYPE.TOTP, label: "My phone", confirmed: false, is_default: false });
    expect(enrollment.secret).toBeTruthy();
    expect(enrollment.otpauth_uri).toMatch(/^otpauth:\/\/totp\//);
  });

  it("starts an e-mail enrollment without a secret, labelled with the masked address", async () => {
    const enrollment = await startMfaEnrollmentMock({ ...newUser(), type: MFA_METHOD_TYPE.EMAIL, label: "ignored" });

    expect(enrollment.secret).toBeUndefined();
    expect(enrollment.label).toMatch(/\*\*\*@/);
  });

  it("does not list a pending enrollment among the methods", async () => {
    const user = newUser();
    await startMfaEnrollmentMock({ ...user, ...TOTP });

    await expect(getMfaStatusMock(user)).resolves.toMatchObject({ methods: [], status: MFA_STATUS.NOT_CONFIGURED });
  });

  it("answers 409 naming the type when the user already has a confirmed e-mail method", async () => {
    await expect(
      startMfaEnrollmentMock({ ...newUser(), type: MFA_METHOD_TYPE.EMAIL }, SECURITY_SCENARIO.TOTP_AND_EMAIL)
    ).rejects.toMatchObject({
      status: 409,
      errorCode: AUTH_ERROR_CODE.MFA_METHOD_EXISTS,
      message: "Authentication method of type email already exists"
    });
  });

  it("adds another authenticator app beside a confirmed one", async () => {
    const user = newUser();
    const { id } = await startMfaEnrollmentMock({ ...user, ...TOTP, label: "Tablet" }, SECURITY_SCENARIO.TOTP_ONLY);
    await confirmMfaEnrollmentMock({ ...user, methodId: id, code: CODE }, SECURITY_SCENARIO.TOTP_ONLY);

    const { methods } = await getMfaStatusMock(user, SECURITY_SCENARIO.TOTP_ONLY);

    expect(methods.map(({ type, label }) => [type, label])).toEqual([
      [MFA_METHOD_TYPE.TOTP, "Google Pixel 10 Pro"],
      [MFA_METHOD_TYPE.TOTP, "Tablet"]
    ]);
  });

  it("replaces an unfinished enrollment of the same type when started again", async () => {
    const user = newUser();
    const first = await startMfaEnrollmentMock({ ...user, ...TOTP });
    const second = await startMfaEnrollmentMock({ ...user, ...TOTP });

    await expect(confirmMfaEnrollmentMock({ ...user, methodId: first.id, code: CODE })).rejects.toMatchObject({ status: 404 });
    await expect(confirmMfaEnrollmentMock({ ...user, methodId: second.id, code: CODE })).resolves.toMatchObject({
      confirmed: true
    });
  });

  it("answers 403 to a second e-mail code within the minute", async () => {
    const user = newUser();
    await startMfaEnrollmentMock({ ...user, type: MFA_METHOD_TYPE.EMAIL });

    await expect(startMfaEnrollmentMock({ ...user, type: MFA_METHOD_TYPE.EMAIL })).rejects.toMatchObject({
      status: 403,
      errorCode: AUTH_ERROR_CODE.CODE_REQUESTED_TOO_SOON
    });
  });

  it("answers 503 to an e-mail enrollment while the e-mail service is down, and still starts an authenticator app", async () => {
    const user = newUser();

    await expect(
      startMfaEnrollmentMock({ ...user, type: MFA_METHOD_TYPE.EMAIL }, SECURITY_SCENARIO.EMAIL_SERVICE_DOWN)
    ).rejects.toMatchObject({ status: 503, errorCode: AUTH_ERROR_CODE.SERVICE_UNAVAILABLE });
    await expect(startMfaEnrollmentMock({ ...user, ...TOTP }, SECURITY_SCENARIO.EMAIL_SERVICE_DOWN)).resolves.toMatchObject({
      confirmed: false
    });
  });

  it("answers 400 to an authenticator app without a name", async () => {
    await expect(startMfaEnrollmentMock({ ...newUser(), type: MFA_METHOD_TYPE.TOTP })).rejects.toMatchObject({
      status: 400,
      errorCode: AUTH_ERROR_CODE.NOT_PROVIDED,
      message: "label is not provided"
    });
  });

  it("starts the method as the user's own", async () => {
    const user = newUser();

    await expect(startMfaEnrollmentMock({ ...user, ...TOTP })).resolves.toMatchObject({
      user_id: user.userId,
      confirmed_at: 0
    });
  });
});

describe("getMfaStatusMock — organization policies", () => {
  const MFA_POLICY = {
    token: "MDAxY",
    scope_type: AUTH_POLICY_SCOPE_TYPE.ORGANIZATION,
    scope_id: "org-with-policy",
    purpose: AUTH_POLICY_PURPOSE.MFA
  };

  afterEach(resetMockState);

  it("enforces MFA, naming the organization, once it has an MFA policy", async () => {
    const user = newUser();
    await createAuthPolicyMock(MFA_POLICY);

    const mfa = await getMfaStatusMock(user, SECURITY_SCENARIO.TOTP_ONLY);

    expect(mfa).toMatchObject({
      status: MFA_STATUS.ENFORCED,
      mfa_enforced: true,
      enforcing_organizations: [MFA_POLICY.scope_id]
    });
  });

  it("names the policy's organization beside the scenario's own", async () => {
    const user = newUser();
    const { enforcing_organizations: seeded } = await getMfaStatusMock(user, SECURITY_SCENARIO.ENFORCED_WITH_METHODS);
    await createAuthPolicyMock(MFA_POLICY);

    const mfa = await getMfaStatusMock(user, SECURITY_SCENARIO.ENFORCED_WITH_METHODS);

    expect(mfa.enforcing_organizations).toEqual([...seeded, MFA_POLICY.scope_id]);
  });

  it("stops enforcing once the policy is deleted", async () => {
    const user = newUser();
    const { id } = await createAuthPolicyMock(MFA_POLICY);

    await deleteAuthPolicyMock({ token: MFA_POLICY.token, policyId: id });

    await expect(getMfaStatusMock(user, SECURITY_SCENARIO.TOTP_ONLY)).resolves.toMatchObject({
      status: MFA_STATUS.CONFIGURED,
      mfa_enforced: false,
      enforcing_organizations: []
    });
  });

  it("leaves a policy with another purpose out of it", async () => {
    await createAuthPolicyMock({ ...MFA_POLICY, purpose: AUTH_POLICY_PURPOSE.SSO });

    await expect(getMfaStatusMock(newUser(), SECURITY_SCENARIO.NO_METHODS)).resolves.toMatchObject({
      mfa_enforced: false
    });
  });
});

describe("confirmMfaEnrollmentMock", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("confirms the first method as the default and leaves the secret out of the answer", async () => {
    const user = newUser();
    const { id } = await startMfaEnrollmentMock({ ...user, ...TOTP });

    const method = await confirmMfaEnrollmentMock({ ...user, methodId: id, code: CODE });

    expect(method).toMatchObject({ id, confirmed: true, is_default: true, confirmed_at: expect.any(Number) });
    expect(method.confirmed_at).toBeGreaterThan(0);
    expect(method).not.toHaveProperty("secret");
    expect(method).not.toHaveProperty("otpauth_uri");
  });

  it("keeps the existing default when another method is confirmed", async () => {
    const user = newUser();
    const { id } = await startMfaEnrollmentMock({ ...user, type: MFA_METHOD_TYPE.EMAIL }, SECURITY_SCENARIO.TOTP_ONLY);

    await expect(
      confirmMfaEnrollmentMock({ ...user, methodId: id, code: CODE }, SECURITY_SCENARIO.TOTP_ONLY)
    ).resolves.toMatchObject({ is_default: false });
  });

  it("answers 403 to a wrong code and still accepts the right one afterwards", async () => {
    const user = newUser();
    const { id } = await startMfaEnrollmentMock({ ...user, ...TOTP });

    await expect(confirmMfaEnrollmentMock({ ...user, methodId: id, code: "000000" })).rejects.toMatchObject({
      status: 403,
      errorCode: AUTH_ERROR_CODE.INVALID_AUTHENTICATION_CODE
    });
    await expect(confirmMfaEnrollmentMock({ ...user, methodId: id, code: CODE })).resolves.toMatchObject({ confirmed: true });
  });

  it("answers 409 for a method that is already confirmed", async () => {
    const user = newUser();
    const [method] = (await getMfaStatusMock(user, SECURITY_SCENARIO.TOTP_ONLY)).methods;

    await expect(
      confirmMfaEnrollmentMock({ ...user, methodId: method.id, code: CODE }, SECURITY_SCENARIO.TOTP_ONLY)
    ).rejects.toMatchObject({ status: 409, errorCode: AUTH_ERROR_CODE.MFA_METHOD_ALREADY_CONFIRMED });
  });

  it("answers a 10-minute-old e-mail code as a wrong one, though the enrollment itself lasts 15", async () => {
    vi.useFakeTimers();
    const user = newUser();
    const { id } = await startMfaEnrollmentMock({ ...user, type: MFA_METHOD_TYPE.EMAIL });

    vi.advanceTimersByTime(MOCK_MFA.EMAIL_CODE_TTL_SECONDS * 1000);

    await expect(confirmMfaEnrollmentMock({ ...user, methodId: id, code: CODE })).rejects.toMatchObject({
      status: 403,
      errorCode: AUTH_ERROR_CODE.INVALID_AUTHENTICATION_CODE
    });
  });

  it("answers 404 once the pending enrollment is older than 15 minutes", async () => {
    vi.useFakeTimers();
    const user = newUser();
    const { id } = await startMfaEnrollmentMock({ ...user, ...TOTP });

    vi.advanceTimersByTime(MOCK_MFA.PENDING_ENROLLMENT_TTL_SECONDS * 1000);

    await expect(confirmMfaEnrollmentMock({ ...user, methodId: id, code: CODE })).rejects.toMatchObject({
      status: 404,
      errorCode: AUTH_ERROR_CODE.NOT_FOUND,
      message: `MFAMethod ${id} not found`
    });
  });
});

describe("updateMfaMethodMock", () => {
  it("moves the default to the chosen method", async () => {
    const user = newUser();
    const { methods } = await getMfaStatusMock(user, SECURITY_SCENARIO.TOTP_AND_EMAIL);
    const emailMethod = methods.find(({ type }) => type === MFA_METHOD_TYPE.EMAIL);

    await updateMfaMethodMock({ ...user, methodId: emailMethod?.id ?? "", is_default: true }, SECURITY_SCENARIO.TOTP_AND_EMAIL);

    const updated = await getMfaStatusMock(user, SECURITY_SCENARIO.TOTP_AND_EMAIL);
    expect(updated.methods.map(({ type, is_default }) => [type, is_default])).toEqual([
      [MFA_METHOD_TYPE.TOTP, false],
      [MFA_METHOD_TYPE.EMAIL, true]
    ]);
  });

  it("answers 404 for a method the user does not have", async () => {
    await expect(updateMfaMethodMock({ ...newUser(), methodId: "missing", is_default: true })).rejects.toMatchObject({
      status: 404
    });
  });

  it("renames an authenticator app", async () => {
    const user = newUser();
    const [totp] = (await getMfaStatusMock(user, SECURITY_SCENARIO.TOTP_ONLY)).methods;

    await expect(
      updateMfaMethodMock({ ...user, methodId: totp.id, label: "Work phone" }, SECURITY_SCENARIO.TOTP_ONLY)
    ).resolves.toMatchObject({ label: "Work phone" });
  });

  it("answers 400 to renaming an e-mail method, which keeps its masked address", async () => {
    const user = newUser();
    const { methods } = await getMfaStatusMock(user, SECURITY_SCENARIO.TOTP_AND_EMAIL);
    const emailMethod = methods.find(({ type }) => type === MFA_METHOD_TYPE.EMAIL);

    await expect(
      updateMfaMethodMock({ ...user, methodId: emailMethod?.id ?? "", label: "Mine" }, SECURITY_SCENARIO.TOTP_AND_EMAIL)
    ).rejects.toMatchObject({ status: 400, errorCode: AUTH_ERROR_CODE.INVALID_VALUE, message: "Invalid label" });
  });

  it("answers 409 to making a pending method the default", async () => {
    const user = newUser();
    const { id } = await startMfaEnrollmentMock({ ...user, ...TOTP });

    await expect(updateMfaMethodMock({ ...user, methodId: id, is_default: true })).rejects.toMatchObject({
      status: 409,
      errorCode: AUTH_ERROR_CODE.MFA_METHOD_NOT_CONFIRMED
    });
  });
});

describe("deleteMfaMethodMock and resetMfaMock", () => {
  it("removes one method", async () => {
    const user = newUser();
    const [totp] = (await getMfaStatusMock(user, SECURITY_SCENARIO.TOTP_AND_EMAIL)).methods;

    await deleteMfaMethodMock({ ...user, methodId: totp.id }, SECURITY_SCENARIO.TOTP_AND_EMAIL);

    const { methods } = await getMfaStatusMock(user, SECURITY_SCENARIO.TOTP_AND_EMAIL);
    expect(methods.map(({ type }) => type)).toEqual([MFA_METHOD_TYPE.EMAIL]);
  });

  it("makes the remaining method the default when the default is removed", async () => {
    const user = newUser();
    const [totp] = (await getMfaStatusMock(user, SECURITY_SCENARIO.TOTP_AND_EMAIL)).methods;

    await deleteMfaMethodMock({ ...user, methodId: totp.id }, SECURITY_SCENARIO.TOTP_AND_EMAIL);

    const { methods } = await getMfaStatusMock(user, SECURITY_SCENARIO.TOTP_AND_EMAIL);
    expect(methods.map(({ type, is_default }) => [type, is_default])).toEqual([[MFA_METHOD_TYPE.EMAIL, true]]);
  });

  it("answers 403 to removing the last method while MFA is enforced", async () => {
    const user = newUser();
    const [method] = (await getMfaStatusMock(user, SECURITY_SCENARIO.ENFORCED_WITH_METHODS)).methods;

    await expect(
      deleteMfaMethodMock({ ...user, methodId: method.id }, SECURITY_SCENARIO.ENFORCED_WITH_METHODS)
    ).rejects.toMatchObject({ status: 403, errorCode: AUTH_ERROR_CODE.LAST_MFA_METHOD_ENFORCED });
  });

  it("removes every method on reset", async () => {
    const user = newUser();
    await getMfaStatusMock(user, SECURITY_SCENARIO.TOTP_AND_EMAIL);

    await resetMfaMock(user, SECURITY_SCENARIO.TOTP_AND_EMAIL);

    await expect(getMfaStatusMock(user, SECURITY_SCENARIO.TOTP_AND_EMAIL)).resolves.toMatchObject({
      methods: [],
      status: MFA_STATUS.NOT_CONFIGURED
    });
  });
});
