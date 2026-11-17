// What running these tools looks like on macOS and Linux. Paired with windows.mjs — both files
// export the same names, and platform/index.mjs picks one.
export const DEV_SERVER_HINT = 'cd ngui/ui && npm start -- --host';

export const stopServerHint = port => `stop it with: kill $(lsof -ti:${port})`;

// `VAR=value command` is shell syntax here, so the printed command is the one that was run.
export const envPrefix = assignments => assignments.join(' ');

export const devServerNeedsShell = false;

// A shebang and the executable bit are enough.
export const asRunnable = command => ({ command });
