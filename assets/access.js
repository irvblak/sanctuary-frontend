// access.js
(function () {
  const ACCESS_KEY = "sanctuaryAccessGranted";

  function hasAccess() {
    return localStorage.getItem(ACCESS_KEY) === "true";
  }

  // Pages that do NOT require access
  const publicPages = ["index.html"];

  const currentPage = window.location.pathname.split("/").pop();

  if (!publicPages.includes(currentPage) && !hasAccess()) {
    window.location.href = "index.html";
  }

  // Logout helper
  window.sanctuaryLogout = function () {
    localStorage.removeItem(ACCESS_KEY);
    window.location.href = "index.html";
  };
})();
