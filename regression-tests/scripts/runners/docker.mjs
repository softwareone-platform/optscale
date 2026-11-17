// A run inside the Linux container: the renderer whose screenshots are committed. run_pw.sh owns
// the container, so everything here is expressed as its flags rather than as environment variables.
// Paired with this-machine.mjs — both files export the same names.
import { isLoopback, localPort } from '../dev-server.mjs';

export const modes = [{ label: 'docker       container — compares against the committed screenshots', ui: false }];

export const renderer = 'docker';

export const servesAppFromHost = true;

export function build({ environment, intent, snapshotEnv }) {
  const command = ['./run_pw.sh', '-E', environment.name];

  if (intent === 'update') command.push('-u');
  if (snapshotEnv !== environment.key) command.push('-S', snapshotEnv);

  // A loopback environment is served from this machine, which run_pw.sh reaches via -H.
  if (isLoopback(environment.baseUrl)) {
    command.push('-H');
    if (localPort(environment.baseUrl) !== '3000') command.push('-p', localPort(environment.baseUrl));
  }

  // The flags above already carry the environment; passing it twice invites the two to disagree.
  return { command, env: {} };
}
