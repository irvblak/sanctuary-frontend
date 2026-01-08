// access.js — safe access guard (DOM-safe)

document.addEventListener("DOMContentLoaded", () => {
  const ACCESS_KEY = "sanctuaryAccess";
  const TIME_KEY = "sanctuaryAccessTime";
  const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

  const granted = sessionStorage.getItem(ACCESS_KEY);
  const accessTime = sessionStorage.getItem(TIME_KEY);

  if (granted !== "granted" || !accessTime) {
   window.location.href = "index.html";
 
    return;
  }

  const elapsed = Date.now() - Number(accessTime);
  if (elapsed > SESSION_DURATION) {
    sessionStorage.clear();
    window.location.href = "index.html";

  }
});
