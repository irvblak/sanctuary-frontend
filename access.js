// access.js — shared session protection + logout (FINAL)

(function () {
  try {
    // ---- PAGE PROTECTION (opt-in only) ----
    if (document.body.dataset.protected === "true") {
      if (sessionStorage.getItem("sanctuaryAccess") !== "granted") {
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
          sessionStorage.removeItem("sanctuaryAccess");
          window.location.replace("index.html");
        });
      }
    });
  } catch (err) {
    // Fail-safe: never hard-lock the site
    console.error("Access guard error:", err);
  }
})();
