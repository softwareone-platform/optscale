const MARKER = '[E2E]';

/**
 * Suffixes a user-visible mock value so a reviewer can see at a glance that a screenshot shows
 * synthetic data. Proving an interception actually fired is the runner's job — see `apiInterceptors`.
 *
 * Changing the marker or a label invalidates every screenshot containing it; regenerate them in
 * the same commit with `npm run test:docker:update`.
 */
export const e2e = (label: string) => `${label} ${MARKER}`;
