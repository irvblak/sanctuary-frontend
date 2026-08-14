// access.js — Sanctuary Club access control
// 8-hour front-page session, Starter/default PIN protection
// and public What's On / private Info route awareness

(function () {
  "use strict";

  const KEY = "sanctuaryAccess";
  const TIME_KEY = "sanctuaryAccessTime";
  const TTL = 8 * 60 * 60 * 1000;

  /*
    Resident-specific private access is deliberately separate from the
    general 8-hour Sanctuary session. It is granted only after a successful
    Membership Number + Personal PIN login during this browser session.
  */
  const PRIVATE_KEY = "sanctuaryPrivateAccess";
  const PRIVATE_TIME_KEY = "sanctuaryPrivateAccessTime";
  const PRIVATE_TTL = 8 * 60 * 60 * 1000;

  const ROUTE_KEY = "sanctuaryEntryRoute";
  const ROUTE_WHATS_ON = "whats-on";
  const ROUTE_INFO = "info";

  const ROUTE_MESSAGE =
    "To use the other Club facilities, please return Home, " +
    "choose Info and enter or create your personal PIN.";

  function validSession() {
    const value = sessionStorage.getItem(KEY);
    const time = parseInt(sessionStorage.getItem(TIME_KEY) || "0", 10);

    if (value !== "granted") return false;
    if (!time) return false;

    return (Date.now() - time) < TTL;
  }

  function validPrivateSession() {
    const value = sessionStorage.getItem(PRIVATE_KEY);
    const time = parseInt(
      sessionStorage.getItem(PRIVATE_TIME_KEY) || "0",
      10
    );

    if (value !== "granted") return false;
    if (!time) return false;

    if ((Date.now() - time) >= PRIVATE_TTL) {
      clearPrivateSession();
      return false;
    }

    return true;
  }

  function grantPrivateSession() {
    sessionStorage.setItem(PRIVATE_KEY, "granted");
    sessionStorage.setItem(PRIVATE_TIME_KEY, String(Date.now()));
  }

  function clearPrivateSession() {
    sessionStorage.removeItem(PRIVATE_KEY);
    sessionStorage.removeItem(PRIVATE_TIME_KEY);
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

      let normalised = part
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      while (normalised.length % 4) {
        normalised += "=";
      }

      return JSON.parse(atob(normalised));
    } catch (error) {
      return {};
    }
  }

  function tokenHasExpired(data) {
    const exp = Number(data && data.exp);
    return Boolean(exp && Date.now() >= exp * 1000);
  }

  function hasUsablePersonalMemberToken() {
    const token = getMemberToken();
    if (!token) return false;

    const data = decodeJwtPayload(token);
    if (!data || tokenHasExpired(data)) return false;

    return !(
      data.starter_pin === true ||
      data.force_pin_change === true
    );
  }

  function starterOrDefaultAccess() {
    return !hasUsablePersonalMemberToken();
  }

  function verifiedPrivateAccess() {
    return validPrivateSession() && hasUsablePersonalMemberToken();
  }

  function currentRoute() {
    const route = sessionStorage.getItem(ROUTE_KEY);

    if (route === ROUTE_WHATS_ON || route === ROUTE_INFO) {
      return route;
    }

    return "";
  }

  function isWhatsOnRoute() {
    return currentRoute() === ROUTE_WHATS_ON;
  }

  function isInfoRoute() {
    return currentRoute() === ROUTE_INFO;
  }

  function setRoute(route) {
    if (route !== ROUTE_WHATS_ON && route !== ROUTE_INFO) {
      return false;
    }

    sessionStorage.setItem(ROUTE_KEY, route);
    return true;
  }

  function clearRoute() {
    sessionStorage.removeItem(ROUTE_KEY);
  }

  const UNGATED_PAGES = new Set([
    "index.html",
    "about.html",
    "privacy-charter.html",
    "admin-login.html",
    "admin-signin.html"
  ]);

  /*
    Pages available before a personal Membership PIN has been completed.

    Members Directory and Club Information are deliberately absent:
    both now require a valid personal-PIN member session.
  */
  const STARTER_ALLOWED = new Set([
    "members-info.html",
    "your-info.html",
    "events-calendar.html",
    "events.html",
    "events-details.html",
    "forgot-pin.html"
  ]);

  /*
    The public What's On journey contains only the Calendar,
    Events List and individual Event Notices.
  */
  const WHATS_ON_ALLOWED = new Set([
    "events-calendar.html",
    "events.html",
    "events-details.html"
  ]);

  const INFO_ONLY_PAGES = new Set([
    "members-info.html",
    "your-info.html",
    "members-directory.html",
    "library.html",
    "library-publication.html",
    "notices-preview.html",

    "events-activities.html",
    "host-area.html",
    "host-my-events.html",
    "host-event-form.html",
    "host-state-of-play.html",

    "your-design-studio.html",
    "design-studio.html",
    "creative-canvas.html",

    "event-booking.html",
    "booking-management.html",

    "club-roles.html",
    "archives.html",
    "payments.html",
    "services.html"
  ]);

  const page =
    (location.pathname.split("/").pop() || "index.html")
      .toLowerCase();

  function independentlyProtectedPage(pageName) {
    return (
      pageName.startsWith("admin-") ||
      pageName.startsWith("service-")
    );
  }

  function destinationPage(url) {
    try {
      return (
        new URL(url, location.href)
          .pathname
          .split("/")
          .pop() || "index.html"
      ).toLowerCase();
    } catch (error) {
      return "";
    }
  }

  function isInfoOnlyDestination(url) {
    const destination = destinationPage(url);

    if (!destination) return false;
    if (INFO_ONLY_PAGES.has(destination)) return true;

    return (
      destination.startsWith("members-") ||
      destination.startsWith("your-info") ||
      destination.startsWith("host-") ||
      destination.startsWith("your-design-studio") ||
      destination.startsWith("creative-canvas") ||
      destination.startsWith("event-booking") ||
      destination.startsWith("booking-") ||
      destination.startsWith("notices-preview") ||
      destination.startsWith("library") ||
      destination.startsWith("archive") ||
      destination.startsWith("payment")
    );
  }

  function ensureRouteMessageStyles() {
    if (document.getElementById("sanctuary-route-style")) return;

    const style = document.createElement("style");
    style.id = "sanctuary-route-style";
    style.textContent = `
      .sanctuary-route-shade {
        position: fixed;
        inset: 0;
        z-index: 100000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.25rem;
        background: rgba(27, 43, 57, 0.56);
      }

      .sanctuary-route-dialog {
        width: min(540px, 100%);
        padding: 1.6rem;
        border: 1px solid #d9e1e7;
        border-radius: 18px;
        background: #ffffff;
        color: #243746;
        text-align: center;
        box-shadow: 0 18px 48px rgba(0, 0, 0, 0.24);
      }

      .sanctuary-route-lock {
        margin-bottom: 0.5rem;
        font-size: 2rem;
        line-height: 1;
      }

      .sanctuary-route-dialog h2 {
        margin: 0 0 0.8rem;
        color: #254d70;
        font-size: 1.45rem;
      }

      .sanctuary-route-dialog p {
        margin: 0;
        font-size: 1.05rem;
        font-weight: 500;
        line-height: 1.65;
      }

      .sanctuary-route-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem;
        margin-top: 1.25rem;
      }

      .sanctuary-route-actions button,
      .sanctuary-route-actions a {
        min-width: 130px;
        padding: 0.72rem 1rem;
        border: 1px solid #315f82;
        border-radius: 999px;
        font: inherit;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
      }

      .sanctuary-route-home {
        background: #315f82;
        color: #ffffff;
      }

      .sanctuary-route-close {
        background: #ffffff;
        color: #315f82;
      }
    `;

    document.head.appendChild(style);
  }

  function closeRouteMessage() {
    document.getElementById("sanctuary-route-message")?.remove();
  }

  function showRouteMessage() {
    closeRouteMessage();
    ensureRouteMessageStyles();

    const shade = document.createElement("div");
    shade.id = "sanctuary-route-message";
    shade.className = "sanctuary-route-shade";
    shade.setAttribute("role", "dialog");
    shade.setAttribute("aria-modal", "true");
    shade.setAttribute("aria-labelledby", "sanctuary-route-heading");

    shade.innerHTML = `
      <div class="sanctuary-route-dialog">
        <div class="sanctuary-route-lock" aria-hidden="true">🔒</div>
        <h2 id="sanctuary-route-heading">Other Club facilities</h2>
        <p>${ROUTE_MESSAGE}</p>
        <div class="sanctuary-route-actions">
          <a class="sanctuary-route-home" href="index.html">Return Home</a>
          <button class="sanctuary-route-close" type="button">Stay here</button>
        </div>
      </div>
    `;

    document.body.appendChild(shade);

    const closeButton = shade.querySelector(".sanctuary-route-close");
    closeButton?.addEventListener("click", closeRouteMessage);

    shade.addEventListener("click", event => {
      if (event.target === shade) closeRouteMessage();
    });

    document.addEventListener(
      "keydown",
      function escapeHandler(event) {
        if (event.key !== "Escape") return;
        closeRouteMessage();
        document.removeEventListener("keydown", escapeHandler);
      }
    );

    closeButton?.focus();
  }

  function protectPrivateLinks() {
    if (!isWhatsOnRoute()) return;

    document
      .querySelectorAll("a[href], [data-private-destination]")
      .forEach(element => {
        const target =
          element.getAttribute("href") ||
          element.getAttribute("data-private-destination") ||
          "";

        const explicitlyPrivate =
          element.hasAttribute("data-private-route");

        if (
          !explicitlyPrivate &&
          !isInfoOnlyDestination(target)
        ) {
          return;
        }

        element.setAttribute(
          "aria-label",
          `${element.textContent.trim()} — available through Info`
        );

        element.addEventListener("click", event => {
          event.preventDefault();
          event.stopPropagation();
          showRouteMessage();
        });
      });
  }

  window.SanctuaryAccess = Object.freeze({
    routeKey: ROUTE_KEY,

    routes: Object.freeze({
      whatsOn: ROUTE_WHATS_ON,
      info: ROUTE_INFO
    }),

    routeMessage: ROUTE_MESSAGE,

    validSession,
    validPrivateSession,
    grantPrivateSession,
    clearPrivateSession,
    hasUsablePersonalMemberToken,
    verifiedPrivateAccess,
    starterOrDefaultAccess,

    currentRoute,
    isWhatsOnRoute,
    isInfoRoute,

    setRoute,
    clearRoute,

    isInfoOnlyDestination,
    protectPrivateLinks,

    showRouteMessage,
    closeRouteMessage
  });

  if (UNGATED_PAGES.has(page)) {
    return;
  }

  if (!validSession()) {
    clearRoute();
    location.replace("index.html");
    return;
  }

  if (
    isWhatsOnRoute() &&
    !WHATS_ON_ALLOWED.has(page) &&
    !independentlyProtectedPage(page)
  ) {
    sessionStorage.setItem(
      "sanctuaryRouteNotice",
      ROUTE_MESSAGE
    );

    location.replace("index.html");
    return;
  }

  /*
    PRIVATE MEMBER FACILITIES

    A token left in localStorage from an earlier visit is NOT enough.
    The resident must have deliberately verified with Membership Number
    and Personal PIN during the present private session.
  */
  const PRIVATE_MEMBER_PAGES = new Set([
    "members-directory.html",
    "library.html",
    "library-publication.html",

    "events-activities.html",
    "host-area.html",
    "host-my-events.html",
    "host-event-form.html",
    "host-state-of-play.html",

    "your-design-studio.html",
    "design-studio.html",
    "creative-canvas.html",

    "event-booking.html",
    "booking-management.html",

    "club-roles.html",
    "archives.html",
    "payments.html",
    "services.html"
  ]);

  if (
    PRIVATE_MEMBER_PAGES.has(page) &&
    !verifiedPrivateAccess() &&
    !independentlyProtectedPage(page)
  ) {
    sessionStorage.setItem(
      "hubGateReason",
      "personal-pin"
    );

    sessionStorage.setItem(
      "hubGateDestination",
      location.pathname + location.search
    );

    location.replace("your-info.html?needPin=1");
    return;
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      protectPrivateLinks,
      { once: true }
    );
  } else {
    protectPrivateLinks();
  }

})();
