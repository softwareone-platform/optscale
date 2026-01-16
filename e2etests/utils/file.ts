import fs from 'fs';
import path from 'path';
import { EStorageStatePath } from '../types/enums';

/**
 * Safely writes a JSON object to a file.
 *
 * This function ensures that the directory structure for the specified file path exists.
 * If the directories do not exist, they are created recursively. The JSON data is then
 * written to the file in a pretty-printed format. After writing, the function verifies
 * that the file exists and throws an error if it does not.
 *
 * @param {string} filePath - The path to the file where the JSON data will be written.
 * @param {any} data - The JSON data to write to the file.
 * @throws {Error} If the file does not exist after writing.
 */
export function safeWriteJsonFile(filePath: string, data: any) {
  const dir = path.dirname(filePath);

  // Create directories recursively if they don't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  if (!fs.existsSync(filePath)) {
    throw new Error(`❌ File does not exist after write: ${filePath}`);
  }
}

/**
 * Safely reads and parses a JSON file.
 *
 * This function checks if the specified file exists. If it does not, it returns `null`.
 * If the file exists, it reads the file content, parses it as JSON, and returns the parsed object.
 * If an error occurs during reading or parsing, an error is thrown with a descriptive message.
 *
 * @template T - The expected type of the parsed JSON object.
 * @param {EStorageStatePath} filePath - The path to the JSON file to read.
 * @returns {T | null} The parsed JSON object, or `null` if the file does not exist.
 * @throws {Error} If the file cannot be read or the content cannot be parsed as JSON.
 */
export function safeReadJsonFile<T = any>(filePath: EStorageStatePath): T {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error: any) {
    throw new Error(`❌ Failed to read or parse JSON from ${filePath}: ${error.message}`);
  }
}
