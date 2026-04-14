/**
 * FlakyTestReporter - Playwright custom reporter for detecting flaky and failing tests.
 *
 * Adapted from the generic FlakyTestReporter for the optscale e2e test framework.
 * Outputs a per-shard JSON report locally to 'reports/flaky/' — no external API dependencies.
 *
 * Severity is derived from the optscale priority tags: @p1, @p2, @p3.
 * Any test without a recognised priority tag is classified as 'unclassified'.
 *
 * Shard detection order:
 *   1. SHARD_NUMBER env var (explicit override)
 *   2. PLAYWRIGHT_SHARD_INDEX env var (0-based → converted to 1-based)
 *   3. Falls back to '1'
 *
 * Usage — add to any playwright config's reporter array:
 *   reporter: [
 *     ['list'],
 *     ['./reporting/flaky-test-reporter.ts'],
 *   ]
 *
 * Or run directly with the dedicated config:
 *   npx playwright test --config=playwright.flaky.config.ts
 *
 * @module OptscaleFlakyTestReporter
 */

import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';
import { buildTagAttributes } from './tags-helper';

// ---------------------------------------------------------------------------
// Output configuration
// ---------------------------------------------------------------------------

const OUTPUT_FOLDER = path.join('reports', 'flaky');

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

type Severity = 'p1' | 'p2' | 'p3' | 'unclassified';

interface FlakyTestEntry {
  testId: string;
  testTitle: string;
  fileName: string;
  totalRuns: number;
  failures: number;
  failureRate: number;
  lastFailure?: string;
  tags: string[];
  severity: Severity;
  tagAttributes: ReturnType<typeof buildTagAttributes>;
  detectedAt: string;
}

interface FailedTestEntry {
  testId: string;
  testTitle: string;
  fileName: string;
  tags: string[];
  severity: Severity;
  tagAttributes: ReturnType<typeof buildTagAttributes>;
  failedAt: string;
}

// ---------------------------------------------------------------------------
// FlakyTestCollector
// ---------------------------------------------------------------------------

class FlakyTestCollector {
  private flakyEntries: FlakyTestEntry[] = [];
  private failedEntries: FailedTestEntry[] = [];
  private testResults: Map<string, { test: TestCase; results: TestResult[] }> = new Map();

  addTestResult(test: TestCase, result: TestResult): void {
    const testId = `${test.location.file}::${test.title}`;

    if (!this.testResults.has(testId)) {
      this.testResults.set(testId, { test, results: [] });
    }
    this.testResults.get(testId)!.results.push(result);
  }

  analyzeFlakyTests(shardNumber: string): void {
    console.log(`🔍 [OptScale] Analyzing ${this.testResults.size} unique tests for shard ${shardNumber}...`);

    this.testResults.forEach(({ test, results }, testId) => {
      const totalRuns = results.length;

      const failures = results.filter(
        r => r.status === 'failed' || r.status === 'timedOut' || r.status === 'interrupted'
      ).length;

      const passes  = results.filter(r => r.status === 'passed').length;
      const skipped = results.filter(r => r.status === 'skipped').length;

      if (totalRuns > 1 && failures > 0 && passes > 0) {
        // ── Flaky: passed at least once AND failed at least once ──────────
        console.log(`🔄 FLAKY: ${test.title} (${failures}/${totalRuns} failed)`);

        const lastFailure = [...results]
          .reverse()
          .find(r => r.status === 'failed' || r.status === 'timedOut' || r.status === 'interrupted');

        this.flakyEntries.push({
          testId,
          testTitle: test.title,
          fileName: test.location.file,
          totalRuns,
          failures,
          failureRate: failures / totalRuns,
          lastFailure: lastFailure?.error?.message,
          tags: test.tags ?? [],
          severity: this.extractSeverity(test.tags ?? []),
          tagAttributes: buildTagAttributes(test.tags ?? [], test.title),
          detectedAt: new Date().toISOString(),
        });
      } else if (failures > 0 && passes === 0) {
        // ── Consistently failing ──────────────────────────────────────────
        console.log(`❌ FAILED: ${test.title} (${failures}/${totalRuns} failed)`);

        this.failedEntries.push({
          testId,
          testTitle: test.title,
          fileName: test.location.file,
          tags: test.tags ?? [],
          severity: this.extractSeverity(test.tags ?? []),
          tagAttributes: buildTagAttributes(test.tags ?? [], test.title),
          failedAt: new Date().toISOString(),
        });
      } else if (passes === totalRuns) {
        console.log(`✅ PASSED: ${test.title} (${passes}/${totalRuns} passed)`);
      } else if (skipped === totalRuns) {
        console.log(`⏭️  SKIPPED: ${test.title} (${skipped}/${totalRuns} skipped)`);
      } else {
        console.log(`❓ UNKNOWN: ${test.title} — no clear status pattern`);
      }
    });

    console.log(`📋 Shard ${shardNumber} analysis complete:`);
    console.log(`   🔄 Flaky tests:  ${this.flakyEntries.length}`);
    console.log(`   ❌ Failed tests: ${this.failedEntries.length}`);
  }

