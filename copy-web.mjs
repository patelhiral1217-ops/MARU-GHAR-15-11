import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'www');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

const publicFiles = [
  'index.html',
  'admin.html',
  'privacy.html',
  'download.html',
  'firebase-config.js',
  'manifest.webmanifest',
  'icon.ico',
  'icon.png',
  'maru-ghar-approved-app-icon.png',
  'maru-ghar-logo-3d-512.png',
  'maru-ghar-backend.js',
  'maru-ghar-extras.js',
  'maru-ghar-form-steps.js',
  'maru-ghar-polish.js',
  'maru-ghar-delight.js',
  'maru-ghar-submit-toggle.js',
  'maru-ghar-file-mode.js',
  'maru-ghar-discovery-upgrades.js',
  'maru-ghar-qr.js',
  'maru-ghar-i18n.js',
  'maru-ghar-i18n-complete.js'
];

for (const file of publicFiles) {
  const src = path.join(root, file);
  if (fs.existsSync(src) && fs.statSync(src).isFile()) {
    fs.copyFileSync(src, path.join(out, file));
  }
}

const assets = path.join(root, 'assets');
if (fs.existsSync(assets)) {
  fs.cpSync(assets, path.join(out, 'assets'), { recursive: true });
}

for (const required of [
  'index.html',
  'admin.html',
  'firebase-config.js',
  'maru-ghar-backend.js',
  'maru-ghar-extras.js',
  'maru-ghar-form-steps.js',
  'maru-ghar-polish.js',
  'maru-ghar-delight.js',
  'maru-ghar-submit-toggle.js',
  'maru-ghar-file-mode.js',
  'maru-ghar-discovery-upgrades.js',
  'maru-ghar-qr.js'
]) {
  if (!fs.existsSync(path.join(out, required))) {
    throw new Error(`Hosting build missing required file: ${required}`);
  }
}

console.log('Maru Ghar Hosting files copied to www/.');
