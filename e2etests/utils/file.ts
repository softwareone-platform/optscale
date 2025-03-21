import fs from "fs";
import {EStorageState} from "./enums";

export function safeWriteJsonFile(path: string, data: any) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));

  if (!fs.existsSync(path)) {
    throw new Error(`❌ File does not exist after write: ${path}`);
  }

  console.log(`✅ Successfully wrote file: ${path}`);
}

export function safeReadJsonFile<T = any>(path: EStorageState): T {
  if (!fs.existsSync(path)) {
    throw new Error(`❌ File does not exist: ${path}`);
  }

  try {
    const content = fs.readFileSync(path, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error: any) {
    throw new Error(`❌ Failed to read or parse JSON from ${path}: ${error.message}`);
  }
}
