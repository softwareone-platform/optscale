// What running these tools looks like on Windows. Paired with macos-linux.mjs — both files export
// the same names, and platform/index.mjs picks one.
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';

export const DEV_SERVER_HINT = 'cd ngui\\ui; npm start -- --host';

export const stopServerHint = port =>
  `stop it with: Get-Process -Id (Get-NetTCPConnection -LocalPort ${port} -State Listen).OwningProcess | Stop-Process`;

// PowerShell has no `VAR=value command` prefix, so print the form that actually sets the variable.
export const envPrefix = assignments => (assignments.length ? `cross-env ${assignments.join(' ')}` : '');

// npm is a .cmd shim, which Node will not spawn without a shell (CVE-2024-27980).
export const devServerNeedsShell = true;

// Git Bash, never WSL's: run_pw.sh treats a Windows shell as a Docker Desktop host, reaching the
// app through host.docker.internal and skipping --network host. Inside WSL both of those flip.
const gitBash = () =>
  [
    process.env.ProgramFiles && resolve(process.env.ProgramFiles, 'Git', 'bin', 'bash.exe'),
    process.env['ProgramFiles(x86)'] && resolve(process.env['ProgramFiles(x86)'], 'Git', 'bin', 'bash.exe'),
    process.env.LOCALAPPDATA && resolve(process.env.LOCALAPPDATA, 'Programs', 'Git', 'bin', 'bash.exe'),
  ].find(candidate => candidate && existsSync(candidate));

const GIT_BASH_MISSING =
  'Running the container needs Git Bash on Windows. Install Git for Windows, or run ./run_pw.sh from a bash shell yourself.';

/** Windows cannot execute a shebang, so a .sh has to be handed to bash explicitly. */
export const asRunnable = command => {
  if (!command[0].endsWith('.sh')) return { command };

  const bash = gitBash();
  return bash ? { command: [bash, ...command] } : { error: GIT_BASH_MISSING };
};
