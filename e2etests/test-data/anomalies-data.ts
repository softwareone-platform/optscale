export const AnomaliesConstraintsResponse = {
    "organization_constraints": [
        {
            "deleted_at": 0,
            "id": "274c55fc-07b1-45fa-8721-26bc1f91b8f9",
            "created_at": 1694587419,
            "name": "Marketing expenses",
            "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7",
            "type": "expense_anomaly",
            "definition": {
                "threshold_days": 30,
                "threshold": 10
            },
            "filters": {
                "pool": [
                    {
                        "id": "628ca9cf-d1d5-48c3-bee2-03e214f360e7+",
                        "name": "Marketing",
                        "purpose": "business_unit"
                    }
                ]
            },
            "last_run": 1740486012,
            "last_run_result": {
                "average": 0.31840872446,
                "today": 0,
                "breakdown": {
                    "1738972800": 0.1318722551,
                    "1738195200": 0.2699037197,
                    "1739059200": 0.1320326741,
                    "1739145600": 0.2430877175,
                    "1739491200": 0.1320020549,
                    "1738627200": 0.1277022359,
                    "1740355200": 0.0001069893,
                    "1738368000": 0.12769207,
                    "1739836800": 1.4569033097,
                    "1739404800": 0.1323023924,
                    "1739318400": 0.1400261811,
                    "1737849600": 0.1277073005,
                    "1738886400": 0.12777276669999998,
                    "1737936000": 0.1279100669,
                    "1740182400": 0.1319849082,
                    "1738022400": 0.21336695490000002,
                    "1738108800": 0.1276568143,
                    "1738454400": 0.1375117857,
                    "1739232000": 0.20971212220000002,
                    "1739750400": 1.4569744751,
                    "1738713600": 0.127664149,
                    "1738281600": 0.1276898533,
                    "1740009600": 0.4632069317,
                    "1739664000": 1.23596694,
                    "1740268800": 0.0662821046,
                    "1738540800": 0.1287879659,
                    "1738800000": 0.1276943191,
                    "1740096000": 0.1321378802,
                    "1739577600": 0.1318678662,
                    "1739923200": 1.4567349296
                }
            },
            "limit_hits": []
        },
        {
            "deleted_at": 0,
            "id": "f2f8e945-881e-4bdd-b67b-421657eca414",
            "created_at": 1694587395,
            "name": "Instance count",
            "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7",
            "type": "resource_count_anomaly",
            "definition": {
                "threshold_days": 7,
                "threshold": 20
            },
            "filters": {
                "resource_type": [
                    {
                        "name": "Instance",
                        "type": "regular"
                    }
                ]
            },
            "last_run": 1740472808,
            "last_run_result": {
                "average": 58.42857142857143,
                "today": 53,
                "breakdown": {
                    "1739836800": 65,
                    "1739923200": 72,
                    "1740009600": 60,
                    "1740096000": 55,
                    "1740182400": 51,
                    "1740268800": 52,
                    "1740355200": 54
                }
            },
            "limit_hits": []
        }
    ]
}

