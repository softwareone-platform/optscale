export function debugLog(message: string) {
    if (process.env.DEBUG_LOG === 'true') {
        console.debug(`[DEBUG] ${message}`);
    }
}