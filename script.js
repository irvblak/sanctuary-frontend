// access.js — secondary page access guard + logout
// Applies to: Calendar, Info, and any future internal pages

(function () {
  try {
    // Check session access
    const granted = sessionStorage.getItem("siteAccessGranted");

    // If access not granted, return to homepage
    if (granted !== "true") {
      window.location.replace("index.html");
      return;
    }

    // Attach logout handler if link exists
    const logoutLink = document.getElementById("logout-link");

    if (logoutLink) {
      logoutLink.addEventListener("click", function (e) {
        e.preventDefault();

        // Clear session access
        sessionStorage.removeItem("siteAccessGranted");

        // Return to homepage
        window.location.replace("index.html");
      });
    }

  } catch (err) {
    // Fail safe: never block rendering
    console.error("Access guard error:", err);
  }
})();
