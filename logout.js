// logout.js — Sanctuary Club (universal logout handler)

(function () {
  function doLogout() {
    // Member access gate keys (current + legacy)
    [
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
    ].forEach(k => sessionStorage.removeItem(k));

    // Admin token (if present)
    localStorage.removeItem("adminToken");

    // Go home
    window.location.href = "index.html";
  }

  function isLogoutEl(el) {
    if (!el) return false;

    const id = (el.id || "").toLowerCase();
    if (id.includes("logout")) return true;                 // logoutBtn, logout-link, etc.

    const action = (el.getAttribute("data-action") || "").toLowerCase();
    if (action === "logout") return true;

    const href = (el.getAttribute("href") || "").toLowerCase();
    if (href === "#logout") return true;

    const txt = (el.textContent || "").trim().toLowerCase();
    if (txt === "logout" || txt === "log out") return true;

    return false;
  }

  document.addEventListener("click", (e) => {
    const candidate = e.target.closest("a,button");
    if (!isLogoutEl(candidate)) return;
    e.preventDefault();
    doLogout();
  });
})();