export const AnomaliesAvailableFilters = {
    "filter_values": {
        "cloud_account": [
            {
                "id": "beba6b9b-1fe9-4be0-b104-cc4b015f4750",
                "name": "Dev environment",
                "type": "azure_cnr"
            },
            {
                "id": "9db87a3b-d5bd-4eb9-bc5b-ddd81516e698",
                "name": "Azure QA",
                "type": "azure_cnr"
            },
            {
                "id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                "name": "Ali dev",
                "type": "alibaba_cnr"
            },
            {
                "id": "51088b56-c84e-4891-ad1a-9dd35929a622",
                "name": "K8s dev",
                "type": "kubernetes_cnr"
            },
            {
                "id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "name": "AWS HQ",
                "type": "aws_cnr"
            },
            {
                "id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "name": "AWS Marketing",
                "type": "aws_cnr"
            },
            {
                "id": "30626d4b-d79b-4654-a4a8-60a71027d7cb",
                "name": "GCP dev",
                "type": "gcp_cnr"
            },
            null,
            {
                "id": "45aee5d0-6f47-4ac3-89c5-be33175c3fcc",
                "name": "Environment",
                "type": "environment"
            }
        ],
        "owner": [
            {
                "id": "d2477dcd-1a9b-4aec-bd55-d01ce1f778d4",
                "name": "Edwin Gagnon"
            },
            {
                "id": "d7bc59a1-9e86-4667-a0d8-3221a368fa5e",
                "name": "Winston Smith"
            },
            {
                "id": "c71e247c-bdef-47a1-8f74-29d9786fbb9d",
                "name": "Demo User"
            },
            {
                "id": "c8a95f06-8a1a-41d7-b64d-f4b19489e387",
                "name": "Christian Thomas"
            },
            {
                "id": "42d94ada-476c-4d07-a613-2db67c4e3173",
                "name": "William Johnson"
            },
            {
                "id": "dd49e113-d24e-411c-adb6-8ce2adbf3200",
                "name": "Elly Grey"
            },
            {
                "id": "8d50c2b1-1b98-4e9d-999d-97d30c22e36e",
                "name": "Oscar Foster"
            },
            {
                "id": "a61ba9f1-7c21-451b-9a49-07319ddc1fea",
                "name": "Luke White"
            },
            {
                "id": "e9352576-adab-45ce-ad76-7890d19e589c",
                "name": "Joe Roy"
            },
            {
                "id": "00dacda6-ce8c-48be-80fa-b8edd6d65bdc",
                "name": "Ellie West"
            },
            {
                "id": "d76bdcdd-f0c5-440e-b046-c5dbdf923ebc",
                "name": "Jessica Evans"
            },
            {
                "id": "48a77429-4b30-4e9f-9c7f-e7ef3c5f84ce",
                "name": "Cooper Anderson"
            },
            {
                "id": "cc823af1-fe0b-4ec1-be52-13f1da7acdb1",
                "name": "Addison Atkinson"
            },
            {
                "id": "4ad4e30b-cd35-40c2-8bac-f1e68ee2cc47",
                "name": "Poppy Jenkins"
            },
            {
                "id": "942e1ac9-31d7-4f2d-9e9c-8579ae053796",
                "name": "Julian Jackson"
            },
            {
                "id": "6d4a7175-66ea-46a5-a0b3-8831fc8e3396",
                "name": "Hope Simpson"
            },
            {
                "id": "581bceb7-f6a8-4cda-9573-6e233e4069d3",
                "name": "Ava Page"
            },
            {
                "id": "9a651454-8815-4d50-bf2f-4c30ac6e0dc6",
                "name": "Lily Walsh"
            },
            {
                "id": "fd5d1e25-5fb7-4a30-9684-c661b6e9e0c4",
                "name": "Thomas Byrne"
            },
            {
                "id": "eaece7c5-3b84-4104-9152-23573565e3c4",
                "name": "Melody Edwards"
            }
        ],
        "pool": [
            {
                "id": "b6840b73-aafd-4e80-8259-5a47a56d326a",
                "name": "Dev environment",
                "purpose": "budget"
            },
            {
                "id": "8ac415e0-1a66-4d01-9ebe-82a26bb3c3d2",
                "name": "Dev",
                "purpose": "team"
            },
            {
                "id": "7e622739-659d-4610-a076-02915fd3e18e",
                "name": "Azure QA",
                "purpose": "budget"
            },
            {
                "id": "038193c2-29e8-44a2-a18e-3d362bb82b27",
                "name": "Daily checks",
                "purpose": "cicd"
            },
            {
                "id": "43ec75c7-79f3-4a07-92c8-423758ac4ad7",
                "name": "Ali dev",
                "purpose": "budget"
            },
            {
                "id": "5f890dc7-065e-4c26-9729-a5cad71ff95c",
                "name": "K8s dev",
                "purpose": "budget"
            },
            {
                "id": "349414ea-b340-48fa-b57e-6cea84c1c3e5",
                "name": "AWS HQ",
                "purpose": "budget"
            },
            {
                "id": "45a3f65a-b62c-413a-baae-74793c518773",
                "name": "AWS Marketing",
                "purpose": "budget"
            },
            {
                "id": "af8b7bd1-404f-4031-bba0-8bf4b7565626",
                "name": "GCP dev",
                "purpose": "budget"
            },
            {
                "id": "b1ef0883-2030-4012-b254-a657290729ff",
                "name": "Sunflower Inc",
                "purpose": "business_unit"
            },
            {
                "id": "69d5a2dd-92e4-4275-a98a-a6d01cb778e5",
                "name": "Environment",
                "purpose": "budget"
            },
            {
                "id": "b9d9f439-0aeb-4e4f-a514-8c977d17be3a",
                "name": "QA",
                "purpose": "team"
            },
            {
                "id": "469d0683-4afb-46f2-8c80-141fa116cd65",
                "name": "Clicks research",
                "purpose": "mlai"
            },
            {
                "id": "1dbf633b-9496-47d7-b70b-0b1ccc6bde8b",
                "name": "Engineering",
                "purpose": "business_unit"
            },
            {
                "id": "5bc84139-4874-4def-9954-f3d0df4ef289",
                "name": "Crawler",
                "purpose": "cicd"
            },
            {
                "id": "628ca9cf-d1d5-48c3-bee2-03e214f360e7",
                "name": "Marketing",
                "purpose": "business_unit"
            },
            {
                "id": "a594ad46-30f1-439c-94f7-bad616a7fcd6",
                "name": "Databricks",
                "purpose": "budget"
            },
            {
                "id": "ae7cd074-b101-4d7e-96c5-b4fb9bebc725",
                "name": "Release 3.5",
                "purpose": "project"
            },
            {
                "id": "bc3109f3-d559-4bd2-968d-2ed471c495bd",
                "name": "discovery",
                "purpose": "cicd"
            },
            {
                "id": "f5d3bc61-d3ef-4d49-b405-fd625d65d1e4",
                "name": "Monitoring",
                "purpose": "project"
            },
            {
                "id": "fb9d57d6-ead9-48c9-aa46-d708fb783078",
                "name": "diworker",
                "purpose": "mlai"
            }
        ],
        "service_name": [
            {
                "name": "Microsoft.Compute",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "microsoft.network",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "microsoft.compute",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "Microsoft.Storage",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "Elastic Compute Service",
                "cloud_type": "alibaba_cnr"
            },
            {
                "name": "Elastic IP Address",
                "cloud_type": "alibaba_cnr"
            },
            {
                "name": "Elastic Block Storage",
                "cloud_type": "alibaba_cnr"
            },
            null,
            {
                "name": "AmazonVPC",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "AmazonEC2",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "AmazonCloudWatch",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "Compute Engine",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "AmazonRedshift",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "AmazonKinesis",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "AmazonS3",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "AWSCloudTrail",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "awskms",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "AWSELB",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "Cloud Storage",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "BigQuery",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "AmazonQuickSight",
                "cloud_type": "aws_cnr"
            }
        ],
        "region": [
            {
                "name": "West Europe",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "West US 2",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "France Central",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "West US",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "East US",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "East US 2",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "Norway East",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "Germany West Central",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "UAE (Dubai)",
                "cloud_type": "alibaba_cnr"
            },
            {
                "name": "Germany (Frankfurt)",
                "cloud_type": "alibaba_cnr"
            },
            {
                "name": "China (Qingdao)",
                "cloud_type": "alibaba_cnr"
            },
            {
                "name": "SAU (Riyadh)",
                "cloud_type": "alibaba_cnr"
            },
            null,
            {
                "name": "eu-north-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "us-west-2",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "us-west-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "europe-west6",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "us",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "europe",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "us-central1",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "global",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "eu-south-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ap-northeast-2",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "eu-west-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "us-east-2",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ap-southeast-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ap-southeast-3",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "us-east-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ap-south-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "us-east4",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "us-east5",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "southamerica-west1",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "southamerica-east1",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "us-west1",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "europe-west3",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "europe-west1",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "me-central-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "europe-west4",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "us-west2",
                "cloud_type": "gcp_cnr"
            },
            {
                "name": "China (Hohhot)",
                "cloud_type": "alibaba_cnr"
            },
            {
                "name": "Indonesia (Jakarta)",
                "cloud_type": "alibaba_cnr"
            },
            {
                "name": "China (Hong Kong)",
                "cloud_type": "alibaba_cnr"
            },
            {
                "name": "Philippines (Manila)",
                "cloud_type": "alibaba_cnr"
            }
        ],
        "k8s_node": [
            null,
            {
                "name": "orchid-staging",
                "cloud_type": "kubernetes_cnr"
            }
        ],
        "k8s_service": [
            null,
            {
                "name": "elk",
                "cloud_type": "kubernetes_cnr"
            },
            {
                "name": "thanos-receive",
                "cloud_type": "kubernetes_cnr"
            },
            {
                "name": "mongo",
                "cloud_type": "kubernetes_cnr"
            },
            {
                "name": "insider-api",
                "cloud_type": "kubernetes_cnr"
            },
            {
                "name": "restapi",
                "cloud_type": "kubernetes_cnr"
            },
            {
                "name": "rabbitmq",
                "cloud_type": "kubernetes_cnr"
            },
            {
                "name": "mariadb",
                "cloud_type": "kubernetes_cnr"
            },
            {
                "name": "clickhouse",
                "cloud_type": "kubernetes_cnr"
            },
            {
                "name": "tiller-deploy",
                "cloud_type": "kubernetes_cnr"
            },
            {
                "name": "thanos-storegateway",
                "cloud_type": "kubernetes_cnr"
            },
            {
                "name": "ngingress-nginx-ingress-controller",
                "cloud_type": "kubernetes_cnr"
            },
            {
                "name": "minio",
                "cloud_type": "kubernetes_cnr"
            },
            {
                "name": "kube-cost-metrics-collector-prometheus-server",
                "cloud_type": "kubernetes_cnr"
            }
        ],
        "k8s_namespace": [
            null,
            {
                "name": "default",
                "cloud_type": "kubernetes_cnr"
            },
            {
                "name": "k8s-sunflower",
                "cloud_type": "kubernetes_cnr"
            },
            {
                "name": "kube-system",
                "cloud_type": "kubernetes_cnr"
            }
        ],
        "resource_type": [
            {
                "name": "Volume",
                "type": "regular"
            },
            {
                "name": "Snapshot",
                "type": "regular"
            },
            {
                "name": "IP Address",
                "type": "regular"
            },
            {
                "name": "Instance",
                "type": "regular"
            },
            {
                "name": "Bucket",
                "type": "regular"
            },
            {
                "name": "Snapshot Chain",
                "type": "regular"
            },
            {
                "name": "K8s Pod",
                "type": "regular"
            },
            {
                "name": "EUN1-PublicIPv4:InUseAddress",
                "type": "regular"
            },
            {
                "name": "USW2-PublicIPv4:InUseAddress",
                "type": "regular"
            },
            {
                "name": "API Request",
                "type": "regular"
            },
            {
                "name": "Redshift Managed Storage",
                "type": "regular"
            },
            {
                "name": "EUC1-PublicIPv4:InUseAddress",
                "type": "regular"
            },
            {
                "name": "CF Stack",
                "type": "cluster"
            },
            {
                "name": "QA stand",
                "type": "environment"
            },
            {
                "name": "Dev stand",
                "type": "environment"
            },
            {
                "name": "Compute Engine",
                "type": "regular"
            },
            {
                "name": "Load Balancer",
                "type": "regular"
            },
            {
                "name": "Management Tools - AWS CloudTrail Free Events Recorded",
                "type": "regular"
            },
            {
                "name": "Encryption Key",
                "type": "regular"
            },
            {
                "name": "Kinesis Streams",
                "type": "regular"
            },
            {
                "name": "StorageLens",
                "type": "regular"
            },
            {
                "name": "Management Tools - AWS CloudTrail Insights Events",
                "type": "regular"
            },
            {
                "name": "Metric",
                "type": "regular"
            },
            {
                "name": "BigQuery",
                "type": "regular"
            },
            {
                "name": "USE1-PublicIPv4:InUseAddress",
                "type": "regular"
            },
            {
                "name": "NAT Gateway",
                "type": "regular"
            },
            {
                "name": "Business Analytics",
                "type": "regular"
            },
            {
                "name": "Reserved Instances",
                "type": "regular"
            },
            {
                "name": "Savings Plan",
                "type": "regular"
            },
            {
                "name": "USW1-PublicIPv4:InUseAddress",
                "type": "regular"
            }
        ],
        "tag": [
            "sunflower_partner_id",
            "aws:cloudformation:stack-id",
            "aws:cloudformation:stack-name",
            "pod_template_hash",
            "orchid_resource_id",
            "goog-ops-agent-policy",
            "purpose",
            "job",
            "aqa_uuid",
            "sunflower_cloud_agent_nic_id",
            "sunflower_backup_id",
            "orchid_tracking_id",
            "test",
            "app",
            "sunflower_partner_name",
            "orchid_budget_id",
            "aws:cloudformation:logical-id",
            "pod_template_generation",
            "release",
            "heritage",
            "marketing",
            "name",
            "orchid_rule_testing",
            "sunflower_type",
            "nk-tag",
            "sunflower_resource_id",
            "mytag1",
            "sunflower_drive_id",
            "controller_revision_hash",
            "sunflower_cloud_agent_id",
            "aqa",
            "ms-resource-usage",
            "sunflower_failover_id",
            "aqa_tag",
            "statefulset_kubernetes_io_pod_name",
            "sunflower_cloud_id",
            "Seed",
            "sunflower_device_name",
            "app_kubernetes_io_component",
            "component",
            "aws:createdBy",
            "chart",
            "ml_value",
            "owner",
            "sunflower_device_id",
            "orchid_owner_id",
            "sunflower_cloud_agent_floating_ip_id",
            "created_by"
        ],
        "without_tag": [
            "sunflower_partner_id",
            "aws:cloudformation:stack-id",
            "aws:cloudformation:stack-name",
            "pod_template_hash",
            "orchid_resource_id",
            "goog-ops-agent-policy",
            "purpose",
            "job",
            "aqa_uuid",
            "sunflower_cloud_agent_nic_id",
            "sunflower_backup_id",
            "orchid_tracking_id",
            "test",
            "app",
            "sunflower_partner_name",
            "orchid_budget_id",
            "aws:cloudformation:logical-id",
            "pod_template_generation",
            "release",
            "heritage",
            "marketing",
            "name",
            "orchid_rule_testing",
            "sunflower_type",
            "nk-tag",
            "sunflower_resource_id",
            "mytag1",
            "sunflower_drive_id",
            "controller_revision_hash",
            "sunflower_cloud_agent_id",
            "aqa",
            "ms-resource-usage",
            "sunflower_failover_id",
            "aqa_tag",
            "statefulset_kubernetes_io_pod_name",
            "sunflower_cloud_id",
            "Seed",
            "sunflower_device_name",
            "app_kubernetes_io_component",
            "component",
            "aws:createdBy",
            "chart",
            "ml_value",
            "owner",
            "sunflower_device_id",
            "orchid_owner_id",
            "sunflower_cloud_agent_floating_ip_id",
            "created_by"
        ],
        "active": [
            false,
            true
        ],
        "constraint_violated": [
            false,
            true
        ],
        "recommendations": [
            false,
            true
        ],
        "traffic_from": [
            {
                "name": "norwayeast",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "westus2",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "us-west-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ap-southeast-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ap-southeast-3",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ap-south-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "us-west-2",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "eu-north-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ap-northeast-2",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "eu-south-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "us-east-2",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "eu-west-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "us-east-1",
                "cloud_type": "aws_cnr"
            },
            "ANY"
        ],
        "traffic_to": [
            {
                "name": "External",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "eu-west-2",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "us-gov-east-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ap-northeast-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ap-northeast-3",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "us-west-2",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "Inter-Region",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "us-west-2-lax-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "me-south-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "eu-north-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "eu-south-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ap-northeast-2",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "us-east-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "me-central-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ap-east-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "us-west-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "eu-north-1-cph-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ap-south-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "eu-west-3",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "il-central-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ap-southeast-2",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "northeurope",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "External",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ap-southeast-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ca-central-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "ap-southeast-3",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "North America",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "Intercontinental",
                "cloud_type": "azure_cnr"
            },
            {
                "name": "sa-east-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "us-east-2",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "us-west-2-las-1",
                "cloud_type": "aws_cnr"
            },
            {
                "name": "eu-west-1",
                "cloud_type": "aws_cnr"
            },
            "ANY"
        ]
    }
}