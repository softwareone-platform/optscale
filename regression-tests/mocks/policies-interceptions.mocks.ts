import type { InterceptionEntry } from '../types/interceptor.types';
import { AnomaliesConstraintsMock, PolicyMock, TaggingPolicyMock } from './policies.mocks';

export const anomaliesInterceptions: InterceptionEntry[] = [
  {
    url: `v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_count_anomaly&type=expense_anomaly`,
    mock: AnomaliesConstraintsMock,
  },
];

export const policiesInterceptions: InterceptionEntry[] = [
  {
    url: `/v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_quota&type=recurring_budget&type=expiring_budget`,
    mock: PolicyMock,
  },
];

export const taggingPoliciesInterceptions: InterceptionEntry[] = [
  {
    url: `/v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=tagging_policy`,
    mock: TaggingPolicyMock,
  },
];
