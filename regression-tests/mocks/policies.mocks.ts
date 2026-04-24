import type { InterceptionEntry } from '@/types';
import { E2E_PAC, E2E_PQ, E2E_PTP } from './e2e-markers';

// ─── Mock payloads ──────────────────────────────────────────────────────────
const PolicyQuotaMock = {
  organization_constraints: [
    {
      deleted_at: 0,
      id: '6a139798-4d7a-43ed-9a80-a10eaaf10d0b',
      created_at: 1695192326,
      name: ` eu-west-2${E2E_PQ}`,
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
      name: `Instances tagging policy${E2E_PTP}`,
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
      name: `Expenses${E2E_PAC}`,
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

const FilterResponseMock = {
  "filter_values": {
    "cloud_account": [
      {
        "id": "5cf0c694-f4f7-4b28-9b79-0fd35c2e1e8a",
        "name": "AWS HQ",
        "type": "aws_cnr",
        "account_id": "b22c6f3c-949d-4e18-8d3b-9443a18d6113"
      },
      {
        "id": "c9b64252-6307-427f-8504-958af91741db",
        "name": "Environment",
        "type": "environment",
        "account_id": "34ef0382-e932-4ebf-8d7d-9856a16a0491"
      },
      {
        "id": "fb108942-28dc-4629-8d8b-29d532ff1501",
        "name": "Ali dev",
        "type": "alibaba_cnr",
        "account_id": "3d5f5092-2c28-43fa-a89e-ed973134a2ef"
      },
      {
        "id": "15606797-a0d4-4003-8647-48115160f55e",
        "name": "GCP dev",
        "type": "gcp_cnr",
        "account_id": "3c82b12a-8521-4cbd-a44e-72f646ddd553"
      },
      {
        "id": "b356c76b-a6c6-4610-bb06-659059fa7eb7",
        "name": "Azure QA",
        "type": "azure_cnr",
        "account_id": "5fef05af-a58d-487c-a373-c1247d4a1d90"
      },
      {
        "id": "909dc250-b317-4473-aa9f-411c3698c346",
        "name": "AWS Marketing",
        "type": "aws_cnr",
        "account_id": "210624c6-6a81-4ec1-9f04-8c65dd017d3b"
      },
      null,
      {
        "id": "c66d0d3b-93eb-4ce6-bda0-753c28041131",
        "name": "Dev environment",
        "type": "azure_cnr",
        "account_id": "0db8f81a-7378-43a3-ade7-5023b0788b64"
      },
      {
        "id": "e9f47991-8daf-4250-82b3-5ab0a1234aff",
        "name": "Azure Marketing",
        "type": "azure_cnr",
        "account_id": "3249702e-dc40-40fa-8cc3-938bf732b5f2"
      },
      {
        "id": "57ca70e5-b9d1-4a56-aac8-df7d063e2ab8",
        "name": "K8s dev",
        "type": "kubernetes_cnr",
        "account_id": "7e0bda6b-4595-4cff-8cbd-58a10f483f5b"
      }
    ],
    "owner": [
      {
        "id": "9c23a52a-8b2e-495d-b3f9-199476757db0",
        "name": "Demo User"
      },
      {
        "id": "e2365df8-423c-4aca-ac62-c45be5100802",
        "name": "Leeroy Johnson"
      },
      {
        "id": "8fcb9f07-b41e-4666-8ace-4f5f4e55ece9",
        "name": "Alexander Edwards"
      },
      {
        "id": "87ab1faf-1b19-4c24-b571-8b5cb5f44c39",
        "name": "Addison Gagnon"
      },
      {
        "id": "f04d94ee-35d1-4958-bb1b-300a6547e64a",
        "name": "Stephen Swan"
      },
      {
        "id": "f46ba5a0-2d18-415b-ae82-6bdd8e9c9bb9",
        "name": "Lena Rodriguez"
      },
      {
        "id": "f1326947-d01e-4433-a89e-b60ac38e3911",
        "name": "Edwin Wilson"
      },
      {
        "id": "078b5ca6-f7ed-4cc7-bbbb-d1f7b73b5f23",
        "name": "Amelia Allen"
      },
      {
        "id": "71a10acc-7c22-43ca-abfe-0fb82472e6a5",
        "name": "Alyssa Morton"
      },
      {
        "id": "ef32d707-4a06-4b0b-866a-e6355fc17b8c",
        "name": "Hope Black"
      },
      {
        "id": "d5f4a1bb-b903-4819-918e-20a4fe5524a8",
        "name": "Luke Walsh"
      },
      {
        "id": "e4065f94-5ac5-4bd4-9ed3-787d9d3b714a",
        "name": "Olivia Brown"
      },
      {
        "id": "6515437f-dd5c-4ca4-ba46-c9f007b7b990",
        "name": "Poppy Roberts"
      },
      {
        "id": "1ea597a7-5dc9-42e9-b06f-a4da94893e91",
        "name": "Jessica Hamilton"
      },
      {
        "id": "ea1686c4-29ec-491e-9bd9-55f17497b63a",
        "name": "Homer Fisher"
      },
      {
        "id": "f078dcf9-712d-44b4-a899-e2a3f8fb6126",
        "name": "Lincoln White"
      },
      {
        "id": "9c18dbd3-7ad8-4955-9df0-4467495ba251",
        "name": "Andy Smith"
      },
      {
        "id": "8f154424-27b5-4ba1-ba64-48971330b3ea",
        "name": "William Jenkins"
      },
      {
        "id": "28309568-f996-44b3-8b55-08e7b7343ef9",
        "name": "Winston Lee"
      },
      {
        "id": "c632ed34-7858-42fc-ab78-5d41b5bbc882",
        "name": "Jack Jones"
      },
      {
        "id": "b070b75a-f7ae-4c74-9283-bd47e554495b",
        "name": "Isabella Carter"
      }
    ],
    "pool": [
      {
        "id": "51bbe881-75df-42af-93f2-cafe3161bcdf",
        "name": "AWS HQ",
        "purpose": "budget"
      },
      {
        "id": "a8ae21fa-c174-46db-8c40-ee35ae38d88b",
        "name": "Environment",
        "purpose": "budget"
      },
      {
        "id": "2808d268-8fad-40e5-8fba-596465bf3b2f",
        "name": "Ali dev",
        "purpose": "budget"
      },
      {
        "id": "1bd1849c-b656-448a-beff-51516c5607f6",
        "name": "QA",
        "purpose": "team"
      },
      {
        "id": "1ea9ee5a-12bb-4925-b9d1-7022417d97bb",
        "name": "GCP dev",
        "purpose": "budget"
      },
      {
        "id": "0312f258-a172-429d-834e-04ce28eb0ead",
        "name": "Azure QA",
        "purpose": "budget"
      },
      {
        "id": "bfc011b0-0a22-4efe-b2b8-9096c5fa6975",
        "name": "Clicks research",
        "purpose": "mlai"
      },
      {
        "id": "d9d9b851-56a5-4c69-84e8-e1ada32f750e",
        "name": "AWS Marketing",
        "purpose": "budget"
      },
      {
        "id": "8573a8ba-5774-45f7-ab4a-0fe7267eae32",
        "name": "Sunflower Inc",
        "purpose": "business_unit"
      },
      {
        "id": "db009e0a-d115-4473-8bb5-79cd0fed6d85",
        "name": "Dev environment",
        "purpose": "budget"
      },
      {
        "id": "73214fc4-d6bd-46a0-9869-e3f79cb368e5",
        "name": "Dev",
        "purpose": "team"
      },
      {
        "id": "217576eb-ab47-4454-8c03-240afb7e996f",
        "name": "diworker",
        "purpose": "mlai"
      },
      {
        "id": "291e4b7f-62bc-4688-a195-812de6491926",
        "name": "Daily checks",
        "purpose": "cicd"
      },
      {
        "id": "32abd9a2-ca0d-4044-8e1e-243a9cb7bf3f",
        "name": "Monitoring",
        "purpose": "project"
      },
      {
        "id": "5cb2a895-c94a-4f9b-abb1-45dc216a650b",
        "name": "Marketing",
        "purpose": "business_unit"
      },
      {
        "id": "65b2a8d9-3cdc-4933-bc08-db062753b11e",
        "name": "Crawler",
        "purpose": "cicd"
      },
      {
        "id": "8e7ca2da-32d5-4a32-8283-874214090b52",
        "name": "Release 3.5",
        "purpose": "project"
      },
      {
        "id": "afe7eb61-52a3-42b9-98c3-84197b3b1632",
        "name": "Engineering",
        "purpose": "business_unit"
      },
      {
        "id": "dd3aa9f3-c100-44cd-ab1a-a238b5845d17",
        "name": "K8s dev",
        "purpose": "budget"
      },
      {
        "id": "e927cd12-f46b-4682-86a4-cceb1cdfb8d2",
        "name": "discovery",
        "purpose": "cicd"
      },
      {
        "id": "e997d376-22ba-432b-b9e4-91ccd9692e31",
        "name": "Databricks",
        "purpose": "budget"
      },
      {
        "id": "fa8bcd36-0b9f-420d-94fd-74715056f0d0",
        "name": "Azure Marketing",
        "purpose": "budget"
      }
    ],
    "service_name": [
      {
        "name": "AmazonEC2",
        "cloud_type": "aws_cnr"
      },
      null,
      {
        "name": "Elastic Compute Service",
        "cloud_type": "alibaba_cnr"
      },
      {
        "name": "Compute Engine",
        "cloud_type": "gcp_cnr"
      },
      {
        "name": "AmazonVPC",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "microsoft.network",
        "cloud_type": "azure_cnr"
      },
      {
        "name": "AmazonQuickSight",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "AWSCloudTrail",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "AWSELB",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "awskms",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "AmazonKinesis",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "AmazonCloudWatch",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "AmazonS3",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "Cloud Storage",
        "cloud_type": "gcp_cnr"
      },
      {
        "name": "microsoft.storage",
        "cloud_type": "azure_cnr"
      },
      {
        "name": "microsoft.compute",
        "cloud_type": "azure_cnr"
      },
      {
        "name": "BigQuery",
        "cloud_type": "gcp_cnr"
      },
      {
        "name": "Elastic Block Storage",
        "cloud_type": "alibaba_cnr"
      },
      {
        "name": "Elastic IP Address",
        "cloud_type": "alibaba_cnr"
      },
      {
        "name": "AmazonRedshift",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "Translate",
        "cloud_type": "gcp_cnr"
      }
    ],
    "region": [
      {
        "name": "us-west-1",
        "cloud_type": "aws_cnr"
      },
      null,
      {
        "name": "Germany (Frankfurt)",
        "cloud_type": "alibaba_cnr"
      },
      {
        "name": "Indonesia (Jakarta)",
        "cloud_type": "alibaba_cnr"
      },
      {
        "name": "eu-north-1",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "SAU (Riyadh)",
        "cloud_type": "alibaba_cnr"
      },
      {
        "name": "us-central1",
        "cloud_type": "gcp_cnr"
      },
      {
        "name": "us-east-1",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "UAE (Dubai)",
        "cloud_type": "alibaba_cnr"
      },
      {
        "name": "Germany West Central",
        "cloud_type": "azure_cnr"
      },
      {
        "name": "US (Silicon Valley)",
        "cloud_type": "alibaba_cnr"
      },
      {
        "name": "us-west-2",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "global",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "ap-southeast-3",
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
        "name": "ap-south-1",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "eu-south-1",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "ap-southeast-1",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "ap-northeast-2",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "europe",
        "cloud_type": "gcp_cnr"
      },
      {
        "name": "us-west1",
        "cloud_type": "gcp_cnr"
      },
      {
        "name": "southamerica-east1",
        "cloud_type": "gcp_cnr"
      },
      {
        "name": "europe-west3",
        "cloud_type": "gcp_cnr"
      },
      {
        "name": "me-central-1",
        "cloud_type": "aws_cnr"
      },
      {
        "name": "West Europe",
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
        "name": "East US",
        "cloud_type": "azure_cnr"
      },
      {
        "name": "West US",
        "cloud_type": "azure_cnr"
      },
      {
        "name": "West US 2",
        "cloud_type": "azure_cnr"
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
        "name": "europe-west1",
        "cloud_type": "gcp_cnr"
      },
      {
        "name": "China (Hohhot)",
        "cloud_type": "alibaba_cnr"
      },
      {
        "name": "Philippines (Manila)",
        "cloud_type": "alibaba_cnr"
      },
      {
        "name": "China (Hong Kong)",
        "cloud_type": "alibaba_cnr"
      },
      {
        "name": "China (Qingdao)",
        "cloud_type": "alibaba_cnr"
      },
      {
        "name": "us-east1",
        "cloud_type": "gcp_cnr"
      }
    ],
    "k8s_node": [
      null
    ],
    "k8s_service": [
      null
    ],
    "k8s_namespace": [
      null
    ],
    "resource_type": [
      {
        "name": "Snapshot",
        "type": "regular"
      },
      {
        "name": "Dev stand",
        "type": "environment"
      },
      {
        "name": "QA stand",
        "type": "environment"
      },
      {
        "name": "Instance",
        "type": "regular"
      },
      {
        "name": "Volume",
        "type": "regular"
      },
      {
        "name": "Snapshot Chain",
        "type": "regular"
      },
      {
        "name": "IP Address",
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
        "name": "Kinesis Streams",
        "type": "regular"
      },
      {
        "name": "Management Tools - AWS CloudTrail Free Events Recorded",
        "type": "regular"
      },
      {
        "name": "Metric",
        "type": "regular"
      },
      {
        "name": "Management Tools - AWS CloudTrail Insights Events",
        "type": "regular"
      },
      {
        "name": "StorageLens",
        "type": "regular"
      },
      {
        "name": "Load Balancer",
        "type": "regular"
      },
      {
        "name": "Encryption Key",
        "type": "regular"
      },
      {
        "name": "Bucket",
        "type": "regular"
      },
      {
        "name": "API Request",
        "type": "regular"
      },
      {
        "name": "CF Stack",
        "type": "cluster"
      },
      {
        "name": "Image",
        "type": "regular"
      },
      {
        "name": "Savings Plan",
        "type": "regular"
      },
      {
        "name": "Reserved Instances",
        "type": "regular"
      },
      {
        "name": "Redshift Managed Storage",
        "type": "regular"
      },
      {
        "name": "Translate",
        "type": "regular"
      },
      {
        "name": "Data Transfer",
        "type": "regular"
      }
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
    "meta": [
      "block_device_mappings",
      "offering_type",
      "category",
      "vpc_name",
      "is_public_policy",
      "vpc_id",
      "applied_region",
      "architecture",
      "cloud_console_link",
      "attached",
      "snapshot_id",
      "end",
      "stopped_allocated",
      "disk_size",
      "os",
      "description",
      "size",
      "spotted",
      "last_attached",
      "flavor",
      "platform",
      "last_seen_not_stopped",
      "purchase_term",
      "snapshots",
      "state",
      "cpu_count",
      "instance_id",
      "image_id",
      "payment_option",
      "last_used",
      "available",
      "is_public_acls",
      "volume_type",
      "start",
      "instance_type",
      "zone_id",
      "ram",
      "security_groups",
      "preinstalled",
      "volume_id"
    ],
    "tag": [
      "ms-resource-usage",
      "orchid_rule_testing",
      "sunflower_backup_id",
      "sunflower_type",
      "aws:cloudformation:stack-name",
      "ml_value",
      "orchid_tracking_id",
      "sunflower_drive_id",
      "Seed",
      "kubernetes.io/cluster/egelbero-cluster",
      "purpose",
      "mytag1",
      "nk-tag",
      "sunflower_resource_id",
      "aws:createdBy",
      "goog-ops-agent-policy",
      "owner",
      "aws:cloudformation:stack-id",
      "aws:cloudformation:logical-id",
      "kubernetes.io/service-name",
      "test",
      "aqa",
      "marketing",
      "sunflower_device_id",
      "orchid_resource_id",
      "created_by",
      "sunflower_device_name"
    ],
    "without_tag": [
      "ms-resource-usage",
      "orchid_rule_testing",
      "sunflower_backup_id",
      "sunflower_type",
      "aws:cloudformation:stack-name",
      "ml_value",
      "orchid_tracking_id",
      "sunflower_drive_id",
      "Seed",
      "kubernetes.io/cluster/egelbero-cluster",
      "purpose",
      "mytag1",
      "nk-tag",
      "sunflower_resource_id",
      "aws:createdBy",
      "goog-ops-agent-policy",
      "owner",
      "aws:cloudformation:stack-id",
      "aws:cloudformation:logical-id",
      "kubernetes.io/service-name",
      "test",
      "aqa",
      "marketing",
      "sunflower_device_id",
      "orchid_resource_id",
      "created_by",
      "sunflower_device_name"
    ]
  }
}

// ─── Interceptions ──────────────────────────────────────────────────────────
export const anomaliesInterceptions: InterceptionEntry[] = [
  {
    url: `v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_count_anomaly&type=expense_anomaly`,
    mock: AnomaliesConstraintsMock,
  },
  {
    url: `v2/organizations/[^/]+/available_filters`,
    mock: FilterResponseMock,
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
