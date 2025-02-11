import { Box } from "@mui/material";
import ActionBar from "components/ActionBar";
import OrganizationSettings from "components/OrganizationSettings";
import PageContentWrapper from "components/PageContentWrapper";
import TabsWrapper from "components/TabsWrapper";
import InvitationsContainer from "containers/InvitationsContainer";

import UserEmailNotificationSettingsContainer from "containers/UserEmailNotificationSettingsContainer";

const actionBarDefinition = {
  title: {
    messageId: "settings"
  }
};

export const SETTINGS_TABS = Object.freeze({
  ORGANIZATION: "organization",
  EMAIL_NOTIFICATIONS: "emailNotifications",
  INVITATIONS: "invitations"
  // MTP_TODO: disabled to meet BDR requirements
  // MODE: "mode",
  // SSH: "sshKeys"
});

const Settings = () => {
  // MTP_TODO: disabled to meet BDR requirements
  // const isFinOpsModeEnabled = useIsOptScaleModeEnabled(OPTSCALE_MODE.FINOPS);

  const tabs = [
    {
      title: SETTINGS_TABS.ORGANIZATION,
      dataTestId: `tab_${SETTINGS_TABS.ORGANIZATION}`,
      node: <OrganizationSettings />
    },
    {
      title: SETTINGS_TABS.INVITATIONS,
      dataTestId: `tab_${SETTINGS_TABS.INVITATIONS}`,
      node: <InvitationsContainer />
    },
    // {
    //   title: SETTINGS_TABS.MODE,
    //   dataTestId: `tab_${SETTINGS_TABS.MODE}`,
    //   node: <ModeContainer />
    // },
    // ...(isFinOpsModeEnabled
    //   ? [
    //       {
    //         title: SETTINGS_TABS.SSH,
    //         dataTestId: `tab_${SETTINGS_TABS.SSH}`,
    //         node: <SshSettingsContainer />
    //       }
    //     ]
    //   : []),
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
        <Box className={"MTPBoxShadow"}>
          <TabsWrapper
            tabsProps={{
              name: "settings",
              tabs,
              defaultTab: SETTINGS_TABS.ORGANIZATION
            }}
          />
        </Box>
      </PageContentWrapper>
    </>
  );
};

export default Settings;
