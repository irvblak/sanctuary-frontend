// access.js — Sanctuary Club access control
// 8-hour front-page session + Starter/default access protection

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
      if (!part) return {};
      return JSON.parse(atob(part.replace(/-/g, "+").replace(/_/g, "/")));
    }catch(e){
      return {};
    }
  }

  function starterOrDefaultAccess(){
    const token = getMemberToken();

    // Important:
    // WXYZ front-page access may create a general session but no member token.
    // That must be treated as default/Starter access.
    if (!token) return true;

    const data = decodeJwtPayload(token);

    return data.starter_pin === true ||
           data.force_pin_change === true;
  }

  // No member session required
  const PUBLIC = new Set([
    "index.html",
    "about.html",
    "admin-login.html",
    "admin-signin.html"
  ]);

  // Allowed with default/Starter access
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

  if (starterOrDefaultAccess() && !STARTER_ALLOWED.has(page)) {
    sessionStorage.setItem("hubGateReason", "starter-pin");
    location.replace("members-info.html");
    return;
  }
})();
