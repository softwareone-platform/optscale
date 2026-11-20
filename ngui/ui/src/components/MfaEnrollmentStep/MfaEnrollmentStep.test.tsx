import { act } from "react-dom/test-utils";
import { Route } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AUTH_ERROR_CODE, AuthApiError } from "api/auth/errors";
import { MFA_METHOD_TYPE } from "api/auth/mfaMethod";
import { ChallengeContinuation, SignInRouterState } from "hooks/useLoginChallenge";
import { click, find } from "tests/dom";
import LandingPage from "tests/LandingPage";
import { renderWithProviders } from "tests/renderWithProviders";
import { ENROLLMENT_REQUIRED_CHALLENGE, ISSUED_TOKEN } from "tests/signInFixtures";
import { typeInto } from "tests/typeInto";
import { MFA_ENROLLMENT, INITIALIZE, LOGIN, PASSWORD_RECOVERY } from "urls";
import { getCurrentUTCTimeInSec } from "utils/datetime";
import MfaEnrollmentStep from "./MfaEnrollmentStep";

const startChallengeEnrollmentSpy = vi.fn();
const confirmChallengeEnrollmentSpy = vi.fn();

// The challenge's enrollment endpoints are the boundary; the screen, the add dialog and the sign-in stay real.
vi.mock("api/auth/mfaMethods", async (importOriginal) => ({
  ...(await importOriginal<typeof import("api/auth/mfaMethods")>()),
  startChallengeEnrollment: (params: unknown) => startChallengeEnrollmentSpy(params),
  confirmChallengeEnrollment: (params: unknown) => confirmChallengeEnrollmentSpy(params)
}));

const EMAIL_ENROLLMENT = {
  id: "d4a7",
  type: MFA_METHOD_TYPE.EMAIL,
  label: "fi***@example.com",
  is_default: false,
  confirmed: false,
  created_at: 1_758_480_000
};

let rendered: ReturnType<typeof renderWithProviders> | null = null;

const renderAt = (state?: SignInRouterState) => {
  rendered = renderWithProviders({
    initialEntry: { pathname: MFA_ENROLLMENT, state },
    routes: (
      <>
        <Route path={MFA_ENROLLMENT} element={<MfaEnrollmentStep />} />
        <Route path={LOGIN} element={<LandingPage testId="login_page" />} />
        <Route path={INITIALIZE} element={<LandingPage testId="initialize_page" />} />
        <Route path={PASSWORD_RECOVERY} element={<LandingPage testId="password_recovery_page" />} />
      </>
    )
  });
};

const addEmailMethod = async () => {
  await click("btn_set_up_mfa");
  await click("btn_choose_mfa_method_email");
  await click("btn_mfa_setup_send_code");
  act(() => {
    typeInto(find("input_code_digit_0") as HTMLInputElement, "123456");
  });
  await click("btn_verify_mfa_method");
};

const renderAndAddEmailMethod = async (continuation?: ChallengeContinuation) => {
  startChallengeEnrollmentSpy.mockResolvedValue(EMAIL_ENROLLMENT);
  confirmChallengeEnrollmentSpy.mockResolvedValue({ method: { ...EMAIL_ENROLLMENT, confirmed: true }, token: ISSUED_TOKEN });
  renderAt({ challenge: ENROLLMENT_REQUIRED_CHALLENGE, continuation });

  await addEmailMethod();
};

