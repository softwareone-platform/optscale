import { JSONObjectResolver } from "graphql-scalars";
import { Resolvers } from "./restapi.generated.js";

const resolvers: Resolvers = {
  JSONObject: JSONObjectResolver,

  DataSourceInterface: {
    __resolveType: (dataSource) => {
      switch (dataSource.type) {
        case "aws_cnr": {
          return "AwsDataSource";
        }
        case "azure_tenant": {
          return "AzureTenantDataSource";
        }
        case "azure_cnr": {
          return "AzureSubscriptionDataSource";
        }
        case "gcp_cnr": {
          return "GcpDataSource";
        }
        case "gcp_tenant": {
          return "GcpTenantDataSource";
        }
        case "alibaba_cnr": {
          return "AlibabaDataSource";
        }
        case "nebius": {
          return "NebiusDataSource";
        }
        case "databricks": {
          return "DatabricksDataSource";
        }
        case "kubernetes_cnr": {
          return "K8sDataSource";
        }
        case "environment": {
          return "EnvironmentDataSource";
        }
        default: {
          return null;
        }
      }
    },
  },
  Query: {
    dataSource: async (_, { dataSourceId, requestParams }, { dataSources }) => {
      return dataSources.restapi.getDataSource(dataSourceId, requestParams);
    },
    employeeEmails: async (_, { employeeId }, { dataSources }) => {
      return dataSources.restapi.getEmployeeEmails(employeeId);
    },
    organizations: async (_, __, { dataSources }) => {
      return dataSources.restapi.getOrganizations();
    },
    currentEmployee: async (_, { organizationId }, { dataSources }) => {
      return dataSources.restapi.getCurrentEmployee(organizationId);
    },
    dataSources: async (_, { organizationId }, { dataSources }) => {
      return dataSources.restapi.getDataSources(organizationId);
    },
    invitations: async (_, __, { dataSources }) => {
      return dataSources.restapi.getInvitations();
    },
    organizationFeatures: async (_, { organizationId }, { dataSources }) => {
      return dataSources.restapi.getOrganizationFeatures(organizationId);
    },
    optscaleMode: async (_, { organizationId }, { dataSources }) => {
      return dataSources.restapi.getOptscaleMode(organizationId);
    },
    organizationThemeSettings: async (
      _,
      { organizationId },
      { dataSources }
    ) => {
      return dataSources.restapi.getOrganizationThemeSettings(organizationId);
    },
    organizationPerspectives: async (
      _,
      { organizationId },
      { dataSources }
    ) => {
      return dataSources.restapi.getOrganizationPerspectives(organizationId);
    },
  },
  Mutation: {
    createDataSource: async (
      _,
      { organizationId, params },
      { dataSources }
    ) => {
      return dataSources.restapi.createDataSource(organizationId, params);
    },
    updateDataSource: async (_, { dataSourceId, params }, { dataSources }) => {
      return dataSources.restapi.updateDataSource(dataSourceId, params);
    },
    updateEmployeeEmails: async (
      _,
      { employeeId, params },
      { dataSources }
    ) => {
      return dataSources.restapi.updateEmployeeEmails(employeeId, params);
    },
    updateEmployeeEmail: async (_, { employeeId, params }, { dataSources }) => {
      return dataSources.restapi.updateEmployeeEmail(employeeId, params);
    },
    deleteDataSource: async (_, { dataSourceId }, { dataSources }) => {
      return dataSources.restapi.deleteDataSource(dataSourceId);
    },
    createOrganization: async (_, { organizationName }, { dataSources }) => {
      return dataSources.restapi.createOrganization(organizationName);
    },
    updateOrganization: async (
      _,
      { organizationId, params },
      { dataSources }
    ) => {
      return dataSources.restapi.updateOrganization(organizationId, params);
    },
    deleteOrganization: async (_, { organizationId }, { dataSources }) => {
      return dataSources.restapi.deleteOrganization(organizationId);
    },
    updateInvitation: async (_, { invitationId, action }, { dataSources }) => {
      return dataSources.restapi.updateInvitation(invitationId, action);
    },
    updateOptscaleMode: async (
      _,
      { organizationId, value },
      { dataSources }
    ) => {
      return dataSources.restapi.updateOptscaleMode(organizationId, value);
    },
    updateOrganizationThemeSettings: async (
      _,
      { organizationId, value },
      { dataSources }
    ) => {
      return dataSources.restapi.updateOrganizationThemeSettings(
        organizationId,
        value
      );
    },
    updateOrganizationPerspectives: async (
      _,
      { organizationId, value },
      { dataSources }
    ) => {
      return dataSources.restapi.updateOrganizationPerspectives(
        organizationId,
        value
      );
    },
  },
};

export default resolvers;
