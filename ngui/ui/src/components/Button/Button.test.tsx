import { createRoot } from "react-dom/client";
import { Route } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "tests/renderWithProviders";
import TestProvider from "tests/TestProvider";
import Button from "./Button";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <Button messageId="hystax" />
    </TestProvider>
  );
  root.unmount();
});

describe("Button", () => {
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
