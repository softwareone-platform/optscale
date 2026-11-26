import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "react-router-dom";
import ActionBar from "components/ActionBar";
import MfaSecuritySettings from "components/MfaSecuritySettings";
import PageContentWrapper from "components/PageContentWrapper";
import PasswordSecuritySettings from "components/PasswordSecuritySettings";
import TabsWrapper from "components/TabsWrapper";
import { SPACING_3 } from "utils/layouts";
import { PROFILE_TABS, TAB_SEARCH_PARAM_NAME } from "./constants";
import useStyles from "./Profile.styles";
import ProfileOverview from "./ProfileOverview";

const actionBarDefinition = {
  title: {
    messageId: "profile",
  },
};

const TABS = [
  {
    title: PROFILE_TABS.OVERVIEW,
    dataTestId: `tab_${PROFILE_TABS.OVERVIEW}`,
    node: <ProfileOverview />,
  },
  {
    title: PROFILE_TABS.SECURITY,
    dataTestId: `tab_${PROFILE_TABS.SECURITY}`,
    node: (
      <Stack spacing={SPACING_3} divider={<Divider flexItem />}>
        <PasswordSecuritySettings />
        <MfaSecuritySettings />
      </Stack>
    ),
  },
];

/** The signed-in user's own page; the tab sits in the URL so a reload or a shared link lands on it. */
const Profile = () => {
  const { classes } = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <ActionBar data={actionBarDefinition} />
      <PageContentWrapper>
        <Box className={classes.tabs}>
          <TabsWrapper
            isLoading={false}
            tabsProps={{
              name: "profile",
              tabs: TABS,
              defaultTab: PROFILE_TABS.OVERVIEW,
              activeTab: searchParams.get(TAB_SEARCH_PARAM_NAME),
              handleChange: (_: unknown, value: string) => {
                setSearchParams({ [TAB_SEARCH_PARAM_NAME]: value });
              },
            }}
          />
        </Box>
      </PageContentWrapper>
    </>
  );
};

export default Profile;
