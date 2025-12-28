// script.js
// Step 3 — Reliable gate reveal on front page

document.addEventListener("DOMContentLoaded", function () {

  const gate = document.getElementById("access-gate");
  const buttons = document.querySelectorAll(".hero-buttons .hero-button");

  if (!gate || buttons.length < 2) {
    console.warn("Gate or buttons not found");
    return;
  }

  // Ensure gate starts hidden
  gate.style.display = "none";

  function showGate(target) {
    gate.style.display = "block";
    gate.dataset.target = target;

    // Ensure visibility even on small screens
    gate.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  buttons.forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const label = button.textContent.trim();

      if (label.includes("What")) {
        showGate("events-calendar.html");
      } else if (label.includes("Info")) {
        showGate("notices.html");
      }
    });
  });

});
