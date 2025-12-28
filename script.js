// script.js
// Step 3 — Front page gate reveal only

document.addEventListener("DOMContentLoaded", function () {

  const whatsOnBtn = document.querySelector('a[href="events-calendar.html"]');
  const infoBtn = document.querySelector('a[href="notices.html"]');
  const gate = document.getElementById("access-gate");

  // Safety check
  if (!gate || !whatsOnBtn || !infoBtn) return;

  // Ensure gate starts hidden
  gate.style.display = "none";

  function showGate(targetPage) {
    gate.style.display = "block";
    gate.dataset.target = targetPage;
  }

  // Intercept button clicks
  whatsOnBtn.addEventListener("click", function (e) {
    e.preventDefault();
    showGate("events-calendar.html");
  });

  infoBtn.addEventListener("click", function (e) {
    e.preventDefault();
    showGate("notices.html");
  });

});
