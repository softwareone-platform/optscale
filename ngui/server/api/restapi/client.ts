import qs from "qs";
import BaseClient from "../baseClient.js";
import {
  DataSourceRequestParams,
  MutationUpdateEmployeeEmailsArgs,
  MutationUpdateEmployeeEmailArgs,
  MutationCreateDataSourceArgs,
  MutationUpdateDataSourceArgs,
  MutationUpdateOrganizationArgs,
  MutationCreateOrganizationArgs,
  MutationDeleteOrganizationArgs,
  MutationUpdateOrganizationPerspectivesArgs,
  QueryOrganizationPerspectivesArgs,
  QueryOrganizationFeaturesArgs,
  MutationUpdateOptscaleCapabilityArgs,
  QueryOrganizationConstraintArgs,
  QueryResourceCountBreakdownArgs,
  QueryExpensesDailyBreakdownArgs,
  QueryOrganizationLimitHitsArgs,
  QueryEmployeeEmailsArgs,
} from "../../graphql/resolvers/restapi.generated.js";

class RestApiClient extends BaseClient {
  override baseURL = `${
    process.env.RESTAPI_ENDPOINT || this.endpoint
  }/restapi/v2/`;

  async getOrganizations() {
    const organizations = await this.get("organizations");

    return organizations.organizations;
  }

  async getCurrentEmployee(organizationId: string) {
    const path = `organizations/${organizationId}/employees?current_only=true`;
    const currentEmployee = await this.get(path);

    return currentEmployee.employees[0];
  }

  async getDataSources(organizationId: string) {
    const path = `organizations/${organizationId}/cloud_accounts?details=true`;

    const dataSources = await this.get(path);

    return dataSources.cloud_accounts;
  }

  async getDataSource(
    dataSourceId: string,
    requestParams: DataSourceRequestParams
  ) {
    const path = `cloud_accounts/${dataSourceId}?details=${requestParams.details}`;

    const dataSource = await this.get(path);

    return dataSource;
  }

  async createDataSource(
    organizationId: MutationCreateDataSourceArgs["organizationId"],
    params: MutationCreateDataSourceArgs["params"]
  ) {
    const path = `organizations/${organizationId}/cloud_accounts`;

    const dataSource = await this.post(path, {
      body: {
        name: params.name,
        type: params.type,
        config: {
          ...params.awsRootConfig,
          ...params.awsLinkedConfig,
          ...params.azureSubscriptionConfig,
          ...params.azureTenantConfig,
          ...params.gcpConfig,
          ...params.gcpTenantConfig,
          ...params.alibabaConfig,
          ...params.nebiusConfig,
          ...params.databricksConfig,
          ...params.k8sConfig,
        },
      },
    });

    return dataSource;
  }

  async updateDataSource(
    dataSourceId: MutationUpdateDataSourceArgs["dataSourceId"],
    params: MutationUpdateDataSourceArgs["params"]
  ) {
    const path = `cloud_accounts/${dataSourceId}`;

    const dataSource = await this.patch(path, {
      body: JSON.stringify({
        name: params.name,
        last_import_at: params.lastImportAt,
        last_import_modified_at: params.lastImportModifiedAt,
        config: {
          ...params.awsRootConfig,
          ...params.awsLinkedConfig,
          ...params.azureSubscriptionConfig,
          ...params.azureTenantConfig,
          ...params.gcpConfig,
          ...params.gcpTenantConfig,
          ...params.alibabaConfig,
          ...params.nebiusConfig,
          ...params.databricksConfig,
          ...params.k8sConfig,
        },
      }),
    });

    return dataSource;
  }

  async getEmployeeEmails(employeeId: QueryEmployeeEmailsArgs["employeeId"]) {
    const path = `employees/${employeeId}/emails`;

    const emails = await this.get(path);

    return emails.employee_emails;
  }

  async updateEmployeeEmails(
    employeeId: MutationUpdateEmployeeEmailsArgs["employeeId"],
    params: MutationUpdateEmployeeEmailsArgs["params"]
  ) {
    const path = `employees/${employeeId}/emails/bulk`;

    const emails = await this.post(path, {
      body: params,
    });

    const emailIds = [...(params?.enable ?? []), ...(params.disable ?? [])];

    return emails.employee_emails.filter((email) =>
      emailIds.includes(email.id)
    );
  }

  async updateEmployeeEmail(
    employeeId: MutationUpdateEmployeeEmailArgs["employeeId"],
    params: MutationUpdateEmployeeEmailArgs["params"]
  ) {
    const { emailId, action } = params;

    const path = `employees/${employeeId}/emails/bulk`;

    const emails = await this.post(path, {
      body: {
        [action === "enable" ? "enable" : "disable"]: [emailId],
      },
    });

    const email = emails.employee_emails.find((email) => email.id === emailId);

    return email;
  }

  async deleteDataSource(dataSourceId) {
    const path = `cloud_accounts/${dataSourceId}`;

    return await this.delete(path);
  }

  async getInvitations() {
    const invitations = await this.get("invites");

    return invitations.invites;
  }

  async updateInvitation(invitationId: string, action: string) {
    const path = `invites/${invitationId}`;

    return await this.patch(path, {
      body: JSON.stringify({
        action,
      }),
    });
  }

  async getOrganizationFeatures(
    organizationId: QueryOrganizationFeaturesArgs["organizationId"]
  ) {
    const path = `organizations/${organizationId}/options/features`;
    const features = await this.get(path);

    const parsedFeatures = JSON.parse(features.value);

    return parsedFeatures;
  }

