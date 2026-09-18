(function () {
  "use strict";

  const TOKEN_KEY = "adminToken";
  const LOGIN_PAGE = "admin-login.html";

  function adminLogout() {
    /*
      Backend Admin and member access are independent.
      Remove only the Admin credential; preserve every member
      PIN/session key so an Admin who is also a member can return
      to Members Hub without signing in again.
    */
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (_) {}

    window.location.replace(LOGIN_PAGE);
  }

  window.scAdminLogout = adminLogout;

  document.addEventListener("click", function (event) {
    const control = event.target.closest(
      "#logoutBtn,#adminLogoutBtn,[data-admin-action='logout']"
    );

    if (!control) return;

    event.preventDefault();
    adminLogout();
  });
})();
