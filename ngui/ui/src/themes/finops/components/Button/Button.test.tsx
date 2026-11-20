import { Route } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "@theme/tests/renderWithProviders";
import Button from "./Button";

let rendered: ReturnType<typeof renderWithProviders> | null = null;

const renderButton = (isLoading: boolean) => {
  rendered = renderWithProviders({
    initialEntry: "/",
    routes: (
      <Route
        path="/"
        element={<Button text="Verify" isLoading={isLoading} startIcon={<span data-test-id="icon" />} dataTestId="btn" />}
      />
    )
  });

  return rendered;
};

describe("Button", () => {
  afterEach(() => {
    rendered?.unmount();
    rendered = null;
  });

  it("disables itself and shows a spinner in place of the start icon while loading", () => {
    const { find } = renderButton(true);

    expect(find("btn")?.hasAttribute("disabled")).toBe(true);
    expect(find("btn")?.querySelector(".MuiCircularProgress-root")).not.toBeNull();
    expect(find("icon")).toBeNull();
  });

  it("keeps its own start icon otherwise", () => {
    const { find } = renderButton(false);

    expect(find("btn")?.hasAttribute("disabled")).toBe(false);
    expect(find("icon")).not.toBeNull();
  });
});
