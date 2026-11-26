import { Route } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "tests/renderWithProviders";
import { LOGIN } from "urls";
import AuthorizationContainer from "./AuthorizationContainer";

const renderLoginPage = () =>
  renderWithProviders({
    initialEntry: LOGIN,
    routes: <Route path={LOGIN} element={<AuthorizationContainer />} />,
  });

describe("AuthorizationContainer", () => {
  it("asks for the address alone, the password comes on the next step", () => {
    const { find, unmount } = renderLoginPage();

    expect(find("btn_continue")).not.toBeNull();
    expect(find("input_pass")).toBeNull();
    expect(find("btn_login")).toBeNull();

    unmount();
  });
});
