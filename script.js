/* =========================================================
   SANCTUARY CLUB – FRONTEND LOGIN + 3-MONTH CALENDAR
   Phase 1 (Locked Access + Member Login)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     HELPERS
  --------------------------------------------------------- */
  function getCurrentPage() {
    const p = window.location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  function isLoggedIn() {
    return localStorage.getItem("sc_logged_in") === "true";
  }

  function logout() {
    localStorage.removeItem("sc_logged_in");
    localStorage.removeItem("sc_user_email");
  }

  const currentPage = getCurrentPage();

  /* ---------------------------------------------------------
     ACCESS CODE GATE — HOMEPAGE ONLY
  --------------------------------------------------------- */
  const accessGranted =
    localStorage.getItem("sanctuaryAccessGranted") === "true";

  const accessGate = document.getElementById("access-gate");
  const accessInput = document.getElementById("access-code-input");
  const accessButton = document.getElementById("access-submit");
  const accessError = document.getElementById("access-error");

  let pendingDestination = null;

  if (currentPage === "index.html") {
    document
      .querySelectorAll(".hero-buttons a.hero-button")
      .forEach(link => {
        link.addEventListener("click", e => {
          if (accessGranted) return;

          e.preventDefault();
          pendingDestination = link.getAttribute("href");
          accessGate.style.display = "block";
          accessInput.focus();
        });
      });
  }

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
          window.location.href = pendingDestination || "index.html";
        } else {
          accessError.style.display = "block";
        }
      } catch {
        accessError.style.display = "block";
      }
    });
  }

  /* ---------------------------------------------------------
     MEMBER LOGIN PROTECTION (POST-GATE)
  --------------------------------------------------------- */
  const protectedPages = [
    "about.html",
    "notices.html",
    "events-calendar.html",
    "payments.html",
    "contact.html",
    "member-profile.html",
    "host-event-request.html",
    "admin-panel.html"
  ];

  if (
    protectedPages.includes(currentPage) &&
    currentPage !== "member-login.html"
  ) {
    if (!isLoggedIn()) {
      const redirectTarget = encodeURIComponent(currentPage);
      window.location.href =
        `member-login.html?redirect=${redirectTarget}`;
      return;
    }
  }

  /* ---------------------------------------------------------
     MEMBER LOGIN PAGE
  --------------------------------------------------------- */
  if (currentPage === "member-login.html") {
    const form = document.querySelector("form");

    if (form) {
      form.addEventListener("submit", async e => {
        e.preventDefault();

        const email =
          form.querySelector('input[name="email"]').value.trim();
        const pin =
          form.querySelector('input[name="pin"]').value.trim();

        const response = await fetch(
          "https://sanctuary-backend-8iqc.onrender.com/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, pin })
          }
        );

        const result = await response.json();

        if (!result.success) {
          alert("Invalid email or PIN. Please try again.");
          return;
        }

        localStorage.setItem("sc_logged_in", "true");
        localStorage.setItem("sc_user_email", result.member.email);

        const params = new URLSearchParams(window.location.search);
        const redirect =
          params.get("redirect") || "member-profile.html";

        window.location.href = redirect;
      });
    }
  }

  /* ---------------------------------------------------------
     LOGOUT
  --------------------------------------------------------- */
  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", e => {
      e.preventDefault();
      logout();
      window.location.href = "index.html";
    });
  }

  /* ==========================================================
     SMART 3-MONTH CALENDAR (events-calendar.html)
     ========================================================== */
  function initCalendar() {
    const grid = document.getElementById("calendar-grid");
    const monthLabel =
      document.getElementById("calendar-month-label");
    const prevBtn = document.getElementById("prev-month");
    const nextBtn = document.getElementById("next-month");

    if (!grid || !monthLabel || !prevBtn || !nextBtn) {
      return;
    }

    const today = new Date();
    let offset = 0;

    function getMonthData(offset) {
      const base = new Date(
        today.getFullYear(),
        today.getMonth() + offset,
        1
      );
      return {
        year: base.getFullYear(),
        monthIndex: base.getMonth(),
        totalDays: new Date(
          base.getFullYear(),
          base.getMonth() + 1,
          0
        ).getDate(),
        firstWeekday: new Date(
          base.getFullYear(),
          base.getMonth(),
          1
        ).getDay()
      };
    }

    function buildCalendar(offset) {
      const data = getMonthData(offset);
      const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ];

      monthLabel.textContent =
        `${monthNames[data.monthIndex]} ${data.year}`;

      const weekdays =
        ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

      let html = `<div class="cal-row weekday-row">`;
      weekdays.forEach(d =>
        html += `<div class="cal-cell wk">${d}</div>`
      );
      html += `</div>`;

      let padding = (data.firstWeekday + 6) % 7;
      let day = 1;
      let row = [];

      for (let i = 0; i < padding; i++) {
        row.push(`<div class="cal-cell empty"></div>`);
      }

      while (day <= data.totalDays) {
        row.push(
          `<div class="cal-cell">
             <span class="day-number">${day}</span>
           </div>`
        );
        if (row.length === 7) {
          html += `<div class="cal-row">${row.join("")}</div>`;
          row = [];
        }
        day++;
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

    prevBtn.onclick = () => {
      if (offset > 0) buildCalendar(--offset);
    };

    nextBtn.onclick = () => {
      if (offset < 2) buildCalendar(++offset);
    };

    buildCalendar(offset);
  }

  initCalendar();

});

/* ==========================================================
   TEST: FETCH EVENTS
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".calendar-container");
  if (!container) return;

  fetch("https://sanctuary-backend-8iqc.onrender.com/events")
    .then(r => r.json())
    .then(data => {
      const note = document.createElement("div");
      note.textContent = `✅ ${data.events.length} events loaded`;
      note.style.background = "#e6ffe6";
      note.style.padding = "10px";
      container.prepend(note);
    })
    .catch(() => {
      const note = document.createElement("div");
      note.textContent = "❌ Failed to load events";
      note.style.background = "#ffe6e6";
      note.style.padding = "10px";
      container.prepend(note);
    });
});
