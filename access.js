// access.js — Sanctuary Club access control
// 8-hour member session + Starter PIN protection

(function () {

  const KEY = "sanctuaryAccess";
  const TIME_KEY = "sanctuaryAccessTime";
  const TTL = 8 * 60 * 60 * 1000;   // 8 hours

  function validSession() {
    const v = sessionStorage.getItem(KEY);
    const t = parseInt(sessionStorage.getItem(TIME_KEY) || "0", 10);

    if (v !== "granted") return false;
    if (!t) return false;

    return (Date.now() - t) < TTL;
  }

  function getToken() {
    return (
      localStorage.getItem("memberToken") ||
      sessionStorage.getItem("memberToken") ||
      localStorage.getItem("authToken") ||
      sessionStorage.getItem("authToken") ||
      ""
    );
  }

  function decodeJwt(token) {
    try {
      const part = token.split(".")[1];
      return JSON.parse(atob(part.replace(/-/g, "+").replace(/_/g, "/")));
    } catch (e) {
      return {};
    }
  }

  function usingStarterPin() {
    const payload = decodeJwt(getToken());
    return payload.starter_pin === true ||
           payload.force_pin_change === true;
  }

  // Pages that never require a member session
  const PUBLIC = new Set([
    "index.html",
    "about.html",
    "admin-login.html",
    "admin-signin.html"
  ]);

  // Pages available before changing the Starter PIN
  const STARTER_ALLOWED = new Set([
    "members-info.html",
    "your-info.html",
    "events-calendar.html",
    "events.html",
    "events-details.html",
    "notices-preview.html",
    "event-booking.html"
  ]);

  const page =
    (location.pathname.split("/").pop() || "index.html").toLowerCase();

  // Public page?
  if (PUBLIC.has(page)) return;

  // Member session required
  if (!validSession()) {
    location.replace("index.html");
    return;
  }

  // Still using Starter PIN?
  if (usingStarterPin() && !STARTER_ALLOWED.has(page)) {

    sessionStorage.setItem(
      "hubGateReason",
      "starter-pin"
    );

    location.replace("members-info.html");
    return;
  }

})();
