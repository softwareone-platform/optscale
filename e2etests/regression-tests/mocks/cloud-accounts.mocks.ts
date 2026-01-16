const SAMPLE_ID = '1d0fe384-b1cf-4929-ad5e-1aa544f93dd5';
const SAMPLE_NAME = 'SoftwareOne[e2e] (Test Environment)';
const POOL_ID = 'ccaceadf-6878-4ab4-9fd8-3f6177d0b9d3';

export const CurrentEmployee = {
  'data': {
    'currentEmployee': {
      'id': '73b8772c-7a66-4261-96e6-8e4b494dd25b',
      'jira_connected': false,
      'slack_connected': false,
      '__typename': 'Employee',
    },
  },
};

export const DataSourcesMock = {
  "data": {
    "dataSources": [
      {
        "account_id": "2d2f328c-1407-4e5e-ba59-1cbad182940f",
        "created_at": 1744297042,
        "id": "947cbf94-afc3-4055-b96d-eff284c36a09",
        "last_getting_metric_attempt_at": 1765537219,
        "last_getting_metric_attempt_error": "'value'",
        "last_getting_metrics_at": 1765537219,
        "last_import_at": 1765534014,
        "last_import_attempt_at": 1765534014,
        "last_import_attempt_error": "Authentication failed: AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credent",
        "name": "CHaaS (Production)",
        "parent_id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
        "type": "azure_cnr",
        "details": {
          "cost": 2057.985143512819,
          "resources": 77,
          "forecast": 5784.63,
          "last_month_cost": 5581.633084736816,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "client_id": "990d710f-9527-4155-98da-7e1a0e637406",
          "expense_import_scheme": "usage",
          "subscription_id": "2d2f328c-1407-4e5e-ba59-1cbad182940f",
          "tenant": "1dc9b339-fadb-432e-86df-423c38a0fcb8",
          "export_name": null,
          "container": null,
          "directory": null,
          "__typename": "AzureSubscriptionConfig"
        },
        "__typename": "AzureSubscriptionDataSource"
      },
      {
        "account_id": "6c73c89e-7e5b-43b5-a7c4-1b0cb260dafb",
        "created_at": 1744297045,
        "id": "1aa5f619-eab6-4d80-a11f-b2765c4a4795",
        "last_getting_metric_attempt_at": 1765537221,
        "last_getting_metric_attempt_error": "AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credentials for added security: https://aka.ms/certCreds. Trace ID: 36f2db53-5a20-4f68-a338-9640dc554200 Correlation ID: c953a48b-cf72-4105-aeaa-ff91cea9c13d Timestamp: 2025-10-09 06:00:14Z",
        "last_getting_metrics_at": 1765537221,
        "last_import_at": 1765537311,
        "last_import_attempt_at": 1765537311,
        "last_import_attempt_error": "Authentication failed: AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credent",
        "name": "CHaaS (QA)",
        "parent_id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
        "type": "azure_cnr",
        "details": {
          "cost": 823.8334637229897,
          "resources": 64,
          "forecast": 2301.49,
          "last_month_cost": 2205.3718712843884,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "client_id": "990d710f-9527-4155-98da-7e1a0e637406",
          "expense_import_scheme": "usage",
          "subscription_id": "6c73c89e-7e5b-43b5-a7c4-1b0cb260dafb",
          "tenant": "1dc9b339-fadb-432e-86df-423c38a0fcb8",
          "export_name": null,
          "container": null,
          "directory": null,
          "__typename": "AzureSubscriptionConfig"
        },
        "__typename": "AzureSubscriptionDataSource"
      },
      {
        "account_id": "91819a1c-c7d3-4b89-bc9f-39f85bff4666",
        "created_at": 1744295707,
        "id": "d4321470-cfa8-4a67-adf5-c11faf491e14",
        "last_getting_metric_attempt_at": 1765537223,
        "last_getting_metric_attempt_error": "{'code': 'InternalServerError', 'message': \"Encountered internal server error. Diagnostic information: timestamp '20251020T080023Z', subscription id '91819a1c-c7d3-4b89-bc9f-39f85bff4666', tracking id 'ae4d6aef-afc4-43c1-972c-949c083d2adf', request correlation id '778dbf81-2ea8-4ddc-986f-4546f34ee72c'.\"}",
        "last_getting_metrics_at": 1765537223,
        "last_import_at": 1765537418,
        "last_import_attempt_at": 1765537418,
        "last_import_attempt_error": "Error occurred in request., ConnectionError: HTTPSConnectionPool(host='apim-ratecard-v1.azure-api.net', port=443): Read timed out.",
        "name": "CPA (Development and Test)",
        "parent_id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
        "type": "azure_cnr",
        "details": {
          "cost": 17117.632561932514,
          "resources": 960,
          "forecast": 44805.53,
          "last_month_cost": 39642.55199693907,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "client_id": "990d710f-9527-4155-98da-7e1a0e637406",
          "expense_import_scheme": "raw_usage",
          "subscription_id": "91819a1c-c7d3-4b89-bc9f-39f85bff4666",
          "tenant": "1dc9b339-fadb-432e-86df-423c38a0fcb8",
          "export_name": null,
          "container": null,
          "directory": null,
          "__typename": "AzureSubscriptionConfig"
        },
        "__typename": "AzureSubscriptionDataSource"
      },
      {
        "account_id": "01643997-4d64-4718-8114-15e488ce3f61",
        "created_at": 1744297056,
        "id": "100efd88-28fb-49f1-946b-edbf78ad4650",
        "last_getting_metric_attempt_at": 1765537225,
        "last_getting_metric_attempt_error": "string indices must be integers, not 'str'",
        "last_getting_metrics_at": 1765537225,
        "last_import_at": 1765533959,
        "last_import_attempt_at": 1765533959,
        "last_import_attempt_error": "500 Server Error: Internal Server Error for url: http://restapi:80/restapi/v2/cloud_accounts/100efd88-28fb-49f1-946b-edbf78ad4650/cloud_resources/bulk?behavior=skip_existing&return_resources=True&is_report_import=True",
        "name": "CPA (Infrastructure)",
        "parent_id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
        "type": "azure_cnr",
        "details": {
          "cost": 5290.258807538159,
          "resources": 404,
          "forecast": 16117.03,
          "last_month_cost": 16904.614496762297,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "client_id": "990d710f-9527-4155-98da-7e1a0e637406",
          "expense_import_scheme": "usage",
          "subscription_id": "01643997-4d64-4718-8114-15e488ce3f61",
          "tenant": "1dc9b339-fadb-432e-86df-423c38a0fcb8",
          "export_name": null,
          "container": null,
          "directory": null,
          "__typename": "AzureSubscriptionConfig"
        },
        "__typename": "AzureSubscriptionDataSource"
      },
      {
        "account_id": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
        "created_at": 1744297151,
        "id": "1812ae7a-890f-413a-a4e3-9a76c357cfb2",
        "last_getting_metric_attempt_at": 1765537226,
        "last_getting_metric_attempt_error": "{'code': 'InternalServerError', 'message': \"Encountered internal server error. Diagnostic information: timestamp '20251021T100024Z', subscription id 'b6689fdb-ac8c-4116-8136-c7a179cb5be6', tracking id '2d7f9a51-c3c4-431f-8467-4565fddfb2c5', request correlation id '0dd69234-b3e3-4ddb-b876-65bf13a514e3'.\"}",
        "last_getting_metrics_at": 1765537226,
        "last_import_at": 1765534014,
        "last_import_attempt_at": 1765534014,
        "last_import_attempt_error": "Authentication failed: AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credent",
        "name": "CPA (QA and Production)",
        "parent_id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
        "type": "azure_cnr",
        "details": {
          "cost": 36061.899116833214,
          "resources": 1426,
          "forecast": 118586.14,
          "last_month_cost": 133112.80446463253,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "client_id": "990d710f-9527-4155-98da-7e1a0e637406",
          "expense_import_scheme": "usage",
          "subscription_id": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
          "tenant": "1dc9b339-fadb-432e-86df-423c38a0fcb8",
          "export_name": null,
          "container": null,
          "directory": null,
          "__typename": "AzureSubscriptionConfig"
        },
        "__typename": "AzureSubscriptionDataSource"
      },
      {
        "account_id": "203689795269",
        "created_at": 1765530386,
        "id": "a1adba45-9068-4b49-8cd0-0834d35c3960",
        "last_getting_metric_attempt_at": 1765537259,
        "last_getting_metric_attempt_error": null,
        "last_getting_metrics_at": 1765537259,
        "last_import_at": 0,
        "last_import_attempt_at": 1765537221,
        "last_import_attempt_error": null,
        "name": "Marketplace (Dev)",
        "parent_id": null,
        "type": "aws_cnr",
        "details": {
          "cost": 168.41083624000026,
          "resources": 279,
          "forecast": 702.69,
          "last_month_cost": 926.8611773277983,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "assume_role_account_id": "203689795269",
          "assume_role_name": "FinOpsForCloudOperations",
          "access_key_id": "AKIAS63G3T3CQOHK7SEG",
          "linked": null,
          "use_edp_discount": false,
          "cur_version": 2,
          "bucket_name": "swofinopsdevcur",
          "bucket_prefix": "reports",
          "config_scheme": "bucket_only",
          "region_name": "eu-west-1",
          "report_name": "FinopsTest",
          "__typename": "AwsConfig"
        },
        "__typename": "AwsDataSource"
      },
      {
        "account_id": "654035049067",
        "created_at": 1746464618,
        "id": "3f584d10-4293-4599-8ad5-413acc72fd45",
        "last_getting_metric_attempt_at": 1765537260,
        "last_getting_metric_attempt_error": null,
        "last_getting_metrics_at": 1765537260,
        "last_import_at": 1765189214,
        "last_import_attempt_at": 1765189214,
        "last_import_attempt_error": "Key not found : /force_aws_edp_strip",
        "name": "Marketplace (Production)",
        "parent_id": null,
        "type": "aws_cnr",
        "details": {
          "cost": 129.14167115665825,
          "resources": 207,
          "forecast": 388.62,
          "last_month_cost": 402.7908213691991,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "assume_role_account_id": null,
          "assume_role_name": null,
          "access_key_id": "AKIAZQR4G3JVRTTL2DUY",
          "linked": true,
          "use_edp_discount": null,
          "cur_version": null,
          "bucket_name": null,
          "bucket_prefix": null,
          "config_scheme": null,
          "region_name": null,
          "report_name": null,
          "__typename": "AwsConfig"
        },
        "__typename": "AwsDataSource"
      },
      {
        "account_id": "563690021965",
        "created_at": 1761311347,
        "id": "ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5",
        "last_getting_metric_attempt_at": 0,
        "last_getting_metric_attempt_error": null,
        "last_getting_metrics_at": 0,
        "last_import_at": 1765189214,
        "last_import_attempt_at": 1765189214,
        "last_import_attempt_error": null,
        "name": "Marketplace (Staging)",
        "parent_id": null,
        "type": "aws_cnr",
        "details": {
          "cost": 1.4905050363354906,
          "resources": 153,
          "forecast": 3.72,
          "last_month_cost": 3.075698334700009,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "assume_role_account_id": "563690021965",
          "assume_role_name": "FinOpsForCloudAssumeRole",
          "access_key_id": "AKIAS63G3T3CQOHK7SEG",
          "linked": true,
          "use_edp_discount": null,
          "cur_version": null,
          "bucket_name": null,
          "bucket_prefix": null,
          "config_scheme": null,
          "region_name": null,
          "report_name": null,
          "__typename": "AwsConfig"
        },
        "__typename": "AwsDataSource"
      },
      {
        "account_id": "996403779197",
        "created_at": 1765201965,
        "id": "380b7812-d18d-46e6-9286-328ced6771aa",
        "last_getting_metric_attempt_at": 0,
        "last_getting_metric_attempt_error": null,
        "last_getting_metrics_at": 0,
        "last_import_at": 0,
        "last_import_attempt_at": 0,
        "last_import_attempt_error": null,
        "name": "Marketplace (Test)",
        "parent_id": null,
        "type": "aws_cnr",
        "details": {
          "cost": 0,
          "resources": 0,
          "forecast": 0,
          "last_month_cost": 0,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "assume_role_account_id": null,
          "assume_role_name": null,
          "access_key_id": "AKIA6P7SLCZ6TGN2JF7L",
          "linked": true,
          "use_edp_discount": null,
          "cur_version": null,
          "bucket_name": null,
          "bucket_prefix": null,
          "config_scheme": null,
          "region_name": null,
          "report_name": null,
          "__typename": "AwsConfig"
        },
        "__typename": "AwsDataSource"
      },
      {
        "account_id": "e30e2a6e-0712-48c3-8685-3298df063633",
        "created_at": 1744296911,
        "id": "b509e2e2-20a4-48eb-ac60-b291338feff4",
        "last_getting_metric_attempt_at": 1765537263,
        "last_getting_metric_attempt_error": "{'code': 'ServerTimeout', 'message': \"The request timed out. Diagnostic information: timestamp '20251130T000714Z', subscription id '', tracking id 'fe0abbfa-9b6f-4eaf-8407-14d1ca67a330', request correlation id 'fe0abbfa-9b6f-4eaf-8407-14d1ca67a330'.\"}",
        "last_getting_metrics_at": 1765537263,
        "last_import_at": 1765537452,
        "last_import_attempt_at": 1765537452,
        "last_import_attempt_error": "Authentication failed: AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credent",
        "name": "MPT (Dev)",
        "parent_id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
        "type": "azure_cnr",
        "details": {
          "cost": 7310.8680896157275,
          "resources": 665,
          "forecast": 18510.11,
          "last_month_cost": 15647.58174662595,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "client_id": "990d710f-9527-4155-98da-7e1a0e637406",
          "expense_import_scheme": "usage",
          "subscription_id": "e30e2a6e-0712-48c3-8685-3298df063633",
          "tenant": "1dc9b339-fadb-432e-86df-423c38a0fcb8",
          "export_name": null,
          "container": null,
          "directory": null,
          "__typename": "AzureSubscriptionConfig"
        },
        "__typename": "AzureSubscriptionDataSource"
      },
      {
        "account_id": "ef415e11-361a-4f91-8b3c-23aeb9c8f2ac",
        "created_at": 1744296933,
        "id": "96e23b8d-854b-42d7-8b59-264e6f314b2d",
        "last_getting_metric_attempt_at": 1765537263,
        "last_getting_metric_attempt_error": "{'code': 'InternalServerError', 'message': \"Encountered internal server error. Diagnostic information: timestamp '20251020T090038Z', subscription id 'ef415e11-361a-4f91-8b3c-23aeb9c8f2ac', tracking id 'c869269e-9655-4e2e-9fb8-482b94396b51', request correlation id '8db40c4c-4c12-47e8-a9f8-c3d0e29e7864'.\"}",
        "last_getting_metrics_at": 1765537263,
        "last_import_at": 1765537330,
        "last_import_attempt_at": 1765537330,
        "last_import_attempt_error": "Error occurred in request., ConnectionError: HTTPSConnectionPool(host='apim-ratecard-v1.azure-api.net', port=443): Read timed out.",
        "name": "MPT (Production)",
        "parent_id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
        "type": "azure_cnr",
        "details": {
          "cost": 37.06935349294216,
          "resources": 9,
          "forecast": 103.43,
          "last_month_cost": 98.96752888599298,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "client_id": "990d710f-9527-4155-98da-7e1a0e637406",
          "expense_import_scheme": "raw_usage",
          "subscription_id": "ef415e11-361a-4f91-8b3c-23aeb9c8f2ac",
          "tenant": "1dc9b339-fadb-432e-86df-423c38a0fcb8",
          "export_name": null,
          "container": null,
          "directory": null,
          "__typename": "AzureSubscriptionConfig"
        },
        "__typename": "AzureSubscriptionDataSource"
      },
      {
        "account_id": "dea8e892-1212-42c9-afa0-3b87e7bfffd5",
        "created_at": 1744297031,
        "id": "a611abd8-9cde-4b17-ab54-31f9d43dc955",
        "last_getting_metric_attempt_at": 1765537265,
        "last_getting_metric_attempt_error": "AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credentials for added security: https://aka.ms/certCreds. Trace ID: 6bd4108f-119e-4cd8-ba6c-f1ea210d0200 Correlation ID: a778f076-e060-430b-b035-d9c3bdd69662 Timestamp: 2025-10-09 06:00:38Z",
        "last_getting_metrics_at": 1765537265,
        "last_import_at": 1765533830,
        "last_import_attempt_at": 1765533830,
        "last_import_attempt_error": "Authentication failed: AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credent",
        "name": "MPT (Test)",
        "parent_id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
        "type": "azure_cnr",
        "details": {
          "cost": 937.4585359371241,
          "resources": 29,
          "forecast": 2618.83,
          "last_month_cost": 2509.3461929804116,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "client_id": "990d710f-9527-4155-98da-7e1a0e637406",
          "expense_import_scheme": "usage",
          "subscription_id": "dea8e892-1212-42c9-afa0-3b87e7bfffd5",
          "tenant": "1dc9b339-fadb-432e-86df-423c38a0fcb8",
          "export_name": null,
          "container": null,
          "directory": null,
          "__typename": "AzureSubscriptionConfig"
        },
        "__typename": "AzureSubscriptionDataSource"
      },
      {
        "account_id": "6964b7a4-9ce4-4975-98d7-b9a2e3b0a48e",
        "created_at": 1744296919,
        "id": "0708f18c-b23a-4652-8fd1-5d95f89226a9",
        "last_getting_metric_attempt_at": 1746002139,
        "last_getting_metric_attempt_error": "ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms),ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms),ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms), Timeout: 30s, Topology Description: <TopologyDescription id: 6811e0bce7595c93dc238391, topology_type: ReplicaSetNoPrimary, servers: [<ServerDescription ('ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>, <ServerDescription ('ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>, <ServerDescription ('ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>]>",
        "last_getting_metrics_at": 0,
        "last_import_at": 1765537379,
        "last_import_attempt_at": 1765537379,
        "last_import_attempt_error": "Error occurred in request., ConnectionError: HTTPSConnectionPool(host='apim-ratecard-v1.azure-api.net', port=443): Read timed out.",
        "name": "MPT Finops (Dev)",
        "parent_id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
        "type": "azure_cnr",
        "details": {
          "cost": 0,
          "resources": 0,
          "forecast": 0,
          "last_month_cost": 0,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "client_id": "990d710f-9527-4155-98da-7e1a0e637406",
          "expense_import_scheme": "raw_usage",
          "subscription_id": "6964b7a4-9ce4-4975-98d7-b9a2e3b0a48e",
          "tenant": "1dc9b339-fadb-432e-86df-423c38a0fcb8",
          "export_name": null,
          "container": null,
          "directory": null,
          "__typename": "AzureSubscriptionConfig"
        },
        "__typename": "AzureSubscriptionDataSource"
      },
      {
        "account_id": "89b098bc-b400-4578-8058-8416b0c25f6b",
        "created_at": 1744296940,
        "id": "cb78a18a-6adc-4780-9402-d175086accdc",
        "last_getting_metric_attempt_at": 1765537266,
        "last_getting_metric_attempt_error": "{'code': 'InternalServerError', 'message': \"Encountered internal server error. Diagnostic information: timestamp '20251021T070045Z', subscription id '89b098bc-b400-4578-8058-8416b0c25f6b', tracking id 'cd773de3-e609-4127-a224-8a14a1dfbb2c', request correlation id '8111d08e-fb74-4510-a994-b78a61f428d0'.\"}",
        "last_getting_metrics_at": 1765537266,
        "last_import_at": 1765537364,
        "last_import_attempt_at": 1765537364,
        "last_import_attempt_error": "Error occurred in request., RetryError: HTTPSConnectionPool(host='management.azure.com', port=443): Max retries exceeded with url: /subscriptions/89b098bc-b400-4578-8058-8416b0c25f6b/providers/Microsoft.Commerce/RateCard?$filter=OfferDurableId%20eq%20%27M",
        "name": "MPT Finops (Production)",
        "parent_id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
        "type": "azure_cnr",
        "details": {
          "cost": 3929.8555708000104,
          "resources": 29,
          "forecast": 9860.88,
          "last_month_cost": 8228.745073153372,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "client_id": "990d710f-9527-4155-98da-7e1a0e637406",
          "expense_import_scheme": "raw_usage",
          "subscription_id": "89b098bc-b400-4578-8058-8416b0c25f6b",
          "tenant": "1dc9b339-fadb-432e-86df-423c38a0fcb8",
          "export_name": null,
          "container": null,
          "directory": null,
          "__typename": "AzureSubscriptionConfig"
        },
        "__typename": "AzureSubscriptionDataSource"
      },
      {
        "account_id": "63f2c438-c0e1-4606-ac10-eb6aa149c6cb",
        "created_at": 1744296947,
        "id": "12fa3bce-5513-40c8-96d7-0be2fc47ebcf",
        "last_getting_metric_attempt_at": 1765537266,
        "last_getting_metric_attempt_error": "{'code': 'SubscriptionRequestsThrottled', 'message': \"Number of requests for subscription '63f2c438-c0e1-4606-ac10-eb6aa149c6cb' and operation 'GET/SUBSCRIPTIONS/RESOURCEGROUPS/PROVIDERS/MICROSOFT.NETWORK/LOADBALANCERS/PROVIDERS/MICROSOFT.INSIGHTS/METRICS' exceeded the backend storage limit. Please try again after '6' seconds.\"}",
        "last_getting_metrics_at": 1765537266,
        "last_import_at": 1765537351,
        "last_import_attempt_at": 1765537351,
        "last_import_attempt_error": "Error occurred in request., RetryError: HTTPSConnectionPool(host='management.azure.com', port=443): Max retries exceeded with url: /subscriptions/63f2c438-c0e1-4606-ac10-eb6aa149c6cb/providers/Microsoft.Commerce/RateCard?$filter=OfferDurableId%20eq%20%27M",
        "name": "MPT Finops (Staging)",
        "parent_id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
        "type": "azure_cnr",
        "details": {
          "cost": 1141.0647336933264,
          "resources": 27,
          "forecast": 3224.5,
          "last_month_cost": 3129.9739815732273,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "client_id": "990d710f-9527-4155-98da-7e1a0e637406",
          "expense_import_scheme": "raw_usage",
          "subscription_id": "63f2c438-c0e1-4606-ac10-eb6aa149c6cb",
          "tenant": "1dc9b339-fadb-432e-86df-423c38a0fcb8",
          "export_name": null,
          "container": null,
          "directory": null,
          "__typename": "AzureSubscriptionConfig"
        },
        "__typename": "AzureSubscriptionDataSource"
      },
      {
        "account_id": "a37be38a-56e4-4fab-8e3c-e4738f50ad70",
        "created_at": 1744297038,
        "id": "29b2698f-6110-4a7c-88f7-58a14e4db6af",
        "last_getting_metric_attempt_at": 1746002230,
        "last_getting_metric_attempt_error": "ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms),ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms),ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms), Timeout: 30s, Topology Description: <TopologyDescription id: 6811e118e7595c93dc238394, topology_type: ReplicaSetNoPrimary, servers: [<ServerDescription ('ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>, <ServerDescription ('ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>, <ServerDescription ('ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>]>",
        "last_getting_metrics_at": 0,
        "last_import_at": 1765537409,
        "last_import_attempt_at": 1765537409,
        "last_import_attempt_error": "Error occurred in request., ConnectionError: HTTPSConnectionPool(host='apim-ratecard-v1.azure-api.net', port=443): Read timed out.",
        "name": "MPT Finops (Test)",
        "parent_id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
        "type": "azure_cnr",
        "details": {
          "cost": 0,
          "resources": 0,
          "forecast": 0,
          "last_month_cost": 0,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "client_id": "990d710f-9527-4155-98da-7e1a0e637406",
          "expense_import_scheme": "raw_usage",
          "subscription_id": "a37be38a-56e4-4fab-8e3c-e4738f50ad70",
          "tenant": "1dc9b339-fadb-432e-86df-423c38a0fcb8",
          "export_name": null,
          "container": null,
          "directory": null,
          "__typename": "AzureSubscriptionConfig"
        },
        "__typename": "AzureSubscriptionDataSource"
      },
      {
        "account_id": "a7e5cb3a-1b68-445b-9234-7cebea7a6458",
        "created_at": 1744296952,
        "id": "fe5d1e82-2b10-4786-8f44-0dfd7ac3144a",
        "last_getting_metric_attempt_at": 1746002260,
        "last_getting_metric_attempt_error": "ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms),ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms),ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms), Timeout: 30s, Topology Description: <TopologyDescription id: 6811e136e7595c93dc238395, topology_type: ReplicaSetNoPrimary, servers: [<ServerDescription ('ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>, <ServerDescription ('ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>, <ServerDescription ('ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>]>",
        "last_getting_metrics_at": 0,
        "last_import_at": 1765537373,
        "last_import_attempt_at": 1765537373,
        "last_import_attempt_error": "Error occurred in request., ConnectionError: HTTPSConnectionPool(host='apim-ratecard-v1.azure-api.net', port=443): Read timed out.",
        "name": "MPT Platform (Staging)",
        "parent_id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
        "type": "azure_cnr",
        "details": {
          "cost": 0,
          "resources": 0,
          "forecast": 0,
          "last_month_cost": 0,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "client_id": "990d710f-9527-4155-98da-7e1a0e637406",
          "expense_import_scheme": "raw_usage",
          "subscription_id": "a7e5cb3a-1b68-445b-9234-7cebea7a6458",
          "tenant": "1dc9b339-fadb-432e-86df-423c38a0fcb8",
          "export_name": null,
          "container": null,
          "directory": null,
          "__typename": "AzureSubscriptionConfig"
        },
        "__typename": "AzureSubscriptionDataSource"
      },
      {
        "account_id": "1dc9b339-fadb-432e-86df-423c38a0fcb8",
        "created_at": 1744295667,
        "id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
        "last_getting_metric_attempt_at": 0,
        "last_getting_metric_attempt_error": null,
        "last_getting_metrics_at": 0,
        "last_import_at": 0,
        "last_import_attempt_at": 1764764361,
        "last_import_attempt_error": "Cloud azure_tenant is not supported",
        "name": "SoftwareOne (E2E)",
        "parent_id": null,
        "type": "azure_tenant",
        "details": {
          "cost": 0,
          "resources": 0,
          "forecast": 0,
          "last_month_cost": 0,
          "__typename": "DataSourceDetails"
        },
        "config": {
          "client_id": "990d710f-9527-4155-98da-7e1a0e637406",
          "tenant": "1dc9b339-fadb-432e-86df-423c38a0fcb8",
          "__typename": "AzureTenantConfig"
        },
        "__typename": "AzureTenantDataSource"
      }
    ]
  }
}

export const poolsMock =
  {
    'deleted_at': 0,
    'id': POOL_ID,
    'created_at': 1743693482,
    'limit': 15000,
    'name': SAMPLE_NAME,
    'organization_id': SAMPLE_ID,
    'parent_id': null,
    'purpose': 'business_unit',
    'default_owner_id': '4447ab7b-da32-4d3e-8840-f244ed505c05',
    'default_owner_name': 'Francesco',
    'unallocated_limit': 154387,
  };
