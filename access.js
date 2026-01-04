// access.js
// -------------------------------------------------
// Purpose:
// - Enforce member-only access
// - Optionally expire session
// -------------------------------------------------

(function () {
  const ACCESS_KEY = "sanctuaryAccess";
  const TIME_KEY = "sanctuaryAccessTime";

  // 1 hour session
  const SESSION_DURATION = 60 * 60 * 1000;

  const granted = sessionStorage.getItem(ACCESS_KEY);
  const accessTime = sessionStorage.getItem(TIME_KEY);

  // Not logged in
  if (granted !== "true" || !accessTime) {
    sessionStorage.clear();
    window.location.href = "index.html";
    return;
  }

  // Expired session
  const elapsed = Date.now() - Number(accessTime);
  if (elapsed > SESSION_DURATION) {
    sessionStorage.clear();
    window.location.href = "index.html";
  }
})();
