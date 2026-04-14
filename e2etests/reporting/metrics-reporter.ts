/**
 * MetricsReporter - Playwright custom reporter for generating tag-based test metrics reports.
 *
 * Adapted from the generic MetricsReporter for the optscale e2e test framework.
 * Outputs HTML and CSV reports locally — no external reporting API dependencies.
 *
 * Tag categories (based on actual tag usage across optscale e2e tests):
 *   - Priority tags:  @p1, @p2, @p3, ... (regex: /^p\d+$/)
 *   - Speed tags:     @slow
 *   - Module tags:    @expenses, @homepage, @recommendations, @resources, @pools,
 *                     @policies, @tagging-policies, @cloud-accounts, @events,
 *                     @perspectives, @risp-coverage, @invitation-flow
 *   - Type tags:      @ui, @devops
 *   - Other:          anything that doesn't fit above
 *
 * Reports are saved in the 'reports' folder at the project root, with filenames
 * including the current git branch and a timestamp.
 *
 * The reporter exits the process after report generation to prevent test execution.
 *
 * @module OptscaleMetricsReporter
 */

import { Reporter, Suite, FullConfig } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { reportDebugLog, limitString } from '../utils/report-utils';
import { logTagAttributes } from './tags-helper';

// ---------------------------------------------------------------------------
// Output configuration
// ---------------------------------------------------------------------------

const OUTPUT_FOLDER = 'reports';

// ---------------------------------------------------------------------------
// Tag definitions — aligned with the optscale e2e test suite
// ---------------------------------------------------------------------------

/** Priority tags — matched via regex rather than an explicit list */
const priorityRegex = /^p\d+$/;

/** Test-case ID tags — e.g. [231181] */
const testCaseIdRegex = /^\[\d+]$/;

/**
 * Module tags — functional areas covered by the test suite.
 * Sourced from actual @tags found in tests/** and regression-tests/**.
 */
export const TAGS_MODULE = [
  'expenses',         // Expenses page / cost analysis
  'homepage',         // Home / dashboard page
  'recommendations',  // Recommendations module
  'resources',        // Resources management
  'pools',            // Pools management
  'policies',         // Policies (general)
  'tagging-policies', // Tagging policies
  'cloud-accounts',   // Cloud account integration
  'events',           // Events log
  'perspectives',     // Perspectives / saved views
  'risp-coverage',    // RISP coverage reports
  'invitation-flow',  // Invitation / onboarding flow
];

/** Speed tags */
export const TAGS_SPEED: string[] = ['slow'];

/** Test type tags */
export const TAGS_TYPE = ['ui', 'devops'];

/** Debug / development-only tests */
export const TAGS_DEBUG: string[] = ['debug'];

// ---------------------------------------------------------------------------
// Timestamp & branch helpers
// ---------------------------------------------------------------------------

function getTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

function getBranchName(): string {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
    return branch.replace(/\//g, '-').replace(/[^a-zA-Z0-9._-]/g, '_');
  } catch {
    return 'unknown-branch';
  }
}

const timestamp = getTimestamp();
const branchName = getBranchName();
const OUTPUT_FILE_HTML = `${OUTPUT_FOLDER}/tag-metrics-report-${branchName}-${timestamp}.html`;
const OUTPUT_FILE_CSV  = `${OUTPUT_FOLDER}/tag-metrics-report-${branchName}-${timestamp}.csv`;

// ---------------------------------------------------------------------------
// Tag sorting helpers
// ---------------------------------------------------------------------------

/**
 * Custom sort: priority first → speed → module → type → debug → other → test-case IDs last.
 */
function customSortPriorityFirstIdsLast(arr: string[]): string[] {
  return [...arr].sort((a, b) => {
    const rank = (tag: string): number => {
      if (priorityRegex.test(tag))       return 0;
      if (TAGS_SPEED.includes(tag))      return 1;
      if (TAGS_MODULE.includes(tag))     return 2;
      if (TAGS_TYPE.includes(tag))       return 3;
      if (TAGS_DEBUG.includes(tag))      return 4;
      if (testCaseIdRegex.test(tag))     return 9;
      return 5; // other
    };
    const diff = rank(a) - rank(b);
    return diff !== 0 ? diff : a.localeCompare(b);
  });
}

// ---------------------------------------------------------------------------
// Data model
// ---------------------------------------------------------------------------

interface MetricsEntry {
  /** Full test title (prefixed with describe block title when available). */
  title: string;
  /** Cleaned tags (@ prefix stripped). */
  tags: string[];
}

// ---------------------------------------------------------------------------
// MetricsCollector
// ---------------------------------------------------------------------------

class MetricsCollector {
  private entries: MetricsEntry[] = [];
  public maxNumberOfTags = 0;

