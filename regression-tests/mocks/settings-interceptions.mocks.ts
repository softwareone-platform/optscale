import type { InterceptionEntry } from '../types/interceptor.types';
import { SettingsOrganizationMock, SettingsEmailNotificationsMock } from './settings.mock';

export const settingsInterceptions: InterceptionEntry[] = [
  { gql: 'Organizations', mock: SettingsOrganizationMock },
  { gql: 'EmployeeEmails', mock: SettingsEmailNotificationsMock },
];
