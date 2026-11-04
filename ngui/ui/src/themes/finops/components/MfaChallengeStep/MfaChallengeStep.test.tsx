import { act } from "react-dom/test-utils";
import { Route } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AUTH_ERROR_CODE, AuthApiError, LOGIN_CHALLENGE_STATE } from "@theme/api/auth/signIn";
import { AuthErrorParam, LoginChallenge, MfaMethod } from "@theme/api/auth/signIn/types";
import { renderWithProviders } from "@theme/tests/renderWithProviders";
import { MFA_CHALLENGE } from "@theme/urls";
import { INITIALIZE, LOGIN } from "urls";
import { getCurrentUTCTimeInSec } from "utils/datetime";
import { emailMethod, totpMethod } from "./fixtures";
import MfaChallengeStep from "./MfaChallengeStep";

const completeLoginChallengeSpy = vi.fn();

// The transport is the boundary: failure sorting and the screen's reaction to it stay real.
vi.mock("@theme/api/auth/signIn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@theme/api/auth/signIn")>()),
  completeLoginChallenge: (params: unknown) => completeLoginChallengeSpy(params)
}));

const FIVE_MINUTES = 5 * 60;

// The 202 body from the TDR's "Obtain token — MFA applies" example, dated from now so it is not
// already expired on arrival.
const totpDefaultChallenge: LoginChallenge = {
  challenge_id: "6d2f4c0e-3b1a-4b7e-9d1e-0f4c2a6b8e91",
  state: LOGIN_CHALLENGE_STATE.MFA_REQUIRED,
  expires_at: getCurrentUTCTimeInSec() + FIVE_MINUTES,
  user_email: "finops.ffc@example.com",
  methods: [totpMethod, emailMethod],
  default_method_id: totpMethod.id,
  code_sent: false,
  attempts_left: 5
};

const emailDefaultChallenge: LoginChallenge = {
  ...totpDefaultChallenge,
  methods: [
    { ...totpMethod, is_default: false },
    { ...emailMethod, is_default: true }
  ],
  default_method_id: emailMethod.id,
  code_sent: true
};

