// access.js — canonical access guard (page-aware, safe)

(function () {
  const ACCESS_KEY = "sanctuaryAccess";
  const TIME_KEY = "sanctuaryAccessTime";
  const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

  const currentPage = window.location.pathname.split("/").pop();

  // Pages allowed to render without redirect
  const publicPages = [
    "index.html",
    "members-directory.html"
  ];

  function sessionIsValid() {
    const granted = sessionStorage.getItem(ACCESS_KEY);
    const accessTime = sessionStorage.getItem(TIME_KEY);
    if (granted !== "granted" || !accessTime) return false;
    return Date.now() - Number(accessTime) < SESSION_DURATION;
  }

  // Allow public pages to render
  if (publicPages.includes(currentPage)) {
    return;
  }

  // Enforce access on protected pages
  if (!sessionIsValid()) {
    sessionStorage.clear();
    window.location.replace("index.html");
  }
})();
