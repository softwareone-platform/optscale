import { act } from "react-dom/test-utils";
import { Route } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AUTH_ERROR_CODE, AuthApiError, AuthErrorParam } from "@theme/api/auth/errors";
import { MfaMethod } from "@theme/api/auth/mfaMethod";
import { LoginChallenge } from "@theme/api/auth/signIn/types";
import { ChallengeContinuation } from "@theme/hooks/useLoginChallenge";
import LandingPage from "@theme/tests/LandingPage";
import { renderWithProviders } from "@theme/tests/renderWithProviders";
import { EMAIL_METHOD, ISSUED_TOKEN, MFA_REQUIRED_CHALLENGE, TOTP_METHOD } from "@theme/tests/signInFixtures";
import { typeInto } from "@theme/tests/typeInto";
import { MFA_CHALLENGE } from "@theme/urls";
import { INITIALIZE, LOGIN, PASSWORD_RECOVERY } from "urls";
import { getCurrentUTCTimeInSec } from "utils/datetime";
import MfaChallengeStep from "./MfaChallengeStep";

const completeLoginChallengeSpy = vi.fn();
const requestChallengeCodeSpy = vi.fn();

// The transport is the boundary: failure sorting and the screen's reaction to it stay real.
vi.mock("@theme/api/auth/signIn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@theme/api/auth/signIn")>()),
  completeLoginChallenge: (params: unknown) => completeLoginChallengeSpy(params),
  requestChallengeCode: (params: unknown) => requestChallengeCodeSpy(params)
}));

const emailDefaultChallenge: LoginChallenge = {
  ...MFA_REQUIRED_CHALLENGE,
  methods: [
    { ...TOTP_METHOD, is_default: false },
    { ...EMAIL_METHOD, is_default: true }
  ],
  default_method_id: EMAIL_METHOD.id,
  code_sent: true
};

const renderAt = (challenge?: LoginChallenge, continuation?: ChallengeContinuation) => {
  const { container, find, text, unmount } = renderWithProviders({
    initialEntry: { pathname: MFA_CHALLENGE, state: challenge ? { challenge, continuation } : undefined },
    routes: (
      <>
        <Route path={MFA_CHALLENGE} element={<MfaChallengeStep />} />
        <Route path={LOGIN} element={<div data-test-id="login_page" />} />
        <Route path={INITIALIZE} element={<LandingPage testId="initialize_page" />} />
        <Route path={PASSWORD_RECOVERY} element={<LandingPage testId="password_recovery_page" />} />
      </>
    )
  });

  const methodRadio = (methodId: string) =>
    container.querySelector<HTMLInputElement>(`[data-test-id='mfa_method_option_${methodId}'] input`);

  return {
    find,
    methodRadio,
    text,
    click: (testId: string) => act(() => find(testId)!.click()),
    enterCode: async (code: string) => {
      await act(async () => {
        typeInto(find("input_code_digit_0") as HTMLInputElement, code);
      });
    },
    verify: () => act(async () => find("btn_verify")!.click()),
    digits: () =>
      Array.from(
        container.querySelectorAll<HTMLInputElement>("[data-test-id^='input_code_digit_']"),
        ({ value }) => value
      ).join(""),
    unmount
  };
};

