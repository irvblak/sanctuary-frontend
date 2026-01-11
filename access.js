// access.js — Sanctuary Club session guard
// SAFE + PAGE-AWARE

document.addEventListener("DOMContentLoaded", () => {
  const ACCESS_KEY = "sanctuaryAccess";
  const TIME_KEY = "sanctuaryAccessTime";
  const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

  const page = location.pathname.split("/").pop();

  // Pages that NEVER require gating
  const ALLOWED_PAGES = [
    "index.html",
    "members-info.html",
    "your-info.html",
    ""
  ];

  if (ALLOWED_PAGES.includes(page)) return;

  const granted = sessionStorage.getItem(ACCESS_KEY) === "granted";
  const accessTime = Number(sessionStorage.getItem(TIME_KEY));

  if (!granted || !accessTime) {
    redirectHome();
    return;
  }

  if (Date.now() - accessTime > SESSION_DURATION) {
    sessionStorage.clear();
    redirectHome();
  }

  function redirectHome() {
    if (!location.pathname.endsWith("index.html")) {
      window.location.replace("index.html");
    }
  }
});
