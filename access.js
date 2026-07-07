// access.js — Sanctuary Club access control
// 8-hour member session + Starter PIN protection
// Policy:
// - Public pages need no session.
// - All member pages need the front-page access session.
// - Starter PIN / default access may only reach:
//   Members Hub, Your Information, Events Calendar, Events List, Notices.
// - Everything else requires the household PIN to have been changed.

(function () {
  const KEY = "sanctuaryAccess";
  const TIME_KEY = "sanctuaryAccessTime";
  const TTL = 8 * 60 * 60 * 1000; // 8 hours

  function validSession() {
    const v = sessionStorage.getItem(KEY);
    const t = parseInt(sessionStorage.getItem(TIME_KEY) || "0", 10);
    if (v !== "granted") return false;
    if (!t) return false;
    return (Date.now() - t) < TTL;
  }

  function getMemberToken(){
    return localStorage.getItem("memberToken") ||
           sessionStorage.getItem("memberToken") ||
           localStorage.getItem("authToken") ||
           sessionStorage.getItem("authToken") ||
           "";
  }

  function decodeJwtPayload(token){
    try{
      const part = token.split(".")[1];
      return JSON.parse(atob(part.replace(/-/g, "+").replace(/_/g, "/")));
    }catch(e){
      return {};
    }
  }

  function usingStarterPin(){
    const data = decodeJwtPayload(getMemberToken());
    return data.starter_pin === true || data.force_pin_change === true;
  }

  // No front-page member session required
  const PUBLIC = new Set([
    "index.html",
    "about.html",
    "admin-login.html",
    "admin-signin.html"
  ]);

  // Allowed while still using Starter PIN / default access
  const STARTER_ALLOWED = new Set([
    "members-info.html",
    "your-info.html",
    "events-calendar.html",
    "events.html",
    "notices-preview.html"
  ]);

  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  if (PUBLIC.has(page)) return;

  if (!validSession()) {
    location.replace("index.html");
    return;
  }

  if (usingStarterPin() && !STARTER_ALLOWED.has(page)) {
    sessionStorage.setItem("hubGateReason", "starter-pin");
    location.replace("members-info.html");
    return;
  }
})();