const renderAt = (challenge?: LoginChallenge) => {
  const { container, find, text, unmount } = renderWithProviders({
    initialEntry: { pathname: MFA_CHALLENGE, state: challenge ? { challenge } : undefined },
    routes: (
      <>
        <Route path={MFA_CHALLENGE} element={<MfaChallengeStep />} />
        <Route path={LOGIN} element={<div data-test-id="login_page" />} />
        <Route path={INITIALIZE} element={<div data-test-id="initialize_page" />} />
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
      const firstDigit = find("input_code_digit_0") as HTMLInputElement;
      const { set } = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!;

      await act(async () => {
        set!.call(firstDigit, code);
        firstDigit.dispatchEvent(new Event("input", { bubbles: true }));
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
    const screen = renderAt(totpDefaultChallenge);

    expect(screen.text("p_signing_in_as")).toContain("finops.ffc@example.com");

    screen.unmount();
  });

  it("offers a different method above the Verify button", () => {
    const screen = renderAt(totpDefaultChallenge);

    const useDifferentMethod = screen.find("btn_use_different_method")!;
    const verify = screen.find("btn_verify")!;

    expect(useDifferentMethod.compareDocumentPosition(verify) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    screen.unmount();
  });

  it("opens straight on the authenticator app when it is the default method", () => {
    const screen = renderAt(totpDefaultChallenge);

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
    const pendingMethod: MfaMethod = { ...emailMethod, id: "c3f5", confirmed: false };
    const screen = renderAt({ ...totpDefaultChallenge, methods: [...totpDefaultChallenge.methods, pendingMethod] });

    screen.click("btn_use_different_method");

    expect(screen.find(`mfa_method_option_${totpMethod.id}`)).not.toBeNull();
    expect(screen.find(`mfa_method_option_${emailMethod.id}`)).not.toBeNull();
    expect(screen.find(`mfa_method_option_${pendingMethod.id}`)).toBeNull();

    screen.unmount();
  });

  it("keeps the current method checked in the picker", () => {
    const screen = renderAt(totpDefaultChallenge);

    screen.click("btn_use_different_method");

    expect(screen.methodRadio(totpMethod.id)?.checked).toBe(true);

    screen.unmount();
  });

  it("switches the screen to the method picked from the list", () => {
    const screen = renderAt(totpDefaultChallenge);

    screen.click("btn_use_different_method");
    act(() => screen.methodRadio(emailMethod.id)!.click());
    screen.click("btn_use_selected_method");

    expect(screen.find("mfa_method_email")).not.toBeNull();
    expect(screen.find("mfa_method_totp")).toBeNull();

    screen.unmount();
  });

  it("asks the visitor to pick, with nothing checked, when there is no default", () => {
    const screen = renderAt({ ...totpDefaultChallenge, default_method_id: null });

    expect(screen.find("p_verify_your_identity")).not.toBeNull();
    expect(screen.methodRadio(totpMethod.id)?.checked).toBe(false);
    expect((screen.find("btn_use_selected_method") as HTMLButtonElement).disabled).toBe(true);

    screen.unmount();
  });

  it("hides the switch when there is only one method to use", () => {
    const screen = renderAt({ ...totpDefaultChallenge, methods: [totpMethod] });

    expect(screen.find("btn_use_different_method")).toBeNull();

    screen.unmount();
  });

  it("explains that sign-in cannot continue when no method is confirmed", () => {
    const screen = renderAt({ ...totpDefaultChallenge, methods: [{ ...totpMethod, confirmed: false }] });

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
    const screen = renderAt(totpDefaultChallenge);

    expect(screen.text("p_challenge_status")).toMatch(/^Expires in [45]:\d\d · 5 attempts left$/);

    screen.unmount();
  });

  it("sends the challenge, the method and the entered code", async () => {
    completeLoginChallengeSpy.mockReturnValue(new Promise(() => {}));
    const screen = renderAt(totpDefaultChallenge);

    await screen.enterCode("482913");
    await screen.verify();

    expect(completeLoginChallengeSpy).toHaveBeenCalledWith({
      challenge_id: totpDefaultChallenge.challenge_id,
      method_id: totpMethod.id,
      code: "482913"
    });

    screen.unmount();
  });

  it("keeps the form open after a wrong code, with a retryable error, an empty code and the attempts the service reports", async () => {
    rejectWith(403, AUTH_ERROR_CODE.INVALID_MFA_CODE, [4]);
    const screen = renderAt(totpDefaultChallenge);

    await screen.enterCode("000000");
    await screen.verify();

    expect(screen.text("p_code_error")).toBe("That code is incorrect. Check it and try again.");
    expect(screen.digits()).toBe("");
    expect(screen.text("p_attempts_left")).toBe("4 attempts left");
    expect(screen.find("p_challenge_ended")).toBeNull();

    screen.unmount();
  });

  it("ends the challenge when the last attempt is spent, and offers a fresh sign-in for the same address", async () => {
    rejectWith(403, AUTH_ERROR_CODE.MFA_ATTEMPTS_EXCEEDED);
    const screen = renderAt(totpDefaultChallenge);

    await screen.enterCode("000000");
    await screen.verify();

    expect(screen.text("p_challenge_ended")).toContain("Too many incorrect codes");
    // The ended view only renders once the challenge is gone from router state.
    expect(screen.find("input_code_digit_0")).toBeNull();
    expect(screen.find("btn_sign_in_again")?.closest("a")?.getAttribute("href")).toBe(
      `${LOGIN}?email=${encodeURIComponent(totpDefaultChallenge.user_email)}`
    );

    screen.unmount();
  });

  it("ends an expired, consumed or unknown challenge the service answers 404 for", async () => {
    rejectWith(404, AUTH_ERROR_CODE.LOGIN_CHALLENGE_NOT_FOUND);
    const screen = renderAt(totpDefaultChallenge);

    await screen.enterCode("482913");
    await screen.verify();

    expect(screen.text("p_challenge_ended")).toContain("expired or is no longer valid");
    expect(screen.text("p_signing_in_as")).toContain(totpDefaultChallenge.user_email);

    screen.unmount();
  });

  it("ends the challenge on its own when the countdown runs out", () => {
    vi.useFakeTimers();
    const screen = renderAt({ ...totpDefaultChallenge, expires_at: getCurrentUTCTimeInSec() + 2 });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.text("p_challenge_ended")).toContain("expired or is no longer valid");

    screen.unmount();
  });

  it("keeps the entered code after an unexpected failure, since nothing says the challenge is spent", async () => {
    completeLoginChallengeSpy.mockRejectedValue(new TypeError("Failed to fetch"));
    const screen = renderAt(totpDefaultChallenge);

    await screen.enterCode("482913");
    await screen.verify();

    expect(screen.find("p_code_error")).not.toBeNull();
    expect(screen.digits()).toBe("482913");
    expect(screen.find("p_challenge_ended")).toBeNull();

    screen.unmount();
  });

  it("signs in and moves on once the code is accepted", async () => {
    completeLoginChallengeSpy.mockResolvedValue({
      token:
        "MDAxNmxvY2F0aW9uIG9wdHNjYWxlCjAwMzRpZGVudGlmaWVyIDljMmExZjNlLTViNDctNGEyMS04ZjBjLTFkNmU4YjNhN2M0MgowMDExY2lkIG1mYTpub25lCjAwMmZzaWduYXR1cmUgrrkLrCmb0VcdYWsrr-lUxd9rs-V-iq_yANUMhSBaeHIK",
      user_id: "9c2a1f3e-5b47-4a21-8f0c-1d6e8b3a7c42",
      user_email: totpDefaultChallenge.user_email,
      created_at: "2026-09-22T09:00:00",
      valid_until: "2026-09-29T09:00:00",
      ip: "127.0.0.1",
      digest: "f0a1b2c3d4e5f60718293a4b5c6d7e8f"
    });
    const screen = renderAt(totpDefaultChallenge);

    await screen.enterCode("123456");
    await screen.verify();

    expect(screen.find("initialize_page")).not.toBeNull();

    screen.unmount();
  });
});
