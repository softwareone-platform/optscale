export const OrganizationExpensesPoolsResponse = {
    "expenses": {
        "last_month": {
            "total": 66666.262068558426,
            "date": 1738367999
        },
        "this_month": {
            "total": 36457.656298583504,
            "date": 1739976397
        },
        "this_month_forecast": {
            "total": 55555.48,
            "date": 1740787199
        }
    },
    "total": 15000,
    "pools": [
        {
            "id": "2e5faa26-4ce6-4d91-ba16-56c4c4ce0c37",
            "purpose": "business_unit",
            "name": "Apple Inc",
            "limit": 15000,
            "this_month_expenses": 36457.656298583504,
            "this_month_forecast": 50569.48
        }
    ]
};

export const OrganizationCleanExpansesResponseGraphQL = {
    "data": {
        "cleanExpenses": {
            "start_date": 1742079600,
            "end_date": 1744667999,
            "total_count": 769,
            "total_cost": 5128.394924390386,
            "clean_expenses": [
                {
                    "cloud_account_id": "f53423c6-c474-4a91-8666-65fcc3608297",
                    "cloud_resource_id": "sunflower-eu-fra(E2E)",
                    "applied_rules": [
                        {
                            "id": "7299520a-2864-474e-8e40-fc998e2dd2ab",
                            "name": "Rule for AWS HQ_1686203940",
                            "pool_id": "7ca74dce-f519-4564-9696-1e31242bdfad"
                        }
                    ],
                    "employee_id": "77320df5-5cc2-46f3-935e-78b68c4df280",
                    "first_seen": 1677628800,
                    "pool_id": "31b34c23-0850-4181-bd91-c8a37e35a446",
                    "region": "us-west-2",
                    "resource_type": "Bucket",
                    "service_name": "AmazonS3",
                    "tags": {
                        "aws:createdBy": "IAMUser:AIDAIWGUBPAVMAWKKOLBA:s3-user"
                    },
                    "last_expense": {
                        "date": 1742428800,
                        "cost": 3.1997823431000003
                    },
                    "total_cost": 1113.6198607578817,
                    "meta": {
                        "cloud_console_link": "https://console.aws.amazon.com/s3/buckets/sunflower-eu-fra?region=eu-central-1&tab=objects",
                        "is_public_policy": false,
                        "is_public_acls": false
                    },
                    "_last_seen_date": "2025-04-20T00:00:00",
                    "_first_seen_date": "2023-03-01T00:00:00",
                    "active": true,
                    "constraint_violated": true,
                    "created_at": 1688191177,
                    "last_seen": 1745150456,
                    "deleted_at": 0,
                    "id": "f1e60467-f37d-4210-b6c0-3861c65e4361",
                    "is_environment": false,
                    "saving": 0,
                    "cost": 475.52782927899995,
                    "cloud_account_name": "AWS HQ",
                    "cloud_account_type": "aws_cnr",
                    "owner": {
                        "id": "77320df5-5cc2-46f3-935e-78b68c4df280",
                        "name": "Demo User"
                    },
                    "pool": {
                        "id": "31b34c23-0850-4181-bd91-c8a37e35a446",
                        "name": "AWS HQ",
                        "purpose": "budget"
                    },
                    "resource_id": "f1e60467-f37d-4210-b6c0-3861c65e4361",
                    "resource_name": "sunflower-eu-fra",
                    "shareable": false,
                    "traffic_expenses": [
                        {
                            "from": "us-west-2",
                            "to": "us-west-2",
                            "usage": 0.9438315928,
                            "cost": 0.018876632
                        },
                        {
                            "from": "us-west-2",
                            "to": "us-east-1",
                            "usage": 0.0925126578,
                            "cost": 0.0018502532000000001
                        },
                        {
                            "from": "us-west-2",
                            "to": "eu-north-1",
                            "usage": 39.403122946399996,
                            "cost": 0.7880624582
                        },
                        {
                            "from": "us-west-2",
                            "to": "External",
                            "usage": 2313.7951013734,
                            "cost": 190.9531722956
                        }
                    ]
                },
                {
                    "cloud_account_id": "f53423c6-c474-4a91-8666-65fcc3608297",
                    "cloud_resource_id": "75f200eb-1176-44b5-be56-01e9b6386a9a",
                    "_first_seen_date": "2024-04-18T00:00:00",
                    "_last_seen_date": "2025-04-24T00:00:00",
                    "applied_rules": [
                        {
                            "id": "7299520a-2864-474e-8e40-fc998e2dd2ab",
                            "name": "Rule for AWS HQ_1686203940",
                            "pool_id": "7ca74dce-f519-4564-9696-1e31242bdfad"
                        }
                    ],
                    "employee_id": "77320df5-5cc2-46f3-935e-78b68c4df280",
                    "first_seen": 1713398400,
                    "meta": {
                        "payment_option": "No Upfront",
                        "offering_type": "ComputeSavingsPlans",
                        "purchase_term": "1yr",
                        "applied_region": "Any",
                        "start": 1715427794,
                        "end": 1746963793,
                        "cloud_console_link": null
                    },
                    "pool_id": "31b34c23-0850-4181-bd91-c8a37e35a446",
                    "region": "global",
                    "resource_type": "Savings Plan",
                    "service_name": "AmazonEC2",
                    "tags": {},
                    "last_expense": {
                        "date": 1743379200,
                        "cost": 3.6
                    },
                    "total_cost": 428.769147491455,
                    "created_at": 1715518837,
                    "last_seen": 1745452800,
                    "deleted_at": 0,
                    "id": "31a3473d-6e87-4303-b709-ba0ba86ee10b",
                    "is_environment": false,
                    "saving": 0,
                    "cost": 201.60000000000005,
                    "cloud_account_name": "AWS HQ",
                    "cloud_account_type": "aws_cnr",
                    "owner": {
                        "id": "77320df5-5cc2-46f3-935e-78b68c4df280",
                        "name": "Demo User"
                    },
                    "pool": {
                        "id": "31b34c23-0850-4181-bd91-c8a37e35a446",
                        "name": "AWS HQ",
                        "purpose": "budget"
                    },
                    "resource_id": "31a3473d-6e87-4303-b709-ba0ba86ee10b",
                    "resource_name": null,
                    "active": false,
                    "shareable": false,
                    "constraint_violated": false
                },
                {
                    "cloud_account_id": "f53423c6-c474-4a91-8666-65fcc3608297",
                    "cloud_resource_id": "sunflower-infra-backup",
                    "applied_rules": [
                        {
                            "id": "7299520a-2864-474e-8e40-fc998e2dd2ab",
                            "name": "Rule for AWS HQ_1686203940",
                            "pool_id": "7ca74dce-f519-4564-9696-1e31242bdfad"
                        }
                    ],
                    "employee_id": "77320df5-5cc2-46f3-935e-78b68c4df280",
                    "first_seen": 1683072000,
                    "pool_id": "31b34c23-0850-4181-bd91-c8a37e35a446",
                    "region": "us-east-2",
                    "resource_type": "Bucket",
                    "service_name": "AmazonS3",
                    "tags": {
                        "aws:createdBy": "IAMUser:AIDAQUWY5LJ43W43UDRWX:ds-temp-admin"
                    },
                    "last_expense": {
                        "date": 1742428800,
                        "cost": 0.0030401859000000002
                    },
                    "total_cost": 267.9518372080704,
                    "meta": {
                        "cloud_console_link": "https://console.aws.amazon.com/s3/buckets/sunflower-infra-backup?region=us-east-2&tab=objects",
                        "is_public_policy": false,
                        "is_public_acls": false
                    },
                    "_last_seen_date": "2025-04-20T00:00:00",
                    "_first_seen_date": "2023-05-03T00:00:00",
                    "active": true,
                    "created_at": 1688191181,
                    "last_seen": 1745150456,
                    "deleted_at": 0,
                    "id": "4365c9cb-7c9d-4a1b-8e1c-3c1ee90d2f52",
                    "is_environment": false,
                    "saving": 0,
                    "cost": 120.5093084834,
                    "cloud_account_name": "AWS HQ",
                    "cloud_account_type": "aws_cnr",
                    "owner": {
                        "id": "77320df5-5cc2-46f3-935e-78b68c4df280",
                        "name": "Demo User"
                    },
                    "pool": {
                        "id": "31b34c23-0850-4181-bd91-c8a37e35a446",
                        "name": "AWS HQ",
                        "purpose": "budget"
                    },
                    "resource_id": "4365c9cb-7c9d-4a1b-8e1c-3c1ee90d2f52",
                    "resource_name": "sunflower-infra-backup",
                    "shareable": false,
                    "constraint_violated": false,
                    "traffic_expenses": [
                        {
                            "from": "us-east-2",
                            "to": "eu-north-1",
                            "usage": 0.00035167360000000003,
                            "cost": 0.0000070341999999999995
                        },
                        {
                            "from": "us-east-2",
                            "to": "External",
                            "usage": 1.470272997,
                            "cost": 0.1254404704
                        }
                    ]
                },
                {
                    "cloud_account_id": "f7f7bc62-8799-49ee-8d5b-4b9c0849721c",
                    "cloud_resource_hash": "d006c295487ed3e62ce7442282c9600b3b108678",
                    "cloud_resource_id": "4392293229427720751",
                    "_first_seen_date": "2025-03-06T00:00:00",
                    "_last_seen_date": "2025-04-04T00:00:00",
                    "applied_rules": [
                        {
                            "id": "d266bc8f-e320-4c78-9aba-6957dcd5f9b7",
                            "name": "QA clusters",
                            "pool_id": "c604606d-2ce6-475f-9966-86a63ffcb041"
                        }
                    ],
                    "cloud_created_at": 1741241537,
                    "employee_id": "d98ff761-3b6f-4075-8791-9ca8c2c95ae9",
                    "first_seen": 1741240800,
                    "meta": {
                        "flavor": "e2-highcpu-16",
                        "cloud_console_link": null,
                        "stopped_allocated": false,
                        "last_seen_not_stopped": 1741785677,
                        "spotted": false,
                        "security_groups": [
                            "http-server",
                            "https-server"
                        ],
                        "image_id": "https://www.googleapis.com/compute/v1/projects/ubuntu-os-cloud/global/licenses/ubuntu-2404-lts",
                        "vpc_id": "2177475127665740261",
                        "vpc_name": "default",
                        "zone_id": "us-central1-c",
                        "cpu_count": "16"
                    },
                    "pool_id": "d129c9b8-070a-4fc2-bb99-ab7982d294de",
                    "region": "us-central1",
                    "resource_type": "Instance",
                    "tags": {
                        "goog-ops-agent-policy": "v2-x86-template-1-4-0",
                        "orchid_tracking_id": "d006c295487ed3e62ce7442282c9600b3b108678"
                    },
                    "has_metrics": false,
                    "service_name": "Compute Engine",
                    "last_expense": {
                        "date": 1741737600,
                        "cost": 3.799046999999999
                    },
                    "total_cost": 106.83841600000001,
                    "created_at": 1743228836,
                    "last_seen": 1743775200,
                    "deleted_at": 0,
                    "id": "5b1fe4de-30f9-47e4-a1ac-54d1b5cd0adb",
                    "is_environment": false,
                    "saving": 0,
                    "cost": 106.838416,
                    "cloud_account_name": "GCP dev",
                    "cloud_account_type": "gcp_cnr",
                    "owner": {
                        "id": "d98ff761-3b6f-4075-8791-9ca8c2c95ae9",
                        "name": "Charlie Rodriguez"
                    },
                    "pool": {
                        "id": "d129c9b8-070a-4fc2-bb99-ab7982d294de",
                        "name": "QA",
                        "purpose": "team"
                    },
                    "resource_id": "5b1fe4de-30f9-47e4-a1ac-54d1b5cd0adb",
                    "resource_name": "issuetestcluster",
                    "active": false,
                    "shareable": false,
                    "constraint_violated": false
                },
                {
                    "cloud_account_id": "c17bab1e-3257-464f-bf2b-df41a80f1924",
                    "cloud_resource_id": "i-0e464cfbf9650bd21",
                    "applied_rules": [
                        {
                            "id": "6cceb6b7-53af-4b28-b824-dfe145e247c7",
                            "name": "Rule for AWS Marketing_1686203897",
                            "pool_id": "31595720-ccc1-47b1-9366-e7f9774533b0"
                        }
                    ],
                    "employee_id": "772d4218-8cbb-4c29-878c-581f61d7aab4",
                    "first_seen": 1677628800,
                    "meta": {
                        "os": "Linux",
                        "preinstalled": "NA",
                        "flavor": "t2.large",
                        "cloud_console_link": "https://console.aws.amazon.com/ec2/v2/home?region=us-west-2#InstanceDetails:instanceId=i-0e464cfbf9650bd21",
                        "stopped_allocated": false,
                        "last_seen_not_stopped": 1742539238,
                        "spotted": false,
                        "security_groups": [
                            "sg-0d99e8ecd70254ebe"
                        ],
                        "image_id": "ami-0896ae01b544f65a8",
                        "vpc_id": "vpc-f9b9c481"
                    },
                    "pool_id": "9d0e2794-b080-447e-8527-6720d38e6410",
                    "region": "us-west-2",
                    "resource_type": "Instance",
                    "service_name": "AmazonEC2",
                    "tags": {
                        "aws:createdBy": "IAMUser:AIDA4YBYU3OICYSASYZ2E:eskywalker"
                    },
                    "last_expense": {
                        "date": 1742428800,
                        "cost": 0.5259792537
                    },
                    "total_cost": 243.87042537526895,
                    "cloud_created_at": 1607339156,
                    "has_metrics": true,
                    "_last_seen_date": "2025-04-20T00:00:00",
                    "_first_seen_date": "2023-03-01T00:00:00",
                    "active": true,
                    "created_at": 1688191184,
                    "last_seen": 1745150456,
                    "deleted_at": 0,
                    "id": "d4f06e52-7e93-4fc2-9449-a720ff544f39",
                    "is_environment": false,
                    "saving": 193.1507807784405,
                    "cost": 101.15379443959998,
                    "cloud_account_name": "AWS Marketing",
                    "cloud_account_type": "aws_cnr",
                    "owner": {
                        "id": "772d4218-8cbb-4c29-878c-581f61d7aab4",
                        "name": "Andy Simpson"
                    },
                    "pool": {
                        "id": "9d0e2794-b080-447e-8527-6720d38e6410",
                        "name": "AWS Marketing",
                        "purpose": "budget"
                    },
                    "resource_id": "d4f06e52-7e93-4fc2-9449-a720ff544f39",
                    "resource_name": "finops-practice",
                    "shareable": false,
                    "constraint_violated": false,
                    "traffic_expenses": [
                        {
                            "from": "us-west-2",
                            "to": "us-west-2",
                            "usage": 0.010333783400000001,
                            "cost": 0.00008893900000000001
                        },
                        {
                            "from": "us-west-2",
                            "to": "External",
                            "usage": 3.2392191128,
                            "cost": 0.2580415468
                        },
                        {
                            "from": "us-west-2",
                            "to": "eu-west-1",
                            "usage": 0.00014457339999999997,
                            "cost": 0.0000028922
                        }
                    ]
                },
                {
                    "cloud_account_id": "d78fc45d-c829-4b68-ba9d-42fd3e62e894",
                    "cloud_resource_id": "/subscriptions/318bd278-e4ef-4230-9ab4-2ad6a29f578c/resourcegroups/aqa/providers/microsoft.compute/virtualmachines/aqa-westus2-underutilized-instance",
                    "applied_rules": [
                        {
                            "id": "8d682b4b-1bdf-45b8-8215-267a5559e245",
                            "name": "Rule for Azure QA_1680758110",
                            "pool_id": "bbf504b7-a1a4-483a-bc6a-a27c6bdcc0dc"
                        }
                    ],
                    "employee_id": "77320df5-5cc2-46f3-935e-78b68c4df280",
                    "first_seen": 1672531200,
                    "pool_id": "9bd5b45e-d38f-4c15-a286-c7c9b7c43fac",
                    "region": "West US 2",
                    "resource_type": "Instance",
                    "service_name": "microsoft.compute",
                    "tags": {
                        "purpose": "testing"
                    },
                    "last_expense": {
                        "date": 1742428800,
                        "cost": 0.604800381823629
                    },
                    "total_cost": 214.61883119173882,
                    "meta": {
                        "os": "Linux",
                        "flavor": "Standard_A2_v2",
                        "cloud_console_link": "https://portal.azure.com/#resource/subscriptions/318bd278-e4ef-4230-9ab4-2ad6a29f578c/resourceGroups/AQA/providers/Microsoft.Compute/virtualMachines/aqa-westus2-underutilized-instance/overview",
                        "stopped_allocated": false,
                        "last_seen_not_stopped": 1742539245,
                        "spotted": false,
                        "vpc_id": "/subscriptions/318bd278-e4ef-4230-9ab4-2ad6a29f578c/resourceGroups/aqa/providers/Microsoft.Network/virtualNetworks/aqavnet321",
                        "vpc_name": "aqavnet321",
                        "security_groups": [
                            "/subscriptions/318bd278-e4ef-4230-9ab4-2ad6a29f578c/resourceGroups/aqa/providers/Microsoft.Network/networkSecurityGroups/aqa-westus2-underutilized-instance-nsg"
                        ],
                        "cpu_count": 2,
                        "ram": 4294967296
                    },
                    "has_metrics": true,
                    "_last_seen_date": "2025-04-20T00:00:00",
                    "_first_seen_date": "2023-01-01T00:00:00",
                    "active": true,
                    "created_at": 1682745332,
                    "last_seen": 1745150456,
                    "deleted_at": 0,
                    "id": "085caa9f-19ed-49a4-82c6-764c9b3ca88c",
                    "is_environment": false,
                    "saving": 57.02,
                    "cost": 98.50971773692007,
                    "cloud_account_name": "Azure QA",
                    "cloud_account_type": "azure_cnr",
                    "owner": {
                        "id": "77320df5-5cc2-46f3-935e-78b68c4df280",
                        "name": "Demo User"
                    },
                    "pool": {
                        "id": "9bd5b45e-d38f-4c15-a286-c7c9b7c43fac",
                        "name": "Azure QA",
                        "purpose": "budget"
                    },
                    "resource_id": "085caa9f-19ed-49a4-82c6-764c9b3ca88c",
                    "resource_name": "aqa-westus2-underutilized-instance",
                    "shareable": false,
                    "constraint_violated": false,
                    "traffic_expenses": [
                        {
                            "from": "westus2",
                            "to": "Inter-Region",
                            "usage": 0.0042484998703007475,
                            "cost": 0.0000846682782130722
                        }
                    ]
                }
            ],
            "limit": 6
        }
    }
}

