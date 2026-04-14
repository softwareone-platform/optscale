/**
 * OptScale Tags Helper
 *
 * Provides utilities to categorise Playwright test tags into structured attributes.
 * Drop-in replacement for the ReportPortal-coupled tags helper — no external
 * dependencies, works entirely locally.
 *
 * Tag Categories (based on actual tag usage across the optscale e2e suite):
 * - Priority:    p1, p2  (regex: /^p\d+$/)
 * - Speed:       fast, slow
 * - Module:      expenses, homepage, recommendations, resources, pools,
 *                policies, tagging-policies, cloud-accounts, events,
 *                perspectives, risp-coverage, invitation-flow, anomalies
 * - Test Type:   ui, devops, api
 * - Debug:       debug
 * - Test Case ID: [230778] format extracted from test title or tag
 *
 * Tag Usage Statistics (from codebase analysis – Apr 2026):
 * - @fast:             majority of tests
 * - @slow:             perspective, invitation-flow, and selected resource/pool tests
 * - @p1:               highest-priority smoke tests
 * - @p2:               standard regression tests
 * - @ui:               all browser-based tests
 * - @devops:           devops-specific tests
 * - @api:              API-only tests
 * - @expenses:         Cost Explorer / Expenses page tests
 * - @homepage:         Home / Dashboard page tests
 * - @recommendations:  Recommendations module tests
 * - @resources:        Resources management tests
 * - @pools:            Pool management tests
 * - @policies:         Budget / quota policy tests
 * - @tagging-policies: Tagging policy tests
 * - @cloud-accounts:   Cloud account integration tests
 * - @events:           Events log tests
 * - @perspectives:     Perspectives / saved-view tests
 * - @risp-coverage:    RI/SP coverage report tests
 * - @invitation-flow:  Invitation / onboarding flow tests
 * - @anomalies:        Anomaly detection tests
 */

// ---------------------------------------------------------------------------
// Tag lists
// ---------------------------------------------------------------------------

/** Module tags — functional areas of the optscale application */
export const TAGS_MODULE = [
  'expenses',         // Cost Explorer / Expenses page
  'homepage',         // Home / Dashboard page
  'recommendations',  // Recommendations page
  'resources',        // Resources management
  'pools',            // Pool management
  'policies',         // Budget / quota policies
  'tagging-policies', // Tagging policies
  'cloud-accounts',   // Cloud account integrations
  'events',           // Events log
  'perspectives',     // Perspectives / saved views
  'risp-coverage',    // RI/SP coverage reports
  'invitation-flow',  // Invitation / onboarding flow
  'anomalies',        // Anomaly detection
];

export const TAGS_SPEED: string[] = ['fast', 'slow'];
export const TAGS_TYPE: string[] = ['ui', 'devops', 'api'];
export const TAGS_DEBUG: string[] = ['debug'];

// ---------------------------------------------------------------------------
// Regex helpers
// ---------------------------------------------------------------------------

const priorityRegex = /^p\d+$/;
const testCaseIdRegex = /^\[(\d+)]$/;

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

export interface TagAttributes {
  priority?: string;
  speed?: string;
  module: string[];
  testType?: string;
  debug?: boolean;
  testCaseId?: string;
  other: string[];
}

export interface TagAttribute {
  key: string;
  value: string;
}

// ---------------------------------------------------------------------------
// Core functions
// ---------------------------------------------------------------------------

/**
 * Categorises a single tag (with or without the leading `@`) into its category.
 */
export function categorizeTag(tag: string): { category: string; value: string } {
  const clean = tag.replace(/^@/, '').toLowerCase();

  if (priorityRegex.test(clean))    return { category: 'priority',   value: clean };
  if (TAGS_SPEED.includes(clean))   return { category: 'speed',      value: clean };
  if (TAGS_MODULE.includes(clean))  return { category: 'module',     value: clean };
  if (TAGS_TYPE.includes(clean))    return { category: 'testType',   value: clean };
  if (TAGS_DEBUG.includes(clean))   return { category: 'debug',      value: clean };

  const testCaseMatch = clean.match(testCaseIdRegex);
  if (testCaseMatch)                return { category: 'testCaseId', value: testCaseMatch[1] };

  return { category: 'other', value: clean };
}

/**
 * Extracts and categorises all tags into a structured `TagAttributes` object.
 */
export function extractTagAttributes(tags: string[]): TagAttributes {
  const attributes: TagAttributes = {
    module: [],
    other: [],
  };

  for (const tag of tags) {
    const { category, value } = categorizeTag(tag);

    switch (category) {
      case 'priority':   attributes.priority  = value;             break;
      case 'speed':      attributes.speed     = value;             break;
      case 'module':     attributes.module.push(value);            break;
      case 'testType':   attributes.testType  = value;             break;
      case 'debug':      attributes.debug     = true;              break;
      case 'testCaseId': attributes.testCaseId = value;            break;
      default:           attributes.other.push(value);             break;
    }
  }

  return attributes;
}

/**
 * Converts `TagAttributes` into a flat key/value attribute list
 * suitable for consumption by any reporter or logging utility.
 */
export function convertToAttributes(tagAttrs: TagAttributes): TagAttribute[] {
  const attrs: TagAttribute[] = [];

  if (tagAttrs.priority)   attrs.push({ key: 'priority',   value: tagAttrs.priority });
  if (tagAttrs.speed)      attrs.push({ key: 'speed',      value: tagAttrs.speed });
  if (tagAttrs.testType)   attrs.push({ key: 'testType',   value: tagAttrs.testType });
  if (tagAttrs.testCaseId) attrs.push({ key: 'testCaseId', value: tagAttrs.testCaseId });
  if (tagAttrs.debug)      attrs.push({ key: 'debug',      value: 'true' });

  for (const mod   of tagAttrs.module) attrs.push({ key: 'module', value: mod });
  for (const other of tagAttrs.other)  attrs.push({ key: 'tag',    value: other });

  return attrs;
}

/**
 * Convenience function: takes a raw tags array (and optionally a test title
 * to extract a numeric test-case ID from), and returns the full structured
 * attribute list.
 *
 * @example
 * const attrs = buildTagAttributes(['@fast', '@p1', '@ui', '@expenses'], '[231181] Verify layout');
 * // => [{ key: 'priority', value: 'p1' }, { key: 'speed', value: 'fast' }, ...]
 */
export function buildTagAttributes(tags: string[], testTitle?: string): TagAttribute[] {
  const tagsWithId = [...tags];

  // Extract a numeric test-case ID from the title when not already present as a tag
  if (testTitle) {
    const match = testTitle.match(/\[(\d+)]/);
    if (match && !tagsWithId.some(t => t.includes(match[1]))) {
      tagsWithId.push(`[${match[1]}]`);
    }
  }

  return convertToAttributes(extractTagAttributes(tagsWithId));
}

/**
 * Logs tag attributes to the console (useful for local debugging and CI log
 * traces without any external service dependency).
 *
 * Output format:  [TAG] priority=p1 | speed=fast | testType=ui | module=expenses
 */
export function logTagAttributes(tags: string[], testTitle?: string): void {
  const attrs = buildTagAttributes(tags, testTitle);
  if (attrs.length === 0) return;

  const formatted = attrs.map(a => `${a.key}=${a.value}`).join(' | ');
  console.log(`[TAG] ${formatted}`);
}

