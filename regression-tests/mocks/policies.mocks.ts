import type { InterceptionEntry } from '../utils/interceptor';

const PolicyQuotaMock = {
  organization_constraints: [
    {
      deleted_at: 0,
      id: '6a139798-4d7a-43ed-9a80-a10eaaf10d0b',
      created_at: 1695192326,
      name: ' eu-west-2[E2E_PQ]',
      organization_id: '6765b96c-3fda-4073-ade4-aaa840e45f97',
      type: 'resource_quota',
      definition: {
        max_value: 10,
      },
      filters: {
        region: [
          {
            name: 'eu-west-2',
            cloud_type: 'aws_cnr',
          },
        ],
        resource_type: [
          {
            name: 'Bucket',
            type: 'regular',
          },
        ],
      },
      last_run: 1741089618,
      last_run_result: {
        limit: 10,
        current: 0,
      },
      limit_hits: [],
    },
    {
      deleted_at: 0,
      id: '76ecf507-b745-4aa1-acb6-b5f496a2a424',
      created_at: 1695192389,
      name: 'Buckets count in us-east-1',
      organization_id: '6765b96c-3fda-4073-ade4-aaa840e45f97',
      type: 'resource_quota',
      definition: {
        max_value: 3,
      },
      filters: {
        region: [
          {
            name: 'us-east-1',
            cloud_type: 'aws_cnr',
          },
        ],
        resource_type: [
          {
            name: 'Bucket',
            type: 'regular',
          },
        ],
      },
      last_run: 1741089618,
      last_run_result: {
        limit: 3,
        current: 12,
      },
      limit_hits: [
        {
          deleted_at: 0,
          id: '41ad44b7-7fc9-4703-a0ae-4c2a8620fc20',
          organization_id: '6765b96c-3fda-4073-ade4-aaa840e45f97',
          constraint_id: '76ecf507-b745-4aa1-acb6-b5f496a2a424',
          constraint_limit: 3.0,
          value: 14.0,
          created_at: 1740877216,
          run_result: {
            limit: 3,
            current: 14,
          },
        },
        {
          deleted_at: 0,
          id: '80512699-66c2-46eb-aef8-505f2b7fda46',
          organization_id: '6765b96c-3fda-4073-ade4-aaa840e45f97',
          constraint_id: '76ecf507-b745-4aa1-acb6-b5f496a2a424',
          constraint_limit: 3.0,
          value: 14.0,
          created_at: 1740967217,
          run_result: {
            limit: 3,
            current: 14,
          },
        },
        {
          deleted_at: 0,
          id: '60b21b7a-4aca-4b2b-960a-46baccc36ee0',
          organization_id: '6765b96c-3fda-4073-ade4-aaa840e45f97',
          constraint_id: '76ecf507-b745-4aa1-acb6-b5f496a2a424',
          constraint_limit: 3.0,
          value: 12.0,
          created_at: 1741048808,
          run_result: {
            limit: 3,
            current: 12,
          },
        },
      ],
    },
    {
      deleted_at: 0,
      id: '95788b08-5ad3-4aa2-8a26-2f442740a75c',
      created_at: 1695192570,
      name: 'Monthly S3 expenses quota',
      organization_id: '6765b96c-3fda-4073-ade4-aaa840e45f97',
      type: 'recurring_budget',
      definition: {
        monthly_budget: 200,
      },
      filters: {
        service_name: [
          {
            name: 'AmazonS3',
            cloud_type: 'aws_cnr',
          },
        ],
      },
      last_run: 1741090812,
      last_run_result: {
        limit: 100,
        current: 193.4109080453,
      },
      limit_hits: [],
    },
    {
      deleted_at: 0,
      id: 'c81cc8f0-0305-4e18-b998-a0e6664edd0c',
      created_at: 1695193447,
      name: 'Environments total budget',
      organization_id: '6765b96c-3fda-4073-ade4-aaa840e45f97',
      type: 'expiring_budget',
      definition: {
        total_budget: 100,
        start_date: 1686960000,
      },
      filters: {
        pool: [
          {
            id: '9c5d67be-9991-4857-ace1-432ad813dfcc',
            name: 'Environment',
            purpose: 'budget',
          },
        ],
      },
      last_run: 1741090812,
      last_run_result: {
        limit: 50,
        current: 554.6004734020767,
      },
      limit_hits: [],
    },
  ],
};
const TaggingPolicyMock = {
  organization_constraints: [
    {
      deleted_at: 0,
      id: '0df3fc33-e58c-4d1d-b79a-dfc51c42ba11',
      created_at: 1711279995,
      name: 'Instances tagging policy[E2E_TP]',
      organization_id: '77fe9add-bafc-4199-980a-da275af7c2c7',
      type: 'tagging_policy',
      definition: {
        conditions: {
          tag: '00000000-0000-0000-0000-000000000000',
        },
        start_date: 1711279984,
      },
      filters: {
        resource_type: [
          {
            name: 'Instance',
            type: 'regular',
          },
        ],
      },
      last_run: 1740484818,
      last_run_result: {
        value: 6,
      },
      limit_hits: [],
    },
    {
      deleted_at: 0,
      id: '16608eb9-d767-4e34-8f6e-42bde710ecbb',
      created_at: 1694588398,
      name: 'QA resources tagging policy',
      organization_id: '77fe9add-bafc-4199-980a-da275af7c2c7',
      type: 'tagging_policy',
      definition: {
        conditions: {
          tag: 'aqa_uuid',
          without_tag: 'aqa',
        },
        start_date: 1686340800,
      },
      filters: {
        active: [true],
        cloud_account: [
          {
            id: 'd2af0153-66c2-4fc5-b9c2-50bc42fc11f5',
            name: 'Azure QA',
            type: 'azure_cnr',
          },
        ],
      },
      last_run: 1740484818,
      last_run_result: {
        value: 22,
      },
      limit_hits: [],
    },
    {
      deleted_at: 0,
      id: '1f4b5f07-abcf-428a-af5a-5ced44c6e044',
      created_at: 1711971880,
      name: 'Resources tagging policy',
      organization_id: '77fe9add-bafc-4199-980a-da275af7c2c7',
      type: 'tagging_policy',
      definition: {
        conditions: {
          tag: '00000000-0000-0000-0000-000000000000',
        },
        start_date: 1711971855,
      },
      filters: {},
      last_run: 1740484818,
      last_run_result: {
        value: 418,
      },
      limit_hits: [],
    },
    {
      deleted_at: 0,
      id: '683ae2e9-25c6-469b-968b-5c03c91040fa',
      created_at: 1711280080,
      name: 'Prohibited tag tagging policy',
      organization_id: '77fe9add-bafc-4199-980a-da275af7c2c7',
      type: 'tagging_policy',
      definition: {
        conditions: {
          tag: 'test',
        },
        start_date: 1711280060,
      },
      filters: {},
      last_run: 1740484818,
      last_run_result: {
        value: 16,
      },
      limit_hits: [],
    },
    {
      deleted_at: 0,
      id: 'ff5f28ca-8f39-4425-86da-f0fd4482f09c',
      created_at: 1711280023,
      name: 'Required tag tagging policy',
      organization_id: '77fe9add-bafc-4199-980a-da275af7c2c7',
      type: 'tagging_policy',
      definition: {
        conditions: {
          without_tag: 'TAG',
        },
        start_date: 1711280009,
      },
      filters: {
        resource_type: [
          {
            name: 'Instance',
            type: 'regular',
          },
        ],
      },
      last_run: 1740484818,
      last_run_result: {
        value: 54,
      },
      limit_hits: [],
    },
  ],
};
const AnomaliesConstraintsMock = {
  organization_constraints: [
    {
      deleted_at: 0,
      id: '274c55fc-07b1-45fa-8721-26bc1f91b8f9',
      created_at: 1694587419,
      name: 'Expenses[E2E_AC]',
      organization_id: '77fe9add-bafc-4199-980a-da275af7c2c7',
      type: 'expense_anomaly',
      definition: {
        threshold_days: 30,
        threshold: 10,
      },
      filters: {
        pool: [
          {
            id: '628ca9cf-d1d5-48c3-bee2-03e214f360e7+',
            name: 'Marketing',
            purpose: 'business_unit',
          },
        ],
      },
      last_run: 1740486012,
      last_run_result: {
        average: 0.31840872446,
        today: 0,
        breakdown: {
          '1738972800': 0.1318722551,
          '1738195200': 0.2699037197,
          '1739059200': 0.1320326741,
          '1739145600': 0.2430877175,
          '1739491200': 0.1320020549,
          '1738627200': 0.1277022359,
          '1740355200': 0.0001069893,
          '1738368000': 0.12769207,
          '1739836800': 1.4569033097,
          '1739404800': 0.1323023924,
          '1739318400': 0.1400261811,
          '1737849600': 0.1277073005,
          '1738886400': 0.12777276669999998,
          '1737936000': 0.1279100669,
          '1740182400': 0.1319849082,
          '1738022400': 0.21336695490000002,
          '1738108800': 0.1276568143,
          '1738454400': 0.1375117857,
          '1739232000': 0.20971212220000002,
          '1739750400': 1.4569744751,
          '1738713600': 0.127664149,
          '1738281600': 0.1276898533,
          '1740009600': 0.4632069317,
          '1739664000': 1.23596694,
          '1740268800': 0.0662821046,
          '1738540800': 0.1287879659,
          '1738800000': 0.1276943191,
          '1740096000': 0.1321378802,
          '1739577600': 0.1318678662,
          '1739923200': 1.4567349296,
        },
      },
      limit_hits: [],
    },
    {
      deleted_at: 0,
      id: 'f2f8e945-881e-4bdd-b67b-421657eca414',
      created_at: 1694587395,
      name: 'Instance count',
      organization_id: '77fe9add-bafc-4199-980a-da275af7c2c7',
      type: 'resource_count_anomaly',
      definition: {
        threshold_days: 7,
        threshold: 20,
      },
      filters: {
        resource_type: [
          {
            name: 'Instance',
            type: 'regular',
          },
        ],
      },
      last_run: 1740472808,
      last_run_result: {
        average: 58.42857142857143,
        today: 53,
        breakdown: {
          '1739836800': 65,
          '1739923200': 72,
          '1740009600': 60,
          '1740096000': 55,
          '1740182400': 51,
          '1740268800': 52,
          '1740355200': 54,
        },
      },
      limit_hits: [],
    },
  ],
};

export const anomaliesInterceptions: InterceptionEntry[] = [
  {
    url: `v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_count_anomaly&type=expense_anomaly`,
    mock: AnomaliesConstraintsMock,
  },
];

export const policiesInterceptions: InterceptionEntry[] = [
  {
    url: `/v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_quota&type=recurring_budget&type=expiring_budget`,
    mock: PolicyQuotaMock,
  },
];

export const taggingPoliciesInterceptions: InterceptionEntry[] = [
  {
    url: `/v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=tagging_policy`,
    mock: TaggingPolicyMock,
  },
];
