import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import pdfParse from 'pdf-parse';

export interface PdfCompareOptions {
  tokenSimilarityThreshold?: number; // Default 0.9
  numericTolerance?: number; // Default 0 (exact match)
  diffOutputPath?: string; // If provided, writes a diff report (JSON)
  minTokenLength?: number; // Default 2
  ignoreCase?: boolean; // Default true
}

export interface PdfComparisonResult {
  passed: boolean;
  tokenSimilarity: number;
  expectedTokenCount: number;
  matchedTokenCount: number;
  numericMatches: number;
  expectedNumericCount: number;
  missingNumbers: Array<{ value: number; closest?: number; delta?: number }>;
  textHashExpected: string;
  textHashActual: string;
}

interface PdfFeatures {
  text: string;
  tokens: string[];
  tokenSet: Set<string>;
  numbers: number[];
  textHash: string;
  pageCount: number;
}

// Extract features from a PDF
async function extractPdfFeatures(filePath: string, opts: PdfCompareOptions): Promise<PdfFeatures> {
  const buffer = await fs.readFile(filePath);
  const data = await pdfParse(buffer);

  const rawText = data.text || '';
  const normalized = normalizeText(rawText, opts);
  const tokens = tokenize(normalized, opts);
  const tokenSet = new Set(tokens);
  const numbers = Array.from(normalized.matchAll(/-?\d+(?:\.\d+)?/g)).map(m => Number(m[0]));
  const textHash = hashString(normalized);

  return {
    text: normalized,
    tokens,
    tokenSet,
    numbers,
    textHash,
    pageCount: data.numpages || 0,
  };
}

function normalizeText(text: string, opts: PdfCompareOptions): string {
  let t = text.replace(/\r\n?/g, '\n');
  t = t.replace(/\s+/g, ' ').trim();
  if (opts.ignoreCase !== false) t = t.toLowerCase();
  return t;
}

function tokenize(text: string, opts: PdfCompareOptions): string[] {
  const minLen = opts.minTokenLength ?? 2;
  return text.split(/[^a-zA-Z0-9.%:/_-]+/).filter(tok => tok.length >= minLen);
}

function hashString(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

function computeTokenSimilarity(expected: Set<string>, actual: Set<string>): { matched: number; similarity: number } {
  let matched = 0;
  expected.forEach(t => {
    if (actual.has(t)) matched++;
  });
  const similarity = expected.size === 0 ? 1 : matched / expected.size;
  return { matched, similarity };
}

function matchNumbers(
  expected: number[],
  actual: number[],
  tolerance: number
): {
  matches: number;
  missing: Array<{ value: number; closest?: number; delta?: number }>;
} {
  if (expected.length === 0) return { matches: 0, missing: [] };

  const actualSorted = [...actual].sort((a, b) => a - b);
  const missing: Array<{ value: number; closest?: number; delta?: number }> = [];
  let matches = 0;

  for (const value of expected) {
    let found = false;
    let closest: number | undefined;
    let minDelta = Number.POSITIVE_INFINITY;

    for (const candidate of actualSorted) {
      const delta = Math.abs(candidate - value);
      if (delta < minDelta) {
        minDelta = delta;
        closest = candidate;
      }
      if (delta <= tolerance) {
        found = true;
        break;
      }
    }

    if (found) {
      matches++;
    } else {
      missing.push({ value, closest, delta: minDelta });
    }
  }

  return { matches, missing };
}

async function maybeWriteDiff(diffData: unknown, outPath?: string) {
  if (!outPath) return;
  let finalPath = outPath;
  if (finalPath.toLowerCase().endsWith('.png')) {
    finalPath = finalPath.replace(/\.png$/i, '.json');
  }
  await fs.mkdir(path.dirname(finalPath), { recursive: true });
  await fs.writeFile(finalPath, JSON.stringify(diffData, null, 2), 'utf8');
}

export async function comparePdfFiles(expectedPath: string, actualPath: string, options: PdfCompareOptions = {}): Promise<boolean> {
  const opts: PdfCompareOptions = {
    tokenSimilarityThreshold: 0.9,
    numericTolerance: 0,
    ignoreCase: true,
    minTokenLength: 2,
    ...options,
  };

  const [expected, actual] = await Promise.all([extractPdfFeatures(expectedPath, opts), extractPdfFeatures(actualPath, opts)]);

  if (expected.pageCount !== actual.pageCount) {
    await maybeWriteDiff(
      {
        passed: false,
        reason: 'pageCount mismatch',
        expectedPageCount: expected.pageCount,
        actualPageCount: actual.pageCount,
      },
      opts.diffOutputPath
    );
    return false;
  }

  const { matched, similarity } = computeTokenSimilarity(expected.tokenSet, actual.tokenSet);
  const numberMatch = matchNumbers(expected.numbers, actual.numbers, opts.numericTolerance ?? 0);

  const passed = similarity >= (opts.tokenSimilarityThreshold ?? 0.9) && numberMatch.missing.length === 0;

  const result: PdfComparisonResult = {
    passed,
    tokenSimilarity: similarity,
    expectedTokenCount: expected.tokenSet.size,
    matchedTokenCount: matched,
    numericMatches: numberMatch.matches,
    expectedNumericCount: expected.numbers.length,
    missingNumbers: numberMatch.missing,
    textHashExpected: expected.textHash,
    textHashActual: actual.textHash,
  };

  await maybeWriteDiff(result, opts.diffOutputPath);
  return passed;
}

// Optional export if needed elsewhere
export { extractPdfFeatures };