export const OrganizationCleanExpansesResponse = {
    "start_date": 1737500400,
    "end_date": 1740092399,
    "total_count": 787,
    "total_cost": 5862.251871638754,
    "clean_expenses": [
        {
            "cloud_account_id": "c5f20653-e520-488f-9cef-b61dadec2997",
            "cloud_resource_id": "Analysis (europe-west3) europe-west3 97d170e1550eee4afc0af065b78cda302a97674c",
            "applied_rules": [
                {
                    "id": "4c12edbe-9491-40e5-a209-85ba7fff3914",
                    "name": "Rule for GCP dev_1680758361",
                    "pool_id": "3a248797-84f6-46b8-b6b9-9aa612105d1e"
                }
            ],
            "employee_id": "6d9549a1-328f-4b7e-9668-afae2eaf3ed2",
            "first_seen": 1672531200,
            "pool_id": "c08db139-aeae-47ac-a490-3bb865fadfbe",
            "region": "europe-west3",
            "resource_type": "BigQuery",
            "service_name": "BigQuery",
            "tags": {},
            "last_expense": {
                "date": 1726617600,
                "cost": 5.377481
            },
            "total_cost": 1136.071894,
            "_first_seen_date": "2023-01-01T00:00:00",
            "_last_seen_date": "2025-02-19T00:00:00",
            "created_at": 1694064368,
            "last_seen": 1739941200,
            "deleted_at": 0,
            "id": "3e1b0bff-1e7b-4016-bc07-3b83b9185f89",
            "meta": {
                "cloud_console_link": null
            },
            "is_environment": false,
            "saving": 0,
            "cost": 666.666666,
            "cloud_account_name": "GCP dev",
            "cloud_account_type": "gcp_cnr",
            "owner": {
                "id": "6d9549a1-328f-4b7e-9668-afae2eaf3ed2",
                "name": "Edwin Gagnon"
            },
            "pool": {
                "id": "c08db139-aeae-47ac-a490-3bb865fadfbe",
                "name": "GCP dev",
                "purpose": "budget"
            },
            "resource_id": "3e1b0bff-1e7b-4016-bc07-3b83b9185f89",
            "resource_name": "Analysis (europe-west3) europe-west3",
            "active": false,
            "shareable": false,
            "constraint_violated": false
        },
        {
            "cloud_account_id": "1998447c-36bb-48d8-9c84-ce5ff8843671",
            "cloud_resource_id": "sunflower-eu-fra",
            "applied_rules": [
                {
                    "id": "7299520a-2864-474e-8e40-fc998e2dd2ab",
                    "name": "Rule for AWS HQ_1686203940",
                    "pool_id": "7ca74dce-f519-4564-9696-1e31242bdfad"
                }
            ],
            "employee_id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
            "first_seen": 1677628800,
            "pool_id": "8f78318e-e5d3-4fa2-9e38-2fe7f9c7aa21",
            "region": "us-west-2",
            "resource_type": "Bucket",
            "service_name": "AmazonS3",
            "tags": {
                "aws:createdBy": "IAMUser:AIDAIWGUBPAVMAWKKOLBA:s3-user"
            },
            "last_expense": {
                "date": 1726531200,
                "cost": 0.0188347846
            },
            "total_cost": 1004.5952778746001,
            "meta": {
                "cloud_console_link": "https://console.aws.amazon.com/s3/buckets/sunflower-eu-fra?region=eu-central-1&tab=objects",
                "is_public_policy": false,
                "is_public_acls": true
            },
            "_last_seen_date": "2025-02-26T00:00:00",
            "_first_seen_date": "2023-03-01T00:00:00",
            "active": true,
            "constraint_violated": true,
            "created_at": 1699509577,
            "last_seen": 1740541881,
            "deleted_at": 0,
            "id": "17557535-09d9-4948-ace5-1c747972c318",
            "is_environment": false,
            "saving": 0,
            "cost": 431.29569787440005,
            "cloud_account_name": "AWS HQ",
            "cloud_account_type": "aws_cnr",
            "owner": {
                "id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
                "name": "Demo User"
            },
            "pool": {
                "id": "8f78318e-e5d3-4fa2-9e38-2fe7f9c7aa21",
                "name": "AWS HQ",
                "purpose": "budget"
            },
            "resource_id": "17557535-09d9-4948-ace5-1c747972c318",
            "resource_name": "sunflower-eu-fra",
            "shareable": false,
            "traffic_expenses": [
                {
                    "from": "us-west-2",
                    "to": "ap-northeast-1",
                    "usage": 1.3040000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-west-2",
                    "to": "ap-northeast-3",
                    "usage": 1.3040000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-west-2",
                    "to": "eu-west-3",
                    "usage": 1.5648e-06,
                    "cost": 3.12e-08
                },
                {
                    "from": "us-west-2",
                    "to": "us-west-1",
                    "usage": 1.5648e-06,
                    "cost": 3.12e-08
                },
                {
                    "from": "us-west-2",
                    "to": "eu-west-1",
                    "usage": 1.3040000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-west-2",
                    "to": "us-east-2",
                    "usage": 1.3040000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-west-2",
                    "to": "ap-southeast-2",
                    "usage": 1.3040000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-west-2",
                    "to": "External",
                    "usage": 1943.4743056578,
                    "cost": 167.6547845046
                },
                {
                    "from": "us-west-2",
                    "to": "sa-east-1",
                    "usage": 1.5648e-06,
                    "cost": 3.12e-08
                },
                {
                    "from": "us-west-2",
                    "to": "ap-northeast-2",
                    "usage": 1.3040000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-west-2",
                    "to": "us-west-2",
                    "usage": 2.3281884735999996,
                    "cost": 0.046563769399999996
                },
                {
                    "from": "us-west-2",
                    "to": "eu-west-2",
                    "usage": 1.3040000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-west-2",
                    "to": "us-east-1",
                    "usage": 0.24232603200000002,
                    "cost": 0.0048465211999999995
                },
                {
                    "from": "us-west-2",
                    "to": "ap-southeast-1",
                    "usage": 0.014765501200000001,
                    "cost": 0.00029530999999999996
                },
                {
                    "from": "us-west-2",
                    "to": "ca-central-1",
                    "usage": 1.3040000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-west-2",
                    "to": "ap-south-1",
                    "usage": 1.3040000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-west-2",
                    "to": "eu-north-1",
                    "usage": 99.12526590759998,
                    "cost": 1.9825053181999999
                }
            ]
        },
        {
            "cloud_account_id": "1998447c-36bb-48d8-9c84-ce5ff8843671",
            "cloud_resource_id": "75f200eb-1176-44b5-be56-01e9b6386a9a",
            "_first_seen_date": "2024-04-18T00:00:00",
            "_last_seen_date": "2025-03-04T00:00:00",
            "applied_rules": [
                {
                    "id": "7299520a-2864-474e-8e40-fc998e2dd2ab",
                    "name": "Rule for AWS HQ_1686203940",
                    "pool_id": "7ca74dce-f519-4564-9696-1e31242bdfad"
                }
            ],
            "employee_id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
            "first_seen": 1713398400,
            "meta": {
                "payment_option": "No Upfront",
                "offering_type": "ComputeSavingsPlans",
                "purchase_term": "1yr",
                "applied_region": "Any",
                "start": 1726746194,
                "end": 1758282193,
                "cloud_console_link": null
            },
            "pool_id": "8f78318e-e5d3-4fa2-9e38-2fe7f9c7aa21",
            "region": "global",
            "resource_type": "Savings Plan",
            "service_name": "AmazonEC2",
            "tags": {},
            "last_expense": {
                "date": 1727654400,
                "cost": 3.6
            },
            "total_cost": 431.99999999999994,
            "created_at": 1726837237,
            "last_seen": 1741046400,
            "deleted_at": 0,
            "id": "e26f009f-ff82-4fc7-9417-1c8d920ffb2d",
            "is_environment": false,
            "saving": 0,
            "cost": 201.60000000000002,
            "cloud_account_name": "AWS HQ",
            "cloud_account_type": "aws_cnr",
            "owner": {
                "id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
                "name": "Demo User"
            },
            "pool": {
                "id": "8f78318e-e5d3-4fa2-9e38-2fe7f9c7aa21",
                "name": "AWS HQ",
                "purpose": "budget"
            },
            "resource_id": "e26f009f-ff82-4fc7-9417-1c8d920ffb2d",
            "resource_name": null,
            "active": false,
            "shareable": false,
            "constraint_violated": false
        },
        {
            "cloud_account_id": "c5f20653-e520-488f-9cef-b61dadec2997",
            "cloud_resource_id": "Static Ip Charge us-central1 97d170e1550eee4afc0af065b78cda302a97674c",
            "applied_rules": [
                {
                    "id": "4c12edbe-9491-40e5-a209-85ba7fff3914",
                    "name": "Rule for GCP dev_1680758361",
                    "pool_id": "3a248797-84f6-46b8-b6b9-9aa612105d1e"
                }
            ],
            "employee_id": "6d9549a1-328f-4b7e-9668-afae2eaf3ed2",
            "first_seen": 1678431600,
            "pool_id": "c08db139-aeae-47ac-a490-3bb865fadfbe",
            "region": "us-central1",
            "resource_type": "Compute Engine",
            "service_name": "Compute Engine",
            "tags": {},
            "last_expense": {
                "date": 1726617600,
                "cost": 0.281786
            },
            "total_cost": 323.327002,
            "_first_seen_date": "2023-03-10T00:00:00",
            "_last_seen_date": "2025-02-19T00:00:00",
            "created_at": 1694064368,
            "last_seen": 1739934000,
            "deleted_at": 0,
            "id": "bd864c28-8b3e-41b4-a714-48cd538c9304",
            "meta": {
                "cloud_console_link": null
            },
            "is_environment": false,
            "saving": 0,
            "cost": 150.06365000000002,
            "cloud_account_name": "GCP dev",
            "cloud_account_type": "gcp_cnr",
            "owner": {
                "id": "6d9549a1-328f-4b7e-9668-afae2eaf3ed2",
                "name": "Edwin Gagnon"
            },
            "pool": {
                "id": "c08db139-aeae-47ac-a490-3bb865fadfbe",
                "name": "GCP dev",
                "purpose": "budget"
            },
            "resource_id": "bd864c28-8b3e-41b4-a714-48cd538c9304",
            "resource_name": "Static Ip Charge us-central1",
            "active": false,
            "shareable": false,
            "constraint_violated": false
        },
        {
            "cloud_account_id": "48335043-03c5-4178-a215-ca51e759ec87",
            "cloud_resource_id": "i-0e464cfbf9650bd21",
            "applied_rules": [
                {
                    "id": "6cceb6b7-53af-4b28-b824-dfe145e247c7",
                    "name": "Rule for AWS Marketing_1686203897",
                    "pool_id": "31595720-ccc1-47b1-9366-e7f9774533b0"
                }
            ],
            "employee_id": "6d9549a1-328f-4b7e-9668-afae2eaf3ed2",
            "first_seen": 1677628800,
            "meta": {
                "os": "Linux",
                "preinstalled": "NA",
                "flavor": "t2.large",
                "cloud_console_link": "https://console.aws.amazon.com/ec2/v2/home?region=us-west-2#InstanceDetails:instanceId=i-0e464cfbf9650bd21",
                "stopped_allocated": false,
                "last_seen_not_stopped": 1726662074,
                "spotted": false,
                "security_groups": [
                    {
                        "GroupName": "websites",
                        "GroupId": "sg-0d99e8ecd70254ebe"
                    }
                ],
                "image_id": "ami-0896ae01b544f65a8",
                "vpc_id": "vpc-f9b9c481"
            },
            "pool_id": "135a9cf3-d7e6-4753-8d07-f7241d15ef8b",
            "region": "us-west-2",
            "resource_type": "Instance",
            "service_name": "AmazonEC2",
            "tags": {
                "aws:createdBy": "IAMUser:AIDA4YBYU3OICYSASYZ2E:jgelbero"
            },
            "last_expense": {
                "date": 1726531200,
                "cost": 0.2790732092
            },
            "total_cost": 263.3072788166,
            "cloud_created_at": 1607339156,
            "has_metrics": true,
            "_last_seen_date": "2025-02-26T00:00:00",
            "_first_seen_date": "2023-03-01T00:00:00",
            "active": true,
            "created_at": 1699509584,
            "last_seen": 1740541881,
            "deleted_at": 0,
            "id": "95f51e0c-cb02-4a43-976a-91ef96aa80a2",
            "is_environment": false,
            "saving": 205.78443460166187,
            "cost": 120.511563878,
            "cloud_account_name": "AWS Marketing",
            "cloud_account_type": "aws_cnr",
            "owner": {
                "id": "6d9549a1-328f-4b7e-9668-afae2eaf3ed2",
                "name": "Edwin Gagnon"
            },
            "pool": {
                "id": "135a9cf3-d7e6-4753-8d07-f7241d15ef8b",
                "name": "AWS Marketing",
                "purpose": "budget"
            },
            "resource_id": "95f51e0c-cb02-4a43-976a-91ef96aa80a2",
            "resource_name": "finops-practice",
            "shareable": false,
            "constraint_violated": false,
            "traffic_expenses": [
                {
                    "from": "us-west-2",
                    "to": "us-west-2",
                    "usage": 0.0027681026,
                    "cost": 2.768e-05
                },
                {
                    "from": "us-west-2",
                    "to": "External",
                    "usage": 4.759253809800001,
                    "cost": 0.4283328264
                },
                {
                    "from": "us-west-2",
                    "to": "eu-west-1",
                    "usage": 0.00016853419999999998,
                    "cost": 3.3716e-06
                }
            ]
        },
        {
            "cloud_account_id": "1998447c-36bb-48d8-9c84-ce5ff8843671",
            "cloud_resource_id": "sunflower-infra-backup",
            "applied_rules": [
                {
                    "id": "7299520a-2864-474e-8e40-fc998e2dd2ab",
                    "name": "Rule for AWS HQ_1686203940",
                    "pool_id": "7ca74dce-f519-4564-9696-1e31242bdfad"
                }
            ],
            "employee_id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
            "first_seen": 1683072000,
            "pool_id": "8f78318e-e5d3-4fa2-9e38-2fe7f9c7aa21",
            "region": "us-east-2",
            "resource_type": "Bucket",
            "service_name": "AmazonS3",
            "tags": {
                "aws:createdBy": "IAMUser:AIDAQUWY5LJ43W43UDRWX:ds-temp-admin"
            },
            "last_expense": {
                "date": 1726531200,
                "cost": 0.0013536803
            },
            "total_cost": 252.64608343400005,
            "meta": {
                "cloud_console_link": "https://console.aws.amazon.com/s3/buckets/sunflower-infra-backup?region=us-east-2&tab=objects",
                "is_public_policy": false,
                "is_public_acls": false
            },
            "_last_seen_date": "2025-02-26T00:00:00",
            "_first_seen_date": "2023-05-03T00:00:00",
            "active": true,
            "created_at": 1699509581,
            "last_seen": 1740541881,
            "deleted_at": 0,
            "id": "18291a2d-6721-48f9-9a9b-e92b8a8ecf33",
            "is_environment": false,
            "saving": 0,
            "cost": 114.4432149662,
            "cloud_account_name": "AWS HQ",
            "cloud_account_type": "aws_cnr",
            "owner": {
                "id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
                "name": "Demo User"
            },
            "pool": {
                "id": "8f78318e-e5d3-4fa2-9e38-2fe7f9c7aa21",
                "name": "AWS HQ",
                "purpose": "budget"
            },
            "resource_id": "18291a2d-6721-48f9-9a9b-e92b8a8ecf33",
            "resource_name": "sunflower-infra-backup",
            "shareable": false,
            "constraint_violated": false,
            "traffic_expenses": [
                {
                    "from": "us-east-2",
                    "to": "us-east-1",
                    "usage": 1.5312e-06,
                    "cost": 1.56e-08
                },
                {
                    "from": "us-east-2",
                    "to": "External",
                    "usage": 0.11712339279999998,
                    "cost": 0.010541115600000001
                },
                {
                    "from": "us-east-2",
                    "to": "eu-west-2",
                    "usage": 1.2760000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-east-2",
                    "to": "us-west-1",
                    "usage": 1.5312e-06,
                    "cost": 3.12e-08
                },
                {
                    "from": "us-east-2",
                    "to": "ap-southeast-1",
                    "usage": 1.2760000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-east-2",
                    "to": "ap-south-1",
                    "usage": 1.2760000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-east-2",
                    "to": "ap-northeast-1",
                    "usage": 1.2760000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-east-2",
                    "to": "ap-northeast-3",
                    "usage": 1.2760000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-east-2",
                    "to": "eu-west-1",
                    "usage": 1.2760000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-east-2",
                    "to": "eu-north-1",
                    "usage": 1.5312e-06,
                    "cost": 3.12e-08
                },
                {
                    "from": "us-east-2",
                    "to": "eu-west-3",
                    "usage": 1.5312e-06,
                    "cost": 3.12e-08
                },
                {
                    "from": "us-east-2",
                    "to": "ap-southeast-2",
                    "usage": 1.2760000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-east-2",
                    "to": "ca-central-1",
                    "usage": 1.2760000000000001e-06,
                    "cost": 2.6e-08
                },
                {
                    "from": "us-east-2",
                    "to": "us-west-2",
                    "usage": 1.5312e-06,
                    "cost": 3.12e-08
                },
                {
                    "from": "us-east-2",
                    "to": "sa-east-1",
                    "usage": 1.5312e-06,
                    "cost": 3.12e-08
                },
                {
                    "from": "us-east-2",
                    "to": "ap-northeast-2",
                    "usage": 1.2760000000000001e-06,
                    "cost": 2.6e-08
                }
            ]
        }
    ],
    "limit": 6
}

