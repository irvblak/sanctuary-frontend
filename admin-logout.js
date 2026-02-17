(function () {

  const TOKEN_KEY = "adminToken";
  const LOGIN_PAGE = "admin-login.html";

  const btn = document.getElementById("logoutBtn");

  // If the page doesn't have a logout button, do nothing safely
  if (!btn) return;

  btn.addEventListener("click", function () {

    // Remove admin session
    localStorage.removeItem(TOKEN_KEY);

    // Redirect cleanly (no back-button return)
    window.location.replace(LOGIN_PAGE);

  });

})();
