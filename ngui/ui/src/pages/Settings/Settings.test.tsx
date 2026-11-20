import { Route } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "tests/renderWithProviders";
import { SETTINGS } from "urls";
import Settings from "./Settings";

const isFeatureEnabledSpy = vi.fn<() => boolean>();

// Each tab's content has its own spec or is upstream's; this one is about the Security tab being there.
vi.mock("components/OrganizationMfaPolicy", () => ({ default: () => <div data-test-id="stub_mfa_policy" /> }));
vi.mock("components/OrganizationSettings", () => ({ default: () => <div data-test-id="stub_organization" /> }));
vi.mock("components/BillingSubscription", () => ({ default: () => null }));
vi.mock("containers/InvitationsContainer", () => ({ default: () => null }));
vi.mock("containers/UserEmailNotificationSettingsContainer", () => ({ default: () => null }));
vi.mock("hooks/useOrganizationInfo", () => ({ useOrganizationInfo: () => ({ isDemo: false }) }));
vi.mock("hooks/useIsMfaLoginEnabled", () => ({
  useIsMfaLoginEnabled: () => isFeatureEnabledSpy()
}));

let rendered: ReturnType<typeof renderWithProviders> | null = null;

const renderAt = (search: string) => {
  rendered = renderWithProviders({
    initialEntry: `${SETTINGS}${search}`,
    routes: <Route path={SETTINGS} element={<Settings />} />
  });
  return rendered;
};

describe("Settings", () => {
  beforeEach(() => {
    isFeatureEnabledSpy.mockReturnValue(true);
  });

  afterEach(() => {
    rendered?.unmount();
    rendered = null;
  });

  it("opens the Security tab the URL names while mfa_login is on", () => {
    const page = renderAt("?tab=security");

    expect(page.find("tab_security")).not.toBeNull();
    expect(page.find("stub_mfa_policy")).not.toBeNull();
  });

  it("has no Security tab while mfa_login is off, and falls back to Organization", () => {
    isFeatureEnabledSpy.mockReturnValue(false);

    const page = renderAt("?tab=security");

    expect(page.find("tab_security")).toBeNull();
    expect(page.find("stub_mfa_policy")).toBeNull();
    expect(page.find("stub_organization")).not.toBeNull();
  });
});
