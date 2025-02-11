import { gql } from "@apollo/client";

const AwsDataSourceConfigFragment = gql`
  fragment AwsDataSourceConfigFragment on AwsDataSource {
    config {
      access_key_id
      linked
      use_edp_discount
      cur_version
      bucket_name
      bucket_prefix
      config_scheme
      region_name
      report_name
    }
  }
`;

const AzureTenantDataSourceConfigFragment = gql`
  fragment AzureTenantDataSourceConfigFragment on AzureTenantDataSource {
    config {
      client_id
      tenant
    }
  }
`;

const AzureSubscriptionDataSourceConfigFragment = gql`
  fragment AzureSubscriptionDataSourceConfigFragment on AzureSubscriptionDataSource {
    config {
      client_id
      expense_import_scheme
      subscription_id
      tenant
    }
  }
`;

const GcpDataSourceConfigFragment = gql`
  fragment GcpDataSourceConfigFragment on GcpDataSource {
    config {
      billing_data {
        dataset_name
        table_name
        project_id
      }
    }
  }
`;

const GcpTenantDataSourceConfigFragment = gql`
  fragment GcpTenantDataSourceConfigFragment on GcpTenantDataSource {
    config {
      billing_data {
        dataset_name
        table_name
        project_id
      }
    }
  }
`;

const AlibabaDataSourceConfigFragment = gql`
  fragment AlibabaDataSourceConfigFragment on AlibabaDataSource {
    config {
      access_key_id
    }
  }
`;

const NebiusDataSourceConfigFragment = gql`
  fragment NebiusDataSourceConfigFragment on NebiusDataSource {
    config {
      cloud_name
      service_account_id
      key_id
      access_key_id
      bucket_name
      bucket_prefix
    }
  }
`;

const DatabricksDataSourceConfigFragment = gql`
  fragment DatabricksDataSourceConfigFragment on DatabricksDataSource {
    config {
      account_id
      client_id
    }
  }
`;

const K8sDataSourceConfigFragment = gql`
  fragment K8sDataSourceConfigFragment on K8sDataSource {
    config {
      cost_model {
        cpu_hourly_cost
        memory_hourly_cost
      }
      user
    }
  }
`;

const GET_ORGANIZATIONS = gql`
  query Organizations {
    organizations {
      id
      name
      pool_id
      currency
      is_demo
    }
  }
`;

const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($organizationName: String!) {
    createOrganization(organizationName: $organizationName) {
      id
      name
    }
  }
`;

const UPDATE_ORGANIZATION = gql`
  mutation UpdateOrganization($organizationId: ID!, $params: UpdateOrganizationInput!) {
    updateOrganization(organizationId: $organizationId, params: $params) {
      id
      name
      currency
    }
  }
`;

const DELETE_ORGANIZATION = gql`
  mutation DeleteOrganization($organizationId: ID!) {
    deleteOrganization(organizationId: $organizationId)
  }
`;

const GET_CURRENT_EMPLOYEE = gql`
  query CurrentEmployee($organizationId: ID!) {
    currentEmployee(organizationId: $organizationId) {
      id
      jira_connected
      slack_connected
    }
  }
`;

const GET_DATA_SOURCES = gql`
  query DataSources($organizationId: ID!) {
    dataSources(organizationId: $organizationId) {
      account_id
      id
      last_getting_metric_attempt_at
      last_getting_metric_attempt_error
      last_getting_metrics_at
      last_import_at
      last_import_attempt_at
      last_import_attempt_error
      name
      parent_id
      type
      details {
        cost
        resources
        forecast
        last_month_cost
      }
      ...AwsDataSourceConfigFragment
      ...AzureTenantDataSourceConfigFragment
      ...AzureSubscriptionDataSourceConfigFragment
      ...GcpDataSourceConfigFragment
      ...GcpTenantDataSourceConfigFragment
      ...AlibabaDataSourceConfigFragment
      ...NebiusDataSourceConfigFragment
      ...DatabricksDataSourceConfigFragment
      ...K8sDataSourceConfigFragment
    }
  }
  ${AwsDataSourceConfigFragment}
  ${AzureTenantDataSourceConfigFragment}
  ${AzureSubscriptionDataSourceConfigFragment}
  ${GcpDataSourceConfigFragment}
  ${GcpTenantDataSourceConfigFragment}
  ${AlibabaDataSourceConfigFragment}
  ${NebiusDataSourceConfigFragment}
  ${DatabricksDataSourceConfigFragment}
  ${K8sDataSourceConfigFragment}
