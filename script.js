// Sanctuary Club - Phase 1 frontend "login" prototype
// NOTE: This is ONLY for demonstration.
// It does NOT provide real security and must be replaced later by a real backend.

document.addEventListener("DOMContentLoaded", () => {
  // Which pages should be considered "internal" (members only)
  const protectedPages = [
    "about.html",
    "notices.html",
    "events.html",
    "payments.html",
    "contact.html",
    "member-profile.html",
    "host-event-request.html",
    "admin-panel.html"
  ];

  function getCurrentPage() {
    const path = window.location.pathname;
    const last = path.split("/").pop();
    return last === "" ? "index.html" : last;
  }

  function isLoggedIn() {
    return localStorage.getItem("sc_logged_in") === "true";
  }

  function setLoggedIn(email) {
    localStorage.setItem("sc_logged_in", "true");
    localStorage.setItem("sc_user_email", email);
  }

  function logout() {
    localStorage.removeItem("sc_logged_in");
    localStorage.removeItem("sc_user_email");
  }

  const currentPage = getCurrentPage();

  // 1) Protect internal pages (other than the login page itself)
  if (
    protectedPages.includes(currentPage) &&
    currentPage !== "member-login.html"
  ) {
    if (!isLoggedIn()) {
      const redirectTarget = encodeURIComponent(currentPage);
      window.location.href = `member-login.html?redirect=${redirectTarget}`;
      return; // stop running further code on this page
    }
  }

  // 2) Intercept hero buttons on the homepage (index)
  if (currentPage === "index.html") {
    const heroLinks = document.querySelectorAll(".hero-buttons a.hero-button");
    heroLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        // Only gate the pages we consider protected
        if (href && protectedPages.includes(href) && !isLoggedIn()) {
          event.preventDefault();
          const redirectTarget = encodeURIComponent(href);
          window.location.href = `member-login.html?redirect=${redirectTarget}`;
        }
      });
    });
  }

  // 3) Handle Member Login form behaviour
  if (currentPage === "member-login.html") {
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        const pinInput = form.querySelector('input[type="password"]');

        const email = emailInput ? emailInput.value.trim() : "";
        const pin = pinInput ? pinInput.value.trim() : "";

        if (!email || pin.length !== 4) {
          alert("Please enter your registered email and 4-digit PIN.");
          return;
        }

        // PHASE 1 DEMO ONLY:
        // We accept ANY email + ANY 4-digit PIN.
        // In Phase 2, this will call the backend to validate against the real database.
        setLoggedIn(email);

        // Redirect to originally requested page, or member-profile as default
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get("redirect") || "member-profile.html";
        window.location.href = redirect;
      });
    }
  }

  // 4) (Optional) Simple logout handler, if you add a link with id="logout-link"
  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault();
      logout();
      window.location.href = "index.html";
    });
  }
});

