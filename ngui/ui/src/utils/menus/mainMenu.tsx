import MainMenuSectionTitle from "components/MainMenuSectionTitle";
import { MAIN_MENU_SECTION_IDS } from "components/MenuGroupWrapper/reducer";
import { OPTSCALE_MODE } from "utils/constants";
import anomalies from "./anomaliesMenuItem";
import cloudCostComparisonMenuItem from "./cloudCostComparisonMenuItem";
import dataSources from "./dataSourcesMenuItem";
import environments from "./environmentsMenuItem";
import events from "./eventsMenuItem";
import expensesMap from "./expensesMapMenuItem";
import expenses from "./expensesMenuItem";
import finOpsPortal from "./finOpsPortalMenuItem";
import home from "./homeMenuItem";
import integrations from "./integrationsMenuItem";
import k8sRightsizing from "./k8sRightsizingMenuItem";
import mlArtifactsMenuItem from "./mlArtifactsMenuItem";
import mlDatasets from "./mlDatasetsMenuItem";
import mlHypertuningMenuItem from "./mlHypertuningMenuItem";
import mlMetricsMenuItem from "./mlMetricsMenuItem";
import mlModels from "./mlModelsMenuItem";
import mlTasks from "./mlTasksMenuItem";
import pools from "./poolsMenuItem";
// import powerSchedulesMenuItem from "./powerSchedulesMenuItem";
import quotas from "./quotasMenuItem";
// import recommendationsArchive from "./recommendationsArchiveMenuItem";
import recommendations from "./recommendationsMenuItem";
// import resourceLifecycle from "./resourceLifecycleMenuItem";
import resources from "./resourcesMenuItem";
import settings from "./settingsMenuItem";
import taggingPolicies from "./taggingPoliciesMenuItem";
import users from "./usersMenuItem";

import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
// import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

export default [
  {
    id: MAIN_MENU_SECTION_IDS.HOME,
    items: [home, recommendations, resources, pools] // TODO_KU: Disabled items: environments
  },
  {
    id: MAIN_MENU_SECTION_IDS.FINOPS,
    menuSectionTitle: <MainMenuSectionTitle messageId="finops" icon={LeaderboardIcon} />,
    items: [expenses], // TODO_KU: Disabled items: expensesMap, finOpsPortal
    mode: OPTSCALE_MODE.FINOPS
  },
  {
    id: MAIN_MENU_SECTION_IDS.ML_OPS,
    menuSectionTitle: <MainMenuSectionTitle messageId="mlops" icon={AccountTreeOutlinedIcon} />,
    items: [mlTasks, mlModels, mlDatasets, mlArtifactsMenuItem, mlHypertuningMenuItem, mlMetricsMenuItem],
    mode: OPTSCALE_MODE.MLOPS
  },
  {
    id: MAIN_MENU_SECTION_IDS.POLICIES,
    menuSectionTitle: <MainMenuSectionTitle messageId="policies" icon={PolicyOutlinedIcon} />,
    items: [anomalies, quotas, taggingPolicies], // TODO_KU: Disabled items:  resourceLifecycle, powerSchedulesMenuItem
    mode: OPTSCALE_MODE.FINOPS
  },
  //  TODO_KU: disabled whole sandbox section
  // {
  //   id: MAIN_MENU_SECTION_IDS.SANDBOX,
  //   menuSectionTitle: <MainMenuSectionTitle messageId="sandbox" icon={InboxOutlinedIcon} />,
  //   items: [k8sRightsizing, recommendationsArchive, cloudCostComparisonMenuItem],
  //   mode: OPTSCALE_MODE.FINOPS
  // },
  {
    id: MAIN_MENU_SECTION_IDS.SYSTEM,
    menuSectionTitle: <MainMenuSectionTitle messageId="system" icon={TuneOutlinedIcon} />,
    items: [users, dataSources, events, settings] // TODO_KU: Disabled items: integrations
  }
];
