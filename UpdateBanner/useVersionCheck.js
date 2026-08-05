// Polls a static version.json (kept in sync with package.json by
// vite.config.js) and compares it against the version baked into the
// currently-running bundle (__APP_VERSION__). Returns true once they no
// longer match, meaning a newer version has been deployed since this
// tab loaded.
import { useEffect, useState } from "react";

const DEFAULT_CHECK_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

export function useVersionCheck(checkIntervalMs = DEFAULT_CHECK_INTERVAL_MS) {
  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    async function check() {
      try {
        // no-store: this file must never be served from cache, or a stale
        // copy would always report "up to date" even after a real deploy.
        const res = await fetch(`${import.meta.env.BASE_URL}version.json`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data.version !== __APP_VERSION__) setHasUpdate(true);
      } catch {
        // network hiccup - just try again next interval, not worth surfacing
      }
    }

    check(); // check immediately on mount, don't wait for the first interval
    const interval = setInterval(check, checkIntervalMs);

    // Also check whenever the tab regains focus - catches the common case
    // of a tab left open in the background across a deploy.
    function onVisible() {
      if (document.visibilityState === "visible") check();
    }
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [checkIntervalMs]);

  return hasUpdate;
}