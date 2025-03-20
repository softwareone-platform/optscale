export const TaggingPolicyResponse = {
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