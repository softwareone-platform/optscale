import acceptInvitationRoute from "./acceptInvitationRoute";
import anomaliesRoute from "./anomaliesRoute";
import anomalyRoute from "./anomalyRoute";
import archivedRecommendationsRoute from "./archivedRecommendationsRoute";
import assignmentRulesRoute from "./assignmentRulesRoute";
import BaseRoute from "./baseRoute";
import biExportRoute from "./biExportRoute";
import biExportsRoute from "./biExportsRoute";
import cloudCostComparisonRoute from "./cloudCostComparisonRoute";
import cloudExpensesRoute from "./cloudExpensesRoute";
import clusterTypesRoute from "./clusterTypesRoute";
import connectJiraRoute from "./connectJiraRoute";
import connectSlackRoute from "./connectSlackRoute";
import createAnomalyRoute from "./createAnomalyRoute";
import createAssignmentRuleRoute from "./createAssignmentRuleRoute";
import createBIExportRoute from "./createBIExportRoute";
import createClusterTypeRoute from "./createClusterTypeRoute";
import createDataSourceRoute from "./createDataSourceRoute";
import createEnvironmentRoute from "./createEnvironmentRoute";
import createMlMetricRoute from "./createMlMetricRoute";
import createPoolPolicyRoute from "./createPoolPolicyRoute";
import createPowerScheduleRoute from "./createPowerScheduleRoute";
import createQuotaAndBudgetPolicyRoute from "./createQuotaAndBudgetPolicyRoute";
import createResourceAssignmentRuleRoute from "./createResourceAssignmentRuleRoute";
import createTaggingPolicyRoute from "./createTaggingPolicyRoute";
import dataSourceOverviewRoute from "./dataSourceOverviewRoute";
import dataSourcesRoute from "./dataSourcesRoute";
import editAssignmentRuleRoute from "./editAssignmentRuleRoute";
import editBIExportRoute from "./editBIExportRoute";
import editMlMetricRoute from "./editMlMetricRoute";
import editPowerScheduleRoute from "./editPowerScheduleRoute";
import emailVerificationRoute from "./emailVerificationRoute";
import environmentsRoute from "./environmentsRoute";
import eventsRoute from "./eventsRoute";
import expensesMapRoute from "./expensesMapRoute";
import expensesRoute from "./expensesRoute";
import finOpsPortalRoute from "./finOpsPortalRoute";
import homeRoute from "./homeRoute";
import initializeRoute from "./initializeRoute";
import integrationsRoute from "./integrationsRoute";
import invitedRoute from "./invitedRoute";
import inviteEmployeesRoute from "./inviteEmployeesRoute";
import k8sRightsizingRoute from "./k8sRightsizingRoute";
import liveDemoRoute from "./liveDemoRoute";
import loginRoute from "./loginRoute";
import mlArtifactsRoute from "./mlArtifactsRoute";
import mlModelCreateRoute from "./mlCreateModelRoute";
import mlCreateRunArtifactRoute from "./mlCreateRunArtifactRoute";
import mlDatasetCreateRoute from "./mlDatasetCreateRoute";
import mlDatasetEditRoute from "./mlDatasetEditRoute";
import mlDatasetsRoute from "./mlDatasetsRoute";
import mlEditArtifactRoute from "./mlEditArtifactRoute";
import mlEditModelRoute from "./mlEditModelRoute";
import mlEditRunArtifactRoute from "./mlEditRunArtifactRoute";
import mlEditTaskRoute from "./mlEditTaskRoute";
import mlExecutorsRoute from "./mlExecutorsRoute";
import mlMetricsRoute from "./mlMetricsRoute";
import mlModel from "./mlModel";
import mlModelsRoute from "./mlModelsRoute";
import mlRunsetConfiguration from "./mlRunsetConfiguration";
import mlRunsetOverview from "./mlRunsetOverview";
import mlRunsetsRoute from "./mlRunsetsRoute";
import mlRunsetTemplateCreateRoute from "./mlRunsetTemplateCreateRoute";
import mlRunsetTemplateEditRoute from "./mlRunsetTemplateEditRoute";
import mlRunsetTemplateRoute from "./mlRunsetTemplateRoute";
import mlTaskCreateRoute from "./mlTaskCreateRoute";
import mlTaskDetailsRoute from "./mlTaskDetailsRoute";
import mlTaskRunRoute from "./mlTaskRunRoute";
import mlTasksRoute from "./mlTasksRoute";
import notFoundRoute from "./notFoundRoute";
import organizationOptionsRoute from "./organizationOptionsRoute";
import organizationsOverviewRoute from "./organizationsOverviewRoute";
import ownerExpensesRoute from "./ownerExpensesRoute";
import resetPasswordRoute from "./passwordRecoveryRoute";
import pendingInvitationsRoute from "./pendingInvitationsRoute";
import poolExpensesRoute from "./poolExpensesRoute";
import poolsRoute from "./poolsRoute";
import poolTtlAnalysisRoute from "./poolTtlAnalysisRoute";
import powerScheduleDetailsRoute from "./powerScheduleDetailsRoute";
import powerSchedulesRoute from "./powerSchedulesRoute";
import publicMlRun from "./publicMlRun";
import quotaRoute from "./quotaRoute";
import quotasRoute from "./quotasRoute";
import recommendationsRoute from "./recommendationsRoute";
import registerRoute from "./registerRoute";
import resourceLifecycleRoute from "./resourceLifecycleRoute";
import resourceRoute from "./resourceRoute";
import resourcesPerspectives from "./resourcesPerspectives";
import resourcesRoute from "./resourcesRoute";
import riSpRoute from "./riSpRoute";
import s3DuplicateFinderRoute from "./s3DuplicateFinderRoute";
import s3DuplicatesCheckRoute from "./s3DuplicatesCheckRoute";
import settingsRoute from "./settingsRoute";
import setupLeaderboardTemplateRoute from "./setupLeaderboardTemplateRoute";
import taggingPoliciesRoute from "./taggingPoliciesRoute";
import taggingPolicyRoute from "./taggingPolicyRoute";
import themeSettingsRoute from "./themeSettingsRoute";
import ttlAnalysisRoute from "./ttlAnalysisRoute";
import usersRoute from "./usersRoute";