  addEntry(entry: MetricsEntry): void {
    entry.tags = entry.tags.map(tag => tag.replace(/^@/, ''));
    this.entries.push(entry);
    if (entry.tags.length > this.maxNumberOfTags) this.maxNumberOfTags = entry.tags.length;
  }

  getAllEntries(): MetricsEntry[] {
    return this.entries;
  }

  extractEntriesPerTag(): Record<string, MetricsEntry[]> {
    const tagMap: Record<string, MetricsEntry[]> = {};
    this.entries.forEach(entry => {
      entry.tags.forEach(tag => {
        if (!tagMap[tag]) tagMap[tag] = [];
        tagMap[tag].push(entry);
      });
    });
    return tagMap;
  }

  extractTagsPerTitle(title: string): string[] {
    return this.entries.find(e => e.title === title)?.tags ?? [];
  }

  extractEntriesForTag(tag: string): MetricsEntry[] {
    return this.entries.filter(entry => entry.tags.includes(tag));
  }

  getUniqueTags(): string[] {
    return Object.keys(this.extractEntriesPerTag());
  }

  /**
   * Returns the ordered list of category column names used in the CSV header.
   */
  getCategorisedTagsSorted(): string[] {
    const tags = customSortPriorityFirstIdsLast(this.getUniqueTags());
    const categories: string[] = [];

    for (const tag of tags) {
      if (priorityRegex.test(tag))    { if (!categories.includes('Priority'))    categories.push('Priority');    }
      else if (TAGS_SPEED.includes(tag))  { if (!categories.includes('Speed'))       categories.push('Speed');       }
      else if (TAGS_MODULE.includes(tag)) { if (!categories.includes('Module'))      categories.push('Module');      }
      else if (TAGS_TYPE.includes(tag))   { if (!categories.includes('Type'))        categories.push('Type');        }
      else if (TAGS_DEBUG.includes(tag))  { if (!categories.includes('Debug'))       categories.push('Debug');       }
    }

    const hasOther = tags.some(
      tag =>
        !priorityRegex.test(tag) &&
        !TAGS_SPEED.includes(tag) &&
        !TAGS_MODULE.includes(tag) &&
        !TAGS_TYPE.includes(tag) &&
        !TAGS_DEBUG.includes(tag)
    );
    if (hasOther) categories.push('Other');

    return categories;
  }

  /**
   * Returns a comma-delimited string of categorised tag values for a given test title.
   * Column order: Priority, Speed, Module, Type, Debug, Other
   */
  getEntriesCategorisedDelimited(entryTitle: string, delimiters: string[] = [',', ';']): string {
    const entryTags = this.extractTagsPerTitle(entryTitle);
    let priorityTag = '';
    let speedTag = '';
    const moduleTags: string[] = [];
    let typeTag = '';
    let debugTag = '';
    const otherTags: string[] = [];

    for (const tag of entryTags) {
      if (priorityRegex.test(tag))    priorityTag = tag;
      else if (TAGS_SPEED.includes(tag))  speedTag = tag;
      else if (TAGS_MODULE.includes(tag)) moduleTags.push(tag);
      else if (TAGS_TYPE.includes(tag))   typeTag = tag;
      else if (TAGS_DEBUG.includes(tag))  debugTag = tag;
      else                                otherTags.push(tag);
    }

    const del1 = delimiters[0];
    const del2 = delimiters[delimiters.length - 1];

    return `${priorityTag}${del1}${speedTag}${del1}${moduleTags.join(del2)}${del1}${typeTag}${del1}${debugTag}${del1}${otherTags.join(del2)}`;
  }
}

// ---------------------------------------------------------------------------
// MetricsReporter
// ---------------------------------------------------------------------------

class MetricsReporter implements Reporter {
  private collector = new MetricsCollector();

  onBegin(_config: FullConfig, suite: Suite): void {
    reportDebugLog(`Ingesting ${suite.allTests().length} tests for metrics report`, 'info');

    suite.allTests().forEach(test => {
      const revisedTitle =
        test.parent.type === 'describe' ? `${test.parent.title}: ${test.title}` : test.title;
      reportDebugLog(`test: ${revisedTitle}, tags: ${test.tags}`, 'info');
      logTagAttributes(test.tags, revisedTitle);
      this.collector.addEntry({ title: revisedTitle, tags: test.tags });
    });

    // Ensure the output folder exists
    const absoluteOutputFolder = path.resolve(OUTPUT_FOLDER);
    if (!fs.existsSync(absoluteOutputFolder)) {
      fs.mkdirSync(absoluteOutputFolder, { recursive: true });
    }

    // Write CSV report
    const csvContent = this.generateTagsSummaryCsv(this.collector);
    const csvPath = path.resolve(OUTPUT_FILE_CSV);
    fs.writeFileSync(csvPath, csvContent);
    reportDebugLog(`CSV report written to ${csvPath}`, 'info');

    // Write HTML report
    const htmlContent = this.generateHtmlContent(this.collector);
    const htmlPath = path.resolve(OUTPUT_FILE_HTML);
    fs.writeFileSync(htmlPath, htmlContent);
    reportDebugLog(`HTML report written to ${htmlPath}`, 'info');

    console.log(`\n✅ Metrics reports generated:`);
    console.log(`   HTML → ${htmlPath}`);
    console.log(`   CSV  → ${csvPath}\n`);

    // Exit to prevent actual test execution
    process.exit(0);
  }

