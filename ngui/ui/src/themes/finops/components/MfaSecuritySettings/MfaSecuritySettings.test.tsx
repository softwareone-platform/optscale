import { act } from "react-dom/test-utils";
import { Route } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MFA_METHOD_TYPE } from "@theme/api/auth/mfaMethod";
import { MfaMethodDetails, MfaStatus } from "@theme/api/auth/mfaMethods";
import { click, find } from "@theme/tests/dom";
import { renderWithProviders } from "@theme/tests/renderWithProviders";
import { typeInto } from "@theme/tests/typeInto";
import MfaSecuritySettings from "./MfaSecuritySettings";

const getMfaStatusSpy = vi.fn<() => Promise<MfaStatus>>();
const organizationsSpy = vi.fn(() => [] as { id: string; name: string }[]);
const startMfaEnrollmentSpy = vi.fn();
const confirmMfaEnrollmentSpy = vi.fn();
const updateMfaMethodSpy = vi.fn();
const deleteMfaMethodSpy = vi.fn();

// The methods endpoints are the boundary; the section, its hook and the add dialog stay real.
vi.mock("@theme/api/auth/mfaMethods", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@theme/api/auth/mfaMethods")>()),
  getMfaStatus: () => getMfaStatusSpy(),
  startMfaEnrollment: (params: unknown) => startMfaEnrollmentSpy(params),
  confirmMfaEnrollment: (params: unknown) => confirmMfaEnrollmentSpy(params),
  updateMfaMethod: (params: unknown) => updateMfaMethodSpy(params),
  deleteMfaMethod: (params: unknown) => deleteMfaMethodSpy(params)
}));

// The organizations come from the app's core-data cache, which the spec does not load.
vi.mock("hooks/coreData/useOrganizations", () => ({ useOrganizations: () => organizationsSpy() }));

const TOTP: MfaMethodDetails = {
  id: "a1d3",
  user_id: "9c2a",
  type: MFA_METHOD_TYPE.TOTP,
  label: "Configured on Google Pixel 10 Pro",
  is_default: true,
  confirmed: true,
  confirmed_at: 1_758_480_120,
  created_at: 1_758_480_000,
  deleted_at: 0
};

const EMAIL: MfaMethodDetails = {
  ...TOTP,
  id: "b2e4",
  type: MFA_METHOD_TYPE.EMAIL,
  label: "fi***@example.com",
  is_default: false
};

const status = (methods: MfaMethodDetails[], mfaEnforced = false): MfaStatus => ({
  methods,
  mfa_enforced: mfaEnforced,
  enforcing_organizations: mfaEnforced ? ["4f1e"] : [],
  status: methods.length > 0 ? "configured" : "not_configured"
});

let rendered: ReturnType<typeof renderWithProviders> | null = null;

const renderSection = async () => {
  rendered = renderWithProviders({ initialEntry: "/", routes: <Route path="/" element={<MfaSecuritySettings />} /> });
  await act(async () => {});
};

