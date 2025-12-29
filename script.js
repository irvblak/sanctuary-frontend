// script.js
// Step 8 — Gate trigger + eye toggle
// NO navigation yet. NO redirects. NO storage.

document.addEventListener("DOMContentLoaded", () => {
  const whatsOnBtn = document.getElementById("whats-on-btn");
  const infoBtn = document.getElementById("info-btn");

  const gate = document.getElementById("access-gate");
  const input = document.getElementById("access-code-input");
  const eyeBtn = document.getElementById("access-eye");

  // Safety check
  if (!gate || !whatsOnBtn || !infoBtn) {
    console.warn("Gate or buttons not found");
    return;
  }

  // ---- Show gate when either button is clicked ----
  function showGate() {
    gate.style.display = "block";
    input && input.focus();
  }

  whatsOnBtn.addEventListener("click", showGate);
  infoBtn.addEventListener("click", showGate);

  // ---- 👁 Eye toggle ----
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
