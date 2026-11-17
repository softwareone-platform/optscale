/**
 * Ids that appear in more than one mock file. Everything else stays a literal beside the fixture
 * that owns it.
 *
 * These payloads were captured from five different live organizations, so there is no single "the
 * org" id — the sets below never mix. Picking the wrong one is not a test failure: the UI looks a
 * resource up, finds nothing, and renders an empty page that screenshots cleanly. Note how close
 * `ORGANIZATION_ID_CLOUD_ACCOUNTS` and `ORGANIZATION_ID_SETTINGS` are to each other.
 */

export const ORGANIZATION_ID = '77fe9add-bafc-4199-980a-da275af7c2c7';
export const ORGANIZATION_ID_HOMEPAGE = 'df58ec86-8e73-4f9b-95e7-67cb6b9db52f';
export const ORGANIZATION_ID_EVENTS = '6765b96c-3fda-4073-ade4-aaa840e45f97';
export const ORGANIZATION_ID_SETTINGS = '3d0fe384-b1cf-4929-ad5e-1aa544f93dd5';
export const ORGANIZATION_ID_CLOUD_ACCOUNTS = '1d0fe384-b1cf-4929-ad5e-1aa544f93dd5';

export const DEMO_USER_EMPLOYEE_ID = 'c71e247c-bdef-47a1-8f74-29d9786fbb9d';
export const SETTINGS_EMPLOYEE_ID = '73b8772c-7a66-4261-96e6-8e4b494dd25b';

export const AWS_HQ_CLOUD_ACCOUNT_ID = '42e6a779-6b1f-4469-b221-412f7aa15466';
export const AWS_MARKETING_CLOUD_ACCOUNT_ID = '402fc0bc-da7c-4eb1-b194-1c409471d0e5';
export const AZURE_CLOUD_ACCOUNT_ID = '1812ae7a-890f-413a-a4e3-9a76c357cfb2';
