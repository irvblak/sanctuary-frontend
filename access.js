// access.js — safe access guard (stable, refreshes session)

document.addEventListener("DOMContentLoaded", () => {
  const ACCESS_KEY = "sanctuaryAccess";
  const TIME_KEY = "sanctuaryAccessTime";
  const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

  const granted = sessionStorage.getItem(ACCESS_KEY);
  const accessTime = Number(sessionStorage.getItem(TIME_KEY));

  // No valid session → return to Home
  if (granted !== "granted" || !accessTime) {
    window.location.href = "index.html";
    return;
  }

  // Expired session → clear and return to Home
  if (Date.now() - accessTime > SESSION_DURATION) {
    sessionStorage.clear();
    window.location.href = "index.html";
    return;
  }

  // ✅ SESSION IS VALID — REFRESH TIMER
  sessionStorage.setItem(TIME_KEY, Date.now());
});
