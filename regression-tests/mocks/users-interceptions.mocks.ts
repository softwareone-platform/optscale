import type { InterceptionEntry } from '../types/interceptor.types';
import { EmployeesMock, UsersPoolsPermissionsMock } from './user.mocks';

export const usersInterceptions: InterceptionEntry[] = [
  { url: `/v2/organizations/[^/]+/employees`, mock: EmployeesMock },
  { url: `/v2/organizations/[^/]+/pools\\?permission=INFO_ORGANIZATION`, mock: UsersPoolsPermissionsMock },
];
