import { act } from "react-dom/test-utils";
import { Route } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AUTH_POLICY_PURPOSE, AUTH_POLICY_SCOPE_TYPE, AuthPolicy } from "api/auth/authPolicies";
import { click, find } from "tests/dom";
import { renderWithProviders } from "tests/renderWithProviders";
import OrganizationMfaPolicy from "./OrganizationMfaPolicy";

const ORGANIZATION_ID = "org-1";

const listAuthPoliciesSpy = vi.fn<() => Promise<AuthPolicy[]>>();
const createAuthPolicySpy = vi.fn();
const deleteAuthPolicySpy = vi.fn();
const isManagerSpy = vi.fn(() => true);

// The policy endpoints are the boundary; the section, its hook and the confirmation stay real.
vi.mock("api/auth/authPolicies", async (importOriginal) => ({
  ...(await importOriginal<typeof import("api/auth/authPolicies")>()),
  listAuthPolicies: () => listAuthPoliciesSpy(),
  createAuthPolicy: (params: unknown) => createAuthPolicySpy(params),
  deleteAuthPolicy: (params: unknown) => deleteAuthPolicySpy(params),
}));

// The organization and the role come from the app's core-data cache, which the spec does not load.
vi.mock("hooks/useOrganizationInfo", () => ({ useOrganizationInfo: () => ({ organizationId: ORGANIZATION_ID }) }));
vi.mock("hooks/useAllowedActions", () => ({ useIsAllowed: () => isManagerSpy() }));

const MFA_POLICY: AuthPolicy = {
  id: "policy-1",
  scope_type: AUTH_POLICY_SCOPE_TYPE.ORGANIZATION,
  scope_id: ORGANIZATION_ID,
  purpose: AUTH_POLICY_PURPOSE.MFA,
  created_at: 1_758_480_000,
  deleted_at: 0,
};

const SSO_POLICY: AuthPolicy = { ...MFA_POLICY, id: "policy-2", purpose: AUTH_POLICY_PURPOSE.SSO };

let rendered: ReturnType<typeof renderWithProviders> | null = null;

const renderSection = async () => {
  rendered = renderWithProviders({ initialEntry: "/", routes: <Route path="/" element={<OrganizationMfaPolicy />} /> });
  await act(async () => {});
};

const enforceSwitch = () => find("switch_enforce_mfa") as HTMLInputElement;

describe("OrganizationMfaPolicy", () => {
  beforeEach(() => {
    isManagerSpy.mockReturnValue(true);
  });

  afterEach(() => {
    rendered?.unmount();
    rendered = null;
    vi.resetAllMocks();
  });

  it("shows a spinner until the policies arrive", () => {
    listAuthPoliciesSpy.mockReturnValue(new Promise(() => {}));

    rendered = renderWithProviders({ initialEntry: "/", routes: <Route path="/" element={<OrganizationMfaPolicy />} /> });

    expect(find("mfa_policy_loading")).not.toBeNull();
    expect(enforceSwitch()).toBeNull();
  });

  it("is off while the organization has no MFA policy, whatever other policies it has", async () => {
    listAuthPoliciesSpy.mockResolvedValue([SSO_POLICY]);

    await renderSection();

    expect(enforceSwitch().checked).toBe(false);
  });

  it("is on while the organization has an MFA policy", async () => {
    listAuthPoliciesSpy.mockResolvedValue([MFA_POLICY]);

    await renderSection();

    expect(enforceSwitch().checked).toBe(true);
  });

  it("lets a manager change the setting", async () => {
    listAuthPoliciesSpy.mockResolvedValue([]);

    await renderSection();

    expect(enforceSwitch().disabled).toBe(false);
    expect(find("p_mfa_policy_manager_only")).toBeNull();
  });

  it("shows the state to a member who is not a manager, without letting them change it", async () => {
    isManagerSpy.mockReturnValue(false);
    listAuthPoliciesSpy.mockResolvedValue([MFA_POLICY]);

    await renderSection();

    expect(enforceSwitch().checked).toBe(true);
    expect(enforceSwitch().disabled).toBe(true);
    expect(find("p_mfa_policy_manager_only")).not.toBeNull();
  });

  it("creates the organization's MFA policy only after the confirmation, then shows what the service holds", async () => {
    listAuthPoliciesSpy.mockResolvedValueOnce([]).mockResolvedValue([MFA_POLICY]);
    createAuthPolicySpy.mockResolvedValue(MFA_POLICY);
    await renderSection();

    await click("switch_enforce_mfa");

    expect(find("title_change_mfa_enforcement")?.textContent).toBe("Enforce MFA for the organization?");
    expect(createAuthPolicySpy).not.toHaveBeenCalled();

    await click("btn_confirm_mfa_enforcement");

    expect(createAuthPolicySpy).toHaveBeenCalledWith(
      expect.objectContaining({
        scope_type: AUTH_POLICY_SCOPE_TYPE.ORGANIZATION,
        scope_id: ORGANIZATION_ID,
        purpose: AUTH_POLICY_PURPOSE.MFA,
      })
    );
    expect(enforceSwitch().checked).toBe(true);
  });

  it("deletes the MFA policy only after the confirmation", async () => {
    listAuthPoliciesSpy.mockResolvedValueOnce([MFA_POLICY, SSO_POLICY]).mockResolvedValue([SSO_POLICY]);
    deleteAuthPolicySpy.mockResolvedValue(undefined);
    await renderSection();

    await click("switch_enforce_mfa");

    expect(find("title_change_mfa_enforcement")?.textContent).toBe("Stop enforcing MFA?");
    expect(deleteAuthPolicySpy).not.toHaveBeenCalled();

    await click("btn_confirm_mfa_enforcement");

    expect(deleteAuthPolicySpy).toHaveBeenCalledWith(expect.objectContaining({ policyId: MFA_POLICY.id }));
    expect(enforceSwitch().checked).toBe(false);
  });

  it("changes nothing when the confirmation is cancelled", async () => {
    listAuthPoliciesSpy.mockResolvedValue([]);
    await renderSection();

    await click("switch_enforce_mfa");
    await click("btn_cancel_mfa_enforcement");

    expect(createAuthPolicySpy).not.toHaveBeenCalled();
    expect(enforceSwitch().checked).toBe(false);
  });

  it("says when the change failed and reloads, since another manager may have made it first", async () => {
    listAuthPoliciesSpy.mockResolvedValueOnce([]).mockResolvedValue([MFA_POLICY]);
    createAuthPolicySpy.mockRejectedValue(new Error("409"));
    await renderSection();

    await click("switch_enforce_mfa");
    await click("btn_confirm_mfa_enforcement");

    expect(find("p_mfa_policy_change_error")).not.toBeNull();
    expect(listAuthPoliciesSpy).toHaveBeenCalledTimes(2);
    expect(enforceSwitch().checked).toBe(true);
  });

  it("shows an error with Retry when the policies cannot be loaded, and the switch once Retry works", async () => {
    listAuthPoliciesSpy.mockRejectedValueOnce(new Error("500")).mockResolvedValue([MFA_POLICY]);

    await renderSection();

    expect(find("p_mfa_policy_error")).not.toBeNull();
    expect(enforceSwitch()).toBeNull();

    await click("btn_retry_mfa_policy");

    expect(find("p_mfa_policy_error")).toBeNull();
    expect(enforceSwitch().checked).toBe(true);
  });
});
