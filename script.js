/* =========================================================
   SANCTUARY CLUB – FRONTEND ACCESS GATE + 3-MONTH CALENDAR
   LOCKED VERSION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     BASIC HELPERS
  --------------------------------------------------------- */

  function getCurrentPage() {
    const p = window.location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  const accessGranted =
    localStorage.getItem("sanctuaryAccessGranted") === "true";

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

  const currentPage = getCurrentPage();

  /* ---------------------------------------------------------
     GLOBAL PAGE PROTECTION
     (Everything except index.html)
  --------------------------------------------------------- */

  if (currentPage !== "index.html" && !accessGranted) {
    window.location.href = "index.html";
    return;
  }

  /* ---------------------------------------------------------
     ACCESS GATE (INDEX ONLY)
  --------------------------------------------------------- */
const toggleBtn = document.querySelector(".toggle-visibility");

if (toggleBtn && accessInput) {
  toggleBtn.addEventListener("click", () => {
    const isHidden = accessInput.type === "password";
    accessInput.type = isHidden ? "text" : "password";
    toggleBtn.textContent = isHidden ? "🙈" : "👁";
  });
}

  if (currentPage === "index.html") {
    const accessGate   = document.getElementById("access-gate");
    const accessInput  = document.getElementById("access-code-input");
    const accessButton = document.getElementById("access-submit");
    const accessError  = document.getElementById("access-error");

    let pendingDestination = null;

    // Intercept homepage buttons
    document.querySelectorAll(".hero-buttons a.hero-button").forEach(link => {
      link.addEventListener("click", e => {
        if (accessGranted) return;

        e.preventDefault();
        pendingDestination = link.getAttribute("href");

        accessGate.style.display = "block";
        accessError.style.display = "none";
        accessInput.value = "";
        accessInput.focus();
      });
    });

    // Submit access code
    if (accessButton) {
      accessButton.addEventListener("click", async () => {
        const code = accessInput.value.trim();
        if (!code) return;

        try {
          const res = await fetch(
            "https://sanctuary-backend-8iqc.onrender.com/validate-access-code",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code })
            }
          );

          const data = await res.json();

          if (data.valid) {
            localStorage.setItem("sanctuaryAccessGranted", "true");
            window.location.href = pendingDestination || "about.html";
          } else {
            accessError.style.display = "block";
          }
        } catch {
          accessError.style.display = "block";
        }
      });
    }
  }

  /* ==========================================================
     SMART 3-MONTH CALENDAR (events.html only)
     ========================================================== */

  function initCalendar() {
    const grid = document.getElementById("calendar-grid");
    const monthLabel = document.getElementById("calendar-month-label");
    const prevBtn = document.getElementById("prev-month");
    const nextBtn = document.getElementById("next-month");

    if (!grid || !monthLabel || !prevBtn || !nextBtn) return;

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
      let row = [];

      for (let i = 0; i < padding; i++) {
        row.push(`<div class="cal-cell empty"></div>`);
      }

      while (dayCounter <= data.totalDays) {
        row.push(`<div class="cal-cell"><span class="day-number">${dayCounter}</span></div>`);
        if (row.length === 7) {
          html += `<div class="cal-row">${row.join("")}</div>`;
          row = [];
        }
        dayCounter++;
      }

      if (row.length) {
        while (row.length < 7) {
          row.push(`<div class="cal-cell empty"></div>`);
        }
        html += `<div class="cal-row">${row.join("")}</div>`;
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

  initCalendar();
/* ---------------------------------------------------------
   LOGOUT (ALL PAGES)
--------------------------------------------------------- */

const logoutLink = document.getElementById("logout-link");

if (logoutLink) {
  logoutLink.addEventListener("click", e => {
    e.preventDefault();

    // Clear access gate
    localStorage.removeItem("sanctuaryAccessGranted");

    window.location.href = "index.html";
  });
}
});
