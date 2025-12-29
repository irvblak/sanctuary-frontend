// script.js — Homepage gate logic (clean + deterministic)

document.addEventListener("DOMContentLoaded", () => {

  // Elements
  const btnWhatsOn = document.getElementById("btn-whats-on");
  const btnInfo = document.getElementById("btn-info");
  const gate = document.getElementById("access-gate");
  const input = document.getElementById("access-code-input");
  const submit = document.getElementById("access-submit");
  const error = document.getElementById("access-error");
  const eyeBtn = document.getElementById("access-eye");

  let targetPage = null;

  // ---- Button clicks show gate ----
  function showGate(destination) {
    targetPage = destination;
    gate.style.display = "block";
    input.focus();
  }

  if (btnWhatsOn) {
    btnWhatsOn.addEventListener("click", () => {
      showGate("events-calendar.html");
    });
  }

  if (btnInfo) {
    btnInfo.addEventListener("click", () => {
      showGate("notices.html");
    });
  }

  // ---- Eye toggle ----
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

  // ---- Submit access code ----
  if (submit) {
    submit.addEventListener("click", () => {
      const code = input.value.trim();

      // TEMP access code (we will upgrade later)
      if (code === "WXYZ") {
        error.style.display = "none";
        window.location.href = targetPage;
      } else {
        error.style.display = "block";
      }
    });
  }

});
