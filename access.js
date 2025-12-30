// access.js — shared session protection + logout + 1h expiry

(function () {
  try {
    const ACCESS_KEY = "sanctuaryAccess";
    const TIME_KEY = "sanctuaryAccessTime";
    const SESSION_DURATION = 60 * 60 * 1000; // 1 hour in ms

    // ---- PAGE PROTECTION (opt-in only) ----
    if (document.body.dataset.protected === "true") {
      const access = sessionStorage.getItem(ACCESS_KEY);
      const accessTime = sessionStorage.getItem(TIME_KEY);

      if (access !== "granted" || !accessTime) {
        sessionStorage.clear();
        window.location.replace("index.html");
        return;
      }

      const now = Date.now();
      const elapsed = now - parseInt(accessTime, 10);

      if (elapsed > SESSION_DURATION) {
        // Session expired
        sessionStorage.clear();
        window.location.replace("index.html");
        return;
      }
    }

    // ---- LOGOUT HANDLER ----
    document.addEventListener("DOMContentLoaded", () => {
      const logoutLink = document.getElementById("logout-link");
      if (logoutLink) {
        logoutLink.addEventListener("click", (e) => {
          e.preventDefault();
          sessionStorage.clear();
          window.location.replace("index.html");
        });
      }
    });
  } catch (err) {
    // Fail-safe: never hard-lock the site
    console.error("Access guard error:", err);
  }
})();