  async getOptscaleCapability(organizationId: string) {
    const path = `organizations/${organizationId}/options/optscale_mode`;
    const capability = await this.get(path);

    const parsedCapability = JSON.parse(capability.value);

    return parsedCapability.value;
  }

  async updateOptscaleCapability(
    organizationId: MutationUpdateOptscaleCapabilityArgs["organizationId"],
    value: MutationUpdateOptscaleCapabilityArgs["value"]
  ) {
    const path = `organizations/${organizationId}/options/optscale_mode`;
    const capability = await this.patch(path, {
      body: {
        value: JSON.stringify({
          value,
        }),
      },
    });

    const parsedCapability = JSON.parse(capability.value);

    return parsedCapability.value;
  }

  async getOrganizationThemeSettings(organizationId: string) {
    const path = `organizations/${organizationId}/options/theme_settings`;
    const settings = await this.get(path);

    const parsedSettings = JSON.parse(settings.value);

    return parsedSettings;
  }

  async updateOrganizationThemeSettings(organizationId, value) {
    const themeSettings = await this.patch(
      `organizations/${organizationId}/options/theme_settings`,
      {
        body: {
          value: JSON.stringify(value),
        },
      }
    );

    const parsedThemeSettings = JSON.parse(themeSettings.value);

    return parsedThemeSettings;
  }

  async getOrganizationPerspectives(
    organizationId: QueryOrganizationPerspectivesArgs["organizationId"]
  ) {
    const path = `organizations/${organizationId}/options/perspectives`;
    const perspectives = await this.get(path);

    const parsedPerspectives = JSON.parse(perspectives.value);

    return parsedPerspectives;
  }

  async updateOrganizationPerspectives(
    organizationId: MutationUpdateOrganizationPerspectivesArgs["organizationId"],
    value: MutationUpdateOrganizationPerspectivesArgs["value"]
  ) {
    const perspectives = await this.patch(
      `organizations/${organizationId}/options/perspectives`,
      {
        body: {
          value: JSON.stringify(value),
        },
      }
    );

    const parsedPerspectives = JSON.parse(perspectives.value);

    return parsedPerspectives;
  }

  async createOrganization(
    organizationName: MutationCreateOrganizationArgs["organizationName"]
  ) {
    return await this.post("organizations", {
      body: {
        name: organizationName,
      },
    });
  }

  async updateOrganization(
    organizationId: MutationUpdateOrganizationArgs["organizationId"],
    params: MutationUpdateOrganizationArgs["params"]
  ) {
    return await this.patch(`organizations/${organizationId}`, {
      body: params,
    });
  }

  async deleteOrganization(
    organizationId: MutationDeleteOrganizationArgs["organizationId"]
  ) {
    return await this.delete(`organizations/${organizationId}`);
  }

  async getOrganizationConstraint(
    constraintId: QueryOrganizationConstraintArgs["constraintId"]
  ) {
    const path = `organization_constraints/${constraintId}`;

    const organizationConstraint = await this.get(path);

    return organizationConstraint;
  }

  async getResourceCountBreakdown(
    organizationId: QueryResourceCountBreakdownArgs["organizationId"],
    params: QueryResourceCountBreakdownArgs["params"]
  ) {
    const path = `organizations/${organizationId}/resources_count`;

    const stringParams = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.map(String) : String(value),
      ])
    );

    const urlSearchParams = new URLSearchParams(stringParams);

    const resourceCountBreakdown = await this.get(
      `${path}?${urlSearchParams.toString()}`
    );

    return resourceCountBreakdown;
  }

  async getExpensesDailyBreakdown(
    organizationId: QueryExpensesDailyBreakdownArgs["organizationId"],
    params: QueryExpensesDailyBreakdownArgs["params"]
  ) {
    const path = `organizations/${organizationId}/breakdown_expenses`;

    const stringParams = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.map(String) : String(value),
      ])
    );

    const urlSearchParams = new URLSearchParams(stringParams);

    const dailyExpensesBreakdown = await this.get(
      `${path}?${urlSearchParams.toString()}`
    );

    return dailyExpensesBreakdown;
  }

  async getOrganizationLimitHits(
    organizationId: QueryOrganizationLimitHitsArgs["organizationId"],
    constraintId: QueryOrganizationLimitHitsArgs["constraintId"]
  ) {
    const path = `organizations/${organizationId}/organization_limit_hits?constraint_id=${constraintId}`;

    const organizationLimitHits = await this.get(path);

    return organizationLimitHits.organization_limit_hits;
  }

  async getRelevantFlavors(organizationId, requestParams) {
    // Rewrite with utility function
    const getParams = (params: Record<string, string | string[]>) => {
      const urlParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          value.forEach((datum) => {
            urlParams.append(key, datum);
          });
        } else {
          urlParams.append(key, value.toString());
        }
      });
      return urlParams.toString();
    };

    const path = `organizations/${organizationId}/relevant_flavors?${getParams(
      requestParams
    )}`;

    const flavors = await this.get(path);

    return flavors;
  }

  async getCleanExpenses(organizationId, params) {
    const queryString = qs.stringify(params, { arrayFormat: "repeat" });

    const path = `organizations/${organizationId}/clean_expenses?${queryString}`;

    const cleanExpenses = await this.get(path);

    return cleanExpenses;
  }
}

export default RestApiClient;
