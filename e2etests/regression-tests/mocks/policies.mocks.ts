export const PolicyRegressionResponse = {
    "organization_constraints": [
        {
            "deleted_at": 0,
            "id": "6a139798-4d7a-43ed-9a80-a10eaaf10d0b",
            "created_at": 1695192326,
            "name": "Buckets count in eu-west-2",
            "organization_id": "6765b96c-3fda-4073-ade4-aaa840e45f97",
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
            "last_run": 1741089618,
            "last_run_result": {
                "limit": 10,
                "current": 0
            },
            "limit_hits": []
        },
        {
            "deleted_at": 0,
            "id": "76ecf507-b745-4aa1-acb6-b5f496a2a424",
            "created_at": 1695192389,
            "name": "Buckets count in us-east-1",
            "organization_id": "6765b96c-3fda-4073-ade4-aaa840e45f97",
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
            "last_run": 1741089618,
            "last_run_result": {
                "limit": 3,
                "current": 12
            },
            "limit_hits": [
                {
                    "deleted_at": 0,
                    "id": "41ad44b7-7fc9-4703-a0ae-4c2a8620fc20",
                    "organization_id": "6765b96c-3fda-4073-ade4-aaa840e45f97",
                    "constraint_id": "76ecf507-b745-4aa1-acb6-b5f496a2a424",
                    "constraint_limit": 3.0,
                    "value": 14.0,
                    "created_at": 1740877216,
                    "run_result": {
                        "limit": 3,
                        "current": 14
                    }
                },
                {
                    "deleted_at": 0,
                    "id": "80512699-66c2-46eb-aef8-505f2b7fda46",
                    "organization_id": "6765b96c-3fda-4073-ade4-aaa840e45f97",
                    "constraint_id": "76ecf507-b745-4aa1-acb6-b5f496a2a424",
                    "constraint_limit": 3.0,
                    "value": 14.0,
                    "created_at": 1740967217,
                    "run_result": {
                        "limit": 3,
                        "current": 14
                    }
                },
                {
                    "deleted_at": 0,
                    "id": "60b21b7a-4aca-4b2b-960a-46baccc36ee0",
                    "organization_id": "6765b96c-3fda-4073-ade4-aaa840e45f97",
                    "constraint_id": "76ecf507-b745-4aa1-acb6-b5f496a2a424",
                    "constraint_limit": 3.0,
                    "value": 12.0,
                    "created_at": 1741048808,
                    "run_result": {
                        "limit": 3,
                        "current": 12
                    }
                }
            ]
        },
        {
            "deleted_at": 0,
            "id": "95788b08-5ad3-4aa2-8a26-2f442740a75c",
            "created_at": 1695192570,
            "name": "Monthly S3 expenses quota",
            "organization_id": "6765b96c-3fda-4073-ade4-aaa840e45f97",
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
            "last_run": 1741090812,
            "last_run_result": {
                "limit": 100,
                "current": 193.4109080453
            },
            "limit_hits": []
        },
        {
            "deleted_at": 0,
            "id": "c81cc8f0-0305-4e18-b998-a0e6664edd0c",
            "created_at": 1695193447,
            "name": "Environments total budget",
            "organization_id": "6765b96c-3fda-4073-ade4-aaa840e45f97",
            "type": "expiring_budget",
            "definition": {
                "total_budget": 100,
                "start_date": 1686960000
            },
            "filters": {
                "pool": [
                    {
                        "id": "9c5d67be-9991-4857-ace1-432ad813dfcc",
                        "name": "Environment",
                        "purpose": "budget"
                    }
                ]
            },
            "last_run": 1741090812,
            "last_run_result": {
                "limit": 50,
                "current": 554.6004734020767
            },
            "limit_hits": []
        }
    ]
}
export const TaggingPolicyRegressionResponse = {
    "organization_constraints": [
        {
            "deleted_at": 0,
            "id": "0df3fc33-e58c-4d1d-b79a-dfc51c42ba11",
            "created_at": 1711279995,
            "name": "Instances tagging policy",
            "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7",
            "type": "tagging_policy",
            "definition": {
                "conditions": {
                    "tag": "00000000-0000-0000-0000-000000000000"
                },
                "start_date": 1711279984
            },
            "filters": {
                "resource_type": [
                    {
                        "name": "Instance",
                        "type": "regular"
                    }
                ]
            },
            "last_run": 1740484818,
            "last_run_result": {
                "value": 6
            },
            "limit_hits": []
        },
        {
            "deleted_at": 0,
            "id": "16608eb9-d767-4e34-8f6e-42bde710ecbb",
            "created_at": 1694588398,
            "name": "QA resources tagging policy",
            "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7",
            "type": "tagging_policy",
            "definition": {
                "conditions": {
                    "tag": "aqa_uuid",
                    "without_tag": "aqa"
                },
                "start_date": 1686340800
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
            "last_run": 1740484818,
            "last_run_result": {
                "value": 22
            },
            "limit_hits": []
        },
        {
            "deleted_at": 0,
            "id": "1f4b5f07-abcf-428a-af5a-5ced44c6e044",
            "created_at": 1711971880,
            "name": "Resources tagging policy",
            "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7",
            "type": "tagging_policy",
            "definition": {
                "conditions": {
                    "tag": "00000000-0000-0000-0000-000000000000"
                },
                "start_date": 1711971855
            },
            "filters": {},
            "last_run": 1740484818,
            "last_run_result": {
                "value": 418
            },
            "limit_hits": []
        },
        {
            "deleted_at": 0,
            "id": "683ae2e9-25c6-469b-968b-5c03c91040fa",
            "created_at": 1711280080,
            "name": "Prohibited tag tagging policy",
            "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7",
            "type": "tagging_policy",
            "definition": {
                "conditions": {
                    "tag": "test"
                },
                "start_date": 1711280060
            },
            "filters": {},
            "last_run": 1740484818,
            "last_run_result": {
                "value": 16
            },
            "limit_hits": []
        },
        {
            "deleted_at": 0,
            "id": "ff5f28ca-8f39-4425-86da-f0fd4482f09c",
            "created_at": 1711280023,
            "name": "Required tag tagging policy",
            "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7",
            "type": "tagging_policy",
            "definition": {
                "conditions": {
                    "without_tag": "TAG"
                },
                "start_date": 1711280009
            },
            "filters": {
                "resource_type": [
                    {
                        "name": "Instance",
                        "type": "regular"
                    }
                ]
            },
            "last_run": 1740484818,
            "last_run_result": {
                "value": 54
            },
            "limit_hits": []
        }
    ]
}
