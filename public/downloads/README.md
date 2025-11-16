# Downloads folder

This folder hosts public download assets served by GitHub Pages.

Recommended production setup:
- Android: host the APK as a GitHub Release asset and set `VITE_ANDROID_APK_URL` to that URL.
- iOS: public direct install is not allowed. Use the App Store/TestFlight, or enterprise distribution with `itms-services` (requires proper Apple account and signing).

Local defaults:
- Android fallback path used by the app: `downloads/android/app-latest.apk` (replace with your APK and keep the filename versioned as needed).
- iOS sample manifest: `downloads/ios/manifest.plist.sample` — copy to `manifest.plist` and update if you use enterprise distribution.
- Version manifest: `downloads/latest.json` — used for website display/automation (optional).

Notes:
- Git push has a 100 MB per-file limit. Avoid committing large binaries. Prefer GitHub Releases or object storage.
- Version filenames (e.g., `app-1.2.3.apk`) to avoid caching issues on Pages.