export const routes = [
  acceptInvitationRoute,
  anomaliesRoute,
  anomalyRoute,
  assignmentRulesRoute,
  createAssignmentRuleRoute,
  editAssignmentRuleRoute,
  createResourceAssignmentRuleRoute,
  organizationsOverviewRoute,
  poolsRoute,
  taggingPoliciesRoute,
  taggingPolicyRoute,
  createTaggingPolicyRoute,
  k8sRightsizingRoute,
  createAnomalyRoute,
  createQuotaAndBudgetPolicyRoute,
  quotaRoute,
  quotasRoute,
  usersRoute,
  inviteEmployeesRoute,
  dataSourcesRoute,
  dataSourceOverviewRoute,
  createDataSourceRoute,
  resourcesRoute,
  resourceRoute,
  ttlAnalysisRoute,
  poolTtlAnalysisRoute,
  eventsRoute,
  finOpsPortalRoute,
  settingsRoute,
  homeRoute,
  loginRoute,
  registerRoute,
  pendingInvitationsRoute,
  invitedRoute,
  liveDemoRoute,
  resetPasswordRoute,
  resourcesPerspectives,
  expensesRoute,
  expensesMapRoute,
  cloudExpensesRoute,
  ownerExpensesRoute,
  poolExpensesRoute,
  recommendationsRoute,
  archivedRecommendationsRoute,
  connectSlackRoute,
  connectJiraRoute,
  clusterTypesRoute,
  environmentsRoute,
  createEnvironmentRoute,
  createClusterTypeRoute,
  riSpRoute,
  integrationsRoute,
  organizationOptionsRoute,
  resourceLifecycleRoute,
  createPoolPolicyRoute,
  themeSettingsRoute,
  createMlMetricRoute,
  editMlMetricRoute,
  mlEditTaskRoute,
  mlExecutorsRoute,
  mlRunsetsRoute,
  mlTaskCreateRoute,
  mlDatasetsRoute,
  mlDatasetCreateRoute,
  mlDatasetEditRoute,
  mlTaskDetailsRoute,
  mlTaskRunRoute,
  mlMetricsRoute,
  mlTasksRoute,
  mlRunsetTemplateCreateRoute,
  mlRunsetConfiguration,
  mlRunsetOverview,
  mlRunsetTemplateRoute,
  mlRunsetTemplateEditRoute,
  biExportsRoute,
  biExportRoute,
  createBIExportRoute,
  editBIExportRoute,
  cloudCostComparisonRoute,
  s3DuplicateFinderRoute,
  s3DuplicatesCheckRoute,
  powerSchedulesRoute,
  createPowerScheduleRoute,
  powerScheduleDetailsRoute,
  setupLeaderboardTemplateRoute,
  editPowerScheduleRoute,
  mlModelsRoute,
  mlModelCreateRoute,
  mlModel,
  mlEditModelRoute,
  mlArtifactsRoute,
  mlEditRunArtifactRoute,
  mlCreateRunArtifactRoute,
  mlEditArtifactRoute,
  emailVerificationRoute,
  publicMlRun,
  initializeRoute,
  // React router 6.x does not require the not found route (*) to be at the end,
  // but the matchPath hook that is used in the DocsPanel component seems to honor the order.
  // Moving it to the bottom for "safety" reasons.
  // TODO: investigate https://reactrouter.com/en/main/hooks/use-route-error and switching to data routers https://reactrouter.com/en/main/routers/picking-a-router
  notFoundRoute
];

export default BaseRoute;
