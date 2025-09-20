#!/usr/bin/env node

import { spinner, intro, cancel, isCancel, select, log } from '@clack/prompts';
import { existsSync } from 'node:fs';
import { glob, cp, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

intro('Report Previewer');

let i = 0;

const s = spinner();

const dirname = join(import.meta.dirname, '..');

// chdir
process.chdir(dirname);

const destinationDir = process.argv[2];
const reportsDir = '.web-codegen-scorer/reports/';
const tmpDir = destinationDir ?? 'tmp';
const backupDir = join(dirname, 'node_modules/.report-backup');

log.info(`This is a helper to quickly tests report runs.
Copy your application into ${tmpDir} and run your app then select one of the report runs to copy them into your application.
For example 'cp -r examples/environments/lift-html/project ${tmpDir}'`);

if (destinationDir === undefined) {
  log.error('Usage: ./scripts/copy-solution.ts <destination-directory>');
  process.exit(1);
}

if (!existsSync(destinationDir)) {
  log.error(`Destination directory ${destinationDir} does not exist`);
  process.exit(1);
}

s.start('Listing reports');

while (true) {
  const reports = [] as string[];
  for await (const entry of glob(reportsDir + '/*/*')) reports.push(entry);

  s.stop(
    'Found ' + reports.length + ' report' + (reports.length === 1 ? '' : 's')
  );

  const selectedReport = await select({
    message: 'Pick a report (restart to see new ones)',
    options: reports.map((report) => ({
      value: report,
      label: report.replace(reportsDir, ''),
    })),
  });

  if (isCancel(selectedReport)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  let selectingRun = true;
  let previousRun = '';

  while (selectingRun) {
    if (i++ > 10) {
      console.error('Too many iterations');
      process.exit(1);
    }
    const runDir = [] as string[];

    for await (const entry of glob(selectedReport + '/*/*/'))
      runDir.push(entry.slice(selectedReport.length + 1));

    runDir.sort();

    const selectedRun = await select({
      message: '  Now pick a run (Ctrl+C to select a report; Enter to copy)',
      options: runDir.map((run) => ({
        value: run,
        label: run,
      })),
      maxItems: 8,
      initialValue: previousRun || undefined,
    });

    if (isCancel(selectedRun)) {
      cancel('Operation cancelled.');
      selectingRun = false;
      break;
    }

    previousRun = selectedRun;

    const s = spinner();
    s.start(`Copying solution into ${tmpDir}`);
    const dest = join(tmpDir, 'src');
    s.message('Move existing src directory into node_modules/.report-backup');
    const newBackupDir = join(backupDir, 'backup-' + new Date().getTime());
    await mkdir(newBackupDir, { recursive: true });
    await mkdir(dest, { recursive: true }).catch(() => {});
    await cp(dest, newBackupDir, { recursive: true });
    s.message('Copying new solution into src');
    await cp(join(selectedReport, selectedRun, 'src'), dest, {
      recursive: true,
    });
    s.stop(`Solution ${selectedRun} copied into ${tmpDir}`);
  }
}
