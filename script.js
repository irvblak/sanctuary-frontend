// script.js — Gate trigger + eye toggle (robust)

document.addEventListener("DOMContentLoaded", () => {
  const gate = document.getElementById("access-gate");
  const whatsOnBtn = document.getElementById("btn-whats-on");
  const infoBtn = document.getElementById("btn-info");

  const input = document.getElementById("access-code-input");
  const eyeBtn = document.getElementById("access-eye");

  // ---------- Gate trigger ----------
  function showGate(target) {
    if (!gate) return;
    sessionStorage.setItem("requestedPage", target);
    gate.style.display = "block";
    if (input) input.focus();
  }

  if (whatsOnBtn) {
    whatsOnBtn.addEventListener("click", () => {
      showGate("events-calendar.html");
    });
  }

  if (infoBtn) {
    infoBtn.addEventListener("click", () => {
      showGate("notices.html");
    });
  }

  // ---------- 👁 Toggle visibility ----------
  if (eyeBtn && input) {
    eyeBtn.addEventListener("click", () => {
      if (input.type === "password") {
        input.type = "text";
        eyeBtn.textContent = "🙈";
      } else {
        input.type = "password";
        eyeBtn.textContent = "👁";
      }
    });
  }
});