`;

const GET_DATA_SOURCE = gql`
  query DataSource($dataSourceId: ID!, $requestParams: DataSourceRequestParams) {
    dataSource(dataSourceId: $dataSourceId, requestParams: $requestParams) {
      account_id
      id
      last_getting_metric_attempt_at
      last_getting_metric_attempt_error
      last_getting_metrics_at
      last_import_at
      last_import_attempt_at
      last_import_attempt_error
      name
      parent_id
      type
      details {
        cost
        discovery_infos {
          cloud_account_id
          created_at
          deleted_at
          enabled
          id
          last_discovery_at
          last_error
          last_error_at
          observe_time
          resource_type
        }
        forecast
        last_month_cost
        resources
      }
      ...AwsDataSourceConfigFragment
      ...AzureTenantDataSourceConfigFragment
      ...AzureSubscriptionDataSourceConfigFragment
      ...GcpDataSourceConfigFragment
      ...GcpTenantDataSourceConfigFragment
      ...AlibabaDataSourceConfigFragment
      ...NebiusDataSourceConfigFragment
      ...DatabricksDataSourceConfigFragment
      ...K8sDataSourceConfigFragment
    }
  }
  ${AwsDataSourceConfigFragment}
  ${AzureTenantDataSourceConfigFragment}
  ${AzureSubscriptionDataSourceConfigFragment}
  ${GcpDataSourceConfigFragment}
  ${GcpTenantDataSourceConfigFragment}
  ${AlibabaDataSourceConfigFragment}
  ${NebiusDataSourceConfigFragment}
  ${DatabricksDataSourceConfigFragment}
  ${K8sDataSourceConfigFragment}
`;

const GET_INVITATIONS = gql`
  query Invitations {
    invitations {
      id
      owner_name
      owner_email
      organization
      invite_assignments {
        id
        scope_id
        scope_name
        scope_type
        purpose
      }
    }
  }
`;

const UPDATE_INVITATION = gql`
  mutation UpdateInvitation($invitationId: String!, $action: String!) {
    updateInvitation(invitationId: $invitationId, action: $action)
  }
`;

const GET_ORGANIZATION_FEATURES = gql`
  query OrganizationFeatures($organizationId: ID!) {
    organizationFeatures(organizationId: $organizationId)
  }
`;

const GET_OPTSCALE_CAPABILITY = gql`
  query OptscaleCapability($organizationId: ID!) {
    optscaleCapability(organizationId: $organizationId) {
      finops
      mlops
    }
  }
`;

const UPDATE_OPTSCALE_CAPABILITY = gql`
  mutation UpdateOptscaleCapability($organizationId: ID!, $value: OptscaleCapabilityParams) {
    updateOptscaleCapability(organizationId: $organizationId, value: $value) {
      finops
      mlops
    }
  }
`;

const GET_ORGANIZATION_THEME_SETTINGS = gql`
  query OrganizationThemeSettings($organizationId: ID!) {
    organizationThemeSettings(organizationId: $organizationId)
  }
`;

const UPDATE_ORGANIZATION_THEME_SETTINGS = gql`
  mutation UpdateOrganizationThemeSettings($organizationId: ID!, $value: JSONObject!) {
    updateOrganizationThemeSettings(organizationId: $organizationId, value: $value)
  }
