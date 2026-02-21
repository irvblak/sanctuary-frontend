// access.js — Sanctuary Club member session gate (8 hours)
// If not in session, bounce to the front page (index.html)

(function () {
  const KEY = "sanctuaryAccess";
  const TIME_KEY = "sanctuaryAccessTime";
  const TTL = 8 * 60 * 60 * 1000; // 8 hours

  function validSession() {
    const v = sessionStorage.getItem(KEY);
    const t = parseInt(sessionStorage.getItem(TIME_KEY) || "0", 10);
    if (v !== "granted") return false;
    if (!t) return false;
    return (Date.now() - t) < TTL;
  }

  // Public pages (no session required)
  const PUBLIC = new Set([
    "index.html",
    "about.html",
    "admin-login.html",
    "admin-signin.html"
  ]);

  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (PUBLIC.has(page)) return;

  if (!validSession()) location.replace("index.html");
})();
