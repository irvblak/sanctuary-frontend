// access.js — shared access guard + logout + session expiry

(function () {
  try {
    // ================================
    // CONFIG
    // ================================
    const ACCESS_KEY = "sanctuaryAccess";
    const TIME_KEY = "sanctuaryAccessTime";

    // 1 hour = 60 minutes × 60 seconds × 1000 ms
    const SESSION_DURATION = 60 * 60 * 1000;

    // ================================
    // ACCESS CHECK
    // ================================
    const granted = sessionStorage.getItem(ACCESS_KEY);
    const accessTime = sessionStorage.getItem(TIME_KEY);

    // If missing data, deny access
    if (granted !== "granted" || !accessTime) {
      sessionStorage.clear();
      window.location.href = "index.html";
      return;
    }

    // Check expiry
    const now = Date.now();
    const elapsed = now - Number(accessTime);

    if (elapsed > SESSION_DURATION) {
      sessionStorage.clear();
      window.location.href = "index.html";
      return;
    }

    // ================================
    // LOGOUT HANDLER
    // ================================
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
      logoutLink.addEventListener("click", function (e) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = "index.html";
      });
    }

  } catch (err) {
    // Fail safe: never block rendering
    console.error("Access guard error:", err);
  }
})();
