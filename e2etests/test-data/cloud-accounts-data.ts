export const CloudAccountsResponse = {
    "deleted_at": 0,
    "id": "8aa40358-d32b-46d5-b6b0-addf4d341d03",
    "created_at": 1741082622,
    "limit": 15000,
    "name": "Sunflower Inc",
    "organization_id": "6765b96c-3fda-4073-ade4-aaa840e45f97",
    "parent_id": null,
    "purpose": "business_unit",
    "default_owner_id": "b547193e-fa5d-4698-96a4-059ecc53f260",
    "default_owner_name": "Demo User",
    "unallocated_limit": 13156
}

export const DataSourcesResponse = {
    "data": {
        "dataSources": [
            {
                "account_id": "7dbad33c-5732-43aa-82f2-6e5b6c3a26d7",
                "id": "4dafda38-1dfa-44ed-a196-30e0e582a33b",
                "last_getting_metric_attempt_at": 1740394800,
                "last_getting_metric_attempt_error": "Could not reach any servers in [('mongo-0.mongo-discovery.default.svc.cluster.local', 27017)]. Replica set is configured with internal hostnames or IPs?, Timeout: 30s, Topology Description: <TopologyDescription id: 66c5756a119781d61d4051c3, topology_type: ReplicaSetNoPrimary, servers: [<ServerDescription ('mongo-0.mongo-discovery.default.svc.cluster.local', 27017) server_type: Unknown, rtt: None, error=AutoReconnect('mongo-0.mongo-discovery.default.svc.cluster.local:27017: [Errno -2] Name or service not known (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>]>",
                "last_getting_metrics_at": 1740394800,
                "last_import_at": 1740394800,
                "last_import_attempt_at": 1740394800,
                "last_import_attempt_error": "500 Server Error: Internal Server Error for url: http://restapi:80/restapi/v2/cloud_accounts/fd09fa10-1b30-4a39-9a6b-fc1d7e85d9f3/cloud_resources/bulk?behavior=skip_existing&return_resources=True&is_report_import=True",
                "name": "AWS HQ",
                "parent_id": null,
                "type": "aws_cnr",
                "details": {
                    "cost": 107.8875973662001,
                    "resources": 229,
                    "forecast": 2101.59,
                    "last_month_cost": 2255.0146895319936,
                    "__typename": "DataSourceDetails"
                },
                "config": {
                    "access_key_id": null,
                    "linked": null,
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
                "account_id": "7906444d-4e6a-4efc-ac85-8d8d549bd5cf",
                "id": "38143588-497d-4750-b49b-583029dc80b2",
                "last_getting_metric_attempt_at": 1741096403,
                "last_getting_metric_attempt_error": "mongo:80: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms), Timeout: 30s, Topology Description: <TopologyDescription id: 662ccd4fef8dd8ab43157427, topology_type: Unknown, servers: [<ServerDescription ('mongo', 80) server_type: Unknown, rtt: None, error=NetworkTimeout('mongo:80: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>]>",
                "last_getting_metrics_at": 1741096403,
                "last_import_at": 1741096403,
                "last_import_attempt_at": 1741096403,
                "last_import_attempt_error": "500 Server Error: Internal Server Error for url: http://restapi:80/restapi/v2/cloud_accounts/fd09fa10-1b30-4a39-9a6b-fc1d7e85d9f3/cloud_resources/bulk?behavior=skip_existing&return_resources=True&is_report_import=True",
                "name": "AWS Marketing",
                "parent_id": null,
                "type": "aws_cnr",
                "details": {
                    "cost": 36.362839910999995,
                    "resources": 41,
                    "forecast": 601.81,
                    "last_month_cost": 633.7925311668025,
                    "__typename": "DataSourceDetails"
                },
                "config": {
                    "access_key_id": null,
                    "linked": null,
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
                "account_id": "940be279-c27f-4fb5-a68e-7d0260402f29",
                "id": "ea52b1da-799d-4136-94b6-2c2d63ebe7d1",
                "last_getting_metric_attempt_at": 1741096403,
                "last_getting_metric_attempt_error": "{'code': 'InternalServerError', 'message': \"Encountered internal server error. Diagnostic information: timestamp '20240517T013135Z', subscription id '', tracking id '35bad83d-991b-4a66-94a8-16cac4f29630', request correlation id '35bad83d-991b-4a66-94a8-16cac4f29630'.\"}",
                "last_getting_metrics_at": 1741096403,
                "last_import_at": 1741096403,
                "last_import_attempt_at": 1741096403,
                "last_import_attempt_error": "248209ebe6884c61962bf9e105463962",
                "name": "Azure QA",
                "parent_id": null,
                "type": "azure_cnr",
                "details": {
                    "cost": 18.609123005642264,
                    "resources": 43,
                    "forecast": 236.42,
                    "last_month_cost": 239.53687193170484,
                    "__typename": "DataSourceDetails"
                },
                "config": {
                    "client_id": null,
                    "expense_import_scheme": null,
                    "subscription_id": null,
                    "tenant": null,
                    "__typename": "AzureSubscriptionConfig"
                },
                "__typename": "AzureSubscriptionDataSource"
            },
            {
                "account_id": "b60f638c-692a-43ab-841e-5730f475cce7",
                "id": "88f81d55-ce31-4480-9ae6-166ee310dac7",
                "last_getting_metric_attempt_at": 1741096403,
                "last_getting_metric_attempt_error": "'value'",
                "last_getting_metrics_at": 1741096403,
                "last_import_at": 1741096403,
                "last_import_attempt_at": 1741096403,
                "last_import_attempt_error": "Could not reach any servers in [('mongo-0.mongo-discovery.default.svc.cluster.local', 27017)]. Replica set is configured with internal hostnames or IPs?, Timeout: 30s, Topology Description: <TopologyDescription id: 66c8337c7ace8811a6a2c270, topology_type: ReplicaSetNoPrimary, servers: [<ServerDescription ('mongo-0.mongo-discovery.default.svc.cluster.local', 27017) server_type: Unknown, rtt: None, error=AutoReconnect('mongo-0.mongo-discovery.default.svc.cluster.local:27017: [Errno 111] Connection refused (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>]>",
                "name": "Dev environment",
                "parent_id": null,
                "type": "azure_cnr",
                "details": {
                    "cost": 101.9566838941063,
                    "resources": 103,
                    "forecast": 991.13,
                    "last_month_cost": 951.8820524342326,
                    "__typename": "DataSourceDetails"
                },
                "config": {
                    "client_id": null,
                    "expense_import_scheme": null,
                    "subscription_id": null,
                    "tenant": null,
                    "__typename": "AzureSubscriptionConfig"
                },
                "__typename": "AzureSubscriptionDataSource"
            },
            {
                "account_id": "dbfa7558-89b9-4058-a4c2-812fe57d9ae7",
                "id": "0e0bf732-c498-4571-88a9-bcd6bbd1b95e",
                "last_getting_metric_attempt_at": 1741096403,
                "last_getting_metric_attempt_error": null,
                "last_getting_metrics_at": 1741096403,
                "last_import_at": 1741096403,
                "last_import_attempt_at": 1741096403,
                "last_import_attempt_error": null,
                "name": "Environment",
                "parent_id": null,
                "type": "environment",
                "details": {
                    "cost": 6.264000000000001,
                    "resources": 4,
                    "forecast": 60.88,
                    "last_month_cost": 58.46400000000008,
                    "__typename": "DataSourceDetails"
                },
                "__typename": "EnvironmentDataSource"
            },
            {
                "account_id": "82ede041-00af-4020-9d42-e4c410dc3d12",
                "id": "3f5a8dcf-98bd-4de4-a0eb-db222c426e0b",
                "last_getting_metric_attempt_at": 1740394800,
                "last_getting_metric_attempt_error": "Deadline of 120.0s exceeded while calling target function, last exception: 504 Deadline Exceeded",
                "last_getting_metrics_at": 1740394800,
                "last_import_at": 1740394800,
                "last_import_attempt_at": 1740394800,
                "last_import_attempt_error": "'Gcp' object has no attribute '_fix_region'",
                "name": "GCP dev",
                "parent_id": null,
                "type": "gcp_cnr",
                "details": {
                    "cost": 181.68348200000017,
                    "resources": 83,
                    "forecast": 1402.28,
                    "last_month_cost": 1264.9524660000009,
                    "__typename": "DataSourceDetails"
                },
                "config": {
                    "billing_data": null,
                    "__typename": "GcpConfig"
                },
                "__typename": "GcpDataSource"
            }
        ]
    }
}