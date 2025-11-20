#!/usr/bin/env node
import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distUrl = 'http://localhost:4173/';
const append = process.argv.includes('--append');

function runPreview() {
  return new Promise((resolve, reject) => {
    const proc = exec('npm run preview', { cwd: path.join(__dirname, '..') });
    let started = false;
    proc.stdout.on('data', (d) => {
      if (!started && /4173/.test(d)) {
        started = true;
        resolve(proc);
      }
    });
    proc.stderr.on('data', (d) => process.stderr.write(d));
    proc.on('error', reject);
  });
}

async function run() {
  console.log('Launching preview server…');
  const serverProc = await runPreview();
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = { logLevel: 'error', output: 'json', port: chrome.port }; // can also add 'html'
  console.log('Running Lighthouse audit…');
  const runnerResult = await lighthouse(distUrl, options);
  await chrome.kill();
  serverProc.kill();

  const { lhr } = runnerResult;
  const metrics = {
    performanceScore: lhr.categories.performance.score,
    lcp: lhr.audits['largest-contentful-paint'].numericValue,
    cls: lhr.audits['cumulative-layout-shift'].numericValue,
    tbt: lhr.audits['total-blocking-time'].numericValue,
    fcp: lhr.audits['first-contentful-paint'].numericValue,
    timeToInteractive: lhr.audits['interactive'].numericValue
  };

  const outDir = path.join(__dirname, '..', 'lighthouse');
  fs.mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const jsonPath = path.join(outDir, `report-${stamp}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(lhr, null, 2));
  console.log(`Saved JSON report: ${jsonPath}`);

  if (append) {
    const summaryPath = path.join(__dirname, '..', 'OPTIMIZATIONS-SUMMARY.md');
    const block = [
      '\n---',
      `## 🔍 Lighthouse Audit (${new Date().toLocaleString()})`,
      `Performance Score: ${(metrics.performanceScore * 100).toFixed(0)}`,
      `LCP: ${(metrics.lcp / 1000).toFixed(2)}s`,
      `CLS: ${metrics.cls.toFixed(3)}`,
      `TBT: ${metrics.tbt}ms`,
      `FCP: ${(metrics.fcp / 1000).toFixed(2)}s`,
      `TTI: ${(metrics.timeToInteractive / 1000).toFixed(2)}s`,
      `Report file: lighthouse/report-${stamp}.json`,
      '---',
      ''
    ].join('\n');
    fs.appendFileSync(summaryPath, block);
    console.log('Appended metrics to OPTIMIZATIONS-SUMMARY.md');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
