export const OrganizationExpensesPoolsMock = {
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

export const OrganizationCleanExpansesMock = {
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

export const OptimizationsMock = {
    "total_saving": 4444.667051653359,
    "optimizations": {
        "abandoned_images": {
            "count": 14,
            "saving": 25.729114285714285,
            "options": {
                "days_threshold": 7,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "1650965314046403263",
                    "resource_name": "sunflower-lily-va-mgr-gcp-4-1-202407040959-release-4-1",
                    "resource_id": "e4db47ba-1975-4b7d-9ab6-371def64de81",
                    "cloud_account_id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "cloud_account_name": "GCP dev",
                    "cloud_type": "gcp_cnr",
                    "folder_id": null,
                    "last_used": 0,
                    "saving": 2.8511400000000013,
                    "owner": {
                        "id": "9a427506-b058-4c34-9ff6-3d3b7aa37116",
                        "name": "Cody Walsh"
                    },
                    "pool": {
                        "id": "d9ee26f7-b0dc-4eae-9124-bf957a63cb38",
                        "name": "GCP dev",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "first_seen": 1736755200,
                    "detected_at": 1742257236
                },
                {
                    "cloud_resource_id": "9029293420080526037",
                    "resource_name": "sunflower-lily-va-mgr-gcp",
                    "resource_id": "270bab44-7d08-43e7-b707-b7c5c90b2ff8",
                    "cloud_account_id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "cloud_account_name": "GCP dev",
                    "cloud_type": "gcp_cnr",
                    "folder_id": null,
                    "last_used": 0,
                    "saving": 2.6997942857142867,
                    "owner": {
                        "id": "9a427506-b058-4c34-9ff6-3d3b7aa37116",
                        "name": "Cody Walsh"
                    },
                    "pool": {
                        "id": "d9ee26f7-b0dc-4eae-9124-bf957a63cb38",
                        "name": "GCP dev",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "first_seen": 1736755200,
                    "detected_at": 1742257236
                },
                {
                    "cloud_resource_id": "5077241363834787172",
                    "resource_name": "sunflower-lily-va-dr-gcp-4-0-2215-release-4-0-en",
                    "resource_id": "f557bcb3-ee53-4972-90bf-f36b17b9149d",
                    "cloud_account_id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "cloud_account_name": "GCP dev",
                    "cloud_type": "gcp_cnr",
                    "folder_id": null,
                    "last_used": 0,
                    "saving": 2.6910342857142857,
                    "owner": {
                        "id": "9a427506-b058-4c34-9ff6-3d3b7aa37116",
                        "name": "Cody Walsh"
                    },
                    "pool": {
                        "id": "d9ee26f7-b0dc-4eae-9124-bf957a63cb38",
                        "name": "GCP dev",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "first_seen": 1736755200,
                    "detected_at": 1742257236
                }
            ],
            "cloud_accounts": [
                {
                    "id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "name": "GCP dev",
                    "type": "gcp_cnr"
                }
            ],
            "limit": 3
        },
        "abandoned_instances": {
            "count": 26,
            "saving": 709.457257307143,
            "options": {
                "days_threshold": 7,
                "cpu_percent_threshold": 5,
                "network_bps_threshold": 1000,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "resource_id": "390872bb-7f32-40ba-8cf6-b25dd80cb550",
                    "resource_name": "aqa-eu-underutilized-instance",
                    "cloud_resource_id": "i-gw8bwy1fbwc2spcyqhdy",
                    "region": "Germany (Frankfurt)",
                    "cloud_account_id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "owner": {
                        "id": "1659e0ab-49bc-48ba-a048-213c6995b63b",
                        "name": "Robert Fisher"
                    },
                    "pool": {
                        "id": "e6162256-edd1-432d-9f0c-057deba8c9c3",
                        "name": "Ali dev",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "saving": 77.76,
                    "detected_at": 1746452792
                },
                {
                    "resource_id": "42c6043b-e18f-4b56-9e18-5da954f2a182",
                    "resource_name": "orchidAiWebsite",
                    "cloud_resource_id": "i-0e44a71a514e20aa5",
                    "region": "us-west-2",
                    "cloud_account_id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS Marketing",
                    "owner": {
                        "id": "9a427506-b058-4c34-9ff6-3d3b7aa37116",
                        "name": "Cody Walsh"
                    },
                    "pool": {
                        "id": "991016ed-3075-4849-9a80-632ad2fbaf32",
                        "name": "AWS Marketing",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "saving": 56.66078037257143,
                    "detected_at": 1748075680
                },
                {
                    "resource_id": "4a9e8f07-3b3d-4b51-985c-91a22908c654",
                    "resource_name": "orchidAiWebsite-x1",
                    "cloud_resource_id": "i-0e44a71a514e20aa5-x1",
                    "region": "us-west-2",
                    "cloud_account_id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS Marketing",
                    "owner": {
                        "id": "9a427506-b058-4c34-9ff6-3d3b7aa37116",
                        "name": "Cody Walsh"
                    },
                    "pool": {
                        "id": "991016ed-3075-4849-9a80-632ad2fbaf32",
                        "name": "AWS Marketing",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "saving": 56.66078037257143,
                    "detected_at": 1748075680
                }
            ],
            "cloud_accounts": [
                {
                    "id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                },
                {
                    "id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                },
                {
                    "id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "name": "AWS Marketing",
                    "type": "aws_cnr"
                }
            ],
            "limit": 3
        },
        "abandoned_kinesis_streams": {
            "count": 1,
            "saving": 25.919999999999995,
            "options": {
                "days_threshold": 7,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "OMtest",
                    "resource_name": null,
                    "resource_id": "3dea3735-41d6-43eb-a7f4-5ff5c82251ef",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "us-west-2",
                    "owner": {
                        "id": "1659e0ab-49bc-48ba-a048-213c6995b63b",
                        "name": "Robert Fisher"
                    },
                    "pool": {
                        "id": "d950d14c-645a-4372-a3da-1c034c8ff028",
                        "name": "AWS HQ",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "shardhours_capacity": 1,
                    "shardhours_price": 0.018000000000000002,
                    "saving": 25.919999999999995,
                    "detected_at": 1733499641
                }
            ],
            "cloud_accounts": [
                {
                    "id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                }
            ],
            "limit": 3
        },
        "abandoned_load_balancers": {
            "count": 1,
            "saving": 32.04762284392897,
            "options": {
                "days_threshold": 7,
                "bytes_sent_threshold": 0,
                "packets_sent_threshold": 0,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "/subscriptions/318bd278-e4ef-4230-9ab4-2ad6a29f578c/resourcegroups/aqa/providers/microsoft.network/loadbalancers/aqa-abandoned-load-balancer",
                    "resource_name": "aqa-abandoned-load-balancer",
                    "resource_id": "602491ee-ded4-43e8-9547-01055bd40945",
                    "cloud_account_id": "550420c3-17ac-461f-a41a-1336f9dcd19a",
                    "cloud_account_name": "Azure QA",
                    "cloud_type": "azure_cnr",
                    "saving": 32.04762284392897,
                    "owner": {
                        "id": "1659e0ab-49bc-48ba-a048-213c6995b63b",
                        "name": "Robert Fisher"
                    },
                    "pool": {
                        "id": "9c7651f7-142a-4b41-9889-6ac3aa454525",
                        "name": "Azure QA",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "detected_at": 1748268528
                }
            ],
            "cloud_accounts": [
                {
                    "id": "550420c3-17ac-461f-a41a-1336f9dcd19a",
                    "name": "Azure QA",
                    "type": "azure_cnr"
                }
            ],
            "limit": 3
        },
        "cvos_opportunities": {
            "count": 0,
            "saving": 0,
            "options": {
                "days_threshold": 90,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [],
            "cloud_accounts": []
        },
        "inactive_console_users": {
            "count": 3,
            "options": {
                "days_threshold": 91,
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_account_id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS Marketing",
                    "user_name": "sf-linked",
                    "user_id": "AIDA4YBYU3OIIQXT6HSYY",
                    "last_used": 1727693669,
                    "detected_at": 1740916782
                },
                {
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "user_name": "aqa-user",
                    "user_id": "AIDAIKFDVXZELQ5NVB2EQ",
                    "last_used": 1652869334,
                    "detected_at": 1691561191
                },
                {
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "user_name": "pk-full",
                    "user_id": "AIDAIPPYCHRYQONGDLRJS",
                    "last_used": 1629370721,
                    "detected_at": 1691561191
                }
            ],
            "cloud_accounts": [
                {
                    "id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                },
                {
                    "id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "name": "AWS Marketing",
                    "type": "aws_cnr"
                }
            ],
            "limit": 3
        },
        "inactive_users": {
            "count": 61,
            "options": {
                "days_threshold": 91,
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_account_id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "cloud_type": "gcp_cnr",
                    "cloud_account_name": "GCP dev",
                    "user_name": "sf-sunflower",
                    "user_id": "103420622376694204097",
                    "last_used": 0,
                    "detected_at": 1745746869
                },
                {
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "user_name": "yr-admin-console",
                    "user_id": "AIDAI7XVSPHIAPBZ4MY6U",
                    "last_used": 1730551260,
                    "detected_at": 1743772265
                },
                {
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "user_name": "mk-full",
                    "user_id": "AIDAQUWY5LJ4ZOHQ32TBF",
                    "last_used": 1729158992,
                    "detected_at": 1742387255
                }
            ],
            "cloud_accounts": [
                {
                    "id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                },
                {
                    "id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "name": "AWS Marketing",
                    "type": "aws_cnr"
                },
                {
                    "id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "name": "GCP dev",
                    "type": "gcp_cnr"
                }
            ],
            "limit": 3
        },
        "insecure_security_groups": {
            "count": 36,
            "options": {
                "excluded_pools": {},
                "insecure_ports": [
                    {
                        "protocol": "tcp",
                        "port": 22
                    },
                    {
                        "protocol": "tcp",
                        "port": 3389
                    },
                    {
                        "protocol": "tcp",
                        "port": 1080
                    }
                ],
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "i-089bfd8dd506b8f34",
                    "resource_name": "sf-instance-for-power-schedule",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "resource_id": null,
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "security_group_name": "orchid_ml_instances",
                    "security_group_id": "sg-0b9a441aca22c0856",
                    "region": "eu-north-1",
                    "is_excluded": false,
                    "insecure_ports": [
                        {
                            "port": 22,
                            "protocol": "tcp"
                        },
                        {
                            "port": "*",
                            "protocol": "*"
                        }
                    ],
                    "detected_at": 1747740589
                },
                {
                    "cloud_resource_id": "i-081ab9de8dc20914c",
                    "resource_name": "tm-arcee",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "resource_id": null,
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "security_group_name": "tmTest",
                    "security_group_id": "sg-0940ce3304d7870e4",
                    "region": "us-east-1",
                    "is_excluded": false,
                    "insecure_ports": [
                        {
                            "port": 22,
                            "protocol": "tcp"
                        }
                    ],
                    "detected_at": 1747328207
                },
                {
                    "cloud_resource_id": "i-0436ee72bb653bf8a",
                    "resource_name": "aqa_us_instance_for_migration",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "resource_id": "16b60f14-5140-4e3e-9650-ea1354c503f2",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "security_group_name": "launch-wizard-2",
                    "security_group_id": "sg-01e701998068ab9e3",
                    "region": "us-west-1",
                    "is_excluded": false,
                    "insecure_ports": [
                        {
                            "port": 22,
                            "protocol": "tcp"
                        }
                    ],
                    "detected_at": 1745833439
                }
            ],
            "cloud_accounts": [
                {
                    "id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                },
                {
                    "id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "name": "AWS Marketing",
                    "type": "aws_cnr"
                },
                {
                    "id": "550420c3-17ac-461f-a41a-1336f9dcd19a",
                    "name": "Azure QA",
                    "type": "azure_cnr"
                },
                {
                    "id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "name": "GCP dev",
                    "type": "gcp_cnr"
                }
            ],
            "limit": 3
        },
        "instance_generation_upgrade": {
            "count": 1,
            "saving": 12.6144,
            "options": {
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "i-gw8csaxjubfrl7s2e1ip",
                    "resource_name": "aqa-instance-generation-upgrade",
                    "resource_id": "b8075054-7bc3-417b-a598-4e52f5327acf",
                    "cloud_account_id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "region": "Germany (Frankfurt)",
                    "owner": {
                        "id": "1659e0ab-49bc-48ba-a048-213c6995b63b",
                        "name": "Robert Fisher"
                    },
                    "pool": {
                        "id": "e6162256-edd1-432d-9f0c-057deba8c9c3",
                        "name": "Ali dev",
                        "purpose": "budget"
                    },
                    "saving": 12.6144,
                    "recommended_flavor": "ecs.t6-c1m1.large",
                    "is_excluded": false,
                    "flavor": "ecs.t5-c1m1.large",
                    "detected_at": 1730595055
                }
            ],
            "cloud_accounts": [
                {
                    "id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                }
            ],
            "limit": 3
        },
        "instance_migration": {
            "count": 2,
            "saving": 3.168000000000001,
            "options": {
                "excluded_pools": {
                    "f6fafb13-747b-4cb3-bee6-0cb91bc56fbb": true
                },
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "saving": 1.7279999999999998,
                    "flavor": "t3.micro",
                    "current_region": "us-west-2",
                    "recommended_region": "eu-north-1",
                    "cloud_resource_id": "i-0c84e6b7499a93600",
                    "resource_name": "wg-frankfurt",
                    "resource_id": "04e73864-3466-49ea-aa2b-684390a4212d",
                    "cloud_account_id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS Marketing",
                    "is_excluded": false,
                    "detected_at": 1744215836
                },
                {
                    "saving": 1.4400000000000013,
                    "flavor": "ecs.t6-c1m1.large",
                    "current_region": "Germany (Frankfurt)",
                    "recommended_region": "UK (London)",
                    "cloud_resource_id": "i-gw88picys2t778uzra24",
                    "resource_name": "aqa-instance-migration",
                    "resource_id": "3a513d0d-d326-4618-87f4-16444a7e7131",
                    "cloud_account_id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "is_excluded": false,
                    "detected_at": 1735609490
                }
            ],
            "cloud_accounts": [
                {
                    "id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "name": "AWS Marketing",
                    "type": "aws_cnr"
                },
                {
                    "id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                }
            ],
            "limit": 3
        },
        "instance_subscription": {
            "count": 4,
            "saving": 57.84533333333334,
            "options": {
                "days_threshold": 90,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "monthly_saving": 20.080000000000005,
                    "annually_monthly_saving": 28.73166666666667,
                    "saving": 28.73166666666667,
                    "invoice_discount": 0.0,
                    "flavor": "ecs.n4.large",
                    "region": "Germany (Frankfurt)",
                    "cloud_resource_id": "i-gw8bwy1fbwc2spcyqhdy",
                    "resource_name": "aqa-eu-underutilized-instance",
                    "resource_id": "390872bb-7f32-40ba-8cf6-b25dd80cb550",
                    "cloud_account_id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "is_excluded": false,
                    "detected_at": 1691393267
                },
                {
                    "monthly_saving": 10.654399999999995,
                    "annually_monthly_saving": 15.484399999999997,
                    "saving": 15.484399999999997,
                    "invoice_discount": 0.07,
                    "flavor": "ecs.t5-c1m1.large",
                    "region": "Germany (Frankfurt)",
                    "cloud_resource_id": "i-gw8csaxjubfrl7s2e1ip",
                    "resource_name": "aqa-instance-generation-upgrade",
                    "resource_id": "b8075054-7bc3-417b-a598-4e52f5327acf",
                    "cloud_account_id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "is_excluded": false,
                    "detected_at": 1736301809
                },
                {
                    "monthly_saving": 6.343200000000003,
                    "annually_monthly_saving": 9.609866666666672,
                    "saving": 9.609866666666672,
                    "invoice_discount": 0.06999999999999999,
                    "flavor": "ecs.t6-c1m1.large",
                    "region": "Germany (Frankfurt)",
                    "cloud_resource_id": "i-gw88picys2t778uzra24",
                    "resource_name": "aqa-instance-migration",
                    "resource_id": "3a513d0d-d326-4618-87f4-16444a7e7131",
                    "cloud_account_id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "is_excluded": false,
                    "detected_at": 1736215289
                }
            ],
            "cloud_accounts": [
                {
                    "id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                }
            ],
            "limit": 3
        },
        "instances_for_shutdown": {
            "count": 12,
            "saving": 354.32370477102626,
            "options": {
                "days_threshold": 15,
                "cpu_percent_threshold": 6,
                "network_bps_threshold": 1001,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "resource_id": "390872bb-7f32-40ba-8cf6-b25dd80cb550",
                    "resource_name": "aqa-eu-underutilized-instance",
                    "cloud_resource_id": "i-gw8bwy1fbwc2spcyqhdy",
                    "region": "Germany (Frankfurt)",
                    "cloud_account_id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "owner": {
                        "id": "1659e0ab-49bc-48ba-a048-213c6995b63b",
                        "name": "Robert Fisher"
                    },
                    "pool": {
                        "id": "e6162256-edd1-432d-9f0c-057deba8c9c3",
                        "name": "Ali dev",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "inactivity_periods": [
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 0
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 23
                            }
                        }
                    ],
                    "saving": 77.75999999999999,
                    "detected_at": 1691393267
                },
                {
                    "resource_id": "3314fb57-6226-4fea-aa77-b9381f659768",
                    "resource_name": "sunflowerRuWebsite",
                    "cloud_resource_id": "i-02b64bf06fa8263e1",
                    "region": "us-west-2",
                    "cloud_account_id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS Marketing",
                    "owner": {
                        "id": "9a427506-b058-4c34-9ff6-3d3b7aa37116",
                        "name": "Cody Walsh"
                    },
                    "pool": {
                        "id": "991016ed-3075-4849-9a80-632ad2fbaf32",
                        "name": "AWS Marketing",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "inactivity_periods": [
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 1
                            },
                            "end": {
                                "day_of_week": 0,
                                "hour": 3
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 16
                            },
                            "end": {
                                "day_of_week": 0,
                                "hour": 16
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 19
                            },
                            "end": {
                                "day_of_week": 0,
                                "hour": 21
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 23
                            },
                            "end": {
                                "day_of_week": 0,
                                "hour": 23
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 1,
                                "hour": 2
                            },
                            "end": {
                                "day_of_week": 1,
                                "hour": 4
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 1,
                                "hour": 15
                            },
                            "end": {
                                "day_of_week": 1,
                                "hour": 15
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 1,
                                "hour": 23
                            },
                            "end": {
                                "day_of_week": 2,
                                "hour": 1
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 2,
                                "hour": 22
                            },
                            "end": {
                                "day_of_week": 2,
                                "hour": 22
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 3,
                                "hour": 0
                            },
                            "end": {
                                "day_of_week": 3,
                                "hour": 5
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 3,
                                "hour": 14
                            },
                            "end": {
                                "day_of_week": 3,
                                "hour": 14
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 4,
                                "hour": 3
                            },
                            "end": {
                                "day_of_week": 4,
                                "hour": 3
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 4,
                                "hour": 22
                            },
                            "end": {
                                "day_of_week": 4,
                                "hour": 22
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 5,
                                "hour": 1
                            },
                            "end": {
                                "day_of_week": 5,
                                "hour": 2
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 5,
                                "hour": 4
                            },
                            "end": {
                                "day_of_week": 5,
                                "hour": 4
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 5,
                                "hour": 7
                            },
                            "end": {
                                "day_of_week": 5,
                                "hour": 7
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 5,
                                "hour": 16
                            },
                            "end": {
                                "day_of_week": 5,
                                "hour": 21
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 5,
                                "hour": 23
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 0
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 6,
                                "hour": 4
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 4
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 6,
                                "hour": 6
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 6
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 6,
                                "hour": 8
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 8
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 6,
                                "hour": 10
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 10
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 6,
                                "hour": 13
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 14
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 6,
                                "hour": 19
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 19
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 6,
                                "hour": 23
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 23
                            }
                        }
                    ],
                    "saving": 50.78219586460714,
                    "detected_at": 1691562991
                },
                {
                    "resource_id": "42c6043b-e18f-4b56-9e18-5da954f2a182",
                    "resource_name": "orchidAiWebsite",
                    "cloud_resource_id": "i-0e44a71a514e20aa5",
                    "region": "us-west-2",
                    "cloud_account_id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS Marketing",
                    "owner": {
                        "id": "9a427506-b058-4c34-9ff6-3d3b7aa37116",
                        "name": "Cody Walsh"
                    },
                    "pool": {
                        "id": "991016ed-3075-4849-9a80-632ad2fbaf32",
                        "name": "AWS Marketing",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "inactivity_periods": [
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 0
                            },
                            "end": {
                                "day_of_week": 0,
                                "hour": 9
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 12
                            },
                            "end": {
                                "day_of_week": 0,
                                "hour": 19
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 23
                            },
                            "end": {
                                "day_of_week": 0,
                                "hour": 23
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 1,
                                "hour": 2
                            },
                            "end": {
                                "day_of_week": 1,
                                "hour": 9
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 1,
                                "hour": 11
                            },
                            "end": {
                                "day_of_week": 1,
                                "hour": 11
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 1,
                                "hour": 13
                            },
                            "end": {
                                "day_of_week": 1,
                                "hour": 15
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 1,
                                "hour": 19
                            },
                            "end": {
                                "day_of_week": 2,
                                "hour": 5
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 2,
                                "hour": 7
                            },
                            "end": {
                                "day_of_week": 2,
                                "hour": 10
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 2,
                                "hour": 12
                            },
                            "end": {
                                "day_of_week": 2,
                                "hour": 18
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 2,
                                "hour": 20
                            },
                            "end": {
                                "day_of_week": 2,
                                "hour": 21
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 2,
                                "hour": 23
                            },
                            "end": {
                                "day_of_week": 3,
                                "hour": 8
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 3,
                                "hour": 10
                            },
                            "end": {
                                "day_of_week": 3,
                                "hour": 21
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 4,
                                "hour": 0
                            },
                            "end": {
                                "day_of_week": 4,
                                "hour": 6
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 4,
                                "hour": 8
                            },
                            "end": {
                                "day_of_week": 4,
                                "hour": 8
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 4,
                                "hour": 10
                            },
                            "end": {
                                "day_of_week": 4,
                                "hour": 13
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 4,
                                "hour": 15
                            },
                            "end": {
                                "day_of_week": 4,
                                "hour": 19
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 4,
                                "hour": 21
                            },
                            "end": {
                                "day_of_week": 5,
                                "hour": 1
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 5,
                                "hour": 3
                            },
                            "end": {
                                "day_of_week": 5,
                                "hour": 14
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 5,
                                "hour": 16
                            },
                            "end": {
                                "day_of_week": 5,
                                "hour": 17
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 5,
                                "hour": 19
                            },
                            "end": {
                                "day_of_week": 5,
                                "hour": 20
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 5,
                                "hour": 22
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 5
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 6,
                                "hour": 9
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 9
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 6,
                                "hour": 11
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 23
                            }
                        }
                    ],
                    "saving": 47.71739592685,
                    "detected_at": 1724031758
                }
            ],
            "cloud_accounts": [
                {
                    "id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                },
                {
                    "id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                },
                {
                    "id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "name": "AWS Marketing",
                    "type": "aws_cnr"
                },
                {
                    "id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "name": "GCP dev",
                    "type": "gcp_cnr"
                }
            ],
            "limit": 3
        },
        "instances_in_stopped_state_for_a_long_time": {
            "count": 2,
            "saving": 42.76290293421905,
            "options": {
                "days_threshold": 2,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "/subscriptions/318bd278-e4ef-4230-9ab4-2ad6a29f578c/resourcegroups/aqa/providers/microsoft.compute/virtualmachines/aqa-stopped-not-deallocated",
                    "resource_name": "aqa-stopped-not-deallocated",
                    "resource_id": "c4b19b52-f712-4628-8b0f-27f0e80e9634",
                    "cloud_account_id": "550420c3-17ac-461f-a41a-1336f9dcd19a",
                    "cloud_type": "azure_cnr",
                    "cloud_account_name": "Azure QA",
                    "cost_in_stopped_state": 465.5137535271979,
                    "saving": 33.58380293421905,
                    "region": "Germany West Central",
                    "is_excluded": false,
                    "last_seen_active": 0,
                    "detected_at": 1708778088
                },
                {
                    "cloud_resource_id": "i-gw852sv7ve9um1l6d0mf",
                    "resource_name": "aqa-stopped-not-deallocated-1",
                    "resource_id": "5095ebdb-4d4c-4287-bdb9-32ab19e548c6",
                    "cloud_account_id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "cost_in_stopped_state": 18.821979087802767,
                    "saving": 9.179099999999998,
                    "region": "Germany (Frankfurt)",
                    "is_excluded": false,
                    "last_seen_active": 0,
                    "detected_at": 1737936467
                }
            ],
            "cloud_accounts": [
                {
                    "id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                },
                {
                    "id": "550420c3-17ac-461f-a41a-1336f9dcd19a",
                    "name": "Azure QA",
                    "type": "azure_cnr"
                }
            ],
            "limit": 3
        },
        "nebius_migration": {
            "count": 0,
            "saving": 0,
            "options": {
                "days_threshold": 30,
                "skip_cloud_accounts": []
            },
            "items": [],
            "cloud_accounts": []
        },
        "obsolete_images": {
            "count": 129,
            "saving": 249.6074958780286,
            "options": {
                "days_threshold": 7,
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "ami-06f4e737af7d45d1b",
                    "resource_name": "sunflower_lily_VA_DR_AWS_3_9_2066-release_3_9",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "us-west-2",
                    "last_used": 0,
                    "saving": 5.263734373,
                    "snapshots": [
                        {
                            "cloud_resource_id": "snap-0b14b0f5690db4384",
                            "resource_id": "b9d90863-9887-4354-a97f-6ce9aecbb375",
                            "cost": 2.6318671865
                        }
                    ],
                    "first_seen": 1667909174,
                    "detected_at": 1714378729
                },
                {
                    "cloud_resource_id": "ami-04c8e04f79cc9f5ac",
                    "resource_name": "sunflower_lily_VA_DR_AWS_4_1_202407040959-release_4_1_en",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "me-central-1",
                    "last_used": 0,
                    "saving": 5.1409960916,
                    "snapshots": [
                        {
                            "cloud_resource_id": "snap-017e5e174ce9d3b3a",
                            "resource_id": "52acdfbf-d973-412a-a2c0-ea37612e7716",
                            "cost": 2.5704980458
                        }
                    ],
                    "first_seen": 1726655551,
                    "detected_at": 1727270249
                },
                {
                    "cloud_resource_id": "ami-03c0d4d9fd012643f",
                    "resource_name": "sunflower_lily_VA_MGR_AWS_4_1_202401241136-release_4_1_en",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "me-central-1",
                    "last_used": 0,
                    "saving": 5.0726757806,
                    "snapshots": [
                        {
                            "cloud_resource_id": "snap-0ad9c7fe4a98f3c65",
                            "resource_id": "cc24ac9f-5c87-45e6-b291-0b862d21dd6e",
                            "cost": 2.5363378903
                        }
                    ],
                    "first_seen": 1722336484,
                    "detected_at": 1722941999
                }
            ],
            "cloud_accounts": [
                {
                    "id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                },
                {
                    "id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                },
                {
                    "id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "name": "AWS Marketing",
                    "type": "aws_cnr"
                }
            ],
            "limit": 3
        },
        "obsolete_ips": {
            "count": 23,
            "saving": 158.0875175070528,
            "options": {
                "days_threshold": 7,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "3898766375811007470",
                    "resource_name": "aqa-gcp-ip-address",
                    "resource_id": "d165a42f-2426-4d6f-bba4-084f24ca2bb4",
                    "cloud_account_id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "cloud_type": "gcp_cnr",
                    "cloud_account_name": "GCP dev",
                    "cost_not_active_ip": 27.70687714140177,
                    "saving": 13.88343870967742,
                    "region": "us-central1",
                    "is_excluded": false,
                    "folder_id": null,
                    "zone_id": null,
                    "last_seen_active": 0,
                    "detected_at": 1737971909
                },
                {
                    "cloud_resource_id": "417727921023910526",
                    "resource_name": "issueip",
                    "resource_id": "aae15ccc-1d0e-4d8e-bb61-19df1135f779",
                    "cloud_account_id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "cloud_type": "gcp_cnr",
                    "cloud_account_name": "GCP dev",
                    "cost_not_active_ip": 2.9097620000000006,
                    "saving": 13.429670769230773,
                    "region": "us-central1",
                    "is_excluded": false,
                    "folder_id": null,
                    "zone_id": null,
                    "last_seen_active": 1747214476,
                    "detected_at": 1747827090
                },
                {
                    "cloud_resource_id": "eip-gw80wgx89t7t7p3x2ah7y",
                    "resource_name": "aqa-obsolete-ip",
                    "resource_id": "d9c0cae7-75d8-412f-8880-3bd18c73dbce",
                    "cloud_account_id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "cost_not_active_ip": 24.054999316513538,
                    "saving": 8.4375,
                    "region": "Germany (Frankfurt)",
                    "is_excluded": false,
                    "folder_id": null,
                    "zone_id": null,
                    "last_seen_active": 1733911282,
                    "detected_at": 1734516816
                }
            ],
            "cloud_accounts": [
                {
                    "id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "name": "GCP dev",
                    "type": "gcp_cnr"
                },
                {
                    "id": "17fb8e94-99e4-408a-899f-b579ea480383",
                    "name": "Dev environment",
                    "type": "azure_cnr"
                },
                {
                    "id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                },
                {
                    "id": "550420c3-17ac-461f-a41a-1336f9dcd19a",
                    "name": "Azure QA",
                    "type": "azure_cnr"
                },
                {
                    "id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                }
            ],
            "limit": 3
        },
        "obsolete_snapshot_chains": {
            "count": 3,
            "saving": 1.8632038200000003,
            "options": {
                "days_threshold": 3,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "sl-gw84m857olspqve95jb9",
                    "resource_name": null,
                    "resource_id": "a8ae069f-673e-4dbd-b6e5-a8024646502b",
                    "cloud_account_id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "saving": 1.5232010800000002,
                    "region": "Germany (Frankfurt)",
                    "folder_id": null,
                    "last_used": 0,
                    "is_excluded": false,
                    "child_snapshots": [
                        {
                            "cloud_resource_id": "s-gw8f5fd047rk6z0mpkx8",
                            "name": "sunflower_lily_VA_DR_Alibaba_3_9_om20221228-feature_cloud7_en",
                            "cloud_console_link": "https://ecs.console.aliyun.com/#/snapshot/region/eu-central-1?snapshotIds=s-gw8f5fd047rk6z0mpkx8"
                        }
                    ],
                    "first_seen": 1745452800,
                    "last_seen": 1748044800,
                    "detected_at": 1726382012
                },
                {
                    "cloud_resource_id": "sl-gw8d2sicdq9oq331hb05",
                    "resource_name": null,
                    "resource_id": null,
                    "cloud_account_id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "saving": 0.18018431999999995,
                    "region": "Germany (Frankfurt)",
                    "folder_id": null,
                    "last_used": 0,
                    "is_excluded": false,
                    "child_snapshots": [
                        {
                            "cloud_resource_id": "s-gw85a66uwrbpu8ef27r4",
                            "name": "ds-test",
                            "cloud_console_link": "https://ecs.console.aliyun.com/#/snapshot/region/eu-central-1?snapshotIds=s-gw85a66uwrbpu8ef27r4"
                        }
                    ],
                    "first_seen": 1745452800,
                    "last_seen": 1748044800,
                    "detected_at": 1726382012
                },
                {
                    "cloud_resource_id": "sl-gw8563b8gddmynuojvwy",
                    "resource_name": null,
                    "resource_id": null,
                    "cloud_account_id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "saving": 0.15981842000000002,
                    "region": "Germany (Frankfurt)",
                    "folder_id": null,
                    "last_used": 0,
                    "is_excluded": false,
                    "child_snapshots": [
                        {
                            "cloud_resource_id": "s-gw8bhucwvgg0y050fe8z",
                            "name": "SFChainLastUsedtesting",
                            "cloud_console_link": "https://ecs.console.aliyun.com/#/snapshot/region/eu-central-1?snapshotIds=s-gw8bhucwvgg0y050fe8z"
                        }
                    ],
                    "first_seen": 1745452800,
                    "last_seen": 1748044800,
                    "detected_at": 1726382012
                }
            ],
            "cloud_accounts": [
                {
                    "id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                }
            ],
            "limit": 3
        },
        "obsolete_snapshots": {
            "count": 95,
            "saving": 220.69851429129528,
            "options": {
                "days_threshold": 1,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "snap-07609592440ab5da4",
                    "resource_name": "tulipVPN_1662485894.331822",
                    "resource_id": "9be5050f-20ae-4a36-b31b-963c70be605f",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "saving": 13.5578773116,
                    "region": "us-west-2",
                    "folder_id": null,
                    "last_used": 0,
                    "is_excluded": false,
                    "child_snapshots": null,
                    "first_seen": 1745625600,
                    "last_seen": 1748217600,
                    "detected_at": 1742809365
                },
                {
                    "cloud_resource_id": "snap-035cab587ba161af9",
                    "resource_name": null,
                    "resource_id": "7f2eb8f4-6700-4533-be5c-8515b7d140b9",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "saving": 9.884792628000001,
                    "region": "ap-southeast-3",
                    "folder_id": null,
                    "last_used": 0,
                    "is_excluded": false,
                    "child_snapshots": null,
                    "first_seen": 1745625600,
                    "last_seen": 1748217600,
                    "detected_at": 1726760735
                },
                {
                    "cloud_resource_id": "snap-0754bb4b2af2e62aa",
                    "resource_name": null,
                    "resource_id": "096cbab8-7e7f-49a2-b30c-63660e09d4c5",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "saving": 4.885684248,
                    "region": "us-east-2",
                    "folder_id": null,
                    "last_used": 0,
                    "is_excluded": false,
                    "child_snapshots": null,
                    "first_seen": 1745625600,
                    "last_seen": 1748217600,
                    "detected_at": 1742809365
                }
            ],
            "cloud_accounts": [
                {
                    "id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                },
                {
                    "id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "name": "GCP dev",
                    "type": "gcp_cnr"
                },
                {
                    "id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "name": "AWS Marketing",
                    "type": "aws_cnr"
                }
            ],
            "limit": 3
        },
        "reserved_instances": {
            "count": 9,
            "saving": 556.892,
            "options": {
                "days_threshold": 90,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "saving": 372.2213333333334,
                    "average_saving": 127.08000000000004,
                    "flavor": "r4.2xlarge",
                    "region": "us-west-2",
                    "cloud_resource_id": "i-01737496f6856ac0f",
                    "resource_name": "sunflower Live Cloud Migration",
                    "resource_id": "24e460a7-8c01-4769-b051-d8fbed2fe13f",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "is_excluded": false,
                    "detected_at": 1748226880,
                    "cloud_account_name": "AWS HQ"
                },
                {
                    "saving": 74.78266666666664,
                    "average_saving": 5.183999999999983,
                    "flavor": "t3.xlarge",
                    "region": "us-west-2",
                    "cloud_resource_id": "i-082b1a163698b8ede",
                    "resource_name": "sunflowerWebSite",
                    "resource_id": "68f9991f-8f00-454a-9c1c-30e4177a21d7",
                    "cloud_account_id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "cloud_type": "aws_cnr",
                    "is_excluded": false,
                    "detected_at": 1696815308,
                    "cloud_account_name": "AWS Marketing"
                },
                {
                    "saving": 29.465333333333334,
                    "average_saving": 3.5279999999999987,
                    "flavor": "t2.large",
                    "region": "us-west-2",
                    "cloud_resource_id": "i-0e464cfbf9650bd21",
                    "resource_name": "finops-practice",
                    "resource_id": "f1da1db8-b50b-402b-a78d-0b3c05cac07a",
                    "cloud_account_id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "cloud_type": "aws_cnr",
                    "is_excluded": false,
                    "detected_at": 1691562991,
                    "cloud_account_name": "AWS Marketing"
                }
            ],
            "cloud_accounts": [
                {
                    "id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                },
                {
                    "id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "name": "AWS Marketing",
                    "type": "aws_cnr"
                }
            ],
            "limit": 3
        },
        "rightsizing_instances": {
            "count": 20,
            "saving": 3801.26,
            "options": {
                "days_threshold": 3,
                "metric": {
                    "type": "avg",
                    "limit": 80
                },
                "excluded_flavor_regex": "",
                "excluded_pools": {
                    "3a248797-84f6-46b8-b6b9-9aa612105d1e": true,
                    "9ef6f469-434d-4937-80b0-6eea3085deb6": true
                },
                "recommended_flavor_cpu_min": 1,
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "i-01737496f6856ac0f",
                    "resource_name": "sunflower Live Cloud Migration",
                    "resource_id": "24e460a7-8c01-4769-b051-d8fbed2fe13f",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "us-west-2",
                    "flavor": "r4.2xlarge",
                    "recommended_flavor": "r4.large",
                    "saving": 760.32,
                    "saving_percent": 82.47,
                    "current_cost": 460.94,
                    "recommended_flavor_cost": 126.72,
                    "cpu": 8,
                    "recommended_flavor_cpu": 2,
                    "recommended_flavor_ram": 15616,
                    "cpu_usage": 10.96,
                    "is_excluded": false,
                    "cpu_peak": 19.17,
                    "cpu_quantile_50": 6.81,
                    "cpu_quantile_99": 19.07,
                    "project_cpu_avg": 43.85,
                    "project_cpu_peak": 76.67,
                    "projected_cpu_qtl_50": 27.24,
                    "projected_cpu_qtl_99": 76.28,
                    "detected_at": 1748226880
                },
                {
                    "cloud_resource_id": "i-01737496f6856ac0f-x1",
                    "resource_name": "sunflower Live Cloud Migration-x1",
                    "resource_id": "32bb960a-9b06-4796-81f0-8a2cafebf101",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "us-west-2",
                    "flavor": "r4.2xlarge",
                    "recommended_flavor": "r4.large",
                    "saving": 760.32,
                    "saving_percent": 82.47,
                    "current_cost": 460.94,
                    "recommended_flavor_cost": 126.72,
                    "cpu": 8,
                    "recommended_flavor_cpu": 2,
                    "recommended_flavor_ram": 15616,
                    "cpu_usage": 10.96,
                    "is_excluded": false,
                    "cpu_peak": 19.17,
                    "cpu_quantile_50": 6.81,
                    "cpu_quantile_99": 19.07,
                    "project_cpu_avg": 43.85,
                    "project_cpu_peak": 76.67,
                    "projected_cpu_qtl_50": 27.24,
                    "projected_cpu_qtl_99": 76.28,
                    "detected_at": 1748226880
                },
                {
                    "cloud_resource_id": "i-01737496f6856ac0f-x2",
                    "resource_name": "sunflower Live Cloud Migration-x2",
                    "resource_id": "ecbec86e-7565-4f1b-bb13-a31bc4ca9704",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "us-west-2",
                    "flavor": "r4.2xlarge",
                    "recommended_flavor": "r4.large",
                    "saving": 760.32,
                    "saving_percent": 82.47,
                    "current_cost": 460.94,
                    "recommended_flavor_cost": 126.72,
                    "cpu": 8,
                    "recommended_flavor_cpu": 2,
                    "recommended_flavor_ram": 15616,
                    "cpu_usage": 10.96,
                    "is_excluded": false,
                    "cpu_peak": 19.17,
                    "cpu_quantile_50": 6.81,
                    "cpu_quantile_99": 19.07,
                    "project_cpu_avg": 43.85,
                    "project_cpu_peak": 76.67,
                    "projected_cpu_qtl_50": 27.24,
                    "projected_cpu_qtl_99": 76.28,
                    "detected_at": 1748226880
                }
            ],
            "cloud_accounts": [
                {
                    "id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                },
                {
                    "id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                },
                {
                    "id": "e9256ba2-6eb9-4d48-869d-1cd5c7e2422e",
                    "name": "AWS Marketing",
                    "type": "aws_cnr"
                },
                {
                    "id": "550420c3-17ac-461f-a41a-1336f9dcd19a",
                    "name": "Azure QA",
                    "type": "azure_cnr"
                }
            ],
            "limit": 3
        },
        "rightsizing_rds": {
            "count": 0,
            "saving": 0,
            "options": {
                "days_threshold": 9,
                "metric": {
                    "type": "avg",
                    "limit": 81
                },
                "excluded_flavor_regex": "",
                "excluded_pools": {},
                "recommended_flavor_cpu_min": 1,
                "skip_cloud_accounts": []
            },
            "items": [],
            "cloud_accounts": []
        },
        "s3_abandoned_buckets": {
            "count": 74,
            "saving": 40.34025134057145,
            "options": {
                "days_threshold": 7,
                "data_size_threshold": 1024,
                "tier_1_request_quantity_threshold": 100,
                "tier_2_request_quantity_threshold": 2000,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "kmiller-1",
                    "resource_name": "kmiller-1",
                    "resource_id": "ad7ea3db-407b-4928-9e7d-bc9e20bfc378",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "us-west-2",
                    "owner": {
                        "id": "1659e0ab-49bc-48ba-a048-213c6995b63b",
                        "name": "Robert Fisher"
                    },
                    "pool": {
                        "id": "d950d14c-645a-4372-a3da-1c034c8ff028",
                        "name": "AWS HQ",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "saving": 2.9460577482857144,
                    "tier_1_request_quantity": 0,
                    "tier_2_request_quantity": 0,
                    "avg_data_size": 2.4689536585142853,
                    "detected_at": 1743198805
                },
                {
                    "cloud_resource_id": "sunflower-ap-south-1",
                    "resource_name": "sunflower-ap-south-1",
                    "resource_id": "7f5b0b7b-6b90-4b51-baf6-bc4f4d1ad0bc",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "ap-south-1",
                    "owner": {
                        "id": "1659e0ab-49bc-48ba-a048-213c6995b63b",
                        "name": "Robert Fisher"
                    },
                    "pool": {
                        "id": "d950d14c-645a-4372-a3da-1c034c8ff028",
                        "name": "AWS HQ",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "saving": 2.938155747428571,
                    "tier_1_request_quantity": 0,
                    "tier_2_request_quantity": 0,
                    "avg_data_size": 5.128492295314286,
                    "detected_at": 1691562991
                },
                {
                    "cloud_resource_id": "sunflower-us-east-1",
                    "resource_name": "sunflower-us-east-1",
                    "resource_id": "c9d45a5c-79fa-4820-b003-bdc1b76eb04d",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "us-east-1",
                    "owner": {
                        "id": "1659e0ab-49bc-48ba-a048-213c6995b63b",
                        "name": "Robert Fisher"
                    },
                    "pool": {
                        "id": "d950d14c-645a-4372-a3da-1c034c8ff028",
                        "name": "AWS HQ",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "saving": 2.1480455631428574,
                    "tier_1_request_quantity": 0,
                    "tier_2_request_quantity": 0,
                    "avg_data_size": 5.279090965942857,
                    "detected_at": 1701820780
                }
            ],
            "cloud_accounts": [
                {
                    "id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                }
            ],
            "limit": 3
        },
        "s3_abandoned_buckets_nebius": {
            "count": 0,
            "saving": 0,
            "options": {
                "days_threshold": 7,
                "data_size_threshold": 1024,
                "get_request_quantity_threshold": 100,
                "post_request_quantity_threshold": 100,
                "put_request_quantity_threshold": 100,
                "head_request_quantity_threshold": 100,
                "options_request_quantity_threshold": 100,
                "delete_request_quantity_threshold": 100,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [],
            "cloud_accounts": []
        },
        "s3_public_buckets": {
            "count": 4,
            "options": {
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "sunflower-lily-share",
                    "resource_name": "sunflower-lily-share",
                    "resource_id": "b2e25cfc-bb8b-451f-ba12-855cdc412806",
                    "cloud_account_id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "cloud_type": "gcp_cnr",
                    "cloud_account_name": "GCP dev",
                    "region": "europe",
                    "owner": {
                        "id": "9a427506-b058-4c34-9ff6-3d3b7aa37116",
                        "name": "Cody Walsh"
                    },
                    "pool": {
                        "id": "d9ee26f7-b0dc-4eae-9124-bf957a63cb38",
                        "name": "GCP dev",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "is_public_policy": true,
                    "is_public_acls": false,
                    "detected_at": 1740019195
                },
                {
                    "cloud_resource_id": "nk-bucket",
                    "resource_name": "nk-bucket",
                    "resource_id": "fea83054-d7a8-4875-8484-8228f83d6170",
                    "cloud_account_id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "cloud_type": "gcp_cnr",
                    "cloud_account_name": "GCP dev",
                    "region": "us-east1",
                    "owner": {
                        "id": "9a427506-b058-4c34-9ff6-3d3b7aa37116",
                        "name": "Cody Walsh"
                    },
                    "pool": {
                        "id": "d9ee26f7-b0dc-4eae-9124-bf957a63cb38",
                        "name": "GCP dev",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "is_public_policy": true,
                    "is_public_acls": true,
                    "detected_at": 1740019195
                },
                {
                    "cloud_resource_id": "sunflower-static-files",
                    "resource_name": "sunflower-static-files",
                    "resource_id": "03f7354e-77b8-4641-87ed-be60c7137517",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "us-east-1",
                    "owner": {
                        "id": "1659e0ab-49bc-48ba-a048-213c6995b63b",
                        "name": "Robert Fisher"
                    },
                    "pool": {
                        "id": "d950d14c-645a-4372-a3da-1c034c8ff028",
                        "name": "AWS HQ",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "is_public_policy": true,
                    "is_public_acls": false,
                    "detected_at": 1721219239
                }
            ],
            "cloud_accounts": [
                {
                    "id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "name": "GCP dev",
                    "type": "gcp_cnr"
                },
                {
                    "id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                }
            ],
            "limit": 3
        },
        "short_living_instances": {
            "count": 16,
            "saving": 1.7753347543679996,
            "options": {
                "days_threshold": 3,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "i-gw81zty986rutiw2zxox",
                    "cloud_resource_hash": null,
                    "resource_name": "acruaubu24",
                    "resource_id": "0820eb56-0d50-435d-be71-cc4705d70e65",
                    "cloud_account_id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "total_cost": 0.763972,
                    "saving": 1.08859968,
                    "region": "Germany (Frankfurt)",
                    "is_excluded": false,
                    "first_seen": 1748217600,
                    "last_seen": 0,
                    "detected_at": 1748311728
                },
                {
                    "cloud_resource_id": "i-0a97dfb75931f16cf",
                    "cloud_resource_hash": null,
                    "resource_name": "DS sunflower Backup and Disaster Recovery",
                    "resource_id": null,
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "total_cost": 0.22295366449999998,
                    "saving": 0.293322809664,
                    "region": "eu-north-1",
                    "is_excluded": false,
                    "first_seen": 1748246400,
                    "last_seen": 1748264400,
                    "detected_at": 1748311728
                },
                {
                    "cloud_resource_id": "i-0b9dfbc06b42119fa",
                    "cloud_resource_hash": null,
                    "resource_name": "AWS_cloud_agent",
                    "resource_id": null,
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "total_cost": 0.129603163,
                    "saving": 0.18662399999999998,
                    "region": "eu-north-1",
                    "is_excluded": false,
                    "first_seen": 1748250000,
                    "last_seen": 1748264400,
                    "detected_at": 1748311728
                }
            ],
            "cloud_accounts": [
                {
                    "id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                },
                {
                    "id": "550420c3-17ac-461f-a41a-1336f9dcd19a",
                    "name": "Azure QA",
                    "type": "azure_cnr"
                },
                {
                    "id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                },
                {
                    "id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "name": "GCP dev",
                    "type": "gcp_cnr"
                }
            ],
            "limit": 3
        },
        "volumes_not_attached_for_a_long_time": {
            "count": 29,
            "saving": 119.27439858667758,
            "options": {
                "days_threshold": 10,
                "excluded_pools": {
                    "bbf504b7-a1a4-483a-bc6a-a27c6bdcc0dc": true,
                    "cd7714e5-9bdd-4408-b380-1fc2bec648a9": true,
                    "54704172-af6c-4c91-bf78-5e59ad3ace11": true,
                    "cbefe6bf-5515-4f26-9a6d-75b2259ba158": true,
                    "f6fafb13-747b-4cb3-bee6-0cb91bc56fbb": true
                },
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "vol-0adec22ebb1a3b533",
                    "resource_name": "dm-aplika",
                    "resource_id": "3aa85058-ae6f-4582-9217-0898a24538f4",
                    "cloud_account_id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "cost_in_detached_state": 297.48386703266226,
                    "saving": 23.33283787741935,
                    "region": "ap-southeast-3",
                    "zone_id": null,
                    "is_excluded": false,
                    "last_seen_in_attached_state": 0,
                    "detected_at": 1747382636
                },
                {
                    "cloud_resource_id": "d-gw85ktwfb2pdaf3gtpwt",
                    "resource_name": "ds-test-win_0",
                    "resource_id": "5e410bc0-b17c-4105-8c09-35934f11e559",
                    "cloud_account_id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "cost_in_detached_state": 80.177341953727,
                    "saving": 14.167679999999997,
                    "region": "Germany (Frankfurt)",
                    "zone_id": null,
                    "is_excluded": false,
                    "last_seen_in_attached_state": 1719583056,
                    "detected_at": 1720448850
                },
                {
                    "cloud_resource_id": "/subscriptions/7a26946b-0d60-4c01-adce-b6269d527407/resourcegroups/sunflower_env/providers/microsoft.compute/disks/volume_from_snapshot_ubae4gee7luydbjgjbjvk5",
                    "resource_name": "volume_from_snapshot_uBae4geE7LUYDbjgjbjVK5",
                    "resource_id": "312e341f-29cd-465a-bf4b-b57a3eb8fc45",
                    "cloud_account_id": "17fb8e94-99e4-408a-899f-b579ea480383",
                    "cloud_type": "azure_cnr",
                    "cloud_account_name": "Dev environment",
                    "cost_in_detached_state": 88.30318525401465,
                    "saving": 11.623759865119322,
                    "region": "West US 2",
                    "zone_id": null,
                    "is_excluded": false,
                    "last_seen_in_attached_state": 1708839769,
                    "detected_at": 1745476337
                }
            ],
            "cloud_accounts": [
                {
                    "id": "abb922ca-fa59-4065-906a-455e83531cbf",
                    "name": "GCP dev",
                    "type": "gcp_cnr"
                },
                {
                    "id": "17fb8e94-99e4-408a-899f-b579ea480383",
                    "name": "Dev environment",
                    "type": "azure_cnr"
                },
                {
                    "id": "e3cf0532-14b0-486c-8abb-0b52844d3e75",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                },
                {
                    "id": "c2d18496-de69-4057-8dba-834e310569d5",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                }
            ],
            "limit": 3
        }
    },
    "dismissed_optimizations": {
        "obsolete_snapshot_chains": {
            "count": 1,
            "saving": 0.21403905999999998
        },
        "s3_abandoned_buckets": {
            "count": 1,
            "saving": 129.62824519885714
        }
    },
    "excluded_optimizations": {
        "instance_migration": {
            "count": 1,
            "saving": 12.671999999999997
        },
        "rightsizing_instances": {
            "count": 10,
            "saving": 1090.9799999999998
        },
        "volumes_not_attached_for_a_long_time": {
            "count": 3,
            "saving": 8.825440969085598
        }
    },
    "deleted_at": 0,
    "id": "60e09ebc-fa6c-4424-b9eb-b2623b564d6f",
    "created_at": 1686114618,
    "organization_id": "2f22f9b5-bc76-4561-b3a2-17b50e677771",
    "last_run": 1748311728,
    "next_run": 1748322528,
    "last_completed": 1748311728
}

export const HomeDataSourcesMock = {
    "data": {
        "dataSources": [
            {
                "account_id": "2d2f328c-1407-4e5e-ba59-1cbad182940f",
                "created_at": 1744297042,
                "id": "947cbf94-afc3-4055-b96d-eff284c36a09",
                "last_getting_metric_attempt_at": 1765535411,
                "last_getting_metric_attempt_error": "'value'",
                "last_getting_metrics_at": 1765535411,
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
                "last_getting_metric_attempt_at": 1765535412,
                "last_getting_metric_attempt_error": "AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credentials for added security: https://aka.ms/certCreds. Trace ID: 36f2db53-5a20-4f68-a338-9640dc554200 Correlation ID: c953a48b-cf72-4105-aeaa-ff91cea9c13d Timestamp: 2025-10-09 06:00:14Z",
                "last_getting_metrics_at": 1765535412,
                "last_import_at": 1765534258,
                "last_import_attempt_at": 1765534258,
                "last_import_attempt_error": "Authentication failed: AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credent",
                "name": "CHaaS (QA)",
                "parent_id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
                "type": "azure_cnr",
                "details": {
                    "cost": 823.8334637229897,
                    "resources": 64,
                    "forecast": 2301.49,
                    "last_month_cost": 2205.3718712843875,
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
                "last_getting_metric_attempt_at": 1765535414,
                "last_getting_metric_attempt_error": "{'code': 'InternalServerError', 'message': \"Encountered internal server error. Diagnostic information: timestamp '20251020T080023Z', subscription id '91819a1c-c7d3-4b89-bc9f-39f85bff4666', tracking id 'ae4d6aef-afc4-43c1-972c-949c083d2adf', request correlation id '778dbf81-2ea8-4ddc-986f-4546f34ee72c'.\"}",
                "last_getting_metrics_at": 1765535414,
                "last_import_at": 1765533819,
                "last_import_attempt_at": 1765533819,
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
                "last_getting_metric_attempt_at": 1765535417,
                "last_getting_metric_attempt_error": "string indices must be integers, not 'str'",
                "last_getting_metrics_at": 1765535417,
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
                    "last_month_cost": 16904.614496762293,
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
                "last_getting_metric_attempt_at": 1765535421,
                "last_getting_metric_attempt_error": "{'code': 'InternalServerError', 'message': \"Encountered internal server error. Diagnostic information: timestamp '20251021T100024Z', subscription id 'b6689fdb-ac8c-4116-8136-c7a179cb5be6', tracking id '2d7f9a51-c3c4-431f-8467-4565fddfb2c5', request correlation id '0dd69234-b3e3-4ddb-b876-65bf13a514e3'.\"}",
                "last_getting_metrics_at": 1765535421,
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
                    "last_month_cost": 133112.8044646231,
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
                "last_getting_metric_attempt_at": 1765535453,
                "last_getting_metric_attempt_error": null,
                "last_getting_metrics_at": 1765535453,
                "last_import_at": 1765534752,
                "last_import_attempt_at": 1765534752,
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
                "last_getting_metric_attempt_at": 1765535453,
                "last_getting_metric_attempt_error": null,
                "last_getting_metrics_at": 1765535453,
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
                "last_getting_metric_attempt_at": 1765535456,
                "last_getting_metric_attempt_error": "{'code': 'ServerTimeout', 'message': \"The request timed out. Diagnostic information: timestamp '20251130T000714Z', subscription id '', tracking id 'fe0abbfa-9b6f-4eaf-8407-14d1ca67a330', request correlation id 'fe0abbfa-9b6f-4eaf-8407-14d1ca67a330'.\"}",
                "last_getting_metrics_at": 1765535456,
                "last_import_at": 1765534285,
                "last_import_attempt_at": 1765534285,
                "last_import_attempt_error": "Authentication failed: AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credent",
                "name": "MPT (Dev)",
                "parent_id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
                "type": "azure_cnr",
                "details": {
                    "cost": 7218.929246819063,
                    "resources": 659,
                    "forecast": 18373.32,
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
                "last_getting_metric_attempt_at": 1765535457,
                "last_getting_metric_attempt_error": "{'code': 'InternalServerError', 'message': \"Encountered internal server error. Diagnostic information: timestamp '20251020T090038Z', subscription id 'ef415e11-361a-4f91-8b3c-23aeb9c8f2ac', tracking id 'c869269e-9655-4e2e-9fb8-482b94396b51', request correlation id '8db40c4c-4c12-47e8-a9f8-c3d0e29e7864'.\"}",
                "last_getting_metrics_at": 1765535457,
                "last_import_at": 1765533712,
                "last_import_attempt_at": 1765533712,
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
                "last_getting_metric_attempt_at": 1765535458,
                "last_getting_metric_attempt_error": "AADSTS7000222: The provided client secret keys for app '990d710f-9527-4155-98da-7e1a0e637406' are expired. Visit the Azure portal to create new keys for your app: https://aka.ms/NewClientSecret, or consider using certificate credentials for added security: https://aka.ms/certCreds. Trace ID: 6bd4108f-119e-4cd8-ba6c-f1ea210d0200 Correlation ID: a778f076-e060-430b-b035-d9c3bdd69662 Timestamp: 2025-10-09 06:00:38Z",
                "last_getting_metrics_at": 1765535458,
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
                "last_import_at": 1765533776,
                "last_import_attempt_at": 1765533776,
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
                "last_getting_metric_attempt_at": 1765535459,
                "last_getting_metric_attempt_error": "{'code': 'InternalServerError', 'message': \"Encountered internal server error. Diagnostic information: timestamp '20251021T070045Z', subscription id '89b098bc-b400-4578-8058-8416b0c25f6b', tracking id 'cd773de3-e609-4127-a224-8a14a1dfbb2c', request correlation id '8111d08e-fb74-4510-a994-b78a61f428d0'.\"}",
                "last_getting_metrics_at": 1765535459,
                "last_import_at": 1765533787,
                "last_import_attempt_at": 1765533787,
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
                "last_getting_metric_attempt_at": 1765535461,
                "last_getting_metric_attempt_error": "{'code': 'SubscriptionRequestsThrottled', 'message': \"Number of requests for subscription '63f2c438-c0e1-4606-ac10-eb6aa149c6cb' and operation 'GET/SUBSCRIPTIONS/RESOURCEGROUPS/PROVIDERS/MICROSOFT.NETWORK/LOADBALANCERS/PROVIDERS/MICROSOFT.INSIGHTS/METRICS' exceeded the backend storage limit. Please try again after '6' seconds.\"}",
                "last_getting_metrics_at": 1765535461,
                "last_import_at": 1765533758,
                "last_import_attempt_at": 1765533758,
                "last_import_attempt_error": "Error occurred in request., RetryError: HTTPSConnectionPool(host='management.azure.com', port=443): Max retries exceeded with url: /subscriptions/63f2c438-c0e1-4606-ac10-eb6aa149c6cb/providers/Microsoft.Commerce/RateCard?$filter=OfferDurableId%20eq%20%27M",
                "name": "MPT Finops (Staging)",
                "parent_id": "0fd2fbdf-d2cc-42e3-9749-1747b6b1fe83",
                "type": "azure_cnr",
                "details": {
                    "cost": 1141.0647336933264,
                    "resources": 27,
                    "forecast": 3224.5,
                    "last_month_cost": 3129.9739815732305,
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
                "last_import_at": 1765533839,
                "last_import_attempt_at": 1765533839,
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
                "last_import_at": 1765533749,
                "last_import_attempt_at": 1765533749,
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
                "name": "SoftwareOne",
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

export const OrganizationConstraintsMock = {
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
            "name": "Buckets count in us-east-(e2e)",
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

export const PoolsMock = {
    "deleted_at": 0,
    "id": "649ba12c-8384-4521-9923-67e514b22d53",
    "created_at": 1739937079,
    "limit": 15000,
    "name": "Sunflower Inc (E2E)",
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
            "name": "Dev sample (E2E)",
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

export const AllowedActionsMock = {
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
