// script.js — Gate trigger + eye toggle (NO navigation yet)

document.addEventListener("DOMContentLoaded", () => {
  const gate = document.getElementById("access-gate");
  const whatsOnBtn = document.getElementById("btn-whats-on");
  const infoBtn = document.getElementById("btn-info");
  const eyeBtn = document.querySelector(".toggle-visibility");
  const input = document.getElementById("access-code-input");

  if (!gate || !whatsOnBtn || !infoBtn) {
    console.warn("Gate or buttons not found");
    return;
  }

  function showGate(target) {
    sessionStorage.setItem("requestedPage", target);
    gate.style.display = "block";
    if (input) input.focus();
  }

  whatsOnBtn.addEventListener("click", () => {
    showGate("events-calendar.html");
  });

  infoBtn.addEventListener("click", () => {
    showGate("notices.html");
  });

  // 👁 Toggle visibility
  if (eyeBtn && input) {
    eyeBtn.addEventListener("click", () => {
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      eyeBtn.textContent = isHidden ? "🙈" : "👁";
    });
  }
});
