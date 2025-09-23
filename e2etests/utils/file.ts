import fs from "fs";
import path from "path";
import {EStorageStatePath} from "../types/enums";

export function safeWriteJsonFile(filePath: string, data: any) {
  const dir = path.dirname(filePath);

  // Create directories recursively if they don't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  if (!fs.existsSync(filePath)) {
    throw new Error(`❌ File does not exist after write: ${filePath}`);
  }
}

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
