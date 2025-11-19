#!/usr/bin/env node
/**
 * Simple image optimization script for TIC Miton.
 * Generates required favicon/app icon sizes from a source logo using Sharp.
 * Source can be WebP or PNG.
 *
 * Usage: npm run optimize:images
 * Output: public/favicon-32x32.png, apple-touch-icon.png (180x180), android-chrome-192x192.png, android-chrome-512x512.png
 */

import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const srcLogoCandidates = [
  path.join(root, 'src', 'assets', 'logo-tic.webp'),
  path.join(root, 'src', 'assets', 'logo-tic.png'),
];

const srcLogo = srcLogoCandidates.find(p => existsSync(p));
if (!srcLogo) {
  console.error('❌ Aucun logo source trouvé (src/assets/logo-tic.webp|png).');
  process.exit(1);
}

const targets = [
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
];

(async () => {
  await mkdir(publicDir, { recursive: true });
  console.log(`✅ Source logo: ${srcLogo}`);
  for (const t of targets) {
    const outPath = path.join(publicDir, t.name);
    await sharp(srcLogo)
      .resize(t.size, t.size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png({ compressionLevel: 9 })
      .toFile(outPath);
    console.log(`🖼  Generated ${t.name}`);
  }

  // Optional: copy manifest if missing prototype
  const manifestSrc = path.join(publicDir, 'site.webmanifest');
  if (!existsSync(manifestSrc)) {
    const stub = path.join(root, 'public', 'site.webmanifest.sample');
    if (existsSync(stub)) {
      await copyFile(stub, manifestSrc);
      console.log('📄 Copied site.webmanifest from sample');
    }
  }

  console.log('\n🎉 Done. Commit the updated icons & manifest if changed.');
})();
