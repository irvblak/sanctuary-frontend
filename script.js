// =====================================================
// Sanctuary Club — Secondary Page Access Guard + Logout
// Applies to: Calendar, Info, future internal pages
// =====================================================

(function () {
  try {
    // Check access flag (must match index.js exactly)
    const granted = localStorage.getItem("sanctuaryAccessGranted");

    // If access not granted, return to homepage
    if (granted !== "true") {
      window.location.replace("index.html");
      return;
    }

    // Logout handler (if present)
    const logoutLink = document.getElementById("logout-link");

    if (logoutLink) {
      logoutLink.addEventListener("click", function (e) {
        e.preventDefault();

        // Clear access
        localStorage.removeItem("sanctuaryAccessGranted");

        // Return to homepage
        window.location.replace("index.html");
      });
    }

  } catch (err) {
    // Fail-safe: never block rendering
    console.error("Access guard error:", err);
  }
})();
