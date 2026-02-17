<!-- admin-guard.js -->
(function () {
  const TOKEN_KEY = "adminToken"; // ✅ must match admin-login.html

  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    window.location.replace("admin-login.html");
    return;
  }

  // Optional: if you ever want to log out, you can clear it:
  // localStorage.removeItem(TOKEN_KEY);
})();

