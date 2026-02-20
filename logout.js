// logout.js — Sanctuary Club (universal, reliable)

(function () {
  function clearAllSessionKeys() {
    // Member access gate keys (current + legacy)
    const ssKeys = [
      "sanctuaryAccess",
      "sanctuaryAccessTime",
      "sanctuaryAccessExpiresAt",
      "memberSession",
      "memberSessionStart",
      "memberSessionExpiresAt",
      "session",
      "pinVerified",

      // Members Directory short-lived access
      "sanctuaryMDAccess",
      "sanctuaryMDAccessTime",
      "mdToken",
      "mdTokenExpiresAt"
    ];

    ssKeys.forEach(k => sessionStorage.removeItem(k));

    // Admin token (if present)
    localStorage.removeItem("adminToken");
  }

  function doLogout() {
    clearAllSessionKeys();
    window.location.href = "index.html";
  }

  // Catch clicks on ANY common logout control used across your pages
  document.addEventListener("click", (e) => {
    const el = e.target.closest(
      "#logoutBtn, #logout-link, a[href='#logout'], a[data-action='logout'], button[data-action='logout']"
    );
    if (!el) return;
    e.preventDefault();
    doLogout();
  });
})();