  /** Extract severity from the optscale priority tags (@p1 / @p2 / @p3). */
  private extractSeverity(tags: string[]): Severity {
    const clean = tags.map(t => t.replace(/^@/, '').toLowerCase());
    if (clean.includes('p1')) return 'p1';
    if (clean.includes('p2')) return 'p2';
    if (clean.includes('p3')) return 'p3';
    return 'unclassified';
  }

  getFlakyTests(): FlakyTestEntry[] {
    return [...this.flakyEntries].sort((a, b) => this.severityOrder(a.severity) - this.severityOrder(b.severity));
  }

  getFailedTests(): FailedTestEntry[] {
    return [...this.failedEntries].sort((a, b) => this.severityOrder(a.severity) - this.severityOrder(b.severity));
  }

  private severityOrder(s: Severity): number {
    return { p1: 0, p2: 1, p3: 2, unclassified: 3 }[s];
  }
}

// ---------------------------------------------------------------------------
// FlakyTestReporter
// ---------------------------------------------------------------------------

class FlakyTestReporter implements Reporter {
  private collector = new FlakyTestCollector();
  private readonly shardNumber: string;

  constructor() {
    console.log('🔍 [OptScale] FlakyTestReporter initialising...');
    console.log('   SHARD_NUMBER:', process.env.SHARD_NUMBER ?? '(not set)');
    console.log('   PLAYWRIGHT_SHARD_INDEX:', process.env.PLAYWRIGHT_SHARD_INDEX ?? '(not set)');

    const shardEnvKeys = Object.keys(process.env).filter(k => k.includes('SHARD'));
    if (shardEnvKeys.length > 0) {
      console.log(
        '   Shard-related env vars:',
        shardEnvKeys.map(k => `${k}=${process.env[k]}`).join(', ')
      );
    }

    this.shardNumber =
      process.env.SHARD_NUMBER ??
      (process.env.PLAYWRIGHT_SHARD_INDEX
        ? (parseInt(process.env.PLAYWRIGHT_SHARD_INDEX, 10) + 1).toString()
        : '1');

    console.log(`✅ [OptScale] FlakyTestReporter using shard number: ${this.shardNumber}`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    this.collector.addTestResult(test, result);
  }

  onEnd(): void {
    console.log(`\n🔍 [OptScale] FlakyTestReporter: onEnd() called for shard ${this.shardNumber}`);

    this.collector.analyzeFlakyTests(this.shardNumber);

    // Ensure output folder exists
    const absoluteOutputFolder = path.resolve(OUTPUT_FOLDER);
    if (!fs.existsSync(absoluteOutputFolder)) {
      fs.mkdirSync(absoluteOutputFolder, { recursive: true });
    }

    this.generateJsonReport();
  }

  // -------------------------------------------------------------------------
  // JSON report
  // -------------------------------------------------------------------------

  private generateJsonReport(): void {
    const flakyTests  = this.collector.getFlakyTests();
    const failedTests = this.collector.getFailedTests();

    const report = {
      generatedAt: new Date().toISOString(),
      shardNumber: this.shardNumber,
      totalFlakyTests: flakyTests.length,
      uniqueFlakyTests: flakyTests,
      uniqueFailedTests: failedTests,
      summary: {
        flaky: {
          p1:           flakyTests.filter(t => t.severity === 'p1').length,
          p2:           flakyTests.filter(t => t.severity === 'p2').length,
          p3:           flakyTests.filter(t => t.severity === 'p3').length,
          unclassified: flakyTests.filter(t => t.severity === 'unclassified').length,
        },
        failed: {
          p1:           failedTests.filter(t => t.severity === 'p1').length,
          p2:           failedTests.filter(t => t.severity === 'p2').length,
          p3:           failedTests.filter(t => t.severity === 'p3').length,
          unclassified: failedTests.filter(t => t.severity === 'unclassified').length,
        },
      },
    };

    const outputPath = path.resolve(OUTPUT_FOLDER, `flaky-test-shard-${this.shardNumber}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

    console.log(
      `✅ Shard ${this.shardNumber} JSON report written to ${outputPath}` +
        ` (${flakyTests.length} flaky, ${failedTests.length} failed)`
    );
  }
}

export default FlakyTestReporter;

