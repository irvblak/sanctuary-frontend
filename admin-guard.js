(function () {
  const TOKEN_KEY = "admin_token";

  // If no admin token is present, redirect to admin login
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    window.location.replace("admin-login.html");
  }
})();
