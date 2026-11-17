// Console prompting, including the non-interactive path. A pipe delivers every line at once and
// readline drops the ones no question() awaits, so scripted input is drained up front — that also
// makes the picker usable from a script.
import { createInterface } from 'node:readline';
import process from 'node:process';

const interactive = process.stdin.isTTY;
const rl = interactive ? createInterface({ input: process.stdin, output: process.stdout }) : null;

const scripted = interactive
  ? []
  : (
      await new Promise(resolveInput => {
        let buffer = '';
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', chunk => (buffer += chunk));
        process.stdin.on('end', () => resolveInput(buffer));
      })
    )
      .split('\n')
      .map(line => line.trim());

export const ask = async question => {
  if (!interactive) {
    const answer = scripted.shift() ?? '';
    console.log(`${question}${answer}`);
    return answer;
  }
  return new Promise(resolvePrompt => rl.question(question, answer => resolvePrompt(answer.trim())));
};

export const confirm = async (question, defaultYes) => {
  const answer = await ask(question);
  return defaultYes ? !/^n/i.test(answer) : /^y/i.test(answer);
};

export async function choose(title, options) {
  console.log(`\n${title}`);
  options.forEach((option, index) => console.log(`  ${index + 1}) ${option.label}`));

  const answer = await ask(`Select [1-${options.length}] (default 1): `);
  const index = answer === '' ? 0 : Number(answer) - 1;
  if (!Number.isInteger(index) || index < 0 || index >= options.length) {
    console.error(`\nNot a valid choice: "${answer}"`);
    process.exit(1);
  }
  return options[index].value;
}

export const closePrompt = () => rl?.close();

export const pad = (text, width) => text.padEnd(width);
