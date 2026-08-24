import fs from 'fs';
import path from 'path';

/** Writes `data` as pretty-printed JSON, creating parent directories as needed. */
export function safeWriteJsonFile(filePath: string, data: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  if (!fs.existsSync(filePath)) {
    throw new Error(`File was not written: ${filePath}`);
  }
}

/** Reads and parses a JSON file. Returns `null` when the file does not exist. */
export function safeReadJsonFile<T = unknown>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) return null;

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to parse JSON from ${filePath}: ${reason}`);
  }
}
