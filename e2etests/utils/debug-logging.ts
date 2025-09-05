import { DataSourceResponse } from "../test-data/test-data-response-types";

export function debugLog(message: string) {
    if (process.env.DEBUG_LOG === 'true') {
        console.debug(`[DEBUG] ${message}`);
    }
}