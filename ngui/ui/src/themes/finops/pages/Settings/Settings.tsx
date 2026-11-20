import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import OrganizationMfaPolicy from "@theme/components/OrganizationMfaPolicy";
import { SETTINGS_TABS } from "@theme/utils/constants";
import ActionBar from "components/ActionBar";
import BillingSubscription from "components/BillingSubscription";
import OrganizationSettings from "components/OrganizationSettings";
import PageContentWrapper from "components/PageContentWrapper";
import TabsWrapper from "components/TabsWrapper";
import InvitationsContainer from "containers/InvitationsContainer";
import UserEmailNotificationSettingsContainer from "containers/UserEmailNotificationSettingsContainer";
import { useIsFeatureEnabled } from "hooks/useIsFeatureEnabled";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { getEnvironmentVariable } from "utils/env";

const actionBarDefinition = {
  title: {
    messageId: "settings"
  }
};

const TAB_SEARCH_PARAM_NAME = "tab";

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isDemo } = useOrganizationInfo();

  const isBillingIntegrationEnabled = getEnvironmentVariable("VITE_BILLING_INTEGRATION") === "enabled";

  const isMfaEnabled = useIsFeatureEnabled("mfa_login");

  const tabs = [
    {
      title: SETTINGS_TABS.ORGANIZATION,
      dataTestId: `tab_${SETTINGS_TABS.ORGANIZATION}`,
      node: <OrganizationSettings />
    },
    {
      title: SETTINGS_TABS.SECURITY,
      dataTestId: `tab_${SETTINGS_TABS.SECURITY}`,
      node: <OrganizationMfaPolicy />,
      // A link to this tab opens Organization while the flag is off.
      renderCondition: () => isMfaEnabled
    },
    ...(isDemo || !isBillingIntegrationEnabled
      ? []
      : [
          {
            title: SETTINGS_TABS.SUBSCRIPTION,
            dataTestId: `tab_${SETTINGS_TABS.SUBSCRIPTION}`,
            node: <BillingSubscription />
          }
        ]),
    {
      title: SETTINGS_TABS.INVITATIONS,
      dataTestId: `tab_${SETTINGS_TABS.INVITATIONS}`,
      node: <InvitationsContainer />
    },
    {
      title: SETTINGS_TABS.EMAIL_NOTIFICATIONS,
      dataTestId: `tab_${SETTINGS_TABS.EMAIL_NOTIFICATIONS}`,
      node: <UserEmailNotificationSettingsContainer />
    }
  ];

  return (
    <>
      <ActionBar data={actionBarDefinition} />
      <PageContentWrapper>
        <Box className="MTPBoxShadow">
          <TabsWrapper
            tabsProps={{
              name: "settings",
              tabs,
              defaultTab: SETTINGS_TABS.ORGANIZATION,
              activeTab: searchParams.get(TAB_SEARCH_PARAM_NAME),
              handleChange: (event, value) => {
                setSearchParams({ [TAB_SEARCH_PARAM_NAME]: value });
              }
            }}
          />
        </Box>
      </PageContentWrapper>
    </>
  );
};

export default Settings;
