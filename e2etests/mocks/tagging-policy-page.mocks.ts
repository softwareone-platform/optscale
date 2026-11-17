export const TaggingPolicyViolationResponse = {
  organization_constraints: [
    {
      deleted_at: 0,
      id: '1dc38049-b397-45ff-b786-6f42c6b60f12',
      created_at: 1769696555,
      name: 'Required Tag Policy 1769696547422',
      organization_id: '4eae08f8-9b40-4094-a11c-f9ee2dc76a12',
      type: 'tagging_policy',
      definition: {
        start_date: 1769644800,
        conditions: {
          without_tag: 'AccountId',
        },
      },
      filters: {},
      last_run: 1769696702,
      last_run_result: {
        value: 3185,
      },
      limit_hits: [
        {
          deleted_at: 0,
          id: '6dea591a-ec7b-4eba-bbf0-4444e0773f4a',
          organization_id: '4eae08f8-9b40-4094-a11c-f9ee2dc76a12',
          constraint_id: '1dc38049-b397-45ff-b786-6f42c6b60f12',
          constraint_limit: 0.0,
          value: 3185.0,
          created_at: 1769696702,
          run_result: {
            value: 3185,
          },
        },
      ],
    },
    {
      deleted_at: 0,
      id: '40c24616-6016-454e-be6f-ca4c165f8ceb',
      created_at: 1769696597,
      name: 'Correlated Tag Policy 1769696585306',
      organization_id: '4eae08f8-9b40-4094-a11c-f9ee2dc76a12',
      type: 'tagging_policy',
      definition: {
        start_date: 1769644800,
        conditions: {
          tag: 'CostCenter',
          without_tag: 'Environment',
        },
      },
      filters: {},
      last_run: 1769696702,
      last_run_result: {
        value: 1,
      },
      limit_hits: [
        {
          deleted_at: 0,
          id: '8032d27f-81c3-4eaa-b0c3-791d53d8ae36',
          organization_id: '4eae08f8-9b40-4094-a11c-f9ee2dc76a12',
          constraint_id: '40c24616-6016-454e-be6f-ca4c165f8ceb',
          constraint_limit: 0.0,
          value: 1.0,
          created_at: 1769696702,
          run_result: {
            value: 1,
          },
        },
      ],
    },
    {
      deleted_at: 0,
      id: '62f013ef-748e-4d06-860b-3f530b5c685f',
      created_at: 1769696578,
      name: 'Prohibited Tag Policy 1769696563199',
      organization_id: '4eae08f8-9b40-4094-a11c-f9ee2dc76a12',
      type: 'tagging_policy',
      definition: {
        start_date: 1769644800,
        conditions: {
          tag: '__department',
        },
      },
      filters: {
        active: [true],
      },
      last_run: 1769696702,
      last_run_result: {
        value: 2,
      },
      limit_hits: [
        {
          deleted_at: 0,
          id: '77a91b69-d183-4f46-9b5e-d1173e0fe031',
          organization_id: '4eae08f8-9b40-4094-a11c-f9ee2dc76a12',
          constraint_id: '62f013ef-748e-4d06-860b-3f530b5c685f',
          constraint_limit: 0.0,
          value: 2.0,
          created_at: 1769696702,
          run_result: {
            value: 2,
          },
        },
      ],
    },
    {
      "deleted_at": 0,
      "id": "e26bca14-4a38-49dc-a9cc-0798406cc6e4",
      "created_at": 1769697639,
      "name": "Non-violating Correlated Tag Policy",
      "organization_id": "4eae08f8-9b40-4094-a11c-f9ee2dc76a12",
      "type": "tagging_policy",
      "definition": {
        "start_date": 1769697608,
        "conditions": {
          "tag": "CostCenter",
          "without_tag": "Environment"
        }
      },
      "filters": {
        "cloud_account": [
          {
            "id": "ec8b9ca5-6d16-465e-8831-472a6bcd5fcf",
            "name": "Marketplace (Dev)",
            "type": "aws_cnr"
          }
        ]
      },
      "last_run": 1769697902,
      "last_run_result": {
        "value": 0
      },
      "limit_hits": []
    }
  ],
};
