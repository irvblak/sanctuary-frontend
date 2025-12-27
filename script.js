/* =========================================================
   Sanctuary Club – Access Gate + Navigation
   ========================================================= */

(function () {
  "use strict";

  /* -----------------------------
     CONFIG
     ----------------------------- */
  const ACCESS_CODE = "SM0185SC";
  const ACCESS_KEY = "sanctuaryAccessGranted";

  /* -----------------------------
     ELEMENTS
     ----------------------------- */
  const accessGate = document.getElementById("access-gate");
  const accessInput = document.getElementById("access-code-input");
  const accessSubmit = document.getElementById("access-submit");
  const accessError = document.getElementById("access-error");

  const navButtons = document.querySelectorAll(".nav-button");

  /* -----------------------------
     STATE
     ----------------------------- */
  const accessGranted = localStorage.getItem(ACCESS_KEY) === "true";

  /* -----------------------------
     HELPERS
     ----------------------------- */
  function showAccessGate() {
    if (accessGate) accessGate.style.display = "block";
  }

  function hideAccessGate() {
    if (accessGate) accessGate.style.display = "none";
  }

  function grantAccess() {
    localStorage.setItem(ACCESS_KEY, "true");
  }

  function denyAccess() {
    if (accessError) accessError.style.display = "block";
  }

  /* -----------------------------
     NAV BUTTON HANDLER
     ----------------------------- */
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const destination = btn.dataset.dest;
      if (!destination) return;

      if (localStorage.getItem(ACCESS_KEY) === "true") {
        window.location.href = destination;
      } else {
        showAccessGate();
        accessInput && accessInput.focus();
        btn.dataset.pendingDest = destination;
      }
    });
  });

  /* -----------------------------
     ACCESS SUBMIT
     ----------------------------- */
  if (accessSubmit) {
    accessSubmit.addEventListener("click", () => {
      const entered = (accessInput.value || "").trim();

      if (entered === ACCESS_CODE) {
        grantAccess();

        const pendingBtn = document.querySelector(
          '.nav-button[data-pending-dest]'
        );

        const destination = pendingBtn
          ? pendingBtn.dataset.pendingDest
          : "events-calendar.html";

        window.location.href = destination;
      } else {
        denyAccess();
      }
    });
  }

  /* -----------------------------
     ENTER KEY SUPPORT
     ----------------------------- */
  if (accessInput) {
    accessInput.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        accessSubmit.click();
      }
    });
  }

  /* -----------------------------
     PASSWORD VISIBILITY TOGGLE
     ----------------------------- */
  document.querySelectorAll(".toggle-visibility").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = btn.previousElementSibling;
      if (!input) return;

      input.type = input.type === "password" ? "text" : "password";
    });
  });

  /* -----------------------------
     AUTO-HIDE GATE IF ALREADY AUTH
     ----------------------------- */
  if (accessGranted) {
    hideAccessGate();
  }

})();