describe("MfaEnrollmentStep", () => {
  afterEach(() => {
    rendered?.unmount();
    rendered = null;
    vi.clearAllMocks();
  });

  it("sends a visitor with no challenge back to sign-in", () => {
    renderAt();

    expect(find("login_page")).not.toBeNull();
  });

  it("shows, in the invitation-style card, why access is blocked with Set up MFA and Sign out", () => {
    renderAt({ challenge: ENROLLMENT_REQUIRED_CHALLENGE });

    expect(find("sign_in_card")).not.toBeNull();
    expect(find("p_enrollment_required_title")?.textContent).toBe("Multi-Factor Authentication required");
    expect(find("p_signing_in_as")?.textContent).toContain(ENROLLMENT_REQUIRED_CHALLENGE.user_email);
    expect(find("btn_set_up_mfa")).not.toBeNull();
    expect(find("btn_sign_out")?.closest("a")?.getAttribute("href")).toBe(LOGIN);
  });

  it("adds the method under the challenge and signs straight in with the token that confirms it", async () => {
    await renderAndAddEmailMethod();

    expect(startChallengeEnrollmentSpy).toHaveBeenCalledWith({
      userId: ENROLLMENT_REQUIRED_CHALLENGE.user_id,
      challengeId: ENROLLMENT_REQUIRED_CHALLENGE.challenge_id,
      type: "email"
    });
    expect(confirmChallengeEnrollmentSpy).toHaveBeenCalledWith({
      userId: ENROLLMENT_REQUIRED_CHALLENGE.user_id,
      challengeId: ENROLLMENT_REQUIRED_CHALLENGE.challenge_id,
      methodId: EMAIL_ENROLLMENT.id,
      code: "123456"
    });
    expect(find("initialize_page")).not.toBeNull();
  });

  it("follows the challenge's continuation, as the MFA step does", async () => {
    await renderAndAddEmailMethod({ returnsToPasswordRecovery: true, search: "?email=finops.ffc%40example.com" });

    expect(JSON.parse(find("password_recovery_page")!.dataset.state!)).toEqual({ recoveryToken: ISSUED_TOKEN });
  });

  it("keeps the dialog open on a wrong code, for another try", async () => {
    startChallengeEnrollmentSpy.mockResolvedValue(EMAIL_ENROLLMENT);
    confirmChallengeEnrollmentSpy.mockRejectedValue(
      new AuthApiError({ status: 403, errorCode: AUTH_ERROR_CODE.INVALID_MFA_CODE, reason: "invalid", params: [4] })
    );
    renderAt({ challenge: ENROLLMENT_REQUIRED_CHALLENGE });

    await addEmailMethod();

    expect(find("p_mfa_setup_error")).not.toBeNull();
    expect(find("initialize_page")).toBeNull();
  });

  it("ends the sign-in, offering it again with the address, once the challenge is gone", async () => {
    startChallengeEnrollmentSpy.mockRejectedValue(
      new AuthApiError({ status: 404, errorCode: AUTH_ERROR_CODE.LOGIN_CHALLENGE_NOT_FOUND, reason: "gone" })
    );
    renderAt({ challenge: ENROLLMENT_REQUIRED_CHALLENGE });

    await click("btn_set_up_mfa");
    await click("btn_choose_mfa_method_email");
    await click("btn_mfa_setup_send_code");

    expect(find("p_challenge_ended")).not.toBeNull();
    expect(find("btn_sign_in_again")?.closest("a")?.getAttribute("href")).toContain(
      encodeURIComponent(ENROLLMENT_REQUIRED_CHALLENGE.user_email)
    );

    // The side modal stays on the route, so the setup has to close itself; the drawer leaves after its transition.
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    expect(find("smodal_add_mfa_method")).toBeNull();
  });

  it("says how many attempts the challenge has left after a wrong code", async () => {
    startChallengeEnrollmentSpy.mockResolvedValue(EMAIL_ENROLLMENT);
    confirmChallengeEnrollmentSpy.mockRejectedValue(
      new AuthApiError({ status: 403, errorCode: AUTH_ERROR_CODE.INVALID_MFA_CODE, reason: "invalid", params: [4] })
    );
    renderAt({ challenge: ENROLLMENT_REQUIRED_CHALLENGE });

    await addEmailMethod();

    expect(find("p_mfa_setup_attempts_left")?.textContent).toBe("4 attempts left");
  });

  it.each([
    [
      "stopped for security once wrong codes lock the challenge",
      AUTH_ERROR_CODE.MFA_ATTEMPTS_EXCEEDED,
      "Too many incorrect codes"
    ],
    [
      "asking to wait past the limit of wrong codes across sign-ins",
      AUTH_ERROR_CODE.TOO_MANY_FAILED_ATTEMPTS,
      "Wait 15 minutes"
    ],
    ["as set up already, once another sign-in enrolled a method", AUTH_ERROR_CODE.MFA_ALREADY_ENROLLED, "already been set up"]
  ])("ends the sign-in %s", async (_, errorCode, message) => {
    startChallengeEnrollmentSpy.mockResolvedValue(EMAIL_ENROLLMENT);
    confirmChallengeEnrollmentSpy.mockRejectedValue(new AuthApiError({ status: 403, errorCode, reason: "refused" }));
    renderAt({ challenge: ENROLLMENT_REQUIRED_CHALLENGE });

    await addEmailMethod();

    expect(find("p_challenge_ended")?.textContent).toContain(message);
  });

  it("ends the sign-in once the challenge runs out", () => {
    renderAt({ challenge: { ...ENROLLMENT_REQUIRED_CHALLENGE, expires_at: getCurrentUTCTimeInSec() } });

    expect(find("p_challenge_ended")).not.toBeNull();
  });
});
