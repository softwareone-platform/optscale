import { ReactNode } from "react";
import { MockedProvider } from "@apollo/client/testing";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { MemoryRouter, MemoryRouterProps, Routes } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import ThemeProviderWrapper from "components/ThemeProviderWrapper";
import { ALERTS } from "components/TopAlertWrapper/reducer";
import intlConfig from "translations/react-intl-config";

// Opts every spec rendering through here into React 18's act() environment, so updates are flushed, not warned about.
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// A plain store rather than redux-mock-store: nothing asserts on dispatched actions, and that package
// ships no types. Greeter reaches TopAlertWrapper, which needs the alerts slice to exist.
const store = createStore(() => ({ [ALERTS]: {} }));

type RenderWithProvidersOptions = {
  initialEntry: NonNullable<MemoryRouterProps["initialEntries"]>[number];
  /** `<Route>` elements; add stand-ins for the pages a redirect lands on, so it is observable in the DOM. */
  routes: ReactNode;
};

/**
 * Renders theme components that reach `Greeter` or `ThemeProviderWrapper`, which upstream's
 * `TestProvider` cannot: it supplies no Apollo client, no alerts slice and no way to seed route state.
 */
export const renderWithProviders = ({ initialEntry, routes }: RenderWithProvidersOptions) => {
  const container = document.createElement("div");
  // Attached so a submit button click submits its form, as it does in a browser.
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <Provider store={store}>
        <MockedProvider>
          <ThemeProviderWrapper>
            <IntlProvider {...intlConfig}>
              <MemoryRouter initialEntries={[initialEntry]}>
                <Routes>{routes}</Routes>
              </MemoryRouter>
            </IntlProvider>
          </ThemeProviderWrapper>
        </MockedProvider>
      </Provider>
    );
  });

  const find = (testId: string) => container.querySelector<HTMLElement>(`[data-test-id='${testId}']`);

  return {
    container,
    find,
    text: (testId: string) => find(testId)?.textContent,
    unmount: () => {
      act(() => root.unmount());
      container.remove();
    }
  };
};
