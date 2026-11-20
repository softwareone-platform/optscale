import { ComponentProps } from "react";
import { act } from "react-dom/test-utils";
import { Route } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AUTH_ERROR_CODE, AuthApiError } from "api/auth/errors";
import { MFA_METHOD_TYPE } from "api/auth/mfaMethod";
import { MfaEnrollment, MfaMethodDetails } from "api/auth/mfaMethods";
import { click, find } from "tests/dom";
import { renderWithProviders } from "tests/renderWithProviders";
import { typeInto } from "tests/typeInto";
import AddMfaMethod from "./AddMfaMethod";

const TOTP_ENROLLMENT: MfaEnrollment = {
  id: "c3f6",
  user_id: "9c2a",
  type: MFA_METHOD_TYPE.TOTP,
  label: null,
  is_default: false,
  confirmed: false,
  confirmed_at: 0,
  created_at: 1_758_480_000,
  deleted_at: 0,
  secret: "JBSWY3DPEHPK3PXP",
  otpauth_uri: "otpauth://totp/FinOps%20for%20Cloud:reto?secret=JBSWY3DPEHPK3PXP&issuer=FinOps%20for%20Cloud"
};

const EMAIL_ENROLLMENT: MfaEnrollment = {
  id: "d7b2",
  user_id: "9c2a",
  type: MFA_METHOD_TYPE.EMAIL,
  label: "re***@example.com",
  is_default: false,
  confirmed: false,
  confirmed_at: 0,
  created_at: 1_758_480_000,
  deleted_at: 0
};

const confirmed = ({ secret: _secret, otpauth_uri: _otpauthUri, ...method }: MfaEnrollment): MfaMethodDetails => ({
  ...method,
  confirmed: true,
  is_default: true
});

const authError = (status: number, errorCode: string) => new AuthApiError({ status, errorCode, reason: "" });

const start = vi.fn<(type: string) => Promise<MfaEnrollment>>();
const confirm = vi.fn<(params: { methodId: string; code: string }) => Promise<MfaMethodDetails>>();
const onConfirmed = vi.fn();
const onClose = vi.fn();

const flush = () => act(async () => {});

const typeCode = (code: string) =>
  act(() => {
    typeInto(find("input_code_digit_0") as HTMLInputElement, code);
  });

let rendered: ReturnType<typeof renderWithProviders> | null = null;

const renderAddMfaMethod = (props: Partial<ComponentProps<typeof AddMfaMethod>> = {}) => {
  rendered = renderWithProviders({
    initialEntry: "/",
    routes: (
      <Route
        path="/"
        element={
          <AddMfaMethod
            onClose={onClose}
            onConfirmed={onConfirmed}
            confirmedTypes={[]}
            accountEmail="reto.mayer@example.com"
            calls={{ start, confirm }}
            {...props}
          />
        }
      />
    )
  });
};

