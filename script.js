// script.js — Home page gate trigger ONLY
// No navigation, no validation yet

document.addEventListener("DOMContentLoaded", () => {
  const gate = document.getElementById("access-gate");
  const whatsOnBtn = document.getElementById("btn-whats-on");
  const infoBtn = document.getElementById("btn-info");

  if (!gate || !whatsOnBtn || !infoBtn) {
    console.warn("Gate or buttons not found");
    return;
  }

  function showGate(target) {
    // Remember where user wanted to go (later use)
    sessionStorage.setItem("requestedPage", target);

    // Show gate
    gate.style.display = "block";

    // Focus input
    const input = document.getElementById("access-code-input");
    if (input) input.focus();
  }

  whatsOnBtn.addEventListener("click", () => {
    showGate("events-calendar.html");
  });

  infoBtn.addEventListener("click", () => {
    showGate("notices.html");
  });
});
