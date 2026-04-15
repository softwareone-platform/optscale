import type { InterceptionEntry } from '../types/interceptor.types';
import {
  SummaryMock,
  BreakdownExpensesMock,
  ResourcesCountMock,
  BreakdownTagsMock,
  ResourceDetailsMock,
  LimitHitsMock,
  AllowedActionsSunflowerEUMock,
  RawExpensesMock,
} from './resources.mocks';

export const resourcesInterceptions: InterceptionEntry[] = [
  { url: `v2/organizations/[^/]+/summary_expenses`, mock: SummaryMock },
  { url: `v2/organizations/[^/]+/breakdown_expenses`, mock: BreakdownExpensesMock },
  { url: `v2/organizations/[^/]+/resources_count`, mock: ResourcesCountMock },
  { url: `v2/organizations/[^/]+/breakdown_tags`, mock: BreakdownTagsMock },
];

export const resourceDetailsInterceptions: InterceptionEntry[] = [
  { url: `v2/organizations/[^/]+/summary_expenses`, mock: SummaryMock },
  { url: `v2/organizations/[^/]+/breakdown_expenses`, mock: BreakdownExpensesMock },
  { url: `v2/cloud_resources/[^/]+?details=true`, mock: ResourceDetailsMock },
  { url: `v2/cloud_resources/[^/]+/limit_hits`, mock: LimitHitsMock },
  { url: `v2/allowed_actions\\?cloud_resource=.+`, mock: AllowedActionsSunflowerEUMock },
  { url: `v2/resources/[^/]+/raw_expenses`, mock: RawExpensesMock },
];
