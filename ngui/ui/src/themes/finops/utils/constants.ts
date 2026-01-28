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
