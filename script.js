/* =========================================================
   SANCTUARY CLUB – FRONTEND LOGIN + 3-MONTH CALENDAR
   Phase 1 (Demo Only)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     LOGIN PROTECTION
  --------------------------------------------------------- */
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

  // Redirect access to protected pages
  if (protectedPages.includes(currentPage) && currentPage !== "member-login.html") {
    if (!isLoggedIn()) {
      const redirectTarget = encodeURIComponent(currentPage);
      window.location.href = `member-login.html?redirect=${redirectTarget}`;
      return;
    }
  }

  // Intercept hero buttons on homepage
  if (currentPage === "index.html") {
    document.querySelectorAll(".hero-buttons a.hero-button").forEach(link => {
      link.addEventListener("click", event => {
        const target = link.getAttribute("href");
        if (protectedPages.includes(target) && !isLoggedIn()) {
          event.preventDefault();
          window.location.href = `member-login.html?redirect=${encodeURIComponent(target)}`;
        }
      });
    });
  }

  // Login page handler
  if (currentPage === "member-login.html") {
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("LOGIN FORM SUBMITTED"); 

     const email = form.querySelector('input[name="email"]').value.trim();
const pin   = form.querySelector('input[name="pin"]').value.trim();


     const response = await fetch("https://sanctuary-backend-8iqc.onrender.com/auth/login", {
 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pin })
      });

      const result = await response.json();
       
      if (!result.success) {
        alert("Invalid email or PIN. Please try again.");
        return;
      }

      // Store session
      localStorage.setItem("sc_logged_in", "true");
      localStorage.setItem("sc_user_email", result.member.email);

      // Redirect
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect") || "member-profile.html";
      window.location.href = redirect;
    });
  }
}

  // Logout handler
  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", event => {
      event.preventDefault();
      logout();
      window.location.href = "index.html";
    });
  }

  /* ==========================================================
     SMART 3-MONTH CALENDAR (only runs on events-calendar.html)
     ========================================================== */

  function initCalendar() {
    const grid = document.getElementById("calendar-grid");
    const monthLabel = document.getElementById("calendar-month-label");
    const prevBtn = document.getElementById("prev-month");
    const nextBtn = document.getElementById("next-month");

    // Retry until calendar HTML exists
    if (!grid || !monthLabel || !prevBtn || !nextBtn) {
      setTimeout(initCalendar, 100);
      return;
    }

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
        while (currentRow.length < 7) {
          currentRow.push(`<div class="cal-cell empty"></div>`);
        }
        html += `<div class="cal-row">${currentRow.join("")}</div>`;
      }

      grid.innerHTML = html;

      prevBtn.disabled = offset === 0;
      nextBtn.disabled = offset === 2;
    }

    prevBtn.addEventListener("click", () => {
      if (offset > 0) { offset--; buildCalendar(offset); }
    });

    nextBtn.addEventListener("click", () => {
      if (offset < 2) { offset++; buildCalendar(offset); }
    });

   buildCalendar(offset);
  }

  // Start calendar loader
  initCalendar();

});

// ===============================
// TEST: Fetch events from backend
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://sanctuary-backend-8iqc.onrender.com/events")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log("Events fetched from backend:", data);

      const container = document.querySelector(".calendar-container");
      const testNote = document.createElement("div");
      testNote.style.margin = "10px 0";
      testNote.style.padding = "10px";
      testNote.style.background = "#e6ffe6";
      testNote.style.border = "1px solid #99cc99";
      testNote.textContent = `✅ ${data.events.length} events loaded from backend`;
      container.prepend(testNote);
    })
    .catch(error => {
      console.error("Error fetching events:", error);

      const container = document.querySelector(".calendar-container");
      const errorNote = document.createElement("div");
      errorNote.style.margin = "10px 0";
      errorNote.style.padding = "10px";
      errorNote.style.background = "#ffe6e6";
      errorNote.style.border = "1px solid #cc9999";
      errorNote.textContent = "❌ Failed to load events from backend";
      container.prepend(errorNote);
    });
});