export const OrganizationConstraintsResponse = {
    "organization_constraints": [
        {
            "deleted_at": 0,
            "id": "0eeabe8a-33a6-4708-b71e-78562e6d04d7",
            "created_at": 1694069126,
            "name": "Buckets count in eu-west-2",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "type": "resource_quota",
            "definition": {
                "max_value": 10
            },
            "filters": {
                "region": [
                    {
                        "name": "eu-west-2",
                        "cloud_type": "aws_cnr"
                    }
                ],
                "resource_type": [
                    {
                        "name": "Bucket",
                        "type": "regular"
                    }
                ]
            },
            "last_run": 1739966418,
            "last_run_result": {
                "limit": 10,
                "current": 0
            },
            "limit_hits": []
        },
        {
            "deleted_at": 0,
            "id": "10f5a997-0ee5-4e3e-bc37-d1737c6c7cca",
            "created_at": 1694069019,
            "name": "Marketing expenses",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "type": "expense_anomaly",
            "definition": {
                "threshold_days": 30,
                "threshold": 10
            },
            "filters": {
                "pool": [
                    {
                        "id": "be19d7c0-d3e6-417a-ad70-4a5ef6acc42a+",
                        "name": "Marketing",
                        "purpose": "business_unit"
                    }
                ]
            },
            "last_run": 1739967612,
            "last_run_result": {
                "average": 0.31840872446,
                "today": 0,
                "breakdown": {
                    "1738454400": 0.1318722551,
                    "1737676800": 0.2699037197,
                    "1738540800": 0.1320326741,
                    "1738627200": 0.2430877175,
                    "1738972800": 0.1320020549,
                    "1738108800": 0.1277022359,
                    "1739836800": 0.0001069893,
                    "1737849600": 0.12769207,
                    "1739318400": 1.4569033097,
                    "1738886400": 0.1323023924,
                    "1738800000": 0.1400261811,
                    "1737331200": 0.1277073005,
                    "1738368000": 0.12777276669999998,
                    "1737417600": 0.1279100669,
                    "1739664000": 0.1319849082,
                    "1737504000": 0.21336695490000002,
                    "1737590400": 0.1276568143,
                    "1737936000": 0.1375117857,
                    "1738713600": 0.20971212220000002,
                    "1739232000": 1.4569744751,
                    "1738195200": 0.127664149,
                    "1737763200": 0.1276898533,
                    "1739491200": 0.4632069317,
                    "1739145600": 1.23596694,
                    "1739750400": 0.0662821046,
                    "1738022400": 0.1287879659,
                    "1738281600": 0.1276943191,
                    "1739577600": 0.1321378802,
                    "1739059200": 0.1318678662,
                    "1739404800": 1.4567349296
                }
            },
            "limit_hits": []
        },
        {
            "deleted_at": 0,
            "id": "3901b88d-a442-46e1-92fb-1962f61f4fb9",
            "created_at": 1710761595,
            "name": "Instances tagging policy",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "type": "tagging_policy",
            "definition": {
                "conditions": {
                    "tag": "00000000-0000-0000-0000-000000000000"
                },
                "start_date": 1710761584
            },
            "filters": {
                "resource_type": [
                    {
                        "name": "Instance",
                        "type": "regular"
                    }
                ]
            },
            "last_run": 1739966418,
            "last_run_result": {
                "value": 6
            },
            "limit_hits": [
                {
                    "deleted_at": 0,
                    "id": "2e27cce7-374d-4e42-9f37-2064784a2647",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
                    "constraint_id": "3901b88d-a442-46e1-92fb-1962f61f4fb9",
                    "constraint_limit": 0.0,
                    "value": 6.0,
                    "created_at": 1739836815,
                    "run_result": {
                        "value": 6
                    }
                },
                {
                    "deleted_at": 0,
                    "id": "f5027664-fff6-49d9-95dc-9a95b058f39e",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
                    "constraint_id": "3901b88d-a442-46e1-92fb-1962f61f4fb9",
                    "constraint_limit": 0.0,
                    "value": 6.0,
                    "created_at": 1739923221,
                    "run_result": {
                        "value": 6
                    }
                }
            ]
        },
        {
            "deleted_at": 0,
            "id": "489c205e-859a-4a23-a99f-6089600b8e32",
            "created_at": 1694069370,
            "name": "Monthly S3 expenses quota",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "type": "recurring_budget",
            "definition": {
                "monthly_budget": 200
            },
            "filters": {
                "service_name": [
                    {
                        "name": "AmazonS3",
                        "cloud_type": "aws_cnr"
                    }
                ]
            },
            "last_run": 1739967612,
            "last_run_result": {
                "limit": 100,
                "current": 193.4109080453
            },
            "limit_hits": []
        },
        {
            "deleted_at": 0,
            "id": "8c43d5a2-d1e6-45a5-86aa-d0fbef5d4598",
            "created_at": 1694069189,
            "name": "Buckets count in us-east-222",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "type": "resource_quota",
            "definition": {
                "max_value": 3
            },
            "filters": {
                "region": [
                    {
                        "name": "us-east-1",
                        "cloud_type": "aws_cnr"
                    }
                ],
                "resource_type": [
                    {
                        "name": "Bucket",
                        "type": "regular"
                    }
                ]
            },
            "last_run": 1739966418,
            "last_run_result": {
                "limit": 3,
                "current": 12
            },
            "limit_hits": [
                {
                    "deleted_at": 0,
                    "id": "7281dca6-a221-4e49-a795-4aa512269f34",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
                    "constraint_id": "8c43d5a2-d1e6-45a5-86aa-d0fbef5d4598",
                    "constraint_limit": 3.0,
                    "value": 14.0,
                    "created_at": 1739844017,
                    "run_result": {
                        "limit": 3,
                        "current": 14
                    }
                },
                {
                    "deleted_at": 0,
                    "id": "596b779d-f8ba-4c48-98ba-c8f04cedc642",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
                    "constraint_id": "8c43d5a2-d1e6-45a5-86aa-d0fbef5d4598",
                    "constraint_limit": 3.0,
                    "value": 12.0,
                    "created_at": 1739925608,
                    "run_result": {
                        "limit": 3,
                        "current": 12
                    }
                }
            ]
        },
        {
            "deleted_at": 0,
            "id": "a2688b6c-2190-49ab-bf69-9c3431fbb4ef",
            "created_at": 1694068995,
            "name": "Instance count",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
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
            "last_run": 1739954408,
            "last_run_result": {
                "average": 58.42857142857143,
                "today": 53,
                "breakdown": {
                    "1739318400": 65,
                    "1739404800": 72,
                    "1739491200": 60,
                    "1739577600": 55,
                    "1739664000": 51,
                    "1739750400": 52,
                    "1739836800": 54
                }
            },
            "limit_hits": []
        },
        {
            "deleted_at": 0,
            "id": "bbb0d30d-c732-4bb9-92f0-19457512bb05",
            "created_at": 1710761623,
            "name": "Required tag tagging policy",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "type": "tagging_policy",
            "definition": {
                "conditions": {
                    "without_tag": "TAG"
                },
                "start_date": 1710761609
            },
            "filters": {
                "resource_type": [
                    {
                        "name": "Instance",
                        "type": "regular"
                    }
                ]
            },
            "last_run": 1739966418,
            "last_run_result": {
                "value": 54
            },
            "limit_hits": [
                {
                    "deleted_at": 0,
                    "id": "05948f91-393c-42b0-93b8-178b7a75c0f0",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
                    "constraint_id": "bbb0d30d-c732-4bb9-92f0-19457512bb05",
                    "constraint_limit": 0.0,
                    "value": 54.0,
                    "created_at": 1739836815,
                    "run_result": {
                        "value": 54
                    }
                },
                {
                    "deleted_at": 0,
                    "id": "70494961-2e43-43fb-abcc-cb9f0d5ce173",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
                    "constraint_id": "bbb0d30d-c732-4bb9-92f0-19457512bb05",
                    "constraint_limit": 0.0,
                    "value": 54.0,
                    "created_at": 1739923221,
                    "run_result": {
                        "value": 54
                    }
                }
            ]
        },
        {
            "deleted_at": 0,
            "id": "ca2c9fd4-b52e-448b-96b4-73f66d1e7166",
            "created_at": 1694070247,
            "name": "Environments total budget",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "type": "expiring_budget",
            "definition": {
                "total_budget": 100,
                "start_date": 1685836800
            },
            "filters": {
                "pool": [
                    {
                        "id": "04c41f3d-b80e-4e6b-a1e8-47cd953dd240",
                        "name": "Environment",
                        "purpose": "budget"
                    }
                ]
            },
            "last_run": 1739967612,
            "last_run_result": {
                "limit": 50,
                "current": 554.6004734020767
            },
            "limit_hits": []
        },
        {
            "deleted_at": 0,
            "id": "e03ad6a1-95ed-437d-aeb2-539f1358800f",
            "created_at": 1711453480,
            "name": "Resources tagging policy",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "type": "tagging_policy",
            "definition": {
                "conditions": {
                    "tag": "00000000-0000-0000-0000-000000000000"
                },
                "start_date": 1711453455
            },
            "filters": {},
            "last_run": 1739966418,
            "last_run_result": {
                "value": 418
            },
            "limit_hits": [
                {
                    "deleted_at": 0,
                    "id": "8860ddb6-ee7d-4465-8890-ed05c2fb6654",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
                    "constraint_id": "e03ad6a1-95ed-437d-aeb2-539f1358800f",
                    "constraint_limit": 0.0,
                    "value": 515.0,
                    "created_at": 1739836815,
                    "run_result": {
                        "value": 515
                    }
                },
                {
                    "deleted_at": 0,
                    "id": "20d33da6-ec43-4b4b-a0e0-1940c1069f94",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
                    "constraint_id": "e03ad6a1-95ed-437d-aeb2-539f1358800f",
                    "constraint_limit": 0.0,
                    "value": 418.0,
                    "created_at": 1739923221,
                    "run_result": {
                        "value": 418
                    }
                }
            ]
        },
        {
            "deleted_at": 0,
            "id": "f29f0002-c878-4a9a-950a-93f793d8a90a",
            "created_at": 1710761680,
            "name": "Prohibited tag tagging policy",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "type": "tagging_policy",
            "definition": {
                "conditions": {
                    "tag": "test"
                },
                "start_date": 1710761660
            },
            "filters": {},
            "last_run": 1739966418,
            "last_run_result": {
                "value": 16
            },
            "limit_hits": [
                {
                    "deleted_at": 0,
                    "id": "57234005-129a-4022-be7d-b98ecbaa4576",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
                    "constraint_id": "f29f0002-c878-4a9a-950a-93f793d8a90a",
                    "constraint_limit": 0.0,
                    "value": 16.0,
                    "created_at": 1739836815,
                    "run_result": {
                        "value": 16
                    }
                },
                {
                    "deleted_at": 0,
                    "id": "c2bbd3e6-d549-4dcc-bd70-40c0a456f259",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
                    "constraint_id": "f29f0002-c878-4a9a-950a-93f793d8a90a",
                    "constraint_limit": 0.0,
                    "value": 16.0,
                    "created_at": 1739923221,
                    "run_result": {
                        "value": 16
                    }
                }
            ]
        },
        {
            "deleted_at": 0,
            "id": "f733e3ee-5fe4-4cf7-8196-a4cf4c75cbc1",
            "created_at": 1694069998,
            "name": "QA resources tagging policy",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "type": "tagging_policy",
            "definition": {
                "conditions": {
                    "tag": "aqa_uuid",
                    "without_tag": "aqa"
                },
                "start_date": 1685822400
            },
            "filters": {
                "active": [
                    true
                ],
                "cloud_account": [
                    {
                        "id": "d2af0153-66c2-4fc5-b9c2-50bc42fc11f5",
                        "name": "Azure QA",
                        "type": "azure_cnr"
                    }
                ]
            },
            "last_run": 1739966418,
            "last_run_result": {
                "value": 22
            },
            "limit_hits": [
                {
                    "deleted_at": 0,
                    "id": "a4f9bf72-db0e-4b29-8fcb-02bba4703253",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
                    "constraint_id": "f733e3ee-5fe4-4cf7-8196-a4cf4c75cbc1",
                    "constraint_limit": 0.0,
                    "value": 22.0,
                    "created_at": 1739839216,
                    "run_result": {
                        "value": 22
                    }
                },
                {
                    "deleted_at": 0,
                    "id": "f65cc63f-2b16-4131-b3ed-57c6b64806c3",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
                    "constraint_id": "f733e3ee-5fe4-4cf7-8196-a4cf4c75cbc1",
                    "constraint_limit": 0.0,
                    "value": 22.0,
                    "created_at": 1739925608,
                    "run_result": {
                        "value": 22
                    }
                }
            ]
        }
    ]
}