describe("AddMfaMethod", () => {
  beforeEach(() => {
    start.mockImplementation(async (type) => (type === MFA_METHOD_TYPE.TOTP ? TOTP_ENROLLMENT : EMAIL_ENROLLMENT));
    confirm.mockImplementation(async ({ methodId }) =>
      confirmed(methodId === TOTP_ENROLLMENT.id ? TOTP_ENROLLMENT : EMAIL_ENROLLMENT)
    );
  });

  // Here rather than in each test: a test that fails early would leave its dialog on document.body for the next.
  afterEach(() => {
    rendered?.unmount();
    rendered = null;
    vi.clearAllMocks();
  });

  describe("choosing a method", () => {
    it("offers both methods", () => {
      renderAddMfaMethod();

      expect(find("btn_choose_mfa_method_totp")).not.toBeNull();
      expect(find("btn_choose_mfa_method_email")).not.toBeNull();
    });

    it("does not let a type that is already set up be added again", () => {
      renderAddMfaMethod({ confirmedTypes: [MFA_METHOD_TYPE.TOTP] });

      expect(find("btn_choose_mfa_method_totp")?.hasAttribute("disabled")).toBe(true);
      expect(find("chip_mfa_method_set_up_totp")).not.toBeNull();
      expect(find("btn_choose_mfa_method_email")?.hasAttribute("disabled")).toBe(false);
    });

    it("starts nothing until a method is chosen", () => {
      renderAddMfaMethod();

      expect(start).not.toHaveBeenCalled();
    });
  });

  describe("authenticator app", () => {
    const openAuthenticatorApp = async () => {
      renderAddMfaMethod();
      await click("btn_choose_mfa_method_totp");
      await flush();
    };

    it("starts the enrollment and shows the QR code and the manual key", async () => {
      await openAuthenticatorApp();

      expect(start).toHaveBeenCalledWith(MFA_METHOD_TYPE.TOTP);
      expect(find("img_mfa_qr_code")).not.toBeNull();
      expect(find("p_mfa_secret")?.textContent).toBe(TOTP_ENROLLMENT.secret);
    });

    it("confirms the method with the entered code", async () => {
      await openAuthenticatorApp();

      typeCode("123456");
      await click("btn_verify_mfa_method");

      expect(confirm).toHaveBeenCalledWith({ methodId: TOTP_ENROLLMENT.id, code: "123456" });
      expect(onConfirmed).toHaveBeenCalledWith(expect.objectContaining({ id: TOTP_ENROLLMENT.id, confirmed: true }));
      expect(onClose).toHaveBeenCalledOnce();
    });

    it("names the step it is on and leaves on Cancel", async () => {
      await openAuthenticatorApp();

      expect(find("p_mfa_setup_title")?.textContent).toBe("Set up authenticator app");

      await click("btn_cancel_add_mfa_method");

      expect(onClose).toHaveBeenCalledOnce();
      expect(confirm).not.toHaveBeenCalled();
    });

    it("stays for another try after a wrong code, with the code entry emptied", async () => {
      confirm.mockRejectedValueOnce(authError(403, AUTH_ERROR_CODE.INVALID_AUTHENTICATION_CODE));
      await openAuthenticatorApp();

      typeCode("000000");
      await click("btn_verify_mfa_method");

      expect(find("p_mfa_setup_error")).not.toBeNull();
      expect((find("input_code_digit_0") as HTMLInputElement).value).toBe("");
      expect(find("img_mfa_qr_code")).not.toBeNull();
      expect(onConfirmed).not.toHaveBeenCalled();
    });

    it("counts no attempts for a signed-in user, whose wrong codes are not limited", async () => {
      confirm.mockRejectedValueOnce(authError(403, AUTH_ERROR_CODE.INVALID_AUTHENTICATION_CODE));
      await openAuthenticatorApp();

      typeCode("000000");
      await click("btn_verify_mfa_method");

      expect(find("p_mfa_setup_attempts_left")).toBeNull();
    });

    it("drops the dead QR code once the setup expires and starts a new one on request", async () => {
      confirm.mockRejectedValueOnce(authError(404, AUTH_ERROR_CODE.NOT_FOUND));
      await openAuthenticatorApp();

      typeCode("123456");
      await click("btn_verify_mfa_method");

      expect(find("img_mfa_qr_code")).toBeNull();

      await click("btn_mfa_setup_start_again");

      expect(start).toHaveBeenCalledTimes(2);
      expect(find("img_mfa_qr_code")).not.toBeNull();
    });
  });

  describe("e-mail code", () => {
    const openEmailCode = async () => {
      renderAddMfaMethod();
      await click("btn_choose_mfa_method_email");
    };

    it("shows the account's address and sends nothing until asked", async () => {
      await openEmailCode();

      expect((find("input_mfa_setup_email") as HTMLInputElement).value).toBe("reto.mayer@example.com");
      expect(start).not.toHaveBeenCalled();
      expect((find("input_code_digit_0") as HTMLInputElement).disabled).toBe(true);
    });

    it("sends the code, then takes it for confirmation", async () => {
      await openEmailCode();

      await click("btn_mfa_setup_send_code");
      const codeSentText = find("p_mfa_setup_code_sent")?.textContent;
      typeCode("123456");
      await click("btn_verify_mfa_method");

      expect(codeSentText).toContain(EMAIL_ENROLLMENT.label);
      expect(confirm).toHaveBeenCalledWith({ methodId: EMAIL_ENROLLMENT.id, code: "123456" });
    });

    it("keeps the sent code usable when a resend is refused within the minute", async () => {
      await openEmailCode();
      await click("btn_mfa_setup_send_code");
      start.mockRejectedValueOnce(authError(403, AUTH_ERROR_CODE.CODE_REQUESTED_TOO_SOON));

      await click("btn_mfa_setup_send_code_again");

      expect(find("p_mfa_setup_error")).not.toBeNull();
      expect((find("input_code_digit_0") as HTMLInputElement).disabled).toBe(false);
    });

    it("says the e-mail could not be sent while the service is down, apart from a generic failure", async () => {
      start.mockRejectedValueOnce(authError(503, AUTH_ERROR_CODE.SERVICE_UNAVAILABLE));
      await openEmailCode();

      await click("btn_mfa_setup_send_code");

      expect(find("p_mfa_setup_error")?.textContent).toBe(
        "The e-mail could not be sent right now. Try again in a few minutes."
      );
    });
  });
});
