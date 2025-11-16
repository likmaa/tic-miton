# Direct Downloads Setup (APK / iOS)

This site supports direct APK downloads and an iOS flow via TestFlight/App Store or enterprise distribution.

## TL;DR
- Android: Prefer hosting the APK on GitHub Releases. Set `VITE_ANDROID_APK_URL` to the release asset URL. Alternative: place `public/downloads/android/app-latest.apk` (<100MB) and let Pages serve it.
- iOS: Public direct installs are not allowed. Use TestFlight/App Store. For enterprise/internal distribution, use `itms-services` with a `manifest.plist` and a signed `.ipa` hosted over HTTPS.
- Users land on `/download`, which detects the platform and redirects appropriately. It also reads `public/downloads/latest.json` to display version info.

## Android (APK)
1. Build your APK (release, signed).
2. Recommended hosting via GitHub Releases:
   - Create a release and upload `app-<version>.apk`.
   - Set `VITE_ANDROID_APK_URL` to the asset URL (see `.env.example`).
   - Commit/push to trigger deployment.
3. Alternative hosting on GitHub Pages (limit <100MB):
   - Put the APK at `public/downloads/android/app-latest.apk` and commit.
   - Optionally version the filename (e.g., `app-1.2.3.apk`) and update `public/downloads/latest.json`.
4. Optional: compute checksum
   - On macOS: `shasum -a 256 app-<version>.apk`
   - Put the value in `android.sha256` in `public/downloads/latest.json`.

## iOS (App Store/TestFlight)
- Set `VITE_TESTFLIGHT_URL` to your public TestFlight invite URL, or `VITE_APP_STORE_URL` in `src/config/links.js` via env.

## iOS (Enterprise / itms-services)
- Requirements: proper Apple Developer Enterprise Program, signed `.ipa`, distribution certificate, and HTTPS hosting.
- Steps:
  1. Copy `public/downloads/ios/manifest.plist.sample` to `public/downloads/ios/manifest.plist` and edit:
     - `assets[0].url`: HTTPS URL to your `.ipa` file.
     - Icons URLs and metadata (bundle id, version, title).
  2. Host the `.ipa` file at a stable HTTPS URL. Avoid committing large binaries to the repo (>100MB). Prefer object storage (S3/R2) or a private server.
  3. Set `VITE_IOS_ENTERPRISE_PLIST_URL` to the full HTTPS URL of the `manifest.plist`.
  4. `/download` will redirect iOS devices via `itms-services://`.

## Version Manifest (`public/downloads/latest.json`)
- Used by `/download` to show version, size, and checksum, and to provide a stable relative URL for the APK.
- Example fields:
```
{
  "version": "1.2.3",
  "releasedAt": "2025-11-16T12:00:00Z",
  "android": {
    "url": "downloads/android/app-1.2.3.apk",
    "sizeBytes": 34567890,
    "sha256": "...",
    "minSdk": 24
  },
  "ios": {
    "enterprisePlistUrl": "https://.../manifest.plist",
    "testFlightUrl": "https://testflight.apple.com/join/...",
    "minIOS": "14.0"
  }
}
```

## CI notes
- The repo already contains GitHub Actions to build and deploy to Pages.
- For Releases-based APKs, no changes to CI are required; you only update env vars or `.env.production` values.

## Troubleshooting
- APK not downloading: check the URL (env or manifest), CORS, and that the asset is public.
- iOS enterprise install fails: verify the provisioning profile, certificate, HTTPS, and `manifest.plist` URLs.
- Pages 404 on deep links: a `404.html` fallback is created in CI (see workflow).
