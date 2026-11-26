import { Route } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "tests/renderWithProviders";
import { PROFILE } from "urls";
import Profile from "./Profile";

// Each tab's content has its own spec; this one is about which tab the URL opens.
vi.mock("components/MfaSecuritySettings", () => ({ default: () => <div data-test-id="stub_mfa_security" /> }));
vi.mock("components/PasswordSecuritySettings", () => ({ default: () => <div data-test-id="stub_password_security" /> }));
vi.mock("./ProfileOverview", () => ({ default: () => <div data-test-id="stub_profile_overview" /> }));

let rendered: ReturnType<typeof renderWithProviders> | null = null;

const renderAt = (search: string) => {
  rendered = renderWithProviders({
    initialEntry: `${PROFILE}${search}`,
    routes: <Route path={PROFILE} element={<Profile />} />,
  });
  return rendered;
};

describe("Profile", () => {
  afterEach(() => {
    rendered?.unmount();
    rendered = null;
  });

  it("opens on Overview", () => {
    const page = renderAt("");

    expect(page.find("stub_profile_overview")).not.toBeNull();
    expect(page.find("stub_mfa_security")).toBeNull();
  });

  it("opens the Security tab the URL names, so a reload or a shared link lands on it", () => {
    const page = renderAt("?tab=security");

    expect(page.find("stub_password_security")).not.toBeNull();
    expect(page.find("stub_mfa_security")).not.toBeNull();
  });
});
