import { act } from "react-dom/test-utils";
import { Route } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MFA_METHOD_TYPE } from "@theme/api/auth/mfaMethod";
import { MfaStatus } from "@theme/api/auth/mfaMethods";
import { renderWithProviders } from "@theme/tests/renderWithProviders";
import { MFA_SETUP_PROMPT_DISMISSED_STORAGE_KEY } from "./constants";
import MfaSetupPrompt from "./MfaSetupPrompt";

const getMfaStatusSpy = vi.fn<() => Promise<MfaStatus>>();

vi.mock("@theme/api/auth/mfaMethods", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@theme/api/auth/mfaMethods")>()),
  getMfaStatus: () => getMfaStatusSpy()
}));

const NOT_CONFIGURED: MfaStatus = { methods: [], mfa_enforced: false, enforcing_organizations: [], status: "not_configured" };

const CONFIGURED: MfaStatus = {
  methods: [
    {
      id: "a1d3",
      user_id: "9c2a",
      type: MFA_METHOD_TYPE.TOTP,
      label: "Configured on Google Pixel 10 Pro",
      is_default: true,
      confirmed: true,
      confirmed_at: 1_758_480_120,
      created_at: 1_758_480_000,
      deleted_at: 0
    }
  ],
  mfa_enforced: false,
  enforcing_organizations: [],
  status: "configured"
};

let rendered: ReturnType<typeof renderWithProviders> | null = null;

const renderPrompt = async () => {
  rendered = renderWithProviders({ initialEntry: "/", routes: <Route path="/" element={<MfaSetupPrompt />} /> });
  await act(async () => {});
  return rendered;
};

describe("MfaSetupPrompt", () => {
  afterEach(() => {
    rendered?.unmount();
    rendered = null;
    localStorage.removeItem(MFA_SETUP_PROMPT_DISMISSED_STORAGE_KEY);
    getMfaStatusSpy.mockReset();
  });

  it("points a user without MFA to the Security tab", async () => {
    getMfaStatusSpy.mockResolvedValue(NOT_CONFIGURED);

    const prompt = await renderPrompt();

    expect(prompt.find("mfa_setup_prompt")).not.toBeNull();
    expect(prompt.find("link_mfa_setup_prompt")?.getAttribute("href")).toBe("/profile?tab=security");
  });

  it("stays away once a method is set up", async () => {
    getMfaStatusSpy.mockResolvedValue(CONFIGURED);

    const prompt = await renderPrompt();

    expect(prompt.find("mfa_setup_prompt")).toBeNull();
  });

  it("says nothing when the status cannot be loaded", async () => {
    getMfaStatusSpy.mockRejectedValue(new Error("500"));

    const prompt = await renderPrompt();

    expect(prompt.find("mfa_setup_prompt")).toBeNull();
  });

  it("remembers being dismissed", async () => {
    getMfaStatusSpy.mockResolvedValue(NOT_CONFIGURED);
    const prompt = await renderPrompt();

    act(() => prompt.container.querySelector<HTMLButtonElement>("[data-test-id='mfa_setup_prompt'] button")!.click());
    prompt.unmount();
    rendered = null;
    const again = await renderPrompt();

    expect(again.find("mfa_setup_prompt")).toBeNull();
    expect(localStorage.getItem(MFA_SETUP_PROMPT_DISMISSED_STORAGE_KEY)).toBe("true");
  });
});
