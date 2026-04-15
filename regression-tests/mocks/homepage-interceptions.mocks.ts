import type { InterceptionEntry } from '../types/interceptor.types';
import {
  HomeDataSourcesMock,
  OrganizationCleanExpansesMock,
  OrganizationExpensesPoolsMock,
  OptimizationsMock,
  AllowedActionsMock,
  PoolsMock,
  OrganizationConstraintsMock,
} from './homepage.mocks';

export const homepageInterceptions: InterceptionEntry[] = [
  { gql: 'DataSources', mock: HomeDataSourcesMock },
  { gql: 'CleanExpenses', mock: OrganizationCleanExpansesMock },
  { url: `/v2/organizations/[^/]+/pool_expenses`, mock: OrganizationExpensesPoolsMock },
  { url: `/v2/organizations/[^/]+/optimizations`, mock: OptimizationsMock },
  { url: `/v2/allowed_actions`, mock: AllowedActionsMock },
  { url: `/v2/pools/[^/]+?children=true&details=true`, mock: PoolsMock },
  {
    url: `/v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_count_anomaly&type=expense_anomaly&type=resource_quota&type=recurring_budget&type=expiring_budget&type=tagging_policy`,
    mock: OrganizationConstraintsMock,
  },
];
