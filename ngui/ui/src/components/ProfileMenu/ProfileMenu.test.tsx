import { act } from "react-dom/test-utils";
import { Route } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "tests/renderWithProviders";
import { PROFILE } from "urls";
import ProfileMenu from "./ProfileMenu";

let rendered: ReturnType<typeof renderWithProviders> | null = null;

const renderMenu = (onItemClick = vi.fn()) => {
  rendered = renderWithProviders({
    initialEntry: "/",
    routes: (
      <>
        <Route path="/" element={<ProfileMenu name="Reto Mayer" email="reto.mayer@example.com" onItemClick={onItemClick} />} />
        <Route path={PROFILE} element={<div data-test-id="profile_page" />} />
      </>
    ),
  });
  return rendered;
};

describe("ProfileMenu", () => {
  afterEach(() => {
    rendered?.unmount();
    rendered = null;
  });

  it("opens the Profile page and tells the popover to close", () => {
    const onItemClick = vi.fn();
    const menu = renderMenu(onItemClick);

    act(() => menu.find("btn_profile_page")!.click());

    expect(menu.find("profile_page")).not.toBeNull();
    expect(onItemClick).toHaveBeenCalledOnce();
  });
});