export const PoolsResponse = {
    "deleted_at": 0,
    "id": "649ba12c-8384-4521-9923-67e514b22d53",
    "created_at": 1739937079,
    "limit": 15000,
    "name": "Sunflower Inc",
    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
    "parent_id": null,
    "purpose": "business_unit",
    "default_owner_id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
    "default_owner_name": "Demo User",
    "unallocated_limit": 13156,
    "cost": 3844.054300624176,
    "forecast": 5599.65,
    "saving": 3733.2445147567996,
    "total_recommendations": 271,
    "children": [
        {
            "deleted_at": 0,
            "id": "04c41f3d-b80e-4e6b-a1e8-47cd953dd240",
            "created_at": 1694068325,
            "limit": 0,
            "name": "Environment",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "649ba12c-8384-4521-9923-67e514b22d53",
            "purpose": "budget",
            "default_owner_id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
            "default_owner_name": "Demo User",
            "unallocated_limit": 0,
            "policies": [
                {
                    "deleted_at": 0,
                    "id": "10cb3a46-c1a0-4b3b-b6ef-c4d9ea6bd6c1",
                    "created_at": 1694072432,
                    "type": "ttl",
                    "limit": 1,
                    "active": true,
                    "pool_id": "04c41f3d-b80e-4e6b-a1e8-47cd953dd240",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f"
                },
                {
                    "deleted_at": 0,
                    "id": "22cd76b0-ce90-4589-8106-63fe92421f4e",
                    "created_at": 1694072960,
                    "type": "daily_expense_limit",
                    "limit": 4,
                    "active": true,
                    "pool_id": "04c41f3d-b80e-4e6b-a1e8-47cd953dd240",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f"
                }
            ],
            "cost": 37.58400000000001,
            "forecast": 56.0
        },
        {
            "deleted_at": 0,
            "id": "0d58a197-1669-48d1-8b6c-df9ef4651182",
            "created_at": 1694089626,
            "limit": 0,
            "name": "K8s dev",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "649ba12c-8384-4521-9923-67e514b22d53",
            "purpose": "budget",
            "default_owner_id": "ea6a46e2-6bc5-460a-be7b-d55e5d40a338",
            "default_owner_name": "William Johnson",
            "unallocated_limit": 0,
            "policies": [],
            "cost": 192.22826103326562,
            "forecast": 279.73
        },
        {
            "deleted_at": 0,
            "id": "135a9cf3-d7e6-4753-8d07-f7241d15ef8b",
            "created_at": 1699509497,
            "limit": 0,
            "name": "AWS Marketing",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "649ba12c-8384-4521-9923-67e514b22d53",
            "purpose": "budget",
            "default_owner_id": "6d9549a1-328f-4b7e-9668-afae2eaf3ed2",
            "default_owner_name": "Edwin Gagnon",
            "unallocated_limit": 0,
            "policies": [],
            "cost": 402.62111853839986,
            "forecast": 588.3
        },
        {
            "deleted_at": 0,
            "id": "556da7de-a06a-4d10-8a18-1db00e613aca",
            "created_at": 1694064144,
            "limit": 1500,
            "name": "Engineering",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "649ba12c-8384-4521-9923-67e514b22d53",
            "purpose": "business_unit",
            "default_owner_id": "9050d0c0-682f-4054-9ea4-edbf51ebfaec",
            "default_owner_name": "Julian Jackson",
            "unallocated_limit": 1010,
            "policies": [
                {
                    "deleted_at": 0,
                    "id": "ec747d7b-e363-4639-a638-c15831f913b7",
                    "created_at": 1694072447,
                    "type": "ttl",
                    "limit": 48,
                    "active": true,
                    "pool_id": "556da7de-a06a-4d10-8a18-1db00e613aca",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f"
                }
            ],
            "cost": 532.0456995799999,
            "forecast": 654.91
        },
        {
            "deleted_at": 0,
            "id": "8f78318e-e5d3-4fa2-9e38-2fe7f9c7aa21",
            "created_at": 1699509540,
            "limit": 0,
            "name": "AWS HQ",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "649ba12c-8384-4521-9923-67e514b22d53",
            "purpose": "budget",
            "default_owner_id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
            "default_owner_name": "Demo User",
            "unallocated_limit": 0,
            "policies": [],
            "cost": 1045.2202476492007,
            "forecast": 1582.12
        },
        {
            "deleted_at": 0,
            "id": "aca7e349-d11e-48de-8b79-5b1becd5bfad",
            "created_at": 1694063651,
            "limit": 130,
            "name": "Ali dev",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "649ba12c-8384-4521-9923-67e514b22d53",
            "purpose": "budget",
            "default_owner_id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
            "default_owner_name": "Demo User",
            "unallocated_limit": 130,
            "policies": [
                {
                    "deleted_at": 0,
                    "id": "cc2de963-86b2-46f5-9a35-7c388314aab2",
                    "created_at": 1694072484,
                    "type": "daily_expense_limit",
                    "limit": 60,
                    "active": false,
                    "pool_id": "aca7e349-d11e-48de-8b79-5b1becd5bfad",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f"
                }
            ],
            "cost": 304.43947904,
            "forecast": 441.57
        },
        {
            "deleted_at": 0,
            "id": "be19d7c0-d3e6-417a-ad70-4a5ef6acc42a",
            "created_at": 1694064443,
            "limit": 14,
            "name": "Marketing",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "649ba12c-8384-4521-9923-67e514b22d53",
            "purpose": "business_unit",
            "default_owner_id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
            "default_owner_name": "Demo User",
            "unallocated_limit": 0,
            "policies": [],
            "cost": 49.22412202879999,
            "forecast": 59.87
        },
        {
            "deleted_at": 0,
            "id": "c08db139-aeae-47ac-a490-3bb865fadfbe",
            "created_at": 1694063961,
            "limit": 0,
            "name": "GCP dev",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "649ba12c-8384-4521-9923-67e514b22d53",
            "purpose": "budget",
            "default_owner_id": "6d9549a1-328f-4b7e-9668-afae2eaf3ed2",
            "default_owner_name": "Edwin Gagnon",
            "unallocated_limit": 0,
            "policies": [],
            "cost": 687.1982419999998,
            "forecast": 1056.09
        },
        {
            "deleted_at": 0,
            "id": "c0ab8c74-f1e5-4a89-a053-fbd4b230331a",
            "created_at": 1694063520,
            "limit": 200,
            "name": "Dev environment sample",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "649ba12c-8384-4521-9923-67e514b22d53",
            "purpose": "budget",
            "default_owner_id": "6d9549a1-328f-4b7e-9668-afae2eaf3ed2",
            "default_owner_name": "Edwin Gagnon",
            "unallocated_limit": 200,
            "policies": [],
            "cost": 449.1010350441652,
            "forecast": 663.8
        },
        {
            "deleted_at": 0,
            "id": "d1c8f801-1b52-4a84-96a8-4716bc1a22f1",
            "created_at": 1712749265,
            "limit": 0,
            "name": "Databricks",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "649ba12c-8384-4521-9923-67e514b22d53",
            "purpose": "budget",
            "default_owner_id": "377fb29d-f02c-4d1b-8e27-b5d0962c758a",
            "default_owner_name": "Lily Walsh",
            "unallocated_limit": 0,
            "policies": [],
            "cost": 0,
            "forecast": 0
        },
        {
            "deleted_at": 0,
            "id": "f6fc2334-d289-4908-af5e-d340b0a7998a",
            "created_at": 1694063710,
            "limit": 0,
            "name": "Azure QA",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "649ba12c-8384-4521-9923-67e514b22d53",
            "purpose": "budget",
            "default_owner_id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
            "default_owner_name": "Demo User",
            "unallocated_limit": 0,
            "policies": [],
            "cost": 143.8186550537449,
            "forecast": 216.4
        },
        {
            "deleted_at": 0,
            "id": "3a882e23-4707-4265-ade7-6f64880ebc60",
            "created_at": 1694064223,
            "limit": 140,
            "name": "QA",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "556da7de-a06a-4d10-8a18-1db00e613aca",
            "purpose": "team",
            "default_owner_id": "8f79081a-b0e4-4171-98af-b2282adca5e6",
            "default_owner_name": "Oscar Foster",
            "unallocated_limit": 50,
            "policies": [
                {
                    "deleted_at": 0,
                    "id": "48dbdb78-ad38-404c-9329-c51a1c41f665",
                    "created_at": 1694072419,
                    "type": "ttl",
                    "limit": 5,
                    "active": false,
                    "pool_id": "3a882e23-4707-4265-ade7-6f64880ebc60",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f"
                }
            ],
            "cost": 450.35548569199995,
            "forecast": 533.78
        },
        {
            "deleted_at": 0,
            "id": "3ae89b1a-eddb-4a45-9a9d-863a89038bf7",
            "created_at": 1694064247,
            "limit": 110,
            "name": "Crawler",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "556da7de-a06a-4d10-8a18-1db00e613aca",
            "purpose": "cicd",
            "default_owner_id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
            "default_owner_name": "Demo User",
            "unallocated_limit": 94,
            "policies": [],
            "cost": 0,
            "forecast": 0
        },
        {
            "deleted_at": 0,
            "id": "67438c3a-90dc-47d3-b6a5-2c9632138530",
            "created_at": 1694064208,
            "limit": 110,
            "name": "Dev",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "556da7de-a06a-4d10-8a18-1db00e613aca",
            "purpose": "team",
            "default_owner_id": "9050d0c0-682f-4054-9ea4-edbf51ebfaec",
            "default_owner_name": "Julian Jackson",
            "unallocated_limit": 110,
            "policies": [],
            "cost": 78.17230079999999,
            "forecast": 115.87
        },
        {
            "deleted_at": 0,
            "id": "824d0184-c84d-4a4d-b42c-1d28b5bec88b",
            "created_at": 1694064184,
            "limit": 110,
            "name": "Daily checks",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "556da7de-a06a-4d10-8a18-1db00e613aca",
            "purpose": "cicd",
            "default_owner_id": "c20ae510-3f93-456e-afed-b58d29775b7a",
            "default_owner_name": "Christian Thomas",
            "unallocated_limit": 110,
            "policies": [
                {
                    "deleted_at": 0,
                    "id": "fa7a9e86-8fbf-450a-84ba-6b410b4e9740",
                    "created_at": 1694072458,
                    "type": "ttl",
                    "limit": 5,
                    "active": false,
                    "pool_id": "824d0184-c84d-4a4d-b42c-1d28b5bec88b",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f"
                }
            ],
            "cost": 3.517913087999999,
            "forecast": 5.26
        },
        {
            "deleted_at": 0,
            "id": "9eb19006-0484-4e19-a00a-8ff93c747c3e",
            "created_at": 1694064349,
            "limit": 20,
            "name": "Monitoring",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "556da7de-a06a-4d10-8a18-1db00e613aca",
            "purpose": "project",
            "default_owner_id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
            "default_owner_name": "Demo User",
            "unallocated_limit": 20,
            "policies": [],
            "cost": 0,
            "forecast": 0
        },
        {
            "deleted_at": 0,
            "id": "19231e23-e380-48c2-a701-95a431960c49",
            "created_at": 1694064464,
            "limit": 14,
            "name": "Clicks research",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "be19d7c0-d3e6-417a-ad70-4a5ef6acc42a",
            "purpose": "mlai",
            "default_owner_id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
            "default_owner_name": "Demo User",
            "unallocated_limit": 14,
            "policies": [
                {
                    "deleted_at": 0,
                    "id": "01448162-5f21-4bb2-90fc-12a4b518d500",
                    "created_at": 1694080852,
                    "type": "daily_expense_limit",
                    "limit": 2,
                    "active": true,
                    "pool_id": "19231e23-e380-48c2-a701-95a431960c49",
                    "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f"
                }
            ],
            "cost": 49.22412202879999,
            "forecast": 59.87
        },
        {
            "deleted_at": 0,
            "id": "846554eb-975f-4546-98bf-fb14f223b3c9",
            "created_at": 1694064269,
            "limit": 90,
            "name": "Release 3.5",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "3a882e23-4707-4265-ade7-6f64880ebc60",
            "purpose": "project",
            "default_owner_id": "3d8c231f-5d00-4c7b-ab08-9f583661acec",
            "default_owner_name": "Luke White",
            "unallocated_limit": 90,
            "policies": [],
            "cost": 0,
            "forecast": 0
        },
        {
            "deleted_at": 0,
            "id": "b079efd6-2d0b-41cd-854a-80829553523e",
            "created_at": 1694064319,
            "limit": 10,
            "name": "discovery",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "3ae89b1a-eddb-4a45-9a9d-863a89038bf7",
            "purpose": "cicd",
            "default_owner_id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
            "default_owner_name": "Demo User",
            "unallocated_limit": 10,
            "policies": [],
            "cost": 0,
            "forecast": 0
        },
        {
            "deleted_at": 0,
            "id": "e321bf4e-5584-41b1-9af0-5eb6f3239064",
            "created_at": 1694064301,
            "limit": 6,
            "name": "diworker",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f",
            "parent_id": "3ae89b1a-eddb-4a45-9a9d-863a89038bf7",
            "purpose": "mlai",
            "default_owner_id": "36212cb1-0f4c-4c3e-8479-487df1b4ce58",
            "default_owner_name": "Demo User",
            "unallocated_limit": 6,
            "policies": [],
            "cost": 0,
            "forecast": 0
        }
    ],
    "policies": [
        {
            "deleted_at": 0,
            "id": "7b447e41-a3ee-4c36-bf2c-7c2220145b91",
            "created_at": 1694072404,
            "type": "ttl",
            "limit": 2,
            "active": false,
            "pool_id": "649ba12c-8384-4521-9923-67e514b22d53",
            "organization_id": "df58ec86-8e73-4f9b-95e7-67cb6b9db52f"
        }
    ]
}

