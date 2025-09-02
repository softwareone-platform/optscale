import fs from 'fs';
import path from 'path';
import {debugLog} from "./debug-logging";

/**
 * Deletes all files in a directory if process.env.CLEAN_UP_DOWNLOADS === 'true'.
 * @param dirPath Path to the directory whose contents should be deleted.
 */
export async function cleanUpDirectoryIfEnabled(dirPath: string): Promise<void> {
    if (process.env.CLEAN_UP_DOWNLOADS !== 'true') {
        return;
    }

    const resolvedPath = path.resolve(dirPath);

    try {
        const files = await fs.promises.readdir(resolvedPath);

        await Promise.all(
            files.map(async (file) => {
                const fullPath = path.join(resolvedPath, file);
                const stat = await fs.promises.stat(fullPath);
                if (stat.isFile()) {
                    await fs.promises.unlink(fullPath);
                }
            })
        );

        debugLog(`[CLEANUP] Deleted ${files.length} files from ${resolvedPath}`);
    } catch (err) {
        console.error(`[CLEANUP ERROR] Failed to clean directory ${resolvedPath}:`, err);
    }
}