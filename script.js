document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     FRONT PAGE ACCESS GATE CONTROLLER
     ===================================================== */

  const accessGate = document.getElementById("access-gate");
  const accessInput = document.getElementById("access-code-input");
  const accessSubmit = document.getElementById("access-submit");
  const accessError = document.getElementById("access-error");
  const navButtons = document.querySelectorAll(".nav-button");

  let pendingDestination = null;

  // Your shared access code (single source of truth)
  const ACCESS_CODE = "SM0185SC";

  // Handle navigation button clicks
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const granted = localStorage.getItem("sanctuaryAccessGranted");

      if (granted === "true") {
        window.location.href = btn.dataset.dest;
      } else {
        pendingDestination = btn.dataset.dest;
        accessGate.style.display = "block";
        accessInput.focus();
      }
    });
  });

  // Handle access submission
  if (accessSubmit) {
    accessSubmit.addEventListener("click", () => {
      const entered = accessInput.value.trim();

      if (entered === ACCESS_CODE) {
        localStorage.setItem("sanctuaryAccessGranted", "true");
        accessError.style.display = "none";

        if (pendingDestination) {
          window.location.href = pendingDestination;
        }
      } else {
        accessError.style.display = "block";
      }
    });
  }

  // Allow Enter key to submit
  if (accessInput) {
    accessInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        accessSubmit.click();
      }
    });
  }

});