describe("MfaSecuritySettings", () => {
  afterEach(() => {
    rendered?.unmount();
    rendered = null;
    vi.clearAllMocks();
  });

  it("shows a spinner until the methods arrive", () => {
    getMfaStatusSpy.mockReturnValue(new Promise(() => {}));

    rendered = renderWithProviders({ initialEntry: "/", routes: <Route path="/" element={<MfaSecuritySettings />} /> });

    expect(find("mfa_methods_loading")).not.toBeNull();
  });

  it("offers Enable MFA when nothing is set up", async () => {
    getMfaStatusSpy.mockResolvedValue(status([]));

    await renderSection();

    expect(find("btn_enable_mfa")).not.toBeNull();
    expect(find("mfa_method_card_totp")).toBeNull();
  });

  it("lists each method, marks the default, and offers adding another", async () => {
    getMfaStatusSpy.mockResolvedValue(status([TOTP, EMAIL]));

    await renderSection();

    expect(find("mfa_method_card_totp")?.textContent).toContain(TOTP.label);
    expect(find("mfa_method_card_email")?.textContent).toContain(EMAIL.label);
    expect(find("chip_default_mfa_method_totp")).not.toBeNull();
    expect(find("chip_default_mfa_method_email")).toBeNull();
    expect(find("btn_add_mfa_method")).not.toBeNull();
  });

  it("says when an organization requires MFA", async () => {
    getMfaStatusSpy.mockResolvedValue(status([TOTP], true));

    await renderSection();

    expect(find("p_mfa_enforced")).not.toBeNull();
  });

  it("names the enforcing organizations in a tooltip on the note, as the TDR's MfaStatus intends", async () => {
    organizationsSpy.mockReturnValue([
      { id: "4f1e", name: "Acme Cloud" },
      { id: "9b2c", name: "Other Org" }
    ]);
    getMfaStatusSpy.mockResolvedValue(status([TOTP], true));
    await renderSection();

    await act(async () => {
      find("mfa_enforced_note")!.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
      await new Promise((resolve) => setTimeout(resolve, 150));
    });

    expect(document.querySelector("[role='tooltip']")?.textContent).toBe("Required by Acme Cloud");
  });

  it("shows an error with Retry when the methods cannot be loaded, and the list once Retry works", async () => {
    getMfaStatusSpy.mockRejectedValueOnce(new Error("500")).mockResolvedValue(status([TOTP]));

    await renderSection();

    expect(find("p_mfa_methods_error")).not.toBeNull();

    await click("btn_retry_mfa_methods");

    expect(find("p_mfa_methods_error")).toBeNull();
    expect(find("mfa_method_card_totp")).not.toBeNull();
  });

  it("does not offer a type that is already set up when adding", async () => {
    getMfaStatusSpy.mockResolvedValue(status([TOTP]));
    await renderSection();

    await click("btn_add_mfa_method");

    expect(find("btn_choose_mfa_method_totp")?.hasAttribute("disabled")).toBe(true);
  });

  it("reloads the list once a method is added", async () => {
    getMfaStatusSpy.mockResolvedValueOnce(status([])).mockResolvedValue(status([EMAIL]));
    startMfaEnrollmentSpy.mockResolvedValue({ ...EMAIL, confirmed: false });
    confirmMfaEnrollmentSpy.mockResolvedValue(EMAIL);
    await renderSection();

    await click("btn_enable_mfa");
    await click("btn_choose_mfa_method_email");
    await click("btn_mfa_setup_send_code");
    act(() => {
      typeInto(find("input_code_digit_0") as HTMLInputElement, "123456");
    });
    await click("btn_verify_mfa_method");

    expect(getMfaStatusSpy).toHaveBeenCalledTimes(2);
    expect(find("mfa_method_card_email")).not.toBeNull();
  });

  describe("the … menu", () => {
    it("sets another method as the default and shows the list the service then returns", async () => {
      getMfaStatusSpy.mockResolvedValueOnce(status([TOTP, EMAIL])).mockResolvedValue(
        status([
          { ...TOTP, is_default: false },
          { ...EMAIL, is_default: true }
        ])
      );
      updateMfaMethodSpy.mockResolvedValue({ ...EMAIL, is_default: true });
      await renderSection();

      await click("btn_mfa_method_actions_email");
      await click("btn_set_default_mfa_method_email");

      expect(updateMfaMethodSpy).toHaveBeenCalledWith(expect.objectContaining({ methodId: EMAIL.id, is_default: true }));
      expect(find("chip_default_mfa_method_email")).not.toBeNull();
      expect(find("chip_default_mfa_method_totp")).toBeNull();
    });

    it("offers no Set as default on the method that already is", async () => {
      getMfaStatusSpy.mockResolvedValue(status([TOTP, EMAIL]));
      await renderSection();

      await click("btn_mfa_method_actions_totp");

      expect(find("btn_set_default_mfa_method_totp")).toBeNull();
    });

    it("removes a method only after the confirmation", async () => {
      getMfaStatusSpy.mockResolvedValueOnce(status([TOTP, EMAIL])).mockResolvedValue(status([TOTP]));
      deleteMfaMethodSpy.mockResolvedValue(undefined);
      await renderSection();

      await click("btn_mfa_method_actions_email");
      await click("btn_remove_mfa_method_email");

      expect(deleteMfaMethodSpy).not.toHaveBeenCalled();
      expect(find("smodal_remove_mfa_method")).not.toBeNull();
      expect(find("title_remove_mfa_method")?.textContent).toBe("Remove E-mail verification code?");

      await click("btn_confirm_remove_mfa_method");

      expect(deleteMfaMethodSpy).toHaveBeenCalledWith(expect.objectContaining({ methodId: EMAIL.id }));
      expect(find("mfa_method_card_email")).toBeNull();
    });

    it("keeps the method when the removal is cancelled", async () => {
      getMfaStatusSpy.mockResolvedValue(status([TOTP, EMAIL]));
      await renderSection();

      await click("btn_mfa_method_actions_email");
      await click("btn_remove_mfa_method_email");
      await click("btn_cancel_remove_mfa_method");

      expect(deleteMfaMethodSpy).not.toHaveBeenCalled();
      expect(find("mfa_method_card_email")).not.toBeNull();
    });

    it("does not let the only method go while the organization enforces MFA", async () => {
      getMfaStatusSpy.mockResolvedValue(status([TOTP], true));
      await renderSection();

      await click("btn_mfa_method_actions_totp");

      expect(find("btn_remove_mfa_method_totp")?.getAttribute("aria-disabled")).toBe("true");
      expect(find("btn_remove_mfa_method_totp")?.textContent).toContain("only method cannot be removed");
    });

    it("says when a change could not be saved and keeps the list as it was", async () => {
      getMfaStatusSpy.mockResolvedValue(status([TOTP, EMAIL]));
      updateMfaMethodSpy.mockRejectedValue(new Error("500"));
      await renderSection();

      await click("btn_mfa_method_actions_email");
      await click("btn_set_default_mfa_method_email");

      expect(find("p_mfa_action_error")).not.toBeNull();
      expect(find("chip_default_mfa_method_totp")).not.toBeNull();
    });
  });
});