  // -------------------------------------------------------------------------
  // HTML generation
  // -------------------------------------------------------------------------

  private generateHtmlContent(collector: MetricsCollector): string {
    const tags = Object.keys(collector.extractEntriesPerTag());
    const tagCounts: Record<string, number> = {};
    const tagTests: Record<string, MetricsEntry[]> = {};

    tags.forEach(tag => {
      tagCounts[tag] = collector.extractEntriesForTag(tag).length;
      tagTests[tag]  = collector.extractEntriesForTag(tag);
    });

    const rowEntriesTagCounts: string[] = [];
    const rowEntriesTestCasesPerTag: string[] = [];
    const rowEntriesTestCasesAll: string[] = [];

    tags.forEach(tag => {
      // Exclude raw test-case ID tags from the counts summary
      if (!testCaseIdRegex.test(tag)) {
        rowEntriesTagCounts.push(`<tr><td>${tag}</td><td>${tagCounts[tag]}</td></tr>`);
      }

      rowEntriesTestCasesPerTag.push(`<tr><td colspan="2"><strong>${tag}</strong></td></tr>`);
      for (const t of tagTests[tag]) {
        rowEntriesTestCasesPerTag.push(`<tr><td>${t.title}</td><td>${t.tags.join(', ')}</td></tr>`);
      }

      for (const entry of collector.extractEntriesForTag(tag)) {
        rowEntriesTestCasesAll.push(`<tr><td>${entry.title}</td><td>${entry.tags.join(', ')}</td></tr>`);
      }
    });

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>OptScale E2E Tag Metrics Report</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 16px; }
    h2   { color: #333; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    tr:nth-child(even) { background-color: #f9f9f9; }
    .collapsible {
      background-color: #eee; color: #444; cursor: pointer;
      padding: 14px; width: 100%; border: none; text-align: left;
      outline: none; font-size: 15px; margin-top: 8px;
    }
    .collapsible:hover, .active { background-color: #ccc; }
    .content { padding: 0 18px; display: none; overflow: hidden; background-color: #f1f1f1; }
  </style>
</head>
<body>
  <h2>OptScale E2E Tag Metrics Report &mdash; Branch: ${branchName} &mdash; Generated: ${timestamp}</h2>

  <button type="button" class="collapsible">▶ Tag counts</button>
  <div class="content" style="display:block;">
    <table>
      <tr><th>Tag</th><th>Test count</th></tr>
      <tr><td colspan="2"><em>Total tests: ${collector.getAllEntries().length} &nbsp;|&nbsp; Unique tags: ${tags.length}</em></td></tr>
      ${rowEntriesTagCounts.join('\n      ')}
    </table>
  </div>

  <button type="button" class="collapsible">▶ Test cases per tag</button>
  <div class="content">
    <table>
      <tr><th>Test</th><th>Tags</th></tr>
      ${rowEntriesTestCasesPerTag.join('\n      ')}
    </table>
  </div>

  <button type="button" class="collapsible">▶ All test cases</button>
  <div class="content">
    <table>
      <tr><th>Test</th><th>Tags</th></tr>
      ${rowEntriesTestCasesAll.join('\n      ')}
    </table>
  </div>

  <script>
    document.querySelectorAll('.collapsible').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var content = this.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
      });
    });
  </script>
</body>
</html>`;
  }

  // -------------------------------------------------------------------------
  // CSV generation
  // -------------------------------------------------------------------------

  private generateTagsSummaryCsv(collector: MetricsCollector): string {
    const entries = collector.getAllEntries();
    const categories = collector.getCategorisedTagsSorted();

    // Header: Title, Number of tags, <category columns>
    const header = `Title,Number of tags,${categories.join(',')}\n`;

    const rows = entries
      .map(entry => `"${entry.title.replace(/"/g, '""')}",${entry.tags.length},${collector.getEntriesCategorisedDelimited(entry.title)}`)
      .join('\n');

    const csv = header + rows;
    reportDebugLog(`CSV preview: ${limitString(csv, 255)}`, 'debug');
    return csv;
  }
}

export default MetricsReporter;


