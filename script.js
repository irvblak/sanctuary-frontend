document.addEventListener("DOMContentLoaded", () => {

  /* ===========================
     CALENDAR INITIALISATION
     =========================== */

  const grid = document.getElementById("calendar-grid");
  const monthLabel = document.getElementById("calendar-month-label");
  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");

  if (!grid || !monthLabel || !prevBtn || !nextBtn) {
    return; // Not on calendar page
  }

  let offset = 0; // 0 = current month, 1 = next, 2 = month after

  function buildCalendar(monthOffset) {
    const today = new Date();
    const firstOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + monthOffset,
      1
    );

    const year = firstOfMonth.getFullYear();
    const month = firstOfMonth.getMonth();

    const monthNames = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];

    monthLabel.textContent = `${monthNames[month]} ${year}`;

    const firstWeekday = firstOfMonth.getDay(); // 0 = Sunday
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Clear grid
    grid.innerHTML = "";

    /* ===== Weekday headers ===== */
    const weekdays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    weekdays.forEach(day => {
      const div = document.createElement("div");
      div.className = "weekday";
      div.textContent = day;
      grid.appendChild(div);
    });

    /* ===== Padding before day 1 ===== */
    const padding = (firstWeekday + 6) % 7; // convert Sunday=0 to Sunday=6
    for (let i = 0; i < padding; i++) {
      const empty = document.createElement("div");
      empty.className = "cal-cell empty";
      grid.appendChild(empty);
    }

    /* ===== Day cells ===== */
    for (let day = 1; day <= totalDays; day++) {
      const cell = document.createElement("div");
      cell.className = "cal-cell day";

      const num = document.createElement("span");
      num.className = "day-number";
      num.textContent = day;

      cell.appendChild(num);
      grid.appendChild(cell);
    }

    prevBtn.disabled = monthOffset === 0;
    nextBtn.disabled = monthOffset === 2;
  }

  prevBtn.addEventListener("click", () => {
    if (offset > 0) {
      offset--;
      buildCalendar(offset);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (offset < 2) {
      offset++;
      buildCalendar(offset);
    }
  });

  buildCalendar(offset);

});
