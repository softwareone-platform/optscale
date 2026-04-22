/**
 * Global E2E mock markers.
 *
 * Each marker is a short string embedded in mock payload values that end up
 * rendered in the UI. Because the marker survives into baseline screenshots,
 * anyone reviewing a diff can see at a glance that the data on screen came
 * from the test harness rather than a live API.
 *
 * Usage inside a mock file:
 *
 *     import { E2E_EV } from './e2e-markers';
 *
 *     const EventsRegressionMock = {
 *       data: { events: [{ object_name: `${E2E_EV} Sunflower Inc`, … }] },
 *     };
 *
 * Convention — `[E2E_<F><C>]`:
 *   F — first letter of the mock filename (C = cloud-accounts, H = homepage, …)
 *   C — 1–3 uppercase initials of the mock constant's meaningful name
 *
 * Renaming a marker's string literal invalidates every baseline PNG that
 * renders it — regenerate with `npm run test:docker:update` in the same
 * commit.
 */

export const E2E_CDS = '[E2E_CDS]'; // cloud-accounts.mocks.ts → DataSourcesMock
export const E2E_EV = '[E2E_EV]'; // events.mocks.ts → EventsRegressionMock
export const E2E_EPE = '[E2E_EPE]'; // expenses.mocks.ts → PoolsExpensesMock
export const E2E_ES = '[E2E_ES]'; // expenses.mocks.ts → PoolsExpensesSourceMock
export const E2E_EP = '[E2E_EP]'; // expenses.mocks.ts → PoolsExpensesPoolMock
export const E2E_EO = '[E2E_EO]'; // expenses.mocks.ts → PoolsExpensesOwnerMock
export const E2E_ERG = '[E2E_ERG]'; // expenses.mocks.ts → RegionExpensesMock
export const E2E_HOCE = '[E2E_HOCE]'; // homepage.mocks.ts → OrganizationCleanExpansesMock
export const E2E_HOC = '[E2E_HOC]'; // homepage.mocks.ts → OrganizationConstraintsMock
export const E2E_HP = '[E2E_HP]'; // homepage.mocks.ts → PoolsMock
export const E2E_PAC = '[E2E_PAC]'; // policies.mocks.ts → AnomaliesConstraintsMock
export const E2E_PQ = '[E2E_PQ]'; // policies.mocks.ts → PolicyQuotaMock
export const E2E_PTP = '[E2E_PTP]'; // policies.mocks.ts → TaggingPolicyMock
export const E2E_PR = '[E2E_PR]'; // pools.mocks.ts → PoolsMock
export const E2E_PR_Modal = '[E2E_PR_Modal]'; // pools.mocks.ts → PoolsMock (modal variant)
export const E2E_PAS = '[E2E_PAS]'; // pools.mocks.ts → PoolsAssigmentRulesMock
export const E2E_RIB = '[E2E_RIB]'; // recommendations.mocks.ts → RIBreakdownMock
export const E2E_RO = '[E2E_RO]'; // recommendations.mocks.ts → OptimisationsMock
export const E2E_RRD = '[E2E_RRD]'; // resources.mocks.ts → ResourceDetailsMock
export const E2E_RBE = '[E2E_RBE]'; // resources.mocks.ts → BreakdownExpensesMock
export const E2E_RCE = '[E2E_RCE]'; // resources.mocks.ts → CleanExpensesMock
export const E2E_RRE = '[E2E_RRE]'; // resources.mocks.ts → RawExpensesMock
export const E2E_SSO = '[E2E_SSO]'; // settings.mocks.ts → SettingsOrganizationMock
export const E2E_SI = '[E2E_SI]'; // settings.mocks.ts → InvitationsMock
export const E2E_UE = '[E2E_UE]'; // users.mocks.ts → EmployeesMock
