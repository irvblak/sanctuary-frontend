// access.js — Sanctuary Club access control
// 8-hour front-page session, Personal PIN protection,
// What's On / Library route, Info route,
// and restricted Just for fun access to the Design Studio.

(function () {
  "use strict";

  const KEY = "sanctuaryAccess";
  const TIME_KEY = "sanctuaryAccessTime";
  const TTL = 8 * 60 * 60 * 1000;

  const PRIVATE_KEY = "sanctuaryPrivateAccess";
  const PRIVATE_TIME_KEY = "sanctuaryPrivateAccessTime";
  const PRIVATE_TTL = 8 * 60 * 60 * 1000;

  const ROUTE_KEY = "sanctuaryEntryRoute";
  const ROUTE_WHATS_ON = "whats-on";
  const ROUTE_INFO = "info";

  const ROUTE_MESSAGE =
    "To see member information and private Club facilities, please return Home, " +
    "choose Info and enter your Membership Number and Personal PIN.";

  function validSession() {
    const value = sessionStorage.getItem(KEY);
    const time = parseInt(
      sessionStorage.getItem(TIME_KEY) || "0",
      10
    );

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

    return Boolean(
      exp &&
      Date.now() >= exp * 1000
    );
  }

  function hasUsablePersonalMemberToken() {
    const token = getMemberToken();

    if (!token) return false;

    const data = decodeJwtPayload(token);

    if (!data || tokenHasExpired(data)) {
      return false;
    }

    return !(
      data.starter_pin === true ||
      data.force_pin_change === true
    );
  }

  function starterOrDefaultAccess() {
    return !hasUsablePersonalMemberToken();
  }

  function verifiedPrivateAccess() {
    return (
      validPrivateSession() &&
      hasUsablePersonalMemberToken()
    );
  }

  function currentRoute() {
    const route = sessionStorage.getItem(ROUTE_KEY);

    if (
      route === ROUTE_WHATS_ON ||
      route === ROUTE_INFO
    ) {
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
    if (
      route !== ROUTE_WHATS_ON &&
      route !== ROUTE_INFO
    ) {
      return false;
    }

    sessionStorage.setItem(ROUTE_KEY, route);
    return true;
  }

  function clearRoute() {
    sessionStorage.removeItem(ROUTE_KEY);
  }

  /*
    Pages needing no Sanctuary front-page session.
  */
  const UNGATED_PAGES = new Set([
    "index.html",
    "about.html",
    "privacy-charter.html",
    "admin-login.html",
    "admin-signin.html"
  ]);

  /*
    Pages available before a Personal PIN has been completed.
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
    WHAT'S ON / LIBRARY

    These pages are available through the Access Code route
    without Personal PIN verification.
  */
  const WHATS_ON_ALLOWED = new Set([
    "events-calendar.html",
    "events.html",
    "events-details.html",
    "notices-preview.html",
    "library.html",
    "library-publications.html"
    "website-helpers.html"
  ]);

  /*
    Private member facilities.

    host-area.html is the actual Your Design Studio page.
    Ordinary access to it remains private.

    The two explicit ?fun= routes are dealt with separately below.
  */
  const INFO_ONLY_PAGES = new Set([
    "members-info.html",
    "your-info.html",
    "members-directory.html",

    "events-activities.html",
    "host-area.html",
    "host-my-events.html",
    "host-event-form.html",
    "host-state-of-play.html",

    "event-booking.html",
    "booking-management.html",

    "club-roles.html",
    "archives.html",
    "payments.html",
    "services.html"
  ]);

  const page =
    (
      location.pathname.split("/").pop() ||
      "index.html"
    ).toLowerCase();

  /*
    JUST FOR FUN

    Only these two URLs receive the special lower-access route:

      host-area.html?fun=write
      host-area.html?fun=create

    Plain host-area.html remains fully protected.
  */
  function isFunStudioUrl(url = location.href) {
    try {
      const parsed = new URL(url, location.href);

      const destination =
        (
          parsed.pathname.split("/").pop() ||
          "index.html"
        ).toLowerCase();

      if (destination !== "host-area.html") {
        return false;
      }

      const fun =
        (
          parsed.searchParams.get("fun") ||
          ""
        ).toLowerCase();

      return (
        fun === "write" ||
        fun === "create"
      );

    } catch (error) {
      return false;
    }
  }

  function isFunStudioPage() {
    return (
      page === "host-area.html" &&
      isFunStudioUrl(location.href)
    );
  }

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
          .pop() ||
        "index.html"
      ).toLowerCase();

    } catch (error) {
      return "";
    }
  }

  function isInfoOnlyDestination(url) {
    const destination = destinationPage(url);

    if (!destination) return false;

    /*
      Explicit Just for fun Studio links are deliberately
      exempt from normal Host Area protection.
    */
    if (isFunStudioUrl(url)) {
      return false;
    }

    if (INFO_ONLY_PAGES.has(destination)) {
      return true;
    }

    return (
      destination.startsWith("members-") ||
      destination.startsWith("your-info") ||
      destination.startsWith("host-") ||
      destination.startsWith("event-booking") ||
      destination.startsWith("booking-") ||
      destination.startsWith("archive") ||
      destination.startsWith("payment")
    );
  }

  function ensureRouteMessageStyles() {
    if (
      document.getElementById(
        "sanctuary-route-style"
      )
    ) {
      return;
    }

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
    document
      .getElementById(
        "sanctuary-route-message"
      )
      ?.remove();
  }

  function showRouteMessage() {
    closeRouteMessage();
    ensureRouteMessageStyles();

    const shade = document.createElement("div");

    shade.id = "sanctuary-route-message";
    shade.className = "sanctuary-route-shade";

    shade.setAttribute(
      "role",
      "dialog"
    );

    shade.setAttribute(
      "aria-modal",
      "true"
    );

    shade.setAttribute(
      "aria-labelledby",
      "sanctuary-route-heading"
    );

    shade.innerHTML = `
      <div class="sanctuary-route-dialog">

        <div
          class="sanctuary-route-lock"
          aria-hidden="true"
        >
          🔒
        </div>

        <h2 id="sanctuary-route-heading">
          There’s more inside
        </h2>

        <p>
          ${ROUTE_MESSAGE}
          If you would like a little help getting started,
          ask one of our Website Helpers.
        </p>

        <div class="sanctuary-route-actions">

          <a
            class="sanctuary-route-home"
            href="index.html"
          >
            Return Home
          </a>

          <button
            class="sanctuary-route-close"
            type="button"
          >
            Stay here
          </button>

        </div>

      </div>
    `;

    document.body.appendChild(shade);

    const closeButton =
      shade.querySelector(
        ".sanctuary-route-close"
      );

    closeButton?.addEventListener(
      "click",
      closeRouteMessage
    );

    shade.addEventListener(
      "click",
      event => {
        if (event.target === shade) {
          closeRouteMessage();
        }
      }
    );

    document.addEventListener(
      "keydown",
      function escapeHandler(event) {

        if (event.key !== "Escape") {
          return;
        }

        closeRouteMessage();

        document.removeEventListener(
          "keydown",
          escapeHandler
        );
      }
    );

    closeButton?.focus();
  }

  function protectPrivateLinks() {
    if (!isWhatsOnRoute()) {
      return;
    }

    document
      .querySelectorAll(
        "a[href], [data-private-destination]"
      )
      .forEach(element => {

        const target =
          element.getAttribute("href") ||
          element.getAttribute(
            "data-private-destination"
          ) ||
          "";

        /*
          Do not interfere with the two explicit
          Just for fun Studio links.
        */
        if (isFunStudioUrl(target)) {
          return;
        }

        const explicitlyPrivate =
          element.hasAttribute(
            "data-private-route"
          );

        if (
          !explicitlyPrivate &&
          !isInfoOnlyDestination(target)
        ) {
          return;
        }

        element.setAttribute(
          "aria-label",
          `${
            element.textContent.trim()
          } — available through Info`
        );

        element.addEventListener(
          "click",
          event => {
            event.preventDefault();
            event.stopPropagation();
            showRouteMessage();
          }
        );
      });
  }

  window.SanctuaryAccess =
    Object.freeze({

      routeKey: ROUTE_KEY,

      routes:
        Object.freeze({
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

      isFunStudioUrl,
      isFunStudioPage,

      protectPrivateLinks,

      showRouteMessage,
      closeRouteMessage
    });

  /*
    Ungated pages need no further action.
  */
  if (UNGATED_PAGES.has(page)) {
    return;
  }

  /*
    Every other page first requires a valid
    Sanctuary front-page session.
  */
  if (!validSession()) {
    clearRoute();

    location.replace(
      "index.html"
    );

    return;
  }

  /*
    WHAT'S ON / LIBRARY ROUTE

    The ordinary open-access destinations are allowed,
    together with the two explicit Just for fun Studio URLs.

    Plain host-area.html is NOT allowed here.
  */
  if (
    isWhatsOnRoute() &&
    !WHATS_ON_ALLOWED.has(page) &&
    !isFunStudioPage() &&
    !independentlyProtectedPage(page)
  ) {
    sessionStorage.setItem(
      "sanctuaryRouteNotice",
      ROUTE_MESSAGE
    );

    location.replace(
      "index.html"
    );

    return;
  }

  /*
    PRIVATE MEMBER FACILITIES

    A stored member token alone is not enough.
    Personal PIN verification must have established
    the private Sanctuary session.

    The two explicit Just for fun Host Area URLs
    are deliberately exempt.
  */
  const PRIVATE_MEMBER_PAGES =
    new Set([
      "members-directory.html",

      "events-activities.html",
      "host-area.html",
      "host-my-events.html",
      "host-event-form.html",
      "host-state-of-play.html",

      "event-booking.html",
      "booking-management.html",

      "club-roles.html",
      "archives.html",
      "payments.html",
      "services.html"
    ]);

  if (
    PRIVATE_MEMBER_PAGES.has(page) &&
    !isFunStudioPage() &&
    !verifiedPrivateAccess() &&
    !independentlyProtectedPage(page)
  ) {
    sessionStorage.setItem(
      "hubGateReason",
      "personal-pin"
    );

    sessionStorage.setItem(
      "hubGateDestination",
      location.pathname +
      location.search
    );

    location.replace(
      "your-info.html?needPin=1"
    );

    return;
  }

  /*
    Once a What's On / Library page has loaded,
    intercept any links leading onwards into
    private Club facilities.

    Just for fun links remain available.
  */
  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      protectPrivateLinks,
      { once: true }
    );

  } else {
    protectPrivateLinks();
  }

})();