describe("MfaChallengeStep", () => {
  it("shows which account is signing in", () => {
    const screen = renderAt(MFA_REQUIRED_CHALLENGE);

    expect(screen.text("p_signing_in_as")).toContain("finops.ffc@example.com");

    screen.unmount();
  });

  it("offers a different method above the Verify button", () => {
    const screen = renderAt(MFA_REQUIRED_CHALLENGE);

    const useDifferentMethod = screen.find("btn_use_different_method")!;
    const verify = screen.find("btn_verify")!;

    expect(useDifferentMethod.compareDocumentPosition(verify) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    screen.unmount();
  });

  it("opens straight on the authenticator app when it is the default method", () => {
    const screen = renderAt(MFA_REQUIRED_CHALLENGE);

    expect(screen.find("mfa_method_totp")).not.toBeNull();
    expect(screen.find("p_default_method")).not.toBeNull();
    expect(screen.text("p_method_instructions")).toBe("Open your authenticator app and enter the code it shows.");
    expect(screen.find("input_code_digit_0")).not.toBeNull();

    screen.unmount();
  });

  it("opens on e-mail with the masked address when e-mail is the default and the code went out", () => {
    const screen = renderAt(emailDefaultChallenge);

    expect(screen.find("mfa_method_email")).not.toBeNull();
    expect(screen.text("p_method_instructions")).toBe("A verification code has been sent to fi***@example.com.");

    screen.unmount();
  });

  it("offers only confirmed methods when the visitor chooses a different one", () => {
    const pendingMethod: MfaMethod = { ...EMAIL_METHOD, id: "c3f5", confirmed: false };
    const screen = renderAt({ ...MFA_REQUIRED_CHALLENGE, methods: [...MFA_REQUIRED_CHALLENGE.methods, pendingMethod] });

    screen.click("btn_use_different_method");

    expect(screen.find(`mfa_method_option_${TOTP_METHOD.id}`)).not.toBeNull();
    expect(screen.find(`mfa_method_option_${EMAIL_METHOD.id}`)).not.toBeNull();
    expect(screen.find(`mfa_method_option_${pendingMethod.id}`)).toBeNull();

    screen.unmount();
  });

  it("keeps the current method checked in the picker", () => {
    const screen = renderAt(MFA_REQUIRED_CHALLENGE);

    screen.click("btn_use_different_method");

    expect(screen.methodRadio(TOTP_METHOD.id)?.checked).toBe(true);

    screen.unmount();
  });

  it("switches the screen to the method picked from the list", () => {
    const screen = renderAt(MFA_REQUIRED_CHALLENGE);

    screen.click("btn_use_different_method");
    act(() => screen.methodRadio(EMAIL_METHOD.id)!.click());
    screen.click("btn_use_selected_method");

    expect(screen.find("mfa_method_email")).not.toBeNull();
    expect(screen.find("mfa_method_totp")).toBeNull();

    screen.unmount();
  });

  it("asks the visitor to pick, with nothing checked, when there is no default", () => {
    const screen = renderAt({ ...MFA_REQUIRED_CHALLENGE, default_method_id: null });

    expect(screen.find("p_verify_your_identity")).not.toBeNull();
    expect(screen.methodRadio(TOTP_METHOD.id)?.checked).toBe(false);
    expect((screen.find("btn_use_selected_method") as HTMLButtonElement).disabled).toBe(true);

    screen.unmount();
  });

  it("hides the switch when there is only one method to use", () => {
    const screen = renderAt({ ...MFA_REQUIRED_CHALLENGE, methods: [TOTP_METHOD] });

    expect(screen.find("btn_use_different_method")).toBeNull();

    screen.unmount();
  });

  it("explains that sign-in cannot continue when no method is confirmed", () => {
    const screen = renderAt({ ...MFA_REQUIRED_CHALLENGE, methods: [{ ...TOTP_METHOD, confirmed: false }] });

    expect(screen.find("p_no_verification_methods")).not.toBeNull();
    expect(screen.find("input_code_digit_0")).toBeNull();

    screen.unmount();
  });

  it("sends a visitor who never passed the password step back to login", () => {
    const screen = renderAt();

    expect(screen.find("login_page")).not.toBeNull();

    screen.unmount();
  });
});

describe("MfaChallengeStep verification", () => {
  afterEach(() => {
    completeLoginChallengeSpy.mockReset();
    vi.useRealTimers();
  });

  const rejectWith = (status: number, errorCode: string, params: AuthErrorParam[] = []) =>
    completeLoginChallengeSpy.mockRejectedValue(new AuthApiError({ status, errorCode, reason: "nope", params }));

  it("shows how long the challenge lasts and how many attempts it allows", () => {
    const screen = renderAt(MFA_REQUIRED_CHALLENGE);

    expect(screen.text("p_challenge_status")).toMatch(/^Expires in [45]:\d\d · 5 attempts left$/);

    screen.unmount();
  });

  it("sends the challenge, the method and the entered code", async () => {
    completeLoginChallengeSpy.mockReturnValue(new Promise(() => {}));
    const screen = renderAt(MFA_REQUIRED_CHALLENGE);

    await screen.enterCode("482913");
    await screen.verify();

    expect(completeLoginChallengeSpy).toHaveBeenCalledWith({
      challenge_id: MFA_REQUIRED_CHALLENGE.challenge_id,
      method_id: TOTP_METHOD.id,
      code: "482913"
    });

    screen.unmount();
  });

  it("keeps the form open after a wrong code, with a retryable error, an empty code and the attempts the service reports", async () => {
    rejectWith(403, AUTH_ERROR_CODE.INVALID_MFA_CODE, [2]);
    const screen = renderAt(MFA_REQUIRED_CHALLENGE);

    await screen.enterCode("000000");
    await screen.verify();

    expect(screen.text("p_code_error")).toBe("That code is incorrect. Check it and try again.");
    expect(screen.digits()).toBe("");
    expect(screen.text("p_attempts_left")).toBe("2 attempts left");
    expect(screen.find("p_challenge_ended")).toBeNull();

    screen.unmount();
  });

  it("counts one attempt spent after a wrong code when the service does not report how many are left", async () => {
    rejectWith(403, AUTH_ERROR_CODE.INVALID_MFA_CODE);
    const screen = renderAt(MFA_REQUIRED_CHALLENGE);

    await screen.enterCode("000000");
    await screen.verify();

    expect(screen.text("p_attempts_left")).toBe("4 attempts left");

    screen.unmount();
  });

  it("ends the challenge when the last attempt is spent, and offers a fresh sign-in for the same address", async () => {
    rejectWith(403, AUTH_ERROR_CODE.MFA_ATTEMPTS_EXCEEDED);
    const screen = renderAt(MFA_REQUIRED_CHALLENGE);

    await screen.enterCode("000000");
    await screen.verify();

    expect(screen.text("p_challenge_ended")).toContain("Too many incorrect codes");
    // The ended view only renders once the challenge is gone from router state.
    expect(screen.find("input_code_digit_0")).toBeNull();
    expect(screen.find("btn_sign_in_again")?.closest("a")?.getAttribute("href")).toBe(
      `${LOGIN}?email=${encodeURIComponent(MFA_REQUIRED_CHALLENGE.user_email)}`
    );

    screen.unmount();
  });

  it("ends the challenge, asking to wait, once the user is past the limit of wrong codes across sign-ins", async () => {
    rejectWith(403, AUTH_ERROR_CODE.TOO_MANY_FAILED_ATTEMPTS);
    const screen = renderAt(MFA_REQUIRED_CHALLENGE);

    await screen.enterCode("482913");
    await screen.verify();

    expect(screen.text("p_challenge_ended")).toContain("Wait 15 minutes");

    screen.unmount();
  });

  it("ends an expired, consumed or unknown challenge the service answers 404 for", async () => {
    rejectWith(404, AUTH_ERROR_CODE.LOGIN_CHALLENGE_NOT_FOUND);
    const screen = renderAt(MFA_REQUIRED_CHALLENGE);

    await screen.enterCode("482913");
    await screen.verify();

    expect(screen.text("p_challenge_ended")).toContain("expired or is no longer valid");
    expect(screen.text("p_signing_in_as")).toContain(MFA_REQUIRED_CHALLENGE.user_email);

    screen.unmount();
  });

  it("ends the challenge on its own when the countdown runs out", () => {
    vi.useFakeTimers();
    const screen = renderAt({ ...MFA_REQUIRED_CHALLENGE, expires_at: getCurrentUTCTimeInSec() + 2 });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.text("p_challenge_ended")).toContain("expired or is no longer valid");

    screen.unmount();
  });

  it("keeps the entered code after an unexpected failure, since nothing says the challenge is spent", async () => {
    completeLoginChallengeSpy.mockRejectedValue(new TypeError("Failed to fetch"));
    const screen = renderAt(MFA_REQUIRED_CHALLENGE);

    await screen.enterCode("482913");
    await screen.verify();

    expect(screen.find("p_code_error")).not.toBeNull();
    expect(screen.digits()).toBe("482913");
    expect(screen.find("p_challenge_ended")).toBeNull();

    screen.unmount();
  });

  describe("once the code is accepted", () => {
    const passChallenge = async (continuation?: ChallengeContinuation) => {
      completeLoginChallengeSpy.mockResolvedValue(ISSUED_TOKEN);
      const screen = renderAt(MFA_REQUIRED_CHALLENGE, continuation);

      await screen.enterCode("123456");
      await screen.verify();

      return screen;
    };

    it("signs in and moves on", async () => {
      const screen = await passChallenge();

      expect(screen.find("initialize_page")).not.toBeNull();

      screen.unmount();
    });

    it("keeps the query the starting page had, such as e-mail verification's showPolicy", async () => {
      const screen = await passChallenge({ search: "?showPolicy=true" });

      expect(screen.find("initialize_page")?.dataset.search).toBe("?showPolicy=true");

      screen.unmount();
    });

    it("hands the token back to password recovery instead, which has a new password to set with it", async () => {
      const screen = await passChallenge({ returnsToPasswordRecovery: true, search: "?email=finops.ffc%40example.com" });

      expect(screen.find("initialize_page")).toBeNull();
      expect(screen.find("password_recovery_page")?.dataset.search).toBe("?email=finops.ffc%40example.com");
      expect(JSON.parse(screen.find("password_recovery_page")!.dataset.state!)).toEqual({ recoveryToken: ISSUED_TOKEN });

      screen.unmount();
    });
  });
});

