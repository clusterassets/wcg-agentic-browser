/** Validate and summarize measured browser benchmark JSON; never invent measurements. */
import { readFileSync } from 'node:fs';
const files = process.argv.slice(2);
if (!files.length) {
  console.log('Usage: node tools/benchmark/report.mjs measurements/*.json');
  console.log('No browser benchmark measurements supplied; no engine comparison is possible.');
  process.exit(0);
}
for (const file of files) {
  const value = JSON.parse(readFileSync(file, 'utf8'));
  for (const key of ['engine','engineVersion','os','scenario','runId','measuredAt','metrics'])
    if (value[key] === undefined) throw new Error(`Missing ${key} in ${file}`);
  if (!value.metrics || typeof value.metrics !== 'object') throw new Error('Invalid metrics');
  for (const [name,number] of Object.entries(value.metrics))
    if (!Number.isFinite(number) || number < 0) throw new Error(`Invalid metric ${name}`);
  console.log(JSON.stringify({ file, engine:value.engine, scenario:value.scenario, metrics:value.metrics }));
}
