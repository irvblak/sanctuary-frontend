// access.js — canonical access guard (safe, non-destructive)

(function () {
  const ACCESS_KEY = "sanctuaryAccess";
  const TIME_KEY = "sanctuaryAccessTime";
  const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

  const granted = sessionStorage.getItem(ACCESS_KEY);
  const accessTime = sessionStorage.getItem(TIME_KEY);

  // If no session, redirect (do NOT clear storage here)
  if (granted !== "granted" || !accessTime) {
    window.location.replace("index.html");
    return;
  }

  // Check expiry
  const elapsed = Date.now() - Number(accessTime);
  if (elapsed > SESSION_DURATION) {
    sessionStorage.clear();
    window.location.replace("index.html");
    return;
  }

})();