`;

const GET_ORGANIZATION_PERSPECTIVES = gql`
  query OrganizationPerspectives($organizationId: ID!) {
    organizationPerspectives(organizationId: $organizationId)
  }
`;

const UPDATE_ORGANIZATION_PERSPECTIVES = gql`
  mutation UpdateOrganizationPerspectives($organizationId: ID!, $value: JSONObject!) {
    updateOrganizationPerspectives(organizationId: $organizationId, value: $value)
  }
`;

const CREATE_DATA_SOURCE = gql`
  mutation CreateDataSource($organizationId: ID!, $params: CreateDataSourceInput!) {
    createDataSource(organizationId: $organizationId, params: $params) {
      id
      name
    }
  }
`;

const GET_EMPLOYEE_EMAILS = gql`
  query EmployeeEmails($employeeId: ID!) {
    employeeEmails(employeeId: $employeeId) {
      id
      employee_id
      email_template
      enabled
      available_by_role
    }
  }
`;

const UPDATE_EMPLOYEE_EMAILS = gql`
  mutation UpdateEmployeeEmails($employeeId: ID!, $params: UpdateEmployeeEmailsInput!) {
    updateEmployeeEmails(employeeId: $employeeId, params: $params) {
      id
      employee_id
      email_template
      enabled
      available_by_role
    }
  }
`;

const UPDATE_EMPLOYEE_EMAIL = gql`
  mutation UpdateEmployeeEmail($employeeId: ID!, $params: UpdateEmployeeEmailInput!) {
    updateEmployeeEmail(employeeId: $employeeId, params: $params) {
      id
      employee_id
      email_template
      enabled
      available_by_role
    }
  }
`;

const UPDATE_DATA_SOURCE = gql`
  mutation UpdateDataSource($dataSourceId: ID!, $params: UpdateDataSourceInput!) {
    updateDataSource(dataSourceId: $dataSourceId, params: $params) {
      id
      name
      ...AwsDataSourceConfigFragment
      ...AzureTenantDataSourceConfigFragment
      ...AzureSubscriptionDataSourceConfigFragment
      ...GcpDataSourceConfigFragment
      ...AlibabaDataSourceConfigFragment
      ...NebiusDataSourceConfigFragment
      ...DatabricksDataSourceConfigFragment
      ...K8sDataSourceConfigFragment
    }
  }
  ${AwsDataSourceConfigFragment}
  ${AzureTenantDataSourceConfigFragment}
  ${AzureSubscriptionDataSourceConfigFragment}
  ${GcpDataSourceConfigFragment}
  ${AlibabaDataSourceConfigFragment}
  ${NebiusDataSourceConfigFragment}
  ${DatabricksDataSourceConfigFragment}
  ${K8sDataSourceConfigFragment}
`;

const DELETE_DATA_SOURCE = gql`
  mutation DeleteDataSource($dataSourceId: ID!) {
    deleteDataSource(dataSourceId: $dataSourceId)
  }
`;

export {
  CREATE_DATA_SOURCE,
  UPDATE_DATA_SOURCE,
  DELETE_DATA_SOURCE,
  GET_ORGANIZATIONS,
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  DELETE_ORGANIZATION,
  GET_DATA_SOURCES,
  GET_DATA_SOURCE,
  GET_INVITATIONS,
  UPDATE_INVITATION,
  GET_CURRENT_EMPLOYEE,
  GET_ORGANIZATION_FEATURES,
  GET_OPTSCALE_CAPABILITY,
  UPDATE_OPTSCALE_CAPABILITY,
  GET_ORGANIZATION_THEME_SETTINGS,
  GET_EMPLOYEE_EMAILS,
  UPDATE_EMPLOYEE_EMAILS,
  UPDATE_EMPLOYEE_EMAIL,
  UPDATE_ORGANIZATION_THEME_SETTINGS,
  GET_ORGANIZATION_PERSPECTIVES,
  UPDATE_ORGANIZATION_PERSPECTIVES
};