describe("MfaChallengeStep e-mail code", () => {
  afterEach(() => {
    requestChallengeCodeSpy.mockReset();
    vi.useRealTimers();
  });

  const switchToEmail = async (screen: ReturnType<typeof renderAt>) => {
    screen.click("btn_use_different_method");
    act(() => screen.methodRadio(EMAIL_METHOD.id)!.click());
    await act(async () => screen.find("btn_use_selected_method")!.click());
  };

  it("sends a code when the visitor switches to an e-mail method that has none yet", async () => {
    requestChallengeCodeSpy.mockResolvedValue(undefined);
    const screen = renderAt(MFA_REQUIRED_CHALLENGE);

    await switchToEmail(screen);

    expect(requestChallengeCodeSpy).toHaveBeenCalledWith({
      challengeId: MFA_REQUIRED_CHALLENGE.challenge_id,
      method_id: EMAIL_METHOD.id
    });
    expect(screen.text("p_method_instructions")).toBe("A verification code has been sent to fi***@example.com.");

    screen.unmount();
  });

  it("sends nothing on opening when the code went out with the 202, and holds Resend for a minute", () => {
    vi.useFakeTimers();
    const screen = renderAt(emailDefaultChallenge);

    expect(requestChallengeCodeSpy).not.toHaveBeenCalled();
    expect(screen.find("btn_resend_email_code")?.hasAttribute("disabled")).toBe(true);
    expect(screen.text("btn_resend_email_code")).toBe("Resend code in 1:00");

    screen.unmount();
  });

  it("sends another code on Resend once the minute is over", async () => {
    vi.useFakeTimers();
    requestChallengeCodeSpy.mockResolvedValue(undefined);
    const screen = renderAt(emailDefaultChallenge);

    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    await act(async () => screen.find("btn_resend_email_code")!.click());

    expect(requestChallengeCodeSpy).toHaveBeenCalledWith({
      challengeId: emailDefaultChallenge.challenge_id,
      method_id: EMAIL_METHOD.id
    });

    screen.unmount();
  });

  it("says when a code was asked for too soon, and sends nothing more by itself", async () => {
    requestChallengeCodeSpy.mockRejectedValue(
      new AuthApiError({ status: 403, errorCode: AUTH_ERROR_CODE.CODE_REQUESTED_TOO_SOON, reason: "nope" })
    );
    const screen = renderAt(MFA_REQUIRED_CHALLENGE);

    await switchToEmail(screen);

    expect(screen.find("p_email_code_error")).not.toBeNull();
    expect(requestChallengeCodeSpy).toHaveBeenCalledTimes(1);

    screen.unmount();
  });

  it("ends the challenge when the service no longer knows it", async () => {
    requestChallengeCodeSpy.mockRejectedValue(
      new AuthApiError({ status: 404, errorCode: AUTH_ERROR_CODE.LOGIN_CHALLENGE_NOT_FOUND, reason: "gone" })
    );
    const screen = renderAt(MFA_REQUIRED_CHALLENGE);

    await switchToEmail(screen);

    expect(screen.find("p_challenge_ended")).not.toBeNull();

    screen.unmount();
  });
});