export const AllowedActionsResponse = {
    "allowed_actions": {
    "10290a37-0591-4726-b727-12f38655cbe4": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "1193f254-0e2f-4f15-815e-b8f9a5e7e005": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "16a4522b-3166-4ded-ae02-2725fcb2b5f7": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "2388203c-8e29-4a2c-940c-667e665a62de": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "4526aff2-c60e-4ea2-b71d-a2cd0447f9bf": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "879fbf5a-d302-4bcf-89d9-365a9fc4f15f": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "98aa2e74-1e42-46be-b73c-78b220f6cf53": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "a8ac3a9c-101f-45da-889a-1604defd1841": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "c9608710-10c6-4143-9930-35460c2a42f5": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "f2b0b765-3864-493a-b73d-5f5810c9d7b5": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "f7c7c986-7402-4bd9-b9ab-8e7f8230ec07": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "3ed89732-74f8-47f4-8c8b-3de2a70b840d": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "40f4529b-bc62-4d38-a182-e875f4bbe4cb": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "7ab58cd2-7135-4b82-9da6-35748dd12081": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "9fdf5946-c1c7-4122-b1eb-9910d870bb36": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "dc84fca7-48ab-4c96-a363-2e00bc01b92c": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "f76a0f80-d9bb-4b02-b450-b0086297476b": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "0eb49b1d-5855-40fc-b71b-d5fbffe1e249": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "20758f6f-210b-41bf-aef6-10e4fc433d2f": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "e118622d-ab2a-4304-a23d-5117af86368d": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ],
      "be7e9ce4-cefd-4e50-8c1e-e48ed7f6cde2": [
        "CREATE_PARTNER",
        "ASSIGN_USER",
        "DELETE_PARTNER",
        "ACK_EVENT",
        "MANAGE_PERMISSIONS",
        "INFO_ORGANIZATION",
        "POLL_EVENT",
        "LIST_USERS",
        "EDIT_PARTNER",
        "MANAGE_CLOUD_CREDENTIALS",
        "MANAGE_RESOURCES",
        "ASSIGN_SELF",
        "INFO_PARTNER",
        "MANAGE_CHECKLISTS",
        "MANAGE_OWN_RESOURCES",
        "MANAGE_POOLS",
        "MANAGE_INVITES",
        "BOOK_ENVIRONMENTS"
    ]
}
}
