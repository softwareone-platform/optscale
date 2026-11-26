import * as originalConstants from "@main/utils/constants";

export * from "@main/utils/constants";

export const CONNECTION_TYPES = Object.freeze({
  AWS_MANAGEMENT: "awsManagement",
  AWS_MEMBER: "awsMember",
  AWS_STANDALONE: "awsStandalone",
  AZURE_SUBSCRIPTION: "azureSubscription",
  AZURE_TENANT: "azureTenant",
  ALIBABA: "alibaba",
  GCP_PROJECT: "gcpProject",
  GCP_TENANT: "gcpTenant",
  NEBIUS: "nebius",
  DATABRICKS: "databricks",
  KUBERNETES: "kubernetes"
});

export const EVENTS_LIMIT = 40;

export const BREAKDOWN_BUTTON_GROUP_ITEMS = [
  {
    name: originalConstants.CLEAN_EXPENSES_BREAKDOWN_TYPES.EXPENSES,
    id: originalConstants.CLEAN_EXPENSES_BREAKDOWN_TYPES.EXPENSES,
    messageId: originalConstants.CLEAN_EXPENSES_BREAKDOWN_TYPES.EXPENSES,
    type: originalConstants.LINEAR_SELECTOR_ITEMS_TYPES.TEXT,
    dataTestId: "breakdown_ls_item_expenses"
  },
  {
    name: originalConstants.CLEAN_EXPENSES_BREAKDOWN_TYPES.RESOURCE_COUNT,
    id: originalConstants.CLEAN_EXPENSES_BREAKDOWN_TYPES.RESOURCE_COUNT,
    messageId: originalConstants.CLEAN_EXPENSES_BREAKDOWN_TYPES.RESOURCE_COUNT,
    type: originalConstants.LINEAR_SELECTOR_ITEMS_TYPES.TEXT,
    dataTestId: "breakdown_ls_item_resource_count"
  },
  {
    name: originalConstants.CLEAN_EXPENSES_BREAKDOWN_TYPES.TAGS,
    id: originalConstants.CLEAN_EXPENSES_BREAKDOWN_TYPES.TAGS,
    messageId: originalConstants.CLEAN_EXPENSES_BREAKDOWN_TYPES.TAGS,
    type: originalConstants.LINEAR_SELECTOR_ITEMS_TYPES.TEXT,
    dataTestId: "breakdown_ls_item_tags"
  }
];

export const SETTINGS_TABS = Object.freeze({
  ORGANIZATION: "organization",
  SUBSCRIPTION: "subscription",
  INVITATIONS: "invitations",
  EMAIL_NOTIFICATIONS: "emailNotifications"
});
