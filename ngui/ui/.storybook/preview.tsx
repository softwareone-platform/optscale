import type { Preview } from "@storybook/react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import ThemeProviderWrapper from "../src/components/ThemeProviderWrapper";
import ApolloProvider from "../src/components/ApolloProvider";
import {
  MOCKED_ORGANIZATION_POOL_ID,
  MOCKED_RESOURCE_ID,
  MOCKED_ORGANIZATION_ID,
  MockPermissionsStateContext
} from "../src/stories";
import intlConfig from "../src/translations/react-intl-config";
import { MockState } from "../src/utils/MockState";
import { splitAndTrim } from "../src/utils/strings";

const preview: Preview = {
  argTypes: {
    organizationAllowedActions: { name: "Organization allowed actions", control: "text", defaultValue: "" },
    poolAllowedActions: { name: "Pool allowed actions", control: "text", defaultValue: "" },
    resourceAllowedActions: { name: "Resource allowed actions", control: "text", defaultValue: "" }
  },
  parameters: {
    backgrounds: {
      default: "OptScale",
      values: [
        {
          name: "OptScale",
          // TODO: Get BACKGROUND color from theme
          value: "rgb(246, 247, 248)"
        }
      ]
    }
  },
  decorators: [
    (Story) => {
      const mockStore = configureMockStore();

      return (
        <Provider store={mockStore({ state: {} })}>
          <ApolloProvider>
            <IntlProvider {...intlConfig}>
              <Router>
                <ThemeProviderWrapper>
                  <Story />
                </ThemeProviderWrapper>
              </Router>
            </IntlProvider>
          </ApolloProvider>
        </Provider>
      );
    },
    (Story, { title, argTypes, ...rest }) => {
      const [storyRoot] = title.split("/");
      if (storyRoot === "Pages") {
        const getResourceAllowedActions = () => splitAndTrim(argTypes.resourceAllowedActions.defaultValue);
        const getOrganizationAllowedActions = () => splitAndTrim(argTypes.organizationAllowedActions.defaultValue);
        const getPoolAllowedActions = () => splitAndTrim(argTypes.poolAllowedActions.defaultValue);

        const mockState = MockState();

        mockState.mockOrganizationPermissions(MOCKED_ORGANIZATION_ID, getOrganizationAllowedActions());
        mockState.mockPoolPermissions(MOCKED_ORGANIZATION_POOL_ID, getPoolAllowedActions());
        mockState.mockResourcePermissions(MOCKED_RESOURCE_ID, getResourceAllowedActions());

        const mockStore = configureMockStore();

        return (
          <MockPermissionsStateContext.Provider
            value={{
              mockStore,
              mockState
            }}
          >
            <Story />
          </MockPermissionsStateContext.Provider>
        );
      }
      return <Story />;
    }
  ]
};

export default preview;
