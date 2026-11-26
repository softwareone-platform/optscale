import { ComponentProps } from "react";
import { Route } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { click, find } from "tests/dom";
import { renderWithProviders } from "tests/renderWithProviders";
import { MFA_CHALLENGE, LOGIN } from "urls";
import BackToLoginLink from "./BackToLoginLink";

let unmount: () => void;

const renderLink = (props: ComponentProps<typeof BackToLoginLink> = {}) => {
  ({ unmount } = renderWithProviders({
    initialEntry: MFA_CHALLENGE,
    routes: (
      <>
        <Route path={MFA_CHALLENGE} element={<BackToLoginLink {...props} />} />
        <Route path={LOGIN} element={<div data-test-id="login_page" />} />
      </>
    ),
  }));
};

describe("BackToLoginLink", () => {
  afterEach(() => unmount());

  it("reads Back and leads to the login page", async () => {
    renderLink();

    expect(find("btn_back_to_login")?.textContent).toBe("Back");

    await click("btn_back_to_login");

    expect(find("login_page")).not.toBeNull();
  });

  it("leads to the login page under the label and test id a screen gives it", async () => {
    renderLink({ messageId: "signOut", dataTestId: "btn_sign_out" });

    expect(find("btn_back_to_login")).toBeNull();
    expect(find("btn_sign_out")?.textContent).toBe("Sign out");

    await click("btn_sign_out");

    expect(find("login_page")).not.toBeNull();
  });
});
