export const AnomaliesDefaultExpensesOrganizationLimitsHitResponse = {
  data: {
    organizationLimitHits: [
      {
        run_result: {
          average: 10737.003458170077,
          today: 43279.451679928,
          breakdown: {
            '1749081600': 10770.661584709376,
            '1749168000': 10792.501581249035,
            '1749254400': 10687.328173765156,
            '1749340800': 10655.314477327189,
            '1749427200': 10727.079957893227,
            '1749513600': 10788.90775321885,
            '1749600000': 10737.230679027702,
          },
        },
        created_at: 1749763202,
        value: 43279.5,
        constraint_limit: 10737,
        __typename: 'OrganizationLimitHit',
      },
      {
        run_result: {
          average: 13184.283150764704,
          today: 25579.350214389306,
          breakdown: {
            '1754352000': 13250.797594940663,
            '1754438400': 13212.34670485989,
            '1754524800': 13272.942078137656,
            '1754611200': 13215.12977051536,
            '1754697600': 13098.754090515622,
            '1754784000': 13114.781277862327,
            '1754870400': 13125.23053852143,
          },
        },
        created_at: 1755034202,
        value: 25579.3,
        constraint_limit: 13184.3,
        __typename: 'OrganizationLimitHit',
      },
      {
        run_result: {
          average: 13649.71958538722,
          today: 47918.07110085513,
          breakdown: {
            '1757030400': 13734.993868127896,
            '1757116800': 13628.105303706892,
            '1757203200': 13458.89792387465,
            '1757289600': 13629.015112268531,
            '1757376000': 13676.361325500013,
            '1757462400': 13745.943148722637,
            '1757548800': 13674.720415509906,
          },
        },
        created_at: 1757702101,
        value: 47918.1,
        constraint_limit: 13649.7,
        __typename: 'OrganizationLimitHit',
      },
      {
        run_result: {
          average: 14358.852744120024,
          today: 48409.59831644273,
          breakdown: {
            '1759622400': 13681.972047778412,
            '1759708800': 13793.42888717583,
            '1759795200': 13839.835894524826,
            '1759881600': 13986.306036102582,
            '1759968000': 15324.23012077531,
            '1760054400': 16148.938573064508,
            '1760140800': 13737.257649418689,
          },
        },
        created_at: 1760302502,
        value: 48409.6,
        constraint_limit: 14358.9,
        __typename: 'OrganizationLimitHit',
      },
    ],
  },
};

export const AnomaliesDataSourcesResponse = {
  data: {
    dataSources: [
      {
        account_id: '996403779197',
        id: 'b4529ebc-cf01-4671-bedc-b8fffefa47be',
        last_getting_metric_attempt_at: 0,
        last_getting_metric_attempt_error: null,
        last_getting_metrics_at: 0,
        last_import_at: 1762860192,
        last_import_attempt_at: 1762860192,
        last_import_attempt_error: null,
        name: ' Marketplace (Test)',
        parent_id: null,
        type: 'aws_cnr',
        details: {
          cost: 5.997395562266647,
          resources: 153,
          forecast: 12.39,
          last_month_cost: 7.09911059599989,
          __typename: 'DataSourceDetails',
        },
        config: {
          assume_role_account_id: null,
          assume_role_name: null,
          access_key_id: 'AKIA6P7SLCZ6TGN2JF7L',
          linked: true,
          use_edp_discount: null,
          cur_version: null,
          bucket_name: null,
          bucket_prefix: null,
          config_scheme: null,
          region_name: null,
          report_name: null,
          __typename: 'AwsConfig',
        },
        __typename: 'AwsDataSource',
      },
      {
        account_id: '2d2f328c-1407-4e5e-ba59-1cbad182940f',
        id: '947cbf94-afc3-4055-b96d-eff284c36a09',
        last_getting_metric_attempt_at: 1762869627,
        last_getting_metric_attempt_error:
          "{'code': 'InternalServerError', 'message': \"Encountered internal server error. Diagnostic information: timestamp '20251021T103012Z', subscription id '2d2f328c-1407-4e5e-ba59-1cbad182940f', tracking id '5f21d270-7539-4458-a838-2ca6f37c250f', request correlation id 'e71cb91b-6fd7-4138-bd00-6b36d3d5390a'.\"}",
        last_getting_metrics_at: 1762869627,
        last_import_at: 1762869824,
        last_import_attempt_at: 1762869824,
        last_import_attempt_error:
          "Authentication failed: AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credent",
        name: 'CHaaS (Production)',
        parent_id: '0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83',
        type: 'azure_cnr',
        details: {
          cost: 1968.8050655956338,
          resources: 79,
          forecast: 5720.19,
          last_month_cost: 5721.541818188461,
          __typename: 'DataSourceDetails',
        },
        config: {
          client_id: '990d710f-9527-4155-98da-7e1a0e637406',
          expense_import_scheme: 'usage',
          subscription_id: '2d2f328c-1407-4e5e-ba59-1cbad182940f',
          tenant: '1dc9b339-fadb-432e-86df-423c38a0fcb8',
          export_name: null,
          container: null,
          directory: null,
          __typename: 'AzureSubscriptionConfig',
        },
        __typename: 'AzureSubscriptionDataSource',
      },
      {
        account_id: '6c73c89e-7e5b-43b5-a7c4-1b0cb260dafb',
        id: '1aa5f619-eab6-4d80-a11f-b2765c4a4795',
        last_getting_metric_attempt_at: 1762869629,
        last_getting_metric_attempt_error:
          "AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credentials for added security: https://aka.ms/certCreds. Trace ID: 36f2db53-5a20-4f68-a338-9640dc554200 Correlation ID: c953a48b-cf72-4105-aeaa-ff91cea9c13d Timestamp: 2025-10-09 06:00:14Z",
        last_getting_metrics_at: 1762869629,
        last_import_at: 1762869963,
        last_import_attempt_at: 1762869963,
        last_import_attempt_error:
          "Authentication failed: AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credent",
        name: 'CHaaS (QA)',
        parent_id: '0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83',
        type: 'azure_cnr',
        details: {
          cost: 757.888521365433,
          resources: 64,
          forecast: 2258.35,
          last_month_cost: 2318.0562316594837,
          __typename: 'DataSourceDetails',
        },
        config: {
          client_id: '990d710f-9527-4155-98da-7e1a0e637406',
          expense_import_scheme: 'usage',
          subscription_id: '6c73c89e-7e5b-43b5-a7c4-1b0cb260dafb',
          tenant: '1dc9b339-fadb-432e-86df-423c38a0fcb8',
          export_name: null,
          container: null,
          directory: null,
          __typename: 'AzureSubscriptionConfig',
        },
        __typename: 'AzureSubscriptionDataSource',
      },
      {
        account_id: '91819a1c-c7d3-4b89-bc9f-39f85bff4666',
        id: 'd4321470-cfa8-4a67-adf5-c11faf491e14',
        last_getting_metric_attempt_at: 1762869631,
        last_getting_metric_attempt_error:
          "{'code': 'InternalServerError', 'message': \"Encountered internal server error. Diagnostic information: timestamp '20251020T080023Z', subscription id '91819a1c-c7d3-4b89-bc9f-39f85bff4666', tracking id 'ae4d6aef-afc4-43c1-972c-949c083d2adf', request correlation id '778dbf81-2ea8-4ddc-986f-4546f34ee72c'.\"}",
        last_getting_metrics_at: 1762869631,
        last_import_at: 1762869797,
        last_import_attempt_at: 1762869797,
        last_import_attempt_error:
          "AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credentials for added security",
        name: 'CPA (Development and Test)',
        parent_id: '0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83',
        type: 'azure_cnr',
        details: {
          cost: 12420.111661950834,
          resources: 937,
          forecast: 38634.22,
          last_month_cost: 41318.801270946264,
          __typename: 'DataSourceDetails',
        },
        config: {
          client_id: '990d710f-9527-4155-98da-7e1a0e637406',
          expense_import_scheme: 'raw_usage',
          subscription_id: '91819a1c-c7d3-4b89-bc9f-39f85bff4666',
          tenant: '1dc9b339-fadb-432e-86df-423c38a0fcb8',
          export_name: null,
          container: null,
          directory: null,
          __typename: 'AzureSubscriptionConfig',
        },
        __typename: 'AzureSubscriptionDataSource',
      },
      {
        account_id: '01643997-4d64-4718-8114-15e488ce3f61',
        id: '100efd88-28fb-49f1-946b-edbf78ad4650',
        last_getting_metric_attempt_at: 1762869633,
        last_getting_metric_attempt_error: "string indices must be integers, not 'str'",
        last_getting_metrics_at: 1762869633,
        last_import_at: 1762869991,
        last_import_attempt_at: 1762869991,
        last_import_attempt_error:
          '500 Server Error: Internal Server Error for url: http://restapi:80/restapi/v2/cloud_accounts/100efd88-28fb-49f1-946b-edbf78ad4650/cloud_resources/bulk?behavior=skip_existing&return_resources=True&is_report_import=True',
        name: 'CPA (Infrastructure)',
        parent_id: '0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83',
        type: 'azure_cnr',
        details: {
          cost: 4788.255545055901,
          resources: 336,
          forecast: 15324.5,
          last_month_cost: 16811.03912384947,
          __typename: 'DataSourceDetails',
        },
        config: {
          client_id: '990d710f-9527-4155-98da-7e1a0e637406',
          expense_import_scheme: 'usage',
          subscription_id: '01643997-4d64-4718-8114-15e488ce3f61',
          tenant: '1dc9b339-fadb-432e-86df-423c38a0fcb8',
          export_name: null,
          container: null,
          directory: null,
          __typename: 'AzureSubscriptionConfig',
        },
        __typename: 'AzureSubscriptionDataSource',
      },
      {
        account_id: 'b6689fdb-ac8c-4116-8136-c7a179cb5be6',
        id: '1812ae7a-890f-413a-a4e3-9a76c357cfb2',
        last_getting_metric_attempt_at: 1762869635,
        last_getting_metric_attempt_error:
          "{'code': 'InternalServerError', 'message': \"Encountered internal server error. Diagnostic information: timestamp '20251021T100024Z', subscription id 'b6689fdb-ac8c-4116-8136-c7a179cb5be6', tracking id '2d7f9a51-c3c4-431f-8467-4565fddfb2c5', request correlation id '0dd69234-b3e3-4ddb-b876-65bf13a514e3'.\"}",
        last_getting_metrics_at: 1762869635,
        last_import_at: 1762870060,
        last_import_attempt_at: 1762870060,
        last_import_attempt_error:
          "Authentication failed: AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credent",
        name: 'CPA (QA and Production)',
        parent_id: '0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83',
        type: 'azure_cnr',
        details: {
          cost: 33318.54195190305,
          resources: 1504,
          forecast: 116166.59,
          last_month_cost: 136519.95883959936,
          __typename: 'DataSourceDetails',
        },
        config: {
          client_id: '990d710f-9527-4155-98da-7e1a0e637406',
          expense_import_scheme: 'usage',
          subscription_id: 'b6689fdb-ac8c-4116-8136-c7a179cb5be6',
          tenant: '1dc9b339-fadb-432e-86df-423c38a0fcb8',
          export_name: null,
          container: null,
          directory: null,
          __typename: 'AzureSubscriptionConfig',
        },
        __typename: 'AzureSubscriptionDataSource',
      },
      {
        account_id: '203689795269',
        id: 'b5d9eb31-1136-4a76-90fa-a8e2886de702',
        last_getting_metric_attempt_at: 1762869668,
        last_getting_metric_attempt_error: null,
        last_getting_metrics_at: 1762869668,
        last_import_at: 1762343197,
        last_import_attempt_at: 1762869628,
        last_import_attempt_error:
          'Report files for report FinopsTest2 not found in bucket swofinopsdevcur. Please check your CUR version and existence of report files in the bucket',
        name: 'Marketplace (Dev)',
        parent_id: null,
        type: 'aws_cnr',
        details: {
          cost: 141.6708932456,
          resources: 256,
          forecast: 846.04,
          last_month_cost: 1302.2813958254978,
          __typename: 'DataSourceDetails',
        },
        config: {
          assume_role_account_id: '203689795269',
          assume_role_name: 'FinOpsForCloudOperations',
          access_key_id: 'AKIAS63G3T3CQOHK7SEG',
          linked: null,
          use_edp_discount: false,
          cur_version: 2,
          bucket_name: 'swofinopsdevcur',
          bucket_prefix: 'reports',
          config_scheme: 'bucket_only',
          region_name: 'eu-west-1',
          report_name: 'FinopsTest2',
          __typename: 'AwsConfig',
        },
        __typename: 'AwsDataSource',
      },
      {
        account_id: '654035049067',
        id: '3f584d10-4293-4599-8ad5-413acc72fd45',
        last_getting_metric_attempt_at: 1762869669,
        last_getting_metric_attempt_error: null,
        last_getting_metrics_at: 1762869669,
        last_import_at: 1762860192,
        last_import_attempt_at: 1762860192,
        last_import_attempt_error: 'Key not found : /force_aws_edp_strip',
        name: 'Marketplace (Production)',
        parent_id: null,
        type: 'aws_cnr',
        details: {
          cost: 66.01976000043346,
          resources: 203,
          forecast: 141.47,
          last_month_cost: 88.6502967837009,
          __typename: 'DataSourceDetails',
        },
        config: {
          assume_role_account_id: null,
          assume_role_name: null,
          access_key_id: 'AKIAZQR4G3JVRTTL2DUY',
          linked: true,
          use_edp_discount: null,
          cur_version: null,
          bucket_name: null,
          bucket_prefix: null,
          config_scheme: null,
          region_name: null,
          report_name: null,
          __typename: 'AwsConfig',
        },
        __typename: 'AwsDataSource',
      },
      {
        account_id: '563690021965',
        id: 'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5',
        last_getting_metric_attempt_at: 0,
        last_getting_metric_attempt_error: null,
        last_getting_metrics_at: 0,
        last_import_at: 1762860192,
        last_import_attempt_at: 1762860192,
        last_import_attempt_error: null,
        name: 'Marketplace (Staging)',
        parent_id: null,
        type: 'aws_cnr',
        details: {
          cost: 0.7509425197333326,
          resources: 159,
          forecast: 1.76,
          last_month_cost: 1.325492848299996,
          __typename: 'DataSourceDetails',
        },
        config: {
          assume_role_account_id: '563690021965',
          assume_role_name: 'FinOpsForCloudAssumeRole',
          access_key_id: 'AKIAS63G3T3CQOHK7SEG',
          linked: true,
          use_edp_discount: null,
          cur_version: null,
          bucket_name: null,
          bucket_prefix: null,
          config_scheme: null,
          region_name: null,
          report_name: null,
          __typename: 'AwsConfig',
        },
        __typename: 'AwsDataSource',
      },
      {
        account_id: 'e30e2a6e-0712-48c3-8685-3298df063633',
        id: 'b509e2e2-20a4-48eb-ac60-b291338feff4',
        last_getting_metric_attempt_at: 1762869674,
        last_getting_metric_attempt_error:
          "{'code': 'InternalServerError', 'message': \"Encountered internal server error. Diagnostic information: timestamp '20251021T093040Z', subscription id 'e30e2a6e-0712-48c3-8685-3298df063633', tracking id 'a17709b4-7819-4f95-8dfa-f260c9266fe9', request correlation id 'f675b2ea-9680-4b91-863d-a9a1846c48ac'.\"}",
        last_getting_metrics_at: 1762869674,
        last_import_at: 1762869800,
        last_import_attempt_at: 1762869800,
        last_import_attempt_error:
          "Authentication failed: AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credent",
        name: 'MPT (Dev)',
        parent_id: '0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83',
        type: 'azure_cnr',
        details: {
          cost: 4295.2103093644055,
          resources: 408,
          forecast: 12093.45,
          last_month_cost: 11691.179856988265,
          __typename: 'DataSourceDetails',
        },
        config: {
          client_id: '990d710f-9527-4155-98da-7e1a0e637406',
          expense_import_scheme: 'usage',
          subscription_id: 'e30e2a6e-0712-48c3-8685-3298df063633',
          tenant: '1dc9b339-fadb-432e-86df-423c38a0fcb8',
          export_name: null,
          container: null,
          directory: null,
          __typename: 'AzureSubscriptionConfig',
        },
        __typename: 'AzureSubscriptionDataSource',
      },
      {
        account_id: 'ef415e11-361a-4f91-8b3c-23aeb9c8f2ac',
        id: '96e23b8d-854b-42d7-8b59-264e6f314b2d',
        last_getting_metric_attempt_at: 1762869674,
        last_getting_metric_attempt_error:
          "{'code': 'InternalServerError', 'message': \"Encountered internal server error. Diagnostic information: timestamp '20251020T090038Z', subscription id 'ef415e11-361a-4f91-8b3c-23aeb9c8f2ac', tracking id 'c869269e-9655-4e2e-9fb8-482b94396b51', request correlation id '8db40c4c-4c12-47e8-a9f8-c3d0e29e7864'.\"}",
        last_getting_metrics_at: 1762869674,
        last_import_at: 1762869730,
        last_import_attempt_at: 1762869730,
        last_import_attempt_error:
          "Error occurred in request., RetryError: HTTPSConnectionPool(host='management.azure.com', port=443): Max retries exceeded with url: /subscriptions/ef415e11-361a-4f91-8b3c-23aeb9c8f2ac/providers/Microsoft.Commerce/RateCard?$filter=OfferDurableId%20eq%20%27M",
        name: 'MPT (Production)',
        parent_id: '0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83',
        type: 'azure_cnr',
        details: {
          cost: 31.26965646015538,
          resources: 6,
          forecast: 78.52,
          last_month_cost: 65.60120960084535,
          __typename: 'DataSourceDetails',
        },
        config: {
          client_id: '990d710f-9527-4155-98da-7e1a0e637406',
          expense_import_scheme: 'raw_usage',
          subscription_id: 'ef415e11-361a-4f91-8b3c-23aeb9c8f2ac',
          tenant: '1dc9b339-fadb-432e-86df-423c38a0fcb8',
          export_name: null,
          container: null,
          directory: null,
          __typename: 'AzureSubscriptionConfig',
        },
        __typename: 'AzureSubscriptionDataSource',
      },
      {
        account_id: 'dea8e892-1212-42c9-afa0-3b87e7bfffd5',
        id: 'a611abd8-9cde-4b17-ab54-31f9d43dc955',
        last_getting_metric_attempt_at: 1762869676,
        last_getting_metric_attempt_error:
          "AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credentials for added security: https://aka.ms/certCreds. Trace ID: 6bd4108f-119e-4cd8-ba6c-f1ea210d0200 Correlation ID: a778f076-e060-430b-b035-d9c3bdd69662 Timestamp: 2025-10-09 06:00:38Z",
        last_getting_metrics_at: 1762869676,
        last_import_at: 1762869716,
        last_import_attempt_at: 1762869716,
        last_import_attempt_error:
          "Authentication failed: AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credent",
        name: 'MPT (Test)',
        parent_id: '0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83',
        type: 'azure_cnr',
        details: {
          cost: 861.0734237064089,
          resources: 29,
          forecast: 2594.71,
          last_month_cost: 2692.881221262146,
          __typename: 'DataSourceDetails',
        },
        config: {
          client_id: '990d710f-9527-4155-98da-7e1a0e637406',
          expense_import_scheme: 'usage',
          subscription_id: 'dea8e892-1212-42c9-afa0-3b87e7bfffd5',
          tenant: '1dc9b339-fadb-432e-86df-423c38a0fcb8',
          export_name: null,
          container: null,
          directory: null,
          __typename: 'AzureSubscriptionConfig',
        },
        __typename: 'AzureSubscriptionDataSource',
      },
      {
        account_id: '6964b7a4-9ce4-4975-98d7-b9a2e3b0a48e',
        id: '0708f18c-b23a-4652-8fd1-5d95f89226a9',
        last_getting_metric_attempt_at: 1746002139,
        last_getting_metric_attempt_error:
          "ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms),ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms),ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms), Timeout: 30s, Topology Description: <TopologyDescription id: 6811e0bce7595c93dc238391, topology_type: ReplicaSetNoPrimary, servers: [<ServerDescription ('ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>, <ServerDescription ('ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>, <ServerDescription ('ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>]>",
        last_getting_metrics_at: 0,
        last_import_at: 1762869755,
        last_import_attempt_at: 1762869755,
        last_import_attempt_error:
          "Error occurred in request., RetryError: HTTPSConnectionPool(host='management.azure.com', port=443): Max retries exceeded with url: /subscriptions/6964b7a4-9ce4-4975-98d7-b9a2e3b0a48e/providers/Microsoft.Commerce/RateCard?$filter=OfferDurableId%20eq%20%27M",
        name: 'MPT Finops (Dev)',
        parent_id: '0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83',
        type: 'azure_cnr',
        details: {
          cost: 0,
          resources: 0,
          forecast: 0,
          last_month_cost: 0,
          __typename: 'DataSourceDetails',
        },
        config: {
          client_id: '990d710f-9527-4155-98da-7e1a0e637406',
          expense_import_scheme: 'raw_usage',
          subscription_id: '6964b7a4-9ce4-4975-98d7-b9a2e3b0a48e',
          tenant: '1dc9b339-fadb-432e-86df-423c38a0fcb8',
          export_name: null,
          container: null,
          directory: null,
          __typename: 'AzureSubscriptionConfig',
        },
        __typename: 'AzureSubscriptionDataSource',
      },
      {
        account_id: '89b098bc-b400-4578-8058-8416b0c25f6b',
        id: 'cb78a18a-6adc-4780-9402-d175086accdc',
        last_getting_metric_attempt_at: 1762869677,
        last_getting_metric_attempt_error:
          "{'code': 'InternalServerError', 'message': \"Encountered internal server error. Diagnostic information: timestamp '20251021T070045Z', subscription id '89b098bc-b400-4578-8058-8416b0c25f6b', tracking id 'cd773de3-e609-4127-a224-8a14a1dfbb2c', request correlation id '8111d08e-fb74-4510-a994-b78a61f428d0'.\"}",
        last_getting_metrics_at: 1762869677,
        last_import_at: 1762869720,
        last_import_attempt_at: 1762869720,
        last_import_attempt_error:
          "Error occurred in request., RetryError: HTTPSConnectionPool(host='management.azure.com', port=443): Max retries exceeded with url: /subscriptions/89b098bc-b400-4578-8058-8416b0c25f6b/providers/Microsoft.Commerce/RateCard?$filter=OfferDurableId%20eq%20%27M",
        name: 'MPT Finops (Production)',
        parent_id: '0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83',
        type: 'azure_cnr',
        details: {
          cost: 1976.261975040058,
          resources: 29,
          forecast: 5737.45,
          last_month_cost: 5734.164836339334,
          __typename: 'DataSourceDetails',
        },
        config: {
          client_id: '990d710f-9527-4155-98da-7e1a0e637406',
          expense_import_scheme: 'raw_usage',
          subscription_id: '89b098bc-b400-4578-8058-8416b0c25f6b',
          tenant: '1dc9b339-fadb-432e-86df-423c38a0fcb8',
          export_name: null,
          container: null,
          directory: null,
          __typename: 'AzureSubscriptionConfig',
        },
        __typename: 'AzureSubscriptionDataSource',
      },
      {
        account_id: '63f2c438-c0e1-4606-ac10-eb6aa149c6cb',
        id: '12fa3bce-5513-40c8-96d7-0be2fc47ebcf',
        last_getting_metric_attempt_at: 1762869677,
        last_getting_metric_attempt_error:
          "{'code': 'SubscriptionRequestsThrottled', 'message': \"Number of requests for subscription '63f2c438-c0e1-4606-ac10-eb6aa149c6cb' and operation 'GET/SUBSCRIPTIONS/RESOURCEGROUPS/PROVIDERS/MICROSOFT.NETWORK/LOADBALANCERS/PROVIDERS/MICROSOFT.INSIGHTS/METRICS' exceeded the backend storage limit. Please try again after '6' seconds.\"}",
        last_getting_metrics_at: 1762869677,
        last_import_at: 1762869765,
        last_import_attempt_at: 1762869765,
        last_import_attempt_error:
          "Error occurred in request., RetryError: HTTPSConnectionPool(host='management.azure.com', port=443): Max retries exceeded with url: /subscriptions/63f2c438-c0e1-4606-ac10-eb6aa149c6cb/providers/Microsoft.Commerce/RateCard?$filter=OfferDurableId%20eq%20%27M",
        name: 'MPT Finops (Staging)',
        parent_id: '0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83',
        type: 'azure_cnr',
        details: {
          cost: 1031.571079630519,
          resources: 27,
          forecast: 3094.47,
          last_month_cost: 3197.3816208281196,
          __typename: 'DataSourceDetails',
        },
        config: {
          client_id: '990d710f-9527-4155-98da-7e1a0e637406',
          expense_import_scheme: 'raw_usage',
          subscription_id: '63f2c438-c0e1-4606-ac10-eb6aa149c6cb',
          tenant: '1dc9b339-fadb-432e-86df-423c38a0fcb8',
          export_name: null,
          container: null,
          directory: null,
          __typename: 'AzureSubscriptionConfig',
        },
        __typename: 'AzureSubscriptionDataSource',
      },
      {
        account_id: 'a37be38a-56e4-4fab-8e3c-e4738f50ad70',
        id: '29b2698f-6110-4a7c-88f7-58a14e4db6af',
        last_getting_metric_attempt_at: 1746002230,
        last_getting_metric_attempt_error:
          "ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms),ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms),ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms), Timeout: 30s, Topology Description: <TopologyDescription id: 6811e118e7595c93dc238394, topology_type: ReplicaSetNoPrimary, servers: [<ServerDescription ('ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>, <ServerDescription ('ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>, <ServerDescription ('ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>]>",
        last_getting_metrics_at: 0,
        last_import_at: 1762869832,
        last_import_attempt_at: 1762869832,
        last_import_attempt_error:
          "Error occurred in request., RetryError: HTTPSConnectionPool(host='management.azure.com', port=443): Max retries exceeded with url: /subscriptions/a37be38a-56e4-4fab-8e3c-e4738f50ad70/providers/Microsoft.Commerce/RateCard?$filter=OfferDurableId%20eq%20%27M",
        name: 'MPT Finops (Test)',
        parent_id: '0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83',
        type: 'azure_cnr',
        details: {
          cost: 0,
          resources: 0,
          forecast: 0,
          last_month_cost: 0,
          __typename: 'DataSourceDetails',
        },
        config: {
          client_id: '990d710f-9527-4155-98da-7e1a0e637406',
          expense_import_scheme: 'raw_usage',
          subscription_id: 'a37be38a-56e4-4fab-8e3c-e4738f50ad70',
          tenant: '1dc9b339-fadb-432e-86df-423c38a0fcb8',
          export_name: null,
          container: null,
          directory: null,
          __typename: 'AzureSubscriptionConfig',
        },
        __typename: 'AzureSubscriptionDataSource',
      },
      {
        account_id: 'a7e5cb3a-1b68-445b-9234-7cebea7a6458',
        id: 'fe5d1e82-2b10-4786-8f44-0dfd7ac3144a',
        last_getting_metric_attempt_at: 1746002260,
        last_getting_metric_attempt_error:
          "ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms),ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms),ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms), Timeout: 30s, Topology Description: <TopologyDescription id: 6811e136e7595c93dc238395, topology_type: ReplicaSetNoPrimary, servers: [<ServerDescription ('ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-00.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>, <ServerDescription ('ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-01.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>, <ServerDescription ('ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net', 27017) server_type: Unknown, rtt: None, error=NetworkTimeout('ffc-dev-mongo-cluster-shard-00-02.bhqnt.mongodb.net:27017: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>]>",
        last_getting_metrics_at: 0,
        last_import_at: 1762869796,
        last_import_attempt_at: 1762869796,
        last_import_attempt_error:
          "Error occurred in request., ConnectionError: HTTPSConnectionPool(host='apim-ratecard-v1.azure-api.net', port=443): Read timed out.",
        name: 'MPT Platform (Staging)',
        parent_id: '0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83',
        type: 'azure_cnr',
        details: {
          cost: 0,
          resources: 0,
          forecast: 0,
          last_month_cost: 0,
          __typename: 'DataSourceDetails',
        },
        config: {
          client_id: '990d710f-9527-4155-98da-7e1a0e637406',
          expense_import_scheme: 'raw_usage',
          subscription_id: 'a7e5cb3a-1b68-445b-9234-7cebea7a6458',
          tenant: '1dc9b339-fadb-432e-86df-423c38a0fcb8',
          export_name: null,
          container: null,
          directory: null,
          __typename: 'AzureSubscriptionConfig',
        },
        __typename: 'AzureSubscriptionDataSource',
      },
      {
        account_id: '1dc9b339-fadb-432e-86df-423c38a0fcb8',
        id: '0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83',
        last_getting_metric_attempt_at: 0,
        last_getting_metric_attempt_error: null,
        last_getting_metrics_at: 0,
        last_import_at: 0,
        last_import_attempt_at: 1759349510,
        last_import_attempt_error: 'Cloud azure_tenant is not supported',
        name: 'SoftwareOne',
        parent_id: null,
        type: 'azure_tenant',
        details: {
          cost: 0,
          resources: 0,
          forecast: 0,
          last_month_cost: 0,
          __typename: 'DataSourceDetails',
        },
        config: {
          client_id: '990d710f-9527-4155-98da-7e1a0e637406',
          tenant: '1dc9b339-fadb-432e-86df-423c38a0fcb8',
          __typename: 'AzureTenantConfig',
        },
        __typename: 'AzureTenantDataSource',
      },
      {
        account_id: '285102913731',
        id: 'c86dfcec-08ba-4007-a617-8f53efbfba06',
        last_getting_metric_attempt_at: 0,
        last_getting_metric_attempt_error: null,
        last_getting_metrics_at: 0,
        last_import_at: 1762869628,
        last_import_attempt_at: 1762869628,
        last_import_attempt_error: 'Key not found : /force_aws_edp_strip',
        name: 'SoftwareOne AWS',
        parent_id: null,
        type: 'aws_cnr',
        details: {
          cost: 87783.78446908253,
          resources: 311,
          forecast: 211576.93,
          last_month_cost: 165992.159476356,
          __typename: 'DataSourceDetails',
        },
        config: {
          assume_role_account_id: null,
          assume_role_name: null,
          access_key_id: 'AKIAUEYLVHDBXFPABAGB',
          linked: null,
          use_edp_discount: false,
          cur_version: 2,
          bucket_name: 'finops-cloud',
          bucket_prefix: 'finops',
          config_scheme: 'bucket_only',
          region_name: 'eu-central-1',
          report_name: 'finops-cloud',
          __typename: 'AwsConfig',
        },
        __typename: 'AwsDataSource',
      },
    ],
  },
};

export const AnomaliesDefaultExpenseServiceDailyResponse = {
  data: {
    expensesDailyBreakdown: {
      breakdown: {
        '1762214400': {
          'virtual network': {
            cost: 24.72,
          },
          AmazonECRPublic: {
            cost: 0,
          },
          'microsoft.sql': {
            cost: 1085.5784362084523,
          },
          'microsoft.eventgrid': {
            cost: 0.12347040000000001,
          },
          'microsoft.servicebus': {
            cost: 45.78338399999999,
          },
          'microsoft.cdn': {
            cost: 21.384410759036417,
          },
          AmazonQuickSight: {
            cost: 3.6000000288,
          },
          AmazonEC2: {
            cost: 28.2827290827,
          },
          AWSConfig: {
            cost: 0.035,
          },
          'microsoft.appconfiguration': {
            cost: 8.4,
          },
          AmazonKinesisFirehose: {
            cost: 0.0005838871999999999,
          },
          'microsoft.dataprotection': {
            cost: 0.16737165119999997,
          },
          AWSGlue: {
            cost: 0.1524358,
          },
          'microsoft.containerregistry': {
            cost: 22.67405028373312,
          },
          AmazonS3: {
            cost: 6.330545628399998,
          },
          AWSSecretsManager: {
            cost: 0.07881278400000014,
          },
          AmazonStates: {
            cost: 9.929999999999998e-8,
          },
          'api management': {
            cost: 235.01760034799992,
          },
          AmazonMSK: {
            cost: 3.3034833326,
          },
          'microsoft.datafactory': {
            cost: 7.298899166666667,
          },
          AmazonCloudWatch: {
            cost: 3.0091769028999993,
          },
          'microsoft.keyvault': {
            cost: 0.4378487999999999,
          },
          'microsoft.devcenter': {
            cost: 0.68399316,
          },
          AWS: {
            cost: 4110.818699999999,
          },
          'microsoft.apimanagement': {
            cost: 25.2672,
          },
          AWSSupportEnterprise: {
            cost: 537.9426666666667,
          },
          'microsoft.apicenter': {
            cost: 0,
          },
          'microsoft.signalrservice': {
            cost: 12.879999999999999,
          },
          'microsoft.security': {
            cost: 91.19712000000001,
          },
          'microsoft.logic': {
            cost: 0.9730612140549779,
          },
          'microsoft.saas': {
            cost: 0,
          },
          'microsoft.compute': {
            cost: 1396.831376566085,
          },
          'microsoft.cache': {
            cost: 48.647999999999996,
          },
          AWSQueueService: {
            cost: 0.00018280090000000003,
          },
          'microsoft.azurearcdata': {
            cost: 0,
          },
          AmazonGuardDuty: {
            cost: 0.046164000000000004,
          },
          'microsoft.operationalinsights': {
            cost: 979.9920043059415,
          },
          AmazonSNS: {
            cost: 0.0017047647,
          },
          AWSLambda: {
            cost: 180.00145931739993,
          },
          'microsoft.network': {
            cost: 955.4384930483326,
          },
          AWSCloudTrail: {
            cost: 0,
          },
          'microsoft.documentdb': {
            cost: 0,
          },
          'microsoft.insights': {
            cost: 5.541458173382877,
          },
          'microsoft.purview': {
            cost: 9.864,
          },
          'microsoft.search': {
            cost: 106.46400000000001,
          },
          AmazonRDS: {
            cost: 0,
          },
          'microsoft.dbforpostgresql': {
            cost: 13.499306666666666,
          },
          'microsoft.dbformysql': {
            cost: 40.8381165917009,
          },
          'microsoft.hybridcompute': {
            cost: 0.74,
          },
          AmazonSES: {
            cost: 1.1436104445666668,
          },
          AmazonSWF: {
            cost: 9.6e-8,
          },
          AWSSecurityHub: {
            cost: 0.1558139072,
          },
          AmazonVPC: {
            cost: 5.840833985400001,
          },
          'microsoft.dashboard': {
            cost: 14.951999999999998,
          },
          AWSDataTransfer: {
            cost: 0,
          },
          'AWS Marketplace': {
            cost: 3139.2650273224044,
          },
          AWSCostExplorer: {
            cost: 1.1525113333,
          },
          'microsoft.kusto': {
            cost: 0.089893584,
          },
          'microsoft.monitor': {
            cost: 36.572516062400005,
          },
          AmazonAthena: {
            cost: 0.38359,
          },
          AmazonECR: {
            cost: 0.0001694858,
          },
          'microsoft.storage': {
            cost: 521.4341016020442,
          },
          'microsoft.web': {
            cost: 261.9829687820137,
          },
          'microsoft.containerservice': {
            cost: 4.79770497601653,
          },
          awskms: {
            cost: 0.27704395160000045,
          },
          'microsoft.eventhub': {
            cost: 0.72,
          },
          'microsoft.notificationhubs': {
            cost: 11.29032258064516,
          },
          'microsoft.app': {
            cost: 15.156402,
          },
          AmazonGlacier: {
            cost: 8.010000000000001e-8,
          },
          AWSELB: {
            cost: 2.2561595754,
          },
          'microsoft.recoveryservices': {
            cost: 36.09847123650477,
          },
          AmazonRoute53: {
            cost: 0,
          },
        },
        '1762300800': {
          'microsoft.insights': {
            cost: 5.57163412310492,
          },
          'microsoft.purview': {
            cost: 9.864,
          },
          'microsoft.network': {
            cost: 953.6597625419798,
          },
          'microsoft.servicebus': {
            cost: 45.8482104,
          },
          AWSLambda: {
            cost: 180.00142547830004,
          },
          AmazonSNS: {
            cost: 0.0016590841,
          },
          AmazonGuardDuty: {
            cost: 0.046467999999999995,
          },
          AWSCloudTrail: {
            cost: 0,
          },
          AmazonVPC: {
            cost: 0.12000000000000001,
          },
          AmazonSES: {
            cost: 1.0451220975666666,
          },
          AmazonSWF: {
            cost: 9.840000000000001e-8,
          },
          'microsoft.hybridcompute': {
            cost: 0.56,
          },
          AmazonRDS: {
            cost: 0,
          },
          'microsoft.operationalinsights': {
            cost: 954.6484160142727,
          },
          'microsoft.dbforpostgresql': {
            cost: 13.499306666666666,
          },
          'microsoft.search': {
            cost: 106.46400000000001,
          },
          awskms: {
            cost: 0.10048688890000003,
          },
          AmazonStates: {
            cost: 1.0169999999999999e-7,
          },
          AWSELB: {
            cost: 0,
          },
          'microsoft.web': {
            cost: 262.1770043850134,
          },
          'microsoft.kusto': {
            cost: 0.08997480000000001,
          },
          'microsoft.monitor': {
            cost: 36.728247681999996,
          },
          'microsoft.app': {
            cost: 14.439912,
          },
          AmazonGlacier: {
            cost: 8.190000000000001e-8,
          },
          AmazonRoute53: {
            cost: 0,
          },
          'AWS Marketplace': {
            cost: 3139.2650273224044,
          },
          AWSCostExplorer: {
            cost: 1.1441473333,
          },
          AWSDataTransfer: {
            cost: 0,
          },
          AWSSupportEnterprise: {
            cost: 537.9426666666667,
          },
          'microsoft.dashboard': {
            cost: 14.951999999999998,
          },
          'microsoft.maps': {
            cost: 0,
          },
          'microsoft.recoveryservices': {
            cost: 36.42571419047587,
          },
          'microsoft.eventhub': {
            cost: 0.720008,
          },
          'microsoft.notificationhubs': {
            cost: 11.29032258064516,
          },
          'microsoft.containerservice': {
            cost: 4.80394877121738,
          },
          'microsoft.storage': {
            cost: 521.0832425307995,
          },
          AWSSecurityHub: {
            cost: 0.1597920615,
          },
          AmazonEC2: {
            cost: 2.8163277566,
          },
          AmazonQuickSight: {
            cost: 3.6000000288,
          },
          'microsoft.eventgrid': {
            cost: 0.11386320000000001,
          },
          'microsoft.documentdb': {
            cost: 0,
          },
          'virtual network': {
            cost: 24.72,
          },
          AmazonKinesisFirehose: {
            cost: 0.0005849216,
          },
          'microsoft.cdn': {
            cost: 21.22932503911044,
          },
          AmazonS3: {
            cost: 7.920019020299991,
          },
          AWSSecretsManager: {
            cost: 0.05420833759999999,
          },
          AWSGlue: {
            cost: 0.12931072,
          },
          'microsoft.dataprotection': {
            cost: 0.1673716512,
          },
          'microsoft.containerregistry': {
            cost: 22.68548988373312,
          },
          'microsoft.saas': {
            cost: 0,
          },
          'microsoft.appconfiguration': {
            cost: 8.4,
          },
          'microsoft.dbformysql': {
            cost: 40.84672858451524,
          },
          AWSConfig: {
            cost: 0.041,
          },
          'microsoft.azurearcdata': {
            cost: 0,
          },
          'microsoft.sql': {
            cost: 1090.3560890133679,
          },
          'microsoft.apicenter': {
            cost: 0,
          },
          'microsoft.apimanagement': {
            cost: 25.2672,
          },
          AWS: {
            cost: 4110.818239999999,
          },
          'microsoft.keyvault': {
            cost: 3.4598970000000002,
          },
          'microsoft.devcenter': {
            cost: 0.68399316,
          },
          AmazonMSK: {
            cost: 0,
          },
          AmazonCloudWatch: {
            cost: 2.932644354,
          },
          AWSQueueService: {
            cost: 0.001197763900000001,
          },
          'microsoft.cache': {
            cost: 48.647999999999996,
          },
          AmazonAthena: {
            cost: 0,
          },
          'microsoft.compute': {
            cost: 1423.746397221321,
          },
          'microsoft.datafactory': {
            cost: 7.69103,
          },
          'microsoft.signalrservice': {
            cost: 12.879999999999999,
          },
          'microsoft.security': {
            cost: 60.14399999999999,
          },
          'microsoft.logic': {
            cost: 0.9771203622637714,
          },
          'api management': {
            cost: 235.01760034799992,
          },
        },
        '1762387200': {
          AWSLambda: {
            cost: 180.00114042479998,
          },
          AmazonSNS: {
            cost: 0.0014670644999999999,
          },
          'microsoft.datafactory': {
            cost: 11.364678333333334,
          },
          AmazonGuardDuty: {
            cost: 0.04332,
          },
          'microsoft.purview': {
            cost: 9.864,
          },
          'microsoft.insights': {
            cost: 5.535800043876618,
          },
          'microsoft.network': {
            cost: 929.609213120953,
          },
          AmazonRDS: {
            cost: 0,
          },
          'microsoft.dbforpostgresql': {
            cost: 13.499306666666666,
          },
          'microsoft.search': {
            cost: 106.46400000000001,
          },
          AmazonAthena: {
            cost: 0,
          },
          AWSSecurityHub: {
            cost: 0.152551242,
          },
          AmazonVPC: {
            cost: 0.12000000000000001,
          },
          AmazonSES: {
            cost: 1.0912682713666668,
          },
          AmazonSWF: {
            cost: 9.9e-8,
          },
          'microsoft.hybridcompute': {
            cost: 0.68,
          },
          'AWS Marketplace': {
            cost: 3139.2650273224044,
          },
          AWSCostExplorer: {
            cost: 1.151488,
          },
          AWSDataTransfer: {
            cost: 0,
          },
          'microsoft.sql': {
            cost: 1104.4249130017033,
          },
          'microsoft.dashboard': {
            cost: 14.951999999999998,
          },
          'microsoft.cdn': {
            cost: 21.008688519065544,
          },
          'microsoft.documentdb': {
            cost: 0,
          },
          'microsoft.kusto': {
            cost: 0.089963784,
          },
          'microsoft.monitor': {
            cost: 36.93043527980001,
          },
          'microsoft.storage': {
            cost: 521.0163098198678,
          },
          AmazonKinesisFirehose: {
            cost: 0.0005787134,
          },
          AWSELB: {
            cost: 0,
          },
          'microsoft.recoveryservices': {
            cost: 37.49198468845222,
          },
          awskms: {
            cost: 0.10048518590000004,
          },
          'microsoft.notificationhubs': {
            cost: 11.29032258064516,
          },
          'microsoft.eventhub': {
            cost: 0.7200008,
          },
          'microsoft.containerservice': {
            cost: 4.79471840103794,
          },
          'microsoft.dbformysql': {
            cost: 45.71672886106898,
          },
          'virtual network': {
            cost: 24.72,
          },
          AmazonEC2: {
            cost: 3.402807288900001,
          },
          AmazonQuickSight: {
            cost: 3.6000000288,
          },
          AWSSupportEnterprise: {
            cost: 537.9426666666667,
          },
          'microsoft.eventgrid': {
            cost: 0.1075812,
          },
          'microsoft.appconfiguration': {
            cost: 8.4,
          },
          AWSConfig: {
            cost: 0.035,
          },
          'api management': {
            cost: 235.01760017399994,
          },
          'microsoft.app': {
            cost: 14.998182,
          },
          AmazonGlacier: {
            cost: 8.250000000000003e-8,
          },
          AmazonRoute53: {
            cost: 0,
          },
          'microsoft.web': {
            cost: 261.82401787501357,
          },
          AmazonS3: {
            cost: 5.792967623299998,
          },
          AWSSecretsManager: {
            cost: 0.054118337599999976,
          },
          'microsoft.dataprotection': {
            cost: 0.16737165119999997,
          },
          AWSGlue: {
            cost: 0.11078232,
          },
          'microsoft.containerregistry': {
            cost: 22.692211983733117,
          },
          AWS: {
            cost: 4110.818239999999,
          },
          'microsoft.keyvault': {
            cost: 0.41235959999999994,
          },
          'microsoft.devcenter': {
            cost: 0.68401368,
          },
          'microsoft.operationalinsights': {
            cost: 950.5373451266506,
          },
          AmazonCloudWatch: {
            cost: 2.9223975493,
          },
          AmazonMSK: {
            cost: 0,
          },
          AmazonLocationService: {
            cost: 0.0000095,
          },
          'microsoft.servicebus': {
            cost: 45.79110159999999,
          },
          AWSCloudTrail: {
            cost: 0,
          },
          'microsoft.apicenter': {
            cost: 0,
          },
          'microsoft.apimanagement': {
            cost: 25.2672,
          },
          'microsoft.signalrservice': {
            cost: 12.879999999999999,
          },
          'microsoft.security': {
            cost: 61.33504,
          },
          'microsoft.logic': {
            cost: 0.975582486319396,
          },
          AWSQueueService: {
            cost: 0.0014053475000000005,
          },
          'microsoft.azurearcdata': {
            cost: 0,
          },
          'microsoft.cache': {
            cost: 48.647999999999996,
          },
          AmazonStates: {
            cost: 1.0199999999999999e-7,
          },
          'microsoft.compute': {
            cost: 1437.0485690743005,
          },
          'microsoft.saas': {
            cost: 0,
          },
        },
        '1762473600': {
          'microsoft.search': {
            cost: 106.46400000000001,
          },
          'microsoft.dbforpostgresql': {
            cost: 13.499306666666666,
          },
          AmazonRDS: {
            cost: 0,
          },
          AWSELB: {
            cost: 0,
          },
          awskms: {
            cost: 0.10051125830000003,
          },
          'microsoft.domainregistration': {
            cost: 11.99,
          },
          AmazonVPC: {
            cost: 0.12000000000000001,
          },
          'microsoft.web': {
            cost: 261.82368867301363,
          },
          AmazonStates: {
            cost: 1.0199999999999999e-7,
          },
          'microsoft.hybridcompute': {
            cost: 0.68,
          },
          'microsoft.app': {
            cost: 14.974141999999999,
          },
          AmazonGlacier: {
            cost: 8.250000000000003e-8,
          },
          AmazonRoute53: {
            cost: 0,
          },
          AmazonSWF: {
            cost: 9.9e-8,
          },
          AmazonSES: {
            cost: 1.0672037008666666,
          },
          AmazonSNS: {
            cost: 0.0014072514000000001,
          },
          AWSLambda: {
            cost: 180.00113790759997,
          },
          AmazonGuardDuty: {
            cost: 0.04278,
          },
          'microsoft.purview': {
            cost: 13.144,
          },
          'microsoft.insights': {
            cost: 5.550389586710598,
          },
          'microsoft.servicebus': {
            cost: 45.7908968,
          },
          'microsoft.network': {
            cost: 924.6759455428535,
          },
          'microsoft.storage': {
            cost: 520.1280086343106,
          },
          AWSSecurityHub: {
            cost: 0.1526053382,
          },
          'microsoft.notificationhubs': {
            cost: 11.29032258064516,
          },
          'microsoft.eventhub': {
            cost: 0.7200008,
          },
          'microsoft.recoveryservices': {
            cost: 38.18709313354595,
          },
          'microsoft.containerservice': {
            cost: 4.79114342322344,
          },
          AWSDataTransfer: {
            cost: 0,
          },
          AWSCostExplorer: {
            cost: 1.1704383333,
          },
          'microsoft.operationalinsights': {
            cost: 939.800344072516,
          },
          'AWS Marketplace': {
            cost: 3139.2650273224044,
          },
          'microsoft.dashboard': {
            cost: 14.951999999999998,
          },
          AWSCloudTrail: {
            cost: 0,
          },
          AWSSupportEnterprise: {
            cost: 537.9426666666667,
          },
          'microsoft.monitor': {
            cost: 36.9859177231,
          },
          'microsoft.kusto': {
            cost: 0.090006984,
          },
          'microsoft.appconfiguration': {
            cost: 8.4,
          },
          'microsoft.saas': {
            cost: 0,
          },
          'microsoft.azurearcdata': {
            cost: 0,
          },
          AWSConfig: {
            cost: 0.035,
          },
          'microsoft.containerregistry': {
            cost: 22.695354283733117,
          },
          AWSGlue: {
            cost: 0.13603392,
          },
          'microsoft.dataprotection': {
            cost: 0.16737165119999997,
          },
          AWSSecretsManager: {
            cost: 0.05410333759999998,
          },
          AmazonS3: {
            cost: 5.711225974299997,
          },
          'microsoft.dbformysql': {
            cost: 50.60028975767948,
          },
          'virtual network': {
            cost: 24.72,
          },
          'microsoft.datafactory': {
            cost: 9.502316666666669,
          },
          AmazonQuickSight: {
            cost: 3.6000000288,
          },
          AmazonEC2: {
            cost: 3.4052560202999995,
          },
          'microsoft.eventgrid': {
            cost: 0.11517960000000002,
          },
          'microsoft.documentdb': {
            cost: 0,
          },
          AmazonKinesisFirehose: {
            cost: 0.0005705832,
          },
          'api management': {
            cost: 235.01760034799992,
          },
          'microsoft.logic': {
            cost: 0.9721265548853602,
          },
          'microsoft.security': {
            cost: 61.08792,
          },
          AmazonAthena: {
            cost: 0,
          },
          'microsoft.signalrservice': {
            cost: 12.879999999999999,
          },
          'microsoft.cache': {
            cost: 48.647999999999996,
          },
          AWSQueueService: {
            cost: 0.0013933138000000002,
          },
          'microsoft.compute': {
            cost: 1437.3001559069141,
          },
          'microsoft.devcenter': {
            cost: 0.68399316,
          },
          'microsoft.keyvault': {
            cost: 0.40008360000000004,
          },
          AWS: {
            cost: 4110.818239999999,
          },
          AmazonCloudWatch: {
            cost: 3.009426308800001,
          },
          AmazonMSK: {
            cost: 0,
          },
          'microsoft.sql': {
            cost: 1097.5524232906164,
          },
          'microsoft.apimanagement': {
            cost: 25.2672,
          },
          'microsoft.cdn': {
            cost: 20.89058399238522,
          },
          'microsoft.apicenter': {
            cost: 0,
          },
        },
        '1762560000': {
          AWSConfig: {
            cost: 0.035,
          },
          'microsoft.appconfiguration': {
            cost: 8.4,
          },
          'microsoft.dataprotection': {
            cost: 0.16737165119999997,
          },
          AWSGlue: {
            cost: 0.12664608,
          },
          'microsoft.containerregistry': {
            cost: 22.692823083733117,
          },
          'microsoft.documentdb': {
            cost: 0,
          },
          AWSSecretsManager: {
            cost: 0.05382333759999999,
          },
          AmazonS3: {
            cost: 6.437535032099996,
          },
          'api management': {
            cost: 235.01760026099993,
          },
          'microsoft.datafactory': {
            cost: 7.2899675,
          },
          'virtual network': {
            cost: 24.72,
          },
          'microsoft.dbformysql': {
            cost: 50.60299118235269,
          },
          'microsoft.eventgrid': {
            cost: 0.024553799999999997,
          },
          AmazonQuickSight: {
            cost: 3.6000000288,
          },
          AmazonEC2: {
            cost: 3.1087469706000004,
          },
          'microsoft.signalrservice': {
            cost: 12.879999999999999,
          },
          'microsoft.logic': {
            cost: 0.9486364123119455,
          },
          'microsoft.security': {
            cost: 42.97928,
          },
          AmazonKinesisFirehose: {
            cost: 0.0005689571,
          },
          'microsoft.saas': {
            cost: 0,
          },
          'microsoft.compute': {
            cost: 1469.9974065268293,
          },
          'microsoft.cache': {
            cost: 48.647999999999996,
          },
          AWSQueueService: {
            cost: 0.0011050323999999999,
          },
          'microsoft.azurearcdata': {
            cost: 0,
          },
          AmazonCloudWatch: {
            cost: 2.8685917354,
          },
          AmazonMSK: {
            cost: 0,
          },
          AmazonAthena: {
            cost: 0,
          },
          'microsoft.sql': {
            cost: 1054.8645756815501,
          },
          'microsoft.devcenter': {
            cost: 0.68399316,
          },
          'microsoft.keyvault': {
            cost: 3.433608,
          },
          AWS: {
            cost: 4110.818239999999,
          },
          'microsoft.apimanagement': {
            cost: 25.2672,
          },
          'microsoft.cdn': {
            cost: 19.926666712825423,
          },
          'microsoft.apicenter': {
            cost: 0,
          },
          'microsoft.search': {
            cost: 106.46400000000001,
          },
          AmazonRDS: {
            cost: 0,
          },
          'microsoft.dbforpostgresql': {
            cost: 13.499306666666666,
          },
          'microsoft.hybridcompute': {
            cost: 0.14,
          },
          'microsoft.app': {
            cost: 14.429939999999998,
          },
          AmazonGlacier: {
            cost: 8.250000000000003e-8,
          },
          'microsoft.servicebus': {
            cost: 45.850906399999985,
          },
          AmazonSES: {
            cost: 0.43192670696666663,
          },
          AmazonSWF: {
            cost: 9.9e-8,
          },
          AmazonRoute53: {
            cost: 0,
          },
          AWSSecurityHub: {
            cost: 0.152551242,
          },
          'microsoft.web': {
            cost: 261.56323688301376,
          },
          AmazonVPC: {
            cost: 0.12000000000000001,
          },
          AmazonGuardDuty: {
            cost: 0.042132,
          },
          AmazonSNS: {
            cost: 0.0002479709,
          },
          AWSLambda: {
            cost: 180.0002221283,
          },
          'microsoft.network': {
            cost: 1060.5909630660317,
          },
          AmazonStates: {
            cost: 1.0199999999999999e-7,
          },
          'microsoft.purview': {
            cost: 9.864,
          },
          'microsoft.insights': {
            cost: 5.510725673931208,
          },
          'microsoft.storage': {
            cost: 516.2777029737678,
          },
          AWSSupportEnterprise: {
            cost: 537.9426666666667,
          },
          'microsoft.containerservice': {
            cost: 4.76919854206864,
          },
          awskms: {
            cost: 0.10045636370000001,
          },
          'microsoft.notificationhubs': {
            cost: 11.29032258064516,
          },
          'microsoft.eventhub': {
            cost: 0.7200008,
          },
          AWSELB: {
            cost: 0,
          },
          'microsoft.recoveryservices': {
            cost: 38.777289177169614,
          },
          'microsoft.dashboard': {
            cost: 14.951999999999998,
          },
          AWSDataTransfer: {
            cost: 0,
          },
          'microsoft.operationalinsights': {
            cost: 907.9962052729576,
          },
          'AWS Marketplace': {
            cost: 3139.2650273224044,
          },
          AWSCostExplorer: {
            cost: 1.1503746667,
          },
          'microsoft.monitor': {
            cost: 37.0400971833,
          },
          'microsoft.kusto': {
            cost: 0.090071784,
          },
          AWSCloudTrail: {
            cost: 0,
          },
        },
        '1762646400': {
          'microsoft.app': {
            cost: 14.900338000000001,
          },
          AmazonGlacier: {
            cost: 8.250000000000003e-8,
          },
          AmazonRoute53: {
            cost: 0,
          },
          'microsoft.dashboard': {
            cost: 14.951999999999998,
          },
          AmazonAthena: {
            cost: 0,
          },
          AWSCostExplorer: {
            cost: 1.1501626667,
          },
          'AWS Marketplace': {
            cost: 3139.2650273224044,
          },
          'microsoft.web': {
            cost: 261.57918878401347,
          },
          AWSDataTransfer: {
            cost: 0,
          },
          'microsoft.monitor': {
            cost: 37.072134249899996,
          },
          'microsoft.kusto': {
            cost: 0.090007452,
          },
          AWSSecurityHub: {
            cost: 0.152551242,
          },
          'microsoft.storage': {
            cost: 500.36534777512577,
          },
          'microsoft.containerservice': {
            cost: 4.84500102283634,
          },
          'microsoft.recoveryservices': {
            cost: 35.3642225916924,
          },
          'microsoft.notificationhubs': {
            cost: 11.29032258064516,
          },
          'microsoft.eventhub': {
            cost: 0.7200008,
          },
          AmazonGuardDuty: {
            cost: 0.042224,
          },
          AWSLambda: {
            cost: 180.0001664486,
          },
          AmazonSNS: {
            cost: 0.0002401609,
          },
          'microsoft.network': {
            cost: 907.4700682528953,
          },
          'microsoft.dbformysql': {
            cost: 50.60029066790797,
          },
          'microsoft.purview': {
            cost: 9.864,
          },
          'microsoft.insights': {
            cost: 5.466284713310024,
          },
          awskms: {
            cost: 0.1005020771,
          },
          AWSELB: {
            cost: 0,
          },
          'microsoft.dbforpostgresql': {
            cost: 13.499306666666666,
          },
          AmazonRDS: {
            cost: 0,
          },
          AWSCloudTrail: {
            cost: 0,
          },
          'microsoft.search': {
            cost: 106.46400000000001,
          },
          AmazonSWF: {
            cost: 9.9e-8,
          },
          AmazonSES: {
            cost: 0.2866244074666667,
          },
          'microsoft.hybridcompute': {
            cost: 0.46,
          },
          AmazonVPC: {
            cost: 0.12000000000000001,
          },
          'microsoft.documentdb': {
            cost: 0.00000109709799289703,
          },
          'microsoft.operationalinsights': {
            cost: 895.8431814169815,
          },
          AmazonCloudWatch: {
            cost: 2.919712401,
          },
          AmazonMSK: {
            cost: 0,
          },
          AWS: {
            cost: 4110.818239999999,
          },
          'microsoft.devcenter': {
            cost: 0.68401368,
          },
          'microsoft.keyvault': {
            cost: 0.4875329999999998,
          },
          'microsoft.apicenter': {
            cost: 0,
          },
          'microsoft.apimanagement': {
            cost: 25.2672,
          },
          'microsoft.logic': {
            cost: 0.9505813109500753,
          },
          'microsoft.security': {
            cost: 42.802400000000006,
          },
          'microsoft.signalrservice': {
            cost: 12.879999999999999,
          },
          'api management': {
            cost: 235.01760034799992,
          },
          'microsoft.compute': {
            cost: 1428.1914268901132,
          },
          AWSSupportEnterprise: {
            cost: 537.9426666666667,
          },
          AWSQueueService: {
            cost: 0.0011027500000000002,
          },
          'microsoft.datafactory': {
            cost: 7.876639166666667,
          },
          'microsoft.cache': {
            cost: 48.647999999999996,
          },
          'virtual network': {
            cost: 24.72,
          },
          AmazonStates: {
            cost: 1.0199999999999999e-7,
          },
          AmazonKinesisFirehose: {
            cost: 0.0005689574000000001,
          },
          'microsoft.eventgrid': {
            cost: 0.0243408,
          },
          AmazonEC2: {
            cost: 3.4028573086,
          },
          AmazonQuickSight: {
            cost: 3.6000000288,
          },
          AWSConfig: {
            cost: 0.035,
          },
          'microsoft.cdn': {
            cost: 20.374120573307476,
          },
          'microsoft.azurearcdata': {
            cost: 0,
          },
          'microsoft.saas': {
            cost: 0,
          },
          'microsoft.appconfiguration': {
            cost: 8.4,
          },
          AWSSecretsManager: {
            cost: 0.05382333759999998,
          },
          AmazonS3: {
            cost: 5.953934730599994,
          },
          'microsoft.sql': {
            cost: 1055.591122438101,
          },
          null: {
            cost: 0,
          },
          'microsoft.containerregistry': {
            cost: 22.692527883733117,
          },
          'microsoft.dataprotection': {
            cost: 0.1673716512,
          },
          AWSGlue: {
            cost: 0.15162928,
          },
          'microsoft.servicebus': {
            cost: 45.791092,
          },
        },
        '1762732800': {
          'microsoft.apicenter': {
            cost: 0,
          },
          AmazonRoute53: {
            cost: 0,
          },
          'microsoft.apimanagement': {
            cost: 24.214400000000005,
          },
          'microsoft.app': {
            cost: 13.021104,
          },
          AmazonGlacier: {
            cost: 8.250000000000003e-8,
          },
          'microsoft.web': {
            cost: 255.21844360167125,
          },
          'microsoft.dbformysql': {
            cost: 47.68813972175305,
          },
          AmazonMSK: {
            cost: 0,
          },
          AmazonCloudWatch: {
            cost: 2.9481970687,
          },
          AWS: {
            cost: 4110.818239999999,
          },
          'microsoft.devcenter': {
            cost: 0.68399316,
          },
          'microsoft.keyvault': {
            cost: 0.5071992000000001,
          },
          'microsoft.compute': {
            cost: 1404.008197301565,
          },
          'microsoft.saas': {
            cost: 0,
          },
          AWSQueueService: {
            cost: 0.0014722029000000002,
          },
          'microsoft.azurearcdata': {
            cost: 0,
          },
          'microsoft.documentdb': {
            cost: 0,
          },
          'microsoft.cache': {
            cost: 47.955000000000005,
          },
          'microsoft.signalrservice': {
            cost: 6.44,
          },
          'microsoft.logic': {
            cost: 0.9734294725938298,
          },
          'microsoft.security': {
            cost: 70.02431999999999,
          },
          'microsoft.eventgrid': {
            cost: 0.1185996,
          },
          AmazonEC2: {
            cost: 2.9599821352999998,
          },
          AmazonQuickSight: {
            cost: 3.6000000288,
          },
          AmazonAthena: {
            cost: 0,
          },
          'virtual network': {
            cost: 24.72,
          },
          AWSSecretsManager: {
            cost: 0.05405833759999999,
          },
          AmazonS3: {
            cost: 9.984663398899988,
          },
          AWSGlue: {
            cost: 0.15136,
          },
          'microsoft.dataprotection': {
            cost: 0.16679547839999997,
          },
          'microsoft.containerregistry': {
            cost: 22.57087761713312,
          },
          'api management': {
            cost: 235.01760026099993,
          },
          AWSCloudTrail: {
            cost: 0,
          },
          AWSConfig: {
            cost: 0.035,
          },
          'microsoft.operationalinsights': {
            cost: 889.80812717519,
          },
          'microsoft.appconfiguration': {
            cost: 8.4,
          },
          'microsoft.monitor': {
            cost: 36.3601610336,
          },
          'microsoft.kusto': {
            cost: 0.089942184,
          },
          AmazonStates: {
            cost: 1.0199999999999999e-7,
          },
          'microsoft.dashboard': {
            cost: 14.418,
          },
          'AWS Marketplace': {
            cost: 3139.2650273224044,
          },
          AWSCostExplorer: {
            cost: 1.198914,
          },
          AWSDataTransfer: {
            cost: 0,
          },
          'microsoft.containerservice': {
            cost: 4.77189084446428,
          },
          AWSELB: {
            cost: 0,
          },
          'microsoft.recoveryservices': {
            cost: 34.380742074063,
          },
          'microsoft.servicebus': {
            cost: 45.77734219999999,
          },
          awskms: {
            cost: 0.10049605150000002,
          },
          'microsoft.eventhub': {
            cost: 0.7200008,
          },
          'microsoft.notificationhubs': {
            cost: 11.29032258064516,
          },
          'microsoft.datafactory': {
            cost: 10.713665833333334,
          },
          'microsoft.storage': {
            cost: 519.434643153201,
          },
          'microsoft.network': {
            cost: 917.9898541706568,
          },
          'microsoft.insights': {
            cost: 5.264502383512563,
          },
          'microsoft.purview': {
            cost: 9.864,
          },
          AmazonKinesisFirehose: {
            cost: 0.0005722094,
          },
          AmazonGuardDuty: {
            cost: 0.043104,
          },
          AWSLambda: {
            cost: 180.00067942260003,
          },
          AmazonSNS: {
            cost: 0.0017070594999999999,
          },
          AmazonSES: {
            cost: 1.7864279934666667,
          },
          AmazonSWF: {
            cost: 9.9e-8,
          },
          'microsoft.cdn': {
            cost: 21.261724114687322,
          },
          'microsoft.hybridcompute': {
            cost: 0.76,
          },
          AWSSecurityHub: {
            cost: 0.152551242,
          },
          AWSSupportEnterprise: {
            cost: 537.9426666666667,
          },
          AmazonVPC: {
            cost: 0.12000000000000001,
          },
          'microsoft.sql': {
            cost: 1045.4282074605592,
          },
          AmazonRDS: {
            cost: 0,
          },
          'microsoft.dbforpostgresql': {
            cost: 12.977200000000002,
          },
          'microsoft.search': {
            cost: 104.91799999999998,
          },
        },
        '1762819200': {
          'microsoft.operationalinsights': {
            cost: 186.54500511873,
          },
          'microsoft.monitor': {
            cost: 8.3357118296,
          },
          'microsoft.kusto': {
            cost: 0.03380327999999999,
          },
          AWSSupportEnterprise: {
            cost: 537.9426666666667,
          },
          'AWS Marketplace': {
            cost: 3139.2650273224044,
          },
          AWSCostExplorer: {
            cost: 0,
          },
          AWSDataTransfer: {
            cost: 0,
          },
          AWSCloudTrail: {
            cost: 0,
          },
          'microsoft.dashboard': {
            cost: 2.67,
          },
          'microsoft.maps': {
            cost: 0,
          },
          'microsoft.recoveryservices': {
            cost: 8.952121400947195,
          },
          'microsoft.eventhub': {
            cost: 0.27000080000000004,
          },
          'microsoft.containerservice': {
            cost: 1.848069619552028,
          },
          'microsoft.storage': {
            cost: 202.9324408376667,
          },
          AWSSecurityHub: {
            cost: 0.076275621,
          },
          'microsoft.purview': {
            cost: 4.11,
          },
          'microsoft.insights': {
            cost: 1.628003297491041,
          },
          'microsoft.servicebus': {
            cost: 18.8779976,
          },
          'microsoft.network': {
            cost: 222.23737494786366,
          },
          AWSLambda: {
            cost: 179.9999944023,
          },
          AmazonSNS: {
            cost: 0.00020163980000000001,
          },
          AmazonGuardDuty: {
            cost: 0.010872,
          },
          AmazonStates: {
            cost: 3.4000000000000007e-8,
          },
          AmazonVPC: {
            cost: 0.02,
          },
          AmazonSES: {
            cost: 0.14399606166666667,
          },
          AmazonSWF: {
            cost: 3.3e-8,
          },
          AmazonRDS: {
            cost: 0,
          },
          'microsoft.dbforpostgresql': {
            cost: 2.660791111111111,
          },
          'microsoft.web': {
            cost: 60.828435774780814,
          },
          'microsoft.search': {
            cost: 25.337999999999997,
          },
          'microsoft.app': {
            cost: 1.2045599999999999,
          },
          AmazonGlacier: {
            cost: 2.7499999999999995e-8,
          },
          AmazonRoute53: {
            cost: 0,
          },
          awskms: {
            cost: 0.0125834447,
          },
          AWSELB: {
            cost: 0,
          },
          'microsoft.sql': {
            cost: 315.5085318416207,
          },
          AWS: {
            cost: 4110.81669,
          },
          'microsoft.devcenter': {
            cost: 0.2565,
          },
          'microsoft.keyvault': {
            cost: 0.174888,
          },
          'microsoft.cdn': {
            cost: 6.1806615539166945,
          },
          AmazonCloudWatch: {
            cost: 0.6429637644,
          },
          AmazonMSK: {
            cost: 0,
          },
          AWSQueueService: {
            cost: 0.000272846,
          },
          'microsoft.cache': {
            cost: 11.365,
          },
          'microsoft.compute': {
            cost: 333.1537591178681,
          },
          AmazonKinesisFirehose: {
            cost: 0.0001201773,
          },
          'microsoft.security': {
            cost: 18.612720000000003,
          },
          'microsoft.logic': {
            cost: 0.3401940745040355,
          },
          AmazonAthena: {
            cost: 0,
          },
          'api management': {
            cost: 79.87420034799999,
          },
          AmazonEC2: {
            cost: 0.0027547954000000344,
          },
          'microsoft.datafactory': {
            cost: 1.0304458333333333,
          },
          AmazonQuickSight: {
            cost: 0.6000000048,
          },
          'microsoft.documentdb': {
            cost: 0,
          },
          'microsoft.eventgrid': {
            cost: 0.030749399999999996,
          },
          'virtual network': {
            cost: 8.290000000000001,
          },
          AWSSecretsManager: {
            cost: 0.009153889599999996,
          },
          AmazonS3: {
            cost: 0.9254870277000005,
          },
          'microsoft.dbformysql': {
            cost: 5.965852836464255,
          },
          'microsoft.dataprotection': {
            cost: 0.0594193696,
          },
          AWSGlue: {
            cost: 0,
          },
          'microsoft.containerregistry': {
            cost: 6.72711961683326,
          },
          'microsoft.appconfiguration': {
            cost: 6,
          },
          AWSConfig: {
            cost: 0.001,
          },
        },
      },
      counts: {
        'microsoft.eventgrid': {
          total: 0.6583380000000001,
          previous_total: 0.6862824000000001,
        },
        AmazonQuickSight: {
          total: 25.800000206399996,
          previous_total: 20.1387096144,
        },
        AmazonEC2: {
          total: 47.3814613584,
          previous_total: 224.4886494738,
        },
        'virtual network': {
          total: 181.32999999999998,
          previous_total: 197.76,
        },
        'microsoft.servicebus': {
          total: 339.510931,
          previous_total: 366.3489216,
        },
        AmazonECRPublic: {
          total: 0,
          previous_total: 0,
        },
        'microsoft.containerregistry': {
          total: 165.43045463636508,
          previous_total: 181.26143454766492,
        },
        AWSCloudTrail: {
          total: 0,
          previous_total: 0,
        },
        'microsoft.dataprotection': {
          total: 1.2304447551999997,
          previous_total: 1.3095574655999997,
        },
        AWSGlue: {
          total: 0.95819812,
          previous_total: 0.90160884,
        },
        AWSSecretsManager: {
          total: 0.41210169920000006,
          previous_total: 0.5051124344000004,
        },
        AmazonS3: {
          total: 49.05637843559996,
          previous_total: 53.98684144480001,
        },
        'api management': {
          total: 1724.9974024359992,
          previous_total: 1880.1408026969993,
        },
        AmazonLocationService: {
          total: 0.0000095,
          previous_total: 0.000139,
        },
        'microsoft.operationalinsights': {
          total: 6705.17062850324,
          previous_total: 7672.03020834711,
        },
        AmazonStates: {
          total: 7.45e-7,
          previous_total: 6.787000000000002e-7,
        },
        AWSConfig: {
          total: 0.252,
          previous_total: 0.44657049199999993,
        },
        'microsoft.appconfiguration': {
          total: 64.8,
          previous_total: 67.2,
        },
        'microsoft.web': {
          total: 1886.9969847585335,
          previous_total: 2088.8400154905617,
        },
        'microsoft.apimanagement': {
          total: 175.8176,
          previous_total: 202.13760000000002,
        },
        'microsoft.apicenter': {
          total: 0,
          previous_total: 0,
        },
        AmazonGlacier: {
          total: 6.020000000000001e-7,
          previous_total: 5.463000000000001e-7,
        },
        'microsoft.app': {
          total: 103.12458000000001,
          previous_total: 108.00785423999999,
        },
        AmazonRoute53: {
          total: 0,
          previous_total: 0.806060606,
        },
        AmazonMSK: {
          total: 3.3034833326,
          previous_total: 28.828625805599998,
        },
        AmazonCloudWatch: {
          total: 21.2531100845,
          previous_total: 16.685418275500002,
        },
        'microsoft.devcenter': {
          total: 5.04449316,
          previous_total: 5.36068584,
        },
        'microsoft.keyvault': {
          total: 9.313417199999998,
          previous_total: 12.579543000000003,
        },
        AWS: {
          total: 32886.54482999999,
          previous_total: 23488.421370000007,
        },
        AWSSupportEnterprise: {
          total: 4303.541333333334,
          previous_total: 5958.479612903226,
        },
        'microsoft.saas': {
          total: 0,
          previous_total: 330,
        },
        'microsoft.compute': {
          total: 10330.277288604997,
          previous_total: 10954.30306119707,
        },
        'microsoft.cache': {
          total: 351.20799999999997,
          previous_total: 388.85300000000007,
        },
        'microsoft.azurearcdata': {
          total: 0,
          previous_total: 0,
        },
        AWSQueueService: {
          total: 0.008132057400000002,
          previous_total: 0.019063458199999994,
        },
        'microsoft.logic': {
          total: 7.110731887883391,
          previous_total: 7.746096545690737,
        },
        'microsoft.security': {
          total: 448.18280000000004,
          previous_total: 508.20088000000004,
        },
        'microsoft.signalrservice': {
          total: 83.71999999999998,
          previous_total: 103.03999999999998,
        },
        'microsoft.network': {
          total: 6871.671674691566,
          previous_total: 7788.736550872437,
        },
        'microsoft.insights': {
          total: 40.06879799531985,
          previous_total: 43.911204534406174,
        },
        'microsoft.purview': {
          total: 76.43800000000002,
          previous_total: 83.28747000000001,
        },
        AmazonGuardDuty: {
          total: 0.31706399999999996,
          previous_total: 0.24490800000000001,
        },
        'microsoft.documentdb': {
          total: 0.00000109709799289703,
          previous_total: 0,
        },
        AmazonSNS: {
          total: 0.0086349958,
          previous_total: 0.007409419499999999,
        },
        AWSLambda: {
          total: 1440.0062255299,
          previous_total: 1066.4771110596998,
        },
        AmazonKinesisFirehose: {
          total: 0.0041484066,
          previous_total: 0.0031154445,
        },
        'microsoft.hybridcompute': {
          total: 4.0200000000000005,
          previous_total: 4.1000000000000005,
        },
        AmazonSWF: {
          total: 7.224000000000001e-7,
          previous_total: 6.413999999999999e-7,
        },
        AmazonSES: {
          total: 6.996179683933334,
          previous_total: 5.521318414329032,
        },
        AmazonVPC: {
          total: 6.580833985400001,
          previous_total: 51.53938762900002,
        },
        'microsoft.cdn': {
          total: 152.25618126433454,
          previous_total: 192.6874571995901,
        },
        AWSSecurityHub: {
          total: 1.1546918959,
          previous_total: 0.8170255044000001,
        },
        'microsoft.search': {
          total: 769.0400000000001,
          previous_total: 850.3679999999999,
        },
        'microsoft.dbforpostgresql': {
          total: 96.63383111111112,
          previous_total: 107.73101784946235,
        },
        'microsoft.dbformysql': {
          total: 332.85913820344257,
          previous_total: 325.38857827249916,
        },
        'microsoft.sql': {
          total: 7849.304298935971,
          previous_total: 8861.14611713446,
        },
        AmazonRDS: {
          total: 0,
          previous_total: 0.04926942869999999,
        },
        'microsoft.monitor': {
          total: 266.0252210437,
          previous_total: 289.8126166599,
        },
        'microsoft.kusto': {
          total: 0.663663852,
          previous_total: 0.7042351680000001,
        },
        'microsoft.dashboard': {
          total: 106.8,
          previous_total: 185.527,
        },
        AWSDataTransfer: {
          total: 0,
          previous_total: 0,
        },
        AWSCostExplorer: {
          total: 8.118036333300001,
          previous_total: 9.005864580699999,
        },
        'AWS Marketplace': {
          total: 25114.120218579235,
          previous_total: 25114.120218579235,
        },
        'microsoft.containerservice': {
          total: 35.421675600416584,
          previous_total: 38.40581476003564,
        },
        'microsoft.eventhub': {
          total: 5.3100128,
          previous_total: 5.760093599999999,
        },
        'microsoft.notificationhubs': {
          total: 79.03225806451613,
          previous_total: 90.32258064516128,
        },
        awskms: {
          total: 0.8925652217000006,
          previous_total: 2.099686752699999,
        },
        'microsoft.recoveryservices': {
          total: 265.67763849285103,
          previous_total: 289.29686733988285,
        },
        AWSELB: {
          total: 2.2561595754,
          previous_total: 19.6821319954,
        },
        AmazonAthena: {
          total: 0.38359,
          previous_total: 3.052345,
        },
        AmazonECR: {
          total: 0.0001694858,
          previous_total: 0.0014493288,
        },
        'microsoft.datafactory': {
          total: 62.7676425,
          previous_total: 248.26150750000005,
        },
        'microsoft.storage': {
          total: 3822.6717973267832,
          previous_total: 4055.030314548641,
        },
        null: {
          total: 0,
          previous_total: 0,
        },
        'microsoft.maps': {
          total: 0,
          previous_total: 0,
        },
        'microsoft.domainregistration': {
          total: 11.99,
          previous_total: 0,
        },
        'microsoft.certificateregistration': {
          total: 0,
          previous_total: 69.99,
        },
      },
      __typename: 'ExpensesDailyBreakdown',
    },
  },
};

export const AnomaliesRegionExpensesDailyBreakdown = {
  data: {
    expensesDailyBreakdown: {
      breakdown: {
        '1762387200': {
          'East US': {
            cost: 17.598265048801366,
          },
          'West US 2': {
            cost: 1.4845947352945204,
          },
          'South Central US': {
            cost: 0.00999936,
          },
          'ap-southeast-2': {
            cost: 0.0000326902,
          },
          'East Asia': {
            cost: 3.5625659295068477,
          },
          'UK West': {
            cost: 15.011057961,
          },
          'eu-central-1': {
            cost: 3927.6278263482004,
          },
          'Australia East': {
            cost: 0.68,
          },
          'eu-west-2': {
            cost: 0.000032697499999999997,
          },
          'North Europe': {
            cost: 8.75488503446803,
          },
          'eu-west-1': {
            cost: 7.345508632299993,
          },
          global: {
            cost: 4040.407685724671,
          },
          'Sweden Central': {
            cost: 0,
          },
          'sa-east-1': {
            cost: 0.000024543,
          },
          'Southeast Asia': {
            cost: 0.00999936,
          },
          'ap-northeast-1': {
            cost: 0.0000352425,
          },
          'West Europe': {
            cost: 5864.927299469295,
          },
          'eu-north-1': {
            cost: 0.00006686320000000001,
          },
          'Central India': {
            cost: 5.28,
          },
          'ap-south-1': {
            cost: 0.00007566570000000001,
          },
          'All Regions': {
            cost: 21.10944300533035,
          },
          'ap-northeast-3': {
            cost: 0.0000326586,
          },
          'ap-southeast-1': {
            cost: 9.6000726426,
          },
          'us-west-2': {
            cost: 0.0036795182999999985,
          },
          'Poland Central': {
            cost: 11.29290378064516,
          },
          'Brazil South': {
            cost: 5.8561682159999995,
          },
          'eu-west-3': {
            cost: 0.00003246730000000001,
          },
          'us-west-1': {
            cost: 0.0000327216,
          },
          'Central US': {
            cost: 5.8619745196666395,
          },
          'ap-northeast-2': {
            cost: 0.000032499800000000003,
          },
          'ca-central-1': {
            cost: 0.0000324978,
          },
          'us-east-1': {
            cost: 1.6101846695000002,
          },
          'us-east-2': {
            cost: 0.00007569570000000001,
          },
          'East US 2': {
            cost: 1.1645659585844752,
          },
          'North Central US': {
            cost: 0.00002,
          },
          'West US': {
            cost: 1.1870394062845162,
          },
          null: {
            cost: 63.180125233440656,
          },
        },
        '1762473600': {
          'UK West': {
            cost: 15.007709243999999,
          },
          'ca-central-1': {
            cost: 0.0000327335,
          },
          'ap-northeast-1': {
            cost: 0.00007044029999999999,
          },
          'eu-west-2': {
            cost: 0.0000329095,
          },
          'Southeast Asia': {
            cost: 0.00999936,
          },
          'eu-west-1': {
            cost: 7.333182136299992,
          },
          'Central India': {
            cost: 5.28,
          },
          'Sweden Central': {
            cost: 0,
          },
          'Brazil South': {
            cost: 5.8561682159999995,
          },
          'East US': {
            cost: 17.59103437494704,
          },
          'South Central US': {
            cost: 11.99999936,
          },
          global: {
            cost: 4040.407690855371,
          },
          'West US 2': {
            cost: 1.4852520004945209,
          },
          'East Asia': {
            cost: 3.5603965695068487,
          },
          'Australia East': {
            cost: 0.68,
          },
          'West Europe': {
            cost: 5848.786147352007,
          },
          'ap-southeast-2': {
            cost: 0.000032932900000000004,
          },
          'sa-east-1': {
            cost: 0.000024729300000000004,
          },
          null: {
            cost: 62.93222720307964,
          },
          'ap-northeast-2': {
            cost: 0.000032730099999999993,
          },
          'ap-south-1': {
            cost: 0.00007588330000000001,
          },
          'eu-north-1': {
            cost: 0.0000756619,
          },
          'All Regions': {
            cost: 20.99258519434607,
          },
          'Poland Central': {
            cost: 11.292909180645161,
          },
          'us-east-1': {
            cost: 1.6282778357,
          },
          'eu-central-1': {
            cost: 3927.6507189903,
          },
          'East US 2': {
            cost: 1.1711021525844754,
          },
          'ap-southeast-1': {
            cost: 9.600072862400001,
          },
          'us-east-2': {
            cost: 0.00007590719999999999,
          },
          'West US': {
            cost: 1.1920429935120163,
          },
          'North Europe': {
            cost: 8.75073133851638,
          },
          'North Central US': {
            cost: 0,
          },
          'us-west-2': {
            cost: 0.0037159280999999986,
          },
          'ap-northeast-3': {
            cost: 0.0000329063,
          },
          'us-west-1': {
            cost: 0.0000329337,
          },
          'eu-west-3': {
            cost: 0.0000327048,
          },
          'Central US': {
            cost: 5.861167559666639,
          },
        },
        '1762560000': {
          'ap-southeast-1': {
            cost: 9.600036675300002,
          },
          'ap-south-1': {
            cost: 0.00007594919999999999,
          },
          'eu-north-1': {
            cost: 0.0000757287,
          },
          'ap-northeast-3': {
            cost: 0.000032972199999999996,
          },
          'All Regions': {
            cost: 19.866067142288273,
          },
          'East US 2': {
            cost: 1.1354649885844754,
          },
          'us-east-2': {
            cost: 0.0000578406,
          },
          'us-east-1': {
            cost: 1.6075959471,
          },
          'West US': {
            cost: 1.1770314164645161,
          },
          'North Central US': {
            cost: 0,
          },
          'eu-west-3': {
            cost: 0.0000327799,
          },
          'us-west-1': {
            cost: 0.0000329967,
          },
          'Poland Central': {
            cost: 11.29290378064516,
          },
          'eu-central-1': {
            cost: 3927.5431016786038,
          },
          'us-west-2': {
            cost: 0.0036585773999999994,
          },
          'ap-northeast-2': {
            cost: 0.0000246864,
          },
          'Central US': {
            cost: 5.858933169666639,
          },
          'North Europe': {
            cost: 8.744962372477419,
          },
          'Brazil South': {
            cost: 5.8561682159999995,
          },
          'UK West': {
            cost: 15.004800834,
          },
          null: {
            cost: 44.822129257470664,
          },
          'Canada Central': {
            cost: 0.0000167532,
          },
          'eu-west-1': {
            cost: 7.0820894336,
          },
          'Australia East': {
            cost: 0.14,
          },
          'eu-west-2': {
            cost: 0.0000329775,
          },
          'East US': {
            cost: 17.52882274270273,
          },
          'ca-central-1': {
            cost: 0.0000328057,
          },
          'Central India': {
            cost: 5.28,
          },
          'East Asia': {
            cost: 3.551076903506849,
          },
          'ap-southeast-2': {
            cost: 0.00003299590000000001,
          },
          'West US 2': {
            cost: 1.4833819256945207,
          },
          'South Central US': {
            cost: 0.00999936,
          },
          'Southeast Asia': {
            cost: 0.00999936,
          },
          'West Europe': {
            cost: 5936.620549419295,
          },
          'ap-northeast-1': {
            cost: 0.000035478799999999996,
          },
          global: {
            cost: 4040.407687134371,
          },
          'sa-east-1': {
            cost: 0.0000329099,
          },
          'Sweden Central': {
            cost: 0,
          },
        },
        '1762646400': {
          'eu-central-1': {
            cost: 3927.777873461703,
          },
          'ap-southeast-2': {
            cost: 0.00003299590000000001,
          },
          'North Europe': {
            cost: 8.73818867274742,
          },
          'sa-east-1': {
            cost: 0.0000329099,
          },
          'Australia East': {
            cost: 0.46,
          },
          'Canada Central': {
            cost: 0.000007650719999999999,
          },
          'Central India': {
            cost: 5.28,
          },
          'West Europe': {
            cost: 5709.096882219576,
          },
          'East US': {
            cost: 17.567446450696323,
          },
          Unassigned: {
            cost: 0,
          },
          'Sweden Central': {
            cost: 0,
          },
          'East Asia': {
            cost: 3.5507157155068487,
          },
          'South Central US': {
            cost: 0.00999936,
          },
          global: {
            cost: 4040.407691166471,
          },
          'West US 2': {
            cost: 1.4832779577945208,
          },
          'ap-northeast-1': {
            cost: 0.000035478799999999996,
          },
          'UK West': {
            cost: 15.003362115,
          },
          'eu-west-1': {
            cost: 6.587473659399999,
          },
          'Southeast Asia': {
            cost: 0.00999936,
          },
          'eu-west-2': {
            cost: 0.0000329775,
          },
          'eu-west-3': {
            cost: 0.0000327799,
          },
          'us-west-1': {
            cost: 0.0000329967,
          },
          'ap-northeast-3': {
            cost: 0.000032972199999999996,
          },
          'us-west-2': {
            cost: 0.003697853199999999,
          },
          'Central US': {
            cost: 5.858327219666639,
          },
          'ap-southeast-1': {
            cost: 9.600072932100003,
          },
          'us-east-2': {
            cost: 0.0000548436,
          },
          'East US 2': {
            cost: 1.1365902765844753,
          },
          'us-east-1': {
            cost: 1.6075368716,
          },
          'North Central US': {
            cost: 0,
          },
          'West US': {
            cost: 1.177264215322016,
          },
          'ca-central-1': {
            cost: 0.0000328057,
          },
          'eu-north-1': {
            cost: 0.0000757287,
          },
          'ap-south-1': {
            cost: 0.00007594919999999999,
          },
          'ap-northeast-2': {
            cost: 0.0000328008,
          },
          'Poland Central': {
            cost: 11.29290378064516,
          },
          'All Regions': {
            cost: 20.256550103438105,
          },
          'Brazil South': {
            cost: 5.8561682159999995,
          },
          null: {
            cost: 44.64564916607966,
          },
        },
        '1762732800': {
          'Central US': {
            cost: 5.860900342666639,
          },
          'ap-northeast-2': {
            cost: 0.0000328008,
          },
          'us-west-1': {
            cost: 0.0000329967,
          },
          'eu-west-3': {
            cost: 0.0000327799,
          },
          'us-west-2': {
            cost: 0.0036767152999999998,
          },
          null: {
            cost: 71.87070801680764,
          },
          'Poland Central': {
            cost: 11.29290378064516,
          },
          'North Central US': {
            cost: 0,
          },
          'West US': {
            cost: 1.1814914164645163,
          },
          'us-east-2': {
            cost: 0.0000758376,
          },
          'East US 2': {
            cost: 1.171160024584475,
          },
          'Central India': {
            cost: 5.28,
          },
          'us-east-1': {
            cost: 1.6571049289,
          },
          'North Europe': {
            cost: 8.74931473934891,
          },
          'ap-northeast-3': {
            cost: 0.000032972199999999996,
          },
          'All Regions': {
            cost: 21.315004751171568,
          },
          'eu-north-1': {
            cost: 0.00007872200000000001,
          },
          'ap-south-1': {
            cost: 0.00007594919999999999,
          },
          'eu-central-1': {
            cost: 3927.9542452596042,
          },
          'ap-southeast-1': {
            cost: 9.600072932100003,
          },
          'Sweden Central': {
            cost: 0,
          },
          'sa-east-1': {
            cost: 0.0000166621,
          },
          'ca-central-1': {
            cost: 0.0000328057,
          },
          global: {
            cost: 4040.407691085371,
          },
          'ap-northeast-1': {
            cost: 0.00007051,
          },
          'West Europe': {
            cost: 5812.934785093982,
          },
          'Southeast Asia': {
            cost: 0.00999936,
          },
          'Brazil South': {
            cost: 5.8561682159999995,
          },
          'ap-southeast-2': {
            cost: 0.00003299590000000001,
          },
          'East Asia': {
            cost: 3.5519988423835605,
          },
          'West US 2': {
            cost: 1.4830117712945206,
          },
          'South Central US': {
            cost: 0.00999936,
          },
          'East US': {
            cost: 17.53025012049482,
          },
          'eu-west-1': {
            cost: 11.591685545600011,
          },
          'eu-west-2': {
            cost: 0.0000167097,
          },
          'Australia East': {
            cost: 0.76,
          },
          'UK West': {
            cost: 15.010328727,
          },
        },
        '1762819200': {
          'sa-east-1': {
            cost: 0.0000166621,
          },
          'ap-southeast-2': {
            cost: 0.00003299590000000001,
          },
          'West Europe': {
            cost: 5885.634610646464,
          },
          'Australia East': {
            cost: 0.52,
          },
          null: {
            cost: 51.535832089369656,
          },
          global: {
            cost: 4040.407690950671,
          },
          'West US 2': {
            cost: 1.4844417443945206,
          },
          'South Central US': {
            cost: 0.00999936,
          },
          'Central India': {
            cost: 5.28,
          },
          'East Asia': {
            cost: 3.5627651075068485,
          },
          'East US': {
            cost: 17.567340375747037,
          },
          'Brazil South': {
            cost: 5.8561682159999995,
          },
          'Sweden Central': {
            cost: 0,
          },
          'Southeast Asia': {
            cost: 0.00999936,
          },
          'eu-west-2': {
            cost: 0.0000329775,
          },
          'eu-west-1': {
            cost: 7.7659406471,
          },
          'UK West': {
            cost: 15.011895249,
          },
          'ca-central-1': {
            cost: 0.0000328057,
          },
          'ap-northeast-1': {
            cost: 0.000035478799999999996,
          },
          'Central US': {
            cost: 5.8603476796666385,
          },
          'ap-northeast-3': {
            cost: 0.000032972199999999996,
          },
          'us-west-2': {
            cost: 0.0036797152999999984,
          },
          'eu-west-3': {
            cost: 0.0000327799,
          },
          'us-west-1': {
            cost: 0.0000329967,
          },
          'North Central US': {
            cost: 0,
          },
          'West US': {
            cost: 1.1789860656245164,
          },
          'North Europe': {
            cost: 8.753026052005781,
          },
          'eu-central-1': {
            cost: 3928.091707341702,
          },
          'us-east-1': {
            cost: 1.6178701579000005,
          },
          'us-east-2': {
            cost: 0.000057840599999999996,
          },
          'ap-southeast-1': {
            cost: 9.600072932100003,
          },
          'East US 2': {
            cost: 1.1545123845844754,
          },
          'All Regions': {
            cost: 20.92596133215529,
          },
          'Poland Central': {
            cost: 11.29290378064516,
          },
          'ap-northeast-2': {
            cost: 0.0000328008,
          },
          'eu-north-1': {
            cost: 0.0000758339,
          },
          'ap-south-1': {
            cost: 0.00007594919999999999,
          },
        },
        '1762905600': {
          'ap-northeast-1': {
            cost: 0.000035478799999999996,
          },
          'West Europe': {
            cost: 43481.52127827481,
          },
          'Southeast Asia': {
            cost: 0.00999936,
          },
          'Brazil South': {
            cost: 5.8561612069999995,
          },
          'Sweden Central': {
            cost: 0,
          },
          'sa-east-1': {
            cost: 0.0000329099,
          },
          'ca-central-1': {
            cost: 0.0000328057,
          },
          global: {
            cost: 4040.407692059171,
          },
          'eu-west-1': {
            cost: 10.544515875000007,
          },
          'eu-west-2': {
            cost: 0.0000248436,
          },
          'Australia East': {
            cost: 0.58,
          },
          'UK West': {
            cost: 15.010267914,
          },
          'Central India': {
            cost: 5.28,
          },
          'ap-southeast-2': {
            cost: 0.000032858300000000004,
          },
          'East Asia': {
            cost: 3.5629968515068486,
          },
          'West US 2': {
            cost: 1.3714014179849314,
          },
          'South Central US': {
            cost: 0.00999936,
          },
          'East US': {
            cost: 17.45008304256981,
          },
          'North Central US': {
            cost: 0,
          },
          'West US': {
            cost: 1.135400880664328,
          },
          'us-east-2': {
            cost: 0.000057840599999999996,
          },
          null: {
            cost: 59.37137829967866,
          },
          'East US 2': {
            cost: 1.1060902980913245,
          },
          'us-east-1': {
            cost: 1.6238210827000001,
          },
          'Central US': {
            cost: 5.429127506666641,
          },
          'ap-northeast-2': {
            cost: 0.0000328008,
          },
          'us-west-1': {
            cost: 0.0000329967,
          },
          'eu-west-3': {
            cost: 0.0000327799,
          },
          'us-west-2': {
            cost: 0.0037159910999999984,
          },
          'Poland Central': {
            cost: 11.29279578064516,
          },
          'ap-southeast-1': {
            cost: 9.600054803700003,
          },
          'North Europe': {
            cost: 8.74515869021563,
          },
          'ap-northeast-3': {
            cost: 0.000032972199999999996,
          },
          'All Regions': {
            cost: 21.026500204210706,
          },
          'eu-north-1': {
            cost: 0.0000757287,
          },
          'ap-south-1': {
            cost: 0.00007594919999999999,
          },
          'eu-central-1': {
            cost: 3928.0829488816044,
          },
        },
        '1762992000': {
          'West Europe': {
            cost: 995.164975674635,
          },
          'sa-east-1': {
            cost: 1.381e-7,
          },
          'eu-central-1': {
            cost: 3921.932865140702,
          },
          'ap-southeast-2': {
            cost: 1.4849999999999999e-7,
          },
          'North Europe': {
            cost: 2.2049223602450603,
          },
          'eu-west-1': {
            cost: 1.4299914781999996,
          },
          'Central India': {
            cost: 0.88,
          },
          'eu-west-2': {
            cost: 0.0000082812,
          },
          'Southeast Asia': {
            cost: 0.0020832,
          },
          'ap-northeast-1': {
            cost: 0.0000176648,
          },
          'UK West': {
            cost: 2.250056028,
          },
          'East Asia': {
            cost: 0.8630913386301369,
          },
          'South Central US': {
            cost: 0.00333312,
          },
          'West US 2': {
            cost: 0.0000766245,
          },
          global: {
            cost: 4037.7410273266714,
          },
          'Sweden Central': {
            cost: 0,
          },
          'East US': {
            cost: 3.2285689122155103,
          },
          'West US': {
            cost: 0.01134,
          },
          'North Central US': {
            cost: 0,
          },
          'East US 2': {
            cost: 0.0935555555555556,
          },
          'ap-southeast-1': {
            cost: 9.600018267900001,
          },
          'us-east-2': {
            cost: 0.000036416,
          },
          'us-east-1': {
            cost: 0.08178961399999997,
          },
          'Central US': {
            cost: 0.14051439230555002,
          },
          'us-west-1': {
            cost: 1.473e-7,
          },
          'eu-west-3': {
            cost: 0.0000163279,
          },
          null: {
            cost: 15.680866666666669,
          },
          'ap-northeast-3': {
            cost: 0.0000164116,
          },
          'us-west-2': {
            cost: 1.465e-7,
          },
          'Brazil South': {
            cost: 0.976,
          },
          'All Regions': {
            cost: 5.847115965761798,
          },
          'ca-central-1': {
            cost: 0.0000082325,
          },
          'ap-south-1': {
            cost: 0.000039395400000000006,
          },
          'eu-north-1': {
            cost: 0.0000182123,
          },
          'ap-northeast-2': {
            cost: 0.000016343200000000003,
          },
        },
      },
      counts: {
        'East US': {
          total: 126.06181106817462,
          previous_total: 140.32045005070373,
        },
        'ap-southeast-2': {
          total: 0.00023061350000000002,
          previous_total: 0.00031456089999999995,
        },
        'East Asia': {
          total: 25.76560725805479,
          previous_total: 28.481819930054783,
        },
        'West US 2': {
          total: 10.275438177452056,
          previous_total: 11.84193884620959,
        },
        'South Central US': {
          total: 12.063328640000002,
          previous_total: 70.0690424,
        },
        'UK West': {
          total: 107.309478072,
          previous_total: 120.21071257399998,
        },
        'eu-west-1': {
          total: 59.68038740750001,
          previous_total: 123.20613875519999,
        },
        'eu-west-2': {
          total: 0.00021437399999999998,
          previous_total: 0.0002995893,
        },
        'Australia East': {
          total: 3.8200000000000003,
          previous_total: 4.4200066,
        },
        global: {
          total: 32320.59485630277,
          previous_total: 32810.198197538004,
        },
        'Sweden Central': {
          total: 0,
          previous_total: 0,
        },
        'sa-east-1': {
          total: 0.00018146430000000002,
          previous_total: 0.00025525200000000003,
        },
        'Southeast Asia': {
          total: 0.07207872,
          previous_total: 0.07904040000000001,
        },
        'North Europe': {
          total: 63.44118926002463,
          previous_total: 70.27546059678195,
        },
        'ap-northeast-1': {
          total: 0.00033577279999999997,
          previous_total: 0.00045576399999999994,
        },
        'West Europe': {
          total: 79534.68652815006,
          previous_total: 46847.42971722378,
        },
        'eu-central-1': {
          total: 31416.661287102423,
          previous_total: 25637.517681416914,
        },
        'eu-north-1': {
          total: 0.0005424794,
          previous_total: 161.47874776080008,
        },
        'ap-south-1': {
          total: 0.0005706904,
          previous_total: 0.0007040363000000001,
        },
        'Brazil South': {
          total: 41.969170502999994,
          previous_total: 46.8493316448,
        },
        'ap-northeast-3': {
          total: 0.0002468375,
          previous_total: 0.0003173907,
        },
        'All Regions': {
          total: 151.33922769870216,
          previous_total: 501.3994123085181,
        },
        'ca-central-1': {
          total: 0.00023749230000000003,
          previous_total: 0.00031614640000000003,
        },
        'ap-southeast-1': {
          total: 76.80047404820002,
          previous_total: 61.2007328697,
        },
        'us-west-1': {
          total: 0.0002307861,
          previous_total: 0.0003076095,
        },
        'eu-west-3': {
          total: 0.0002453995,
          previous_total: 0.0003166835,
        },
        'us-west-2': {
          total: 0.025824445199999994,
          previous_total: 0.035956217199999994,
        },
        'Poland Central': {
          total: 79.05022386451613,
          previous_total: 90.34324658516128,
        },
        'Central India': {
          total: 37.84,
          previous_total: 41.800000000000004,
        },
        'Central US': {
          total: 40.73129238997203,
          previous_total: 46.65177065433311,
        },
        'ap-northeast-2': {
          total: 0.00023746270000000002,
          previous_total: 0.00029192199999999996,
        },
        'us-east-2': {
          total: 0.0004922219,
          previous_total: 25.137423894499996,
        },
        'East US 2': {
          total: 8.133041639153731,
          previous_total: 9.221394368687289,
        },
        'us-east-1': {
          total: 11.434181107400002,
          previous_total: 12.130024759400001,
        },
        'North Central US': {
          total: 0.00002,
          previous_total: 0,
        },
        null: {
          total: 414.0389159325932,
          previous_total: 531.0187087163682,
        },
        'West US': {
          total: 8.240596394336425,
          previous_total: 9.44706135561113,
        },
        'Canada Central': {
          total: 0.00002440392,
          previous_total: 0.00000900864,
        },
        Unassigned: {
          total: 0,
          previous_total: 0,
        },
      },
      __typename: 'ExpensesDailyBreakdown',
    },
  },
};

export const AnomaliesResourceTypeExpensesDailyBreakdown = {
  data: {
    expensesDailyBreakdown: {
      breakdown: {
        '1762387200': {
          'aly-consumption-aws-test': {
            cost: 0.016075846354166666,
          },
          'cspshardmap_986dcd1f-43af-4ee7-9dbd-11411d7c399d': {
            cost: 0.298710530598958,
          },
          'cspshardmap_72ce77e7-2041-4f5d-3a72-08da26e48a74': {
            cost: 0.44433251953125,
          },
          'eashardmap_7f75776e-89af-413b-88a2-28593e2ac6b2': {
            cost: 2.00534562174479,
          },
          'mpt-currency-prod': {
            cost: 0.0000445475260416667,
          },
          'aly-invoice-automation-prod': {
            cost: 0.0001626953125,
          },
          'igrt-mgr-tracking-prod': {
            cost: 0.000970361328125,
          },
          slots: {
            cost: 0.006220761000000001,
          },
          Volume: {
            cost: 139.97471465940004,
          },
          'renewal-manager-test': {
            cost: 0.014807533094618056,
          },
          'mpt-tasks-prod': {
            cost: 0.000052294921875,
          },
          configurationstores: {
            cost: 8.4,
          },
          'mpt-module-billing-test': {
            cost: 0.008955021158854165,
          },
          'renewal-manager-prod': {
            cost: 0.497362959798177,
          },
          'products-catalog-api-prod': {
            cost: 0.000232421875,
          },
          'mpt-module-billing-prod-debug-1': {
            cost: 0.00229322916666667,
          },
          'gpm-subscriptions-prod': {
            cost: 0.0000154947916666667,
          },
          Alarm: {
            cost: 0.0469763112,
          },
          'fwk-feature-toggle-test': {
            cost: 0.000035831705729166664,
          },
          actiongroups: {
            cost: 0.042940000000000006,
          },
          'aly-cloud-utilization-prod': {
            cost: 2.33338198242188,
          },
          'USE2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'swo-platform-prod': {
            cost: 0.0495431437174479,
          },
          factories: {
            cost: 11.364678333333334,
          },
          'auth-api-test': {
            cost: 0.0001191162109375,
          },
          'aly-consumption-ea-prod': {
            cost: 27.560777685546892,
          },
          chtvs00471_cpx_full_202109262000: {
            cost: 0.000016463216145833333,
          },
          'gpp-identity-test': {
            cost: 0.000032926432291666666,
          },
          networksecuritygroups: {
            cost: 0.06751626823097469,
          },
          'issue-detection-engine-prod': {
            cost: 0.000218863932291667,
          },
          'mpt-catalog-prod': {
            cost: 0.0000721476236979167,
          },
          backupvaults: {
            cost: 0.16737165119999997,
          },
          'awsshardmap-26517465236498': {
            cost: 0.000015494791666666668,
          },
          'Management Tools - AWS Config Rules': {
            cost: 0.035,
          },
          'csp-orders-prod': {
            cost: 0.00208986002604167,
          },
          Storage: {
            cost: 1.151488,
          },
          'dwh-test': {
            cost: 0.415971240234375,
          },
          'eashardmap_54286192-fc00-402c-9575-08102633bf40': {
            cost: 0.0001656005859375,
          },
          virtualnetworkgateways: {
            cost: 24.72,
          },
          'Metric Streams': {
            cost: 0.128727,
          },
          'gpm-authorization-test': {
            cost: 0.000024210611979166667,
          },
          'int-config-prod': {
            cost: 0.00182063802083333,
          },
          'aly-pricelist-test': {
            cost: 0.09851685384114583,
          },
          'eashardmap_35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000015494791666666668,
          },
          'eashardmap_ee859c36-53ff-4440-bd50-4d8da7e70412': {
            cost: 0.008256787109375,
          },
          'exp-global-search-test': {
            cost: 0.00002227376302083333,
          },
          'csp-billing-automation-test': {
            cost: 0.008940494791666665,
          },
          'swo-platform-prod_2024-06-26t22-03z': {
            cost: 0.000489876302083333,
          },
          'swo-digital-assessments-prod': {
            cost: 0.00107882486979167,
          },
          'auth-api-prod': {
            cost: 0.00191554361979167,
          },
          'swo-digital-assessments-test': {
            cost: 0.00011136881510416665,
          },
          'swo-marketplace-order-fulfillment-test': {
            cost: 0.0067566975911458335,
          },
          'awsshardmap_c6469e97-302a-408a-8589-2122a0bb725d': {
            cost: 0.00191360677083333,
          },
          'eashardmap_ac7850af-21d1-4ebd-8c22-b475e5d40978': {
            cost: 0.744933414713542,
          },
          'mpt-helpdesk-test': {
            cost: 0.000013557942708333333,
          },
          'pyracloud-subscriptions-restore': {
            cost: 0.0001442952473958333,
          },
          'mpt-chat-prod': {
            cost: 0.0000387369791666667,
          },
          'fwk-proxy-identity-provider-prod': {
            cost: 0.000413517252604167,
          },
          'aly-consumption-ea-integrationtest': {
            cost: 0.000024210611979166667,
          },
          registries: {
            cost: 22.692211983733117,
          },
          'gpm-customeronboarding-test': {
            cost: 0.000019368489583333328,
          },
          jobagents: {
            cost: 0.912,
          },
          'mpt-chat-test': {
            cost: 0.000013557942708333333,
          },
          'bot-test': {
            cost: 0.00002130533854166666,
          },
          'swo-marketplace-pricemanager': {
            cost: 0.001144677734375,
          },
          'swo-portal-test': {
            cost: 0.14489276529947914,
          },
          samdatawarehouse: {
            cost: 0.07367192382812504,
          },
          'csp-subscriptions-test': {
            cost: 0.00018109537760416664,
          },
          'csp-license-assignments-prod': {
            cost: 0.000193684895833333,
          },
          'gpm-swo-salesprice-test': {
            cost: 0.017359977213541666,
          },
          'Kinesis Firehose': {
            cost: 0.0005787134,
          },
          'customer-solutions-test': {
            cost: 0.00027212727864583334,
          },
          'awsshardmap_d7275497-ac0b-411b-9396-d98d1c26f634': {
            cost: 0.844009049479166,
          },
          'swo-digital-recommendations-test': {
            cost: 0.00001936848958333333,
          },
          'collab-test': {
            cost: 0.0027280517578125,
          },
          managedclusters: {
            cost: 4.79471840103794,
          },
          azurefirewalls: {
            cost: 60.085418467145416,
          },
          'awsshardmap_b4fd484f-d43c-4162-a1ea-83e4b103b46e': {
            cost: 2.8430432874891527,
          },
          'csp-backoffice-prices-test': {
            cost: 0.000034863281249999996,
          },
          'notificationhubquartzdb-prod': {
            cost: 0.000316190592447917,
          },
          'aly-consumption-adobe-test': {
            cost: 0.00027890624999999997,
          },
          'notificationhubquartzdb-test': {
            cost: 0.00005616861979166666,
          },
          'swo-marketplace-order-manager-prod': {
            cost: 0.000110400390625,
          },
          'int-creditcard-prod': {
            cost: 0.00312607421875,
          },
          'csp-backoffice-configurations-prod': {
            cost: 0.000154947916666667,
          },
          'fwk-navision-scope-prod': {
            cost: 0.246037923177083,
          },
          'csp-contracts-test': {
            cost: 0.00006294759114583333,
          },
          'EUC1-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          ssisdb: {
            cost: 0.00002227376302083333,
          },
          sites: {
            cost: 0.22815646499999986,
          },
          'market-shop-prod': {
            cost: 0.0732167643229167,
          },
          'user-rank-test': {
            cost: 0.0008434977213541666,
          },
          servers: {
            cost: 2.4193548387096793,
          },
          'APN3-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'mpt-module-spotlight-test': {
            cost: 0.00006456163194444444,
          },
          'eashardmap_f60ce9fd-154d-427d-bf91-2e4b42dd86c4': {
            cost: 0.242785953776042,
          },
          enterprisearchitect: {
            cost: 0.00344008585611979,
          },
          'fwk-shard-map-test': {
            cost: 0.000038736979166666656,
          },
          components: {
            cost: 0.204788807317451,
          },
          pricings: {
            cost: 61.33504,
          },
          'fwk-iam-test': {
            cost: 0.0075750162760416665,
          },
          'fwk-iam-prod': {
            cost: 0.007315478515625,
          },
          'eashardmap_e3c55fc0-e7ce-48fd-a244-8afd1041d843': {
            cost: 0.06230068359375,
          },
          'AWS Glue': {
            cost: 0.11078232,
          },
          'Storage Snapshot': {
            cost: 0.0000070496,
          },
          Instance: {
            cost: 338.0711605217723,
          },
          'cloudeashardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00002227376302083333,
          },
          'swo-marketplace-address-book-prod': {
            cost: 0.0000716634114583334,
          },
          virtualmachinescalesets: {
            cost: 960.7629908471256,
          },
          'csp-price-calculation-service-test': {
            cost: 0.00047549641927083333,
          },
          'mpt-module-spotlight-prod': {
            cost: 0.000726318359375,
          },
          'eashardmap_72016d53-1ba0-4f71-ab9c-0a90df48b048': {
            cost: 0.582745556640625,
          },
          'swo-web-header-test': {
            cost: 0.00006488444010416665,
          },
          natgateways: {
            cost: 310.61912330193434,
          },
          trafficmanagerprofiles: {
            cost: 1.1589892283870982,
          },
          'EUW1-BilledBytes': {
            cost: 0,
          },
          'trackit-test': {
            cost: 0.0020549967447916666,
          },
          'gpm-itemconfiguration-prod': {
            cost: 0.00001162109375,
          },
          'awsshardmap_a0b82f35-ecdf-4392-8eab-c2a7269ebc65': {
            cost: 0.14505820448133666,
          },
          'trackit-prod': {
            cost: 0.00792364908854167,
          },
          networkwatchers: {
            cost: 0,
          },
          'swo-marketplace-address-book-test': {
            cost: 0.000019368489583333328,
          },
          'user-rank-prod': {
            cost: 0.0747081380208334,
          },
          'eashardmap_14336735-a54e-41c0-8063-856b5379bd1c': {
            cost: 1.8536754991319468,
          },
          'fwk-navision-scope-test': {
            cost: 0.0030195475260416664,
          },
          'pyracloud-subscriptions': {
            cost: 0.0018981119791666701,
          },
          'sub-mgr-test': {
            cost: 0.0005413492838541666,
          },
          'sub-mgr-prod': {
            cost: 0.014921484375,
          },
          metricalerts: {
            cost: 2.334811827956973,
          },
          'cspshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.0005984863281249999,
          },
          'risk-profiler-reports-db-prod': {
            cost: 0.000451285807291667,
          },
          'pyc-simple-test': {
            cost: 0.000018400065104166666,
          },
          'aly-consumption-salesforce-test': {
            cost: 0.0000203369140625,
          },
          'CW:Requests': {
            cost: 0,
          },
          'pyracloud-subscriptions_2020-09-29t07-59z': {
            cost: 0.000108463541666667,
          },
          'risk-product-lifecyle-db-prod': {
            cost: 0.000211116536458333,
          },
          'csp-subscriptions-prod': {
            cost: 0.00418746744791667,
          },
          clusters: {
            cost: 0.089963784,
          },
          signalr: {
            cost: 12.879999999999999,
          },
          containerapps: {
            cost: 14.998182,
          },
          'swo-marketplace-checkout-prod': {
            cost: 0.000110400390625,
          },
          'awsshardmap_54286192-fc00-402c-9575-08102633bf40': {
            cost: 0.000123958333333333,
          },
          'cloud-workspace-prod': {
            cost: 0.000108463541666667,
          },
          'cloud-workspace-test': {
            cost: 0.000024210611979166667,
          },
          'awsshardmap_d0bc9c1b-06cf-437f-a37f-a3ad2340ed65': {
            cost: 0.4548205566406253,
          },
          Metric: {
            cost: 0.1673182232,
          },
          'gpm-swo-salesprice-prod': {
            cost: 0.06151044921875,
          },
          'eu-west-3-KMS-Requests': {
            cost: 0,
          },
          'swo-portal-prod': {
            cost: 12.35330594075521,
          },
          'swo-pyraproxy-test': {
            cost: 0.011361555989583333,
          },
          'swo-marketplace-order-fulfillment-prod': {
            cost: 0.0507841796875,
          },
          'mpt-helpdesk-prod': {
            cost: 0.000046484375,
          },
          'Data Payload': {
            cost: 2.5716347068,
          },
          'swo-platform-performace_2024-06-28t10-29z': {
            cost: 0.000517037760416667,
          },
          'ap-southeast-1-KMS-Requests': {
            cost: 0,
          },
          'EU-Requests-Tier2': {
            cost: 0,
          },
          'Load Balancer': {
            cost: 21.612486169603667,
          },
          'exp-global-search-prod': {
            cost: 0.000706949869791667,
          },
          'swo-digital-recommendations-prod-restored': {
            cost: 0.000017431640625,
          },
          'nltdb-csp-import-prod': {
            cost: 16.600536800130158,
          },
          'aly-consumption-ea-test': {
            cost: 0.11895263671875,
          },
          pools: {
            cost: 0.68401368,
          },
          'csp-orders-test': {
            cost: 0.000048421223958333333,
          },
          'swo-platform-prod_2025-05-07t12-43z': {
            cost: 0.00116503255208333,
          },
          'pyra-dot-net-templates-prod': {
            cost: 0.000139453125,
          },
          'eashardmap_0da2a725-c790-4d1f-b155-080817a86035': {
            cost: 0.04363720703125,
          },
          'gpm-authorization-prod': {
            cost: 0.0000716634114583334,
          },
          'USE1-ResourceList': {
            cost: 0,
          },
          'int-config-test': {
            cost: 0.00004551595052083333,
          },
          'gpp-identity-prod': {
            cost: 0.000172379557291667,
          },
          'Requests-Tier8': {
            cost: 0.00009,
          },
          'aly-consumption-slm-prod': {
            cost: 0.101134505208333,
          },
          'awsshardmap_ca4ef284-5503-4019-a176-7b079926439a': {
            cost: 0.258561588541667,
          },
          'swo-platform-test': {
            cost: 0.005255639648437501,
          },
          'eashardmap_c7242070-60da-4c92-bc34-8b1a34c50a01': {
            cost: 8.59747303059896,
          },
          'int-cco-prod': {
            cost: 0.400540364583333,
          },
          staticsites: {
            cost: 7.206774409013699,
          },
          'int-cco-test': {
            cost: 0.0009422770182291667,
          },
          'nltdb-csp-import-test': {
            cost: 0.004531258138020834,
          },
          'cloud-platform-prod': {
            cost: 0.00695328776041666,
          },
          publicipprefixes: {
            cost: 26.208000000000006,
          },
          'Global-SoftwareUsage-Contracts': {
            cost: 3139.2650273224044,
          },
          'awsshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00017431640625,
          },
          'csp-backoffice-invoices-prod': {
            cost: 0.8817795410156251,
          },
          grafana: {
            cost: 14.951999999999998,
          },
          'eashardmap_2c8c5274-a7cf-477f-a877-977f00622a4c': {
            cost: 1.07967127278646,
          },
          'csp-backoffice-invoices-test': {
            cost: 0.016058414713541667,
          },
          'products-catalog-api-test': {
            cost: 0.00008134765625,
          },
          'wrk-management-test': {
            cost: 0.0029498209635416663,
          },
          service: {
            cost: 260.28480017399977,
          },
          'gpm-swo-rfx-test': {
            cost: 0.00007166341145833333,
          },
          'eashardmap_eeb8bf9d-55d9-4fa3-ae6b-2d42c25df109': {
            cost: 1.71811418294271,
          },
          redis: {
            cost: 48.647999999999996,
          },
          'gpm-providers-mscsp-prod': {
            cost: 0.000224674479166667,
          },
          nlpsql_analytics_scheduler: {
            cost: 0.0107340169270833,
          },
          AmazonLocationService: {
            cost: 0.0000095,
          },
          vaults: {
            cost: 37.904340688452216,
          },
          'mpt-tasks-test': {
            cost: 0.00002808430989583333,
          },
          'eashardmap_7e23f6f5-a875-4963-af34-29ed1d4ae24d': {
            cost: 0.146398665364583,
          },
          dnszones: {
            cost: 0.45654205161290273,
          },
          'mpt-module-billing-prod': {
            cost: 0.115242513020833,
          },
          'igrt-mgr-tracking-test': {
            cost: 0.00012880045572916666,
          },
          applicationgateways: {
            cost: 429.73984444980886,
          },
          'lic-mgr-gus-prod': {
            cost: 0.000133642578125,
          },
          Bucket: {
            cost: 526.7953803480677,
          },
          'Business Analytics': {
            cost: 3.6000000288,
          },
          sonarqube: {
            cost: 0.0493980414496528,
          },
          'cloud-consumption-aws-prod': {
            cost: 0.00010458984375,
          },
          'mpt-extensions-test': {
            cost: 0.0000319580078125,
          },
          'cloud-shard-map-coordinator-prod': {
            cost: 0.000102652994791667,
          },
          'fwk-feature-toggle-prod': {
            cost: 0.000199495442708333,
          },
          'cloud-cost-allocation-test': {
            cost: 0.00012853190104166666,
          },
          'eashardmap_37dd1f9c-8205-440f-87f3-da1fb808b40c': {
            cost: 0.197037258572049,
          },
          'mpt-currency-test': {
            cost: 0.000034863281249999996,
          },
          'int-pim-integration-test': {
            cost: 0.00006972656249999999,
          },
          'swo-marketplace-contracts-test': {
            cost: 0.00002517903645833333,
          },
          searchservices: {
            cost: 106.46400000000001,
          },
          nlpsql_analytics_scheduler_kj: {
            cost: 0.00137903645833333,
          },
          extensiontopics: {
            cost: 0.007075199999999999,
          },
          resources: {
            cost: 0,
          },
          'EUC1-Crawler-DPU-Hour': {
            cost: 0,
          },
          'int-pim-integration-prod': {
            cost: 0.00155916341145833,
          },
          'EUC1-PaidComplianceCheck': {
            cost: 0,
          },
          privatednszones: {
            cost: 0.0806451612903225,
          },
          'cloud-shard-map-coordinator-test': {
            cost: 0.000015494791666666668,
          },
          'cloud-consumption-office-test': {
            cost: 0.0000203369140625,
          },
          nltapp0127sdb: {
            cost: 0.00013880750868055556,
          },
          'eashardmap_2b898fc6-f2f6-4d45-a87a-59c44aa1b4d6': {
            cost: 0.0744776529947917,
          },
          'cloud-consumption-office-prod': {
            cost: 0.000098779296875,
          },
          'gpm-swo-rfx-prod': {
            cost: 0.0000677897135416667,
          },
          'cloudofficeshardmap_2b05987e-f9b4-4348-bce0-712d90c48b24': {
            cost: 0.00008134765625,
          },
          'swo-pyraproxy-prod': {
            cost: 0.361237825520833,
          },
          'DataTransfer-Out-Bytes': {
            cost: 0,
          },
          Dollar: {
            cost: 0,
          },
          'awsshardmap_c445ff59-32a7-4ff7-b325-3d04eb3f4d82': {
            cost: 0.00000193684895833333,
          },
          'eashardmap_0c1e78e9-1066-4e18-9882-bd123c54a2bd': {
            cost: 1.851325455729167,
          },
          'pyracloud-subscriptions_2020-09-29t06-59z': {
            cost: 0.000122021484375,
          },
          'trackit-test-integrationtest': {
            cost: 0.000032926432291666666,
          },
          'cloud-pricelist-paas-test': {
            cost: 0.00006294759114583333,
          },
          'csp-price-calculation-service-prod': {
            cost: 4.267949332682292,
          },
          'aly-consumption-slm-test': {
            cost: 0.0011194986979166668,
          },
          'customer-support-test': {
            cost: 0.0021169759114583334,
          },
          'Data Transfer': {
            cost: 0.04103419170000004,
          },
          'customer-support-prod': {
            cost: 0.214546695963542,
          },
          'swo-web-header-prod': {
            cost: 0.0024171875,
          },
          'fwk-shard-map-coordinator-prod': {
            cost: 0.00014381103515625,
          },
          'USE1-APS2-AWS-Out-Bytes': {
            cost: 0,
          },
          'awsshardmap_099fd68f-cdc0-470c-83f7-68274cbee998': {
            cost: 0.320612418619792,
          },
          'eu-west-2-KMS-Requests': {
            cost: 0,
          },
          'Sending Email': {
            cost: 1.0499256301000002,
          },
          'swo-extension-nav-test': {
            cost: 0.0017124972873263887,
          },
          'eashardmap_7e3b2aa9-30f9-4316-8b88-e75303e4def2': {
            cost: 0.221753065321181,
          },
          'Savings Plan': {
            cost: 4290.815959703499,
          },
          'trx-transactions-overview-prod': {
            cost: 1.78689617513021,
          },
          'swo-extension-nav-prod_2025-05-07t13-52z': {
            cost: 0.000476295572916667,
          },
          'pyc-search-test': {
            cost: 0.00002227376302083333,
          },
          'eashardmap_5aa598f6-990c-4d69-9f5e-1275d34d14e5': {
            cost: 0.2116201171875,
          },
          'billing-automation-test': {
            cost: 0.0012967203776041666,
          },
          'EUN1-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'eashardmap_3c7b4733-d8c6-4030-8605-e2c2b59f6f45': {
            cost: 0.0499145345052083,
          },
          'mpt-extensions-prod': {
            cost: 0.0000329264322916667,
          },
          'mgmt-acm-prod': {
            cost: 0.000141874186197917,
          },
          AWSSupportEnterprise: {
            cost: 537.9426666666667,
          },
          'mgmt-acm-test': {
            cost: 0.000019368489583333328,
          },
          'awsshardmap_d450009c-5886-4703-8e6d-740dbecc21c9': {
            cost: 1.2361783528645869,
          },
          'wrk-management-prod': {
            cost: 0.010046435546875,
          },
          'EU-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'mgmt-console-gus-test': {
            cost: 0.000037768554687499994,
          },
          'EUC1-CW:Requests': {
            cost: 0,
          },
          'customeractivation-migration-prod': {
            cost: 0.000730192057291667,
          },
          nltsql_analytics_scheduler: {
            cost: 0.0004115804036458334,
          },
          'di-reporting-test': {
            cost: 0.008553919270833333,
          },
          identitymanagementdb: {
            cost: 0.05328562011718753,
          },
          'cloud-cost-allocation-prod': {
            cost: 0.000131705729166667,
          },
          'mpt-public-catalog-prod': {
            cost: 0.002515966796875,
          },
          scheduledqueryrules: {
            cost: 2.9532594086021495,
          },
          'cloud-consumption-aws-test': {
            cost: 0.00017237955729166666,
          },
          'billing-automation-test_2019-06-25t15-20z': {
            cost: 0.000037768554687499994,
          },
          'Tables-Requests-Tier1': {
            cost: 0.000005,
          },
          'EUC1-Requests': {
            cost: 0,
          },
          'cloud-pricelist-saas': {
            cost: 0.0000949055989583333,
          },
          'swo-digital-cloud-compatibility': {
            cost: 0.000190779622395833,
          },
          'cloud-pricelist-paas': {
            cost: 0.0002556640625,
          },
          'aly-consumption-office365-test': {
            cost: 0.026978369140625,
          },
          images: {
            cost: 0.0660684,
          },
          'swo-marketplace-customer-test': {
            cost: 0.000049712456597222225,
          },
          'cloud-platform-test': {
            cost: 0.0001481689453125,
          },
          'pyracloud-subscriptions_2020-09-29t08-59z': {
            cost: 0.000110400390625,
          },
          'cloudawsshardmap_50b14c10-7229-4581-b736-0494d49d0bb8': {
            cost: 0.000014849175347222222,
          },
          Serverless: {
            cost: 0.0011232009,
          },
          workflows: {
            cost: 0.975582486319396,
          },
          'USE1-EU-AWS-Out-Bytes': {
            cost: 0,
          },
          privateendpoints: {
            cost: 1.44,
          },
          'swo-marketplace-customer-prod': {
            cost: 0.000100716145833333,
          },
          GuardDuty: {
            cost: 0.04332,
          },
          'eashardmap_1d9e10e9-e0d9-49bc-8362-4635af48e3b0': {
            cost: 0.0221895100911458,
          },
          'eashardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.02408665364583333,
          },
          'API Request': {
            cost: 0.16924740680000022,
          },
          'pyra-dot-net-templates-test': {
            cost: 0.000017431640625,
          },
          'Management Tools - AWS CloudTrail Free Events Recorded': {
            cost: 0,
          },
          'cspshardmap_35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000013557942708333333,
          },
          'eashardmap_1543ffee-9eff-4a72-a1b3-817f34a29ae2': {
            cost: 1.213470735677083,
          },
          elasticpools: {
            cost: 693.2480567765863,
          },
          'swo-digital-maturity-calculator-test': {
            cost: 0.00002227376302083333,
          },
          'aly-consumption-sync-meta-ea-test': {
            cost: 0.000020659722222222223,
          },
          'cloud-consumption-azure-test': {
            cost: 0.008017586263020833,
          },
          'eashardmap_e706a119-f41f-4e30-9271-42de678f981c': {
            cost: 0.394913818359375,
          },
          'cloud-consumption-ea-prod': {
            cost: 0.000005810546875,
          },
          'swo-digital-maturity-calculator-prod': {
            cost: 0.000134288194444444,
          },
          'cloud-consumption-azure-prod': {
            cost: 0.0220471516927083,
          },
          databases: {
            cost: 214.49949492197035,
          },
          flexibleservers: {
            cost: 59.21603552773564,
          },
          'csp-billing-automation-prod': {
            cost: 1.199260074869788,
          },
          'AWS Security Hub - Standards': {
            cost: 0.1517121852,
          },
          'aly-pricelist-prod': {
            cost: 3.2291320149739597,
          },
          'awsshardmap_878761c0-f03f-4fb9-89cc-001df25f0b58': {
            cost: 10.769976464843749,
          },
          USSalesTax: {
            cost: 0.011666666666666665,
          },
          'market-shop-test': {
            cost: 0.0010991617838541667,
          },
          'aly-consumption-office365-prod': {
            cost: 2.59637895507812,
          },
          Snapshot: {
            cost: 1.576441936,
          },
          'pyc-search-prod': {
            cost: 0.003951171875,
          },
          'bot-prod': {
            cost: 0.000259537760416667,
          },
          workspaces: {
            cost: 950.5373451266506,
          },
          'customeractivation-migration-test': {
            cost: 0.000032926432291666666,
          },
          partnertopics: {
            cost: 0.1010808,
          },
          'di-reporting-prod': {
            cost: 1.400192578125,
          },
          'EUC1-EC2SP:t3a.1yrNoUpfront': {
            cost: 0,
          },
          bastionhosts: {
            cost: 4.561370245160536,
          },
          'USE1-EUW2-AWS-Out-Bytes': {
            cost: 0,
          },
          'billing-automation-prod': {
            cost: 0.0101587727864583,
          },
          'swo-digital-recommendations-prod': {
            cost: 0.000635286458333333,
          },
          databaseaccounts: {
            cost: 0,
          },
          'EUC1-Tables-Requests-Tier1': {
            cost: 0.0000216,
          },
          'marketplace-pim-prod': {
            cost: 0.0510998860677083,
          },
          'cloud-shard-map-test': {
            cost: 0.000017431640624999998,
          },
          'APN2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'lic-esd-prod': {
            cost: 0.00642099283854167,
          },
          'eashardmap_f67f6315-1523-4bbb-bab4-ff7aea5e2bca': {
            cost: 1.761385937499998,
          },
          'cloud-shard-map-prod': {
            cost: 0.000108463541666667,
          },
          'lic-esd-test': {
            cost: 0.0008599609375,
          },
          'USE1-Reader-Enterprise-Month': {
            cost: 0,
          },
          machines: {
            cost: 0.68,
          },
          'EU-Lambda-GB-Second': {
            cost: 0,
          },
          'aly-cloud-utilization-test': {
            cost: 0.00180126953125,
          },
          'aly-consumption-virtual-test': {
            cost: 0.00013751627604166667,
          },
          'aly-consumption-virtual-prod': {
            cost: 0.317757503255208,
          },
          'EUC1-Requests-Tier8': {
            cost: 0.0003600000000000001,
          },
          'fwk-proxy-identity-provider-test': {
            cost: 0.000032926432291666666,
          },
          inboundendpoints: {
            cost: 6,
          },
          serverfarms: {
            cost: 254.34224124,
          },
          'aly-invoice-automation-test': {
            cost: 0.0000203369140625,
          },
          'trx-transactions-overview-test': {
            cost: 0.07099229329427083,
          },
          'mpt-public-catalog-test': {
            cost: 0.0008154134114583334,
          },
          'aly-consumption-adobe-prod': {
            cost: 0.000939371744791667,
          },
          'swo-extension-nav-prod': {
            cost: 0.086507421875,
          },
          'csp-backoffice-prices-prod': {
            cost: 0.000269222005208333,
          },
          'csp-backoffice-customers-test': {
            cost: 0.0005471598307291666,
          },
          'eashardmap_b18289b7-cf8f-4e13-971c-9e5b1c0c020e': {
            cost: 0.0662189290364583,
          },
          'mpt-cqr-test': {
            cost: 0.000034863281249999996,
          },
          'notifications-management-prod': {
            cost: 0.00690099283854167,
          },
          'fwk-shard-map-coordinator-test': {
            cost: 0.0000203369140625,
          },
          sqlserverinstances: {
            cost: 0,
          },
          'awsshardmap-35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000015494791666666668,
          },
          'spotlightkj-test': {
            cost: 0.000014849175347222222,
          },
          'APS2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'csp-contracts-prod': {
            cost: 0.00149137369791667,
          },
          profiles: {
            cost: 21.008688519065544,
          },
          'csp-backoffice-configurations-test': {
            cost: 0.00001936848958333333,
          },
          'swo-marketplace-order-manager-test': {
            cost: 0.00110400390625,
          },
          'IP Address': {
            cost: 67.69927777777764,
          },
          accounts: {
            cost: 46.794435279800005,
          },
          'USE1-PaidEventsAnalyzed': {
            cost: 0,
          },
          'identitymanagementdb-qa': {
            cost: 0.0000203369140625,
          },
          'fwk-shard-map-prod': {
            cost: 0.000214990234375,
          },
          'collab-prod': {
            cost: 0.0189462565104167,
          },
          'EU-AttachmentsSize-Bytes': {
            cost: 0,
          },
          'EU-CW:Requests': {
            cost: 0,
          },
          'csp-backoffice-customers-prod': {
            cost: 0.00228967827690972,
          },
          'dwh-prod': {
            cost: 4.11817667643229,
          },
          'notifications-management-test': {
            cost: 0.002223502604166667,
          },
          'gpm-rfx-prod': {
            cost: 0.0000658528645833333,
          },
          'int-creditcard-test': {
            cost: 0.0018148274739583333,
          },
          'gpm-rfx-test': {
            cost: 0.000034863281249999996,
          },
          'int-cco-prod-demo': {
            cost: 0.0095060546875,
          },
          'eashardmap_c5ea8285-6825-4842-94d2-c309ed449796': {
            cost: 1.234191145833334,
          },
          'gpm-providers-adobevipm-test': {
            cost: 0.000026147460937499997,
          },
          namespaces: {
            cost: 57.80142498064515,
          },
          'gpm-customeronboarding-prod': {
            cost: 0.0000658528645833333,
          },
          'gpm-providers-adobevipm-prod': {
            cost: 0.0000716634114583333,
          },
          'USE1-CostDataStorage': {
            cost: 0,
          },
          'eashardmap_c204d440-36ba-44c9-acfa-a9ba1b66db92': {
            cost: 0.03157451171875,
          },
          fogtest: {
            cost: 0.000012610677083333332,
          },
          'emerald-storage-tcs': {
            cost: 13.385371402994823,
          },
          'EU-Recipients': {
            cost: 0,
          },
          'reportingenginequartzdb-test': {
            cost: 0.00002227376302083333,
          },
          'reportingenginedb-test': {
            cost: 0.000059073893229166666,
          },
          'customer-solutions': {
            cost: 0.00108463541666667,
          },
          'cloudazureshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00011330566406249999,
          },
          'aly-consumption-aws-prod': {
            cost: 55.34279065212671,
          },
          'EUC1-ConfigRuleEvaluations': {
            cost: 0,
          },
          'EU-VendedLog-Bytes': {
            cost: 0,
          },
          connections: {
            cost: 0.040625,
          },
          'aly-consumption-read-ea-test': {
            cost: 0.028684087456597222,
          },
          'mpt-procurement-prod': {
            cost: 0.0000232421875,
          },
          'swo-marketplace-contracts-prod': {
            cost: 0.000100716145833333,
          },
          'mpt-procurement-test': {
            cost: 0.000015494791666666668,
          },
          'tellurium-test': {
            cost: 0.09485911458333332,
          },
        },
        '1762473600': {
          'swo-marketplace-order-fulfillment-prod': {
            cost: 0.0507841796875,
          },
          'pyracloud-subscriptions': {
            cost: 0.0019525858561197898,
          },
          Metric: {
            cost: 0.16650456019999998,
          },
          'eu-west-3-KMS-Requests': {
            cost: 0,
          },
          'cspshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.0005326334635416666,
          },
          'aly-consumption-salesforce-test': {
            cost: 0.000017431640625,
          },
          'nltdb-csp-import-test': {
            cost: 0.0040189615885416665,
          },
          'aly-consumption-read-ea-test': {
            cost: 0.03129173177083334,
          },
          'mpt-procurement-prod': {
            cost: 0.0000232421875,
          },
          'mpt-procurement-test': {
            cost: 0.000015494791666666664,
          },
          'pyc-simple-test': {
            cost: 0.000015494791666666664,
          },
          'csp-price-calculation-service-test': {
            cost: 0.0004222330729166667,
          },
          'nltdb-csp-import-prod': {
            cost: 16.600536800130158,
          },
          virtualmachinescalesets: {
            cost: 961.2420630793035,
          },
          'EUW1-BilledBytes': {
            cost: 0,
          },
          natgateways: {
            cost: 300.18096528315897,
          },
          'Load Balancer': {
            cost: 21.041299477093855,
          },
          'gpm-providers-adobevipm-test': {
            cost: 0.000023242187499999995,
          },
          'eashardmap_72016d53-1ba0-4f71-ab9c-0a90df48b048': {
            cost: 0.582745556640625,
          },
          'mpt-module-spotlight-prod': {
            cost: 0.000726318359375,
          },
          'swo-web-header-test': {
            cost: 0.00005810546874999999,
          },
          'gpm-providers-adobevipm-prod': {
            cost: 0.0000716634114583333,
          },
          'USE1-CostDataStorage': {
            cost: 0,
          },
          'swo-marketplace-address-book-test': {
            cost: 0.000017431640625,
          },
          networkwatchers: {
            cost: 0,
          },
          'csp-subscriptions-prod': {
            cost: 0.00418746744791667,
          },
          'awsshardmap_a0b82f35-ecdf-4392-8eab-c2a7269ebc65': {
            cost: 0.15195161132812532,
          },
          'reportingenginequartzdb-test': {
            cost: 0.00001936848958333333,
          },
          'gpm-itemconfiguration-prod': {
            cost: 0.00001162109375,
          },
          'fwk-navision-scope-test': {
            cost: 0.0026844726562499995,
          },
          'eashardmap_14336735-a54e-41c0-8063-856b5379bd1c': {
            cost: 1.8773063476562468,
          },
          pools: {
            cost: 0.68399316,
          },
          'awsshardmap_d0bc9c1b-06cf-437f-a37f-a3ad2340ed65': {
            cost: 0.4548205566406253,
          },
          'swo-portal-prod': {
            cost: 12.35330594075521,
          },
          'gpm-swo-salesprice-prod': {
            cost: 0.06151044921875,
          },
          'gpm-rfx-prod': {
            cost: 0.0000658528645833333,
          },
          'swo-pyraproxy-test': {
            cost: 0.010106477864583333,
          },
          'mpt-helpdesk-prod': {
            cost: 0.000046484375,
          },
          'gpm-rfx-test': {
            cost: 0.000030989583333333336,
          },
          'user-rank-prod': {
            cost: 0.0747081380208334,
          },
          'pyracloud-subscriptions_2020-09-29t07-59z': {
            cost: 0.000108463541666667,
          },
          'CW:Requests': {
            cost: 0,
          },
          signalr: {
            cost: 12.879999999999999,
          },
          clusters: {
            cost: 0.090006984,
          },
          'mpt-cqr-test': {
            cost: 0.00003098958333333333,
          },
          trafficmanagerprofiles: {
            cost: 1.1461208083870984,
          },
          redis: {
            cost: 48.647999999999996,
          },
          'awsshardmap_54286192-fc00-402c-9575-08102633bf40': {
            cost: 0.000123958333333333,
          },
          'aly-consumption-slm-prod': {
            cost: 0.101134505208333,
          },
          'int-config-test': {
            cost: 0.000040673828125000006,
          },
          'USE1-Reader-Enterprise-Month': {
            cost: 0,
          },
          'gpp-identity-prod': {
            cost: 0.000172379557291667,
          },
          'swo-platform-test': {
            cost: 0.004677490234375,
          },
          'awsshardmap_ca4ef284-5503-4019-a176-7b079926439a': {
            cost: 0.259596834309896,
          },
          staticsites: {
            cost: 7.211572993013698,
          },
          'aly-consumption-virtual-test': {
            cost: 0.00012202148437499999,
          },
          'risk-profiler-reports-db-prod': {
            cost: 0.000451285807291667,
          },
          'aly-consumption-virtual-prod': {
            cost: 0.317757503255208,
          },
          'eashardmap_c7242070-60da-4c92-bc34-8b1a34c50a01': {
            cost: 8.59747303059896,
          },
          'igrt-mgr-tracking-test': {
            cost: 0.00011427408854166667,
          },
          'awsshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00015494791666666665,
          },
          Bucket: {
            cost: 525.8229947333105,
          },
          publicipprefixes: {
            cost: 26.208000000000006,
          },
          'cloud-platform-prod': {
            cost: 0.00695328776041666,
          },
          vaults: {
            cost: 38.587176133545945,
          },
          'mpt-tasks-test': {
            cost: 0.000025179036458333332,
          },
          'EU-Requests-Tier2': {
            cost: 0,
          },
          'ap-southeast-1-KMS-Requests': {
            cost: 0,
          },
          'swo-platform-performace_2024-06-28t10-29z': {
            cost: 0.000517037760416667,
          },
          'swo-digital-recommendations-prod-restored': {
            cost: 0.000017431640625,
          },
          'aly-consumption-ea-test': {
            cost: 0.10573567708333333,
          },
          bastionhosts: {
            cost: 4.5613828051798055,
          },
          'pyra-dot-net-templates-prod': {
            cost: 0.000139453125,
          },
          'csp-orders-test': {
            cost: 0.00004261067708333333,
          },
          'swo-platform-prod_2025-05-07t12-43z': {
            cost: 0.00116503255208333,
          },
          'marketplace-pim-prod': {
            cost: 0.0510998860677083,
          },
          'lic-esd-prod': {
            cost: 0.00642099283854167,
          },
          'cloud-shard-map-test': {
            cost: 0.000015494791666666664,
          },
          'lic-esd-test': {
            cost: 0.0007650553385416667,
          },
          'cloud-shard-map-prod': {
            cost: 0.000108463541666667,
          },
          'eashardmap_0da2a725-c790-4d1f-b155-080817a86035': {
            cost: 0.04363720703125,
          },
          'AWS Security Hub - Standards': {
            cost: 0.14943060100000002,
          },
          'lic-mgr-gus-prod': {
            cost: 0.000133642578125,
          },
          'Global-SoftwareUsage-Contracts': {
            cost: 3139.2650273224044,
          },
          applicationgateways: {
            cost: 435.3800125853178,
          },
          'mpt-module-billing-prod': {
            cost: 0.115242513020833,
          },
          sonarqube: {
            cost: 0.04912236328125,
          },
          'Business Analytics': {
            cost: 3.6000000288,
          },
          'mpt-extensions-test': {
            cost: 0.000029052734374999995,
          },
          'cloud-consumption-aws-prod': {
            cost: 0.00010458984375,
          },
          'int-pim-integration-test': {
            cost: 0.00006197916666666666,
          },
          'fwk-feature-toggle-prod': {
            cost: 0.000199495442708333,
          },
          'mpt-currency-test': {
            cost: 0.00003098958333333333,
          },
          'eashardmap_37dd1f9c-8205-440f-87f3-da1fb808b40c': {
            cost: 0.206280224609375,
          },
          'cloud-cost-allocation-test': {
            cost: 0.00011446614583333334,
          },
          'cloud-shard-map-coordinator-prod': {
            cost: 0.000102652994791667,
          },
          'Requests-Tier8': {
            cost: 0.00009,
          },
          'products-catalog-api-test': {
            cost: 0.00007166341145833333,
          },
          'eashardmap_2c8c5274-a7cf-477f-a877-977f00622a4c': {
            cost: 1.08597878282335,
          },
          'gpm-authorization-prod': {
            cost: 0.0000716634114583334,
          },
          grafana: {
            cost: 14.951999999999998,
          },
          'eashardmap_eeb8bf9d-55d9-4fa3-ae6b-2d42c25df109': {
            cost: 1.71811418294271,
          },
          'risk-product-lifecyle-db-prod': {
            cost: 0.0002120849609375,
          },
          'gpm-swo-rfx-test': {
            cost: 0.000063916015625,
          },
          'wrk-management-test': {
            cost: 0.002622493489583333,
          },
          service: {
            cost: 260.28480034799975,
          },
          nlpsql_analytics_scheduler: {
            cost: 0.0107340169270833,
          },
          'exp-global-search-prod': {
            cost: 0.000736083306206597,
          },
          'cloud-consumption-azure-test': {
            cost: 0.007125667317708333,
          },
          elasticpools: {
            cost: 682.3363148539945,
          },
          'swo-digital-maturity-calculator-test': {
            cost: 0.00001936848958333333,
          },
          'gpm-providers-mscsp-prod': {
            cost: 0.000224674479166667,
          },
          'cloud-consumption-azure-prod': {
            cost: 0.0220471516927083,
          },
          'swo-digital-maturity-calculator-prod': {
            cost: 0.000141389973958333,
          },
          'swo-marketplace-checkout-prod': {
            cost: 0.000110400390625,
          },
          dnszones: {
            cost: 0.45678285161290266,
          },
          'eashardmap_7e23f6f5-a875-4963-af34-29ed1d4ae24d': {
            cost: 0.146398665364583,
          },
          containerapps: {
            cost: 14.974141999999999,
          },
          'mpt-chat-test': {
            cost: 0.000011621093749999997,
          },
          configurationstores: {
            cost: 8.4,
          },
          'mpt-module-billing-test': {
            cost: 0.007999186197916666,
          },
          'exp-global-search-test': {
            cost: 0.00001936848958333333,
          },
          'products-catalog-api-prod': {
            cost: 0.000232421875,
          },
          'mpt-module-billing-prod-debug-1': {
            cost: 0.00229322916666667,
          },
          'USE2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'aly-cloud-utilization-prod': {
            cost: 2.34333851589627,
          },
          'fwk-feature-toggle-test': {
            cost: 0.00003098958333333333,
          },
          virtualnetworkgateways: {
            cost: 24.72,
          },
          'Metric Streams': {
            cost: 0.128589,
          },
          'gpm-authorization-test': {
            cost: 0.000021305338541666665,
          },
          'cloud-pricelist-saas': {
            cost: 0.0000949055989583333,
          },
          'cspshardmap_986dcd1f-43af-4ee7-9dbd-11411d7c399d': {
            cost: 0.298710530598958,
          },
          'aly-consumption-aws-test': {
            cost: 0.01429007161458333,
          },
          'cloud-pricelist-paas': {
            cost: 0.0002556640625,
          },
          'eashardmap_7f75776e-89af-413b-88a2-28593e2ac6b2': {
            cost: 2.00534562174479,
          },
          'cspshardmap_72ce77e7-2041-4f5d-3a72-08da26e48a74': {
            cost: 0.44433251953125,
          },
          domains: {
            cost: 11.99,
          },
          'aly-invoice-automation-prod': {
            cost: 0.0001626953125,
          },
          'mpt-currency-prod': {
            cost: 0.0000445475260416667,
          },
          'mpt-chat-prod': {
            cost: 0.0000387369791666667,
          },
          'aly-pricelist-test': {
            cost: 0.08763079427083333,
          },
          'int-config-prod': {
            cost: 0.00182063802083333,
          },
          'gpm-subscriptions-prod': {
            cost: 0.0000154947916666667,
          },
          'eashardmap_ee859c36-53ff-4440-bd50-4d8da7e70412': {
            cost: 0.008256787109375,
          },
          'eashardmap_35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000013557942708333333,
          },
          'swo-platform-prod_2024-06-26t22-03z': {
            cost: 0.000489876302083333,
          },
          identitymanagementdb: {
            cost: 0.0530890299479167,
          },
          'csp-billing-automation-test': {
            cost: 0.009023295084635414,
          },
          'mpt-tasks-prod': {
            cost: 0.000052294921875,
          },
          'igrt-mgr-tracking-prod': {
            cost: 0.000974235026041667,
          },
          'Savings Plan': {
            cost: 4290.815978716099,
          },
          factories: {
            cost: 9.502316666666669,
          },
          'swo-platform-prod': {
            cost: 0.0512683919270833,
          },
          Volume: {
            cost: 139.8056827184,
          },
          'issue-detection-engine-prod': {
            cost: 0.000218863932291667,
          },
          'mpt-catalog-prod': {
            cost: 0.0000774739583333333,
          },
          'gpp-identity-test': {
            cost: 0.000029052734374999995,
          },
          'aly-consumption-ea-prod': {
            cost: 27.560777685546892,
          },
          chtvs00471_cpx_full_202109262000: {
            cost: 0.0000145263671875,
          },
          Storage: {
            cost: 1.1504383333,
          },
          'Management Tools - AWS Config Rules': {
            cost: 0.035,
          },
          'csp-orders-prod': {
            cost: 0.00208986002604167,
          },
          sites: {
            cost: 0.227181277,
          },
          'awsshardmap-26517465236498': {
            cost: 0.000013557942708333333,
          },
          'eashardmap_54286192-fc00-402c-9575-08102633bf40': {
            cost: 0.000168505859375,
          },
          AWSSupportEnterprise: {
            cost: 537.9426666666667,
          },
          'dwh-test': {
            cost: 0.37030034179687504,
          },
          'gpm-customeronboarding-test': {
            cost: 0.000017431640625,
          },
          registries: {
            cost: 22.695354283733117,
          },
          'aly-consumption-ea-integrationtest': {
            cost: 0.000021305338541666665,
          },
          'bot-test': {
            cost: 0.00001936848958333333,
          },
          jobagents: {
            cost: 0.9119999999999999,
          },
          'gpm-swo-salesprice-test': {
            cost: 0.017520735677083333,
          },
          Alarm: {
            cost: 0.0472853424,
          },
          samdatawarehouse: {
            cost: 0.06998997395833337,
          },
          'swo-portal-test': {
            cost: 0.12879851888020832,
          },
          'user-rank-test': {
            cost: 0.000749560546875,
          },
          'awsshardmap_d7275497-ac0b-411b-9396-d98d1c26f634': {
            cost: 0.844009049479166,
          },
          'swo-digital-recommendations-test': {
            cost: 0.000017431640625,
          },
          'customer-solutions-test': {
            cost: 0.00024210611979166662,
          },
          'Kinesis Firehose': {
            cost: 0.0005705832,
          },
          ssisdb: {
            cost: 0.00001936848958333333,
          },
          'eashardmap_ac7850af-21d1-4ebd-8c22-b475e5d40978': {
            cost: 0.744933414713542,
          },
          'trackit-test-integrationtest': {
            cost: 0.000029052734374999995,
          },
          'awsshardmap_c6469e97-302a-408a-8589-2122a0bb725d': {
            cost: 0.00191360677083333,
          },
          slots: {
            cost: 0.0060681630000000005,
          },
          'pyracloud-subscriptions-restore': {
            cost: 0.00012783203125,
          },
          'mpt-helpdesk-test': {
            cost: 0.000011621093749999997,
          },
          azurefirewalls: {
            cost: 60.09241631152853,
          },
          'fwk-proxy-identity-provider-prod': {
            cost: 0.000416422526041667,
          },
          components: {
            cost: 0.200777274882613,
          },
          pricings: {
            cost: 61.08792,
          },
          'eashardmap_f60ce9fd-154d-427d-bf91-2e4b42dd86c4': {
            cost: 0.242785953776042,
          },
          'fwk-shard-map-test': {
            cost: 0.00003486328125,
          },
          enterprisearchitect: {
            cost: 0.00347083333333333,
          },
          'mpt-module-spotlight-test': {
            cost: 0.00007747395833333333,
          },
          'APN3-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          servers: {
            cost: 2.4193548387096793,
          },
          'csp-subscriptions-test': {
            cost: 0.0001607584635416667,
          },
          'auth-api-prod': {
            cost: 0.00191554361979167,
          },
          'AWS Glue': {
            cost: 0.13603392,
          },
          'eashardmap_e3c55fc0-e7ce-48fd-a244-8afd1041d843': {
            cost: 0.06230068359375,
          },
          'swo-marketplace-address-book-prod': {
            cost: 0.0000716634114583334,
          },
          Instance: {
            cost: 338.01515579680944,
          },
          'Storage Snapshot': {
            cost: 0.0000070685,
          },
          networksecuritygroups: {
            cost: 0.06752025373280048,
          },
          'csp-backoffice-prices-test': {
            cost: 0.00003098958333333333,
          },
          'awsshardmap_b4fd484f-d43c-4162-a1ea-83e4b103b46e': {
            cost: 3.107792301432293,
          },
          managedclusters: {
            cost: 4.79114342322344,
          },
          'collab-test': {
            cost: 0.0024249348958333334,
          },
          'aly-consumption-adobe-test': {
            cost: 0.00024791666666666663,
          },
          'auth-api-test': {
            cost: 0.00010652669270833332,
          },
          'csp-backoffice-configurations-prod': {
            cost: 0.000154947916666667,
          },
          'int-creditcard-prod': {
            cost: 0.00320419379340278,
          },
          'swo-marketplace-order-manager-prod': {
            cost: 0.000110400390625,
          },
          'swo-marketplace-order-fulfillment-test': {
            cost: 0.006006168619791667,
          },
          'market-shop-prod': {
            cost: 0.0732167643229167,
          },
          'EUC1-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'fwk-navision-scope-prod': {
            cost: 0.246037923177083,
          },
          'csp-contracts-test': {
            cost: 0.00005616861979166667,
          },
          'trx-transactions-overview-test': {
            cost: 0.06323424479166666,
          },
          'awsshardmap_878761c0-f03f-4fb9-89cc-001df25f0b58': {
            cost: 11.88117770182295,
          },
          'aly-pricelist-prod': {
            cost: 3.2291320149739597,
          },
          'market-shop-test': {
            cost: 0.00073212890625,
          },
          USSalesTax: {
            cost: 0.011666666666666665,
          },
          'notifications-management-test': {
            cost: 0.0020937337239583334,
          },
          Snapshot: {
            cost: 1.576441936,
          },
          'csp-backoffice-customers-prod': {
            cost: 0.00235520833333333,
          },
          'notifications-management-prod': {
            cost: 0.00734219089084201,
          },
          'csp-backoffice-invoices-prod': {
            cost: 0.8817795410156251,
          },
          'csp-backoffice-invoices-test': {
            cost: 0.014274576822916664,
          },
          'csp-backoffice-customers-test': {
            cost: 0.00048614908854166663,
          },
          'cspshardmap_35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000013557942708333333,
          },
          'eashardmap_1543ffee-9eff-4a72-a1b3-817f34a29ae2': {
            cost: 1.213470735677083,
          },
          'cloud-consumption-ea-prod': {
            cost: 0.000005810546875,
          },
          'eashardmap_e706a119-f41f-4e30-9271-42de678f981c': {
            cost: 0.394913818359375,
          },
          'aly-consumption-sync-meta-ea-test': {
            cost: 0.00001936848958333333,
          },
          flexibleservers: {
            cost: 64.09959642434615,
          },
          'csp-billing-automation-prod': {
            cost: 1.199260074869788,
          },
          databases: {
            cost: 213.47934830548616,
          },
          'EU-Lambda-GB-Second': {
            cost: 0,
          },
          'aly-consumption-office365-prod': {
            cost: 2.59637895507812,
          },
          machines: {
            cost: 0.68,
          },
          serverfarms: {
            cost: 254.34224124,
          },
          'int-cco-prod': {
            cost: 0.422016145833333,
          },
          inboundendpoints: {
            cost: 6,
          },
          'fwk-proxy-identity-provider-test': {
            cost: 0.000029052734374999995,
          },
          'EUC1-Requests-Tier8': {
            cost: 0.0003600000000000001,
          },
          'int-cco-test': {
            cost: 0.0008677083333333333,
          },
          'aly-cloud-utilization-test': {
            cost: 0.001597900390625,
          },
          'mpt-public-catalog-test': {
            cost: 0.0007243815104166667,
          },
          'aly-invoice-automation-test': {
            cost: 0.000017431640625,
          },
          'di-reporting-prod': {
            cost: 1.41138697916667,
          },
          workspaces: {
            cost: 939.800344072516,
          },
          'customeractivation-migration-test': {
            cost: 0.000029052734374999995,
          },
          'bot-prod': {
            cost: 0.000259537760416667,
          },
          'pyc-search-prod': {
            cost: 0.003951171875,
          },
          'USE1-EUW2-AWS-Out-Bytes': {
            cost: 0,
          },
          'billing-automation-prod': {
            cost: 0.0103913560655382,
          },
          'EUC1-EC2SP:t3a.1yrNoUpfront': {
            cost: 0,
          },
          'Management Tools - AWS CloudTrail Free Events Recorded': {
            cost: 0,
          },
          'EUC1-Tables-Requests-Tier1': {
            cost: 0.0000216,
          },
          'swo-digital-recommendations-prod': {
            cost: 0.000635286458333333,
          },
          databaseaccounts: {
            cost: 0,
          },
          'eashardmap_f67f6315-1523-4bbb-bab4-ff7aea5e2bca': {
            cost: 1.9119552842881982,
          },
          'APN2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'EU-Recipients': {
            cost: 0,
          },
          'swo-marketplace-contracts-prod': {
            cost: 0.000100716145833333,
          },
          'IP Address': {
            cost: 68.14079999999986,
          },
          'tellurium-test': {
            cost: 0.11560954589843749,
          },
          'collab-prod': {
            cost: 0.0189462565104167,
          },
          'fwk-shard-map-prod': {
            cost: 0.000214990234375,
          },
          'EU-AttachmentsSize-Bytes': {
            cost: 0,
          },
          'USE1-PaidEventsAnalyzed': {
            cost: 0,
          },
          accounts: {
            cost: 50.1299177231,
          },
          'identitymanagementdb-qa': {
            cost: 0.000017431640625,
          },
          'dwh-prod': {
            cost: 4.13567578396267,
          },
          'Data Payload': {
            cost: 2.6647323605,
          },
          'int-creditcard-test': {
            cost: 0.0016133951822916667,
          },
          'aly-consumption-adobe-prod': {
            cost: 0.000939371744791667,
          },
          'eashardmap_b18289b7-cf8f-4e13-971c-9e5b1c0c020e': {
            cost: 0.0662189290364583,
          },
          'reportingenginedb-test': {
            cost: 0.000052294921874999994,
          },
          'csp-backoffice-prices-prod': {
            cost: 0.000269222005208333,
          },
          'csp-contracts-prod': {
            cost: 0.00149137369791667,
          },
          profiles: {
            cost: 20.89058399238522,
          },
          'APS2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'spotlightkj-test': {
            cost: 0.000013557942708333333,
          },
          'awsshardmap-35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000013557942708333333,
          },
          sqlserverinstances: {
            cost: 0,
          },
          'swo-marketplace-order-manager-test': {
            cost: 0.0012047200520833336,
          },
          'cloud-workspace-prod': {
            cost: 0.000108463541666667,
          },
          'csp-backoffice-configurations-test': {
            cost: 0.000017431640625,
          },
          'cloud-workspace-test': {
            cost: 0.000021305338541666665,
          },
          'sub-mgr-test': {
            cost: 0.00049970703125,
          },
          'customer-solutions': {
            cost: 0.00108463541666667,
          },
          'sub-mgr-prod': {
            cost: 0.014921484375,
          },
          'cloudazureshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00010071614583333331,
          },
          'EU-CW:Requests': {
            cost: 0,
          },
          'EUC1-ConfigRuleEvaluations': {
            cost: 0,
          },
          'aly-consumption-aws-prod': {
            cost: 58.78817120768231,
          },
          'EU-VendedLog-Bytes': {
            cost: 0,
          },
          metricalerts: {
            cost: 2.3482526881720274,
          },
          connections: {
            cost: 0.036625,
          },
          'eashardmap_c5ea8285-6825-4842-94d2-c309ed449796': {
            cost: 1.234191145833334,
          },
          'int-cco-prod-demo': {
            cost: 0.0095060546875,
          },
          'fwk-shard-map-coordinator-test': {
            cost: 0.000017431640625,
          },
          fogtest: {
            cost: 0.000011640625,
          },
          'eashardmap_c204d440-36ba-44c9-acfa-a9ba1b66db92': {
            cost: 0.03157451171875,
          },
          partnertopics: {
            cost: 0.1095282,
          },
          namespaces: {
            cost: 57.80122018064516,
          },
          'gpm-customeronboarding-prod': {
            cost: 0.0000658528645833333,
          },
          'trackit-test': {
            cost: 0.0018264485677083335,
          },
          'emerald-storage-tcs': {
            cost: 13.382419645182322,
          },
          'trackit-prod': {
            cost: 0.00792364908854167,
          },
          'swo-extension-nav-prod': {
            cost: 0.086507421875,
          },
          'gpm-swo-rfx-prod': {
            cost: 0.0000677897135416667,
          },
          'eashardmap_2b898fc6-f2f6-4d45-a87a-59c44aa1b4d6': {
            cost: 0.0744776529947917,
          },
          'mgmt-console-gus-test': {
            cost: 0.000032926432291666666,
          },
          'swo-extension-nav-test': {
            cost: 0.0017470377604166664,
          },
          'cloudofficeshardmap_2b05987e-f9b4-4348-bce0-712d90c48b24': {
            cost: 0.00007166341145833333,
          },
          'fwk-iam-test': {
            cost: 0.006734423828125001,
          },
          'eu-west-2-KMS-Requests': {
            cost: 0,
          },
          'fwk-iam-prod': {
            cost: 0.007315478515625,
          },
          'mgmt-acm-test': {
            cost: 0.000017431640625,
          },
          'fwk-shard-map-coordinator-prod': {
            cost: 0.000145263671875,
          },
          'swo-pyraproxy-prod': {
            cost: 0.361237825520833,
          },
          'EUC1-Requests': {
            cost: 0,
          },
          'Tables-Requests-Tier1': {
            cost: 0.000005,
          },
          'eashardmap_0c1e78e9-1066-4e18-9882-bd123c54a2bd': {
            cost: 1.851325455729167,
          },
          'pyracloud-subscriptions_2020-09-29t06-59z': {
            cost: 0.000122021484375,
          },
          'awsshardmap_c445ff59-32a7-4ff7-b325-3d04eb3f4d82': {
            cost: 0.00000193684895833333,
          },
          'cloudeashardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00001936848958333333,
          },
          'notificationhubquartzdb-prod': {
            cost: 0.000319580078125,
          },
          'notificationhubquartzdb-test': {
            cost: 0.000050358072916666664,
          },
          extensiontopics: {
            cost: 0.0062232,
          },
          resources: {
            cost: 0,
          },
          privatednszones: {
            cost: 0.0806451612903225,
          },
          'cloud-shard-map-coordinator-test': {
            cost: 0.000013557942708333333,
          },
          'EUC1-PaidComplianceCheck': {
            cost: 0,
          },
          'int-pim-integration-prod': {
            cost: 0.00155916341145833,
          },
          'mgmt-acm-prod': {
            cost: 0.000147200520833333,
          },
          'swo-web-header-prod': {
            cost: 0.0024171875,
          },
          'DataTransfer-Out-Bytes': {
            cost: 0,
          },
          Dollar: {
            cost: 0,
          },
          'USE1-EU-AWS-Out-Bytes': {
            cost: 0,
          },
          'swo-marketplace-customer-prod': {
            cost: 0.000100716145833333,
          },
          'swo-marketplace-pricemanager': {
            cost: 0.001144677734375,
          },
          'USE1-APS2-AWS-Out-Bytes': {
            cost: 0,
          },
          'awsshardmap_099fd68f-cdc0-470c-83f7-68274cbee998': {
            cost: 0.320612418619792,
          },
          'csp-license-assignments-prod': {
            cost: 0.000193684895833333,
          },
          'eashardmap_7e3b2aa9-30f9-4316-8b88-e75303e4def2': {
            cost: 0.234806136067708,
          },
          'aly-consumption-slm-test': {
            cost: 0.0009955403645833334,
          },
          'csp-price-calculation-service-prod': {
            cost: 4.267949332682292,
          },
          'cloud-pricelist-paas-test': {
            cost: 0.00005616861979166667,
          },
          'cloudawsshardmap_50b14c10-7229-4581-b736-0494d49d0bb8': {
            cost: 0.000013557942708333333,
          },
          'swo-marketplace-contracts-test': {
            cost: 0.000021305338541666665,
          },
          searchservices: {
            cost: 106.46400000000001,
          },
          'swo-marketplace-customer-test': {
            cost: 0.00005423177083333333,
          },
          'wrk-management-prod': {
            cost: 0.010046435546875,
          },
          'awsshardmap_d450009c-5886-4703-8e6d-740dbecc21c9': {
            cost: 1.2361783528645869,
          },
          'cloud-consumption-office-prod': {
            cost: 0.000098779296875,
          },
          nltsql_analytics_scheduler: {
            cost: 0.000366064453125,
          },
          'di-reporting-test': {
            cost: 0.007603268229166666,
          },
          'EUC1-CW:Requests': {
            cost: 0,
          },
          'customeractivation-migration-prod': {
            cost: 0.000730192057291667,
          },
          'EU-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'cloud-cost-allocation-prod': {
            cost: 0.000131705729166667,
          },
          scheduledqueryrules: {
            cost: 2.9566196236559126,
          },
          'swo-digital-assessments-prod': {
            cost: 0.00107882486979167,
          },
          'billing-automation-test_2019-06-25t15-20z': {
            cost: 0.000032926432291666666,
          },
          'cloud-consumption-aws-test': {
            cost: 0.00015301106770833331,
          },
          'mpt-public-catalog-prod': {
            cost: 0.002515966796875,
          },
          'swo-digital-assessments-test': {
            cost: 0.00009877929687499998,
          },
          'pyc-search-test': {
            cost: 0.00001936848958333333,
          },
          'swo-extension-nav-prod_2025-05-07t13-52z': {
            cost: 0.000476295572916667,
          },
          'EUC1-Crawler-DPU-Hour': {
            cost: 0,
          },
          'EUN1-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'billing-automation-test': {
            cost: 0.0011524251302083332,
          },
          'eashardmap_5aa598f6-990c-4d69-9f5e-1275d34d14e5': {
            cost: 0.2116201171875,
          },
          nlpsql_analytics_scheduler_kj: {
            cost: 0.00137903645833333,
          },
          backupvaults: {
            cost: 0.16737165119999997,
          },
          'cloud-consumption-office-test': {
            cost: 0.000018400065104166663,
          },
          nltapp0127sdb: {
            cost: 0.00012783203125,
          },
          'aly-consumption-office365-test': {
            cost: 0.023980126953124997,
          },
          images: {
            cost: 0.0660684,
          },
          'eashardmap_3c7b4733-d8c6-4030-8605-e2c2b59f6f45': {
            cost: 0.0499145345052083,
          },
          'mpt-extensions-prod': {
            cost: 0.0000329264322916667,
          },
          'renewal-manager-test': {
            cost: 0.016226920572916664,
          },
          'renewal-manager-prod': {
            cost: 0.504124983723958,
          },
          'customer-support-prod': {
            cost: 0.219794023301866,
          },
          GuardDuty: {
            cost: 0.04278,
          },
          privateendpoints: {
            cost: 1.4400000055506825,
          },
          'Data Transfer': {
            cost: 0.03726704090000004,
          },
          'Sending Email': {
            cost: 1.0292826756,
          },
          'eashardmap_1d9e10e9-e0d9-49bc-8362-4635af48e3b0': {
            cost: 0.02240546875,
          },
          'pyra-dot-net-templates-test': {
            cost: 0.000017431640625,
          },
          'API Request': {
            cost: 0.19019559460000024,
          },
          'eashardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.021409928385416666,
          },
          actiongroups: {
            cost: 0.04474000000000001,
          },
          'swo-digital-cloud-compatibility': {
            cost: 0.000191425238715278,
          },
          'customer-support-test': {
            cost: 0.0018806803385416665,
          },
          'cloud-platform-test': {
            cost: 0.00013170572916666666,
          },
          Serverless: {
            cost: 0.0011313442,
          },
          workflows: {
            cost: 0.9721265548853602,
          },
          'pyracloud-subscriptions_2020-09-29t08-59z': {
            cost: 0.000110400390625,
          },
          'trx-transactions-overview-prod': {
            cost: 1.83441063096788,
          },
        },
        '1762560000': {
          'bot-test': {
            cost: 0.000020175509982638885,
          },
          jobagents: {
            cost: 0.912,
          },
          registries: {
            cost: 22.692823083733117,
          },
          'gpm-customeronboarding-test': {
            cost: 0.000017431640625,
          },
          'aly-consumption-ea-integrationtest': {
            cost: 0.000021305338541666665,
          },
          'cloud-workspace-test': {
            cost: 0.000021305338541666665,
          },
          'Kinesis Firehose': {
            cost: 0.0005689571,
          },
          'awsshardmap_d7275497-ac0b-411b-9396-d98d1c26f634': {
            cost: 0.869103833007812,
          },
          'swo-digital-recommendations-test': {
            cost: 0.000017431640625,
          },
          'customer-solutions-test': {
            cost: 0.00024210611979166665,
          },
          'cloud-workspace-prod': {
            cost: 0.000108463541666667,
          },
          'gpm-swo-salesprice-test': {
            cost: 0.019289078776041663,
          },
          'swo-portal-test': {
            cost: 0.12879851888020832,
          },
          samdatawarehouse: {
            cost: 0.07152411973741322,
          },
          'csp-subscriptions-test': {
            cost: 0.0001607584635416667,
          },
          'eashardmap_ac7850af-21d1-4ebd-8c22-b475e5d40978': {
            cost: 0.744933414713542,
          },
          'awsshardmap_c6469e97-302a-408a-8589-2122a0bb725d': {
            cost: 0.00195444200303819,
          },
          'swo-marketplace-order-fulfillment-test': {
            cost: 0.006006168619791667,
          },
          'fwk-proxy-identity-provider-prod': {
            cost: 0.000416422526041667,
          },
          'Data Payload': {
            cost: 2.5227529352999998,
          },
          'pyracloud-subscriptions-restore': {
            cost: 0.00015494791666666665,
          },
          'mpt-helpdesk-test': {
            cost: 0.000011621093749999999,
          },
          components: {
            cost: 0.196415817300355,
          },
          pricings: {
            cost: 42.97928,
          },
          'user-rank-test': {
            cost: 0.000749560546875,
          },
          servers: {
            cost: 2.4193548387096793,
          },
          'APN3-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'mpt-module-spotlight-test': {
            cost: 0.00007747395833333333,
          },
          'eashardmap_f60ce9fd-154d-427d-bf91-2e4b42dd86c4': {
            cost: 0.242785953776042,
          },
          'fwk-shard-map-test': {
            cost: 0.00003486328125,
          },
          enterprisearchitect: {
            cost: 0.00347083333333333,
          },
          Instance: {
            cost: 337.3392145422976,
          },
          'Storage Snapshot': {
            cost: 0.000007077,
          },
          'swo-marketplace-address-book-prod': {
            cost: 0.0000716634114583334,
          },
          'trackit-prod': {
            cost: 0.0081136216905382,
          },
          'AWS Glue': {
            cost: 0.12664608,
          },
          'trackit-test': {
            cost: 0.0018264485677083335,
          },
          'eashardmap_e3c55fc0-e7ce-48fd-a244-8afd1041d843': {
            cost: 0.06230068359375,
          },
          'aly-consumption-adobe-test': {
            cost: 0.00030214843749999995,
          },
          partnertopics: {
            cost: 0.0228156,
          },
          'csp-backoffice-prices-test': {
            cost: 0.00003098958333333333,
          },
          'sub-mgr-prod': {
            cost: 0.014921484375,
          },
          'collab-test': {
            cost: 0.0024249348958333334,
          },
          'sub-mgr-test': {
            cost: 0.00049970703125,
          },
          azurefirewalls: {
            cost: 60.14483228797373,
          },
          managedclusters: {
            cost: 4.76919854206864,
          },
          'awsshardmap_b4fd484f-d43c-4162-a1ea-83e4b103b46e': {
            cost: 3.107792301432293,
          },
          'market-shop-prod': {
            cost: 0.0732167643229167,
          },
          'fwk-navision-scope-prod': {
            cost: 0.246037923177083,
          },
          'csp-contracts-test': {
            cost: 0.00005616861979166667,
          },
          'EUC1-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          ssisdb: {
            cost: 0.00001936848958333333,
          },
          'csp-backoffice-configurations-prod': {
            cost: 0.000154947916666667,
          },
          metricalerts: {
            cost: 2.3211021505376177,
          },
          'swo-marketplace-order-manager-prod': {
            cost: 0.000110400390625,
          },
          'int-creditcard-prod': {
            cost: 0.00329651692708333,
          },
          'products-catalog-api-prod': {
            cost: 0.000232421875,
          },
          'csp-backoffice-invoices-test': {
            cost: 0.014274576822916666,
          },
          configurationstores: {
            cost: 8.4,
          },
          'mpt-module-billing-test': {
            cost: 0.007999186197916666,
          },
          'csp-backoffice-invoices-prod': {
            cost: 0.8817795410156251,
          },
          'mpt-tasks-prod': {
            cost: 0.00005665283203125,
          },
          'fwk-feature-toggle-test': {
            cost: 0.00003098958333333333,
          },
          'aly-cloud-utilization-prod': {
            cost: 2.45286038411458,
          },
          'csp-backoffice-customers-prod': {
            cost: 0.00235520833333333,
          },
          'USE2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'notifications-management-test': {
            cost: 0.0020937337239583334,
          },
          'mpt-module-billing-prod-debug-1': {
            cost: 0.00229322916666667,
          },
          'gpm-subscriptions-prod': {
            cost: 0.0000154947916666667,
          },
          'eashardmap_7f75776e-89af-413b-88a2-28593e2ac6b2': {
            cost: 2.12728430582682,
          },
          'cspshardmap_72ce77e7-2041-4f5d-3a72-08da26e48a74': {
            cost: 0.459061610243056,
          },
          'csp-backoffice-customers-test': {
            cost: 0.00048614908854166663,
          },
          'aly-consumption-aws-test': {
            cost: 0.01741517740885417,
          },
          'notifications-management-prod': {
            cost: 0.00786360677083333,
          },
          'cspshardmap_986dcd1f-43af-4ee7-9dbd-11411d7c399d': {
            cost: 0.298710530598958,
          },
          Volume: {
            cost: 136.47287672039994,
          },
          'igrt-mgr-tracking-prod': {
            cost: 0.001016845703125,
          },
          'aly-invoice-automation-prod': {
            cost: 0.000168505859375,
          },
          'mpt-currency-prod': {
            cost: 0.0000445475260416667,
          },
          'eashardmap_35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000013557942708333333,
          },
          'eashardmap_ee859c36-53ff-4440-bd50-4d8da7e70412': {
            cost: 0.008256787109375,
          },
          'gpm-authorization-test': {
            cost: 0.000021305338541666665,
          },
          'int-config-prod': {
            cost: 0.00182063802083333,
          },
          'aly-pricelist-test': {
            cost: 0.08763079427083333,
          },
          'Metric Streams': {
            cost: 0.127497,
          },
          virtualnetworkgateways: {
            cost: 24.72,
          },
          'swo-platform-prod_2024-06-26t22-03z': {
            cost: 0.000489876302083333,
          },
          'exp-global-search-test': {
            cost: 0.00001936848958333333,
          },
          'csp-billing-automation-test': {
            cost: 0.009934098307291665,
          },
          'mpt-catalog-prod': {
            cost: 0.0000774739583333333,
          },
          'issue-detection-engine-prod': {
            cost: 0.000218863932291667,
          },
          'aly-consumption-ea-prod': {
            cost: 28.63767539062499,
          },
          chtvs00471_cpx_full_202109262000: {
            cost: 0.00001936848958333333,
          },
          'gpp-identity-test': {
            cost: 0.000029052734375,
          },
          factories: {
            cost: 7.2899675,
          },
          'swo-platform-prod': {
            cost: 0.0512683919270833,
          },
          'eashardmap_54286192-fc00-402c-9575-08102633bf40': {
            cost: 0.000168505859375,
          },
          'dwh-test': {
            cost: 0.370300341796875,
          },
          Storage: {
            cost: 1.1503746667,
          },
          'int-cco-test': {
            cost: 0.0008677083333333333,
          },
          'awsshardmap-26517465236498': {
            cost: 0.000013557942708333333,
          },
          'Management Tools - AWS Config Rules': {
            cost: 0.035,
          },
          'csp-orders-prod': {
            cost: 0.00210366007486979,
          },
          'int-cco-prod': {
            cost: 0.422016145833333,
          },
          backupvaults: {
            cost: 0.16737165119999997,
          },
          'awsshardmap_ca4ef284-5503-4019-a176-7b079926439a': {
            cost: 0.270984537760417,
          },
          'cloud-consumption-office-prod': {
            cost: 0.000098779296875,
          },
          'swo-platform-test': {
            cost: 0.004677490234375,
          },
          'aly-consumption-slm-prod': {
            cost: 0.104106599934896,
          },
          'Requests-Tier8': {
            cost: 0.00009,
          },
          'int-config-test': {
            cost: 0.0000459194607204861,
          },
          'gpp-identity-prod': {
            cost: 0.000172379557291667,
          },
          'Global-SoftwareUsage-Contracts': {
            cost: 3139.2650273224044,
          },
          'awsshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00015494791666666665,
          },
          publicipprefixes: {
            cost: 26.208000000000006,
          },
          'cloud-platform-prod': {
            cost: 0.00695328776041666,
          },
          staticsites: {
            cost: 7.1203355830136985,
          },
          'eashardmap_c7242070-60da-4c92-bc34-8b1a34c50a01': {
            cost: 9.01876915283203,
          },
          'swo-digital-recommendations-prod-restored': {
            cost: 0.000017431640625,
          },
          nlpsql_analytics_scheduler_kj: {
            cost: 0.00137903645833333,
          },
          'aly-consumption-ea-test': {
            cost: 0.10573567708333333,
          },
          'exp-global-search-prod': {
            cost: 0.00074375,
          },
          'EU-Requests-Tier2': {
            cost: 0,
          },
          'EUC1-Crawler-DPU-Hour': {
            cost: 0,
          },
          'swo-platform-performace_2024-06-28t10-29z': {
            cost: 0.000517037760416667,
          },
          'ap-southeast-1-KMS-Requests': {
            cost: 0,
          },
          'gpm-authorization-prod': {
            cost: 0.0000716634114583334,
          },
          'swo-digital-assessments-test': {
            cost: 0.00009877929687499998,
          },
          'swo-digital-assessments-prod': {
            cost: 0.00107882486979167,
          },
          'eashardmap_0da2a725-c790-4d1f-b155-080817a86035': {
            cost: 0.04363720703125,
          },
          'csp-orders-test': {
            cost: 0.00004503173828125,
          },
          'swo-platform-prod_2025-05-07t12-43z': {
            cost: 0.00116503255208333,
          },
          'pyra-dot-net-templates-prod': {
            cost: 0.000139453125,
          },
          'cloud-consumption-office-test': {
            cost: 0.000023242187499999998,
          },
          nltapp0127sdb: {
            cost: 0.00012783203125,
          },
          'Data Transfer': {
            cost: 0.02528887749999997,
          },
          'Business Analytics': {
            cost: 3.6000000288,
          },
          'customer-support-prod': {
            cost: 0.22599541015625,
          },
          sonarqube: {
            cost: 0.0493980414496528,
          },
          'lic-mgr-gus-prod': {
            cost: 0.000133642578125,
          },
          Bucket: {
            cost: 522.6983882878676,
          },
          'mpt-module-billing-prod': {
            cost: 0.115242513020833,
          },
          'igrt-mgr-tracking-test': {
            cost: 0.00011427408854166667,
          },
          applicationgateways: {
            cost: 434.5819548596684,
          },
          'int-pim-integration-test': {
            cost: 0.00006197916666666667,
          },
          'cloud-shard-map-coordinator-prod': {
            cost: 0.000102652994791667,
          },
          'fwk-feature-toggle-prod': {
            cost: 0.000199495442708333,
          },
          'eashardmap_37dd1f9c-8205-440f-87f3-da1fb808b40c': {
            cost: 0.206280224609375,
          },
          'cloud-cost-allocation-test': {
            cost: 0.00011446614583333334,
          },
          'mpt-currency-test': {
            cost: 0.000030989583333333336,
          },
          'Sending Email': {
            cost: 0.4048578672,
          },
          'mpt-extensions-test': {
            cost: 0.000029052734374999995,
          },
          'cloud-consumption-aws-prod': {
            cost: 0.00010458984375,
          },
          'eashardmap_eeb8bf9d-55d9-4fa3-ae6b-2d42c25df109': {
            cost: 1.71829752278646,
          },
          'wrk-management-test': {
            cost: 0.002622493489583333,
          },
          service: {
            cost: 260.28480026099976,
          },
          'gpm-swo-rfx-test': {
            cost: 0.000063916015625,
          },
          'eashardmap_2c8c5274-a7cf-477f-a877-977f00622a4c': {
            cost: 1.15536139322917,
          },
          'products-catalog-api-test': {
            cost: 0.00007166341145833333,
          },
          'renewal-manager-prod': {
            cost: 0.504124983723958,
          },
          grafana: {
            cost: 14.951999999999998,
          },
          'renewal-manager-test': {
            cost: 0.016226920572916668,
          },
          actiongroups: {
            cost: 0.0353,
          },
          dnszones: {
            cost: 0.4040828516129028,
          },
          vaults: {
            cost: 42.210897177169606,
          },
          'mpt-tasks-test': {
            cost: 0.000025179036458333332,
          },
          'eashardmap_7e23f6f5-a875-4963-af34-29ed1d4ae24d': {
            cost: 0.146398665364583,
          },
          nlpsql_analytics_scheduler: {
            cost: 0.0107778381347656,
          },
          'customer-support-test': {
            cost: 0.0018806803385416665,
          },
          'gpm-providers-mscsp-prod': {
            cost: 0.000224674479166667,
          },
          'mgmt-acm-test': {
            cost: 0.000017431640625,
          },
          'notificationhubquartzdb-test': {
            cost: 0.000050358072916666664,
          },
          'notificationhubquartzdb-prod': {
            cost: 0.000319580078125,
          },
          'mgmt-console-gus-test': {
            cost: 0.000032926432291666666,
          },
          'pyracloud-subscriptions': {
            cost: 0.00198527018229167,
          },
          'aly-consumption-salesforce-test': {
            cost: 0.000017431640625,
          },
          'pyc-simple-test': {
            cost: 0.000020579020182291663,
          },
          'cspshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.0006512654622395832,
          },
          'EUC1-Requests': {
            cost: 0,
          },
          'Tables-Requests-Tier1': {
            cost: 0.000005,
          },
          'fwk-iam-prod': {
            cost: 0.007315478515625,
          },
          trafficmanagerprofiles: {
            cost: 1.0633881483870986,
          },
          natgateways: {
            cost: 437.55608050101847,
          },
          'EUW1-BilledBytes': {
            cost: 0,
          },
          'fwk-iam-test': {
            cost: 0.006734423828125,
          },
          'mpt-module-spotlight-prod': {
            cost: 0.000726318359375,
          },
          'eashardmap_72016d53-1ba0-4f71-ab9c-0a90df48b048': {
            cost: 0.582745556640625,
          },
          'swo-web-header-test': {
            cost: 0.00005810546874999999,
          },
          'csp-price-calculation-service-test': {
            cost: 0.0004222330729166666,
          },
          virtualmachinescalesets: {
            cost: 997.6515519017307,
          },
          'eashardmap_14336735-a54e-41c0-8063-856b5379bd1c': {
            cost: 1.8773063476562468,
          },
          'cloudeashardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00001936848958333333,
          },
          'fwk-navision-scope-test': {
            cost: 0.0032708536783854166,
          },
          'user-rank-prod': {
            cost: 0.0747081380208334,
          },
          'mgmt-acm-prod': {
            cost: 0.000147200520833333,
          },
          networkwatchers: {
            cost: 0,
          },
          'swo-marketplace-address-book-test': {
            cost: 0.000017431640625,
          },
          'gpm-itemconfiguration-prod': {
            cost: 0.00001162109375,
          },
          'awsshardmap_a0b82f35-ecdf-4392-8eab-c2a7269ebc65': {
            cost: 0.15195161132812532,
          },
          'awsshardmap_d0bc9c1b-06cf-437f-a37f-a3ad2340ed65': {
            cost: 0.4548205566406253,
          },
          'USE1-EU-AWS-Out-Bytes': {
            cost: 0,
          },
          'swo-marketplace-customer-prod': {
            cost: 0.000100716145833333,
          },
          'swo-pyraproxy-test': {
            cost: 0.010106477864583333,
          },
          'swo-marketplace-order-fulfillment-prod': {
            cost: 0.0507841796875,
          },
          'mpt-helpdesk-prod': {
            cost: 0.000046484375,
          },
          'eu-west-3-KMS-Requests': {
            cost: 0,
          },
          'swo-portal-prod': {
            cost: 12.35330594075521,
          },
          Metric: {
            cost: 0.1698424704,
          },
          'gpm-swo-salesprice-prod': {
            cost: 0.06151044921875,
          },
          clusters: {
            cost: 0.090071784,
          },
          'swo-marketplace-pricemanager': {
            cost: 0.001144677734375,
          },
          signalr: {
            cost: 12.879999999999999,
          },
          'csp-subscriptions-prod': {
            cost: 0.00418746744791667,
          },
          'CW:Requests': {
            cost: 0,
          },
          'pyracloud-subscriptions_2020-09-29t07-59z': {
            cost: 0.000108463541666667,
          },
          'swo-marketplace-customer-test': {
            cost: 0.00005423177083333333,
          },
          'awsshardmap_54286192-fc00-402c-9575-08102633bf40': {
            cost: 0.000123958333333333,
          },
          'csp-license-assignments-prod': {
            cost: 0.000193684895833333,
          },
          'cloudawsshardmap_50b14c10-7229-4581-b736-0494d49d0bb8': {
            cost: 0.000013557942708333333,
          },
          'EUC1-CW:Requests': {
            cost: 0,
          },
          'customeractivation-migration-prod': {
            cost: 0.000730192057291667,
          },
          nltsql_analytics_scheduler: {
            cost: 0.000366064453125,
          },
          'di-reporting-test': {
            cost: 0.007603268229166666,
          },
          'EU-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          bastionhosts: {
            cost: 4.561339335395024,
          },
          'wrk-management-prod': {
            cost: 0.010046435546875,
          },
          'awsshardmap_d450009c-5886-4703-8e6d-740dbecc21c9': {
            cost: 1.2843393934461769,
          },
          'cloud-shard-map-prod': {
            cost: 0.000108463541666667,
          },
          scheduledqueryrules: {
            cost: 2.9579077060931893,
          },
          'billing-automation-test_2019-06-25t15-20z': {
            cost: 0.000032926432291666666,
          },
          'cloud-consumption-aws-test': {
            cost: 0.00015301106770833331,
          },
          'lic-esd-test': {
            cost: 0.0007650553385416668,
          },
          'mpt-public-catalog-prod': {
            cost: 0.002515966796875,
          },
          'cloud-shard-map-test': {
            cost: 0.000015494791666666664,
          },
          'lic-esd-prod': {
            cost: 0.00642099283854167,
          },
          'cloud-cost-allocation-prod': {
            cost: 0.000131705729166667,
          },
          'risk-profiler-reports-db-prod': {
            cost: 0.000451285807291667,
          },
          'marketplace-pim-prod': {
            cost: 0.0510998860677083,
          },
          'billing-automation-test': {
            cost: 0.0011524251302083332,
          },
          'EUN1-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'eashardmap_5aa598f6-990c-4d69-9f5e-1275d34d14e5': {
            cost: 0.213254333496094,
          },
          'trx-transactions-overview-prod': {
            cost: 1.89056407877604,
          },
          'swo-extension-nav-prod_2025-05-07t13-52z': {
            cost: 0.000476295572916667,
          },
          'pyc-search-test': {
            cost: 0.00001936848958333333,
          },
          'USE1-Reader-Enterprise-Month': {
            cost: 0,
          },
          'mpt-extensions-prod': {
            cost: 0.0000336527506510417,
          },
          'aly-consumption-virtual-prod': {
            cost: 0.340896392144097,
          },
          'aly-consumption-virtual-test': {
            cost: 0.00013880750868055554,
          },
          'eashardmap_3c7b4733-d8c6-4030-8605-e2c2b59f6f45': {
            cost: 0.0499145345052083,
          },
          GuardDuty: {
            cost: 0.042132,
          },
          privateendpoints: {
            cost: 1.44,
          },
          'eashardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.026095892333984374,
          },
          'pyra-dot-net-templates-test': {
            cost: 0.000017431640625,
          },
          'API Request': {
            cost: 0.16923016390000004,
          },
          'swo-digital-maturity-calculator-prod': {
            cost: 0.000141389973958333,
          },
          'cloud-consumption-azure-prod': {
            cost: 0.0220471516927083,
          },
          'swo-digital-maturity-calculator-test': {
            cost: 0.000020175509982638885,
          },
          elasticpools: {
            cost: 640.9381149785926,
          },
          'eashardmap_1d9e10e9-e0d9-49bc-8362-4635af48e3b0': {
            cost: 0.02240546875,
          },
          'cloud-consumption-azure-test': {
            cost: 0.007125667317708333,
          },
          images: {
            cost: 0.0660684,
          },
          'risk-product-lifecyle-db-prod': {
            cost: 0.000222737630208333,
          },
          'aly-consumption-office365-test': {
            cost: 0.023980126953124997,
          },
          'AWS Security Hub - Standards': {
            cost: 0.14872220279999998,
          },
          'swo-digital-cloud-compatibility': {
            cost: 0.000195621744791667,
          },
          containerapps: {
            cost: 14.429939999999998,
          },
          Serverless: {
            cost: 0.000260415,
          },
          workflows: {
            cost: 0.9486364123119455,
          },
          'swo-marketplace-checkout-prod': {
            cost: 0.000110400390625,
          },
          'pyracloud-subscriptions_2020-09-29t08-59z': {
            cost: 0.000110400390625,
          },
          'cloud-platform-test': {
            cost: 0.00013170572916666666,
          },
          'gpm-providers-adobevipm-prod': {
            cost: 0.0000716634114583333,
          },
          'USE1-CostDataStorage': {
            cost: 0,
          },
          'cloudofficeshardmap_2b05987e-f9b4-4348-bce0-712d90c48b24': {
            cost: 0.00007166341145833333,
          },
          'gpm-providers-adobevipm-test': {
            cost: 0.000023242187499999995,
          },
          'gpm-swo-rfx-prod': {
            cost: 0.0000677897135416667,
          },
          'eashardmap_2b898fc6-f2f6-4d45-a87a-59c44aa1b4d6': {
            cost: 0.0744776529947917,
          },
          Dollar: {
            cost: 0,
          },
          'awsshardmap_c445ff59-32a7-4ff7-b325-3d04eb3f4d82': {
            cost: 0.00000193684895833333,
          },
          'eashardmap_0c1e78e9-1066-4e18-9882-bd123c54a2bd': {
            cost: 1.851325455729167,
          },
          'pyracloud-subscriptions_2020-09-29t06-59z': {
            cost: 0.000122021484375,
          },
          'DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'nltdb-csp-import-test': {
            cost: 0.0040189615885416665,
          },
          'reportingenginequartzdb-test': {
            cost: 0.000022515869140624997,
          },
          'swo-pyraproxy-prod': {
            cost: 0.375982007514106,
          },
          extensiontopics: {
            cost: 0.002295,
          },
          resources: {
            cost: 0,
          },
          'Load Balancer': {
            cost: 20.46299441174139,
          },
          'swo-marketplace-contracts-test': {
            cost: 0.000021305338541666665,
          },
          searchservices: {
            cost: 106.46400000000001,
          },
          'nltdb-csp-import-prod': {
            cost: 16.600536800130158,
          },
          'mpt-procurement-test': {
            cost: 0.000015494791666666668,
          },
          pools: {
            cost: 0.68399316,
          },
          'aly-consumption-read-ea-test': {
            cost: 0.03129173177083334,
          },
          'mpt-procurement-prod': {
            cost: 0.0000259053548177083,
          },
          privatednszones: {
            cost: 0.0806451612903225,
          },
          'cloud-shard-map-coordinator-test': {
            cost: 0.000013557942708333333,
          },
          'int-pim-integration-prod': {
            cost: 0.00155916341145833,
          },
          'EUC1-PaidComplianceCheck': {
            cost: 0,
          },
          'mpt-cqr-test': {
            cost: 0.000030989583333333336,
          },
          'fwk-shard-map-coordinator-prod': {
            cost: 0.000145263671875,
          },
          'USE1-APS2-AWS-Out-Bytes': {
            cost: 0,
          },
          'swo-web-header-prod': {
            cost: 0.0024171875,
          },
          'swo-extension-nav-test': {
            cost: 0.0017470377604166666,
          },
          'eashardmap_7e3b2aa9-30f9-4316-8b88-e75303e4def2': {
            cost: 0.234806136067708,
          },
          'awsshardmap_099fd68f-cdc0-470c-83f7-68274cbee998': {
            cost: 0.320612418619792,
          },
          'eu-west-2-KMS-Requests': {
            cost: 0,
          },
          'cloud-pricelist-paas-test': {
            cost: 0.00005616861979166667,
          },
          'aly-consumption-slm-test': {
            cost: 0.0012141621907552085,
          },
          'csp-price-calculation-service-prod': {
            cost: 4.577450048828122,
          },
          redis: {
            cost: 48.647999999999996,
          },
          'gpm-rfx-test': {
            cost: 0.00003098958333333333,
          },
          'gpm-rfx-prod': {
            cost: 0.0000658528645833333,
          },
          'collab-prod': {
            cost: 0.0189462565104167,
          },
          'fwk-shard-map-prod': {
            cost: 0.0002237060546875,
          },
          'EU-AttachmentsSize-Bytes': {
            cost: 0,
          },
          accounts: {
            cost: 46.9040971833,
          },
          'USE1-PaidEventsAnalyzed': {
            cost: 0,
          },
          'trackit-test-integrationtest': {
            cost: 0.000029052734375,
          },
          'identitymanagementdb-qa': {
            cost: 0.000017431640625,
          },
          'IP Address': {
            cost: 68.14079999999986,
          },
          'int-creditcard-test': {
            cost: 0.0016133951822916667,
          },
          'dwh-prod': {
            cost: 4.32816596679687,
          },
          Alarm: {
            cost: 0.0473690856,
          },
          'EU-CW:Requests': {
            cost: 0,
          },
          'eashardmap_b18289b7-cf8f-4e13-971c-9e5b1c0c020e': {
            cost: 0.0662189290364583,
          },
          'csp-backoffice-prices-prod': {
            cost: 0.000269222005208333,
          },
          'swo-extension-nav-prod': {
            cost: 0.086507421875,
          },
          'aly-consumption-adobe-prod': {
            cost: 0.000939371744791667,
          },
          'swo-marketplace-order-manager-test': {
            cost: 0.0012047200520833336,
          },
          'csp-backoffice-configurations-test': {
            cost: 0.000017431640625,
          },
          'csp-contracts-prod': {
            cost: 0.00149137369791667,
          },
          profiles: {
            cost: 19.926666712825423,
          },
          'fwk-shard-map-coordinator-test': {
            cost: 0.000017431640625,
          },
          'spotlightkj-test': {
            cost: 0.000013557942708333333,
          },
          'awsshardmap-35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000013557942708333333,
          },
          sqlserverinstances: {
            cost: 0,
          },
          slots: {
            cost: 0.005558952,
          },
          'APS2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'aly-consumption-aws-prod': {
            cost: 58.78817120768231,
          },
          'EUC1-ConfigRuleEvaluations': {
            cost: 0,
          },
          'customer-solutions': {
            cost: 0.00108463541666667,
          },
          'cloudazureshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00010071614583333331,
          },
          'tellurium-test': {
            cost: 0.11857389322916664,
          },
          connections: {
            cost: 0.034125,
          },
          'swo-marketplace-contracts-prod': {
            cost: 0.000100716145833333,
          },
          'auth-api-prod': {
            cost: 0.00191554361979167,
          },
          'EU-VendedLog-Bytes': {
            cost: 0,
          },
          'eashardmap_c204d440-36ba-44c9-acfa-a9ba1b66db92': {
            cost: 0.03157451171875,
          },
          fogtest: {
            cost: 0.000011640625,
          },
          'auth-api-test': {
            cost: 0.00010652669270833332,
          },
          namespaces: {
            cost: 57.86122978064515,
          },
          'gpm-customeronboarding-prod': {
            cost: 0.0000658528645833333,
          },
          'int-cco-prod-demo': {
            cost: 0.0095060546875,
          },
          networksecuritygroups: {
            cost: 0.06684550894424314,
          },
          'eashardmap_c5ea8285-6825-4842-94d2-c309ed449796': {
            cost: 1.234191145833334,
          },
          'reportingenginedb-test': {
            cost: 0.000052294921874999994,
          },
          'emerald-storage-tcs': {
            cost: 13.382419645182322,
          },
          'awsshardmap_878761c0-f03f-4fb9-89cc-001df25f0b58': {
            cost: 11.982195996093749,
          },
          'aly-pricelist-prod': {
            cost: 3.2291320149739597,
          },
          'cloud-pricelist-paas': {
            cost: 0.00026728515625,
          },
          'mpt-chat-test': {
            cost: 0.000011621093749999999,
          },
          'cloud-pricelist-saas': {
            cost: 0.0000949055989583333,
          },
          Snapshot: {
            cost: 1.576441936,
          },
          'market-shop-test': {
            cost: 0.00073212890625,
          },
          USSalesTax: {
            cost: 0.011666666666666665,
          },
          'aly-consumption-office365-prod': {
            cost: 2.59637895507812,
          },
          'cspshardmap_35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000013557942708333333,
          },
          'eashardmap_1543ffee-9eff-4a72-a1b3-817f34a29ae2': {
            cost: 1.221695726182726,
          },
          'Management Tools - AWS CloudTrail Free Events Recorded': {
            cost: 0,
          },
          databases: {
            cost: 209.48170328612417,
          },
          flexibleservers: {
            cost: 64.10229784901935,
          },
          'csp-billing-automation-prod': {
            cost: 1.199260074869788,
          },
          'mpt-chat-prod': {
            cost: 0.0000430948893229167,
          },
          'aly-consumption-sync-meta-ea-test': {
            cost: 0.00001936848958333333,
          },
          'cloud-consumption-ea-prod': {
            cost: 0.000005810546875,
          },
          'eashardmap_e706a119-f41f-4e30-9271-42de678f981c': {
            cost: 0.394913818359375,
          },
          'EU-Lambda-GB-Second': {
            cost: 0,
          },
          machines: {
            cost: 0.14,
          },
          'Savings Plan': {
            cost: 4290.815960063799,
          },
          'trx-transactions-overview-test': {
            cost: 0.06323424479166666,
          },
          AWSSupportEnterprise: {
            cost: 537.9426666666667,
          },
          'mpt-public-catalog-test': {
            cost: 0.0007243815104166667,
          },
          'aly-invoice-automation-test': {
            cost: 0.000017431640625,
          },
          'fwk-proxy-identity-provider-test': {
            cost: 0.000029052734374999995,
          },
          'EUC1-Requests-Tier8': {
            cost: 0.0003600000000000001,
          },
          inboundendpoints: {
            cost: 6,
          },
          serverfarms: {
            cost: 254.34224124,
          },
          'aly-cloud-utilization-test': {
            cost: 0.0019283752441406248,
          },
          'EUC1-EC2SP:t3a.1yrNoUpfront': {
            cost: 0,
          },
          'USE1-EUW2-AWS-Out-Bytes': {
            cost: 0,
          },
          'billing-automation-prod': {
            cost: 0.0106662272135417,
          },
          workspaces: {
            cost: 907.9962052729576,
          },
          'customeractivation-migration-test': {
            cost: 0.000029052734374999995,
          },
          'di-reporting-prod': {
            cost: 1.41138697916667,
          },
          'pyc-search-prod': {
            cost: 0.003951171875,
          },
          'bot-prod': {
            cost: 0.000259537760416667,
          },
          'eashardmap_f67f6315-1523-4bbb-bab4-ff7aea5e2bca': {
            cost: 1.9872399576822881,
          },
          'APN2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'EUC1-Tables-Requests-Tier1': {
            cost: 0.0000216,
          },
          sites: {
            cost: 0.060976107999999994,
          },
          identitymanagementdb: {
            cost: 0.053173363579644126,
          },
          'swo-digital-recommendations-prod': {
            cost: 0.000635286458333333,
          },
          databaseaccounts: {
            cost: 0,
          },
        },
        '1762646400': {
          'USE1-EUW2-AWS-Out-Bytes': {
            cost: 0,
          },
          'billing-automation-prod': {
            cost: 0.0103490681966146,
          },
          'EUC1-EC2SP:t3a.1yrNoUpfront': {
            cost: 0,
          },
          'nltdb-csp-import-test': {
            cost: 0.004568703884548611,
          },
          'bot-prod': {
            cost: 0.000259537760416667,
          },
          'pyc-search-prod': {
            cost: 0.003951171875,
          },
          'di-reporting-prod': {
            cost: 1.3274289713541698,
          },
          workspaces: {
            cost: 895.8431814169815,
          },
          'customeractivation-migration-test': {
            cost: 0.000029052734375,
          },
          'APN2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'eashardmap_f67f6315-1523-4bbb-bab4-ff7aea5e2bca': {
            cost: 1.858477028401688,
          },
          'swo-digital-recommendations-prod': {
            cost: 0.000612286376953125,
          },
          databaseaccounts: {
            cost: 0.00000109709799289703,
          },
          'Management Tools - AWS CloudTrail Free Events Recorded': {
            cost: 0,
          },
          'EUC1-Tables-Requests-Tier1': {
            cost: 0.0000216,
          },
          machines: {
            cost: 0.46,
          },
          'EU-Lambda-GB-Second': {
            cost: 0,
          },
          pools: {
            cost: 0.68401368,
          },
          'aly-consumption-office365-prod': {
            cost: 2.59637895507812,
          },
          'APS3-Requests-Tier1': {
            cost: 0,
          },
          'EUN1-Requests-Tier1': {
            cost: 0,
          },
          'aly-invoice-automation-test': {
            cost: 0.000017431640625,
          },
          'Load Balancer': {
            cost: 20.605253107086753,
          },
          'mpt-public-catalog-test': {
            cost: 0.0007243815104166667,
          },
          'nltdb-csp-import-prod': {
            cost: 15.69472943725586,
          },
          'aly-cloud-utilization-test': {
            cost: 0.0019755859375,
          },
          serverfarms: {
            cost: 254.34224124,
          },
          'EUC1-Requests-Tier8': {
            cost: 0.0003600000000000001,
          },
          'fwk-proxy-identity-provider-test': {
            cost: 0.000035831705729166664,
          },
          inboundendpoints: {
            cost: 6,
          },
          'cspshardmap_35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000013557942708333333,
          },
          'eashardmap_1543ffee-9eff-4a72-a1b3-817f34a29ae2': {
            cost: 1.250483192952474,
          },
          flexibleservers: {
            cost: 64.09959733457464,
          },
          'csp-billing-automation-prod': {
            cost: 1.286699766710068,
          },
          databases: {
            cost: 210.54623561753158,
          },
          'eashardmap_e706a119-f41f-4e30-9271-42de678f981c': {
            cost: 0.381911509195964,
          },
          'cloud-consumption-ea-prod': {
            cost: 0.000005810546875,
          },
          'aly-consumption-sync-meta-ea-test': {
            cost: 0.00001936848958333333,
          },
          'aly-pricelist-prod': {
            cost: 3.2291320149739597,
          },
          redis: {
            cost: 48.647999999999996,
          },
          'awsshardmap_878761c0-f03f-4fb9-89cc-001df25f0b58': {
            cost: 11.22455878906255,
          },
          'trx-transactions-overview-test': {
            cost: 0.06323424479166666,
          },
          'trackit-test-integrationtest': {
            cost: 0.000029052734375,
          },
          Snapshot: {
            cost: 1.576441936,
          },
          USSalesTax: {
            cost: 0.011666666666666665,
          },
          'market-shop-test': {
            cost: 0.00073212890625,
          },
          namespaces: {
            cost: 57.80141538064517,
          },
          'gpm-customeronboarding-prod': {
            cost: 0.0000658528645833333,
          },
          'fwk-shard-map-coordinator-test': {
            cost: 0.000017431640625,
          },
          'eashardmap_c204d440-36ba-44c9-acfa-a9ba1b66db92': {
            cost: 0.03157451171875,
          },
          fogtest: {
            cost: 0.000011640625,
          },
          'int-cco-prod-demo': {
            cost: 0.0095060546875,
          },
          'eashardmap_c5ea8285-6825-4842-94d2-c309ed449796': {
            cost: 1.234191145833334,
          },
          'risk-profiler-reports-db-prod': {
            cost: 0.000451285807291667,
          },
          'swo-extension-nav-prod': {
            cost: 0.086507421875,
          },
          identitymanagementdb: {
            cost: 0.05349383138020836,
          },
          'emerald-storage-tcs': {
            cost: 13.780619569905618,
          },
          'EUC1-ConfigRuleEvaluations': {
            cost: 0,
          },
          'EU-CW:Requests': {
            cost: 0,
          },
          'Savings Plan': {
            cost: 4290.8159779753,
          },
          'aly-consumption-aws-prod': {
            cost: 55.260001092529315,
          },
          'customer-solutions': {
            cost: 0.00105437215169271,
          },
          'cloudazureshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00010652669270833332,
          },
          connections: {
            cost: 0.0355,
          },
          AWSSupportEnterprise: {
            cost: 537.9426666666667,
          },
          'EU-VendedLog-Bytes': {
            cost: 0,
          },
          'reportingenginedb-test': {
            cost: 0.000052294921874999994,
          },
          'csp-backoffice-prices-prod': {
            cost: 0.000269222005208333,
          },
          'eashardmap_b18289b7-cf8f-4e13-971c-9e5b1c0c020e': {
            cost: 0.0642106587727865,
          },
          'aly-consumption-adobe-prod': {
            cost: 0.000939371744791667,
          },
          'csp-backoffice-configurations-test': {
            cost: 0.000017431640625,
          },
          'swo-marketplace-order-manager-test': {
            cost: 0.0012047200520833334,
          },
          'APS2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'spotlightkj-test': {
            cost: 0.000013557942708333333,
          },
          sqlserverinstances: {
            cost: 0,
          },
          'awsshardmap-35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000013557942708333333,
          },
          'csp-contracts-prod': {
            cost: 0.00150130004882812,
          },
          profiles: {
            cost: 20.374120573307476,
          },
          'swo-marketplace-checkout-prod': {
            cost: 0.000110400390625,
          },
          accounts: {
            cost: 46.9361342499,
          },
          'cloud-pricelist-paas': {
            cost: 0.000261474609375,
          },
          'USE1-PaidEventsAnalyzed': {
            cost: 0,
          },
          'identitymanagementdb-qa': {
            cost: 0.000017431640625,
          },
          containerapps: {
            cost: 14.900338000000001,
          },
          'cloud-pricelist-saas': {
            cost: 0.0000949055989583333,
          },
          'fwk-shard-map-prod': {
            cost: 0.00021934814453125,
          },
          'collab-prod': {
            cost: 0.0189462565104167,
          },
          'EU-AttachmentsSize-Bytes': {
            cost: 0,
          },
          'tellurium-test': {
            cost: 0.11857389322916664,
          },
          'IP Address': {
            cost: 68.14079999999986,
          },
          'swo-marketplace-contracts-prod': {
            cost: 0.000100716145833333,
          },
          'risk-product-lifecyle-db-prod': {
            cost: 0.000215474446614583,
          },
          'int-creditcard-test': {
            cost: 0.0019659016927083333,
          },
          'dwh-prod': {
            cost: 4.19940545857747,
          },
          'csp-price-calculation-service-prod': {
            cost: 4.466914078776042,
          },
          'aly-consumption-slm-test': {
            cost: 0.0012453938802083335,
          },
          'cloud-pricelist-paas-test': {
            cost: 0.00005616861979166667,
          },
          'AWS Security Hub - Standards': {
            cost: 0.14872220279999998,
          },
          'swo-marketplace-contracts-test': {
            cost: 0.000021305338541666665,
          },
          searchservices: {
            cost: 106.46400000000001,
          },
          'mpt-chat-test': {
            cost: 0.000011621093749999999,
          },
          'USE1-APS2-AWS-Out-Bytes': {
            cost: 0,
          },
          'mpt-chat-prod': {
            cost: 0.0000409159342447917,
          },
          Dollar: {
            cost: 0,
          },
          'swo-web-header-prod': {
            cost: 0.0024171875,
          },
          'DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'cloud-consumption-azure-prod': {
            cost: 0.0220471516927083,
          },
          'swo-digital-maturity-calculator-prod': {
            cost: 0.0001365478515625,
          },
          'cloud-consumption-azure-test': {
            cost: 0.007125667317708333,
          },
          'eashardmap_7e3b2aa9-30f9-4316-8b88-e75303e4def2': {
            cost: 0.225867578125,
          },
          elasticpools: {
            cost: 647.2936414390542,
          },
          'swo-digital-maturity-calculator-test': {
            cost: 0.000023242187499999998,
          },
          'awsshardmap_099fd68f-cdc0-470c-83f7-68274cbee998': {
            cost: 0.320612418619792,
          },
          'USE1-Reader-Enterprise-Month': {
            cost: 0,
          },
          extensiontopics: {
            cost: 0.002154,
          },
          resources: {
            cost: 0,
          },
          'aly-consumption-virtual-prod': {
            cost: 0.332632503255208,
          },
          'aly-consumption-virtual-test': {
            cost: 0.00015301106770833331,
          },
          'EUC1-PaidComplianceCheck': {
            cost: 0,
          },
          'int-pim-integration-prod': {
            cost: 0.00155916341145833,
          },
          privatednszones: {
            cost: 0.0806451612903225,
          },
          'cloud-shard-map-coordinator-test': {
            cost: 0.000013557942708333333,
          },
          'eu-west-2-KMS-Requests': {
            cost: 0,
          },
          'cloudofficeshardmap_2b05987e-f9b4-4348-bce0-712d90c48b24': {
            cost: 0.00007166341145833333,
          },
          'eashardmap_2b898fc6-f2f6-4d45-a87a-59c44aa1b4d6': {
            cost: 0.0738108120388455,
          },
          'swo-extension-nav-test': {
            cost: 0.0017470377604166666,
          },
          'gpm-swo-rfx-prod': {
            cost: 0.0000677897135416667,
          },
          bastionhosts: {
            cost: 4.561252031455748,
          },
          sites: {
            cost: 0.07443472899999995,
          },
          'marketplace-pim-prod': {
            cost: 0.0510998860677083,
          },
          'eashardmap_0c1e78e9-1066-4e18-9882-bd123c54a2bd': {
            cost: 1.851325455729167,
          },
          'pyracloud-subscriptions_2020-09-29t06-59z': {
            cost: 0.000122021484375,
          },
          'awsshardmap_c445ff59-32a7-4ff7-b325-3d04eb3f4d82': {
            cost: 0.00000193684895833333,
          },
          'lic-esd-test': {
            cost: 0.0007650553385416668,
          },
          'cloud-shard-map-prod': {
            cost: 0.000108463541666667,
          },
          'fwk-shard-map-coordinator-prod': {
            cost: 0.000140421549479167,
          },
          'lic-esd-prod': {
            cost: 0.00638837483723959,
          },
          'swo-pyraproxy-prod': {
            cost: 0.375638781738281,
          },
          'cloud-shard-map-test': {
            cost: 0.000015494791666666668,
          },
          'swo-digital-cloud-compatibility': {
            cost: 0.00019077962239583298,
          },
          Alarm: {
            cost: 0.0473690856,
          },
          'pyracloud-subscriptions_2020-09-29t08-59z': {
            cost: 0.000110400390625,
          },
          'trx-transactions-overview-prod': {
            cost: 1.82662869466146,
          },
          Serverless: {
            cost: 0.0001929342,
          },
          workflows: {
            cost: 0.9505813109500753,
          },
          'gpm-rfx-test': {
            cost: 0.000030989583333333336,
          },
          'gpm-rfx-prod': {
            cost: 0.0000658528645833333,
          },
          'cloud-platform-test': {
            cost: 0.00013170572916666666,
          },
          privateendpoints: {
            cost: 1.44,
          },
          GuardDuty: {
            cost: 0.042224,
          },
          slots: {
            cost: 0.005777495999999998,
          },
          'mpt-cqr-test': {
            cost: 0.000030989583333333336,
          },
          'API Request': {
            cost: 0.16945290900000018,
          },
          'pyra-dot-net-templates-test': {
            cost: 0.000017431640625,
          },
          'eashardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.026765315755208335,
          },
          'eashardmap_1d9e10e9-e0d9-49bc-8362-4635af48e3b0': {
            cost: 0.0218667826334635,
          },
          'eashardmap_5aa598f6-990c-4d69-9f5e-1275d34d14e5': {
            cost: 0.216638977050781,
          },
          'EUN1-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'billing-automation-test': {
            cost: 0.0011524251302083332,
          },
          'auth-api-prod': {
            cost: 0.00191554361979167,
          },
          'pyc-search-test': {
            cost: 0.000021466742621527776,
          },
          'swo-extension-nav-prod_2025-05-07t13-52z': {
            cost: 0.000476295572916667,
          },
          'mpt-extensions-prod': {
            cost: 0.0000338948567708333,
          },
          images: {
            cost: 0.0660684,
          },
          'eashardmap_3c7b4733-d8c6-4030-8605-e2c2b59f6f45': {
            cost: 0.0499145345052083,
          },
          'mpt-procurement-test': {
            cost: 0.000015494791666666668,
          },
          'aly-consumption-read-ea-test': {
            cost: 0.03129173177083333,
          },
          'aly-consumption-office365-test': {
            cost: 0.02722822265625,
          },
          'mpt-procurement-prod': {
            cost: 0.0000266316731770833,
          },
          'EU-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          nltsql_analytics_scheduler: {
            cost: 0.000366064453125,
          },
          'di-reporting-test': {
            cost: 0.00807859375,
          },
          'EUC1-CW:Requests': {
            cost: 0,
          },
          'customeractivation-migration-prod': {
            cost: 0.000730192057291667,
          },
          'awsshardmap_d450009c-5886-4703-8e6d-740dbecc21c9': {
            cost: 1.290359523518877,
          },
          'gpm-providers-adobevipm-prod': {
            cost: 0.0000716634114583333,
          },
          'USE1-CostDataStorage': {
            cost: 0,
          },
          'wrk-management-prod': {
            cost: 0.010046435546875,
          },
          'gpm-providers-adobevipm-test': {
            cost: 0.000023242187499999998,
          },
          'auth-api-test': {
            cost: 0.00010652669270833334,
          },
          'reportingenginequartzdb-test': {
            cost: 0.000025179036458333332,
          },
          'mpt-public-catalog-prod': {
            cost: 0.002515966796875,
          },
          scheduledqueryrules: {
            cost: 2.9605958781362,
          },
          'billing-automation-test_2019-06-25t15-20z': {
            cost: 0.000032926432291666666,
          },
          'cloud-consumption-aws-test': {
            cost: 0.00015301106770833331,
          },
          networksecuritygroups: {
            cost: 0.06593574248254304,
          },
          'cloud-cost-allocation-prod': {
            cost: 0.000131705729166667,
          },
          'renewal-manager-prod': {
            cost: 0.487411187744141,
          },
          'notifications-management-test': {
            cost: 0.0020937337239583334,
          },
          'renewal-manager-test': {
            cost: 0.016226920572916668,
          },
          signalr: {
            cost: 12.879999999999999,
          },
          clusters: {
            cost: 0.090007452,
          },
          'csp-backoffice-customers-prod': {
            cost: 0.00228620808919271,
          },
          'pyracloud-subscriptions_2020-09-29t07-59z': {
            cost: 0.000108463541666667,
          },
          'CW:Requests': {
            cost: 0,
          },
          'user-rank-prod': {
            cost: 0.0747081380208334,
          },
          'awsshardmap_54286192-fc00-402c-9575-08102633bf40': {
            cost: 0.000123958333333333,
          },
          actiongroups: {
            cost: 0.03536,
          },
          trafficmanagerprofiles: {
            cost: 1.0533599083870988,
          },
          'EUW3-Requests-Tier1': {
            cost: 0,
          },
          'awsshardmap_d0bc9c1b-06cf-437f-a37f-a3ad2340ed65': {
            cost: 0.4251867675781253,
          },
          'swo-pyraproxy-test': {
            cost: 0.010106477864583333,
          },
          'mpt-helpdesk-prod': {
            cost: 0.000046484375,
          },
          'gpm-swo-salesprice-prod': {
            cost: 0.06151044921875,
          },
          'notifications-management-prod': {
            cost: 0.00732492065429688,
          },
          'swo-portal-prod': {
            cost: 11.60849067382813,
          },
          'csp-backoffice-customers-test': {
            cost: 0.0005511949327256944,
          },
          'mpt-module-spotlight-prod': {
            cost: 0.000712599012586806,
          },
          'eashardmap_72016d53-1ba0-4f71-ab9c-0a90df48b048': {
            cost: 0.582745556640625,
          },
          'swo-web-header-test': {
            cost: 0.00005810546875,
          },
          natgateways: {
            cost: 284.52266982677855,
          },
          'EUW1-BilledBytes': {
            cost: 0,
          },
          virtualmachinescalesets: {
            cost: 953.853049529093,
          },
          'csp-price-calculation-service-test': {
            cost: 0.0004222330729166666,
          },
          'fwk-navision-scope-test': {
            cost: 0.003354622395833333,
          },
          'eashardmap_14336735-a54e-41c0-8063-856b5379bd1c': {
            cost: 1.788690665690107,
          },
          'awsshardmap_a0b82f35-ecdf-4392-8eab-c2a7269ebc65': {
            cost: 0.14502011311848934,
          },
          'gpm-itemconfiguration-prod': {
            cost: 0.00001162109375,
          },
          'swo-digital-assessments-test': {
            cost: 0.000098779296875,
          },
          networkwatchers: {
            cost: 0,
          },
          'swo-marketplace-address-book-test': {
            cost: 0.000017431640625,
          },
          'swo-digital-assessments-prod': {
            cost: 0.00107882486979167,
          },
          'csp-subscriptions-prod': {
            cost: 0.00415026380750868,
          },
          'eu-west-3-KMS-Requests': {
            cost: 0,
          },
          Metric: {
            cost: 0.1685924704,
          },
          'pyracloud-subscriptions': {
            cost: 0.0019525858561197898,
          },
          backupvaults: {
            cost: 0.1673716512,
          },
          'swo-marketplace-order-fulfillment-prod': {
            cost: 0.0507841796875,
          },
          'pyc-simple-test': {
            cost: 0.000021305338541666665,
          },
          'aly-consumption-salesforce-test': {
            cost: 0.000017431640625,
          },
          'cspshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.000668212890625,
          },
          'gpm-swo-rfx-test': {
            cost: 0.00007747395833333334,
          },
          'wrk-management-test': {
            cost: 0.0031953165690104166,
          },
          service: {
            cost: 260.28480034799975,
          },
          'eashardmap_eeb8bf9d-55d9-4fa3-ae6b-2d42c25df109': {
            cost: 1.718206459147137,
          },
          grafana: {
            cost: 14.951999999999998,
          },
          'gpm-authorization-prod': {
            cost: 0.0000716634114583334,
          },
          'swo-marketplace-pricemanager': {
            cost: 0.001144677734375,
          },
          'eashardmap_2c8c5274-a7cf-477f-a877-977f00622a4c': {
            cost: 1.11045555013021,
          },
          'products-catalog-api-test': {
            cost: 0.00007166341145833333,
          },
          'eashardmap_7e23f6f5-a875-4963-af34-29ed1d4ae24d': {
            cost: 0.145248096381293,
          },
          'csp-license-assignments-prod': {
            cost: 0.000193684895833333,
          },
          dnszones: {
            cost: 0.40115845161290264,
          },
          'gpm-providers-mscsp-prod': {
            cost: 0.000224674479166667,
          },
          nlpsql_analytics_scheduler: {
            cost: 0.010870322672526,
          },
          'exp-global-search-prod': {
            cost: 0.000698960367838542,
          },
          sonarqube: {
            cost: 0.0500675455729167,
          },
          'Business Analytics': {
            cost: 3.6000000288,
          },
          'Global-SoftwareUsage-Contracts': {
            cost: 3139.2650273224044,
          },
          applicationgateways: {
            cost: 434.4380377947259,
          },
          'mpt-module-billing-prod': {
            cost: 0.115242513020833,
          },
          'lic-mgr-gus-prod': {
            cost: 0.000132351345486111,
          },
          'fwk-feature-toggle-prod': {
            cost: 0.000199495442708333,
          },
          'cloud-cost-allocation-test': {
            cost: 0.00011446614583333334,
          },
          'eashardmap_37dd1f9c-8205-440f-87f3-da1fb808b40c': {
            cost: 0.199978202311198,
          },
          'mpt-currency-test': {
            cost: 0.000030989583333333336,
          },
          'Requests-Tier8': {
            cost: 0.00009,
          },
          'cloud-shard-map-coordinator-prod': {
            cost: 0.000102652994791667,
          },
          'int-pim-integration-test': {
            cost: 0.00006197916666666667,
          },
          'cloud-consumption-aws-prod': {
            cost: 0.00010458984375,
          },
          'mpt-extensions-test': {
            cost: 0.000029052734375,
          },
          'swo-digital-recommendations-prod-restored': {
            cost: 0.000017431640625,
          },
          'aly-consumption-ea-test': {
            cost: 0.12886705403645832,
          },
          'swo-platform-performace_2024-06-28t10-29z': {
            cost: 0.000517037760416667,
          },
          'ap-southeast-1-KMS-Requests': {
            cost: 0,
          },
          'fwk-iam-prod': {
            cost: 0.007315478515625,
          },
          vaults: {
            cost: 35.851755591692395,
          },
          'EU-Requests-Tier2': {
            cost: 0,
          },
          'fwk-iam-test': {
            cost: 0.006734423828125,
          },
          'mpt-tasks-test': {
            cost: 0.000025179036458333332,
          },
          'eashardmap_0da2a725-c790-4d1f-b155-080817a86035': {
            cost: 0.04363720703125,
          },
          'cloudeashardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.000021466742621527776,
          },
          'pyra-dot-net-templates-prod': {
            cost: 0.000140421549479167,
          },
          'csp-orders-test': {
            cost: 0.00005423177083333333,
          },
          'swo-platform-prod_2025-05-07t12-43z': {
            cost: 0.00116503255208333,
          },
          'swo-platform-test': {
            cost: 0.005728230794270832,
          },
          'awsshardmap_ca4ef284-5503-4019-a176-7b079926439a': {
            cost: 0.263227457682292,
          },
          'int-config-test': {
            cost: 0.000050358072916666664,
          },
          'gpp-identity-prod': {
            cost: 0.000166326904296875,
          },
          'notificationhubquartzdb-test': {
            cost: 0.00005326334635416666,
          },
          'aly-consumption-slm-prod': {
            cost: 0.10347421875,
          },
          'notificationhubquartzdb-prod': {
            cost: 0.000311106363932292,
          },
          Bucket: {
            cost: 506.3017234097256,
          },
          'cloud-platform-prod': {
            cost: 0.00695328776041666,
          },
          publicipprefixes: {
            cost: 26.208000000000006,
          },
          partnertopics: {
            cost: 0.022203599999999997,
          },
          'igrt-mgr-tracking-test': {
            cost: 0.00011427408854166667,
          },
          'awsshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00015494791666666665,
          },
          'Marketplace Purchase': {
            cost: 0,
          },
          'eashardmap_c7242070-60da-4c92-bc34-8b1a34c50a01': {
            cost: 8.868306252034511,
          },
          staticsites: {
            cost: 7.121235319013697,
          },
          'gpp-identity-test': {
            cost: 0.000035831705729166664,
          },
          'sub-mgr-prod': {
            cost: 0.0150142110188802,
          },
          'aly-consumption-ea-prod': {
            cost: 28.59196478678389,
          },
          chtvs00471_cpx_full_202109262000: {
            cost: 0.00001936848958333333,
          },
          'sub-mgr-test': {
            cost: 0.00049970703125,
          },
          'issue-detection-engine-prod': {
            cost: 0.000218863932291667,
          },
          'mpt-catalog-prod': {
            cost: 0.0000726318359375,
          },
          Volume: {
            cost: 138.64710649339992,
          },
          'swo-platform-prod': {
            cost: 0.0487613830566406,
          },
          factories: {
            cost: 7.876639166666667,
          },
          'Tables-Requests-Tier1': {
            cost: 0.000005,
          },
          'EUC1-Requests': {
            cost: 0,
          },
          'igrt-mgr-tracking-prod': {
            cost: 0.00098779296875,
          },
          'dwh-test': {
            cost: 0.370300341796875,
          },
          metricalerts: {
            cost: 2.27715053763439,
          },
          'eashardmap_54286192-fc00-402c-9575-08102633bf40': {
            cost: 0.00016124267578125,
          },
          'mgmt-acm-test': {
            cost: 0.000017431640625,
          },
          'Management Tools - AWS Config Rules': {
            cost: 0.035,
          },
          'csp-orders-prod': {
            cost: 0.00213126017252604,
          },
          'awsshardmap-26517465236498': {
            cost: 0.000013557942708333333,
          },
          Storage: {
            cost: 1.1501626667,
          },
          'mgmt-console-gus-test': {
            cost: 0.00003817206488715277,
          },
          'eashardmap_ee859c36-53ff-4440-bd50-4d8da7e70412': {
            cost: 0.008256787109375,
          },
          'eashardmap_35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000013557942708333333,
          },
          'gpm-subscriptions-prod': {
            cost: 0.0000154947916666667,
          },
          'mgmt-acm-prod': {
            cost: 0.0001423583984375,
          },
          'aly-pricelist-test': {
            cost: 0.10966075642903644,
          },
          'int-config-prod': {
            cost: 0.00182063802083333,
          },
          'trackit-prod': {
            cost: 0.00808150227864583,
          },
          'mpt-tasks-prod': {
            cost: 0.0000532633463541667,
          },
          'trackit-test': {
            cost: 0.0022264078776041665,
          },
          'csp-billing-automation-test': {
            cost: 0.009934098307291665,
          },
          'swo-platform-prod_2024-06-26t22-03z': {
            cost: 0.000489876302083333,
          },
          'cspshardmap_72ce77e7-2041-4f5d-3a72-08da26e48a74': {
            cost: 0.457540861002604,
          },
          'eashardmap_7f75776e-89af-413b-88a2-28593e2ac6b2': {
            cost: 2.06631496378581,
          },
          'cspshardmap_986dcd1f-43af-4ee7-9dbd-11411d7c399d': {
            cost: 0.298710530598958,
          },
          'aly-consumption-aws-test': {
            cost: 0.017861621093750002,
          },
          'mpt-currency-prod': {
            cost: 0.0000445475260416667,
          },
          'USE1-EU-AWS-Out-Bytes': {
            cost: 0,
          },
          'Data Payload': {
            cost: 2.5747310762999995,
          },
          'aly-invoice-automation-prod': {
            cost: 0.0001656005859375,
          },
          'swo-marketplace-customer-prod': {
            cost: 0.000100716145833333,
          },
          'exp-global-search-test': {
            cost: 0.00001936848958333333,
          },
          'swo-marketplace-customer-test': {
            cost: 0.00005423177083333333,
          },
          'products-catalog-api-prod': {
            cost: 0.000232421875,
          },
          'cloudawsshardmap_50b14c10-7229-4581-b736-0494d49d0bb8': {
            cost: 0.000013557942708333333,
          },
          configurationstores: {
            cost: 8.4,
          },
          'mpt-module-billing-test': {
            cost: 0.007999186197916666,
          },
          'gpm-authorization-test': {
            cost: 0.000021305338541666665,
          },
          'aly-cloud-utilization-prod': {
            cost: 2.37481747639974,
          },
          'USE2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          virtualnetworkgateways: {
            cost: 24.72,
          },
          'Metric Streams': {
            cost: 0.127956,
          },
          'fwk-feature-toggle-test': {
            cost: 0.000030989583333333336,
          },
          'mpt-module-billing-prod-debug-1': {
            cost: 0.00229322916666667,
          },
          'cloud-workspace-test': {
            cost: 0.000022757975260416664,
          },
          'cloud-workspace-prod': {
            cost: 0.000108463541666667,
          },
          'aly-consumption-adobe-test': {
            cost: 0.0003098958333333333,
          },
          managedclusters: {
            cost: 4.84500102283634,
          },
          'awsshardmap_b4fd484f-d43c-4162-a1ea-83e4b103b46e': {
            cost: 2.903698052978517,
          },
          'collab-test': {
            cost: 0.0024249348958333334,
          },
          'csp-backoffice-prices-test': {
            cost: 0.000030989583333333336,
          },
          'int-cco-test': {
            cost: 0.0008677083333333334,
          },
          'cloud-consumption-office-prod': {
            cost: 0.000098779296875,
          },
          'EUC1-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'fwk-navision-scope-prod': {
            cost: 0.246037923177083,
          },
          'csp-contracts-test': {
            cost: 0.00005616861979166667,
          },
          'swo-marketplace-order-fulfillment-test': {
            cost: 0.006819241672092014,
          },
          'int-cco-prod': {
            cost: 0.407580568440755,
          },
          'market-shop-prod': {
            cost: 0.0732167643229167,
          },
          'swo-marketplace-order-manager-prod': {
            cost: 0.000110400390625,
          },
          'int-creditcard-prod': {
            cost: 0.00319120076497396,
          },
          'csp-backoffice-configurations-prod': {
            cost: 0.000154947916666667,
          },
          'csp-subscriptions-test': {
            cost: 0.00018279012044270833,
          },
          'mpt-module-spotlight-test': {
            cost: 0.00007747395833333333,
          },
          'eashardmap_f60ce9fd-154d-427d-bf91-2e4b42dd86c4': {
            cost: 0.242785953776042,
          },
          'cloud-consumption-office-test': {
            cost: 0.000023242187499999998,
          },
          enterprisearchitect: {
            cost: 0.00347083333333333,
          },
          'fwk-shard-map-test': {
            cost: 0.000039059787326388885,
          },
          nltapp0127sdb: {
            cost: 0.00012783203125,
          },
          servers: {
            cost: 2.4193548387096793,
          },
          'APN3-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          components: {
            cost: 0.193178297539387,
          },
          pricings: {
            cost: 42.802400000000006,
          },
          'swo-marketplace-address-book-prod': {
            cost: 0.0000716634114583334,
          },
          'Storage Snapshot': {
            cost: 0.0000085762,
          },
          Instance: {
            cost: 337.4516178433181,
          },
          nlpsql_analytics_scheduler_kj: {
            cost: 0.00137903645833333,
          },
          'eashardmap_e3c55fc0-e7ce-48fd-a244-8afd1041d843': {
            cost: 0.06230068359375,
          },
          'AWS Glue': {
            cost: 0.15162928,
          },
          'EUC1-Crawler-DPU-Hour': {
            cost: 0,
          },
          'awsshardmap_c6469e97-302a-408a-8589-2122a0bb725d': {
            cost: 0.00194701741536458,
          },
          'eashardmap_ac7850af-21d1-4ebd-8c22-b475e5d40978': {
            cost: 0.766044099934896,
          },
          'Sending Email': {
            cost: 0.2588289317,
          },
          ssisdb: {
            cost: 0.00001936848958333333,
          },
          'customer-support-prod': {
            cost: 0.218858121744792,
          },
          'fwk-proxy-identity-provider-prod': {
            cost: 0.000409159342447917,
          },
          'Data Transfer': {
            cost: 0.026013753599999963,
          },
          azurefirewalls: {
            cost: 60.07295622907486,
          },
          'mpt-helpdesk-test': {
            cost: 0.000012589518229166668,
          },
          'pyracloud-subscriptions-restore': {
            cost: 0.00015882161458333332,
          },
          jobagents: {
            cost: 0.912,
          },
          'csp-backoffice-invoices-test': {
            cost: 0.01620706787109375,
          },
          'bot-test': {
            cost: 0.000023242187499999998,
          },
          'csp-backoffice-invoices-prod': {
            cost: 0.823848388671875,
          },
          'customer-support-test': {
            cost: 0.0021345689561631945,
          },
          'aly-consumption-ea-integrationtest': {
            cost: 0.000026389567057291667,
          },
          'gpm-customeronboarding-test': {
            cost: 0.000017431640625,
          },
          registries: {
            cost: 22.692527883733117,
          },
          'awsshardmap_d7275497-ac0b-411b-9396-d98d1c26f634': {
            cost: 0.881651224772135,
          },
          'swo-digital-recommendations-test': {
            cost: 0.000017431640625,
          },
          'customer-solutions-test': {
            cost: 0.00025711669921875,
          },
          'user-rank-test': {
            cost: 0.000749560546875,
          },
          'Kinesis Firehose': {
            cost: 0.0005689574000000001,
          },
          'swo-portal-test': {
            cost: 0.12879851888020832,
          },
          samdatawarehouse: {
            cost: 0.0760779744466146,
          },
          'gpm-swo-salesprice-test': {
            cost: 0.019289078776041663,
          },
        },
        '1762732800': {
          'emerald-storage-tcs': {
            cost: 14.968203108723946,
          },
          'swo-digital-assessments-prod': {
            cost: 0.00107882486979167,
          },
          'EUC1-Requests': {
            cost: 0,
          },
          'reportingenginedb-test': {
            cost: 0.000060203721788194446,
          },
          'Tables-Requests-Tier1': {
            cost: 0.000005,
          },
          'swo-digital-assessments-test': {
            cost: 0.000098779296875,
          },
          'mgmt-acm-test': {
            cost: 0.000017431640625,
          },
          'gpm-customeronboarding-prod': {
            cost: 0.0000658528645833333,
          },
          namespaces: {
            cost: 57.801106580645154,
          },
          fogtest: {
            cost: 0.000011640625,
          },
          'eashardmap_c204d440-36ba-44c9-acfa-a9ba1b66db92': {
            cost: 0.03157451171875,
          },
          'eashardmap_c5ea8285-6825-4842-94d2-c309ed449796': {
            cost: 1.234191145833334,
          },
          'int-cco-prod-demo': {
            cost: 0.0095060546875,
          },
          'mgmt-console-gus-test': {
            cost: 0.00004261067708333333,
          },
          'swo-marketplace-contracts-prod': {
            cost: 0.000100716145833333,
          },
          connections: {
            cost: 0.035625,
          },
          'tellurium-test': {
            cost: 0.11857389322916664,
          },
          'mgmt-acm-prod': {
            cost: 0.000139453125,
          },
          'EU-VendedLog-Bytes': {
            cost: 0,
          },
          'aly-consumption-aws-prod': {
            cost: 53.143099023437514,
          },
          'EUC1-ConfigRuleEvaluations': {
            cost: 0,
          },
          'cloudazureshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00012395833333333334,
          },
          'customer-solutions': {
            cost: 0.00103621419270833,
          },
          backupvaults: {
            cost: 0.16737165119999997,
          },
          'csp-backoffice-configurations-test': {
            cost: 0.000017431640625,
          },
          'swo-marketplace-order-manager-test': {
            cost: 0.0012047200520833334,
          },
          'spotlightkj-test': {
            cost: 0.000013557942708333333,
          },
          'awsshardmap-35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000013557942708333333,
          },
          'fwk-shard-map-coordinator-test': {
            cost: 0.000017431640625,
          },
          sqlserverinstances: {
            cost: 0,
          },
          'APS2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          actiongroups: {
            cost: 0.03976,
          },
          profiles: {
            cost: 21.310768642988013,
          },
          'csp-contracts-prod': {
            cost: 0.00157078450520833,
          },
          'renewal-manager-test': {
            cost: 0.016226920572916668,
          },
          'csp-backoffice-prices-prod': {
            cost: 0.000269222005208333,
          },
          'renewal-manager-prod': {
            cost: 0.47738291015625,
          },
          'eashardmap_b18289b7-cf8f-4e13-971c-9e5b1c0c020e': {
            cost: 0.0630056966145833,
          },
          'swo-marketplace-customer-prod': {
            cost: 0.000100716145833333,
          },
          'aly-consumption-adobe-prod': {
            cost: 0.000939371744791667,
          },
          'USE1-EU-AWS-Out-Bytes': {
            cost: 0,
          },
          'swo-extension-nav-prod': {
            cost: 0.086507421875,
          },
          'swo-marketplace-customer-test': {
            cost: 0.00005423177083333333,
          },
          'int-creditcard-test': {
            cost: 0.002016259765625,
          },
          'EU-CW:Requests': {
            cost: 0,
          },
          'dwh-prod': {
            cost: 4.12214915364583,
          },
          'cloudawsshardmap_50b14c10-7229-4581-b736-0494d49d0bb8': {
            cost: 0.000013557942708333333,
          },
          'identitymanagementdb-qa': {
            cost: 0.000017431640625,
          },
          'USE1-PaidEventsAnalyzed': {
            cost: 0,
          },
          accounts: {
            cost: 46.87457236899999,
          },
          'EU-AttachmentsSize-Bytes': {
            cost: 0,
          },
          'collab-prod': {
            cost: 0.0191121799045139,
          },
          'fwk-shard-map-prod': {
            cost: 0.000214990234375,
          },
          'IP Address': {
            cost: 68.14079999999986,
          },
          'APN2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'eashardmap_f67f6315-1523-4bbb-bab4-ff7aea5e2bca': {
            cost: 1.781219270833328,
          },
          databaseaccounts: {
            cost: 0,
          },
          'swo-digital-recommendations-prod': {
            cost: 0.000598486328125,
          },
          'EUC1-Tables-Requests-Tier1': {
            cost: 0.0000216,
          },
          'cloudeashardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.000023242187499999998,
          },
          'EUC1-EC2SP:t3a.1yrNoUpfront': {
            cost: 0,
          },
          'billing-automation-prod': {
            cost: 0.0101587727864583,
          },
          'USE1-EUW2-AWS-Out-Bytes': {
            cost: 0,
          },
          'cloud-consumption-office-prod': {
            cost: 0.000098779296875,
          },
          'pyc-search-prod': {
            cost: 0.003951171875,
          },
          'bot-prod': {
            cost: 0.000270836046006944,
          },
          'fwk-iam-test': {
            cost: 0.0071556884765625,
          },
          'customeractivation-migration-test': {
            cost: 0.000029052734375,
          },
          workspaces: {
            cost: 934.0768328034164,
          },
          'fwk-iam-prod': {
            cost: 0.007315478515625,
          },
          'di-reporting-prod': {
            cost: 1.27705416666667,
          },
          'aly-invoice-automation-test': {
            cost: 0.000022757975260416667,
          },
          'trx-transactions-overview-test': {
            cost: 0.0785332533094618,
          },
          'mpt-public-catalog-test': {
            cost: 0.0007243815104166667,
          },
          'aly-cloud-utilization-test': {
            cost: 0.0019755859375,
          },
          inboundendpoints: {
            cost: 6,
          },
          'fwk-proxy-identity-provider-test': {
            cost: 0.000036800130208333326,
          },
          'EUC1-Requests-Tier8': {
            cost: 0.0003600000000000001,
          },
          nltapp0127sdb: {
            cost: 0.00012783203125,
          },
          serverfarms: {
            cost: 254.34224124,
          },
          'cloud-consumption-office-test': {
            cost: 0.000023242187499999998,
          },
          nlpsql_analytics_scheduler_kj: {
            cost: 0.00137903645833333,
          },
          machines: {
            cost: 0.76,
          },
          'EU-Lambda-GB-Second': {
            cost: 0,
          },
          'notificationhubquartzdb-prod': {
            cost: 0.000306022135416667,
          },
          'EUC1-Crawler-DPU-Hour': {
            cost: 0,
          },
          'notificationhubquartzdb-test': {
            cost: 0.00006197916666666667,
          },
          'EUN1-Requests-Tier1': {
            cost: 0,
          },
          'APS3-Requests-Tier1': {
            cost: 0,
          },
          databases: {
            cost: 214.0986199571104,
          },
          'csp-billing-automation-prod': {
            cost: 1.349156689453128,
          },
          'csp-license-assignments-prod': {
            cost: 0.000193684895833333,
          },
          flexibleservers: {
            cost: 64.10190133107685,
          },
          'aly-consumption-sync-meta-ea-test': {
            cost: 0.00001936848958333333,
          },
          'Sending Email': {
            cost: 1.7391153088,
          },
          'cloud-consumption-ea-prod': {
            cost: 0.000005810546875,
          },
          'eashardmap_e706a119-f41f-4e30-9271-42de678f981c': {
            cost: 0.374110123697917,
          },
          'Management Tools - AWS CloudTrail Free Events Recorded': {
            cost: 0,
          },
          'Data Transfer': {
            cost: 0.04698271410000004,
          },
          'eashardmap_1543ffee-9eff-4a72-a1b3-817f34a29ae2': {
            cost: 1.213470735677083,
          },
          'cspshardmap_35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000013557942708333333,
          },
          'customer-support-prod': {
            cost: 0.214575748697917,
          },
          'swo-marketplace-pricemanager': {
            cost: 0.001144677734375,
          },
          Snapshot: {
            cost: 1.576441936,
          },
          'market-shop-test': {
            cost: 0.00073212890625,
          },
          USSalesTax: {
            cost: 0.011666666666666665,
          },
          'aly-consumption-office365-prod': {
            cost: 2.59637895507812,
          },
          'customer-support-test': {
            cost: 0.0023493977864583334,
          },
          'aly-pricelist-prod': {
            cost: 3.2844713406032997,
          },
          'awsshardmap_878761c0-f03f-4fb9-89cc-001df25f0b58': {
            cost: 10.769976464843749,
          },
          'csp-backoffice-customers-prod': {
            cost: 0.00224480794270833,
          },
          'pyracloud-subscriptions_2020-09-29t08-59z': {
            cost: 0.000110400390625,
          },
          'notifications-management-test': {
            cost: 0.0020937337239583334,
          },
          workflows: {
            cost: 0.9734294725938298,
          },
          Serverless: {
            cost: 0.0007365263,
          },
          'Data Payload': {
            cost: 2.6079442889999997,
          },
          'cloud-platform-test': {
            cost: 0.00013993733723958332,
          },
          'aly-consumption-office365-test': {
            cost: 0.029976611328125,
          },
          images: {
            cost: 0.0660684,
          },
          'swo-digital-cloud-compatibility': {
            cost: 0.000189326985677083,
          },
          'eashardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.026765315755208335,
          },
          'pyra-dot-net-templates-test': {
            cost: 0.000017431640625,
          },
          'API Request': {
            cost: 0.2206104381000002,
          },
          'eashardmap_1d9e10e9-e0d9-49bc-8362-4635af48e3b0': {
            cost: 0.0215435709635417,
          },
          'cloud-workspace-prod': {
            cost: 0.000108463541666667,
          },
          'cloud-workspace-test': {
            cost: 0.000027115885416666665,
          },
          GuardDuty: {
            cost: 0.043104,
          },
          privateendpoints: {
            cost: 1.44,
          },
          'csp-backoffice-customers-test': {
            cost: 0.0006062337239583334,
          },
          'notifications-management-prod': {
            cost: 0.007001708984375,
          },
          'mpt-extensions-prod': {
            cost: 0.0000309895833333333,
          },
          metricalerts: {
            cost: 2.297983870967724,
          },
          'eashardmap_3c7b4733-d8c6-4030-8605-e2c2b59f6f45': {
            cost: 0.0499145345052083,
          },
          'eashardmap_5aa598f6-990c-4d69-9f5e-1275d34d14e5': {
            cost: 0.2118060546875,
          },
          'sub-mgr-test': {
            cost: 0.00049970703125,
          },
          'sub-mgr-prod': {
            cost: 0.0156632975260417,
          },
          'billing-automation-test': {
            cost: 0.0011524251302083332,
          },
          'EUN1-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'swo-extension-nav-prod_2025-05-07t13-52z': {
            cost: 0.000476295572916667,
          },
          'trx-transactions-overview-prod': {
            cost: 1.78826746419271,
          },
          'pyc-search-test': {
            cost: 0.000023242187499999998,
          },
          'EU-Recipients': {
            cost: 0,
          },
          'mpt-public-catalog-prod': {
            cost: 0.00275645887586806,
          },
          'trackit-test': {
            cost: 0.002283544921875,
          },
          'billing-automation-test_2019-06-25t15-20z': {
            cost: 0.00004180365668402777,
          },
          'cloud-consumption-aws-test': {
            cost: 0.00018851996527777777,
          },
          scheduledqueryrules: {
            cost: 2.963653673835125,
          },
          'trackit-prod': {
            cost: 0.00792752278645833,
          },
          'cloud-cost-allocation-prod': {
            cost: 0.000131705729166667,
          },
          'EU-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'customeractivation-migration-prod': {
            cost: 0.000760858832465278,
          },
          'EUC1-CW:Requests': {
            cost: 0,
          },
          'di-reporting-test': {
            cost: 0.0095045703125,
          },
          nltsql_analytics_scheduler: {
            cost: 0.0004191663953993056,
          },
          'awsshardmap_d450009c-5886-4703-8e6d-740dbecc21c9': {
            cost: 1.2361783528645869,
          },
          'wrk-management-prod': {
            cost: 0.0103050048828125,
          },
          'cloud-pricelist-paas-test': {
            cost: 0.00005616861979166667,
          },
          'aly-consumption-slm-test': {
            cost: 0.0012453938802083335,
          },
          'csp-price-calculation-service-prod': {
            cost: 4.267949332682292,
          },
          'eashardmap_7e3b2aa9-30f9-4316-8b88-e75303e4def2': {
            cost: 0.220504443359375,
          },
          'swo-extension-nav-test': {
            cost: 0.0017470377604166666,
          },
          'awsshardmap_099fd68f-cdc0-470c-83f7-68274cbee998': {
            cost: 0.320612418619792,
          },
          'eu-west-2-KMS-Requests': {
            cost: 0,
          },
          'fwk-shard-map-coordinator-prod': {
            cost: 0.000137516276041667,
          },
          'csp-backoffice-invoices-prod': {
            cost: 0.789089697265625,
          },
          'USE1-APS2-AWS-Out-Bytes': {
            cost: 0,
          },
          'csp-backoffice-invoices-test': {
            cost: 0.017842252604166664,
          },
          'swo-web-header-prod': {
            cost: 0.0024171875,
          },
          'int-cco-prod': {
            cost: 0.398919222005208,
          },
          'int-cco-test': {
            cost: 0.0008677083333333334,
          },
          'int-pim-integration-prod': {
            cost: 0.001597900390625,
          },
          'EUC1-PaidComplianceCheck': {
            cost: 0,
          },
          privatednszones: {
            cost: 0.0806451612903225,
          },
          'cloud-shard-map-coordinator-test': {
            cost: 0.000013557942708333333,
          },
          resources: {
            cost: 0,
          },
          extensiontopics: {
            cost: 0.0085422,
          },
          'swo-marketplace-contracts-test': {
            cost: 0.000023242187499999998,
          },
          searchservices: {
            cost: 106.46400000000001,
          },
          'DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'awsshardmap_c445ff59-32a7-4ff7-b325-3d04eb3f4d82': {
            cost: 0.00000193684895833333,
          },
          Dollar: {
            cost: 0,
          },
          'pyracloud-subscriptions_2020-09-29t06-59z': {
            cost: 0.000122021484375,
          },
          'eashardmap_0c1e78e9-1066-4e18-9882-bd123c54a2bd': {
            cost: 1.851325455729167,
          },
          'swo-pyraproxy-prod': {
            cost: 0.364977880859375,
          },
          partnertopics: {
            cost: 0.1106622,
          },
          'cloudofficeshardmap_2b05987e-f9b4-4348-bce0-712d90c48b24': {
            cost: 0.00008941786024305556,
          },
          'eashardmap_2b898fc6-f2f6-4d45-a87a-59c44aa1b4d6': {
            cost: 0.0744834635416667,
          },
          'gpm-swo-rfx-prod': {
            cost: 0.0000677897135416667,
          },
          vaults: {
            cost: 35.06210403374254,
          },
          'eashardmap_7e23f6f5-a875-4963-af34-29ed1d4ae24d': {
            cost: 0.146400602213542,
          },
          'mpt-tasks-test': {
            cost: 0.00003050537109375,
          },
          dnszones: {
            cost: 0.46740005161290277,
          },
          'gpm-providers-mscsp-prod': {
            cost: 0.000224674479166667,
          },
          nlpsql_analytics_scheduler: {
            cost: 0.0107417643229167,
          },
          service: {
            cost: 260.28480026099976,
          },
          'wrk-management-test': {
            cost: 0.0032771484375000003,
          },
          'gpm-swo-rfx-test': {
            cost: 0.00007941080729166666,
          },
          'eashardmap_eeb8bf9d-55d9-4fa3-ae6b-2d42c25df109': {
            cost: 1.7181151529947933,
          },
          grafana: {
            cost: 14.951999999999998,
          },
          'products-catalog-api-test': {
            cost: 0.00007166341145833333,
          },
          'eashardmap_2c8c5274-a7cf-477f-a877-977f00622a4c': {
            cost: 1.08351204427083,
          },
          'mpt-chat-test': {
            cost: 0.000013880750868055555,
          },
          'cloud-shard-map-coordinator-prod': {
            cost: 0.000102652994791667,
          },
          'mpt-currency-test': {
            cost: 0.000030989583333333336,
          },
          'eashardmap_37dd1f9c-8205-440f-87f3-da1fb808b40c': {
            cost: 0.196196988932292,
          },
          'cloud-cost-allocation-test': {
            cost: 0.00011446614583333334,
          },
          'fwk-feature-toggle-prod': {
            cost: 0.0002091796875,
          },
          'int-pim-integration-test': {
            cost: 0.00006197916666666667,
          },
          'mpt-chat-prod': {
            cost: 0.0000387369791666667,
          },
          'cloud-consumption-aws-prod': {
            cost: 0.00010458984375,
          },
          'mpt-extensions-test': {
            cost: 0.00003696153428819444,
          },
          'Business Analytics': {
            cost: 3.6000000288,
          },
          sonarqube: {
            cost: 0.0500675455729167,
          },
          'igrt-mgr-tracking-test': {
            cost: 0.00013122151692708333,
          },
          'mpt-module-billing-prod': {
            cost: 0.115242513020833,
          },
          applicationgateways: {
            cost: 435.379273047396,
          },
          'trackit-test-integrationtest': {
            cost: 0.00003437906901041666,
          },
          Bucket: {
            cost: 530.0140489123012,
          },
          'lic-mgr-gus-prod': {
            cost: 0.000133642578125,
          },
          'eashardmap_0da2a725-c790-4d1f-b155-080817a86035': {
            cost: 0.0439768012152778,
          },
          'gpm-authorization-prod': {
            cost: 0.0000716634114583334,
          },
          'swo-platform-prod_2025-05-07t12-43z': {
            cost: 0.00116503255208333,
          },
          'csp-orders-test': {
            cost: 0.00005423177083333333,
          },
          'pyra-dot-net-templates-prod': {
            cost: 0.000147200520833333,
          },
          'exp-global-search-prod': {
            cost: 0.000672086588541667,
          },
          'aly-consumption-ea-test': {
            cost: 0.13217153645833332,
          },
          'swo-digital-recommendations-prod-restored': {
            cost: 0.000017431640625,
          },
          'ap-southeast-1-KMS-Requests': {
            cost: 0,
          },
          'swo-platform-performace_2024-06-28t10-29z': {
            cost: 0.000517037760416667,
          },
          'EU-Requests-Tier2': {
            cost: 0,
          },
          publicipprefixes: {
            cost: 26.208000000000006,
          },
          'cloud-platform-prod': {
            cost: 0.00695328776041666,
          },
          'awsshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00015494791666666665,
          },
          'Global-SoftwareUsage-Contracts': {
            cost: 3139.2650273224044,
          },
          sites: {
            cost: 0.23433548600000004,
          },
          'eashardmap_c7242070-60da-4c92-bc34-8b1a34c50a01': {
            cost: 8.59747303059896,
          },
          staticsites: {
            cost: 7.196057714767122,
          },
          'awsshardmap_ca4ef284-5503-4019-a176-7b079926439a': {
            cost: 0.258573209635417,
          },
          'swo-platform-test': {
            cost: 0.005878336588541666,
          },
          'gpp-identity-prod': {
            cost: 0.0001626953125,
          },
          'int-config-test': {
            cost: 0.000050358072916666664,
          },
          'aly-consumption-slm-prod': {
            cost: 0.1009873046875,
          },
          'Requests-Tier8': {
            cost: 0.00009,
          },
          'awsshardmap_54286192-fc00-402c-9575-08102633bf40': {
            cost: 0.000123958333333333,
          },
          Alarm: {
            cost: 0.0473690856,
          },
          'EUW3-Requests-Tier1': {
            cost: 0,
          },
          'csp-subscriptions-prod': {
            cost: 0.004189404296875,
          },
          clusters: {
            cost: 0.089942184,
          },
          signalr: {
            cost: 12.879999999999999,
          },
          'CW:Requests': {
            cost: 0,
          },
          'pyracloud-subscriptions_2020-09-29t07-59z': {
            cost: 0.000108463541666667,
          },
          'swo-marketplace-order-fulfillment-prod': {
            cost: 0.0507841796875,
          },
          'mpt-helpdesk-prod': {
            cost: 0.0000493896484375,
          },
          'swo-pyraproxy-test': {
            cost: 0.012432310655381943,
          },
          Metric: {
            cost: 0.1635924704,
          },
          'gpm-swo-salesprice-prod': {
            cost: 0.06151044921875,
          },
          'eu-west-3-KMS-Requests': {
            cost: 0,
          },
          'swo-portal-prod': {
            cost: 11.16160151367188,
          },
          slots: {
            cost: 0.007340363999999999,
          },
          'cloud-pricelist-saas': {
            cost: 0.0000949055989583333,
          },
          'awsshardmap_d0bc9c1b-06cf-437f-a37f-a3ad2340ed65': {
            cost: 0.4074064941406253,
          },
          'cloud-pricelist-paas': {
            cost: 0.0002556640625,
          },
          'user-rank-prod': {
            cost: 0.076612060546875,
          },
          identitymanagementdb: {
            cost: 0.054010001627604165,
          },
          'eashardmap_14336735-a54e-41c0-8063-856b5379bd1c': {
            cost: 1.7355212565104172,
          },
          'fwk-navision-scope-test': {
            cost: 0.003354622395833333,
          },
          'gpm-itemconfiguration-prod': {
            cost: 0.00001162109375,
          },
          'awsshardmap_a0b82f35-ecdf-4392-8eab-c2a7269ebc65': {
            cost: 0.14086121419270833,
          },
          'swo-marketplace-address-book-test': {
            cost: 0.00001969129774305555,
          },
          'auth-api-prod': {
            cost: 0.00191554361979167,
          },
          networkwatchers: {
            cost: 0,
          },
          'swo-web-header-test': {
            cost: 0.00005810546875,
          },
          'eashardmap_72016d53-1ba0-4f71-ab9c-0a90df48b048': {
            cost: 0.582745556640625,
          },
          'mpt-module-spotlight-prod': {
            cost: 0.000730192057291667,
          },
          'EUW1-BilledBytes': {
            cost: 0,
          },
          trafficmanagerprofiles: {
            cost: 1.0899978283870984,
          },
          natgateways: {
            cost: 305.68436867459224,
          },
          virtualmachinescalesets: {
            cost: 965.7733612765705,
          },
          'csp-price-calculation-service-test': {
            cost: 0.0004222330729166666,
          },
          'pyc-simple-test': {
            cost: 0.000021305338541666665,
          },
          'aly-consumption-salesforce-test': {
            cost: 0.000017431640625,
          },
          AWSSupportEnterprise: {
            cost: 537.9426666666667,
          },
          'cspshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.000668212890625,
          },
          'Savings Plan': {
            cost: 4290.815929842799,
          },
          'auth-api-test': {
            cost: 0.00010652669270833334,
          },
          'pyracloud-subscriptions': {
            cost: 0.00193297526041667,
          },
          networksecuritygroups: {
            cost: 0.06641467995941638,
          },
          'csp-contracts-test': {
            cost: 0.00005616861979166667,
          },
          'fwk-navision-scope-prod': {
            cost: 0.246037923177083,
          },
          'aly-consumption-virtual-test': {
            cost: 0.00015301106770833331,
          },
          'EUC1-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          ssisdb: {
            cost: 0.000024694824218749998,
          },
          'nltdb-csp-import-test': {
            cost: 0.005033870442708333,
          },
          'market-shop-prod': {
            cost: 0.0732167643229167,
          },
          'aly-consumption-virtual-prod': {
            cost: 0.317757503255208,
          },
          'int-creditcard-prod': {
            cost: 0.00312801106770833,
          },
          'swo-marketplace-order-manager-prod': {
            cost: 0.000110400390625,
          },
          'csp-backoffice-configurations-prod': {
            cost: 0.000158821614583333,
          },
          'USE1-Reader-Enterprise-Month': {
            cost: 0,
          },
          'aly-consumption-adobe-test': {
            cost: 0.0003098958333333333,
          },
          'collab-test': {
            cost: 0.0024249348958333334,
          },
          'awsshardmap_b4fd484f-d43c-4162-a1ea-83e4b103b46e': {
            cost: 2.781241503906253,
          },
          azurefirewalls: {
            cost: 61.574072450405,
          },
          managedclusters: {
            cost: 4.77189084446428,
          },
          'csp-backoffice-prices-test': {
            cost: 0.000030989583333333336,
          },
          pools: {
            cost: 0.68399316,
          },
          Instance: {
            cost: 338.2897891768254,
          },
          'Storage Snapshot': {
            cost: 0.000007082600000000001,
          },
          'swo-marketplace-address-book-prod': {
            cost: 0.0000716634114583334,
          },
          'marketplace-pim-prod': {
            cost: 0.0510998860677083,
          },
          'lic-esd-prod': {
            cost: 0.0064200227864583395,
          },
          'eashardmap_e3c55fc0-e7ce-48fd-a244-8afd1041d843': {
            cost: 0.06230068359375,
          },
          'cloud-shard-map-test': {
            cost: 0.000015494791666666668,
          },
          'lic-esd-test': {
            cost: 0.0007650553385416668,
          },
          'AWS Glue': {
            cost: 0.15136,
          },
          'cloud-shard-map-prod': {
            cost: 0.000108463541666667,
          },
          'Load Balancer': {
            cost: 20.88033279201947,
          },
          'APN3-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          servers: {
            cost: 2.4193548387096793,
          },
          'user-rank-test': {
            cost: 0.0007965291341145833,
          },
          enterprisearchitect: {
            cost: 0.00347083333333333,
          },
          'fwk-shard-map-test': {
            cost: 0.00004261067708333333,
          },
          bastionhosts: {
            cost: 4.5612876106956985,
          },
          'eashardmap_f60ce9fd-154d-427d-bf91-2e4b42dd86c4': {
            cost: 0.242785953776042,
          },
          'mpt-module-spotlight-test': {
            cost: 0.00007747395833333333,
          },
          pricings: {
            cost: 70.02431999999999,
          },
          components: {
            cost: 0.191538328857129,
          },
          'nltdb-csp-import-prod': {
            cost: 15.15124501953126,
          },
          'fwk-proxy-identity-provider-prod': {
            cost: 0.000404801432291667,
          },
          'mpt-helpdesk-test': {
            cost: 0.000015494791666666668,
          },
          'pyracloud-subscriptions-restore': {
            cost: 0.00015882161458333332,
          },
          'AWS Security Hub - Standards': {
            cost: 0.14872220279999998,
          },
          'awsshardmap_c6469e97-302a-408a-8589-2122a0bb725d': {
            cost: 0.00191360677083333,
          },
          'eashardmap_ac7850af-21d1-4ebd-8c22-b475e5d40978': {
            cost: 0.8293761555989589,
          },
          'swo-marketplace-order-fulfillment-test': {
            cost: 0.0075072265625,
          },
          'cloud-consumption-azure-test': {
            cost: 0.008759076605902777,
          },
          redis: {
            cost: 48.647999999999996,
          },
          elasticpools: {
            cost: 650.0041305971952,
          },
          'swo-digital-maturity-calculator-test': {
            cost: 0.000023242187499999998,
          },
          'cloud-consumption-azure-prod': {
            cost: 0.0220471516927083,
          },
          'Kinesis Firehose': {
            cost: 0.0005722094,
          },
          'swo-digital-maturity-calculator-prod': {
            cost: 0.000133642578125,
          },
          'awsshardmap_d7275497-ac0b-411b-9396-d98d1c26f634': {
            cost: 0.844009049479166,
          },
          'swo-digital-recommendations-test': {
            cost: 0.000017431640625,
          },
          'customer-solutions-test': {
            cost: 0.00030214843749999995,
          },
          samdatawarehouse: {
            cost: 0.0753124348958333,
          },
          'swo-portal-test': {
            cost: 0.12879851888020832,
          },
          'csp-subscriptions-test': {
            cost: 0.00020143229166666665,
          },
          'gpm-swo-salesprice-test': {
            cost: 0.019289078776041663,
          },
          jobagents: {
            cost: 0.912,
          },
          'bot-test': {
            cost: 0.000023242187499999998,
          },
          'aly-consumption-ea-integrationtest': {
            cost: 0.000027115885416666665,
          },
          registries: {
            cost: 22.695870283733118,
          },
          'gpm-customeronboarding-test': {
            cost: 0.00001969129774305555,
          },
          'dwh-test': {
            cost: 0.4555767347547743,
          },
          'eashardmap_54286192-fc00-402c-9575-08102633bf40': {
            cost: 0.000156884765625,
          },
          'awsshardmap-26517465236498': {
            cost: 0.000013557942708333333,
          },
          'mpt-procurement-prod': {
            cost: 0.0000251790364583333,
          },
          'csp-orders-prod': {
            cost: 0.00208986002604167,
          },
          'risk-profiler-reports-db-prod': {
            cost: 0.000469040256076389,
          },
          'Management Tools - AWS Config Rules': {
            cost: 0.035,
          },
          'aly-consumption-read-ea-test': {
            cost: 0.03129173177083333,
          },
          Storage: {
            cost: 1.148914,
          },
          'mpt-procurement-test': {
            cost: 0.0002546956380208333,
          },
          chtvs00471_cpx_full_202109262000: {
            cost: 0.00001936848958333333,
          },
          'aly-consumption-ea-prod': {
            cost: 27.65994435221359,
          },
          'gpp-identity-test': {
            cost: 0.000036800130208333326,
          },
          'mpt-catalog-prod': {
            cost: 0.0000697265625,
          },
          'issue-detection-engine-prod': {
            cost: 0.000218863932291667,
          },
          factories: {
            cost: 10.833949166666669,
          },
          'swo-platform-prod': {
            cost: 0.047257177734375,
          },
          'reportingenginequartzdb-test': {
            cost: 0.000025179036458333332,
          },
          'exp-global-search-test': {
            cost: 0.00002082112630208333,
          },
          'csp-billing-automation-test': {
            cost: 0.009934098307291665,
          },
          'swo-platform-prod_2024-06-26t22-03z': {
            cost: 0.000489876302083333,
          },
          'eashardmap_35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.0000145263671875,
          },
          'eashardmap_ee859c36-53ff-4440-bd50-4d8da7e70412': {
            cost: 0.00835685763888889,
          },
          'gpm-providers-adobevipm-test': {
            cost: 0.000023242187499999998,
          },
          'Metric Streams': {
            cost: 0.12817199999999998,
          },
          virtualnetworkgateways: {
            cost: 24.72,
          },
          'int-config-prod': {
            cost: 0.00187002766927083,
          },
          'aly-pricelist-test': {
            cost: 0.11280789388020832,
          },
          'gpm-authorization-test': {
            cost: 0.000021305338541666665,
          },
          'gpm-providers-adobevipm-prod': {
            cost: 0.0000716634114583333,
          },
          'USE1-CostDataStorage': {
            cost: 0,
          },
          'igrt-mgr-tracking-prod': {
            cost: 0.000970361328125,
          },
          Volume: {
            cost: 144.26820930939988,
          },
          'mpt-currency-prod': {
            cost: 0.0000455159505208333,
          },
          'gpm-rfx-prod': {
            cost: 0.0000658528645833333,
          },
          'aly-invoice-automation-prod': {
            cost: 0.0001626953125,
          },
          'gpm-rfx-test': {
            cost: 0.00003550889756944444,
          },
          'cspshardmap_72ce77e7-2041-4f5d-3a72-08da26e48a74': {
            cost: 0.446184147135417,
          },
          'eashardmap_7f75776e-89af-413b-88a2-28593e2ac6b2': {
            cost: 2.00534562174479,
          },
          'aly-consumption-aws-test': {
            cost: 0.017861621093750002,
          },
          'cspshardmap_986dcd1f-43af-4ee7-9dbd-11411d7c399d': {
            cost: 0.312873738606771,
          },
          containerapps: {
            cost: 13.833803999999997,
          },
          'fwk-feature-toggle-test': {
            cost: 0.000030989583333333336,
          },
          'swo-marketplace-checkout-prod': {
            cost: 0.000110400390625,
          },
          'USE2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'aly-cloud-utilization-prod': {
            cost: 2.32799173177083,
          },
          'mpt-module-billing-prod-debug-1': {
            cost: 0.00229322916666667,
          },
          'gpm-subscriptions-prod': {
            cost: 0.0000154947916666667,
          },
          'risk-product-lifecyle-db-prod': {
            cost: 0.000211116536458333,
          },
          'products-catalog-api-prod': {
            cost: 0.000232421875,
          },
          'mpt-tasks-prod': {
            cost: 0.0000503580729166667,
          },
          'mpt-cqr-test': {
            cost: 0.00003986680772569444,
          },
          configurationstores: {
            cost: 8.4,
          },
          'mpt-module-billing-test': {
            cost: 0.007999186197916666,
          },
        },
        '1762819200': {
          'awsshardmap-26517465236498': {
            cost: 0.00001597900390625,
          },
          'Management Tools - AWS Config Rules': {
            cost: 0.035,
          },
          'csp-orders-prod': {
            cost: 0.00208986002604167,
          },
          Storage: {
            cost: 1.1527953333,
          },
          'dwh-test': {
            cost: 0.4633291341145833,
          },
          'eashardmap_54286192-fc00-402c-9575-08102633bf40': {
            cost: 0.000156884765625,
          },
          Volume: {
            cost: 142.17979049239997,
          },
          'swo-platform-prod': {
            cost: 0.047257177734375,
          },
          factories: {
            cost: 7.334350833333334,
          },
          'igrt-mgr-tracking-prod': {
            cost: 0.000970361328125,
          },
          'aly-consumption-ea-prod': {
            cost: 27.65994435221359,
          },
          chtvs00471_cpx_full_202109262000: {
            cost: 0.00001936848958333333,
          },
          'gpp-identity-test': {
            cost: 0.000036800130208333326,
          },
          AmazonLocationService: {
            cost: 0.00001,
          },
          redis: {
            cost: 48.647999999999996,
          },
          'mpt-catalog-prod': {
            cost: 0.0000697265625,
          },
          'issue-detection-engine-prod': {
            cost: 0.000218863932291667,
          },
          'int-cco-prod': {
            cost: 0.398919222005208,
          },
          'csp-billing-automation-test': {
            cost: 0.009934098307291665,
          },
          'swo-platform-prod_2024-06-26t22-03z': {
            cost: 0.000489876302083333,
          },
          'int-cco-test': {
            cost: 0.0008677083333333334,
          },
          'mpt-tasks-prod': {
            cost: 0.0000503580729166667,
          },
          'int-config-prod': {
            cost: 0.00191941731770833,
          },
          'aly-pricelist-test': {
            cost: 0.11280789388020832,
          },
          'eashardmap_35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000017431640625,
          },
          'eashardmap_ee859c36-53ff-4440-bd50-4d8da7e70412': {
            cost: 0.00837687174479167,
          },
          'gpm-subscriptions-prod': {
            cost: 0.0000154947916666667,
          },
          'nltdb-csp-import-prod': {
            cost: 15.15124501953126,
          },
          'mpt-currency-prod': {
            cost: 0.0000503580729166667,
          },
          'aly-invoice-automation-prod': {
            cost: 0.0001626953125,
          },
          'Load Balancer': {
            cost: 21.30203672936652,
          },
          'aly-consumption-aws-test': {
            cost: 0.017861621093750002,
          },
          'csp-backoffice-invoices-prod': {
            cost: 0.789089697265625,
          },
          'cspshardmap_986dcd1f-43af-4ee7-9dbd-11411d7c399d': {
            cost: 0.315706380208333,
          },
          'csp-backoffice-invoices-test': {
            cost: 0.017842252604166664,
          },
          'cspshardmap_72ce77e7-2041-4f5d-3a72-08da26e48a74': {
            cost: 0.446184147135417,
          },
          'eashardmap_7f75776e-89af-413b-88a2-28593e2ac6b2': {
            cost: 2.00534562174479,
          },
          pools: {
            cost: 0.68399316,
          },
          'mpt-module-billing-prod-debug-1': {
            cost: 0.00229322916666667,
          },
          'gpm-authorization-test': {
            cost: 0.000022273763020833333,
          },
          virtualnetworkgateways: {
            cost: 24.72,
          },
          'Metric Streams': {
            cost: 0.130767,
          },
          'fwk-feature-toggle-test': {
            cost: 0.000032926432291666666,
          },
          'aly-cloud-utilization-prod': {
            cost: 2.32799173177083,
          },
          'USE2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          configurationstores: {
            cost: 8.4,
          },
          'mpt-module-billing-test': {
            cost: 0.007999186197916666,
          },
          'nltdb-csp-import-test': {
            cost: 0.005033870442708333,
          },
          'products-catalog-api-prod': {
            cost: 0.000238232421875,
          },
          'exp-global-search-test': {
            cost: 0.000025179036458333332,
          },
          'swo-marketplace-order-manager-prod': {
            cost: 0.000110400390625,
          },
          'int-creditcard-prod': {
            cost: 0.00312801106770833,
          },
          'trackit-test': {
            cost: 0.002283544921875,
          },
          'csp-backoffice-configurations-prod': {
            cost: 0.0001626953125,
          },
          'trackit-prod': {
            cost: 0.00792752278645833,
          },
          'fwk-navision-scope-prod': {
            cost: 0.24906295844184,
          },
          'csp-contracts-test': {
            cost: 0.00005616861979166667,
          },
          'risk-product-lifecyle-db-prod': {
            cost: 0.000211116536458333,
          },
          'EUC1-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'market-shop-prod': {
            cost: 0.0732167643229167,
          },
          'swo-marketplace-order-fulfillment-test': {
            cost: 0.0075072265625,
          },
          'collab-test': {
            cost: 0.0024249348958333334,
          },
          managedclusters: {
            cost: 4.80869085903153,
          },
          'awsshardmap_b4fd484f-d43c-4162-a1ea-83e4b103b46e': {
            cost: 2.781241503906253,
          },
          'csp-backoffice-prices-test': {
            cost: 0.000032926432291666666,
          },
          'swo-marketplace-checkout-prod': {
            cost: 0.000110400390625,
          },
          containerapps: {
            cost: 14.971802,
          },
          'aly-consumption-adobe-test': {
            cost: 0.0003098958333333333,
          },
          'eashardmap_e3c55fc0-e7ce-48fd-a244-8afd1041d843': {
            cost: 0.06230068359375,
          },
          metricalerts: {
            cost: 2.3176075268817034,
          },
          'AWS Glue': {
            cost: 0.15404884,
          },
          'Storage Snapshot': {
            cost: 0.0000070872,
          },
          Instance: {
            cost: 337.584432569612,
          },
          'swo-marketplace-address-book-prod': {
            cost: 0.0000716634114583334,
          },
          'sub-mgr-test': {
            cost: 0.00049970703125,
          },
          servers: {
            cost: 2.4193548387096793,
          },
          'APN3-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'mpt-module-spotlight-test': {
            cost: 0.00007747395833333333,
          },
          'eashardmap_f60ce9fd-154d-427d-bf91-2e4b42dd86c4': {
            cost: 0.242785953776042,
          },
          enterprisearchitect: {
            cost: 0.00347083333333333,
          },
          'fwk-shard-map-test': {
            cost: 0.00004261067708333333,
          },
          'sub-mgr-prod': {
            cost: 0.0156632975260417,
          },
          components: {
            cost: 0.189917354068096,
          },
          pricings: {
            cost: 49.69216,
          },
          'csp-subscriptions-test': {
            cost: 0.00020143229166666665,
          },
          'mpt-helpdesk-test': {
            cost: 0.000015494791666666668,
          },
          'pyracloud-subscriptions-restore': {
            cost: 0.00015882161458333332,
          },
          'fwk-proxy-identity-provider-prod': {
            cost: 0.000404801432291667,
          },
          'cloud-workspace-prod': {
            cost: 0.000108463541666667,
          },
          azurefirewalls: {
            cost: 60.078694609629,
          },
          'cloud-workspace-test': {
            cost: 0.000027115885416666665,
          },
          ssisdb: {
            cost: 0.000025179036458333332,
          },
          'awsshardmap_c6469e97-302a-408a-8589-2122a0bb725d': {
            cost: 0.00191360677083333,
          },
          'eashardmap_ac7850af-21d1-4ebd-8c22-b475e5d40978': {
            cost: 0.8293761555989589,
          },
          'swo-portal-test': {
            cost: 0.12879851888020832,
          },
          samdatawarehouse: {
            cost: 0.0753124348958333,
          },
          'gpm-swo-salesprice-test': {
            cost: 0.019289078776041663,
          },
          'Data Payload': {
            cost: 2.6222689020999996,
          },
          'Kinesis Firehose': {
            cost: 0.0006001475,
          },
          'awsshardmap_d7275497-ac0b-411b-9396-d98d1c26f634': {
            cost: 0.844009049479166,
          },
          'swo-digital-recommendations-test': {
            cost: 0.000017431640625,
          },
          'customer-solutions-test': {
            cost: 0.00030214843749999995,
          },
          'user-rank-test': {
            cost: 0.0009374348958333334,
          },
          'aly-consumption-ea-integrationtest': {
            cost: 0.000027115885416666665,
          },
          'risk-profiler-reports-db-prod': {
            cost: 0.000472591145833333,
          },
          registries: {
            cost: 22.70291488373312,
          },
          'gpm-customeronboarding-test': {
            cost: 0.000021305338541666665,
          },
          jobagents: {
            cost: 0.912,
          },
          'bot-test': {
            cost: 0.000023242187499999998,
          },
          trafficmanagerprofiles: {
            cost: 0.9900984754838728,
          },
          'EUW3-Requests-Tier1': {
            cost: 0,
          },
          'awsshardmap_54286192-fc00-402c-9575-08102633bf40': {
            cost: 0.000123958333333333,
          },
          'CW:Requests': {
            cost: 0,
          },
          'pyracloud-subscriptions_2020-09-29t07-59z': {
            cost: 0.000108463541666667,
          },
          'user-rank-prod': {
            cost: 0.0785159830729167,
          },
          sites: {
            cost: 0.20351772399999996,
          },
          clusters: {
            cost: 0.0899748,
          },
          signalr: {
            cost: 12.879999999999999,
          },
          'gpm-swo-salesprice-prod': {
            cost: 0.06151044921875,
          },
          'csp-license-assignments-prod': {
            cost: 0.000193684895833333,
          },
          'swo-portal-prod': {
            cost: 11.16160151367188,
          },
          'swo-pyraproxy-test': {
            cost: 0.012643749999999999,
          },
          'mpt-helpdesk-prod': {
            cost: 0.000052294921875,
          },
          'awsshardmap_d0bc9c1b-06cf-437f-a37f-a3ad2340ed65': {
            cost: 0.4074064941406253,
          },
          'swo-marketplace-pricemanager': {
            cost: 0.001144677734375,
          },
          'gpm-itemconfiguration-prod': {
            cost: 0.00001162109375,
          },
          'awsshardmap_a0b82f35-ecdf-4392-8eab-c2a7269ebc65': {
            cost: 0.14086121419270833,
          },
          'csp-subscriptions-prod': {
            cost: 0.004189404296875,
          },
          networkwatchers: {
            cost: 0,
          },
          'swo-marketplace-address-book-test': {
            cost: 0.000021305338541666665,
          },
          'eashardmap_14336735-a54e-41c0-8063-856b5379bd1c': {
            cost: 1.7355212565104172,
          },
          'fwk-navision-scope-test': {
            cost: 0.003354622395833333,
          },
          virtualmachinescalesets: {
            cost: 959.144915180237,
          },
          'csp-price-calculation-service-test': {
            cost: 0.0004222330729166666,
          },
          'notificationhubquartzdb-prod': {
            cost: 0.000306022135416667,
          },
          'mpt-chat-prod': {
            cost: 0.0000387369791666667,
          },
          'mpt-module-spotlight-prod': {
            cost: 0.000730192057291667,
          },
          'eashardmap_72016d53-1ba0-4f71-ab9c-0a90df48b048': {
            cost: 0.648102587890625,
          },
          'swo-web-header-test': {
            cost: 0.00007053358289930555,
          },
          'notificationhubquartzdb-test': {
            cost: 0.00006197916666666667,
          },
          natgateways: {
            cost: 327.4639029923966,
          },
          'EUW1-BilledBytes': {
            cost: 0,
          },
          'mpt-chat-test': {
            cost: 0.000015494791666666668,
          },
          'cspshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.000668212890625,
          },
          'pyc-simple-test': {
            cost: 0.000021305338541666665,
          },
          'cloudeashardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.000023242187499999998,
          },
          'aly-consumption-salesforce-test': {
            cost: 0.000017431640625,
          },
          'pyracloud-subscriptions': {
            cost: 0.00193297526041667,
          },
          'swo-marketplace-order-fulfillment-prod': {
            cost: 0.0507841796875,
          },
          'eu-west-3-KMS-Requests': {
            cost: 0,
          },
          'fwk-iam-test': {
            cost: 0.008419482421875,
          },
          'fwk-iam-prod': {
            cost: 0.007315478515625,
          },
          Metric: {
            cost: 0.16692580370000001,
          },
          networksecuritygroups: {
            cost: 0.06481263721361752,
          },
          'gpm-providers-mscsp-prod': {
            cost: 0.000224674479166667,
          },
          nlpsql_analytics_scheduler: {
            cost: 0.0107417643229167,
          },
          'exp-global-search-prod': {
            cost: 0.000672086588541667,
          },
          'auth-api-test': {
            cost: 0.00010652669270833334,
          },
          'eashardmap_7e23f6f5-a875-4963-af34-29ed1d4ae24d': {
            cost: 0.146400602213542,
          },
          dnszones: {
            cost: 0.4594504516129027,
          },
          grafana: {
            cost: 14.951999999999998,
          },
          'gpm-authorization-prod': {
            cost: 0.0000716634114583334,
          },
          'eashardmap_2c8c5274-a7cf-477f-a877-977f00622a4c': {
            cost: 1.08351204427083,
          },
          'products-catalog-api-test': {
            cost: 0.00007166341145833333,
          },
          'wrk-management-test': {
            cost: 0.0032771484375000003,
          },
          service: {
            cost: 260.28480034799975,
          },
          'gpm-swo-rfx-test': {
            cost: 0.00007941080729166666,
          },
          'eashardmap_eeb8bf9d-55d9-4fa3-ae6b-2d42c25df109': {
            cost: 1.7181151529947933,
          },
          'cloud-consumption-aws-prod': {
            cost: 0.00010458984375,
          },
          'mpt-extensions-test': {
            cost: 0.00004261067708333333,
          },
          'Requests-Tier8': {
            cost: 0.00009,
          },
          'cloud-shard-map-coordinator-prod': {
            cost: 0.000102652994791667,
          },
          'fwk-feature-toggle-prod': {
            cost: 0.000211116536458333,
          },
          'cloud-cost-allocation-test': {
            cost: 0.00011446614583333334,
          },
          'eashardmap_37dd1f9c-8205-440f-87f3-da1fb808b40c': {
            cost: 0.196196988932292,
          },
          'mpt-currency-test': {
            cost: 0.00003986680772569444,
          },
          'int-pim-integration-test': {
            cost: 0.00007166341145833333,
          },
          actiongroups: {
            cost: 0.0366,
          },
          'mpt-module-billing-prod': {
            cost: 0.115242513020833,
          },
          'auth-api-prod': {
            cost: 0.00194427354600694,
          },
          'renewal-manager-test': {
            cost: 0.016226920572916668,
          },
          'Global-SoftwareUsage-Contracts': {
            cost: 3139.2650273224044,
          },
          applicationgateways: {
            cost: 435.6568013900909,
          },
          'lic-mgr-gus-prod': {
            cost: 0.000133642578125,
          },
          'renewal-manager-prod': {
            cost: 0.47738291015625,
          },
          'Business Analytics': {
            cost: 3.6000000288,
          },
          sonarqube: {
            cost: 0.0500675455729167,
          },
          'csp-orders-test': {
            cost: 0.00005423177083333333,
          },
          'swo-platform-prod_2025-05-07t12-43z': {
            cost: 0.00116503255208333,
          },
          'pyra-dot-net-templates-prod': {
            cost: 0.000147200520833333,
          },
          'eashardmap_0da2a725-c790-4d1f-b155-080817a86035': {
            cost: 0.0456747721354167,
          },
          'USE1-ResourceList': {
            cost: 0,
          },
          slots: {
            cost: 0.008706524999999996,
          },
          'swo-platform-performace_2024-06-28t10-29z': {
            cost: 0.000517037760416667,
          },
          'ap-southeast-1-KMS-Requests': {
            cost: 0,
          },
          'EU-Requests-Tier2': {
            cost: 0,
          },
          'mpt-tasks-test': {
            cost: 0.000030989583333333336,
          },
          vaults: {
            cost: 38.32234092524201,
          },
          backupvaults: {
            cost: 0.1673716512,
          },
          'swo-digital-recommendations-prod-restored': {
            cost: 0.000017431640625,
          },
          'aly-consumption-ea-test': {
            cost: 0.13217153645833332,
          },
          'eashardmap_c7242070-60da-4c92-bc34-8b1a34c50a01': {
            cost: 8.59747303059896,
          },
          staticsites: {
            cost: 7.205342951013698,
          },
          'cloud-platform-prod': {
            cost: 0.00695328776041666,
          },
          publicipprefixes: {
            cost: 26.208000000000006,
          },
          Bucket: {
            cost: 527.6869957089009,
          },
          'swo-digital-assessments-prod': {
            cost: 0.00107882486979167,
          },
          'awsshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.0001791585286458333,
          },
          'swo-digital-assessments-test': {
            cost: 0.00011451619466145834,
          },
          'igrt-mgr-tracking-test': {
            cost: 0.00014332682291666666,
          },
          'int-config-test': {
            cost: 0.000050358072916666664,
          },
          'gpp-identity-prod': {
            cost: 0.0001626953125,
          },
          Alarm: {
            cost: 0.0473690856,
          },
          'aly-consumption-slm-prod': {
            cost: 0.1009873046875,
          },
          'awsshardmap_ca4ef284-5503-4019-a176-7b079926439a': {
            cost: 0.258573209635417,
          },
          'swo-platform-test': {
            cost: 0.005878336588541666,
          },
          searchservices: {
            cost: 106.46400000000001,
          },
          'swo-marketplace-contracts-test': {
            cost: 0.000029052734375,
          },
          'cloud-pricelist-paas-test': {
            cost: 0.00005616861979166667,
          },
          'csp-price-calculation-service-prod': {
            cost: 4.267949332682292,
          },
          'aly-consumption-slm-test': {
            cost: 0.0012453938802083335,
          },
          'mpt-cqr-test': {
            cost: 0.000040673828125,
          },
          'EU-Recipients': {
            cost: 0,
          },
          'awsshardmap_099fd68f-cdc0-470c-83f7-68274cbee998': {
            cost: 0.320612418619792,
          },
          'gpm-rfx-prod': {
            cost: 0.0000658528645833333,
          },
          'gpm-rfx-test': {
            cost: 0.00003873697916666666,
          },
          'eashardmap_7e3b2aa9-30f9-4316-8b88-e75303e4def2': {
            cost: 0.220504443359375,
          },
          Dollar: {
            cost: 0,
          },
          'DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'swo-web-header-prod': {
            cost: 0.0024171875,
          },
          'USE1-APS2-AWS-Out-Bytes': {
            cost: 0,
          },
          'int-pim-integration-prod': {
            cost: 0.00163663736979167,
          },
          'EUC1-PaidComplianceCheck': {
            cost: 0,
          },
          'notifications-management-prod': {
            cost: 0.007001708984375,
          },
          privatednszones: {
            cost: 0.0806451612903225,
          },
          'cloud-shard-map-coordinator-test': {
            cost: 0.000017108832465277775,
          },
          'csp-backoffice-customers-test': {
            cost: 0.0006062337239583334,
          },
          'reportingenginequartzdb-test': {
            cost: 0.000025179036458333332,
          },
          extensiontopics: {
            cost: 0.006769799999999999,
          },
          resources: {
            cost: 0,
          },
          'gpm-providers-adobevipm-test': {
            cost: 0.000023242187499999998,
          },
          'gpm-providers-adobevipm-prod': {
            cost: 0.0000716634114583333,
          },
          'USE1-CostDataStorage': {
            cost: 0,
          },
          'fwk-shard-map-coordinator-prod': {
            cost: 0.000137516276041667,
          },
          'swo-pyraproxy-prod': {
            cost: 0.364977880859375,
          },
          'mpt-procurement-prod': {
            cost: 0.0000251790364583333,
          },
          'aly-consumption-read-ea-test': {
            cost: 0.03129173177083333,
          },
          'awsshardmap_c445ff59-32a7-4ff7-b325-3d04eb3f4d82': {
            cost: 0.00000193684895833333,
          },
          'eashardmap_0c1e78e9-1066-4e18-9882-bd123c54a2bd': {
            cost: 2.042476953124997,
          },
          'pyracloud-subscriptions_2020-09-29t06-59z': {
            cost: 0.000122021484375,
          },
          'mpt-procurement-test': {
            cost: 0.0009722981770833333,
          },
          'swo-extension-nav-test': {
            cost: 0.0017470377604166666,
          },
          'eashardmap_2b898fc6-f2f6-4d45-a87a-59c44aa1b4d6': {
            cost: 0.0744834635416667,
          },
          'gpm-swo-rfx-prod': {
            cost: 0.0000677897135416667,
          },
          'eu-west-2-KMS-Requests': {
            cost: 0,
          },
          'notifications-management-test': {
            cost: 0.0020937337239583334,
          },
          'cloudofficeshardmap_2b05987e-f9b4-4348-bce0-712d90c48b24': {
            cost: 0.00009103190104166667,
          },
          'csp-backoffice-customers-prod': {
            cost: 0.00224480794270833,
          },
          'cloud-consumption-azure-test': {
            cost: 0.008907568359375,
          },
          'swo-digital-maturity-calculator-test': {
            cost: 0.000023242187499999998,
          },
          elasticpools: {
            cost: 647.0632986153961,
          },
          'cloud-consumption-azure-prod': {
            cost: 0.0220471516927083,
          },
          'cloud-platform-test': {
            cost: 0.00016463216145833333,
          },
          'swo-digital-maturity-calculator-prod': {
            cost: 0.000133642578125,
          },
          partnertopics: {
            cost: 0.10733759999999999,
          },
          'pyracloud-subscriptions_2020-09-29t08-59z': {
            cost: 0.000110400390625,
          },
          'trx-transactions-overview-prod': {
            cost: 1.78826746419271,
          },
          Serverless: {
            cost: 0.0006386334,
          },
          workflows: {
            cost: 0.9706258431582513,
          },
          'swo-digital-cloud-compatibility': {
            cost: 0.000193684895833333,
          },
          'eashardmap_1d9e10e9-e0d9-49bc-8362-4635af48e3b0': {
            cost: 0.0215435709635417,
          },
          'eashardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.026765315755208335,
          },
          'API Request': {
            cost: 0.17069402700000022,
          },
          'pyra-dot-net-templates-test': {
            cost: 0.000017431640625,
          },
          'AWS Security Hub - Standards': {
            cost: 0.14872220279999998,
          },
          privateendpoints: {
            cost: 1.38,
          },
          GuardDuty: {
            cost: 0.04818,
          },
          images: {
            cost: 0.0660684,
          },
          'eashardmap_3c7b4733-d8c6-4030-8605-e2c2b59f6f45': {
            cost: 0.0499145345052083,
          },
          'aly-consumption-office365-test': {
            cost: 0.029976611328125,
          },
          'marketplace-pim-prod': {
            cost: 0.0510998860677083,
          },
          'lic-esd-prod': {
            cost: 0.0064200227864583395,
          },
          'mpt-extensions-prod': {
            cost: 0.0000309895833333333,
          },
          'cloud-shard-map-test': {
            cost: 0.000015494791666666668,
          },
          'lic-esd-test': {
            cost: 0.0007650553385416668,
          },
          'cloud-shard-map-prod': {
            cost: 0.000108463541666667,
          },
          'swo-extension-nav-prod_2025-05-07t13-52z': {
            cost: 0.000476295572916667,
          },
          'pyc-search-test': {
            cost: 0.000023242187499999998,
          },
          'eashardmap_5aa598f6-990c-4d69-9f5e-1275d34d14e5': {
            cost: 0.2118060546875,
          },
          bastionhosts: {
            cost: 4.561315596023575,
          },
          'billing-automation-test': {
            cost: 0.0011524251302083332,
          },
          'EUN1-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'aly-consumption-virtual-test': {
            cost: 0.00015301106770833331,
          },
          'cloud-cost-allocation-prod': {
            cost: 0.000131705729166667,
          },
          'aly-consumption-virtual-prod': {
            cost: 0.317757503255208,
          },
          'mpt-public-catalog-prod': {
            cost: 0.00280455729166667,
          },
          scheduledqueryrules: {
            cost: 2.9642361111111115,
          },
          'billing-automation-test_2019-06-25t15-20z': {
            cost: 0.00004261067708333333,
          },
          'cloud-consumption-aws-test': {
            cost: 0.000191748046875,
          },
          'awsshardmap_d450009c-5886-4703-8e6d-740dbecc21c9': {
            cost: 1.2361783528645869,
          },
          'wrk-management-prod': {
            cost: 0.01056357421875,
          },
          'USE1-Reader-Enterprise-Month': {
            cost: 0,
          },
          'EU-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'EUC1-CW:Requests': {
            cost: 0,
          },
          'customeractivation-migration-prod': {
            cost: 0.0007669921875,
          },
          nltsql_analytics_scheduler: {
            cost: 0.0004570963541666667,
          },
          'di-reporting-test': {
            cost: 0.0095045703125,
          },
          'swo-digital-recommendations-prod': {
            cost: 0.000598486328125,
          },
          databaseaccounts: {
            cost: 0,
          },
          'EUC1-Tables-Requests-Tier1': {
            cost: 0.0000216,
          },
          'Management Tools - AWS CloudTrail Free Events Recorded': {
            cost: 0,
          },
          'APN2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'eashardmap_f67f6315-1523-4bbb-bab4-ff7aea5e2bca': {
            cost: 1.781219270833328,
          },
          AWSSupportEnterprise: {
            cost: 537.9426666666667,
          },
          'cloudawsshardmap_50b14c10-7229-4581-b736-0494d49d0bb8': {
            cost: 0.000013557942708333333,
          },
          'pyc-search-prod': {
            cost: 0.003951171875,
          },
          'bot-prod': {
            cost: 0.000273095703125,
          },
          'Savings Plan': {
            cost: 4290.815848253,
          },
          workspaces: {
            cost: 991.8120847386051,
          },
          'customeractivation-migration-test': {
            cost: 0.000029052734375,
          },
          'di-reporting-prod': {
            cost: 1.27705416666667,
          },
          'EUC1-EC2SP:t3a.1yrNoUpfront': {
            cost: 0,
          },
          'USE1-EUW2-AWS-Out-Bytes': {
            cost: 0,
          },
          'billing-automation-prod': {
            cost: 0.0101587727864583,
          },
          'swo-marketplace-customer-test': {
            cost: 0.00005423177083333333,
          },
          'aly-cloud-utilization-test': {
            cost: 0.0019755859375,
          },
          identitymanagementdb: {
            cost: 0.05659085286458337,
          },
          'USE1-EU-AWS-Out-Bytes': {
            cost: 0,
          },
          'EUC1-Requests-Tier8': {
            cost: 0.0003600000000000001,
          },
          'fwk-proxy-identity-provider-test': {
            cost: 0.000036800130208333326,
          },
          inboundendpoints: {
            cost: 6,
          },
          serverfarms: {
            cost: 254.34224124,
          },
          'swo-marketplace-customer-prod': {
            cost: 0.000100716145833333,
          },
          'aly-invoice-automation-test': {
            cost: 0.000023242187499999998,
          },
          'mpt-public-catalog-test': {
            cost: 0.0008894978841145834,
          },
          'APS3-Requests-Tier1': {
            cost: 0,
          },
          'EUN1-Requests-Tier1': {
            cost: 0,
          },
          machines: {
            cost: 0.52,
          },
          'aly-consumption-office365-prod': {
            cost: 2.66052545572917,
          },
          'EU-Lambda-GB-Second': {
            cost: 0,
          },
          'aly-consumption-sync-meta-ea-test': {
            cost: 0.00001936848958333333,
          },
          'eashardmap_e706a119-f41f-4e30-9271-42de678f981c': {
            cost: 0.374110123697917,
          },
          'cloud-consumption-ea-prod': {
            cost: 0.000005810546875,
          },
          databases: {
            cost: 218.2971665057365,
          },
          flexibleservers: {
            cost: 64.11091390662382,
          },
          'csp-billing-automation-prod': {
            cost: 1.349156689453128,
          },
          'cloud-pricelist-saas': {
            cost: 0.0000949055989583333,
          },
          'cloud-pricelist-paas': {
            cost: 0.0002556640625,
          },
          'mgmt-acm-prod': {
            cost: 0.000139453125,
          },
          'cspshardmap_35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000013557942708333333,
          },
          'eashardmap_1543ffee-9eff-4a72-a1b3-817f34a29ae2': {
            cost: 1.213470735677083,
          },
          USSalesTax: {
            cost: 0.011666666666666665,
          },
          'market-shop-test': {
            cost: 0.00073212890625,
          },
          'mgmt-console-gus-test': {
            cost: 0.00004261067708333333,
          },
          Snapshot: {
            cost: 1.576441936,
          },
          'mgmt-acm-test': {
            cost: 0.000020982530381944442,
          },
          'trx-transactions-overview-test': {
            cost: 0.07992407226562499,
          },
          'Tables-Requests-Tier1': {
            cost: 0.000005,
          },
          'EUC1-Requests': {
            cost: 0,
          },
          'aly-pricelist-prod': {
            cost: 3.56116796875,
          },
          'awsshardmap_878761c0-f03f-4fb9-89cc-001df25f0b58': {
            cost: 10.769976464843749,
          },
          'emerald-storage-tcs': {
            cost: 14.968203108723946,
          },
          'swo-extension-nav-prod': {
            cost: 0.0876582329644097,
          },
          'customer-support-test': {
            cost: 0.0023493977864583334,
          },
          'int-cco-prod-demo': {
            cost: 0.0095060546875,
          },
          'eashardmap_c5ea8285-6825-4842-94d2-c309ed449796': {
            cost: 1.3099505086263021,
          },
          namespaces: {
            cost: 57.80141858064517,
          },
          'gpm-customeronboarding-prod': {
            cost: 0.0000658528645833333,
          },
          'fwk-shard-map-coordinator-test': {
            cost: 0.000017431640625,
          },
          'eashardmap_c204d440-36ba-44c9-acfa-a9ba1b66db92': {
            cost: 0.03157451171875,
          },
          fogtest: {
            cost: 0.000011640625,
          },
          'EU-VendedLog-Bytes': {
            cost: 0,
          },
          connections: {
            cost: 0.032930153029039504,
          },
          'customer-support-prod': {
            cost: 0.214575748697917,
          },
          'Data Transfer': {
            cost: 0.03867113820000004,
          },
          'customer-solutions': {
            cost: 0.00103621419270833,
          },
          'cloudazureshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00012395833333333334,
          },
          'Sending Email': {
            cost: 1.1919084173999999,
          },
          'aly-consumption-aws-prod': {
            cost: 53.143099023437514,
          },
          'EUC1-ConfigRuleEvaluations': {
            cost: 0,
          },
          'EU-CW:Requests': {
            cost: 0,
          },
          sqlserverinstances: {
            cost: 0,
          },
          'spotlightkj-test': {
            cost: 0.000013557942708333333,
          },
          'awsshardmap-35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000013557942708333333,
          },
          'APS2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'EUC1-Crawler-DPU-Hour': {
            cost: 0,
          },
          'csp-contracts-prod': {
            cost: 0.00157078450520833,
          },
          profiles: {
            cost: 21.008040016132973,
          },
          'csp-backoffice-configurations-test': {
            cost: 0.000017431640625,
          },
          'swo-marketplace-order-manager-test': {
            cost: 0.0012047200520833334,
          },
          nlpsql_analytics_scheduler_kj: {
            cost: 0.00137903645833333,
          },
          'cloud-consumption-office-test': {
            cost: 0.000023242187499999998,
          },
          'aly-consumption-adobe-prod': {
            cost: 0.000978108723958333,
          },
          nltapp0127sdb: {
            cost: 0.00012783203125,
          },
          'csp-backoffice-prices-prod': {
            cost: 0.000280520290798611,
          },
          'reportingenginedb-test': {
            cost: 0.00006585286458333333,
          },
          'trackit-test-integrationtest': {
            cost: 0.00003486328125,
          },
          'eashardmap_b18289b7-cf8f-4e13-971c-9e5b1c0c020e': {
            cost: 0.0630056966145833,
          },
          'dwh-prod': {
            cost: 4.12214915364583,
          },
          'cloud-consumption-office-prod': {
            cost: 0.000098779296875,
          },
          'int-creditcard-test': {
            cost: 0.002016259765625,
          },
          'tellurium-test': {
            cost: 0.11857389322916664,
          },
          'IP Address': {
            cost: 68.01079999999988,
          },
          'swo-marketplace-contracts-prod': {
            cost: 0.000100716145833333,
          },
          accounts: {
            cost: 46.802537001699996,
          },
          'USE1-PaidEventsAnalyzed': {
            cost: 0,
          },
          'identitymanagementdb-qa': {
            cost: 0.000017431640625,
          },
          'fwk-shard-map-prod': {
            cost: 0.000214990234375,
          },
          'collab-prod': {
            cost: 0.019941796875,
          },
          'EU-AttachmentsSize-Bytes': {
            cost: 0,
          },
        },
        '1762905600': {
          'USE1-EU-AWS-Out-Bytes': {
            cost: 0,
          },
          'swo-marketplace-customer-prod': {
            cost: 0.000100716145833333,
          },
          'aly-invoice-automation-test': {
            cost: 0.000021305338541666665,
          },
          'trx-transactions-overview-test': {
            cost: 0.07659390258789062,
          },
          'mpt-public-catalog-test': {
            cost: 0.0008291327582465279,
          },
          'aly-cloud-utilization-test': {
            cost: 0.0018932698567708335,
          },
          inboundendpoints: {
            cost: 6,
          },
          'EUC1-Requests-Tier8': {
            cost: 0.0003600000000000001,
          },
          'fwk-proxy-identity-provider-test': {
            cost: 0.000035266791449652774,
          },
          serverfarms: {
            cost: 248.11514124000007,
          },
          'csp-backoffice-invoices-prod': {
            cost: 0.796813850911458,
          },
          machines: {
            cost: 0.58,
          },
          'csp-backoffice-invoices-test': {
            cost: 0.01635539822048611,
          },
          'EU-Lambda-GB-Second': {
            cost: 0,
          },
          'EUN1-Requests-Tier1': {
            cost: 0,
          },
          'APS3-Requests-Tier1': {
            cost: 0,
          },
          'APN2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'eashardmap_f67f6315-1523-4bbb-bab4-ff7aea5e2bca': {
            cost: 1.781219270833328,
          },
          databaseaccounts: {
            cost: 0,
          },
          'swo-digital-recommendations-prod': {
            cost: 0.000604619683159722,
          },
          'EUC1-Tables-Requests-Tier1': {
            cost: 0.0000216,
          },
          'EUC1-EC2SP:t3a.1yrNoUpfront': {
            cost: 0,
          },
          'billing-automation-prod': {
            cost: 0.0101587727864583,
          },
          'USE1-EUW2-AWS-Out-Bytes': {
            cost: 0,
          },
          reservations: {
            cost: 37687.95,
          },
          'cloudawsshardmap_50b14c10-7229-4581-b736-0494d49d0bb8': {
            cost: 0.000012993028428819444,
          },
          'pyc-search-prod': {
            cost: 0.003951171875,
          },
          'bot-prod': {
            cost: 0.000273095703125,
          },
          'swo-marketplace-customer-test': {
            cost: 0.00005197211371527778,
          },
          'customeractivation-migration-test': {
            cost: 0.00003203870985243055,
          },
          workspaces: {
            cost: 957.09862333147,
          },
          'di-reporting-prod': {
            cost: 1.27705416666667,
          },
          Snapshot: {
            cost: 1.576441936,
          },
          'mgmt-console-gus-test': {
            cost: 0.000040835232204861104,
          },
          USSalesTax: {
            cost: 0.011666666666666665,
          },
          'market-shop-test': {
            cost: 0.0007016235351562499,
          },
          'aly-consumption-office365-prod': {
            cost: 2.72467195638021,
          },
          'mgmt-acm-test': {
            cost: 0.000019529893663194443,
          },
          'aly-pricelist-prod': {
            cost: 3.56116796875,
          },
          'awsshardmap_878761c0-f03f-4fb9-89cc-001df25f0b58': {
            cost: 10.769976464843749,
          },
          'EUC1-Requests': {
            cost: 0,
          },
          'Tables-Requests-Tier1': {
            cost: 0.000005,
          },
          'int-cco-prod': {
            cost: 0.398919222005208,
          },
          databases: {
            cost: 216.4691889924109,
          },
          'csp-billing-automation-prod': {
            cost: 1.349156689453128,
          },
          'int-cco-test': {
            cost: 0.0008315538194444444,
          },
          flexibleservers: {
            cost: 61.550180443487825,
          },
          'aly-consumption-sync-meta-ea-test': {
            cost: 0.00001775444878472222,
          },
          'eashardmap_e706a119-f41f-4e30-9271-42de678f981c': {
            cost: 0.384512939453125,
          },
          'cloud-consumption-ea-prod': {
            cost: 0.000005810546875,
          },
          'Management Tools - AWS CloudTrail Free Events Recorded': {
            cost: 0,
          },
          'mgmt-acm-prod': {
            cost: 0.000139453125,
          },
          'eashardmap_1543ffee-9eff-4a72-a1b3-817f34a29ae2': {
            cost: 1.213470735677083,
          },
          'cspshardmap_35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000012428114149305554,
          },
          'swo-marketplace-contracts-prod': {
            cost: 0.000100716145833333,
          },
          connections: {
            cost: 0.03183203722909093,
          },
          'tellurium-test': {
            cost: 0.11363331434461804,
          },
          'cloud-workspace-prod': {
            cost: 0.000108463541666667,
          },
          'EU-VendedLog-Bytes': {
            cost: 0,
          },
          'Data Transfer': {
            cost: 0.04512468820000003,
          },
          'cloud-workspace-test': {
            cost: 0.00002598605685763889,
          },
          'customer-support-prod': {
            cost: 0.214575748697917,
          },
          'Sending Email': {
            cost: 1.8674927114999997,
          },
          'aly-consumption-aws-prod': {
            cost: 53.143099023437514,
          },
          'EUC1-ConfigRuleEvaluations': {
            cost: 0,
          },
          'cloudazureshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00011879340277777779,
          },
          'customer-solutions': {
            cost: 0.00106139322916667,
          },
          'emerald-storage-tcs': {
            cost: 14.96697837456596,
          },
          'Data Payload': {
            cost: 2.659206921,
          },
          'reportingenginedb-test': {
            cost: 0.00006310899522569444,
          },
          'gpm-customeronboarding-prod': {
            cost: 0.0000658528645833333,
          },
          namespaces: {
            cost: 57.847920780645154,
          },
          'customer-support-test': {
            cost: 0.0022515062120225695,
          },
          fogtest: {
            cost: 0.000010670572916666666,
          },
          'eashardmap_c204d440-36ba-44c9-acfa-a9ba1b66db92': {
            cost: 0.03157451171875,
          },
          'eashardmap_c5ea8285-6825-4842-94d2-c309ed449796': {
            cost: 1.335203629557292,
          },
          'int-cco-prod-demo': {
            cost: 0.00990149468315972,
          },
          'trackit-test': {
            cost: 0.00209324951171875,
          },
          'trackit-prod': {
            cost: 0.00792752278645833,
          },
          'int-creditcard-test': {
            cost: 0.0019322489420572915,
          },
          'EU-CW:Requests': {
            cost: 0,
          },
          'cloud-consumption-office-prod': {
            cost: 0.000098779296875,
          },
          'dwh-prod': {
            cost: 4.12214915364583,
          },
          'identitymanagementdb-qa': {
            cost: 0.000019852701822916666,
          },
          'USE1-PaidEventsAnalyzed': {
            cost: 0,
          },
          accounts: {
            cost: 39.1137069803,
          },
          'EU-AttachmentsSize-Bytes': {
            cost: 0,
          },
          'fwk-shard-map-prod': {
            cost: 0.000214990234375,
          },
          'collab-prod': {
            cost: 0.019941796875,
          },
          'IP Address': {
            cost: 66.69040000000011,
          },
          'EUC1-Crawler-DPU-Hour': {
            cost: 0,
          },
          'csp-backoffice-configurations-test': {
            cost: 0.000015979003906250002,
          },
          metricalerts: {
            cost: 2.334677419354819,
          },
          'swo-marketplace-order-manager-test': {
            cost: 0.0011043267144097222,
          },
          'spotlightkj-test': {
            cost: 0.000012993028428819444,
          },
          sqlserverinstances: {
            cost: 0,
          },
          'awsshardmap-35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.00001436496310763889,
          },
          'fwk-shard-map-coordinator-test': {
            cost: 0.00001880357530381944,
          },
          nlpsql_analytics_scheduler_kj: {
            cost: 0.00137903645833333,
          },
          'APS2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          profiles: {
            cost: 21.087715804646432,
          },
          'csp-contracts-prod': {
            cost: 0.00157078450520833,
          },
          'csp-backoffice-prices-prod': {
            cost: 0.000282779947916667,
          },
          'sub-mgr-test': {
            cost: 0.0004788859049479167,
          },
          'cloud-consumption-office-test': {
            cost: 0.000021305338541666665,
          },
          'eashardmap_b18289b7-cf8f-4e13-971c-9e5b1c0c020e': {
            cost: 0.06461328125,
          },
          'sub-mgr-prod': {
            cost: 0.0156632975260417,
          },
          nltapp0127sdb: {
            cost: 0.00011717936197916666,
          },
          'aly-consumption-adobe-prod': {
            cost: 0.000985856119791666,
          },
          'swo-extension-nav-prod': {
            cost: 0.0878883951822916,
          },
          'eashardmap_7e3b2aa9-30f9-4316-8b88-e75303e4def2': {
            cost: 0.220504443359375,
          },
          'swo-extension-nav-test': {
            cost: 0.0016742445203993053,
          },
          'awsshardmap_099fd68f-cdc0-470c-83f7-68274cbee998': {
            cost: 0.328152571614583,
          },
          'eu-west-2-KMS-Requests': {
            cost: 0,
          },
          'fwk-shard-map-coordinator-prod': {
            cost: 0.000137516276041667,
          },
          'USE1-APS2-AWS-Out-Bytes': {
            cost: 0,
          },
          'notificationhubquartzdb-prod': {
            cost: 0.000306022135416667,
          },
          'swo-web-header-prod': {
            cost: 0.00255470377604167,
          },
          'notificationhubquartzdb-test': {
            cost: 0.000059396701388888895,
          },
          'cloudeashardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00002227376302083333,
          },
          'cloud-pricelist-paas-test': {
            cost: 0.00006117214626736111,
          },
          'csp-price-calculation-service-prod': {
            cost: 4.267949332682292,
          },
          'aly-consumption-slm-test': {
            cost: 0.001193502468532986,
          },
          'fwk-iam-test': {
            cost: 0.008068670654296875,
          },
          'EU-Recipients': {
            cost: 0,
          },
          'fwk-iam-prod': {
            cost: 0.00764312879774306,
          },
          'DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'awsshardmap_c445ff59-32a7-4ff7-b325-3d04eb3f4d82': {
            cost: 0.00000193684895833333,
          },
          Dollar: {
            cost: 0,
          },
          'pyracloud-subscriptions_2020-09-29t06-59z': {
            cost: 0.000122021484375,
          },
          'eashardmap_0c1e78e9-1066-4e18-9882-bd123c54a2bd': {
            cost: 2.059854361979167,
          },
          'swo-pyraproxy-prod': {
            cost: 0.364977880859375,
          },
          'cloudofficeshardmap_2b05987e-f9b4-4348-bce0-712d90c48b24': {
            cost: 0.00008723890516493057,
          },
          'csp-backoffice-customers-prod': {
            cost: 0.00224480794270833,
          },
          'eashardmap_2b898fc6-f2f6-4d45-a87a-59c44aa1b4d6': {
            cost: 0.0744834635416667,
          },
          'notifications-management-test': {
            cost: 0.0023778856065538195,
          },
          'gpm-swo-rfx-prod': {
            cost: 0.0000677897135416667,
          },
          'csp-backoffice-customers-test': {
            cost: 0.0005557142469618056,
          },
          'csp-license-assignments-prod': {
            cost: 0.000193684895833333,
          },
          'notifications-management-prod': {
            cost: 0.007001708984375,
          },
          'int-pim-integration-prod': {
            cost: 0.00163663736979167,
          },
          'EUC1-PaidComplianceCheck': {
            cost: 0,
          },
          privatednszones: {
            cost: 0.0867659796893667,
          },
          'cloud-shard-map-coordinator-test': {
            cost: 0.000016705322265624997,
          },
          resources: {
            cost: 0,
          },
          extensiontopics: {
            cost: 0.0085896,
          },
          'swo-marketplace-contracts-test': {
            cost: 0.000027842203776041663,
          },
          searchservices: {
            cost: 104.91799999999998,
          },
          'swo-marketplace-pricemanager': {
            cost: 0.001144677734375,
          },
          'eashardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.02453487277560764,
          },
          'API Request': {
            cost: 0.17105347050000014,
          },
          'pyra-dot-net-templates-test': {
            cost: 0.000016705322265624997,
          },
          'eashardmap_1d9e10e9-e0d9-49bc-8362-4635af48e3b0': {
            cost: 0.0215435709635417,
          },
          privateendpoints: {
            cost: 1.5210916666666667,
          },
          GuardDuty: {
            cost: 0.047848,
          },
          backupvaults: {
            cost: 0.16733473599999996,
          },
          'pyracloud-subscriptions_2020-09-29t08-59z': {
            cost: 0.000110400390625,
          },
          workflows: {
            cost: 0.9730925871192138,
          },
          Serverless: {
            cost: 0.0015641189999999999,
          },
          'swo-digital-assessments-prod': {
            cost: 0.00113208821614583,
          },
          'swo-digital-assessments-test': {
            cost: 0.00011362847222222223,
          },
          'cloud-platform-test': {
            cost: 0.0001577724880642361,
          },
          partnertopics: {
            cost: 0.11940300000000001,
          },
          'aly-consumption-office365-test': {
            cost: 0.027478560384114583,
          },
          images: {
            cost: 0.0660684,
          },
          'swo-digital-cloud-compatibility': {
            cost: 0.0001924743652343747,
          },
          'mpt-public-catalog-prod': {
            cost: 0.00280455729166667,
          },
          'billing-automation-test_2019-06-25t15-20z': {
            cost: 0.000040835232204861104,
          },
          'cloud-consumption-aws-test': {
            cost: 0.000183758544921875,
          },
          scheduledqueryrules: {
            cost: 2.9410282258064524,
          },
          'cloud-cost-allocation-prod': {
            cost: 0.000131705729166667,
          },
          'EU-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'customeractivation-migration-prod': {
            cost: 0.0007669921875,
          },
          'EUC1-CW:Requests': {
            cost: 0,
          },
          'di-reporting-test': {
            cost: 0.009108546549479167,
          },
          nltsql_analytics_scheduler: {
            cost: 0.00041900499131944445,
          },
          'awsshardmap_d450009c-5886-4703-8e6d-740dbecc21c9': {
            cost: 1.2361783528645869,
          },
          'wrk-management-prod': {
            cost: 0.01056357421875,
          },
          'mpt-extensions-prod': {
            cost: 0.0000309895833333333,
          },
          'eashardmap_3c7b4733-d8c6-4030-8605-e2c2b59f6f45': {
            cost: 0.0519514539930556,
          },
          actiongroups: {
            cost: 0.03958,
          },
          'eashardmap_5aa598f6-990c-4d69-9f5e-1275d34d14e5': {
            cost: 0.2118060546875,
          },
          'renewal-manager-test': {
            cost: 0.014874677191840277,
          },
          'billing-automation-test': {
            cost: 0.0012607272677951388,
          },
          'renewal-manager-prod': {
            cost: 0.47738291015625,
          },
          'EUN1-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'swo-extension-nav-prod_2025-05-07t13-52z': {
            cost: 0.000476295572916667,
          },
          'trx-transactions-overview-prod': {
            cost: 1.78826746419271,
          },
          'pyc-search-test': {
            cost: 0.000021305338541666665,
          },
          'swo-marketplace-order-fulfillment-prod': {
            cost: 0.0507841796875,
          },
          'mpt-helpdesk-prod': {
            cost: 0.000052294921875,
          },
          'swo-pyraproxy-test': {
            cost: 0.012116927083333333,
          },
          'reportingenginequartzdb-test': {
            cost: 0.000023080783420138887,
          },
          Metric: {
            cost: 0.1660924704,
          },
          'gpm-swo-salesprice-prod': {
            cost: 0.06151044921875,
          },
          'eu-west-3-KMS-Requests': {
            cost: 0,
          },
          'swo-portal-prod': {
            cost: 11.9957377983941,
          },
          'awsshardmap_d0bc9c1b-06cf-437f-a37f-a3ad2340ed65': {
            cost: 0.4271623535156253,
          },
          'gpm-providers-adobevipm-test': {
            cost: 0.000023484293619791665,
          },
          'gpm-providers-adobevipm-prod': {
            cost: 0.0000716634114583333,
          },
          'USE1-CostDataStorage': {
            cost: 0,
          },
          'awsshardmap_54286192-fc00-402c-9575-08102633bf40': {
            cost: 0.000130414496527778,
          },
          'aly-consumption-read-ea-test': {
            cost: 0.029987909613715277,
          },
          'mpt-procurement-prod': {
            cost: 0.0000251790364583333,
          },
          'mpt-procurement-test': {
            cost: 0.0009317857530381944,
          },
          'EUW3-Requests-Tier1': {
            cost: 0,
          },
          sites: {
            cost: 0.235993313,
          },
          'csp-subscriptions-prod': {
            cost: 0.004189404296875,
          },
          clusters: {
            cost: 0.089990784,
          },
          signalr: {
            cost: 6.44,
          },
          'CW:Requests': {
            cost: 0,
          },
          'pyracloud-subscriptions_2020-09-29t07-59z': {
            cost: 0.000108463541666667,
          },
          'pyc-simple-test': {
            cost: 0.000020417616102430552,
          },
          'mpt-chat-test': {
            cost: 0.000014203559027777778,
          },
          'aly-consumption-salesforce-test': {
            cost: 0.000019852701822916666,
          },
          'cspshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.0006403706868489584,
          },
          'pyracloud-subscriptions': {
            cost: 0.00192571207682292,
          },
          'mpt-cqr-test': {
            cost: 0.000038979085286458337,
          },
          'user-rank-prod': {
            cost: 0.0785159830729167,
          },
          'eashardmap_14336735-a54e-41c0-8063-856b5379bd1c': {
            cost: 1.7355212565104172,
          },
          'fwk-navision-scope-test': {
            cost: 0.0032148464626736107,
          },
          'gpm-rfx-prod': {
            cost: 0.0000658528645833333,
          },
          'gpm-itemconfiguration-prod': {
            cost: 0.00001162109375,
          },
          'awsshardmap_a0b82f35-ecdf-4392-8eab-c2a7269ebc65': {
            cost: 0.14086274753146702,
          },
          'gpm-rfx-test': {
            cost: 0.00003712293836805555,
          },
          'swo-marketplace-address-book-test': {
            cost: 0.000020417616102430552,
          },
          networkwatchers: {
            cost: 0,
          },
          'swo-web-header-test': {
            cost: 0.00006867743598090278,
          },
          'eashardmap_72016d53-1ba0-4f71-ab9c-0a90df48b048': {
            cost: 0.648102587890625,
          },
          'mpt-module-spotlight-prod': {
            cost: 0.000730192057291667,
          },
          'EUW1-BilledBytes': {
            cost: 0,
          },
          natgateways: {
            cost: 339.62872069835197,
          },
          trafficmanagerprofiles: {
            cost: 0.7823710883870986,
          },
          virtualmachinescalesets: {
            cost: 946.8550388453222,
          },
          'mpt-chat-prod': {
            cost: 0.0000387369791666667,
          },
          'csp-price-calculation-service-test': {
            cost: 0.0004403103298611111,
          },
          'cloud-shard-map-coordinator-prod': {
            cost: 0.000102652994791667,
          },
          'mpt-currency-test': {
            cost: 0.000038979085286458337,
          },
          'cloud-cost-allocation-test': {
            cost: 0.00013431179470486113,
          },
          'eashardmap_37dd1f9c-8205-440f-87f3-da1fb808b40c': {
            cost: 0.196196988932292,
          },
          'fwk-feature-toggle-prod': {
            cost: 0.000211116536458333,
          },
          'int-pim-integration-test': {
            cost: 0.0000742458767361111,
          },
          'marketplace-pim-prod': {
            cost: 0.0510998860677083,
          },
          'cloud-shard-map-test': {
            cost: 0.00001484917534722222,
          },
          'cloud-consumption-aws-prod': {
            cost: 0.00010458984375,
          },
          'lic-esd-prod': {
            cost: 0.0064200227864583395,
          },
          'cloud-shard-map-prod': {
            cost: 0.000108463541666667,
          },
          'mpt-extensions-test': {
            cost: 0.000040835232204861104,
          },
          'lic-esd-test': {
            cost: 0.0007962063259548611,
          },
          'Business Analytics': {
            cost: 3.6000000288,
          },
          sonarqube: {
            cost: 0.0499493977864583,
          },
          'auth-api-prod': {
            cost: 0.00208792317708333,
          },
          'igrt-mgr-tracking-test': {
            cost: 0.00013735487196180556,
          },
          'mpt-module-billing-prod': {
            cost: 0.132417521158854,
          },
          bastionhosts: {
            cost: 4.371473162629642,
          },
          applicationgateways: {
            cost: 427.9166426843553,
          },
          Bucket: {
            cost: 528.4668155891541,
          },
          'lic-mgr-gus-prod': {
            cost: 0.000133642578125,
          },
          vaults: {
            cost: 35.19160838510236,
          },
          'aly-consumption-virtual-test': {
            cost: 0.00014663560655381945,
          },
          'eashardmap_7e23f6f5-a875-4963-af34-29ed1d4ae24d': {
            cost: 0.146400602213542,
          },
          'mpt-tasks-test': {
            cost: 0.000029698350694444448,
          },
          'aly-consumption-virtual-prod': {
            cost: 0.317757503255208,
          },
          networksecuritygroups: {
            cost: 0.06705040382221344,
          },
          dnszones: {
            cost: 0.4675192516129028,
          },
          'gpm-providers-mscsp-prod': {
            cost: 0.000224674479166667,
          },
          'auth-api-test': {
            cost: 0.00012024603949652778,
          },
          nlpsql_analytics_scheduler: {
            cost: 0.0107417643229167,
          },
          service: {
            cost: 258.8372002609998,
          },
          'wrk-management-test': {
            cost: 0.0031406005859375,
          },
          'gpm-swo-rfx-test': {
            cost: 0.00007610202365451389,
          },
          'eashardmap_eeb8bf9d-55d9-4fa3-ae6b-2d42c25df109': {
            cost: 1.7181151529947933,
          },
          'USE1-Reader-Enterprise-Month': {
            cost: 0,
          },
          grafana: {
            cost: 14.418,
          },
          'products-catalog-api-test': {
            cost: 0.00007537570529513889,
          },
          'eashardmap_2c8c5274-a7cf-477f-a877-977f00622a4c': {
            cost: 1.08351204427083,
          },
          'swo-digital-maturity-calculator-test': {
            cost: 0.000021305338541666665,
          },
          elasticpools: {
            cost: 644.9194930750261,
          },
          'cloud-platform-prod': {
            cost: 0.00695328776041666,
          },
          publicipprefixes: {
            cost: 25.728,
          },
          'cloud-consumption-azure-test': {
            cost: 0.00816527099609375,
          },
          'awsshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
            cost: 0.00017754448784722222,
          },
          'Global-SoftwareUsage-Contracts': {
            cost: 3139.2650273224044,
          },
          'swo-digital-maturity-calculator-prod': {
            cost: 0.000133642578125,
          },
          'cloud-consumption-azure-prod': {
            cost: 0.0220471516927083,
          },
          'eashardmap_c7242070-60da-4c92-bc34-8b1a34c50a01': {
            cost: 8.59747303059896,
          },
          staticsites: {
            cost: 7.0003158679178075,
          },
          'awsshardmap_ca4ef284-5503-4019-a176-7b079926439a': {
            cost: 0.258573209635417,
          },
          Alarm: {
            cost: 0.0473690856,
          },
          'swo-platform-test': {
            cost: 0.00563340589735243,
          },
          'gpp-identity-prod': {
            cost: 0.000163986545138889,
          },
          'int-config-test': {
            cost: 0.000046161566840277774,
          },
          'aly-consumption-slm-prod': {
            cost: 0.1009873046875,
          },
          'Requests-Tier8': {
            cost: 0.00009,
          },
          'eashardmap_0da2a725-c790-4d1f-b155-080817a86035': {
            cost: 0.0456747721354167,
          },
          'gpm-authorization-prod': {
            cost: 0.0000716634114583334,
          },
          'swo-platform-prod_2025-05-07t12-43z': {
            cost: 0.00116503255208333,
          },
          'csp-orders-test': {
            cost: 0.00005197211371527778,
          },
          'pyra-dot-net-templates-prod': {
            cost: 0.000147200520833333,
          },
          'exp-global-search-prod': {
            cost: 0.000672086588541667,
          },
          'AWS Security Hub - Standards': {
            cost: 0.14872220279999998,
          },
          slots: {
            cost: 0.006419120999999999,
          },
          'aly-consumption-ea-test': {
            cost: 0.12666438910590277,
          },
          'swo-digital-recommendations-prod-restored': {
            cost: 0.000017431640625,
          },
          'ap-southeast-1-KMS-Requests': {
            cost: 0,
          },
          'swo-platform-performace_2024-06-28t10-29z': {
            cost: 0.000517037760416667,
          },
          'EU-Requests-Tier2': {
            cost: 0,
          },
          'exp-global-search-test': {
            cost: 0.000024129909939236108,
          },
          'csp-billing-automation-test': {
            cost: 0.009520177544487845,
          },
          'swo-platform-prod_2024-06-26t22-03z': {
            cost: 0.000489876302083333,
          },
          'eashardmap_35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
            cost: 0.000016705322265624997,
          },
          'eashardmap_ee859c36-53ff-4440-bd50-4d8da7e70412': {
            cost: 0.00837687174479167,
          },
          'cloud-pricelist-saas': {
            cost: 0.0000949055989583333,
          },
          'cloud-pricelist-paas': {
            cost: 0.0002556640625,
          },
          'Metric Streams': {
            cost: 0.13230899999999998,
          },
          virtualnetworkgateways: {
            cost: 24.72,
          },
          'int-config-prod': {
            cost: 0.00191941731770833,
          },
          'aly-pricelist-test': {
            cost: 0.10340723605685763,
          },
          'gpm-authorization-test': {
            cost: 0.000024129909939236108,
          },
          'dwh-test': {
            cost: 0.42471837293836806,
          },
          'eashardmap_54286192-fc00-402c-9575-08102633bf40': {
            cost: 0.000156884765625,
          },
          'awsshardmap-26517465236498': {
            cost: 0.000016705322265624997,
          },
          'csp-orders-prod': {
            cost: 0.00208986002604167,
          },
          'Management Tools - AWS Config Rules': {
            cost: 0.035,
          },
          Storage: {
            cost: 1.1592296667,
          },
          chtvs00471_cpx_full_202109262000: {
            cost: 0.00001775444878472222,
          },
          'aly-consumption-ea-prod': {
            cost: 27.65994435221359,
          },
          'gpp-identity-test': {
            cost: 0.000033733452690972216,
          },
          'mpt-catalog-prod': {
            cost: 0.0000697265625,
          },
          'issue-detection-engine-prod': {
            cost: 0.000218863932291667,
          },
          redis: {
            cost: 47.955000000000005,
          },
          'swo-platform-prod': {
            cost: 0.047257177734375,
          },
          factories: {
            cost: 8.4008675,
          },
          'fwk-feature-toggle-test': {
            cost: 0.00003712293836805555,
          },
          'USE2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'aly-cloud-utilization-prod': {
            cost: 2.32799173177083,
          },
          'mpt-module-billing-prod-debug-1': {
            cost: 0.00229322916666667,
          },
          'gpm-subscriptions-prod': {
            cost: 0.0000154947916666667,
          },
          AWSSupportEnterprise: {
            cost: 537.9426666666667,
          },
          'Savings Plan': {
            cost: 4290.815894511799,
          },
          'products-catalog-api-prod': {
            cost: 0.00024404296875,
          },
          'mpt-tasks-prod': {
            cost: 0.0000503580729166667,
          },
          configurationstores: {
            cost: 8.4,
          },
          'nltdb-csp-import-test': {
            cost: 0.004824125840928819,
          },
          'mpt-module-billing-test': {
            cost: 0.008093204074435765,
          },
          'igrt-mgr-tracking-prod': {
            cost: 0.000970361328125,
          },
          identitymanagementdb: {
            cost: 0.05650716484917538,
          },
          Volume: {
            cost: 139.82793653859997,
          },
          'nltdb-csp-import-prod': {
            cost: 16.09131209309896,
          },
          'mpt-currency-prod': {
            cost: 0.0000503580729166667,
          },
          'aly-invoice-automation-prod': {
            cost: 0.0001626953125,
          },
          'Load Balancer': {
            cost: 21.715080396854322,
          },
          'cspshardmap_72ce77e7-2041-4f5d-3a72-08da26e48a74': {
            cost: 0.446184147135417,
          },
          'eashardmap_7f75776e-89af-413b-88a2-28593e2ac6b2': {
            cost: 2.00534562174479,
          },
          'aly-consumption-aws-test': {
            cost: 0.01711738688151042,
          },
          'cspshardmap_986dcd1f-43af-4ee7-9dbd-11411d7c399d': {
            cost: 0.315706380208333,
          },
          pools: {
            cost: 0.68401368,
          },
          'Storage Snapshot': {
            cost: 0.000006385000000000001,
          },
          Instance: {
            cost: 325.63965698785853,
          },
          'swo-marketplace-address-book-prod': {
            cost: 0.0000716634114583334,
          },
          'eashardmap_e3c55fc0-e7ce-48fd-a244-8afd1041d843': {
            cost: 0.0636177408854167,
          },
          'AWS Glue': {
            cost: 0.09983116,
          },
          servers: {
            cost: 2.358870967741937,
          },
          'APN3-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'user-rank-test': {
            cost: 0.0008983751085069445,
          },
          'trackit-test-integrationtest': {
            cost: 0.000031958007812500004,
          },
          enterprisearchitect: {
            cost: 0.00346260172526042,
          },
          'fwk-shard-map-test': {
            cost: 0.000040835232204861104,
          },
          'eashardmap_f60ce9fd-154d-427d-bf91-2e4b42dd86c4': {
            cost: 0.254712101236979,
          },
          'mpt-module-spotlight-test': {
            cost: 0.00007101779513888888,
          },
          pricings: {
            cost: 57.59664,
          },
          components: {
            cost: 0.186532410162514,
          },
          'csp-contracts-test': {
            cost: 0.00006117214626736111,
          },
          'fwk-navision-scope-prod': {
            cost: 0.264188134765625,
          },
          'EUC1-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          ssisdb: {
            cost: 0.000024129909939236108,
          },
          'market-shop-prod': {
            cost: 0.0732167643229167,
          },
          'int-creditcard-prod': {
            cost: 0.00312801106770833,
          },
          'swo-marketplace-order-manager-prod': {
            cost: 0.000110400390625,
          },
          'csp-backoffice-configurations-prod': {
            cost: 0.0001626953125,
          },
          'risk-product-lifecyle-db-prod': {
            cost: 0.000211116536458333,
          },
          'aly-consumption-adobe-test': {
            cost: 0.0002969835069444444,
          },
          'collab-test': {
            cost: 0.002323895941840278,
          },
          containerapps: {
            cost: 13.495926,
          },
          'awsshardmap_b4fd484f-d43c-4162-a1ea-83e4b103b46e': {
            cost: 2.781241503906253,
          },
          managedclusters: {
            cost: 4.799533478322029,
          },
          azurefirewalls: {
            cost: 60.07961200691946,
          },
          'swo-marketplace-checkout-prod': {
            cost: 0.000110400390625,
          },
          'csp-backoffice-prices-test': {
            cost: 0.00003712293836805555,
          },
          'Kinesis Firehose': {
            cost: 0.0006070947,
          },
          'awsshardmap_d7275497-ac0b-411b-9396-d98d1c26f634': {
            cost: 0.844009049479166,
          },
          'swo-digital-recommendations-test': {
            cost: 0.000016705322265624997,
          },
          'customer-solutions-test': {
            cost: 0.00027696940104166663,
          },
          samdatawarehouse: {
            cost: 0.0737784505208333,
          },
          'swo-portal-test': {
            cost: 0.14085370890299478,
          },
          'csp-subscriptions-test': {
            cost: 0.00019303927951388886,
          },
          'gpm-swo-salesprice-test': {
            cost: 0.018485367160373262,
          },
          'risk-profiler-reports-db-prod': {
            cost: 0.000472591145833333,
          },
          jobagents: {
            cost: 0.9119999999999999,
          },
          'bot-test': {
            cost: 0.00002227376302083333,
          },
          'aly-consumption-ea-integrationtest': {
            cost: 0.00002598605685763889,
          },
          registries: {
            cost: 22.58226711713312,
          },
          'gpm-customeronboarding-test': {
            cost: 0.000020417616102430552,
          },
          'fwk-proxy-identity-provider-prod': {
            cost: 0.000404801432291667,
          },
          'mpt-helpdesk-test': {
            cost: 0.000014849175347222224,
          },
          'pyracloud-subscriptions-restore': {
            cost: 0.00014558648003472222,
          },
          'awsshardmap_c6469e97-302a-408a-8589-2122a0bb725d': {
            cost: 0.00191360677083333,
          },
          'eashardmap_ac7850af-21d1-4ebd-8c22-b475e5d40978': {
            cost: 0.8293761555989589,
          },
          'swo-marketplace-order-fulfillment-test': {
            cost: 0.007194425455729167,
          },
        },
        '1762992000': {
          serverfarms: {
            cost: 45.177716925000006,
          },
          inboundendpoints: {
            cost: 2.5,
          },
          'EUC1-Requests-Tier8': {
            cost: 0.00006,
          },
          'EU-Lambda-GB-Second': {
            cost: 0,
          },
          'EU-Recipients': {
            cost: 0,
          },
          'aly-consumption-office365-prod': {
            cost: 0.681167989095052,
          },
          elasticpools: {
            cost: 122.91811498321528,
          },
          'EUN1-Requests-Tier1': {
            cost: 0,
          },
          'APS3-Requests-Tier1': {
            cost: 0,
          },
          'swo-digital-maturity-calculator-prod': {
            cost: 0.0000278422037760417,
          },
          'cloud-consumption-azure-prod': {
            cost: 0.00551178792317708,
          },
          'eashardmap_f67f6315-1523-4bbb-bab4-ff7aea5e2bca': {
            cost: 0.3774572408040361,
          },
          'APN2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'Management Tools - AWS CloudTrail Free Events Recorded': {
            cost: 0,
          },
          'AWS Security Hub - Standards': {
            cost: 0.0743611014,
          },
          databaseaccounts: {
            cost: 0,
          },
          'swo-digital-recommendations-prod': {
            cost: 0.000158821614583333,
          },
          'billing-automation-prod': {
            cost: 0.00253969319661458,
          },
          'USE1-EUW2-AWS-Out-Bytes': {
            cost: 0,
          },
          'EUC1-EC2SP:t3a.1yrNoUpfront': {
            cost: 0,
          },
          'di-reporting-prod': {
            cost: 0.34165234375,
          },
          workspaces: {
            cost: 145.61228511423,
          },
          'bot-prod': {
            cost: 0.0000568949381510417,
          },
          'pyc-search-prod': {
            cost: 0.00098779296875,
          },
          Snapshot: {
            cost: 0.23531149999999998,
          },
          'notifications-management-prod': {
            cost: 0.00145868937174479,
          },
          USSalesTax: {
            cost: 0.011666666666666665,
          },
          'lic-esd-prod': {
            cost: 0.001337504747178816,
          },
          'awsshardmap_878761c0-f03f-4fb9-89cc-001df25f0b58': {
            cost: 2.6924941162109377,
          },
          'cloud-shard-map-prod': {
            cost: 0.0000271158854166667,
          },
          'aly-pricelist-prod': {
            cost: 0.765778267415365,
          },
          'marketplace-pim-prod': {
            cost: 0.0127749715169271,
          },
          'csp-billing-automation-prod': {
            cost: 0.2873236341688366,
          },
          flexibleservers: {
            cost: 9.120303000245968,
          },
          databases: {
            cost: 49.871166668334375,
          },
          'eashardmap_e706a119-f41f-4e30-9271-42de678f981c': {
            cost: 0.0987289388020833,
          },
          'cloud-consumption-ea-prod': {
            cost: 0.00000145263671875,
          },
          'USE1-Reader-Enterprise-Month': {
            cost: 0,
          },
          'eashardmap_1543ffee-9eff-4a72-a1b3-817f34a29ae2': {
            cost: 0.30336768391927105,
          },
          'csp-backoffice-customers-prod': {
            cost: 0.000561201985677083,
          },
          'aly-consumption-virtual-prod': {
            cost: 0.07943937581380205,
          },
          partnertopics: {
            cost: 0.0126702,
          },
          connections: {
            cost: 0.0085,
          },
          'EU-VendedLog-Bytes': {
            cost: 0,
          },
          'EU-CW:Requests': {
            cost: 0,
          },
          'EUC1-ConfigRuleEvaluations': {
            cost: 0,
          },
          'aly-consumption-aws-prod': {
            cost: 11.462035436333549,
          },
          'customer-solutions': {
            cost: 0.00027164306640625,
          },
          'swo-extension-nav-prod': {
            cost: 0.0219720987955729,
          },
          'emerald-storage-tcs': {
            cost: 3.016391672770187,
          },
          'eashardmap_c204d440-36ba-44c9-acfa-a9ba1b66db92': {
            cost: 0.0078936279296875,
          },
          'gpm-rfx-prod': {
            cost: 0.0000137193467881944,
          },
          'gpm-customeronboarding-prod': {
            cost: 0.0000137193467881944,
          },
          namespaces: {
            cost: 12.5552712,
          },
          'eashardmap_c5ea8285-6825-4842-94d2-c309ed449796': {
            cost: 0.3160473463270399,
          },
          'int-cco-prod-demo': {
            cost: 0.00249514567057292,
          },
          'gpm-providers-adobevipm-prod': {
            cost: 0.0000179158528645833,
          },
          'dwh-prod': {
            cost: 1.03053728841146,
          },
          'EU-AttachmentsSize-Bytes': {
            cost: 0,
          },
          'fwk-shard-map-prod': {
            cost: 0.0000358317057291667,
          },
          'collab-prod': {
            cost: 0.00498544921875,
          },
          'USE1-PaidEventsAnalyzed': {
            cost: 0,
          },
          accounts: {
            cost: 5.9279326039999996,
          },
          'swo-marketplace-contracts-prod': {
            cost: 0.0000209825303819444,
          },
          'IP Address': {
            cost: 10.011800000000001,
          },
          profiles: {
            cost: 6.974593791020112,
          },
          'csp-contracts-prod': {
            cost: 0.000392696126302083,
          },
          'APS2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'mpt-procurement-prod': {
            cost: 0.00000629475911458333,
          },
          'eashardmap_b18289b7-cf8f-4e13-971c-9e5b1c0c020e': {
            cost: 0.0137960137261285,
          },
          'csp-backoffice-prices-prod': {
            cost: 0.0000589124891493056,
          },
          'aly-consumption-adobe-prod': {
            cost: 0.000246464029947917,
          },
          'eashardmap_7e3b2aa9-30f9-4316-8b88-e75303e4def2': {
            cost: 0.0551261108398438,
          },
          'awsshardmap_099fd68f-cdc0-470c-83f7-68274cbee998': {
            cost: 0.0699359842936198,
          },
          'USE1-APS2-AWS-Out-Bytes': {
            cost: 0,
          },
          'swo-web-header-prod': {
            cost: 0.000673055013020833,
          },
          'DataTransfer-Out-Bytes': {
            cost: 0,
          },
          Dollar: {
            cost: 0,
          },
          searchservices: {
            cost: 16.869999999999997,
          },
          'swo-marketplace-customer-prod': {
            cost: 0.0000209825303819444,
          },
          'USE1-EU-AWS-Out-Bytes': {
            cost: 0,
          },
          'csp-price-calculation-service-prod': {
            cost: 1.066987333170573,
          },
          'pyracloud-subscriptions_2020-09-29t06-59z': {
            cost: 0.0000203369140625,
          },
          'eashardmap_0c1e78e9-1066-4e18-9882-bd123c54a2bd': {
            cost: 0.42913632541232605,
          },
          'awsshardmap_c445ff59-32a7-4ff7-b325-3d04eb3f4d82': {
            cost: 4.84212239583333e-7,
          },
          'swo-pyraproxy-prod': {
            cost: 0.0760370585123698,
          },
          'fwk-shard-map-coordinator-prod': {
            cost: 0.0000286492241753472,
          },
          'eu-west-2-KMS-Requests': {
            cost: 0,
          },
          'gpm-swo-rfx-prod': {
            cost: 0.0000141228569878472,
          },
          'mgmt-acm-prod': {
            cost: 0.00003486328125,
          },
          'eashardmap_2b898fc6-f2f6-4d45-a87a-59c44aa1b4d6': {
            cost: 0.0155173882378472,
          },
          privatednszones: {
            cost: 0.02419354838709677,
          },
          'EUC1-PaidComplianceCheck': {
            cost: 0,
          },
          'int-pim-integration-prod': {
            cost: 0.000409159342447917,
          },
          extensiontopics: {
            cost: 0.0011814,
          },
          'EUC1-Requests': {
            cost: 0,
          },
          'API Request': {
            cost: 0.028496178400000037,
          },
          'Savings Plan': {
            cost: 4290.815678882999,
          },
          'eashardmap_1d9e10e9-e0d9-49bc-8362-4635af48e3b0': {
            cost: 0.00448824395073785,
          },
          privateendpoints: {
            cost: 0.42,
          },
          GuardDuty: {
            cost: 0.01124,
          },
          AWSSupportEnterprise: {
            cost: 537.9426666666667,
          },
          workflows: {
            cost: 0.29494365623737656,
          },
          'Data Transfer': {
            cost: 0.011029498700000008,
          },
          Serverless: {
            cost: 0.0004562742,
          },
          'pyracloud-subscriptions_2020-09-29t08-59z': {
            cost: 0.0000230000813802083,
          },
          'trx-transactions-overview-prod': {
            cost: 0.447066866048177,
          },
          'customer-support-prod': {
            cost: 0.0536439371744792,
          },
          identitymanagementdb: {
            cost: 0.0113713209364149,
          },
          'Sending Email': {
            cost: 0.2408968448,
          },
          'swo-digital-cloud-compatibility': {
            cost: 0.0000411580403645833,
          },
          nlpsql_analytics_scheduler_kj: {
            cost: 0.000344759114583333,
          },
          scheduledqueryrules: {
            cost: 0.7557683691756268,
          },
          'mpt-public-catalog-prod': {
            cost: 0.000701139322916667,
          },
          'cloud-cost-allocation-prod': {
            cost: 0.0000274386935763889,
          },
          'cloud-pricelist-saas': {
            cost: 0.0000197719997829861,
          },
          'cloud-pricelist-paas': {
            cost: 0.000063916015625,
          },
          'customeractivation-migration-prod': {
            cost: 0.0001597900390625,
          },
          'EU-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'wrk-management-prod': {
            cost: 0.0026408935546875,
          },
          'awsshardmap_d450009c-5886-4703-8e6d-740dbecc21c9': {
            cost: 0.29967782524956627,
          },
          'mpt-extensions-prod': {
            cost: 0.00000774739583333334,
          },
          'cloud-consumption-office-prod': {
            cost: 0.00002469482421875,
          },
          images: {
            cost: 0.0236043,
          },
          'eashardmap_3c7b4733-d8c6-4030-8605-e2c2b59f6f45': {
            cost: 0.0109080912272135,
          },
          'EUN1-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'eashardmap_5aa598f6-990c-4d69-9f5e-1275d34d14e5': {
            cost: 0.0441262613932292,
          },
          'swo-extension-nav-prod_2025-05-07t13-52z': {
            cost: 0.000119073893229167,
          },
          'mpt-helpdesk-prod': {
            cost: 0.000010894775390625,
          },
          'swo-portal-prod': {
            cost: 2.9873679911295543,
          },
          'gpm-swo-salesprice-prod': {
            cost: 0.0128146769205729,
          },
          redis: {
            cost: 7.780000000000001,
          },
          'awsshardmap_d0bc9c1b-06cf-437f-a37f-a3ad2340ed65': {
            cost: 0.097900774468316,
          },
          'trackit-prod': {
            cost: 0.00198188069661458,
          },
          'awsshardmap_54286192-fc00-402c-9575-08102633bf40': {
            cost: 0.0000329264322916667,
          },
          'EUW3-Requests-Tier1': {
            cost: 0,
          },
          trafficmanagerprofiles: {
            cost: 0.20962424903225801,
          },
          'sub-mgr-prod': {
            cost: 0.00391582438151042,
          },
          clusters: {
            cost: 0.026223011999999997,
          },
          'user-rank-prod': {
            cost: 0.0163574964735243,
          },
          metricalerts: {
            cost: 0.5263440860215016,
          },
          'pyracloud-subscriptions_2020-09-29t07-59z': {
            cost: 0.0000271158854166667,
          },
          'CW:Requests': {
            cost: 0,
          },
          'Load Balancer': {
            cost: 3.5680548986699434,
          },
          'nltdb-csp-import-prod': {
            cost: 3.492247619628901,
          },
          Metric: {
            cost: 0.0129035392,
          },
          pools: {
            cost: 0.28500228,
          },
          'cloud-workspace-prod': {
            cost: 0.0000271158854166667,
          },
          'eu-west-3-KMS-Requests': {
            cost: 0,
          },
          'swo-marketplace-order-fulfillment-prod': {
            cost: 0.012696044921875,
          },
          'pyracloud-subscriptions': {
            cost: 0.000366387261284722,
          },
          'eashardmap_14336735-a54e-41c0-8063-856b5379bd1c': {
            cost: 0.373382352701823,
          },
          networkwatchers: {
            cost: 0,
          },
          'csp-subscriptions-prod': {
            cost: 0.000698234049479167,
          },
          'awsshardmap_a0b82f35-ecdf-4392-8eab-c2a7269ebc65': {
            cost: 0.0352119140625,
          },
          'gpm-itemconfiguration-prod': {
            cost: 0.00000242106119791667,
          },
          'EUW1-BilledBytes': {
            cost: 0,
          },
          natgateways: {
            cost: 63.7617008688302,
          },
          'Data Payload': {
            cost: 0.5992136097999999,
          },
          'eashardmap_72016d53-1ba0-4f71-ab9c-0a90df48b048': {
            cost: 0.1402399698893232,
          },
          'mpt-module-spotlight-prod': {
            cost: 0.000152123345269097,
          },
          virtualmachinescalesets: {
            cost: 193.0976477832357,
          },
          'risk-product-lifecyle-db-prod': {
            cost: 0.0000439826117621528,
          },
          'eashardmap_37dd1f9c-8205-440f-87f3-da1fb808b40c': {
            cost: 0.0408743726942274,
          },
          'fwk-feature-toggle-prod': {
            cost: 0.0000439826117621528,
          },
          'cloud-shard-map-coordinator-prod': {
            cost: 0.0000256632486979167,
          },
          'cloud-consumption-aws-prod': {
            cost: 0.0000261474609375,
          },
          containerapps: {
            cost: 0.8018097,
          },
          sonarqube: {
            cost: 0.0122805908203125,
          },
          'Business Analytics': {
            cost: 0.6000000048,
          },
          'swo-marketplace-checkout-prod': {
            cost: 0.0000230000813802083,
          },
          'lic-mgr-gus-prod': {
            cost: 0.0000278422037760417,
          },
          applicationgateways: {
            cost: 66.71744875720144,
          },
          'Global-SoftwareUsage-Contracts': {
            cost: 3139.2650273224044,
          },
          'mpt-module-billing-prod': {
            cost: 0.0339631306966146,
          },
          dnszones: {
            cost: 0.1232025720430108,
          },
          'eashardmap_7e23f6f5-a875-4963-af34-29ed1d4ae24d': {
            cost: 0.0305001254611545,
          },
          'exp-global-search-prod': {
            cost: 0.000140018039279514,
          },
          nlpsql_analytics_scheduler: {
            cost: 0.00223786756727431,
          },
          'gpm-providers-mscsp-prod': {
            cost: 0.0000468071831597222,
          },
          'eashardmap_eeb8bf9d-55d9-4fa3-ae6b-2d42c25df109': {
            cost: 0.2864335652669267,
          },
          service: {
            cost: 58.62280017399999,
          },
          'int-cco-prod': {
            cost: 0.0831081712510851,
          },
          'eashardmap_2c8c5274-a7cf-477f-a877-977f00622a4c': {
            cost: 0.225731675889757,
          },
          'gpm-authorization-prod': {
            cost: 0.0000179158528645833,
          },
          grafana: {
            cost: 2.581,
          },
          Bucket: {
            cost: 143.50947648749735,
          },
          'cloud-platform-prod': {
            cost: 0.00144860161675347,
          },
          publicipprefixes: {
            cost: 3.564000000000001,
          },
          'csp-backoffice-invoices-prod': {
            cost: 0.1895482706705732,
          },
          staticsites: {
            cost: 1.1129647370958904,
          },
          'eashardmap_c7242070-60da-4c92-bc34-8b1a34c50a01': {
            cost: 2.0318813401964,
          },
          'awsshardmap_ca4ef284-5503-4019-a176-7b079926439a': {
            cost: 0.0538694186740451,
          },
          'aly-consumption-slm-prod': {
            cost: 0.0210390218098958,
          },
          'gpp-identity-prod': {
            cost: 0.0000355088975694444,
          },
          'eashardmap_0da2a725-c790-4d1f-b155-080817a86035': {
            cost: 0.0095155775282118,
          },
          'pyra-dot-net-templates-prod': {
            cost: 0.0000368001302083333,
          },
          'swo-platform-prod_2025-05-07t12-43z': {
            cost: 0.000242715115017361,
          },
          'swo-digital-recommendations-prod-restored': {
            cost: 0.000003631591796875,
          },
          vaults: {
            cost: 11.297811891675515,
          },
          'risk-profiler-reports-db-prod': {
            cost: 0.000118147786458333,
          },
          'EU-Requests-Tier2': {
            cost: 0,
          },
          'ap-southeast-1-KMS-Requests': {
            cost: 0,
          },
          'swo-platform-performace_2024-06-28t10-29z': {
            cost: 0.000107716200086806,
          },
          'mpt-tasks-prod': {
            cost: 0.0000104912651909722,
          },
          'swo-platform-prod_2024-06-26t22-03z': {
            cost: 0.000102057562934028,
          },
          'gpm-subscriptions-prod': {
            cost: 0.00000387369791666667,
          },
          'eashardmap_ee859c36-53ff-4440-bd50-4d8da7e70412': {
            cost: 0.00209421793619792,
          },
          sites: {
            cost: 0.025035395,
          },
          'int-config-prod': {
            cost: 0.000479854329427083,
          },
          'eashardmap_54286192-fc00-402c-9575-08102633bf40': {
            cost: 0.0000396247016059028,
          },
          'csp-orders-prod': {
            cost: 0.000522465006510417,
          },
          'Management Tools - AWS Config Rules': {
            cost: 0.001,
          },
          'renewal-manager-prod': {
            cost: 0.0994547729492188,
          },
          'issue-detection-engine-prod': {
            cost: 0.0000455966525607639,
          },
          'mpt-catalog-prod': {
            cost: 0.0000145263671875,
          },
          actiongroups: {
            cost: 0.01278,
          },
          'aly-consumption-ea-prod': {
            cost: 6.9149860880533796,
          },
          'igrt-mgr-tracking-prod': {
            cost: 0.000202158610026042,
          },
          'swo-platform-prod': {
            cost: 0.00984524536132812,
          },
          factories: {
            cost: 1.291795,
          },
          Volume: {
            cost: 41.87226726999998,
          },
          'USE2-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'aly-cloud-utilization-prod': {
            cost: 0.484998277452257,
          },
          'Metric Streams': {
            cost: 0.031491,
          },
          virtualnetworkgateways: {
            cost: 8.68,
          },
          backupvaults: {
            cost: 0.04480647200000001,
          },
          'mpt-module-billing-prod-debug-1': {
            cost: 0.000573307291666667,
          },
          'products-catalog-api-prod': {
            cost: 0.0000597195095486111,
          },
          'mpt-chat-prod': {
            cost: 0.00000968424479166666,
          },
          configurationstores: {
            cost: 6,
          },
          'aly-invoice-automation-prod': {
            cost: 0.000040673828125,
          },
          'mpt-currency-prod': {
            cost: 0.0000125895182291667,
          },
          'eashardmap_7f75776e-89af-413b-88a2-28593e2ac6b2': {
            cost: 0.44714151543511305,
          },
          'swo-digital-assessments-prod': {
            cost: 0.000238071017795139,
          },
          'cspshardmap_72ce77e7-2041-4f5d-3a72-08da26e48a74': {
            cost: 0.0929550306532118,
          },
          'cspshardmap_986dcd1f-43af-4ee7-9dbd-11411d7c399d': {
            cost: 0.0657721625434028,
          },
          'swo-marketplace-address-book-prod': {
            cost: 0.0000149298773871528,
          },
          'Storage Snapshot': {
            cost: 3.36e-8,
          },
          Instance: {
            cost: 53.38419689026966,
          },
          'AWS Glue': {
            cost: 0,
          },
          'eashardmap_e3c55fc0-e7ce-48fd-a244-8afd1041d843': {
            cost: 0.0162336995442708,
          },
          networksecuritygroups: {
            cost: 0.00824999716132879,
          },
          pricings: {
            cost: 15.6692,
          },
          enterprisearchitect: {
            cost: 0.000567496744791667,
          },
          'eashardmap_f60ce9fd-154d-427d-bf91-2e4b42dd86c4': {
            cost: 0.0642743326822917,
          },
          servers: {
            cost: 0.32258064516129004,
          },
          'APN3-AWSSecretsManagerAPIRequest': {
            cost: 0,
          },
          'market-shop-prod': {
            cost: 0.0152534925672743,
          },
          'EUC1-DataTransfer-Out-Bytes': {
            cost: 0,
          },
          'fwk-navision-scope-prod': {
            cost: 0.0440313557942708,
          },
          'swo-marketplace-pricemanager': {
            cost: 0.000238474527994792,
          },
          'csp-backoffice-configurations-prod': {
            cost: 0.0000338948567708333,
          },
          'int-creditcard-prod': {
            cost: 0.000782002766927083,
          },
          'swo-marketplace-order-manager-prod': {
            cost: 0.00002760009765625,
          },
          'awsshardmap_b4fd484f-d43c-4162-a1ea-83e4b103b46e': {
            cost: 0.695310375976562,
          },
          managedclusters: {
            cost: 1.304586323564638,
          },
          'csp-license-assignments-prod': {
            cost: 0.0000484212239583333,
          },
          'auth-api-prod': {
            cost: 0.000434983995225694,
          },
          'awsshardmap_d7275497-ac0b-411b-9396-d98d1c26f634': {
            cost: 0.1758352186414931,
          },
          'notificationhubquartzdb-prod': {
            cost: 0.0000637546115451389,
          },
          'Kinesis Firehose': {
            cost: 0.0001367332,
          },
          samdatawarehouse: {
            cost: 0.00971015014648437,
          },
          registries: {
            cost: 4.862308310472169,
          },
          slots: {
            cost: 0.001284381,
          },
          azurefirewalls: {
            cost: 21.274759182015433,
          },
          'fwk-iam-prod': {
            cost: 0.00192716471354167,
          },
          'fwk-proxy-identity-provider-prod': {
            cost: 0.000101765272352431,
          },
          'eashardmap_ac7850af-21d1-4ebd-8c22-b475e5d40978': {
            cost: 0.173806046549479,
          },
          'awsshardmap_c6469e97-302a-408a-8589-2122a0bb725d': {
            cost: 0.000478401692708333,
          },
          Alarm: {
            cost: 0.009868559499999999,
          },
        },
      },
      counts: {
        'USE1-EUW2-AWS-Out-Bytes': {
          total: 0,
          previous_total: 0,
        },
        'billing-automation-prod': {
          total: 0.07458143581814228,
          previous_total: 0.07901843918010736,
        },
        'EUC1-EC2SP:t3a.1yrNoUpfront': {
          total: 0,
          previous_total: 0,
        },
        'nltdb-csp-import-test': {
          total: 0.03202975192599826,
          previous_total: 0.0368095228844646,
        },
        'bot-prod': {
          total: 0.0019120734320746536,
          previous_total: 0.002046343403477823,
        },
        'pyc-search-prod': {
          total: 0.02864599609375,
          previous_total: 0.032763770821957604,
        },
        'di-reporting-prod': {
          total: 9.72321035156252,
          previous_total: 10.086589380784137,
        },
        workspaces: {
          total: 6722.776901876828,
          previous_total: 7654.589960838313,
        },
        'customeractivation-migration-test': {
          total: 0.0002102288140190972,
          previous_total: 0.0002471408857666891,
        },
        'APN2-AWSSecretsManagerAPIRequest': {
          total: 0,
          previous_total: 0,
        },
        'eashardmap_f67f6315-1523-4bbb-bab4-ff7aea5e2bca': {
          total: 13.240173261176192,
          previous_total: 13.410633474042324,
        },
        'swo-digital-recommendations-prod': {
          total: 0.004478559705946179,
          previous_total: 0.004833791862679211,
        },
        databaseaccounts: {
          total: 0.00000109709799289703,
          previous_total: 0,
        },
        'Management Tools - AWS CloudTrail Free Events Recorded': {
          total: 0,
          previous_total: 0,
        },
        'EUC1-Tables-Requests-Tier1': {
          total: 0.00015120000000000002,
          previous_total: 0.00019979999999999998,
        },
        machines: {
          total: 3.8200000000000003,
          previous_total: 4.42,
        },
        'EU-Lambda-GB-Second': {
          total: 0,
          previous_total: 0,
        },
        pools: {
          total: 5.07301596,
          previous_total: 5.4048038400000005,
        },
        'aly-consumption-office365-prod': {
          total: 19.04826017659503,
          previous_total: 20.74187984059105,
        },
        'APS3-Requests-Tier1': {
          total: 0,
          previous_total: 0,
        },
        'EUN1-Requests-Tier1': {
          total: 0,
          previous_total: 0,
        },
        'aly-invoice-automation-test': {
          total: 0.00013993733723958334,
          previous_total: 0.0001715517105594758,
        },
        'Load Balancer': {
          total: 151.1875379824359,
          previous_total: 180.69476882098317,
        },
        'mpt-public-catalog-test': {
          total: 0.005431570095486112,
          previous_total: 0.006412740290378584,
        },
        'nltdb-csp-import-prod': {
          total: 115.38238958943671,
          previous_total: 120.2029032773474,
        },
        'aly-cloud-utilization-test': {
          total: 0.013147572835286458,
          previous_total: 0.015382529922540043,
        },
        serverfarms: {
          total: 1819.346305605,
          previous_total: 2029.58287992,
        },
        'EUC1-Requests-Tier8': {
          total: 0.0025800000000000007,
          previous_total: 0.0033900000000000015,
        },
        'fwk-proxy-identity-provider-test': {
          total: 0.00023573065863715273,
          previous_total: 0.0002731529755404346,
        },
        inboundendpoints: {
          total: 44.5,
          previous_total: 47.419354838709694,
        },
        'cspshardmap_35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
          total: 0.00009377577039930555,
          previous_total: 0.00010918205015120967,
        },
        'eashardmap_1543ffee-9eff-4a72-a1b3-817f34a29ae2': {
          total: 8.842900281439887,
          previous_total: 9.399386430397168,
        },
        flexibleservers: {
          total: 450.4008258171102,
          previous_total: 433.4316550775914,
        },
        'csp-billing-automation-prod': {
          total: 9.21927369384765,
          previous_total: 8.889801495492575,
        },
        databases: {
          total: 1546.7429242547046,
          previous_total: 1777.7574144432042,
        },
        'eashardmap_e706a119-f41f-4e30-9271-42de678f981c': {
          total: 2.7981150899251315,
          previous_total: 3.047770469025645,
        },
        'cloud-consumption-ea-prod': {
          total: 0.00004212646484375001,
          previous_total: 0.00004592206401209678,
        },
        'aly-consumption-sync-meta-ea-test': {
          total: 0.00013525661892361109,
          previous_total: 0.00015690038537466395,
        },
        'aly-pricelist-prod': {
          total: 24.089113605414504,
          previous_total: 25.411748938775844,
        },
        redis: {
          total: 347.62300000000005,
          previous_total: 388.85300000000007,
        },
        'awsshardmap_878761c0-f03f-4fb9-89cc-001df25f0b58': {
          total: 80.86033246256518,
          previous_total: 82.67356494140624,
        },
        'trx-transactions-overview-test': {
          total: 0.49574625583224824,
          previous_total: 0.5611808833952874,
        },
        'trackit-test-integrationtest': {
          total: 0.00022128499348958333,
          previous_total: 0.000266566647765457,
        },
        Snapshot: {
          total: 11.270405052,
          previous_total: 12.4577266786,
        },
        USSalesTax: {
          total: 0.09333333333333332,
          previous_total: 0.24317204301075268,
        },
        'market-shop-test': {
          total: 0.005461429850260416,
          previous_total: 0.012982511130712365,
        },
        namespaces: {
          total: 417.27100746451606,
          previous_total: 462.4770134451612,
        },
        'gpm-customeronboarding-prod': {
          total: 0.0004746893988715275,
          previous_total: 0.0005477299515919017,
        },
        'fwk-shard-map-coordinator-test': {
          total: 0.00012629869249131944,
          previous_total: 0.00015003550539734542,
        },
        'eashardmap_c204d440-36ba-44c9-acfa-a9ba1b66db92': {
          total: 0.2289152099609375,
          previous_total: 0.26878191355496744,
        },
        fogtest: {
          total: 0.000081484375,
          previous_total: 0.00009493211315524194,
        },
        'int-cco-prod-demo': {
          total: 0.06943296847873263,
          previous_total: 0.07632401414002996,
        },
        'eashardmap_c5ea8285-6825-4842-94d2-c309ed449796': {
          total: 9.132157213677303,
          previous_total: 9.78867467356036,
        },
        'risk-profiler-reports-db-prod': {
          total: 0.0033375135633680556,
          previous_total: 0.003556929393481184,
        },
        'swo-extension-nav-prod': {
          total: 0.6300558363172744,
          previous_total: 0.793462860107422,
        },
        identitymanagementdb: {
          total: 0.39152118530273455,
          previous_total: 0.42926924167209224,
        },
        'emerald-storage-tcs': {
          total: 101.85060652804911,
          previous_total: 99.34861527830289,
        },
        'EUC1-ConfigRuleEvaluations': {
          total: 0,
          previous_total: 0,
        },
        'EU-CW:Requests': {
          total: 0,
          previous_total: 0,
        },
        'Savings Plan': {
          total: 34326.52722794929,
          previous_total: 28006.911085844098,
        },
        'aly-consumption-aws-prod': {
          total: 399.07046666666673,
          previous_total: 413.1477289882646,
        },
        'customer-solutions': {
          total: 0.007713743082682299,
          previous_total: 0.008430775500882049,
        },
        'cloudazureshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
          total: 0.0007879747178819444,
          previous_total: 0.0009183579749103941,
        },
        connections: {
          total: 0.25576219025813046,
          previous_total: 0.315875,
        },
        AWSSupportEnterprise: {
          total: 4303.541333333334,
          previous_total: 5296.504301075269,
        },
        'EU-VendedLog-Bytes': {
          total: 0,
          previous_total: 0,
        },
        'reportingenginedb-test': {
          total: 0.0004051242404513888,
          previous_total: 0.00047825330508652553,
        },
        'csp-backoffice-prices-prod': {
          total: 0.001968322753906249,
          previous_total: 0.002165899570697524,
        },
        'eashardmap_b18289b7-cf8f-4e13-971c-9e5b1c0c020e': {
          total: 0.4672881340874565,
          previous_total: 0.5113075798226087,
        },
        'aly-consumption-adobe-prod': {
          total: 0.0069072875976562515,
          previous_total: 0.007586137537802421,
        },
        'csp-backoffice-configurations-test': {
          total: 0.00012250569661458334,
          previous_total: 0.00014362359816028227,
        },
        'swo-marketplace-order-manager-test': {
          total: 0.008231930881076389,
          previous_total: 0.00954522901965726,
        },
        'APS2-AWSSecretsManagerAPIRequest': {
          total: 0,
          previous_total: 0,
        },
        'spotlightkj-test': {
          total: 0.00009563191731770832,
          previous_total: 0.00010957254389280914,
        },
        sqlserverinstances: {
          total: 0,
          previous_total: 0,
        },
        'awsshardmap-35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
          total: 0.00009764946831597221,
          previous_total: 0.00011415954371079748,
        },
        'csp-contracts-prod': {
          total: 0.011080470784505204,
          previous_total: 0.01174036355514253,
        },
        profiles: {
          total: 152.58117805237123,
          previous_total: 171.58747445529553,
        },
        'swo-marketplace-checkout-prod': {
          total: 0.0007958028157552083,
          previous_total: 0.000899799109017977,
        },
        accounts: {
          total: 329.4833333911,
          previous_total: 374.5538376129,
        },
        'cloud-pricelist-paas': {
          total: 0.0018709960937500002,
          previous_total: 0.001974294704861111,
        },
        'USE1-PaidEventsAnalyzed': {
          total: 0,
          previous_total: 0,
        },
        'identitymanagementdb-qa': {
          total: 0.00012734781901041668,
          previous_total: 0.00014909832041750672,
        },
        containerapps: {
          total: 102.40594370000001,
          previous_total: 104.11514623999999,
        },
        'cloud-pricelist-saas': {
          total: 0.0006841111924913193,
          previous_total: 0.0007773402716523853,
        },
        'fwk-shard-map-prod': {
          total: 0.001553837076822917,
          previous_total: 0.0017041459278393809,
        },
        'collab-prod': {
          total: 0.13976624891493072,
          previous_total: 0.1533615202216691,
        },
        'EU-AttachmentsSize-Bytes': {
          total: 0,
          previous_total: 0,
        },
        'tellurium-test': {
          total: 0.7983975477430555,
          previous_total: 0.7401305916078629,
        },
        'IP Address': {
          total: 484.97547777777703,
          previous_total: 551.448468052777,
        },
        'swo-marketplace-contracts-prod': {
          total: 0.0007259955512152754,
          previous_total: 0.0008323556332605271,
        },
        'risk-product-lifecyle-db-prod': {
          total: 0.0015387457953559007,
          previous_total: 0.0016874145726576502,
        },
        'int-creditcard-test': {
          total: 0.01297228800455729,
          previous_total: 0.014910389146155353,
        },
        'dwh-prod': {
          total: 30.17840863511825,
          previous_total: 33.01076238552079,
        },
        'csp-price-calculation-service-prod': {
          total: 31.4510981241862,
          previous_total: 32.20300275292618,
        },
        'aly-consumption-slm-test': {
          total: 0.008258885362413195,
          previous_total: 0.009534763787382392,
        },
        'cloud-pricelist-paas-test': {
          total: 0.00040496283637152773,
          previous_total: 0.00046480990720906146,
        },
        'AWS Security Hub - Standards': {
          total: 1.1191149016,
          previous_total: 0.9917751614000001,
        },
        'swo-marketplace-contracts-test': {
          total: 0.00016923217773437497,
          previous_total: 0.00020732874716481852,
        },
        searchservices: {
          total: 760.5720000000001,
          previous_total: 850.3680000000002,
        },
        'mpt-chat-test': {
          total: 0.00009200032552083332,
          previous_total: 0.0001087290774109543,
        },
        'USE1-APS2-AWS-Out-Bytes': {
          total: 0,
          previous_total: 0,
        },
        'mpt-chat-prod': {
          total: 0.00028737996419270857,
          previous_total: 0.00028734091481854847,
        },
        Dollar: {
          total: 0,
          previous_total: 0,
        },
        'swo-web-header-prod': {
          total: 0.017730883789062506,
          previous_total: 0.01853445482698394,
        },
        'DataTransfer-Out-Bytes': {
          total: 0,
          previous_total: 0,
        },
        'cloud-consumption-azure-prod': {
          total: 0.15984184977213517,
          previous_total: 0.18106359141360018,
        },
        'swo-digital-maturity-calculator-prod': {
          total: 0.0009823859320746517,
          previous_total: 0.0010734126265330981,
        },
        'cloud-consumption-azure-test': {
          total: 0.05522650417751736,
          previous_total: 0.06483102056031587,
        },
        'eashardmap_7e3b2aa9-30f9-4316-8b88-e75303e4def2': {
          total: 1.6338723564995659,
          previous_total: 1.760610268541563,
        },
        elasticpools: {
          total: 4728.721165319061,
          previous_total: 5430.1978351749,
        },
        'swo-digital-maturity-calculator-test': {
          total: 0.0001528496636284722,
          previous_total: 0.0001875229045908938,
        },
        'awsshardmap_099fd68f-cdc0-470c-83f7-68274cbee998': {
          total: 2.3217630676269545,
          previous_total: 2.560197913647725,
        },
        'USE1-Reader-Enterprise-Month': {
          total: 0,
          previous_total: 0,
        },
        extensiontopics: {
          total: 0.0428304,
          previous_total: 0.041254799999999994,
        },
        resources: {
          total: 0,
          previous_total: 330,
        },
        'aly-consumption-virtual-prod': {
          total: 2.3417557874891473,
          previous_total: 2.379756631283777,
        },
        'aly-consumption-virtual-test': {
          total: 0.0010040140787760416,
          previous_total: 0.0011616798318842404,
        },
        'EUC1-PaidComplianceCheck': {
          total: 0,
          previous_total: 0,
        },
        'int-pim-integration-prod': {
          total: 0.011516988118489576,
          previous_total: 0.01224871091124832,
        },
        privatednszones: {
          total: 0.5948304958183984,
          previous_total: 0.64516129032258,
        },
        'cloud-shard-map-coordinator-test': {
          total: 0.00010354071723090276,
          previous_total: 0.00011986595892137096,
        },
        'eu-west-2-KMS-Requests': {
          total: 0,
          previous_total: 0,
        },
        'cloudofficeshardmap_2b05987e-f9b4-4348-bce0-712d90c48b24': {
          total: 0.0005640265570746528,
          previous_total: 0.0006550923009072581,
        },
        'eashardmap_2b898fc6-f2f6-4d45-a87a-59c44aa1b4d6': {
          total: 0.5362115498860679,
          previous_total: 0.5881423701898172,
        },
        'swo-extension-nav-test': {
          total: 0.012121930609809027,
          previous_total: 0.010925390099966398,
        },
        'gpm-swo-rfx-prod': {
          total: 0.0004886508517795141,
          previous_total: 0.0005630373062626007,
        },
        bastionhosts: {
          total: 31.73942078654003,
          previous_total: 36.491443926318546,
        },
        sites: {
          total: 1.2896304969999999,
          previous_total: 1.536635251,
        },
        'marketplace-pim-prod': {
          total: 0.3704741739908852,
          previous_total: 0.4226134112176929,
        },
        'eashardmap_0c1e78e9-1066-4e18-9882-bd123c54a2bd': {
          total: 13.788094919162326,
          previous_total: 14.518552559057529,
        },
        'pyracloud-subscriptions_2020-09-29t06-59z': {
          total: 0.0008744873046875,
          previous_total: 0.001000736534638216,
        },
        'awsshardmap_c445ff59-32a7-4ff7-b325-3d04eb3f4d82': {
          total: 0.000014042154947916643,
          previous_total: 0.000015307354670698912,
        },
        'lic-esd-test': {
          total: 0.0054814439561631945,
          previous_total: 0.00637428706999748,
        },
        'cloud-shard-map-prod': {
          total: 0.0007863606770833356,
          previous_total: 0.000920864944731463,
        },
        'fwk-shard-map-coordinator-prod': {
          total: 0.001015957980685765,
          previous_total: 0.001120037579280074,
        },
        'lic-esd-prod': {
          total: 0.04624892645941843,
          previous_total: 0.051753679321726594,
        },
        'swo-pyraproxy-prod': {
          total: 2.6450671413845477,
          previous_total: 2.768963167536471,
        },
        'cloud-shard-map-test': {
          total: 0.00010975477430555555,
          previous_total: 0.00012810277357750896,
        },
        'swo-digital-cloud-compatibility': {
          total: 0.001385250515407985,
          previous_total: 0.001488382515856013,
        },
        Alarm: {
          total: 0.3409756411,
          previous_total: 0.28824663180000004,
        },
        'pyracloud-subscriptions_2020-09-29t08-59z': {
          total: 0.0007958028157552083,
          previous_total: 0.000908892406614024,
        },
        'trx-transactions-overview-prod': {
          total: 13.150368838161896,
          previous_total: 13.86415399891844,
        },
        Serverless: {
          total: 0.0061034472,
          previous_total: 0.0064556214,
        },
        workflows: {
          total: 7.059018323575448,
          previous_total: 7.742640779690866,
        },
        'gpm-rfx-test': {
          total: 0.00023920084635416667,
          previous_total: 0.0002783751785114247,
        },
        'gpm-rfx-prod': {
          total: 0.0004746893988715275,
          previous_total: 0.0005477299515919018,
        },
        'cloud-platform-test': {
          total: 0.0010056281195746529,
          previous_total: 0.0011784554430233534,
        },
        privateendpoints: {
          total: 10.521091672217349,
          previous_total: 11.479999999999999,
        },
        GuardDuty: {
          total: 0.320828,
          previous_total: 0.29637600000000003,
        },
        slots: {
          total: 0.047375762999999994,
          previous_total: 0.055052382,
        },
        'mpt-cqr-test': {
          total: 0.0002473517523871528,
          previous_total: 0.00028031202746975803,
        },
        'API Request': {
          total: 1.2889801883000012,
          previous_total: 3.090603181999994,
        },
        'pyra-dot-net-templates-test': {
          total: 0.00012129516601562502,
          previous_total: 0.00013940626575100807,
        },
        'eashardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
          total: 0.176423294406467,
          previous_total: 0.20504123482652886,
        },
        'eashardmap_1d9e10e9-e0d9-49bc-8362-4635af48e3b0': {
          total: 0.15798618706597226,
          previous_total: 0.17317720844446544,
        },
        'eashardmap_5aa598f6-990c-4d69-9f5e-1275d34d14e5': {
          total: 1.5326779703776041,
          previous_total: 1.6726153466665599,
        },
        'EUN1-DataTransfer-Out-Bytes': {
          total: 0,
          previous_total: 0,
        },
        'billing-automation-test': {
          total: 0.008319573296440973,
          previous_total: 0.009686012426670306,
        },
        'auth-api-prod': {
          total: 0.014044898817274314,
          previous_total: 0.01504309453930051,
        },
        'pyc-search-test': {
          total: 0.00015026719835069442,
          previous_total: 0.00018393817204301072,
        },
        'swo-extension-nav-prod_2025-05-07t13-52z': {
          total: 0.0034531429036458363,
          previous_total: 0.003764271463373657,
        },
        'mpt-extensions-prod': {
          total: 0.00023411661783854167,
          previous_total: 0.0002382714712491602,
        },
        images: {
          total: 0.4860831000000001,
          previous_total: 0.5221536000000001,
        },
        'eashardmap_3c7b4733-d8c6-4030-8605-e2c2b59f6f45': {
          total: 0.3623467522515189,
          previous_total: 0.3997598613123739,
        },
        'mpt-procurement-test': {
          total: 0.0022207587348090276,
          previous_total: 0.00009353887086273522,
        },
        'aly-consumption-read-ea-test': {
          total: 0.21513065592447916,
          previous_total: 0.2479365037487399,
        },
        'aly-consumption-office365-test': {
          total: 0.18959862874348954,
          previous_total: 0.22016391719695058,
        },
        'mpt-procurement-prod': {
          total: 0.0001808532714843748,
          previous_total: 0.0001631873346144154,
        },
        'EU-DataTransfer-Out-Bytes': {
          total: 0,
          previous_total: 0,
        },
        nltsql_analytics_scheduler: {
          total: 0.00280504150390625,
          previous_total: 0.003289730145854335,
        },
        'di-reporting-test': {
          total: 0.059956736653645835,
          previous_total: 0.07018973524305555,
        },
        'EUC1-CW:Requests': {
          total: 0,
          previous_total: 0,
        },
        'customeractivation-migration-prod': {
          total: 0.005375401475694446,
          previous_total: 0.005745639005271341,
        },
        'awsshardmap_d450009c-5886-4703-8e6d-740dbecc21c9': {
          total: 9.055268506537555,
          previous_total: 9.330670864004059,
        },
        'gpm-providers-adobevipm-prod': {
          total: 0.0005195597330729163,
          previous_total: 0.0005936520156039987,
        },
        'USE1-CostDataStorage': {
          total: 0,
          previous_total: 0,
        },
        'wrk-management-prod': {
          total: 0.07425878906249998,
          previous_total: 0.07903501173450096,
        },
        'gpm-providers-adobevipm-test': {
          total: 0.00016584269205729163,
          previous_total: 0.0001898111979166667,
        },
        'auth-api-test': {
          total: 0.0007719957139756944,
          previous_total: 0.0008965423912130376,
        },
        'reportingenginequartzdb-test': {
          total: 0.00016277601453993054,
          previous_total: 0.0001899908250378024,
        },
        'mpt-public-catalog-prod': {
          total: 0.019130579969618068,
          previous_total: 0.01833980410996304,
        },
        scheduledqueryrules: {
          total: 21.453068996415766,
          previous_total: 23.663015232974907,
        },
        'billing-automation-test_2019-06-25t15-20z': {
          total: 0.0002617974175347222,
          previous_total: 0.00031077053931451615,
        },
        'cloud-consumption-aws-test': {
          total: 0.0011954393174913192,
          previous_total: 0.001378599105342742,
        },
        networksecuritygroups: {
          total: 0.47434549154713745,
          previous_total: 0.5236289924941957,
        },
        'cloud-cost-allocation-prod': {
          total: 0.0009493787977430579,
          previous_total: 0.001122739795971943,
        },
        'renewal-manager-prod': {
          total: 3.5246276184082026,
          previous_total: 3.844927787819042,
        },
        'notifications-management-test': {
          total: 0.01507005683051215,
          previous_total: 0.013383683574498768,
        },
        'renewal-manager-test': {
          total: 0.11081681315104167,
          previous_total: 0.12658331036311324,
        },
        signalr: {
          total: 83.71999999999998,
          previous_total: 103.03999999999998,
        },
        clusters: {
          total: 0.656180784,
          previous_total: 0.710305632,
        },
        'csp-backoffice-customers-prod': {
          total: 0.016581928846571163,
          previous_total: 0.01809025778274809,
        },
        'pyracloud-subscriptions_2020-09-29t07-59z': {
          total: 0.0007863606770833356,
          previous_total: 0.0008935850519433251,
        },
        'CW:Requests': {
          total: 0,
          previous_total: 0,
        },
        'user-rank-prod': {
          total: 0.5488340752495663,
          previous_total: 0.5888515172377286,
        },
        'awsshardmap_54286192-fc00-402c-9575-08102633bf40': {
          total: 0.0009070909288194427,
          previous_total: 0.000985968061330924,
        },
        actiongroups: {
          total: 0.28706000000000004,
          previous_total: 0.31084,
        },
        trafficmanagerprofiles: {
          total: 7.493949734838722,
          previous_total: 9.00023812709679,
        },
        'EUW3-Requests-Tier1': {
          total: 0,
          previous_total: 0,
        },
        'awsshardmap_d0bc9c1b-06cf-437f-a37f-a3ad2340ed65': {
          total: 3.1295245537651932,
          previous_total: 3.2370864792252982,
        },
        'swo-pyraproxy-test': {
          total: 0.07887397732204861,
          previous_total: 0.09121936927713375,
        },
        'mpt-helpdesk-prod': {
          total: 0.00035081176757812495,
          previous_total: 0.0003239015421987008,
        },
        'gpm-swo-salesprice-prod': {
          total: 0.44338782145182287,
          previous_total: 0.5119468415072315,
        },
        'notifications-management-prod': {
          total: 0.051895527479383675,
          previous_total: 0.05200689369119626,
        },
        'swo-portal-prod': {
          total: 85.97471731296118,
          previous_total: 89.4687390523931,
        },
        'csp-backoffice-customers-test': {
          total: 0.0038388346354166665,
          previous_total: 0.004465780147429436,
        },
        'mpt-module-spotlight-prod': {
          total: 0.005234253607855904,
          previous_total: 0.0053302760189152115,
        },
        'eashardmap_72016d53-1ba0-4f71-ab9c-0a90df48b048': {
          total: 4.3501729288736986,
          previous_total: 4.575600423155207,
        },
        'swo-web-header-test': {
          total: 0.00043651733398437497,
          previous_total: 0.0005131608422939067,
        },
        natgateways: {
          total: 2369.4175321470616,
          previous_total: 2884.1379934392367,
        },
        'EUW1-BilledBytes': {
          total: 0,
          previous_total: 0,
        },
        virtualmachinescalesets: {
          total: 6938.3806184426185,
          previous_total: 7310.522587616949,
        },
        'csp-price-calculation-service-test': {
          total: 0.0030269721137152782,
          previous_total: 0.0035277334780675963,
        },
        'fwk-navision-scope-test': {
          total: 0.022253587510850693,
          previous_total: 0.025503539360894098,
        },
        'eashardmap_14336735-a54e-41c0-8063-856b5379bd1c': {
          total: 12.976924982367622,
          previous_total: 13.819457965503544,
        },
        'awsshardmap_a0b82f35-ecdf-4392-8eab-c2a7269ebc65': {
          total: 1.0517786302354601,
          previous_total: 1.1122712184673547,
        },
        'gpm-itemconfiguration-prod': {
          total: 0.00008376871744791668,
          previous_total: 0.0000918441280241935,
        },
        'swo-digital-assessments-test': {
          total: 0.0007346306694878471,
          previous_total: 0.0008761273784022176,
        },
        networkwatchers: {
          total: 0,
          previous_total: 0,
        },
        'swo-marketplace-address-book-test': {
          total: 0.00013307766384548612,
          previous_total: 0.00015894657258064515,
        },
        'swo-digital-assessments-prod': {
          total: 0.00784310845269099,
          previous_total: 0.0086374273922281,
        },
        'csp-subscriptions-prod': {
          total: 0.029979113091362856,
          previous_total: 0.03302304304662999,
        },
        'eu-west-3-KMS-Requests': {
          total: 0,
          previous_total: 0,
        },
        Metric: {
          total: 1.1817720079000003,
          previous_total: 1.0120032186,
        },
        'pyracloud-subscriptions': {
          total: 0.013946603732638903,
          previous_total: 0.014851570375504051,
        },
        backupvaults: {
          total: 1.2163711151999999,
          previous_total: 1.3213237631999997,
        },
        'swo-marketplace-order-fulfillment-prod': {
          total: 0.36818530273437494,
          previous_total: 0.4235282990048864,
        },
        'pyc-simple-test': {
          total: 0.00013880750868055554,
          previous_total: 0.00016447596396169353,
        },
        'aly-consumption-salesforce-test': {
          total: 0.00012734781901041668,
          previous_total: 0.00015003550539734542,
        },
        'cspshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
          total: 0.004427394612630208,
          previous_total: 0.005076184344548051,
        },
        'gpm-swo-rfx-test': {
          total: 0.0005118930392795139,
          previous_total: 0.0005919937188480063,
        },
        'wrk-management-test': {
          total: 0.02108502197265625,
          previous_total: 0.024530900152609763,
        },
        service: {
          total: 1879.1688021749987,
          previous_total: 2082.2784027839984,
        },
        'eashardmap_eeb8bf9d-55d9-4fa3-ae6b-2d42c25df109': {
          total: 12.313511372070323,
          previous_total: 14.326289253638478,
        },
        grafana: {
          total: 106.711,
          previous_total: 185.527,
        },
        'gpm-authorization-prod': {
          total: 0.0005195597330729171,
          previous_total: 0.0005936520156039988,
        },
        'swo-marketplace-pricemanager': {
          total: 0.008251218668619793,
          previous_total: 0.00904664661038306,
        },
        'eashardmap_2c8c5274-a7cf-477f-a877-977f00622a4c': {
          total: 7.907734807671437,
          previous_total: 8.51795177085084,
        },
        'products-catalog-api-test': {
          total: 0.0005150404188368055,
          previous_total: 0.0006185186570690524,
        },
        'eashardmap_7e23f6f5-a875-4963-af34-29ed1d4ae24d': {
          total: 1.0541460245768226,
          previous_total: 1.159376788308202,
        },
        'csp-license-assignments-prod': {
          total: 0.0014042154947916643,
          previous_total: 0.001530735467069891,
        },
        dnszones: {
          total: 3.23613853333333,
          previous_total: 3.4514620129032223,
        },
        'gpm-providers-mscsp-prod': {
          total: 0.0016195285373263914,
          previous_total: 0.001775653141801078,
        },
        nlpsql_analytics_scheduler: {
          total: 0.07757935519748262,
          previous_total: 0.0899903579110313,
        },
        'exp-global-search-prod': {
          total: 0.005042021348741321,
          previous_total: 0.005505571262810821,
        },
        sonarqube: {
          total: 0.36035107150607654,
          previous_total: 0.3940791614163307,
        },
        'Business Analytics': {
          total: 25.800000206399996,
          previous_total: 23.661290376,
        },
        'Global-SoftwareUsage-Contracts': {
          total: 25114.120218579235,
          previous_total: 25114.120218579235,
        },
        applicationgateways: {
          total: 3099.8100155685647,
          previous_total: 3399.6592163255427,
        },
        'mpt-module-billing-prod': {
          total: 0.8578357299804666,
          previous_total: 0.8167121519902267,
        },
        'lic-mgr-gus-prod': {
          total: 0.0009620490180121527,
          previous_total: 0.001048082599161348,
        },
        'fwk-feature-toggle-prod': {
          total: 0.0014733771430121506,
          previous_total: 0.0015754470004830288,
        },
        'cloud-cost-allocation-test': {
          total: 0.0008351744249131946,
          previous_total: 0.000986210491221438,
        },
        'eashardmap_37dd1f9c-8205-440f-87f3-da1fb808b40c': {
          total: 1.4390412495931004,
          previous_total: 1.5778971716877381,
        },
        'mpt-currency-test': {
          total: 0.00023766750759548612,
          previous_total: 0.00025616389448924733,
        },
        'Requests-Tier8': {
          total: 0.00063,
          previous_total: 0.00072,
        },
        'cloud-shard-map-coordinator-prod': {
          total: 0.0007442342122395857,
          previous_total: 0.0008385696903351811,
        },
        'int-pim-integration-test': {
          total: 0.0004635525173611111,
          previous_total: 0.0005431924143145161,
        },
        'cloud-consumption-aws-prod': {
          total: 0.0007582763671874999,
          previous_total: 0.0008538770450058809,
        },
        'mpt-extensions-test': {
          total: 0.00023952365451388886,
          previous_total: 0.00022941507318968414,
        },
        'swo-digital-recommendations-prod-restored': {
          total: 0.00012565307617187503,
          previous_total: 0.0001377661920362904,
        },
        'aly-consumption-ea-test': {
          total: 0.8502985069444444,
          previous_total: 0.9892745884786628,
        },
        'swo-platform-performace_2024-06-28t10-29z': {
          total: 0.0037269805230034743,
          previous_total: 0.004086266171034948,
        },
        'ap-southeast-1-KMS-Requests': {
          total: 0,
          previous_total: 0,
        },
        'fwk-iam-prod': {
          total: 0.05346316460503474,
          previous_total: 0.05871409750224015,
        },
        vaults: {
          total: 274.4280348266226,
          previous_total: 304.4547833726429,
        },
        'EU-Requests-Tier2': {
          total: 0,
          previous_total: 0,
        },
        'fwk-iam-test': {
          total: 0.051422129313151044,
          previous_total: 0.060052634552986386,
        },
        'mpt-tasks-test': {
          total: 0.00019481472439236109,
          previous_total: 0.00023207824050739247,
        },
        'eashardmap_0da2a725-c790-4d1f-b155-080817a86035': {
          total: 0.319390751139323,
          previous_total: 0.34246311030780974,
        },
        'cloudeashardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
          total: 0.0001512356228298611,
          previous_total: 0.00018292288831485212,
        },
        'pyra-dot-net-templates-prod': {
          total: 0.0010371826171874992,
          previous_total: 0.001101403217930947,
        },
        'csp-orders-test': {
          total: 0.0003507310655381944,
          previous_total: 0.0004055043210265456,
        },
        'swo-platform-prod_2025-05-07t12-43z': {
          total: 0.008397942979600672,
          previous_total: 0.009207515330981169,
        },
        'swo-platform-test': {
          total: 0.03772892998589409,
          previous_total: 0.04303860095171091,
        },
        'awsshardmap_ca4ef284-5503-4019-a176-7b079926439a': {
          total: 1.881959465874568,
          previous_total: 2.067649642758388,
        },
        'int-config-test': {
          total: 0.0003293450249565972,
          previous_total: 0.0003789221103900649,
        },
        'gpp-identity-prod': {
          total: 0.0012083516438802094,
          previous_total: 0.001322719450919859,
        },
        'notificationhubquartzdb-test': {
          total: 0.00039350314670138885,
          previous_total: 0.00044881268026153676,
        },
        'aly-consumption-slm-prod': {
          total: 0.7338507649739578,
          previous_total: 0.8013313246203997,
        },
        'notificationhubquartzdb-prod': {
          total: 0.0022482781304253487,
          previous_total: 0.0024567210863995314,
        },
        Bucket: {
          total: 3811.295823476825,
          previous_total: 4159.635490905803,
        },
        'cloud-platform-prod': {
          total: 0.05012161593967009,
          previous_total: 0.05495340326780913,
        },
        publicipprefixes: {
          total: 186.54000000000002,
          previous_total: 209.66400000000002,
        },
        partnertopics: {
          total: 0.6057012,
          previous_total: 0.6586884,
        },
        'igrt-mgr-tracking-test': {
          total: 0.0008835259331597222,
          previous_total: 0.0010322702059181788,
        },
        'awsshardmap_eedd1e08-b005-4876-8523-3df5ed522281': {
          total: 0.001150811089409722,
          previous_total: 0.0013466567172799057,
        },
        'Marketplace Purchase': {
          total: 0,
          previous_total: 0,
        },
        'eashardmap_c7242070-60da-4c92-bc34-8b1a34c50a01': {
          total: 62.90632189805775,
          previous_total: 66.80448557010774,
        },
        staticsites: {
          total: 51.17459957484931,
          previous_total: 57.44384074649316,
        },
        'gpp-identity-test': {
          total: 0.00023419731987847216,
          previous_total: 0.0002731529755404346,
        },
        'sub-mgr-prod': {
          total: 0.11068438110351572,
          previous_total: 0.1183718804034708,
        },
        'aly-consumption-ea-prod': {
          total: 202.24601469319683,
          previous_total: 212.1435465911974,
        },
        chtvs00471_cpx_full_202109262000: {
          total: 0.00012621799045138887,
          previous_total: 0.0001370633033014113,
        },
        'sub-mgr-test': {
          total: 0.0035187703450520833,
          previous_total: 0.0039902993479082665,
        },
        'issue-detection-engine-prod': {
          total: 0.0015776441786024328,
          previous_total: 0.001729731077788979,
        },
        'mpt-catalog-prod': {
          total: 0.0005234334309895833,
          previous_total: 0.0005529391381048386,
        },
        Volume: {
          total: 1023.0485842019996,
          previous_total: 1104.9761512034997,
        },
        'swo-platform-prod': {
          total: 0.35245808919270827,
          previous_total: 0.3839651392126595,
        },
        factories: {
          total: 63.894564166666676,
          previous_total: 227.5232441666667,
        },
        'Tables-Requests-Tier1': {
          total: 0.000035000000000000004,
          previous_total: 0.00004,
        },
        'EUC1-Requests': {
          total: 0,
          previous_total: 0,
        },
        'igrt-mgr-tracking-prod': {
          total: 0.007062477620442709,
          previous_total: 0.007754455960181449,
        },
        'dwh-test': {
          total: 2.8704965074327258,
          previous_total: 3.353456608007287,
        },
        metricalerts: {
          total: 16.757930107526754,
          previous_total: 18.17244623655901,
        },
        'eashardmap_54286192-fc00-402c-9575-08102633bf40': {
          total: 0.0011741339789496526,
          previous_total: 0.0012713044416092641,
        },
        'mgmt-acm-test': {
          total: 0.00012960747612847221,
          previous_total: 0.0001531776783714158,
        },
        'Management Tools - AWS Config Rules': {
          total: 0.24600000000000002,
          previous_total: 0.28245513750000006,
        },
        'csp-orders-prod': {
          total: 0.015206685384114595,
          previous_total: 0.016616060602878607,
        },
        'awsshardmap-26517465236498': {
          total: 0.00010241088867187498,
          previous_total: 0.00011943901909722221,
        },
        Storage: {
          total: 8.0634026667,
          previous_total: 9.0221196989,
        },
        'mgmt-console-gus-test': {
          total: 0.0002678500705295139,
          previous_total: 0.0003099478991655466,
        },
        'eashardmap_ee859c36-53ff-4440-bd50-4d8da7e70412': {
          total: 0.06023196750217014,
          previous_total: 0.0651324713156642,
        },
        'eashardmap_35eb33c3-9ca8-4b3e-995a-e3da72bc1286': {
          total: 0.00010483194986979165,
          previous_total: 0.00012298990885416667,
        },
        'gpm-subscriptions-prod': {
          total: 0.00011233723958333357,
          previous_total: 0.0001224588373655917,
        },
        'mgmt-acm-prod': {
          total: 0.001031856282552083,
          previous_total: 0.001129409429078459,
        },
        'aly-pricelist-test': {
          total: 0.7124622226291232,
          previous_total: 0.8125273138668375,
        },
        'int-config-prod': {
          total: 0.013471268717447893,
          previous_total: 0.014287978568128341,
        },
        'trackit-prod': {
          total: 0.05780687120225693,
          previous_total: 0.06314218198714718,
        },
        'mpt-tasks-prod': {
          total: 0.00037607150607638903,
          previous_total: 0.00039594503423219095,
        },
        'trackit-test': {
          total: 0.01459464111328125,
          previous_total: 0.016999322400383626,
        },
        'csp-billing-automation-test': {
          total: 0.0672203606499566,
          previous_total: 0.07338783182123655,
        },
        'swo-platform-prod_2024-06-26t22-03z': {
          total: 0.003531191677517359,
          previous_total: 0.003871603032594083,
        },
        'cspshardmap_72ce77e7-2041-4f5d-3a72-08da26e48a74': {
          total: 3.2367749823676224,
          previous_total: 3.4865859133484536,
        },
        'eashardmap_7f75776e-89af-413b-88a2-28593e2ac6b2': {
          total: 14.667468893771694,
          previous_total: 15.628963816784262,
        },
        'cspshardmap_986dcd1f-43af-4ee7-9dbd-11411d7c399d': {
          total: 2.204900783962672,
          previous_total: 2.340673193053104,
        },
        'aly-consumption-aws-test': {
          total: 0.11848334554036458,
          previous_total: 0.13579603396179857,
        },
        'mpt-currency-prod': {
          total: 0.0003370117187500002,
          previous_total: 0.0003450480799521169,
        },
        'USE1-EU-AWS-Out-Bytes': {
          total: 0,
          previous_total: 0,
        },
        'Data Payload': {
          total: 18.822484800799998,
          previous_total: 16.248113148,
        },
        'aly-invoice-automation-prod': {
          total: 0.0011882568359375,
          previous_total: 0.001278390601373488,
        },
        'swo-marketplace-customer-prod': {
          total: 0.0007259955512152754,
          previous_total: 0.000841448930856574,
        },
        'exp-global-search-test': {
          total: 0.0001505093044704861,
          previous_total: 0.00017788551904821906,
        },
        'swo-marketplace-customer-test': {
          total: 0.00037284342447916664,
          previous_total: 0.0004286059307795698,
        },
        'products-catalog-api-prod': {
          total: 0.0017041042751736112,
          previous_total: 0.001860559497682851,
        },
        'cloudawsshardmap_50b14c10-7229-4581-b736-0494d49d0bb8': {
          total: 0.00009563191731770832,
          previous_total: 0.00011035353137600805,
        },
        configurationstores: {
          total: 64.8,
          previous_total: 67.2,
        },
        'mpt-module-billing-test': {
          total: 0.05704415622287326,
          previous_total: 0.06502662147877464,
        },
        'gpm-authorization-test': {
          total: 0.00015583563910590275,
          previous_total: 0.00018483630764868953,
        },
        'aly-cloud-utilization-prod': {
          total: 16.973371831597216,
          previous_total: 18.619561034959375,
        },
        'USE2-AWSSecretsManagerAPIRequest': {
          total: 0,
          previous_total: 0,
        },
        virtualnetworkgateways: {
          total: 181.72,
          previous_total: 197.76,
        },
        'Metric Streams': {
          total: 0.9355079999999999,
          previous_total: 0.852237,
        },
        'fwk-feature-toggle-test': {
          total: 0.0002298394097222222,
          previous_total: 0.00027252558226226474,
        },
        'mpt-module-billing-prod-debug-1': {
          total: 0.016625911458333358,
          previous_total: 0.01812390793010753,
        },
        'cloud-workspace-test': {
          total: 0.00016979709201388887,
          previous_total: 0.00019669950751848117,
        },
        'cloud-workspace-prod': {
          total: 0.0007863606770833356,
          previous_total: 0.00088449175434728,
        },
        'aly-consumption-adobe-test': {
          total: 0.002055642361111111,
          previous_total: 0.002372291132882504,
        },
        managedclusters: {
          total: 34.884762894548835,
          previous_total: 38.43166500421958,
        },
        'awsshardmap_b4fd484f-d43c-4162-a1ea-83e4b103b46e': {
          total: 21.001360831027576,
          previous_total: 21.74328836289273,
        },
        'collab-test': {
          total: 0.017176622178819444,
          previous_total: 0.020048084064880154,
        },
        'csp-backoffice-prices-test': {
          total: 0.00022887098524305554,
          previous_total: 0.00027128901874719983,
        },
        'int-cco-test': {
          total: 0.0061123725043402775,
          previous_total: 0.007043882308467742,
        },
        'cloud-consumption-office-prod': {
          total: 0.00071614990234375,
          previous_total: 0.0008079549809937851,
        },
        'EUC1-DataTransfer-Out-Bytes': {
          total: 0,
          previous_total: 0,
        },
        'fwk-navision-scope-prod': {
          total: 1.787472064887151,
          previous_total: 1.9322668292739498,
        },
        'csp-contracts-test': {
          total: 0.00040496283637152773,
          previous_total: 0.00047168259706121196,
        },
        'swo-marketplace-order-fulfillment-test': {
          total: 0.047797155083550355,
          previous_total: 0.05521131136767754,
        },
        'int-cco-prod': {
          total: 2.9320190619574626,
          previous_total: 3.184837570529513,
        },
        'market-shop-prod': {
          total: 0.5277708428276912,
          previous_total: 0.5980900915221075,
        },
        'swo-marketplace-order-manager-prod': {
          total: 0.00080040283203125,
          previous_total: 0.0009179857042100699,
        },
        'int-creditcard-prod': {
          total: 0.022984021674262143,
          previous_total: 0.024244038243447577,
        },
        'csp-backoffice-configurations-prod': {
          total: 0.0011378987630208343,
          previous_total: 0.001210330145504312,
        },
        'csp-subscriptions-test': {
          total: 0.0012813062879774304,
          previous_total: 0.0014820330876176076,
        },
        'mpt-module-spotlight-test': {
          total: 0.0005229492187499999,
          previous_total: 0.0004873361895161291,
        },
        'eashardmap_f60ce9fd-154d-427d-bf91-2e4b42dd86c4': {
          total: 1.7757021565755227,
          previous_total: 1.9371584454498838,
        },
        'cloud-consumption-office-test': {
          total: 0.00015301106770833331,
          previous_total: 0.0001668189264112903,
        },
        enterprisearchitect: {
          total: 0.024824350992838525,
          previous_total: 0.02742078293010753,
        },
        'fwk-shard-map-test': {
          total: 0.0002735799153645833,
          previous_total: 0.0003185595878136201,
        },
        nltapp0127sdb: {
          total: 0.0008951470269097223,
          previous_total: 0.00103871335265457,
        },
        servers: {
          total: 17.197580645161302,
          previous_total: 19.334677419354854,
        },
        'APN3-AWSSecretsManagerAPIRequest': {
          total: 0,
          previous_total: 0,
        },
        components: {
          total: 1.3631482901275451,
          previous_total: 1.752046500957237,
        },
        pricings: {
          total: 401.18696,
          previous_total: 516.124,
        },
        'swo-marketplace-address-book-prod': {
          total: 0.0005165737575954866,
          previous_total: 0.0006027453132000451,
        },
        'Storage Snapshot': {
          total: 0.0000503597,
          previous_total: 0.084099211,
        },
        Instance: {
          total: 2405.775224328763,
          previous_total: 2686.9263299927675,
        },
        nlpsql_analytics_scheduler_kj: {
          total: 0.009998014322916643,
          previous_total: 0.01738235771151852,
        },
        'eashardmap_e3c55fc0-e7ce-48fd-a244-8afd1041d843': {
          total: 0.45365554199218755,
          previous_total: 0.4969995142564123,
        },
        'AWS Glue': {
          total: 0.9303316000000001,
          previous_total: 1.0397930400000002,
        },
        'EUC1-Crawler-DPU-Hour': {
          total: 0,
          previous_total: 0,
        },
        'awsshardmap_c6469e97-302a-408a-8589-2122a0bb725d': {
          total: 0.013947894965277754,
          previous_total: 0.01520813021095849,
        },
        'eashardmap_ac7850af-21d1-4ebd-8c22-b475e5d40978': {
          total: 5.662778857421877,
          previous_total: 5.548469046512728,
        },
        'Sending Email': {
          total: 7.7823083871,
          previous_total: 5.603972355499999,
        },
        ssisdb: {
          total: 0.00015438300238715275,
          previous_total: 0.00018697361006104386,
        },
        'customer-support-prod': {
          total: 1.5765654344346802,
          previous_total: 1.667008567235805,
        },
        'fwk-proxy-identity-provider-prod': {
          total: 0.00297169121636285,
          previous_total: 0.003233457394398242,
        },
        'Data Transfer': {
          total: 0.2714119029000001,
          previous_total: 0.2516719565,
        },
        azurefirewalls: {
          total: 443.40276154469143,
          previous_total: 481.6330448814854,
        },
        'mpt-helpdesk-test': {
          total: 0.00009522840711805555,
          previous_total: 0.00011681490115367384,
        },
        'pyracloud-subscriptions-restore': {
          total: 0.001049126519097222,
          previous_total: 0.0012277149268803205,
        },
        jobagents: {
          total: 6.384,
          previous_total: 7.258,
        },
        'csp-backoffice-invoices-test': {
          total: 0.11285453965928818,
          previous_total: 0.13176608387936828,
        },
        'bot-test': {
          total: 0.0001528496636284722,
          previous_total: 0.00017577945613519264,
        },
        'csp-backoffice-invoices-prod': {
          total: 6.0337285278320305,
          previous_total: 6.2127121647441665,
        },
        'customer-support-test': {
          total: 0.014963207329644098,
          previous_total: 0.017292505101576504,
        },
        'aly-consumption-ea-integrationtest': {
          total: 0.00017342868381076387,
          previous_total: 0.00020436880460349458,
        },
        'gpm-customeronboarding-test': {
          total: 0.00013307766384548612,
          previous_total: 0.0001544168451780914,
        },
        registries: {
          total: 163.61627783000398,
          previous_total: 181.33034474766495,
        },
        'awsshardmap_d7275497-ac0b-411b-9396-d98d1c26f634': {
          total: 6.146635523817271,
          previous_total: 6.3530105212577315,
        },
        'swo-digital-recommendations-test': {
          total: 0.00012323201497395835,
          previous_total: 0.0001444045856434812,
        },
        'customer-solutions-test': {
          total: 0.001894722493489583,
          previous_total: 0.0022173432162158374,
        },
        'user-rank-test': {
          total: 0.005724518500434027,
          previous_total: 0.006726200029926914,
        },
        'Kinesis Firehose': {
          total: 0.0042033959,
          previous_total: 0.0037024357000000003,
        },
        'swo-portal-test': {
          total: 0.9297390686035155,
          previous_total: 1.0755675974856138,
        },
        samdatawarehouse: {
          total: 0.5253774624294705,
          previous_total: 0.5872939626604853,
        },
        'gpm-swo-salesprice-test': {
          total: 0.1305223951551649,
          previous_total: 0.14186715731056784,
        },
        'Managed Streaming for Apache Kafka (MSK)': {
          total: 0,
          previous_total: 24.925218814999997,
        },
        'Dedicated Host': {
          total: 0,
          previous_total: 156.95195411269998,
        },
        'EU-RDS:ChargedBackupUsage': {
          total: 0,
          previous_total: 0,
        },
        'eu-west-1-KMS-Requests': {
          total: 0,
          previous_total: 0,
        },
        Dashboard: {
          total: 0,
          previous_total: 0.2031087096,
        },
        'NAT Gateway': {
          total: 0,
          previous_total: 15.438010188099998,
        },
        'USE2-DataTransfer-Out-Bytes': {
          total: 0,
          previous_total: 0,
        },
        'Athena Queries': {
          total: 0,
          previous_total: 3.4359349999999997,
        },
        'EC2 Container Registry': {
          total: 0,
          previous_total: 0.0012609554,
        },
        Secret: {
          total: 0,
          previous_total: 0.09099190319999999,
        },
        'USW2-CW:Requests': {
          total: 0,
          previous_total: 0,
        },
        'Encryption Key': {
          total: 0,
          previous_total: 0.225989502,
        },
        'USE2-TimedStorage-ByteHrs': {
          total: 0,
          previous_total: 0,
        },
        'EU-Recipients': {
          total: 0,
          previous_total: 0,
        },
        'EUC1-DataScannedInTB': {
          total: 0,
          previous_total: 0,
        },
        'EU-ClientVPN-EndpointHours': {
          total: 0,
          previous_total: 33.2,
        },
        'EU-Kafka.Storage.GP2': {
          total: 0,
          previous_total: 0,
        },
        'USE1-ResourceList': {
          total: 0,
          previous_total: 0,
        },
        AmazonLocationService: {
          total: 0.0000195,
          previous_total: 0.00009,
        },
        certificateorders: {
          total: 0,
          previous_total: 69.99,
        },
        'DNS Zone': {
          total: 0,
          previous_total: 0.806060606,
        },
        HostedZone: {
          total: 0,
          previous_total: 0,
        },
        'APS2-ResourceList': {
          total: 0,
          previous_total: 0,
        },
        'Management Tools - AWS Config': {
          total: 0,
          previous_total: 0.15,
        },
        domains: {
          total: 11.99,
          previous_total: 0,
        },
        'EU-ResourceList': {
          total: 0,
          previous_total: 0,
        },
        'EU-Requests-Tier1': {
          total: 0,
          previous_total: 0,
        },
        reservations: {
          total: 37687.95,
          previous_total: 0,
        },
      },
      __typename: 'ExpensesDailyBreakdown',
    },
  },
};

export const AnomaliesDataSourceExpensesDailyBreakdown = {
  data: {
    expensesDailyBreakdown: {
      breakdown: {
        '1762387200': {
          '3f584d10-4293-4599-8ad5-413acc72fd45': {
            cost: 6.064004826666662,
            id: '3f584d10-4293-4599-8ad5-413acc72fd45',
            name: 'Marketplace (Production)',
            type: 'aws_cnr',
            account_id: '654035049067',
          },
          'b4529ebc-cf01-4671-bedc-b8fffefa47be': {
            cost: 0.643443189833333,
            id: 'b4529ebc-cf01-4671-bedc-b8fffefa47be',
            name: ' Marketplace (Test)',
            type: 'aws_cnr',
            account_id: '996403779197',
          },
          '947cbf94-afc3-4055-b96d-eff284c36a09': {
            cost: 184.81397529487313,
            id: '947cbf94-afc3-4055-b96d-eff284c36a09',
            name: 'CHaaS (Production)',
            type: 'azure_cnr',
            account_id: '2d2f328c-1407-4e5e-ba59-1cbad182940f',
          },
          'd4321470-cfa8-4a67-adf5-c11faf491e14': {
            cost: 1253.4163781511363,
            id: 'd4321470-cfa8-4a67-adf5-c11faf491e14',
            name: 'CPA (Development and Test)',
            type: 'azure_cnr',
            account_id: '91819a1c-c7d3-4b89-bc9f-39f85bff4666',
          },
          '96e23b8d-854b-42d7-8b59-264e6f314b2d': {
            cost: 3.135930564693643,
            id: '96e23b8d-854b-42d7-8b59-264e6f314b2d',
            name: 'MPT (Production)',
            type: 'azure_cnr',
            account_id: 'ef415e11-361a-4f91-8b3c-23aeb9c8f2ac',
          },
          'b509e2e2-20a4-48eb-ac60-b291338feff4': {
            cost: 417.05500040419105,
            id: 'b509e2e2-20a4-48eb-ac60-b291338feff4',
            name: 'MPT (Dev)',
            type: 'azure_cnr',
            account_id: 'e30e2a6e-0712-48c3-8685-3298df063633',
          },
          '1812ae7a-890f-413a-a4e3-9a76c357cfb2': {
            cost: 3246.8323305499584,
            id: '1812ae7a-890f-413a-a4e3-9a76c357cfb2',
            name: 'CPA (QA and Production)',
            type: 'azure_cnr',
            account_id: 'b6689fdb-ac8c-4116-8136-c7a179cb5be6',
          },
          'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5': {
            cost: 0.07903568846666682,
            id: 'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5',
            name: 'Marketplace (Staging)',
            type: 'aws_cnr',
            account_id: '563690021965',
          },
          'c86dfcec-08ba-4007-a617-8f53efbfba06': {
            cost: 7979.820646740167,
            id: 'c86dfcec-08ba-4007-a617-8f53efbfba06',
            name: 'SoftwareOne AWS',
            type: 'aws_cnr',
            account_id: '285102913731',
          },
          'a611abd8-9cde-4b17-ab54-31f9d43dc955': {
            cost: 83.74565548326237,
            id: 'a611abd8-9cde-4b17-ab54-31f9d43dc955',
            name: 'MPT (Test)',
            type: 'azure_cnr',
            account_id: 'dea8e892-1212-42c9-afa0-3b87e7bfffd5',
          },
          '100efd88-28fb-49f1-946b-edbf78ad4650': {
            cost: 462.6986048460838,
            id: '100efd88-28fb-49f1-946b-edbf78ad4650',
            name: 'CPA (Infrastructure)',
            type: 'azure_cnr',
            account_id: '01643997-4d64-4718-8114-15e488ce3f61',
          },
          'cb78a18a-6adc-4780-9402-d175086accdc': {
            cost: 199.02310718724684,
            id: 'cb78a18a-6adc-4780-9402-d175086accdc',
            name: 'MPT Finops (Production)',
            type: 'azure_cnr',
            account_id: '89b098bc-b400-4578-8058-8416b0c25f6b',
          },
          '1aa5f619-eab6-4d80-a11f-b2765c4a4795': {
            cost: 73.49244922944146,
            id: '1aa5f619-eab6-4d80-a11f-b2765c4a4795',
            name: 'CHaaS (QA)',
            type: 'azure_cnr',
            account_id: '6c73c89e-7e5b-43b5-a7c4-1b0cb260dafb',
          },
          '12fa3bce-5513-40c8-96d7-0be2fc47ebcf': {
            cost: 102.74580864079275,
            id: '12fa3bce-5513-40c8-96d7-0be2fc47ebcf',
            name: 'MPT Finops (Staging)',
            type: 'azure_cnr',
            account_id: '63f2c438-c0e1-4606-ac10-eb6aa149c6cb',
          },
          'b5d9eb31-1136-4a76-90fa-a8e2886de702': {
            cost: 0,
            id: 'b5d9eb31-1136-4a76-90fa-a8e2886de702',
            name: 'Marketplace (Dev)',
            type: 'aws_cnr',
            account_id: '203689795269',
          },
        },
        '1762473600': {
          'a611abd8-9cde-4b17-ab54-31f9d43dc955': {
            cost: 83.11400338314796,
            id: 'a611abd8-9cde-4b17-ab54-31f9d43dc955',
            name: 'MPT (Test)',
            type: 'azure_cnr',
            account_id: 'dea8e892-1212-42c9-afa0-3b87e7bfffd5',
          },
          '100efd88-28fb-49f1-946b-edbf78ad4650': {
            cost: 455.7262517935591,
            id: '100efd88-28fb-49f1-946b-edbf78ad4650',
            name: 'CPA (Infrastructure)',
            type: 'azure_cnr',
            account_id: '01643997-4d64-4718-8114-15e488ce3f61',
          },
          'cb78a18a-6adc-4780-9402-d175086accdc': {
            cost: 198.65269682802438,
            id: 'cb78a18a-6adc-4780-9402-d175086accdc',
            name: 'MPT Finops (Production)',
            type: 'azure_cnr',
            account_id: '89b098bc-b400-4578-8058-8416b0c25f6b',
          },
          '1aa5f619-eab6-4d80-a11f-b2765c4a4795': {
            cost: 73.49215226606903,
            id: '1aa5f619-eab6-4d80-a11f-b2765c4a4795',
            name: 'CHaaS (QA)',
            type: 'azure_cnr',
            account_id: '6c73c89e-7e5b-43b5-a7c4-1b0cb260dafb',
          },
          '12fa3bce-5513-40c8-96d7-0be2fc47ebcf': {
            cost: 102.85051388602078,
            id: '12fa3bce-5513-40c8-96d7-0be2fc47ebcf',
            name: 'MPT Finops (Staging)',
            type: 'azure_cnr',
            account_id: '63f2c438-c0e1-4606-ac10-eb6aa149c6cb',
          },
          'b5d9eb31-1136-4a76-90fa-a8e2886de702': {
            cost: 0,
            id: 'b5d9eb31-1136-4a76-90fa-a8e2886de702',
            name: 'Marketplace (Dev)',
            type: 'aws_cnr',
            account_id: '203689795269',
          },
          'b4529ebc-cf01-4671-bedc-b8fffefa47be': {
            cost: 0.6425659456333331,
            id: 'b4529ebc-cf01-4671-bedc-b8fffefa47be',
            name: ' Marketplace (Test)',
            type: 'aws_cnr',
            account_id: '996403779197',
          },
          '3f584d10-4293-4599-8ad5-413acc72fd45': {
            cost: 6.03783849846666,
            id: '3f584d10-4293-4599-8ad5-413acc72fd45',
            name: 'Marketplace (Production)',
            type: 'aws_cnr',
            account_id: '654035049067',
          },
          'd4321470-cfa8-4a67-adf5-c11faf491e14': {
            cost: 1262.7227667115371,
            id: 'd4321470-cfa8-4a67-adf5-c11faf491e14',
            name: 'CPA (Development and Test)',
            type: 'azure_cnr',
            account_id: '91819a1c-c7d3-4b89-bc9f-39f85bff4666',
          },
          '96e23b8d-854b-42d7-8b59-264e6f314b2d': {
            cost: 3.142061707603147,
            id: '96e23b8d-854b-42d7-8b59-264e6f314b2d',
            name: 'MPT (Production)',
            type: 'azure_cnr',
            account_id: 'ef415e11-361a-4f91-8b3c-23aeb9c8f2ac',
          },
          '947cbf94-afc3-4055-b96d-eff284c36a09': {
            cost: 197.33535302183833,
            id: '947cbf94-afc3-4055-b96d-eff284c36a09',
            name: 'CHaaS (Production)',
            type: 'azure_cnr',
            account_id: '2d2f328c-1407-4e5e-ba59-1cbad182940f',
          },
          'b509e2e2-20a4-48eb-ac60-b291338feff4': {
            cost: 416.2787473214839,
            id: 'b509e2e2-20a4-48eb-ac60-b291338feff4',
            name: 'MPT (Dev)',
            type: 'azure_cnr',
            account_id: 'e30e2a6e-0712-48c3-8685-3298df063633',
          },
          '1812ae7a-890f-413a-a4e3-9a76c357cfb2': {
            cost: 3229.123258513373,
            id: '1812ae7a-890f-413a-a4e3-9a76c357cfb2',
            name: 'CPA (QA and Production)',
            type: 'azure_cnr',
            account_id: 'b6689fdb-ac8c-4116-8136-c7a179cb5be6',
          },
          'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5': {
            cost: 0.08156057436666676,
            id: 'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5',
            name: 'Marketplace (Staging)',
            type: 'aws_cnr',
            account_id: '563690021965',
          },
          'c86dfcec-08ba-4007-a617-8f53efbfba06': {
            cost: 7979.873912729166,
            id: 'c86dfcec-08ba-4007-a617-8f53efbfba06',
            name: 'SoftwareOne AWS',
            type: 'aws_cnr',
            account_id: '285102913731',
          },
        },
        '1762560000': {
          'b509e2e2-20a4-48eb-ac60-b291338feff4': {
            cost: 419.12672357741843,
            id: 'b509e2e2-20a4-48eb-ac60-b291338feff4',
            name: 'MPT (Dev)',
            type: 'azure_cnr',
            account_id: 'e30e2a6e-0712-48c3-8685-3298df063633',
          },
          '947cbf94-afc3-4055-b96d-eff284c36a09': {
            cost: 182.56450757332422,
            id: '947cbf94-afc3-4055-b96d-eff284c36a09',
            name: 'CHaaS (Production)',
            type: 'azure_cnr',
            account_id: '2d2f328c-1407-4e5e-ba59-1cbad182940f',
          },
          'd4321470-cfa8-4a67-adf5-c11faf491e14': {
            cost: 1251.2073240472118,
            id: 'd4321470-cfa8-4a67-adf5-c11faf491e14',
            name: 'CPA (Development and Test)',
            type: 'azure_cnr',
            account_id: '91819a1c-c7d3-4b89-bc9f-39f85bff4666',
          },
          '96e23b8d-854b-42d7-8b59-264e6f314b2d': {
            cost: 3.1431908932432666,
            id: '96e23b8d-854b-42d7-8b59-264e6f314b2d',
            name: 'MPT (Production)',
            type: 'azure_cnr',
            account_id: 'ef415e11-361a-4f91-8b3c-23aeb9c8f2ac',
          },
          '3f584d10-4293-4599-8ad5-413acc72fd45': {
            cost: 5.898569312866661,
            id: '3f584d10-4293-4599-8ad5-413acc72fd45',
            name: 'Marketplace (Production)',
            type: 'aws_cnr',
            account_id: '654035049067',
          },
          'b4529ebc-cf01-4671-bedc-b8fffefa47be': {
            cost: 0.5763026459333328,
            id: 'b4529ebc-cf01-4671-bedc-b8fffefa47be',
            name: ' Marketplace (Test)',
            type: 'aws_cnr',
            account_id: '996403779197',
          },
          'c86dfcec-08ba-4007-a617-8f53efbfba06': {
            cost: 7979.756830818962,
            id: 'c86dfcec-08ba-4007-a617-8f53efbfba06',
            name: 'SoftwareOne AWS',
            type: 'aws_cnr',
            account_id: '285102913731',
          },
          'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5': {
            cost: 0.024633456766666686,
            id: 'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5',
            name: 'Marketplace (Staging)',
            type: 'aws_cnr',
            account_id: '563690021965',
          },
          '1812ae7a-890f-413a-a4e3-9a76c357cfb2': {
            cost: 3161.78480098559,
            id: '1812ae7a-890f-413a-a4e3-9a76c357cfb2',
            name: 'CPA (QA and Production)',
            type: 'azure_cnr',
            account_id: 'b6689fdb-ac8c-4116-8136-c7a179cb5be6',
          },
          'cb78a18a-6adc-4780-9402-d175086accdc': {
            cost: 197.54588523847946,
            id: 'cb78a18a-6adc-4780-9402-d175086accdc',
            name: 'MPT Finops (Production)',
            type: 'azure_cnr',
            account_id: '89b098bc-b400-4578-8058-8416b0c25f6b',
          },
          '100efd88-28fb-49f1-946b-edbf78ad4650': {
            cost: 603.0699589284279,
            id: '100efd88-28fb-49f1-946b-edbf78ad4650',
            name: 'CPA (Infrastructure)',
            type: 'azure_cnr',
            account_id: '01643997-4d64-4718-8114-15e488ce3f61',
          },
          'a611abd8-9cde-4b17-ab54-31f9d43dc955': {
            cost: 83.33554396816889,
            id: 'a611abd8-9cde-4b17-ab54-31f9d43dc955',
            name: 'MPT (Test)',
            type: 'azure_cnr',
            account_id: 'dea8e892-1212-42c9-afa0-3b87e7bfffd5',
          },
          'b5d9eb31-1136-4a76-90fa-a8e2886de702': {
            cost: 0,
            id: 'b5d9eb31-1136-4a76-90fa-a8e2886de702',
            name: 'Marketplace (Dev)',
            type: 'aws_cnr',
            account_id: '203689795269',
          },
          '12fa3bce-5513-40c8-96d7-0be2fc47ebcf': {
            cost: 103.10355615204169,
            id: '12fa3bce-5513-40c8-96d7-0be2fc47ebcf',
            name: 'MPT Finops (Staging)',
            type: 'azure_cnr',
            account_id: '63f2c438-c0e1-4606-ac10-eb6aa149c6cb',
          },
          '1aa5f619-eab6-4d80-a11f-b2765c4a4795': {
            cost: 73.48914961144841,
            id: '1aa5f619-eab6-4d80-a11f-b2765c4a4795',
            name: 'CHaaS (QA)',
            type: 'azure_cnr',
            account_id: '6c73c89e-7e5b-43b5-a7c4-1b0cb260dafb',
          },
        },
        '1762646400': {
          '100efd88-28fb-49f1-946b-edbf78ad4650': {
            cost: 410.11051165401847,
            id: '100efd88-28fb-49f1-946b-edbf78ad4650',
            name: 'CPA (Infrastructure)',
            type: 'azure_cnr',
            account_id: '01643997-4d64-4718-8114-15e488ce3f61',
          },
          'a611abd8-9cde-4b17-ab54-31f9d43dc955': {
            cost: 83.41622358746469,
            id: 'a611abd8-9cde-4b17-ab54-31f9d43dc955',
            name: 'MPT (Test)',
            type: 'azure_cnr',
            account_id: 'dea8e892-1212-42c9-afa0-3b87e7bfffd5',
          },
          'cb78a18a-6adc-4780-9402-d175086accdc': {
            cost: 197.97885921195734,
            id: 'cb78a18a-6adc-4780-9402-d175086accdc',
            name: 'MPT Finops (Production)',
            type: 'azure_cnr',
            account_id: '89b098bc-b400-4578-8058-8416b0c25f6b',
          },
          '1aa5f619-eab6-4d80-a11f-b2765c4a4795': {
            cost: 73.48905602888595,
            id: '1aa5f619-eab6-4d80-a11f-b2765c4a4795',
            name: 'CHaaS (QA)',
            type: 'azure_cnr',
            account_id: '6c73c89e-7e5b-43b5-a7c4-1b0cb260dafb',
          },
          'b5d9eb31-1136-4a76-90fa-a8e2886de702': {
            cost: 0,
            id: 'b5d9eb31-1136-4a76-90fa-a8e2886de702',
            name: 'Marketplace (Dev)',
            type: 'aws_cnr',
            account_id: '203689795269',
          },
          '12fa3bce-5513-40c8-96d7-0be2fc47ebcf': {
            cost: 103.36583023406233,
            id: '12fa3bce-5513-40c8-96d7-0be2fc47ebcf',
            name: 'MPT Finops (Staging)',
            type: 'azure_cnr',
            account_id: '63f2c438-c0e1-4606-ac10-eb6aa149c6cb',
          },
          'b4529ebc-cf01-4671-bedc-b8fffefa47be': {
            cost: 0.42698035243333304,
            id: 'b4529ebc-cf01-4671-bedc-b8fffefa47be',
            name: ' Marketplace (Test)',
            type: 'aws_cnr',
            account_id: '996403779197',
          },
          '3f584d10-4293-4599-8ad5-413acc72fd45': {
            cost: 5.541556499866663,
            id: '3f584d10-4293-4599-8ad5-413acc72fd45',
            name: 'Marketplace (Production)',
            type: 'aws_cnr',
            account_id: '654035049067',
          },
          'b509e2e2-20a4-48eb-ac60-b291338feff4': {
            cost: 416.4674805912581,
            id: 'b509e2e2-20a4-48eb-ac60-b291338feff4',
            name: 'MPT (Dev)',
            type: 'azure_cnr',
            account_id: 'e30e2a6e-0712-48c3-8685-3298df063633',
          },
          '96e23b8d-854b-42d7-8b59-264e6f314b2d': {
            cost: 3.1431914290955425,
            id: '96e23b8d-854b-42d7-8b59-264e6f314b2d',
            name: 'MPT (Production)',
            type: 'azure_cnr',
            account_id: 'ef415e11-361a-4f91-8b3c-23aeb9c8f2ac',
          },
          'd4321470-cfa8-4a67-adf5-c11faf491e14': {
            cost: 1245.7995777576657,
            id: 'd4321470-cfa8-4a67-adf5-c11faf491e14',
            name: 'CPA (Development and Test)',
            type: 'azure_cnr',
            account_id: '91819a1c-c7d3-4b89-bc9f-39f85bff4666',
          },
          '947cbf94-afc3-4055-b96d-eff284c36a09': {
            cost: 180.90661707366985,
            id: '947cbf94-afc3-4055-b96d-eff284c36a09',
            name: 'CHaaS (Production)',
            type: 'azure_cnr',
            account_id: '2d2f328c-1407-4e5e-ba59-1cbad182940f',
          },
          '1812ae7a-890f-413a-a4e3-9a76c357cfb2': {
            cost: 3136.734318245062,
            id: '1812ae7a-890f-413a-a4e3-9a76c357cfb2',
            name: 'CPA (QA and Production)',
            type: 'azure_cnr',
            account_id: 'b6689fdb-ac8c-4116-8136-c7a179cb5be6',
          },
          'c86dfcec-08ba-4007-a617-8f53efbfba06': {
            cost: 7980.003203247762,
            id: 'c86dfcec-08ba-4007-a617-8f53efbfba06',
            name: 'SoftwareOne AWS',
            type: 'aws_cnr',
            account_id: '285102913731',
          },
          'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5': {
            cost: 0.02477774996666669,
            id: 'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5',
            name: 'Marketplace (Staging)',
            type: 'aws_cnr',
            account_id: '563690021965',
          },
        },
        '1762732800': {
          '1aa5f619-eab6-4d80-a11f-b2765c4a4795': {
            cost: 73.51542424857436,
            id: '1aa5f619-eab6-4d80-a11f-b2765c4a4795',
            name: 'CHaaS (QA)',
            type: 'azure_cnr',
            account_id: '6c73c89e-7e5b-43b5-a7c4-1b0cb260dafb',
          },
          '12fa3bce-5513-40c8-96d7-0be2fc47ebcf': {
            cost: 103.43952449800659,
            id: '12fa3bce-5513-40c8-96d7-0be2fc47ebcf',
            name: 'MPT Finops (Staging)',
            type: 'azure_cnr',
            account_id: '63f2c438-c0e1-4606-ac10-eb6aa149c6cb',
          },
          'b5d9eb31-1136-4a76-90fa-a8e2886de702': {
            cost: 0,
            id: 'b5d9eb31-1136-4a76-90fa-a8e2886de702',
            name: 'Marketplace (Dev)',
            type: 'aws_cnr',
            account_id: '203689795269',
          },
          'a611abd8-9cde-4b17-ab54-31f9d43dc955': {
            cost: 83.25787843668837,
            id: 'a611abd8-9cde-4b17-ab54-31f9d43dc955',
            name: 'MPT (Test)',
            type: 'azure_cnr',
            account_id: 'dea8e892-1212-42c9-afa0-3b87e7bfffd5',
          },
          '100efd88-28fb-49f1-946b-edbf78ad4650': {
            cost: 448.51964918681995,
            id: '100efd88-28fb-49f1-946b-edbf78ad4650',
            name: 'CPA (Infrastructure)',
            type: 'azure_cnr',
            account_id: '01643997-4d64-4718-8114-15e488ce3f61',
          },
          'cb78a18a-6adc-4780-9402-d175086accdc': {
            cost: 212.7944377254796,
            id: 'cb78a18a-6adc-4780-9402-d175086accdc',
            name: 'MPT Finops (Production)',
            type: 'azure_cnr',
            account_id: '89b098bc-b400-4578-8058-8416b0c25f6b',
          },
          '1812ae7a-890f-413a-a4e3-9a76c357cfb2': {
            cost: 3201.975875423831,
            id: '1812ae7a-890f-413a-a4e3-9a76c357cfb2',
            name: 'CPA (QA and Production)',
            type: 'azure_cnr',
            account_id: 'b6689fdb-ac8c-4116-8136-c7a179cb5be6',
          },
          'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5': {
            cost: 0.12482551706666681,
            id: 'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5',
            name: 'Marketplace (Staging)',
            type: 'aws_cnr',
            account_id: '563690021965',
          },
          'c86dfcec-08ba-4007-a617-8f53efbfba06': {
            cost: 7980.238914096665,
            id: 'c86dfcec-08ba-4007-a617-8f53efbfba06',
            name: 'SoftwareOne AWS',
            type: 'aws_cnr',
            account_id: '285102913731',
          },
          'b4529ebc-cf01-4671-bedc-b8fffefa47be': {
            cost: 1.159999487633333,
            id: 'b4529ebc-cf01-4671-bedc-b8fffefa47be',
            name: ' Marketplace (Test)',
            type: 'aws_cnr',
            account_id: '996403779197',
          },
          '3f584d10-4293-4599-8ad5-413acc72fd45': {
            cost: 9.70293577396667,
            id: '3f584d10-4293-4599-8ad5-413acc72fd45',
            name: 'Marketplace (Production)',
            type: 'aws_cnr',
            account_id: '654035049067',
          },
          'd4321470-cfa8-4a67-adf5-c11faf491e14': {
            cost: 1250.9286032963696,
            id: 'd4321470-cfa8-4a67-adf5-c11faf491e14',
            name: 'CPA (Development and Test)',
            type: 'azure_cnr',
            account_id: '91819a1c-c7d3-4b89-bc9f-39f85bff4666',
          },
          '96e23b8d-854b-42d7-8b59-264e6f314b2d': {
            cost: 3.1431917230544744,
            id: '96e23b8d-854b-42d7-8b59-264e6f314b2d',
            name: 'MPT (Production)',
            type: 'azure_cnr',
            account_id: 'ef415e11-361a-4f91-8b3c-23aeb9c8f2ac',
          },
          '947cbf94-afc3-4055-b96d-eff284c36a09': {
            cost: 187.717607106543,
            id: '947cbf94-afc3-4055-b96d-eff284c36a09',
            name: 'CHaaS (Production)',
            type: 'azure_cnr',
            account_id: '2d2f328c-1407-4e5e-ba59-1cbad182940f',
          },
          'b509e2e2-20a4-48eb-ac60-b291338feff4': {
            cost: 418.5641662508464,
            id: 'b509e2e2-20a4-48eb-ac60-b291338feff4',
            name: 'MPT (Dev)',
            type: 'azure_cnr',
            account_id: 'e30e2a6e-0712-48c3-8685-3298df063633',
          },
        },
        '1762819200': {
          '1812ae7a-890f-413a-a4e3-9a76c357cfb2': {
            cost: 3240.005793219025,
            id: '1812ae7a-890f-413a-a4e3-9a76c357cfb2',
            name: 'CPA (QA and Production)',
            type: 'azure_cnr',
            account_id: 'b6689fdb-ac8c-4116-8136-c7a179cb5be6',
          },
          'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5': {
            cost: 0.06729857076666669,
            id: 'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5',
            name: 'Marketplace (Staging)',
            type: 'aws_cnr',
            account_id: '563690021965',
          },
          'c86dfcec-08ba-4007-a617-8f53efbfba06': {
            cost: 7980.3478856382635,
            id: 'c86dfcec-08ba-4007-a617-8f53efbfba06',
            name: 'SoftwareOne AWS',
            type: 'aws_cnr',
            account_id: '285102913731',
          },
          'b4529ebc-cf01-4671-bedc-b8fffefa47be': {
            cost: 0.768911591433333,
            id: 'b4529ebc-cf01-4671-bedc-b8fffefa47be',
            name: ' Marketplace (Test)',
            type: 'aws_cnr',
            account_id: '996403779197',
          },
          '3f584d10-4293-4599-8ad5-413acc72fd45': {
            cost: 6.315024704266664,
            id: '3f584d10-4293-4599-8ad5-413acc72fd45',
            name: 'Marketplace (Production)',
            type: 'aws_cnr',
            account_id: '654035049067',
          },
          'd4321470-cfa8-4a67-adf5-c11faf491e14': {
            cost: 1247.32990934375,
            id: 'd4321470-cfa8-4a67-adf5-c11faf491e14',
            name: 'CPA (Development and Test)',
            type: 'azure_cnr',
            account_id: '91819a1c-c7d3-4b89-bc9f-39f85bff4666',
          },
          '96e23b8d-854b-42d7-8b59-264e6f314b2d': {
            cost: 3.133995577288059,
            id: '96e23b8d-854b-42d7-8b59-264e6f314b2d',
            name: 'MPT (Production)',
            type: 'azure_cnr',
            account_id: 'ef415e11-361a-4f91-8b3c-23aeb9c8f2ac',
          },
          '947cbf94-afc3-4055-b96d-eff284c36a09': {
            cost: 184.2793514547368,
            id: '947cbf94-afc3-4055-b96d-eff284c36a09',
            name: 'CHaaS (Production)',
            type: 'azure_cnr',
            account_id: '2d2f328c-1407-4e5e-ba59-1cbad182940f',
          },
          'b509e2e2-20a4-48eb-ac60-b291338feff4': {
            cost: 421.57021409905326,
            id: 'b509e2e2-20a4-48eb-ac60-b291338feff4',
            name: 'MPT (Dev)',
            type: 'azure_cnr',
            account_id: 'e30e2a6e-0712-48c3-8685-3298df063633',
          },
          '1aa5f619-eab6-4d80-a11f-b2765c4a4795': {
            cost: 73.5527481113661,
            id: '1aa5f619-eab6-4d80-a11f-b2765c4a4795',
            name: 'CHaaS (QA)',
            type: 'azure_cnr',
            account_id: '6c73c89e-7e5b-43b5-a7c4-1b0cb260dafb',
          },
          '12fa3bce-5513-40c8-96d7-0be2fc47ebcf': {
            cost: 103.51396997135875,
            id: '12fa3bce-5513-40c8-96d7-0be2fc47ebcf',
            name: 'MPT Finops (Staging)',
            type: 'azure_cnr',
            account_id: '63f2c438-c0e1-4606-ac10-eb6aa149c6cb',
          },
          'b5d9eb31-1136-4a76-90fa-a8e2886de702': {
            cost: 0,
            id: 'b5d9eb31-1136-4a76-90fa-a8e2886de702',
            name: 'Marketplace (Dev)',
            type: 'aws_cnr',
            account_id: '203689795269',
          },
          'a611abd8-9cde-4b17-ab54-31f9d43dc955': {
            cost: 83.34296872392666,
            id: 'a611abd8-9cde-4b17-ab54-31f9d43dc955',
            name: 'MPT (Test)',
            type: 'azure_cnr',
            account_id: 'dea8e892-1212-42c9-afa0-3b87e7bfffd5',
          },
          '100efd88-28fb-49f1-946b-edbf78ad4650': {
            cost: 424.5052846923111,
            id: '100efd88-28fb-49f1-946b-edbf78ad4650',
            name: 'CPA (Infrastructure)',
            type: 'azure_cnr',
            account_id: '01643997-4d64-4718-8114-15e488ce3f61',
          },
          'cb78a18a-6adc-4780-9402-d175086accdc': {
            cost: 254.39288758371282,
            id: 'cb78a18a-6adc-4780-9402-d175086accdc',
            name: 'MPT Finops (Production)',
            type: 'azure_cnr',
            account_id: '89b098bc-b400-4578-8058-8416b0c25f6b',
          },
        },
        '1762905600': {
          '1812ae7a-890f-413a-a4e3-9a76c357cfb2': {
            cost: 38562.17840305973,
            id: '1812ae7a-890f-413a-a4e3-9a76c357cfb2',
            name: 'CPA (QA and Production)',
            type: 'azure_cnr',
            account_id: 'b6689fdb-ac8c-4116-8136-c7a179cb5be6',
          },
          'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5': {
            cost: 0.06330497476666669,
            id: 'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5',
            name: 'Marketplace (Staging)',
            type: 'aws_cnr',
            account_id: '563690021965',
          },
          'c86dfcec-08ba-4007-a617-8f53efbfba06': {
            cost: 7980.353708185264,
            id: 'c86dfcec-08ba-4007-a617-8f53efbfba06',
            name: 'SoftwareOne AWS',
            type: 'aws_cnr',
            account_id: '285102913731',
          },
          '3f584d10-4293-4599-8ad5-413acc72fd45': {
            cost: 8.398246193866665,
            id: '3f584d10-4293-4599-8ad5-413acc72fd45',
            name: 'Marketplace (Production)',
            type: 'aws_cnr',
            account_id: '654035049067',
          },
          'b4529ebc-cf01-4671-bedc-b8fffefa47be': {
            cost: 1.4596559704333325,
            id: 'b4529ebc-cf01-4671-bedc-b8fffefa47be',
            name: ' Marketplace (Test)',
            type: 'aws_cnr',
            account_id: '996403779197',
          },
          '947cbf94-afc3-4055-b96d-eff284c36a09': {
            cost: 182.64929551528775,
            id: '947cbf94-afc3-4055-b96d-eff284c36a09',
            name: 'CHaaS (Production)',
            type: 'azure_cnr',
            account_id: '2d2f328c-1407-4e5e-ba59-1cbad182940f',
          },
          'd4321470-cfa8-4a67-adf5-c11faf491e14': {
            cost: 1175.5003384039728,
            id: 'd4321470-cfa8-4a67-adf5-c11faf491e14',
            name: 'CPA (Development and Test)',
            type: 'azure_cnr',
            account_id: '91819a1c-c7d3-4b89-bc9f-39f85bff4666',
          },
          '96e23b8d-854b-42d7-8b59-264e6f314b2d': {
            cost: 3.086619486962725,
            id: '96e23b8d-854b-42d7-8b59-264e6f314b2d',
            name: 'MPT (Production)',
            type: 'azure_cnr',
            account_id: 'ef415e11-361a-4f91-8b3c-23aeb9c8f2ac',
          },
          'b509e2e2-20a4-48eb-ac60-b291338feff4': {
            cost: 417.68444872026873,
            id: 'b509e2e2-20a4-48eb-ac60-b291338feff4',
            name: 'MPT (Dev)',
            type: 'azure_cnr',
            account_id: 'e30e2a6e-0712-48c3-8685-3298df063633',
          },
          '1aa5f619-eab6-4d80-a11f-b2765c4a4795': {
            cost: 73.77958976006622,
            id: '1aa5f619-eab6-4d80-a11f-b2765c4a4795',
            name: 'CHaaS (QA)',
            type: 'azure_cnr',
            account_id: '6c73c89e-7e5b-43b5-a7c4-1b0cb260dafb',
          },
          '12fa3bce-5513-40c8-96d7-0be2fc47ebcf': {
            cost: 95.84629601289893,
            id: '12fa3bce-5513-40c8-96d7-0be2fc47ebcf',
            name: 'MPT Finops (Staging)',
            type: 'azure_cnr',
            account_id: '63f2c438-c0e1-4606-ac10-eb6aa149c6cb',
          },
          'b5d9eb31-1136-4a76-90fa-a8e2886de702': {
            cost: 0,
            id: 'b5d9eb31-1136-4a76-90fa-a8e2886de702',
            name: 'Marketplace (Dev)',
            type: 'aws_cnr',
            account_id: '203689795269',
          },
          'a611abd8-9cde-4b17-ab54-31f9d43dc955': {
            cost: 83.28293952105551,
            id: 'a611abd8-9cde-4b17-ab54-31f9d43dc955',
            name: 'MPT (Test)',
            type: 'azure_cnr',
            account_id: 'dea8e892-1212-42c9-afa0-3b87e7bfffd5',
          },
          '100efd88-28fb-49f1-946b-edbf78ad4650': {
            cost: 2801.685007819677,
            id: '100efd88-28fb-49f1-946b-edbf78ad4650',
            name: 'CPA (Infrastructure)',
            type: 'azure_cnr',
            account_id: '01643997-4d64-4718-8114-15e488ce3f61',
          },
          'cb78a18a-6adc-4780-9402-d175086accdc': {
            cost: 243.05403412217115,
            id: 'cb78a18a-6adc-4780-9402-d175086accdc',
            name: 'MPT Finops (Production)',
            type: 'azure_cnr',
            account_id: '89b098bc-b400-4578-8058-8416b0c25f6b',
          },
        },
        '1762992000': {
          '947cbf94-afc3-4055-b96d-eff284c36a09': {
            cost: 77.07523426407906,
            id: '947cbf94-afc3-4055-b96d-eff284c36a09',
            name: 'CHaaS (Production)',
            type: 'azure_cnr',
            account_id: '2d2f328c-1407-4e5e-ba59-1cbad182940f',
          },
          'b509e2e2-20a4-48eb-ac60-b291338feff4': {
            cost: 159.21243545998675,
            id: 'b509e2e2-20a4-48eb-ac60-b291338feff4',
            name: 'MPT (Dev)',
            type: 'azure_cnr',
            account_id: 'e30e2a6e-0712-48c3-8685-3298df063633',
          },
          '3f584d10-4293-4599-8ad5-413acc72fd45': {
            cost: 1.034986812166667,
            id: '3f584d10-4293-4599-8ad5-413acc72fd45',
            name: 'Marketplace (Production)',
            type: 'aws_cnr',
            account_id: '654035049067',
          },
          'b4529ebc-cf01-4671-bedc-b8fffefa47be': {
            cost: 0.18273032093333336,
            id: 'b4529ebc-cf01-4671-bedc-b8fffefa47be',
            name: ' Marketplace (Test)',
            type: 'aws_cnr',
            account_id: '996403779197',
          },
          'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5': {
            cost: 0.009676169966666667,
            id: 'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5',
            name: 'Marketplace (Staging)',
            type: 'aws_cnr',
            account_id: '563690021965',
          },
          'c86dfcec-08ba-4007-a617-8f53efbfba06': {
            cost: 7969.570143056372,
            id: 'c86dfcec-08ba-4007-a617-8f53efbfba06',
            name: 'SoftwareOne AWS',
            type: 'aws_cnr',
            account_id: '285102913731',
          },
          '1812ae7a-890f-413a-a4e3-9a76c357cfb2': {
            cost: 794.7406200643834,
            id: '1812ae7a-890f-413a-a4e3-9a76c357cfb2',
            name: 'CPA (QA and Production)',
            type: 'azure_cnr',
            account_id: 'b6689fdb-ac8c-4116-8136-c7a179cb5be6',
          },
          'a611abd8-9cde-4b17-ab54-31f9d43dc955': {
            cost: 32.24611115484641,
            id: 'a611abd8-9cde-4b17-ab54-31f9d43dc955',
            name: 'MPT (Test)',
            type: 'azure_cnr',
            account_id: 'dea8e892-1212-42c9-afa0-3b87e7bfffd5',
          },
          '100efd88-28fb-49f1-946b-edbf78ad4650': {
            cost: 102.12120389856288,
            id: '100efd88-28fb-49f1-946b-edbf78ad4650',
            name: 'CPA (Infrastructure)',
            type: 'azure_cnr',
            account_id: '01643997-4d64-4718-8114-15e488ce3f61',
          },
          'b5d9eb31-1136-4a76-90fa-a8e2886de702': {
            cost: 0,
            id: 'b5d9eb31-1136-4a76-90fa-a8e2886de702',
            name: 'Marketplace (Dev)',
            type: 'aws_cnr',
            account_id: '203689795269',
          },
          '1aa5f619-eab6-4d80-a11f-b2765c4a4795': {
            cost: 18.75443467843585,
            id: '1aa5f619-eab6-4d80-a11f-b2765c4a4795',
            name: 'CHaaS (QA)',
            type: 'azure_cnr',
            account_id: '6c73c89e-7e5b-43b5-a7c4-1b0cb260dafb',
          },
        },
      },
      counts: {
        'b509e2e2-20a4-48eb-ac60-b291338feff4': {
          total: 3085.959216424507,
          previous_total: 3265.470861188577,
          id: 'b509e2e2-20a4-48eb-ac60-b291338feff4',
          name: 'MPT (Dev)',
          type: 'azure_cnr',
          account_id: 'e30e2a6e-0712-48c3-8685-3298df063633',
        },
        '947cbf94-afc3-4055-b96d-eff284c36a09': {
          total: 1377.3419413043523,
          previous_total: 1526.3021500036741,
          id: '947cbf94-afc3-4055-b96d-eff284c36a09',
          name: 'CHaaS (Production)',
          type: 'azure_cnr',
          account_id: '2d2f328c-1407-4e5e-ba59-1cbad182940f',
        },
        '96e23b8d-854b-42d7-8b59-264e6f314b2d': {
          total: 21.92818138194086,
          previous_total: 25.11332055897509,
          id: '96e23b8d-854b-42d7-8b59-264e6f314b2d',
          name: 'MPT (Production)',
          type: 'azure_cnr',
          account_id: 'ef415e11-361a-4f91-8b3c-23aeb9c8f2ac',
        },
        'd4321470-cfa8-4a67-adf5-c11faf491e14': {
          total: 8686.904897711644,
          previous_total: 10131.222531868401,
          id: 'd4321470-cfa8-4a67-adf5-c11faf491e14',
          name: 'CPA (Development and Test)',
          type: 'azure_cnr',
          account_id: '91819a1c-c7d3-4b89-bc9f-39f85bff4666',
        },
        '3f584d10-4293-4599-8ad5-413acc72fd45': {
          total: 48.99316262213331,
          previous_total: 41.959137527772015,
          id: '3f584d10-4293-4599-8ad5-413acc72fd45',
          name: 'Marketplace (Production)',
          type: 'aws_cnr',
          account_id: '654035049067',
        },
        'b4529ebc-cf01-4671-bedc-b8fffefa47be': {
          total: 5.860589504266664,
          previous_total: 3.520922130173116,
          id: 'b4529ebc-cf01-4671-bedc-b8fffefa47be',
          name: ' Marketplace (Test)',
          type: 'aws_cnr',
          account_id: '996403779197',
        },
        'c86dfcec-08ba-4007-a617-8f53efbfba06': {
          total: 63829.96524451262,
          previous_total: 58520.3662709389,
          id: 'c86dfcec-08ba-4007-a617-8f53efbfba06',
          name: 'SoftwareOne AWS',
          type: 'aws_cnr',
          account_id: '285102913731',
        },
        'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5': {
          total: 0.4751127021333338,
          previous_total: 0.688065651965592,
          id: 'ebb1c3bc-73c9-4a40-8fd4-0aabf760ebe5',
          name: 'Marketplace (Staging)',
          type: 'aws_cnr',
          account_id: '563690021965',
        },
        '1812ae7a-890f-413a-a4e3-9a76c357cfb2': {
          total: 58573.37540006095,
          previous_total: 26281.206488321757,
          id: '1812ae7a-890f-413a-a4e3-9a76c357cfb2',
          name: 'CPA (QA and Production)',
          type: 'azure_cnr',
          account_id: 'b6689fdb-ac8c-4116-8136-c7a179cb5be6',
        },
        'cb78a18a-6adc-4780-9402-d175086accdc': {
          total: 1503.4419078970714,
          previous_total: 1686.608998992895,
          id: 'cb78a18a-6adc-4780-9402-d175086accdc',
          name: 'MPT Finops (Production)',
          type: 'azure_cnr',
          account_id: '89b098bc-b400-4578-8058-8416b0c25f6b',
        },
        '100efd88-28fb-49f1-946b-edbf78ad4650': {
          total: 5708.43647281946,
          previous_total: 3567.3198730608306,
          id: '100efd88-28fb-49f1-946b-edbf78ad4650',
          name: 'CPA (Infrastructure)',
          type: 'azure_cnr',
          account_id: '01643997-4d64-4718-8114-15e488ce3f61',
        },
        'a611abd8-9cde-4b17-ab54-31f9d43dc955': {
          total: 615.7413242585608,
          previous_total: 663.2317165481464,
          id: 'a611abd8-9cde-4b17-ab54-31f9d43dc955',
          name: 'MPT (Test)',
          type: 'azure_cnr',
          account_id: 'dea8e892-1212-42c9-afa0-3b87e7bfffd5',
        },
        'b5d9eb31-1136-4a76-90fa-a8e2886de702': {
          total: 0,
          previous_total: 264.6172579605002,
          id: 'b5d9eb31-1136-4a76-90fa-a8e2886de702',
          name: 'Marketplace (Dev)',
          type: 'aws_cnr',
          account_id: '203689795269',
        },
        '12fa3bce-5513-40c8-96d7-0be2fc47ebcf': {
          total: 714.8654993951818,
          previous_total: 835.7250479957708,
          id: '12fa3bce-5513-40c8-96d7-0be2fc47ebcf',
          name: 'MPT Finops (Staging)',
          type: 'azure_cnr',
          account_id: '63f2c438-c0e1-4606-ac10-eb6aa149c6cb',
        },
        '1aa5f619-eab6-4d80-a11f-b2765c4a4795': {
          total: 533.5650039342875,
          previous_total: 587.4149626817302,
          id: '1aa5f619-eab6-4d80-a11f-b2765c4a4795',
          name: 'CHaaS (QA)',
          type: 'azure_cnr',
          account_id: '6c73c89e-7e5b-43b5-a7c4-1b0cb260dafb',
        },
      },
      __typename: 'ExpensesDailyBreakdown',
    },
  },
};

export const AnomaliesOwnerExpensesDailyBreakdown = {
  data: {
    expensesDailyBreakdown: {
      breakdown: {
        '1762387200': {
          '4447ab7b-da32-4d3e-8840-f244ed505c05': {
            cost: 6033.666688368158,
            id: '4447ab7b-da32-4d3e-8840-f244ed505c05',
            name: 'Francesco',
          },
          '73b8772c-7a66-4261-96e6-8e4b494dd25b': {
            cost: 0,
            id: '73b8772c-7a66-4261-96e6-8e4b494dd25b',
            name: 'Dawid',
          },
          '98acce8a-922a-4801-9bc3-0665d2b75e94': {
            cost: 7979.899682428635,
            id: '98acce8a-922a-4801-9bc3-0665d2b75e94',
            name: 'Stuart Meeks',
          },
        },
        '1762473600': {
          '4447ab7b-da32-4d3e-8840-f244ed505c05': {
            cost: 6029.118209876739,
            id: '4447ab7b-da32-4d3e-8840-f244ed505c05',
            name: 'Francesco',
          },
          '73b8772c-7a66-4261-96e6-8e4b494dd25b': {
            cost: 0,
            id: '73b8772c-7a66-4261-96e6-8e4b494dd25b',
            name: 'Dawid',
          },
          '98acce8a-922a-4801-9bc3-0665d2b75e94': {
            cost: 7979.955473303525,
            id: '98acce8a-922a-4801-9bc3-0665d2b75e94',
            name: 'Stuart Meeks',
          },
        },
        '1762560000': {
          '98acce8a-922a-4801-9bc3-0665d2b75e94': {
            cost: 7979.781464275726,
            id: '98acce8a-922a-4801-9bc3-0665d2b75e94',
            name: 'Stuart Meeks',
          },
          '73b8772c-7a66-4261-96e6-8e4b494dd25b': {
            cost: 0,
            id: '73b8772c-7a66-4261-96e6-8e4b494dd25b',
            name: 'Dawid',
          },
          '4447ab7b-da32-4d3e-8840-f244ed505c05': {
            cost: 6084.845512934136,
            id: '4447ab7b-da32-4d3e-8840-f244ed505c05',
            name: 'Francesco',
          },
        },
        '1762646400': {
          '4447ab7b-da32-4d3e-8840-f244ed505c05': {
            cost: 5857.380202665418,
            id: '4447ab7b-da32-4d3e-8840-f244ed505c05',
            name: 'Francesco',
          },
          '98acce8a-922a-4801-9bc3-0665d2b75e94': {
            cost: 7980.0279809977255,
            id: '98acce8a-922a-4801-9bc3-0665d2b75e94',
            name: 'Stuart Meeks',
          },
          '73b8772c-7a66-4261-96e6-8e4b494dd25b': {
            cost: 0,
            id: '73b8772c-7a66-4261-96e6-8e4b494dd25b',
            name: 'Dawid',
          },
        },
        '1762732800': {
          '4447ab7b-da32-4d3e-8840-f244ed505c05': {
            cost: 5994.719293157787,
            id: '4447ab7b-da32-4d3e-8840-f244ed505c05',
            name: 'Francesco',
          },
          '73b8772c-7a66-4261-96e6-8e4b494dd25b': {
            cost: 0,
            id: '73b8772c-7a66-4261-96e6-8e4b494dd25b',
            name: 'Dawid',
          },
          '98acce8a-922a-4801-9bc3-0665d2b75e94': {
            cost: 7980.363739613727,
            id: '98acce8a-922a-4801-9bc3-0665d2b75e94',
            name: 'Stuart Meeks',
          },
        },
        '1762819200': {
          '4447ab7b-da32-4d3e-8840-f244ed505c05': {
            cost: 6042.711059072201,
            id: '4447ab7b-da32-4d3e-8840-f244ed505c05',
            name: 'Francesco',
          },
          '73b8772c-7a66-4261-96e6-8e4b494dd25b': {
            cost: 0,
            id: '73b8772c-7a66-4261-96e6-8e4b494dd25b',
            name: 'Dawid',
          },
          '98acce8a-922a-4801-9bc3-0665d2b75e94': {
            cost: 7980.41518420903,
            id: '98acce8a-922a-4801-9bc3-0665d2b75e94',
            name: 'Stuart Meeks',
          },
        },
        '1762905600': {
          '4447ab7b-da32-4d3e-8840-f244ed505c05': {
            cost: 43648.60487458644,
            id: '4447ab7b-da32-4d3e-8840-f244ed505c05',
            name: 'Francesco',
          },
          '73b8772c-7a66-4261-96e6-8e4b494dd25b': {
            cost: 0,
            id: '73b8772c-7a66-4261-96e6-8e4b494dd25b',
            name: 'Dawid',
          },
          '98acce8a-922a-4801-9bc3-0665d2b75e94': {
            cost: 7980.417013160028,
            id: '98acce8a-922a-4801-9bc3-0665d2b75e94',
            name: 'Stuart Meeks',
          },
        },
        '1762992000': {
          '73b8772c-7a66-4261-96e6-8e4b494dd25b': {
            cost: 0,
            id: '73b8772c-7a66-4261-96e6-8e4b494dd25b',
            name: 'Dawid',
          },
          '98acce8a-922a-4801-9bc3-0665d2b75e94': {
            cost: 7969.579819226336,
            id: '98acce8a-922a-4801-9bc3-0665d2b75e94',
            name: 'Stuart Meeks',
          },
          '4447ab7b-da32-4d3e-8840-f244ed505c05': {
            cost: 1185.3677566533975,
            id: '4447ab7b-da32-4d3e-8840-f244ed505c05',
            name: 'Francesco',
          },
        },
      },
      counts: {
        '98acce8a-922a-4801-9bc3-0665d2b75e94': {
          total: 63830.44035721473,
          previous_total: 58521.054336590845,
          id: '98acce8a-922a-4801-9bc3-0665d2b75e94',
          name: 'Stuart Meeks',
        },
        '73b8772c-7a66-4261-96e6-8e4b494dd25b': {
          total: 0,
          previous_total: 264.61725796050024,
          id: '73b8772c-7a66-4261-96e6-8e4b494dd25b',
          name: 'Dawid',
        },
        '4447ab7b-da32-4d3e-8840-f244ed505c05': {
          total: 80876.41359731428,
          previous_total: 48615.09601087865,
          id: '4447ab7b-da32-4d3e-8840-f244ed505c05',
          name: 'Francesco',
        },
      },
      __typename: 'ExpensesDailyBreakdown',
    },
  },
};

export const AnomaliesPoolExpensesDailyBreakdown = {
  data: {
    expensesDailyBreakdown: {
      breakdown: {
        '1762387200': {
          '3971cb2b-7075-48a2-85e5-3e016fad478c': {
            cost: 1253.4163781511363,
            id: '3971cb2b-7075-48a2-85e5-3e016fad478c',
            name: 'CPA (Development and Test)',
            purpose: 'budget',
          },
          '15e33111-10c3-4aa6-8675-4878ad358d92': {
            cost: 0.643443189833333,
            id: '15e33111-10c3-4aa6-8675-4878ad358d92',
            name: ' Marketplace (Test)',
            purpose: 'budget',
          },
          'f7af9162-d278-4098-bdf8-3698c38a7437': {
            cost: 331.8611231463005,
            id: 'f7af9162-d278-4098-bdf8-3698c38a7437',
            name: 'MPT (Dev)',
            purpose: 'budget',
          },
          '7fa201b8-024c-49ca-aea4-34f575909bf9': {
            cost: 71.36918411483741,
            id: '7fa201b8-024c-49ca-aea4-34f575909bf9',
            name: 'MPT Finops (Production)',
            purpose: 'budget',
          },
          'ad6d23d2-0479-49f9-869e-00a18e99c405': {
            cost: 3.135930564693643,
            id: 'ad6d23d2-0479-49f9-869e-00a18e99c405',
            name: 'MPT (Production)',
            purpose: 'budget',
          },
          'b6a8e72f-76a7-4f01-8458-766113012a87': {
            cost: 47.63053595750492,
            id: 'b6a8e72f-76a7-4f01-8458-766113012a87',
            name: 'MPT Finops (Staging)',
            purpose: 'budget',
          },
          'e20b9495-9237-4b22-a03a-f0fb0b481a58': {
            cost: 462.6981973410838,
            id: 'e20b9495-9237-4b22-a03a-f0fb0b481a58',
            name: 'CPA (Infrastructure)',
            purpose: 'budget',
          },
          'af728938-ab69-4b6b-b39a-6f269ff3dd2b': {
            cost: 314.9776926821572,
            id: 'af728938-ab69-4b6b-b39a-6f269ff3dd2b',
            name: 'FinOps for Cloud Overall',
            purpose: 'budget',
          },
          'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1': {
            cost: 7979.820646740167,
            id: 'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1',
            name: 'SoftwareOne AWS',
            purpose: 'budget',
          },
          'ff9f883e-b58c-4f80-b497-985889906cbf': {
            cost: 0,
            id: 'ff9f883e-b58c-4f80-b497-985889906cbf',
            name: 'Marketplace (Dev) - Member Type 8',
            purpose: 'budget',
          },
          '7365f455-3210-4d34-964e-f00ce45ccbe5': {
            cost: 3511.2027599009384,
            id: '7365f455-3210-4d34-964e-f00ce45ccbe5',
            name: 'QA & Prod',
            purpose: 'budget',
          },
          'df0586b1-bcb1-404a-bdbd-d5944983db4c': {
            cost: 0.07903568846666682,
            id: 'df0586b1-bcb1-404a-bdbd-d5944983db4c',
            name: 'Marketplace (Staging)',
            purpose: 'budget',
          },
          'f43692fe-1fd5-4bcc-95b9-1d5245712fde': {
            cost: 36.73144331969266,
            id: 'f43692fe-1fd5-4bcc-95b9-1d5245712fde',
            name: 'MPT (Test)',
            purpose: 'budget',
          },
        },
        '1762473600': {
          'e20b9495-9237-4b22-a03a-f0fb0b481a58': {
            cost: 455.7258624715591,
            id: 'e20b9495-9237-4b22-a03a-f0fb0b481a58',
            name: 'CPA (Infrastructure)',
            purpose: 'budget',
          },
          'af728938-ab69-4b6b-b39a-6f269ff3dd2b': {
            cost: 314.5633643553752,
            id: 'af728938-ab69-4b6b-b39a-6f269ff3dd2b',
            name: 'FinOps for Cloud Overall',
            purpose: 'budget',
          },
          'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1': {
            cost: 7979.873912729166,
            id: 'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1',
            name: 'SoftwareOne AWS',
            purpose: 'budget',
          },
          'ff9f883e-b58c-4f80-b497-985889906cbf': {
            cost: 0,
            id: 'ff9f883e-b58c-4f80-b497-985889906cbf',
            name: 'Marketplace (Dev) - Member Type 8',
            purpose: 'budget',
          },
          '7365f455-3210-4d34-964e-f00ce45ccbe5': {
            cost: 3505.988602299745,
            id: '7365f455-3210-4d34-964e-f00ce45ccbe5',
            name: 'QA & Prod',
            purpose: 'budget',
          },
          'df0586b1-bcb1-404a-bdbd-d5944983db4c': {
            cost: 0.08156057436666676,
            id: 'df0586b1-bcb1-404a-bdbd-d5944983db4c',
            name: 'Marketplace (Staging)',
            purpose: 'budget',
          },
          'f43692fe-1fd5-4bcc-95b9-1d5245712fde': {
            cost: 36.7137147661526,
            id: 'f43692fe-1fd5-4bcc-95b9-1d5245712fde',
            name: 'MPT (Test)',
            purpose: 'budget',
          },
          '3971cb2b-7075-48a2-85e5-3e016fad478c': {
            cost: 1262.7227667115371,
            id: '3971cb2b-7075-48a2-85e5-3e016fad478c',
            name: 'CPA (Development and Test)',
            purpose: 'budget',
          },
          'f7af9162-d278-4098-bdf8-3698c38a7437': {
            cost: 331.28613675639843,
            id: 'f7af9162-d278-4098-bdf8-3698c38a7437',
            name: 'MPT (Dev)',
            purpose: 'budget',
          },
          '15e33111-10c3-4aa6-8675-4878ad358d92': {
            cost: 0.6425659456333331,
            id: '15e33111-10c3-4aa6-8675-4878ad358d92',
            name: ' Marketplace (Test)',
            purpose: 'budget',
          },
          '7fa201b8-024c-49ca-aea4-34f575909bf9': {
            cost: 70.72479883393204,
            id: '7fa201b8-024c-49ca-aea4-34f575909bf9',
            name: 'MPT Finops (Production)',
            purpose: 'budget',
          },
          'ad6d23d2-0479-49f9-869e-00a18e99c405': {
            cost: 3.142061707603147,
            id: 'ad6d23d2-0479-49f9-869e-00a18e99c405',
            name: 'MPT (Production)',
            purpose: 'budget',
          },
          'b6a8e72f-76a7-4f01-8458-766113012a87': {
            cost: 47.60833602881857,
            id: 'b6a8e72f-76a7-4f01-8458-766113012a87',
            name: 'MPT Finops (Staging)',
            purpose: 'budget',
          },
        },
        '1762560000': {
          '3971cb2b-7075-48a2-85e5-3e016fad478c': {
            cost: 1251.2073240472118,
            id: '3971cb2b-7075-48a2-85e5-3e016fad478c',
            name: 'CPA (Development and Test)',
            purpose: 'budget',
          },
          'ad6d23d2-0479-49f9-869e-00a18e99c405': {
            cost: 3.1431908932432666,
            id: 'ad6d23d2-0479-49f9-869e-00a18e99c405',
            name: 'MPT (Production)',
            purpose: 'budget',
          },
          'b6a8e72f-76a7-4f01-8458-766113012a87': {
            cost: 47.607868769576406,
            id: 'b6a8e72f-76a7-4f01-8458-766113012a87',
            name: 'MPT Finops (Staging)',
            purpose: 'budget',
          },
          'f7af9162-d278-4098-bdf8-3698c38a7437': {
            cost: 333.63328189356133,
            id: 'f7af9162-d278-4098-bdf8-3698c38a7437',
            name: 'MPT (Dev)',
            purpose: 'budget',
          },
          '15e33111-10c3-4aa6-8675-4878ad358d92': {
            cost: 0.5763026459333328,
            id: '15e33111-10c3-4aa6-8675-4878ad358d92',
            name: ' Marketplace (Test)',
            purpose: 'budget',
          },
          '7fa201b8-024c-49ca-aea4-34f575909bf9': {
            cost: 71.2983857096591,
            id: '7fa201b8-024c-49ca-aea4-34f575909bf9',
            name: 'MPT Finops (Production)',
            purpose: 'budget',
          },
          'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1': {
            cost: 7979.756830818962,
            id: 'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1',
            name: 'SoftwareOne AWS',
            purpose: 'budget',
          },
          '7365f455-3210-4d34-964e-f00ce45ccbe5': {
            cost: 3423.737027483228,
            id: '7365f455-3210-4d34-964e-f00ce45ccbe5',
            name: 'QA & Prod',
            purpose: 'budget',
          },
          'ff9f883e-b58c-4f80-b497-985889906cbf': {
            cost: 0,
            id: 'ff9f883e-b58c-4f80-b497-985889906cbf',
            name: 'Marketplace (Dev) - Member Type 8',
            purpose: 'budget',
          },
          'af728938-ab69-4b6b-b39a-6f269ff3dd2b': {
            cost: 313.78038080480513,
            id: 'af728938-ab69-4b6b-b39a-6f269ff3dd2b',
            name: 'FinOps for Cloud Overall',
            purpose: 'budget',
          },
          'e20b9495-9237-4b22-a03a-f0fb0b481a58': {
            cost: 603.069428318428,
            id: 'e20b9495-9237-4b22-a03a-f0fb0b481a58',
            name: 'CPA (Infrastructure)',
            purpose: 'budget',
          },
          'f43692fe-1fd5-4bcc-95b9-1d5245712fde': {
            cost: 36.79232236850637,
            id: 'f43692fe-1fd5-4bcc-95b9-1d5245712fde',
            name: 'MPT (Test)',
            purpose: 'budget',
          },
          'df0586b1-bcb1-404a-bdbd-d5944983db4c': {
            cost: 0.024633456766666686,
            id: 'df0586b1-bcb1-404a-bdbd-d5944983db4c',
            name: 'Marketplace (Staging)',
            purpose: 'budget',
          },
        },
        '1762646400': {
          'af728938-ab69-4b6b-b39a-6f269ff3dd2b': {
            cost: 314.02551352683366,
            id: 'af728938-ab69-4b6b-b39a-6f269ff3dd2b',
            name: 'FinOps for Cloud Overall',
            purpose: 'budget',
          },
          'e20b9495-9237-4b22-a03a-f0fb0b481a58': {
            cost: 410.11016170101846,
            id: 'e20b9495-9237-4b22-a03a-f0fb0b481a58',
            name: 'CPA (Infrastructure)',
            purpose: 'budget',
          },
          'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1': {
            cost: 7980.003203247762,
            id: 'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1',
            name: 'SoftwareOne AWS',
            purpose: 'budget',
          },
          'ff9f883e-b58c-4f80-b497-985889906cbf': {
            cost: 0,
            id: 'ff9f883e-b58c-4f80-b497-985889906cbf',
            name: 'Marketplace (Dev) - Member Type 8',
            purpose: 'budget',
          },
          '7365f455-3210-4d34-964e-f00ce45ccbe5': {
            cost: 3396.671547847486,
            id: '7365f455-3210-4d34-964e-f00ce45ccbe5',
            name: 'QA & Prod',
            purpose: 'budget',
          },
          'df0586b1-bcb1-404a-bdbd-d5944983db4c': {
            cost: 0.02477774996666669,
            id: 'df0586b1-bcb1-404a-bdbd-d5944983db4c',
            name: 'Marketplace (Staging)',
            purpose: 'budget',
          },
          'f43692fe-1fd5-4bcc-95b9-1d5245712fde': {
            cost: 36.801288271273016,
            id: 'f43692fe-1fd5-4bcc-95b9-1d5245712fde',
            name: 'MPT (Test)',
            purpose: 'budget',
          },
          '3971cb2b-7075-48a2-85e5-3e016fad478c': {
            cost: 1245.7995777576657,
            id: '3971cb2b-7075-48a2-85e5-3e016fad478c',
            name: 'CPA (Development and Test)',
            purpose: 'budget',
          },
          'ad6d23d2-0479-49f9-869e-00a18e99c405': {
            cost: 3.1431914290955425,
            id: 'ad6d23d2-0479-49f9-869e-00a18e99c405',
            name: 'MPT (Production)',
            purpose: 'budget',
          },
          'b6a8e72f-76a7-4f01-8458-766113012a87': {
            cost: 47.626959735480604,
            id: 'b6a8e72f-76a7-4f01-8458-766113012a87',
            name: 'MPT Finops (Staging)',
            purpose: 'budget',
          },
          '7fa201b8-024c-49ca-aea4-34f575909bf9': {
            cost: 71.75839990028516,
            id: '7fa201b8-024c-49ca-aea4-34f575909bf9',
            name: 'MPT Finops (Production)',
            purpose: 'budget',
          },
          'f7af9162-d278-4098-bdf8-3698c38a7437': {
            cost: 331.01658214386987,
            id: 'f7af9162-d278-4098-bdf8-3698c38a7437',
            name: 'MPT (Dev)',
            purpose: 'budget',
          },
          '15e33111-10c3-4aa6-8675-4878ad358d92': {
            cost: 0.42698035243333304,
            id: '15e33111-10c3-4aa6-8675-4878ad358d92',
            name: ' Marketplace (Test)',
            purpose: 'budget',
          },
        },
        '1762732800': {
          'df0586b1-bcb1-404a-bdbd-d5944983db4c': {
            cost: 0.12482551706666681,
            id: 'df0586b1-bcb1-404a-bdbd-d5944983db4c',
            name: 'Marketplace (Staging)',
            purpose: 'budget',
          },
          'f43692fe-1fd5-4bcc-95b9-1d5245712fde': {
            cost: 36.80035154579022,
            id: 'f43692fe-1fd5-4bcc-95b9-1d5245712fde',
            name: 'MPT (Test)',
            purpose: 'budget',
          },
          'e20b9495-9237-4b22-a03a-f0fb0b481a58': {
            cost: 448.51924559682,
            id: 'e20b9495-9237-4b22-a03a-f0fb0b481a58',
            name: 'CPA (Infrastructure)',
            purpose: 'budget',
          },
          'af728938-ab69-4b6b-b39a-6f269ff3dd2b': {
            cost: 328.81921689005486,
            id: 'af728938-ab69-4b6b-b39a-6f269ff3dd2b',
            name: 'FinOps for Cloud Overall',
            purpose: 'budget',
          },
          'ff9f883e-b58c-4f80-b497-985889906cbf': {
            cost: 0,
            id: 'ff9f883e-b58c-4f80-b497-985889906cbf',
            name: 'Marketplace (Dev) - Member Type 8',
            purpose: 'budget',
          },
          '7365f455-3210-4d34-964e-f00ce45ccbe5': {
            cost: 3472.911842552917,
            id: '7365f455-3210-4d34-964e-f00ce45ccbe5',
            name: 'QA & Prod',
            purpose: 'budget',
          },
          'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1': {
            cost: 7980.238914096665,
            id: 'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1',
            name: 'SoftwareOne AWS',
            purpose: 'budget',
          },
          'f7af9162-d278-4098-bdf8-3698c38a7437': {
            cost: 331.2880614248163,
            id: 'f7af9162-d278-4098-bdf8-3698c38a7437',
            name: 'MPT (Dev)',
            purpose: 'budget',
          },
          '15e33111-10c3-4aa6-8675-4878ad358d92': {
            cost: 1.159999487633333,
            id: '15e33111-10c3-4aa6-8675-4878ad358d92',
            name: ' Marketplace (Test)',
            purpose: 'budget',
          },
          '7fa201b8-024c-49ca-aea4-34f575909bf9': {
            cost: 73.51603328367234,
            id: '7fa201b8-024c-49ca-aea4-34f575909bf9',
            name: 'MPT Finops (Production)',
            purpose: 'budget',
          },
          'b6a8e72f-76a7-4f01-8458-766113012a87': {
            cost: 47.63274735668718,
            id: 'b6a8e72f-76a7-4f01-8458-766113012a87',
            name: 'MPT Finops (Staging)',
            purpose: 'budget',
          },
          'ad6d23d2-0479-49f9-869e-00a18e99c405': {
            cost: 3.1431917230544744,
            id: 'ad6d23d2-0479-49f9-869e-00a18e99c405',
            name: 'MPT (Production)',
            purpose: 'budget',
          },
          '3971cb2b-7075-48a2-85e5-3e016fad478c': {
            cost: 1250.9286032963696,
            id: '3971cb2b-7075-48a2-85e5-3e016fad478c',
            name: 'CPA (Development and Test)',
            purpose: 'budget',
          },
        },
        '1762819200': {
          'f7af9162-d278-4098-bdf8-3698c38a7437': {
            cost: 336.09805393307244,
            id: 'f7af9162-d278-4098-bdf8-3698c38a7437',
            name: 'MPT (Dev)',
            purpose: 'budget',
          },
          '15e33111-10c3-4aa6-8675-4878ad358d92': {
            cost: 0.768911591433333,
            id: '15e33111-10c3-4aa6-8675-4878ad358d92',
            name: ' Marketplace (Test)',
            purpose: 'budget',
          },
          '7fa201b8-024c-49ca-aea4-34f575909bf9': {
            cost: 72.11791542109675,
            id: '7fa201b8-024c-49ca-aea4-34f575909bf9',
            name: 'MPT Finops (Production)',
            purpose: 'budget',
          },
          'b6a8e72f-76a7-4f01-8458-766113012a87': {
            cost: 47.6337857756472,
            id: 'b6a8e72f-76a7-4f01-8458-766113012a87',
            name: 'MPT Finops (Staging)',
            purpose: 'budget',
          },
          'ad6d23d2-0479-49f9-869e-00a18e99c405': {
            cost: 3.133995577288059,
            id: 'ad6d23d2-0479-49f9-869e-00a18e99c405',
            name: 'MPT (Production)',
            purpose: 'budget',
          },
          '3971cb2b-7075-48a2-85e5-3e016fad478c': {
            cost: 1247.32990934375,
            id: '3971cb2b-7075-48a2-85e5-3e016fad478c',
            name: 'CPA (Development and Test)',
            purpose: 'budget',
          },
          'df0586b1-bcb1-404a-bdbd-d5944983db4c': {
            cost: 0.06729857076666669,
            id: 'df0586b1-bcb1-404a-bdbd-d5944983db4c',
            name: 'Marketplace (Staging)',
            purpose: 'budget',
          },
          'f43692fe-1fd5-4bcc-95b9-1d5245712fde': {
            cost: 36.705071203579095,
            id: 'f43692fe-1fd5-4bcc-95b9-1d5245712fde',
            name: 'MPT (Test)',
            purpose: 'budget',
          },
          'e20b9495-9237-4b22-a03a-f0fb0b481a58': {
            cost: 424.5048958923111,
            id: 'e20b9495-9237-4b22-a03a-f0fb0b481a58',
            name: 'CPA (Infrastructure)',
            purpose: 'budget',
          },
          'af728938-ab69-4b6b-b39a-6f269ff3dd2b': {
            cost: 370.265602844656,
            id: 'af728938-ab69-4b6b-b39a-6f269ff3dd2b',
            name: 'FinOps for Cloud Overall',
            purpose: 'budget',
          },
          '7365f455-3210-4d34-964e-f00ce45ccbe5': {
            cost: 3504.1529174893953,
            id: '7365f455-3210-4d34-964e-f00ce45ccbe5',
            name: 'QA & Prod',
            purpose: 'budget',
          },
          'ff9f883e-b58c-4f80-b497-985889906cbf': {
            cost: 0,
            id: 'ff9f883e-b58c-4f80-b497-985889906cbf',
            name: 'Marketplace (Dev) - Member Type 8',
            purpose: 'budget',
          },
          'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1': {
            cost: 7980.3478856382635,
            id: 'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1',
            name: 'SoftwareOne AWS',
            purpose: 'budget',
          },
        },
        '1762905600': {
          'f7af9162-d278-4098-bdf8-3698c38a7437': {
            cost: 332.4849522439,
            id: 'f7af9162-d278-4098-bdf8-3698c38a7437',
            name: 'MPT (Dev)',
            purpose: 'budget',
          },
          '15e33111-10c3-4aa6-8675-4878ad358d92': {
            cost: 1.4596559704333325,
            id: '15e33111-10c3-4aa6-8675-4878ad358d92',
            name: ' Marketplace (Test)',
            purpose: 'budget',
          },
          '7fa201b8-024c-49ca-aea4-34f575909bf9': {
            cost: 66.68823541516134,
            id: '7fa201b8-024c-49ca-aea4-34f575909bf9',
            name: 'MPT Finops (Production)',
            purpose: 'budget',
          },
          'ad6d23d2-0479-49f9-869e-00a18e99c405': {
            cost: 3.086619486962725,
            id: 'ad6d23d2-0479-49f9-869e-00a18e99c405',
            name: 'MPT (Production)',
            purpose: 'budget',
          },
          'b6a8e72f-76a7-4f01-8458-766113012a87': {
            cost: 43.73600798631523,
            id: 'b6a8e72f-76a7-4f01-8458-766113012a87',
            name: 'MPT Finops (Staging)',
            purpose: 'budget',
          },
          '3971cb2b-7075-48a2-85e5-3e016fad478c': {
            cost: 1175.5003384039728,
            id: '3971cb2b-7075-48a2-85e5-3e016fad478c',
            name: 'CPA (Development and Test)',
            purpose: 'budget',
          },
          'df0586b1-bcb1-404a-bdbd-d5944983db4c': {
            cost: 0.06330497476666669,
            id: 'df0586b1-bcb1-404a-bdbd-d5944983db4c',
            name: 'Marketplace (Staging)',
            purpose: 'budget',
          },
          'f43692fe-1fd5-4bcc-95b9-1d5245712fde': {
            cost: 36.71403150303892,
            id: 'f43692fe-1fd5-4bcc-95b9-1d5245712fde',
            name: 'MPT (Test)',
            purpose: 'budget',
          },
          'e20b9495-9237-4b22-a03a-f0fb0b481a58': {
            cost: 2801.684476078677,
            id: 'e20b9495-9237-4b22-a03a-f0fb0b481a58',
            name: 'CPA (Infrastructure)',
            purpose: 'budget',
          },
          'af728938-ab69-4b6b-b39a-6f269ff3dd2b': {
            cost: 360.2450229689787,
            id: 'af728938-ab69-4b6b-b39a-6f269ff3dd2b',
            name: 'FinOps for Cloud Overall',
            purpose: 'budget',
          },
          'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1': {
            cost: 7980.353708185264,
            id: 'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1',
            name: 'SoftwareOne AWS',
            purpose: 'budget',
          },
          '7365f455-3210-4d34-964e-f00ce45ccbe5': {
            cost: 38827.00553452907,
            id: '7365f455-3210-4d34-964e-f00ce45ccbe5',
            name: 'QA & Prod',
            purpose: 'budget',
          },
          'ff9f883e-b58c-4f80-b497-985889906cbf': {
            cost: 0,
            id: 'ff9f883e-b58c-4f80-b497-985889906cbf',
            name: 'Marketplace (Dev) - Member Type 8',
            purpose: 'budget',
          },
        },
        '1762992000': {
          'f7af9162-d278-4098-bdf8-3698c38a7437': {
            cost: 126.2828620329871,
            id: 'f7af9162-d278-4098-bdf8-3698c38a7437',
            name: 'MPT (Dev)',
            purpose: 'budget',
          },
          '15e33111-10c3-4aa6-8675-4878ad358d92': {
            cost: 0.18273032093333336,
            id: '15e33111-10c3-4aa6-8675-4878ad358d92',
            name: ' Marketplace (Test)',
            purpose: 'budget',
          },
          '7365f455-3210-4d34-964e-f00ce45ccbe5': {
            cost: 891.6052758190651,
            id: '7365f455-3210-4d34-964e-f00ce45ccbe5',
            name: 'QA & Prod',
            purpose: 'budget',
          },
          'ff9f883e-b58c-4f80-b497-985889906cbf': {
            cost: 0,
            id: 'ff9f883e-b58c-4f80-b497-985889906cbf',
            name: 'Marketplace (Dev) - Member Type 8',
            purpose: 'budget',
          },
          'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1': {
            cost: 7969.570143056372,
            id: 'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1',
            name: 'SoftwareOne AWS',
            purpose: 'budget',
          },
          'e20b9495-9237-4b22-a03a-f0fb0b481a58': {
            cost: 102.12110994156289,
            id: 'e20b9495-9237-4b22-a03a-f0fb0b481a58',
            name: 'CPA (Infrastructure)',
            purpose: 'budget',
          },
          'af728938-ab69-4b6b-b39a-6f269ff3dd2b': {
            cost: 50.362652246795705,
            id: 'af728938-ab69-4b6b-b39a-6f269ff3dd2b',
            name: 'FinOps for Cloud Overall',
            purpose: 'budget',
          },
          'f43692fe-1fd5-4bcc-95b9-1d5245712fde': {
            cost: 14.813126292050466,
            id: 'f43692fe-1fd5-4bcc-95b9-1d5245712fde',
            name: 'MPT (Test)',
            purpose: 'budget',
          },
          'df0586b1-bcb1-404a-bdbd-d5944983db4c': {
            cost: 0.009676169966666667,
            id: 'df0586b1-bcb1-404a-bdbd-d5944983db4c',
            name: 'Marketplace (Staging)',
            purpose: 'budget',
          },
        },
      },
      counts: {
        'f7af9162-d278-4098-bdf8-3698c38a7437': {
          total: 2453.951053574906,
          previous_total: 2563.6619134713865,
          id: 'f7af9162-d278-4098-bdf8-3698c38a7437',
          name: 'MPT (Dev)',
          purpose: 'budget',
        },
        '15e33111-10c3-4aa6-8675-4878ad358d92': {
          total: 5.860589504266664,
          previous_total: 3.520922130173116,
          id: '15e33111-10c3-4aa6-8675-4878ad358d92',
          name: ' Marketplace (Test)',
          purpose: 'budget',
        },
        '7fa201b8-024c-49ca-aea4-34f575909bf9': {
          total: 497.47295267864416,
          previous_total: 556.3452904539638,
          id: '7fa201b8-024c-49ca-aea4-34f575909bf9',
          name: 'MPT Finops (Production)',
          purpose: 'budget',
        },
        'b6a8e72f-76a7-4f01-8458-766113012a87': {
          total: 329.4762416100301,
          previous_total: 380.967810859752,
          id: 'b6a8e72f-76a7-4f01-8458-766113012a87',
          name: 'MPT Finops (Staging)',
          purpose: 'budget',
        },
        'ad6d23d2-0479-49f9-869e-00a18e99c405': {
          total: 21.92818138194086,
          previous_total: 25.11332055897509,
          id: 'ad6d23d2-0479-49f9-869e-00a18e99c405',
          name: 'MPT (Production)',
          purpose: 'budget',
        },
        '3971cb2b-7075-48a2-85e5-3e016fad478c': {
          total: 8686.904897711644,
          previous_total: 10131.222531868403,
          id: '3971cb2b-7075-48a2-85e5-3e016fad478c',
          name: 'CPA (Development and Test)',
          purpose: 'budget',
        },
        'df0586b1-bcb1-404a-bdbd-d5944983db4c': {
          total: 0.47511270213333373,
          previous_total: 0.6880656519655921,
          id: 'df0586b1-bcb1-404a-bdbd-d5944983db4c',
          name: 'Marketplace (Staging)',
          purpose: 'budget',
        },
        'f43692fe-1fd5-4bcc-95b9-1d5245712fde': {
          total: 272.0713492700834,
          previous_total: 293.8930126872219,
          id: 'f43692fe-1fd5-4bcc-95b9-1d5245712fde',
          name: 'MPT (Test)',
          purpose: 'budget',
        },
        'e20b9495-9237-4b22-a03a-f0fb0b481a58': {
          total: 5708.433377341461,
          previous_total: 3567.31503471183,
          id: 'e20b9495-9237-4b22-a03a-f0fb0b481a58',
          name: 'CPA (Infrastructure)',
          purpose: 'budget',
        },
        'af728938-ab69-4b6b-b39a-6f269ff3dd2b': {
          total: 2367.0394463196562,
          previous_total: 2656.1734356020643,
          id: 'af728938-ab69-4b6b-b39a-6f269ff3dd2b',
          name: 'FinOps for Cloud Overall',
          purpose: 'budget',
        },
        '7365f455-3210-4d34-964e-f00ce45ccbe5': {
          total: 60533.27550792184,
          previous_total: 28436.882738534943,
          id: '7365f455-3210-4d34-964e-f00ce45ccbe5',
          name: 'QA & Prod',
          purpose: 'budget',
        },
        'ff9f883e-b58c-4f80-b497-985889906cbf': {
          total: 0,
          previous_total: 264.6172579605002,
          id: 'ff9f883e-b58c-4f80-b497-985889906cbf',
          name: 'Marketplace (Dev) - Member Type 8',
          purpose: 'budget',
        },
        'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1': {
          total: 63829.96524451262,
          previous_total: 58520.366270938895,
          id: 'df1fa42f-59bd-4f0d-9d00-61e4c41fb5c1',
          name: 'SoftwareOne AWS',
          purpose: 'budget',
        },
      },
      __typename: 'ExpensesDailyBreakdown',
    },
  },
};
