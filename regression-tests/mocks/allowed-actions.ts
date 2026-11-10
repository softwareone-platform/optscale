const POOL_ACTIONS = [
  'CREATE_PARTNER',
  'ASSIGN_USER',
  'DELETE_PARTNER',
  'ACK_EVENT',
  'MANAGE_PERMISSIONS',
  'INFO_ORGANIZATION',
  'POLL_EVENT',
  'LIST_USERS',
  'EDIT_PARTNER',
  'MANAGE_CLOUD_CREDENTIALS',
  'MANAGE_RESOURCES',
  'ASSIGN_SELF',
  'INFO_PARTNER',
  'MANAGE_CHECKLISTS',
  'MANAGE_OWN_RESOURCES',
  'MANAGE_POOLS',
  'MANAGE_INVITES',
  'BOOK_ENVIRONMENTS',
];

/**
 * The test account is an org manager, so every pool grants the same full permission set — only
 * the ids differ. Key order follows `poolIds`, which is what the serialised response preserves.
 */
export const makeAllowedActions = (poolIds: string[]): Record<string, string[]> =>
  Object.fromEntries(poolIds.map(id => [id, POOL_ACTIONS]));
