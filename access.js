// access.js
(function () {
  try {
    const granted = localStorage.getItem("sanctuaryAccessGranted");

    // If access not granted, redirect to homepage
    if (granted !== "true") {
      window.location.href = "index.html";
      return;
    }

    // Logout handler (if present on page)
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
      logoutLink.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("sanctuaryAccessGranted");
        window.location.href = "index.html";
      });
    }
  } catch (err) {
    // Fail safe: never block rendering
    console.error("Access guard error:", err);
  }
})();
