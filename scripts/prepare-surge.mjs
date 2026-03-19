import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = join(process.cwd(), 'out');
const indexPath = join(outDir, 'index.html');
const spaFallbackPath = join(outDir, '200.html');
const domain = (process.env.SURGE_DOMAIN || 'massagedeskos.surge.sh').trim().toLowerCase();

if (!existsSync(indexPath)) {
  throw new Error(`Build output not found at ${indexPath}. Run the Vite build first.`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(indexPath, spaFallbackPath);

const cnamePath = join(outDir, 'CNAME');
writeFileSync(cnamePath, `${domain}\n`, 'utf8');

const surgePathFile = join(outDir, '.surge');
if (existsSync(surgePathFile)) {
  rmSync(surgePathFile, { force: true });
}

const diagnosticsPath = join(outDir, 'massagedeskos-launch.json');
writeFileSync(
  diagnosticsPath,
  JSON.stringify(
    {
      preparedAt: new Date().toISOString(),
      domain,
      spaFallback: '200.html',
      notes: [
        'Surge deployment prepared for SPA routing.',
        'Use Stripe Payment Links or a backend checkout service for real payments.',
      ],
    },
    null,
    2
  ),
  'utf8'
);

const html = readFileSync(indexPath, 'utf8');
if (!html.includes('/massagedeskos/')) {
  console.warn('Warning: expected MassageDeskOS hosted path not found in built index.html');
}
