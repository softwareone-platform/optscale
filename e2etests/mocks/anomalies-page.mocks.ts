export const AnomaliesOrganizationAllowedActionsResponse = {
  data: {
    organizationAllowedActions: {
      '3d0fe384-b1cf-4929-ad5e-1aa544f93dd5': [
        'MANAGE_CHECKLISTS',
        'MANAGE_POOLS',
        'INFO_PARTNER',
        'MANAGE_OWN_RESOURCES',
        'LIST_USERS',
        'MANAGE_PERMISSIONS',
        'CREATE_PARTNER',
        'BOOK_ENVIRONMENTS',
        'MANAGE_RESOURCES',
        'POLL_EVENT',
        'DELETE_PARTNER',
        'ASSIGN_SELF',
        'INFO_ORGANIZATION',
        'EDIT_PARTNER',
        'ASSIGN_USER',
        'MANAGE_CLOUD_CREDENTIALS',
        'MANAGE_INVITES',
        'ACK_EVENT',
      ],
    },
  },
};

export const AnomaliesOrganizationsResponse = {
  data: {
    organizations: [
      {
        id: '3d0fe384-b1cf-4929-ad5e-1aa544f93dd5',
        name: 'SoftwareOne (Test Environment)',
        pool_id: 'ccaceadf-6878-4ab4-9fd8-3f6177d0b9d3',
        currency: 'USD',
        is_demo: false,
        disabled: false,
        __typename: 'Organization',
      },
    ],
  },
};

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

export const AnomaliesDefaultExpensesOrganizationConstraintResponse = {
  data: {
    organizationConstraint: {
      id: '96ca4f90-0273-4b48-a71c-3ab71e7152be',
      name: 'Default - expense anomaly',
      type: 'expense_anomaly',
      definition: {
        threshold_days: 7,
        threshold: 30,
      },
      filters: {},
      last_run_result: {
        average: 13977.05900977757,
        today: 8322.009982722153,
        breakdown: {
          '1762214400': 14067.61638744421,
          '1762300800': 14008.000138267224,
          '1762387200': 14013.566961521621,
          '1762473600': 14009.072832981701,
          '1762560000': 14064.62650350049,
          '1762646400': 13837.408699882479,
          '1762732800': 13839.121544845262,
        },
      },
      __typename: 'OrganizationConstraint',
    },
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
