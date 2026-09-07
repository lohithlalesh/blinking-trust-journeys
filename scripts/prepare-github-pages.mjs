import { promises as fs } from 'node:fs';
import path from 'node:path';

const outputDir = path.resolve('dist/client');
const textExtensions = new Set(['.css', '.html', '.js', '.json', '.rsc', '.txt', '.xml']);

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(entryPath)));
    else if (textExtensions.has(path.extname(entry.name))) files.push(entryPath);
  }
  return files;
}

for (const file of await walk(outputDir)) {
  const extension = path.extname(file);
  let source = await fs.readFile(file, 'utf8');
  const replacements = extension === '.css'
      ? [
        ["url('/fonts/", "url('../../../fonts/"],
        ['url("/fonts/', 'url("../../../fonts/'],
        ['url(/fonts/', 'url(../../../fonts/'],
      ]
    : [
        ['/_next/', './_next/'],
        ['/media/', './media/'],
        ['/brand/', './brand/'],
        ['/fonts/', './fonts/'],
      ];
  for (const [from, to] of replacements) source = source.split(from).join(to);
  await fs.writeFile(file, source);
}

console.log(`Prepared ${outputDir} for GitHub Pages project hosting.`);
