// access.js
// ================================
// Sanctuary Club – Access Guard
// Member pages require memberId
// Events page requires access gate only
// ================================

(function () {
  const path = location.pathname.split("/").pop();

  // Pages that only need front-page access (not member login)
  const ACCESS_ONLY_PAGES = [
    "events.html"
  ];

  // Pages that require a member session
  const MEMBER_PAGES = [
    "members-directory.html",
    "your-info.html"
  ];

  const hasMemberSession = !!sessionStorage.getItem("memberId");
  const hasAccessGate =
    sessionStorage.getItem("sanctuaryAccess") === "granted";

  // Member-only pages
  if (MEMBER_PAGES.includes(path)) {
    if (!hasMemberSession) {
      location.replace("index.html");
    }
    return;
  }

  // Access-only pages
  if (ACCESS_ONLY_PAGES.includes(path)) {
    if (!hasAccessGate && !hasMemberSession) {
      location.replace("index.html");
    }
    return;
  }
})();
