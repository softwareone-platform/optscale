import { Box } from "@mui/material";
import ActionBar from "components/ActionBar";
import OrganizationSettings from "components/OrganizationSettings";
import PageContentWrapper from "components/PageContentWrapper";
import TabsWrapper from "components/TabsWrapper";
import CapabilityContainer from "containers/CapabilityContainer";
import InvitationsContainer from "containers/InvitationsContainer";
<<<<<<< HEAD

import UserEmailNotificationSettingsContainer from "containers/UserEmailNotificationSettingsContainer";
=======
import SshSettingsContainer from "containers/SshSettingsContainer";
import UserEmailNotificationSettingsContainer from "containers/UserEmailNotificationSettingsContainer";
import { useIsOptScaleCapabilityEnabled } from "hooks/useIsOptScaleCapabilityEnabled";
import { OPTSCALE_CAPABILITY } from "utils/constants";
>>>>>>> upstream/integration

const actionBarDefinition = {
  title: {
    messageId: "settings"
  }
};

export const SETTINGS_TABS = Object.freeze({
  ORGANIZATION: "organization",
<<<<<<< HEAD
  EMAIL_NOTIFICATIONS: "emailNotifications",
  INVITATIONS: "invitations"
  // MTP_TODO: disabled to meet BDR requirements
  // MODE: "mode",
  // SSH: "sshKeys"
});

const Settings = () => {
  // MTP_TODO: disabled to meet BDR requirements
  // const isFinOpsModeEnabled = useIsOptScaleModeEnabled(OPTSCALE_MODE.FINOPS);
=======
  INVITATIONS: "invitations",
  CAPABILITIES: "capabilities",
  SSH: "sshKeys",
  EMAIL_NOTIFICATIONS: "emailNotifications"
});

const Settings = () => {
  const isFinOpsCapabilityEnabled = useIsOptScaleCapabilityEnabled(OPTSCALE_CAPABILITY.FINOPS);
>>>>>>> upstream/integration

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
<<<<<<< HEAD
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
=======
    {
      title: SETTINGS_TABS.CAPABILITIES,
      dataTestId: `tab_${SETTINGS_TABS.CAPABILITIES}`,
      node: <CapabilityContainer />
    },
    ...(isFinOpsCapabilityEnabled
      ? [
          {
            title: SETTINGS_TABS.SSH,
            dataTestId: `tab_${SETTINGS_TABS.SSH}`,
            node: <SshSettingsContainer />
          }
        ]
      : []),
>>>>>>> upstream/integration
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
