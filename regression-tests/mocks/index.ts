/**
 * Barrel re-export for every mock module. Specs can import any interception
 * array (or individual mock payload) from `../mocks` without knowing which
 * file it lives in:
 *
 *   import { homepageInterceptions, settingsInterceptions } from '../mocks';
 */
export * from './cloud-accounts.mocks';
export * from './events.mocks';
export * from './expenses.mocks';
export * from './homepage.mocks';
export * from './policies.mocks';
export * from './pools.mocks';
export * from './recommendations.mocks';
export * from './resources.mocks';
export * from './settings.mocks';
export * from './users.mocks';
