import { act } from "react-dom/test-utils";
import { Route, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AuthUser, UpdateUserPasswordParams } from "api/auth/users";
import { click, find } from "tests/dom";
import { renderWithProviders } from "tests/renderWithProviders";
import { typeInto } from "tests/typeInto";
import { PASSWORD_RECOVERY } from "urls";
import { clearPasswordChangedNotice, isPasswordChangedNoticePending } from "utils/passwordChangedNotice";
import PasswordSecuritySettings from "./PasswordSecuritySettings";

const updateUserPasswordSpy = vi.fn<(params: UpdateUserPasswordParams) => Promise<AuthUser>>();
const signOutSpy = vi.fn();
const isCurrentPasswordCheckEnabledSpy = vi.fn(() => false);

vi.mock("api/auth/users", () => ({ updateUserPassword: (params: UpdateUserPasswordParams) => updateUserPasswordSpy(params) }));
// The real sign-out resets the store and redirects; the spec's store is a stub, so only the call is observable.
vi.mock("hooks/useSignOut", () => ({ useSignOut: () => signOutSpy }));
vi.mock("hooks/useIsCurrentPasswordCheckEnabled", () => ({
  useIsCurrentPasswordCheckEnabled: () => isCurrentPasswordCheckEnabledSpy(),
}));
vi.mock("hooks/useGetToken", () => ({
  useGetToken: () => ({ token: "MDAxY", userId: "9c2a", userEmail: "finops.ffc@example.com" }),
}));

const PasswordRecoveryStandIn = () => <div data-test-id="stub_password_recovery">{useLocation().search}</div>;

let rendered: ReturnType<typeof renderWithProviders> | null = null;

const openChangePassword = async () => {
  rendered = renderWithProviders({
    initialEntry: "/",
    routes: (
      <>
        <Route path="/" element={<PasswordSecuritySettings />} />
        <Route path={PASSWORD_RECOVERY} element={<PasswordRecoveryStandIn />} />
      </>
    ),
  });
  await click("btn_change_password");
};

const fillIn = async ({
  current = "0ld-Passw0rd",
  next = "n3w-Passw0rd",
  confirmation = next,
}: { current?: string; next?: string; confirmation?: string } = {}) => {
  await act(async () => {
    typeInto(find("input_current_password") as HTMLInputElement, current);
    typeInto(find("input_new_password") as HTMLInputElement, next);
    typeInto(find("input_confirm_password") as HTMLInputElement, confirmation);
  });
};

describe("PasswordSecuritySettings", () => {
  afterEach(() => {
    rendered?.unmount();
    rendered = null;
    clearPasswordChangedNotice();
    vi.clearAllMocks();
  });

  it("opens Change password in a side modal", async () => {
    await openChangePassword();

    expect(find("smodal_change_password")).not.toBeNull();
    expect(find("input_current_password")).not.toBeNull();
  });

  it("does not send a new password its confirmation does not match", async () => {
    await openChangePassword();
    await fillIn({ confirmation: "n3w-Passw0rd-typo" });

    await click("btn_save_password");

    expect(updateUserPasswordSpy).not.toHaveBeenCalled();
  });

  it("sends only the new password while the service does not check the current one", async () => {
    updateUserPasswordSpy.mockResolvedValue({ id: "9c2a" } as AuthUser);
    await openChangePassword();
    await fillIn();

    await click("btn_save_password");

    expect(updateUserPasswordSpy).toHaveBeenCalledWith({
      token: "MDAxY",
      userId: "9c2a",
      password: "n3w-Passw0rd",
      currentPassword: undefined,
    });
  });

  it("sends the current password too once the service checks it", async () => {
    isCurrentPasswordCheckEnabledSpy.mockReturnValue(true);
    updateUserPasswordSpy.mockResolvedValue({ id: "9c2a" } as AuthUser);
    await openChangePassword();
    await fillIn();

    await click("btn_save_password");

    expect(updateUserPasswordSpy).toHaveBeenCalledWith(expect.objectContaining({ currentPassword: "0ld-Passw0rd" }));
  });

  it("signs out after the change, leaving the login page a notice, as the session's token no longer works", async () => {
    updateUserPasswordSpy.mockResolvedValue({ id: "9c2a" } as AuthUser);
    await openChangePassword();
    await fillIn();

    await click("btn_save_password");

    expect(signOutSpy).toHaveBeenCalledTimes(1);
    expect(isPasswordChangedNoticePending()).toBe(true);
  });

  it("keeps the session and says so when the change fails", async () => {
    updateUserPasswordSpy.mockRejectedValue(new Error("400"));
    await openChangePassword();
    await fillIn();

    await click("btn_save_password");

    expect(find("p_change_password_error")).not.toBeNull();
    expect(signOutSpy).not.toHaveBeenCalled();
    expect(isPasswordChangedNoticePending()).toBe(false);
  });

  it("is on the recovery page, with the address, before Forgot password ends the session", async () => {
    let recoveryPageAtSignOut: string | null | undefined = null;
    signOutSpy.mockImplementation(() => {
      recoveryPageAtSignOut = find("stub_password_recovery")?.textContent;
    });
    await openChangePassword();

    await click("btn_forgot_password");

    expect(recoveryPageAtSignOut).toBe("?email=finops.ffc%40example.com");
  });
});
