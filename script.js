// access.js — global access guard + universal logout

(function () {
  try {
    const granted = localStorage.getItem("sanctuaryAccessGranted");

    const isIndex =
      window.location.pathname.endsWith("/") ||
      window.location.pathname.endsWith("index.html");

    // If not authorised and not on index, bounce home
    if (!isIndex && granted !== "true") {
      window.location.href = "index.html";
      return;
    }

    // If authorised and not index, inject Logout
    if (!isIndex && granted === "true") {
      const nav = document.createElement("div");
      nav.style.position = "fixed";
      nav.style.top = "1rem";
      nav.style.right = "1.25rem";
      nav.style.zIndex = "1000";

      const logout = document.createElement("a");
      logout.href = "#";
      logout.textContent = "Logout";
      logout.style.fontWeight = "600";
      logout.style.color = "#003366";
      logout.style.textDecoration = "none";
      logout.style.cursor = "pointer";

      logout.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("sanctuaryAccessGranted");
        window.location.href = "index.html";
      });

      nav.appendChild(logout);
      document.body.appendChild(nav);
    }

  } catch (err) {
    console.error("Access guard error:", err);
  }
})();
