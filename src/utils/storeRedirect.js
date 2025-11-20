// Simple store redirection based on user agent.
// Usage: getStoreUrl({ playStoreUrl, appStoreUrl }) returns best target.
export function getStoreUrl({ playStoreUrl, appStoreUrl, fallback }) {
  if (typeof navigator === 'undefined') return fallback || playStoreUrl || appStoreUrl || '#';
  const ua = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isMac = /macintosh/.test(ua) && 'ontouchend' in document; // iPad masquerading
  if (isIOS || isMac) return appStoreUrl || fallback || '#';
  const isAndroid = /android/.test(ua);
  if (isAndroid) return playStoreUrl || fallback || '#';
  return fallback || playStoreUrl || appStoreUrl || '#';
}

export function trackEvent(name, data = {}) {
  try {
    window.ticAnalytics = window.ticAnalytics || { events: [] };
    window.ticAnalytics.events.push({ name, data, ts: Date.now() });
    // For now just log; can be replaced by real endpoint.
    if (import.meta.env.MODE !== 'production') {
      console.log('[analytics]', name, data);
    }
  } catch {
    // swallow
  }
}
