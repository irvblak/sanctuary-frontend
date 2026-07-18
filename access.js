// access.js — Sanctuary Club access control
// 8-hour front-page session + Starter/default PIN protection

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

  function getMemberToken() {
    return (
      localStorage.getItem("memberToken") ||
      sessionStorage.getItem("memberToken") ||
      localStorage.getItem("authToken") ||
      sessionStorage.getItem("authToken") ||
      ""
    );
  }

  function decodeJwtPayload(token) {
    try {
      const part = token.split(".")[1];
      if (!part) return {};

      const normalised = part
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      return JSON.parse(atob(normalised));
    } catch (e) {
      return {};
    }
  }

  function starterOrDefaultAccess() {
    const token = getMemberToken();

    /*
      Front-page access may create a general Sanctuary session
      without verifying a particular member.

      No member token must therefore be treated as
      Starter/default access.
    */
    if (!token) return true;

    const data = decodeJwtPayload(token);

    return (
      data.starter_pin === true ||
      data.force_pin_change === true
    );
  }

  /*
    Pages needing no Sanctuary front-page session.
  */
  const PUBLIC = new Set([
    "index.html",
    "about.html",
    "admin-login.html",
    "admin-signin.html"
  ]);

  /*
    Pages available through general/Starter access.

    These contain no private resident directory information
    and may be viewed without completing the personal PIN change.
  */
  const STARTER_ALLOWED = new Set([
    "members-info.html",
    "your-info.html",
    "events-calendar.html",
    "events.html",
    "notices-preview.html",
    "events-details.html"
  ]);

  const page =
    (location.pathname.split("/").pop() || "index.html")
      .toLowerCase();

  /*
    Completely public pages.
  */
  if (PUBLIC.has(page)) return;

  /*
    All other Sanctuary pages require a valid
    front-page session first.
  */
  if (!validSession()) {
    location.replace("index.html");
    return;
  }

  /*
    Starter/default access may view the permitted pages above.

    All other pages — including Members Directory and Archives —
    require successful member-PIN verification and completion
    of any compulsory PIN change.
  */
  if (
    starterOrDefaultAccess() &&
    !STARTER_ALLOWED.has(page)
  ) {
    sessionStorage.setItem("hubGateReason", "starter-pin");
    sessionStorage.setItem(
      "hubGateDestination",
      location.pathname + location.search
    );

    location.replace("your-info.html?needPin=1");
    return;
  }
})();
