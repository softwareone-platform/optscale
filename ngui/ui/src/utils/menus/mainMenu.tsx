import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import MainMenuSectionTitle from "components/MainMenuSectionTitle";
import { MAIN_MENU_SECTION_IDS } from "components/MenuGroupWrapper/reducer";
import { OPTSCALE_CAPABILITY } from "utils/constants";
import anomalies from "./anomaliesMenuItem";
import dataSources from "./dataSourcesMenuItem";
import events from "./eventsMenuItem";
import expenses from "./expensesMenuItem";
import home from "./homeMenuItem";
import pools from "./poolsMenuItem";
import quotas from "./quotasMenuItem";
import recommendations from "./recommendationsMenuItem";
import resources from "./resourcesMenuItem";
import settings from "./settingsMenuItem";
import taggingPolicies from "./taggingPoliciesMenuItem";
import users from "./usersMenuItem";

export default [
  {
    id: MAIN_MENU_SECTION_IDS.HOME,
    items: [home, recommendations, resources, pools] // MPT_TODO: Disabled items: environments
  },
  {
    id: MAIN_MENU_SECTION_IDS.FINOPS,
<<<<<<< HEAD
    menuSectionTitle: <MainMenuSectionTitle messageId="finops" icon={LeaderboardIcon} />,
    items: [expenses], // MPT_TODO: Disabled items: expensesMap, finOpsPortal
    mode: OPTSCALE_MODE.FINOPS
  },
  //  MPT_TODO: disabled to meet BDR requirements
  // {
  //   id: MAIN_MENU_SECTION_IDS.ML_OPS,
  //   menuSectionTitle: <MainMenuSectionTitle messageId="mlops" icon={AccountTreeOutlinedIcon} />,
  //   items: [mlTasks, mlModels, mlDatasets, mlArtifactsMenuItem, mlHypertuningMenuItem, mlMetricsMenuItem],
  //   mode: OPTSCALE_MODE.MLOPS
  // },
  {
    id: MAIN_MENU_SECTION_IDS.POLICIES,
    menuSectionTitle: <MainMenuSectionTitle messageId="policies" icon={PolicyOutlinedIcon} />,
    items: [anomalies, quotas, taggingPolicies], // MPT_TODO: Disabled items:  resourceLifecycle, powerSchedulesMenuItem
    mode: OPTSCALE_MODE.FINOPS
=======
    menuSectionTitle: <MainMenuSectionTitle messageId="finops" />,
    items: [expenses, expensesMap, finOpsPortal],
    capability: OPTSCALE_CAPABILITY.FINOPS
  },
  {
    id: MAIN_MENU_SECTION_IDS.ML_OPS,
    menuSectionTitle: <MainMenuSectionTitle messageId="mlops" />,
    items: [mlTasks, mlModels, mlDatasets, mlArtifactsMenuItem, mlHypertuningMenuItem, mlMetricsMenuItem],
    capability: OPTSCALE_CAPABILITY.MLOPS
  },
  {
    id: MAIN_MENU_SECTION_IDS.POLICIES,
    menuSectionTitle: <MainMenuSectionTitle messageId="policies" />,
    items: [anomalies, quotas, taggingPolicies, resourceLifecycle, powerSchedulesMenuItem],
    capability: OPTSCALE_CAPABILITY.FINOPS
  },
  {
    id: MAIN_MENU_SECTION_IDS.SANDBOX,
    menuSectionTitle: <MainMenuSectionTitle messageId="sandbox" />,
    items: [k8sRightsizing, recommendationsArchive, cloudCostComparisonMenuItem],
    capability: OPTSCALE_CAPABILITY.FINOPS
>>>>>>> upstream/integration
  },
  //  MPT_TODO: disabled whole sandbox section
  // {
  //   id: MAIN_MENU_SECTION_IDS.SANDBOX,
  //   menuSectionTitle: <MainMenuSectionTitle messageId="sandbox" icon={InboxOutlinedIcon} />,
  //   items: [k8sRightsizing, recommendationsArchive, cloudCostComparisonMenuItem],
  //   mode: OPTSCALE_MODE.FINOPS
  // },
  {
    id: MAIN_MENU_SECTION_IDS.SYSTEM,
    menuSectionTitle: <MainMenuSectionTitle messageId="system" icon={TuneOutlinedIcon} />,
    items: [users, dataSources, events, settings] // MPT_TODO: Disabled items: integrations
  }
];
