
// =========================================================
// SANCTUARY CLUB – FRONTEND LOGIN + 3-MONTH CALENDAR SYSTEM
// Phase 1 (Demo Only) – No real backend yet
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

  // ---------------------------------------
  //  LOGIN PROTECTION + REDIRECT SYSTEM
  // ---------------------------------------
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
    const p = window.location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
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

  // Protect internal pages
  if (protectedPages.includes(currentPage) && currentPage !== "member-login.html") {
    if (!isLoggedIn()) {
      const redirectTarget = encodeURIComponent(currentPage);
      window.location.href = `member-login.html?redirect=${redirectTarget}`;
      return;
    }
  }

  // Intercept homepage buttons
  if (currentPage === "index.html") {
    const heroLinks = document.querySelectorAll(".hero-buttons a.hero-button");

    heroLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (href && protectedPages.includes(href) && !isLoggedIn()) {
          event.preventDefault();
          const redirectTarget = encodeURIComponent(href);
          window.location.href = `member-login.html?redirect=${redirectTarget}`;
        }
      });
    });
  }

  // Handle login page
  if (currentPage === "member-login.html") {
    const form = document.querySelector("form");

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = form.querySelector('input[type="email"]').value.trim();
        const pin = form.querySelector('input[type="password"]').value.trim();

        if (!email || pin.length !== 4) {
          alert("Please enter your registered email and 4-digit PIN.");
          return;
        }

        // Phase 1 demo only: accept ANY email + ANY 4-digit pin
        setLoggedIn(email);

        const params = new URLSearchParams(window.location.search);
        const redirect = params.get("redirect") || "member-profile.html";
        window.location.href = redirect;
      });
    }
  }

  // Logout handler (works on all pages)
  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault();
      logout();
      window.location.href = "index.html";
    });
  }

  // =========================================================
  // 3-MONTH SMART CALENDAR (Only runs on events-calendar.html)
  // =========================================================
  const grid = document.getElementById("calendar-grid");
  const monthLabel = document.getElementById("calendar-month-label");
  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");

  if (grid) {
    const today = new Date();
    let offset = 0;

    function getMonthData(offset) {
      const base = new Date(today.getFullYear(), today.getMonth() + offset, 1);
      return {
        year: base.getFullYear(),
        monthIndex: base.getMonth(),
        totalDays: new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate(),
        firstWeekday: new Date(base.getFullYear(), base.getMonth(), 1).getDay()
      };
    }

    function buildCalendar(offset) {
      const data = getMonthData(offset);

      const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ];
      monthLabel.textContent = `${monthNames[data.monthIndex]} ${data.year}`;

      const weekdays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
      let html = `<div class="cal-row weekday-row">`;
      weekdays.forEach(d => html += `<div class="cal-cell wk">${d}</div>`);
      html += `</div>`;

      let padding = (data.firstWeekday + 6) % 7;
      let dayCounter = 1;
      let currentRow = [];

      for (let i = 0; i < padding; i++) {
        currentRow.push(`<div class="cal-cell empty"></div>`);
      }

      while (dayCounter <= data.totalDays) {
        currentRow.push(`<div class="cal-cell"><span class="day-number">${dayCounter}</span></div>`);

        if (currentRow.length === 7) {
          html += `<div class="cal-row">${currentRow.join("")}</div>`;
          currentRow = [];
        }

        dayCounter++;
      }

      if (currentRow.length > 0) {
        while (currentRow.length < 7) currentRow.push(`<div class="cal-cell empty"></div>`);
        html += `<div class="cal-row">${currentRow.join("")}</div>`;
      }

      grid.innerHTML = html;

      prevBtn.disabled = (offset === 0);
      nextBtn.disabled = (offset === 2);
    }

    prevBtn.addEventListener("click", () => {
      if (offset > 0) { offset--; buildCalendar(offset); }
    });

    nextBtn.addEventListener("click", () => {
      if (offset < 2) { offset++; buildCalendar(offset); }
    });

    buildCalendar(offset);
  }

});
