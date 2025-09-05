export const dataSourceId = process.env.BASE_URL === process.env.DEV
    ? "c86dfcec-08ba-4007-a617-8f53efbfba06"
    : process.env.BASE_URL === process.env.TEST
        ? "9294ab26-47c9-411f-8e62-7734da899f48"
        : (() => {
            throw "Data Source ID for this environment is not set";
        })();

export const postData = {
    operationName: "DataSource",
    query: `query DataSource($dataSourceId: ID!, $requestParams: DataSourceRequestParams) {
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
          __typename
        }
        forecast
        last_month_cost
        resources
        __typename
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
      __typename
    }
  }

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
      __typename
    }
    __typename
  }

  fragment AzureTenantDataSourceConfigFragment on AzureTenantDataSource {
    config {
      client_id
      tenant
      __typename
    }
    __typename
  }

  fragment AzureSubscriptionDataSourceConfigFragment on AzureSubscriptionDataSource {
    config {
      client_id
      expense_import_scheme
      subscription_id
      tenant
      export_name
      container
      directory
      __typename
    }
    __typename
  }

  fragment GcpDataSourceConfigFragment on GcpDataSource {
    config {
      billing_data {
        dataset_name
        table_name
        project_id
        __typename
      }
      __typename
    }
    __typename
  }

  fragment GcpTenantDataSourceConfigFragment on GcpTenantDataSource {
    config {
      billing_data {
        dataset_name
        table_name
        project_id
        __typename
      }
      __typename
    }
    __typename
  }

  fragment AlibabaDataSourceConfigFragment on AlibabaDataSource {
    config {
      access_key_id
      __typename
    }
    __typename
  }

  fragment NebiusDataSourceConfigFragment on NebiusDataSource {
    config {
      cloud_name
      service_account_id
      key_id
      access_key_id
      bucket_name
      bucket_prefix
      __typename
    }
    __typename
  }

  fragment DatabricksDataSourceConfigFragment on DatabricksDataSource {
    config {
      account_id
      client_id
      __typename
    }
    __typename
  }

  fragment K8sDataSourceConfigFragment on K8sDataSource {
    config {
      cost_model {
        cpu_hourly_cost
        memory_hourly_cost
        __typename
      }
      user
      __typename
    }
    __typename
  }`,
    variables: {
        dataSourceId: dataSourceId,
        requestParams: {
            details: true
        }
    }
};