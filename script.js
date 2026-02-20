// script.js — Sanctuary Club front-page Access Code gate
// Front page buttons prompt for code once, then go directly to target

(function () {

  const ACCESS_KEY = "sanctuaryAccess";
  const TIME_KEY = "sanctuaryAccessTime";
  const TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

  // 🔑 CHANGE THIS to your real front-page Access code
  const ACCESS_CODE = "WXYZ";

  function hasValidAccess() {
    const v = sessionStorage.getItem(ACCESS_KEY);
    const t = parseInt(sessionStorage.getItem(TIME_KEY) || "0", 10);
    if (v !== "granted") return false;
    if (!t) return false;
    return (Date.now() - t) < TTL_MS;
  }

  function grantAccess() {
    sessionStorage.setItem(ACCESS_KEY, "granted");
    sessionStorage.setItem(TIME_KEY, String(Date.now()));
  }

  function askAccessCode() {
    const entered = (prompt("Enter Sanctuary Club access code:") || "")
      .trim()
      .toUpperCase();

    if (!entered) return false;

    if (entered !== ACCESS_CODE) {
      alert("Incorrect access code.");
      return false;
    }

    grantAccess();
    return true;
  }

  function go(target) {
    window.location.href = target;
  }

  // Handles front-page buttons that use data-target
  document.addEventListener("click", (e) => {

    const btn = e.target.closest(".hero-button");
    if (!btn) return;

    const target = btn.getAttribute("data-target");
    if (!target) return;

    // Pages that require access code
    const needsAccess =
      target.includes("events-calendar.html") ||
      target.includes("your-info.html") ||
      target.includes("members-info.html") ||
      target.includes("members-directory.html");

    if (!needsAccess) return go(target);

    if (hasValidAccess()) return go(target);

    if (askAccessCode()) return go(target);

  });

})();
