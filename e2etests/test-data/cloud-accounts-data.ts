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
                "account_id": "f34dca74-7ae2-4035-9ae0-3b74f9dc5eb2",
                "id": "f7322649-49ba-4f32-969a-1cb9d72a29e3",
                "last_getting_metric_attempt_at": 1745405169,
                "last_getting_metric_attempt_error": "mongo:80: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms), Timeout: 30s, Topology Description: <TopologyDescription id: 66c71b502daf0022ab351be2, topology_type: Unknown, servers: [<ServerDescription ('mongo', 80) server_type: Unknown, rtt: None, error=NetworkTimeout('mongo:80: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>]>",
                "last_getting_metrics_at": 1745405169,
                "last_import_at": 1745405169,
                "last_import_attempt_at": 1745405169,
                "last_import_attempt_error": "500 Server Error: Internal Server Error for url: http://restapi:80/restapi/v2/organizations/51afcca1-ac6d-4da2-8040-fc76fa078d64/process_alerts",
                "name": "Ali dev",
                "parent_id": null,
                "type": "alibaba_cnr",
                "details": {
                    "cost": 378.17856270000095,
                    "resources": 75,
                    "forecast": 514.09,
                    "last_month_cost": 522.2314100399994,
                    "__typename": "DataSourceDetails"
                },
                "config": {
                    "access_key_id": null,
                    "__typename": "AlibabaConfig"
                },
                "__typename": "AlibabaDataSource"
            },
            {
                "account_id": "e529f793-827c-4b99-acb9-1952de18fa89",
                "id": "5c925154-e72a-4f6b-a9ab-c7dee9427889",
                "last_getting_metric_attempt_at": 1745405169,
                "last_getting_metric_attempt_error": "mongo-0.mongo-discovery.default.svc.cluster.local:27017: [Errno 113] No route to host (configured timeouts: connectTimeoutMS: 20000.0ms)",
                "last_getting_metrics_at": 1745405169,
                "last_import_at": 1745405169,
                "last_import_attempt_at": 1745405169,
                "last_import_attempt_error": "500 Server Error: Internal Server Error for url: http://restapi:80/restapi/v2/organizations/51afcca1-ac6d-4da2-8040-fc76fa078d64/process_alerts",
                "name": "AWS HQ(E2E)",
                "parent_id": null,
                "type": "aws_cnr",
                "details": {
                    "cost": 1396.1336448774027,
                    "resources": 283,
                    "forecast": 1970.06,
                    "last_month_cost": 2406.152078461824,
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
                "account_id": "74101c9c-e2ad-4c4e-a0b7-bed3fe97fc46",
                "id": "e349f5c9-23e2-46f4-a825-e39d9525df07",
                "last_getting_metric_attempt_at": 1745405169,
                "last_getting_metric_attempt_error": "Could not reach any servers in [('mongo-0.mongo-discovery.default.svc.cluster.local', 27017)]. Replica set is configured with internal hostnames or IPs?, Timeout: 30s, Topology Description: <TopologyDescription id: 67932d2c8c34efcd18696c10, topology_type: ReplicaSetNoPrimary, servers: [<ServerDescription ('mongo-0.mongo-discovery.default.svc.cluster.local', 27017) server_type: Unknown, rtt: None, error=AutoReconnect('mongo-0.mongo-discovery.default.svc.cluster.local:27017: [Errno 111] Connection refused (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>]>",
                "last_getting_metrics_at": 1745405169,
                "last_import_at": 1745405169,
                "last_import_attempt_at": 1745405169,
                "last_import_attempt_error": "500 Server Error: Internal Server Error for url: http://restapi:80/restapi/v2/organizations/51afcca1-ac6d-4da2-8040-fc76fa078d64/process_alerts",
                "name": "AWS Marketing",
                "parent_id": null,
                "type": "aws_cnr",
                "details": {
                    "cost": 660.2440185310019,
                    "resources": 42,
                    "forecast": 892.46,
                    "last_month_cost": 878.1792224037625,
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
                "account_id": "21f20f21-4b20-4317-b9d3-7ab10591d9b9",
                "id": "1b5d53f3-48a2-414a-a8ae-69f468b2fbc6",
                "last_getting_metric_attempt_at": 1745405169,
                "last_getting_metric_attempt_error": "'value'",
                "last_getting_metrics_at": 1745405169,
                "last_import_at": 1745405169,
                "last_import_attempt_at": 1745405169,
                "last_import_attempt_error": "52faba002e2143309ecdd8f89c186ff3",
                "name": "Azure QA",
                "parent_id": null,
                "type": "azure_cnr",
                "details": {
                    "cost": 198.53014163656061,
                    "resources": 46,
                    "forecast": 266.12,
                    "last_month_cost": 249.22043772368775,
                    "__typename": "DataSourceDetails"
                },
                "config": {
                    "client_id": null,
                    "expense_import_scheme": null,
                    "subscription_id": null,
                    "tenant": null,
                    "export_name": null,
                    "container": null,
                    "directory": null,
                    "__typename": "AzureSubscriptionConfig"
                },
                "__typename": "AzureSubscriptionDataSource"
            },
            {
                "account_id": "490d6f9a-bfa0-4478-a3ed-3fc4075366f2",
                "id": "42ede413-a8a1-43f0-b9b2-89e49c4b385f",
                "last_getting_metric_attempt_at": 1745405169,
                "last_getting_metric_attempt_error": "mongo:80: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms), Timeout: 30s, Topology Description: <TopologyDescription id: 67932d888c34efcd18696c12, topology_type: Unknown, servers: [<ServerDescription ('mongo', 80) server_type: Unknown, rtt: None, error=NetworkTimeout('mongo:80: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>]>",
                "last_getting_metrics_at": 1745405169,
                "last_import_at": 1745405169,
                "last_import_attempt_at": 1745405169,
                "last_import_attempt_error": "500 Server Error: Internal Server Error for url: http://restapi:80/restapi/v2/organizations/51afcca1-ac6d-4da2-8040-fc76fa078d64/process_alerts",
                "name": "Dev environment",
                "parent_id": null,
                "type": "azure_cnr",
                "details": {
                    "cost": 618.664070933299,
                    "resources": 134,
                    "forecast": 856.1,
                    "last_month_cost": 954.3223329093478,
                    "__typename": "DataSourceDetails"
                },
                "config": {
                    "client_id": null,
                    "expense_import_scheme": null,
                    "subscription_id": null,
                    "tenant": null,
                    "export_name": null,
                    "container": null,
                    "directory": null,
                    "__typename": "AzureSubscriptionConfig"
                },
                "__typename": "AzureSubscriptionDataSource"
            },
            {
                "account_id": "6300b5ec-d407-4b0c-9890-504a9c8cc365",
                "id": "760d2e7b-1497-4c58-bb6c-1e55f2864b09",
                "last_getting_metric_attempt_at": 1745405169,
                "last_getting_metric_attempt_error": null,
                "last_getting_metrics_at": 1745405169,
                "last_import_at": 1745405169,
                "last_import_attempt_at": 1745405169,
                "last_import_attempt_error": "500 Server Error: Internal Server Error for url: http://restapi:80/restapi/v2/organizations/51afcca1-ac6d-4da2-8040-fc76fa078d64/process_alerts",
                "name": "Environment",
                "parent_id": null,
                "type": "environment",
                "details": {
                    "cost": 45.936000000000035,
                    "resources": 4,
                    "forecast": 62.64,
                    "last_month_cost": 64.7279999880791,
                    "__typename": "DataSourceDetails"
                },
                "__typename": "EnvironmentDataSource"
            },
            {
                "account_id": "863d73c5-7865-4d7f-97be-5772718074b6",
                "id": "6496fa15-0877-48be-b8f7-46c4c666299d",
                "last_getting_metric_attempt_at": 1745405169,
                "last_getting_metric_attempt_error": "Deadline of 120.0s exceeded while calling target function, last exception: 504 Deadline Exceeded",
                "last_getting_metrics_at": 1745405169,
                "last_import_at": 1745405169,
                "last_import_attempt_at": 1745405169,
                "last_import_attempt_error": "500 Server Error: Internal Server Error for url: http://restapi:80/restapi/v2/organizations/51afcca1-ac6d-4da2-8040-fc76fa078d64/process_alerts",
                "name": "GCP dev",
                "parent_id": null,
                "type": "gcp_cnr",
                "details": {
                    "cost": 679.0680940000016,
                    "resources": 101,
                    "forecast": 899.66,
                    "last_month_cost": 782.3755328678072,
                    "__typename": "DataSourceDetails"
                },
                "config": {
                    "billing_data": null,
                    "__typename": "GcpConfig"
                },
                "__typename": "GcpDataSource"
            },
            {
                "account_id": "b8d64491-f7e3-4c29-820e-0f743578f6a6",
                "id": "1e309056-acb7-40f7-9de0-2b3591f344f4",
                "last_getting_metric_attempt_at": 1745405169,
                "last_getting_metric_attempt_error": "mongo:80: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms), Timeout: 30s, Topology Description: <TopologyDescription id: 678e2e46b6cc33f658afa584, topology_type: Unknown, servers: [<ServerDescription ('mongo', 80) server_type: Unknown, rtt: None, error=NetworkTimeout('mongo:80: timed out (configured timeouts: socketTimeoutMS: 20000.0ms, connectTimeoutMS: 20000.0ms)')>]>",
                "last_getting_metrics_at": 1745405169,
                "last_import_at": 1745405169,
                "last_import_attempt_at": 1745405169,
                "last_import_attempt_error": "500 Server Error: Internal Server Error for url: http://restapi:80/restapi/v2/organizations/51afcca1-ac6d-4da2-8040-fc76fa078d64/process_alerts",
                "name": "K8s dev",
                "parent_id": null,
                "type": "kubernetes_cnr",
                "details": {
                    "cost": 263.0108490217634,
                    "resources": 139,
                    "forecast": 338.29,
                    "last_month_cost": 235.6914593375433,
                    "__typename": "DataSourceDetails"
                },
                "config": {
                    "cost_model": {
                        "cpu_hourly_cost": 0.006,
                        "memory_hourly_cost": 0.004,
                        "__typename": "K8CostModelConfig"
                    },
                    "user": "optscale",
                    "__typename": "K8sConfig"
                },
                "__typename": "K8sDataSource"
            }
        ]
    }
}
