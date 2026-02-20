// access.js — Sanctuary Club (8-hour member session gate)

(function () {
  const KEY = "sanctuaryAccess";
  const TIME_KEY = "sanctuaryAccessTime";
  const TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

  function hasValidSession() {
    const v = sessionStorage.getItem(KEY);
    const t = parseInt(sessionStorage.getItem(TIME_KEY) || "0", 10);
    const okValue = (v === "granted" || v === "1" || v === "true");
    if (!okValue) return false;
    if (!t) return false;
    return (Date.now() - t) < TTL_MS;
  }

  // Pages allowed without an active member session
  const PUBLIC = new Set([
    "index.html",
    "about.html",
    "member-login.html",
    "admin-login.html",
    "admin-signin.html"
  ]);

  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  // If public page, do nothing
  if (PUBLIC.has(page)) return;

  // Otherwise enforce session
  if (!hasValidSession()) {
    location.replace("member-login.html");
  }
})();
