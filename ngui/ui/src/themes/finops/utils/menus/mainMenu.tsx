import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import anomalies from "@main/utils/menus/anomaliesMenuItem";
import dataSources from "@main/utils/menus/dataSourcesMenuItem";
import events from "@main/utils/menus/eventsMenuItem";
import expensesMapMenuItem from "@main/utils/menus/expensesMapMenuItem";
import expenses from "@main/utils/menus/expensesMenuItem";
import home from "@main/utils/menus/homeMenuItem";
import pools from "@main/utils/menus/poolsMenuItem";
import quotas from "@main/utils/menus/quotasMenuItem";
import recommendations from "@main/utils/menus/recommendationsMenuItem";
import resources from "@main/utils/menus/resourcesMenuItem";
import settings from "@main/utils/menus/settingsMenuItem";
import users from "@main/utils/menus/usersMenuItem";
import MainMenuSectionTitle from "@theme/components/MainMenuSectionTitle/MainMenuSectionTitle";
import { MAIN_MENU_SECTION_IDS } from "components/MenuGroupWrapper/reducer";
import { OPTSCALE_CAPABILITY } from "utils/constants";
import taggingPolicies from "./taggingPoliciesMenuItem";

export default [
  {
    id: MAIN_MENU_SECTION_IDS.HOME,
    items: [home, recommendations, resources, pools]
  },
  {
    id: MAIN_MENU_SECTION_IDS.FINOPS,
    menuSectionTitle: <MainMenuSectionTitle messageId="finops" icon={LeaderboardIcon} />,
    items: [expenses, expensesMapMenuItem],
    capability: OPTSCALE_CAPABILITY.FINOPS
  },
  {
    id: MAIN_MENU_SECTION_IDS.POLICIES,
    menuSectionTitle: <MainMenuSectionTitle messageId="policies" icon={PolicyOutlinedIcon} />,
    items: [anomalies, quotas, taggingPolicies],
    capability: OPTSCALE_CAPABILITY.FINOPS
  },
  {
    id: MAIN_MENU_SECTION_IDS.SYSTEM,
    menuSectionTitle: <MainMenuSectionTitle messageId="system" icon={TuneOutlinedIcon} />,
    items: [users, dataSources, events, settings]
  }
];
