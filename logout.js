// logout.js — drop-in replacement

(function () {
  function doLogout() {
    // Member session gates (covers current + legacy keys)
    sessionStorage.removeItem("sanctuaryAccess");
    sessionStorage.removeItem("sanctuaryAccessTime");
    sessionStorage.removeItem("sanctuaryAccessExpiresAt");
    sessionStorage.removeItem("memberSession");
    sessionStorage.removeItem("memberSessionStart");
    sessionStorage.removeItem("memberSessionExpiresAt");
    sessionStorage.removeItem("session");
    sessionStorage.removeItem("pinVerified");

    // Members Directory short-lived access
    sessionStorage.removeItem("sanctuaryMDAccess");
    sessionStorage.removeItem("sanctuaryMDAccessTime");
    sessionStorage.removeItem("mdToken");
    sessionStorage.removeItem("mdTokenExpiresAt");

    // Admin token (if present)
    localStorage.removeItem("adminToken");

    // Go home
    window.location.href = "index.html";
  }

  // Works with <a id="logout-link">Logout</a> or <button id="logout-link">
  document.addEventListener("click", (e) => {
    const el = e.target.closest("#logout-link");
    if (!el) return;
    e.preventDefault();
    doLogout();
  });
})();
