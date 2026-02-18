(function () {
  const TOKEN_KEY = "adminToken";
  const LOGIN_PAGE = "admin-login.html";

  const btn = document.getElementById("logoutBtn");
  if (!btn) return;

  btn.addEventListener("click", function () {
    localStorage.removeItem(TOKEN_KEY);
    window.location.replace(LOGIN_PAGE);
  });
})();
