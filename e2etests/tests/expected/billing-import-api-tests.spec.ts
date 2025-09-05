import {test} from "../../fixtures/api-fixture";
import {debugLog} from "../../utils/debug-logging";
import {DataSourceResponse} from "../../test-data/test-data-response-types";
import {expect} from "@playwright/test";

test.describe('Billing import API tests', {tag: ["@api", "@p1"]}, () => {

    const dataSourceId = process.env.BASE_URL === process.env.DEV
        ? "c86dfcec-08ba-4007-a617-8f53efbfba06"
        : process.env.BASE_URL === process.env.TEST
            ? "9294ab26-47c9-411f-8e62-7734da899f48"
            : (() => {
                throw "Data Source ID for this environment is not set";
            })();

    let postData = {
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


    test.only('A successful billing import should have been successful within the last 24 hours', async ({
                                                                                                             restAPIRequest,
                                                                                                             authRequest
                                                                                                         }) => {
        const endpoint = '/api';
        const email = process.env.DEFAULT_USER_EMAIL as string;
        const password = process.env.DEFAULT_USER_PASSWORD as string;

        const token = await authRequest.getAuthorizationToken(email, password);
        const headers = {
            "Content-Type": "application/json",
            "X-Optscale-token": token
        }

        const response = await restAPIRequest.getPostResponse(endpoint, headers, postData);
        const json = await response.json() as DataSourceResponse;
        debugLog(`Status: ${response.status().toString()}`);

        const payload = JSON.parse(await response.text());
        debugLog(`Data Source Response: ${JSON.stringify(payload)}`);

        const lastSuccessfulImport = json.data.dataSource.last_import_at;
        const now = Math.floor(Date.now() / 1000);
        const secondsIn24Hours = 24 * 60 * 60;

        const timeDifference = now - lastSuccessfulImport;
        debugLog(`Current Time (s): ${now}, Last Successful Import: ${lastSuccessfulImport}, Time Difference: ${timeDifference} seconds`);

        expect(timeDifference).toBeLessThan(secondsIn24Hours);
    });

});