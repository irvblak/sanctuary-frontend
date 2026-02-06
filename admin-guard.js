(function () {
  const token = localStorage.getItem("admin_token");

  if (!token) {
    // No admin session → send to login
    window.location.replace("admin-login.html");
  }
})();
