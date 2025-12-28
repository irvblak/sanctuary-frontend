// script.js
// Step 5 — Reveal access gate on button click

document.addEventListener("DOMContentLoaded", function () {

  const gate = document.getElementById("access-gate");
  const buttons = document.querySelectorAll(".hero-buttons .hero-button");

  if (!gate || buttons.length === 0) return;

  gate.style.display = "none";

  function showGate(target) {
    gate.style.display = "block";
    gate.dataset.target = target;
    gate.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  buttons.forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      if (button.textContent.includes("What")) {
        showGate("events-calendar.html");
      }

      if (button.textContent.includes("Info")) {
        showGate("notices.html");
      }
    });
  });

});
