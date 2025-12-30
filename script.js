// script.js — Homepage gate logic (stable + boring)

document.addEventListener("DOMContentLoaded", () => {

  const btnWhatsOn = document.getElementById("btn-whats-on");
  const btnInfo = document.getElementById("btn-info");
  const gate = document.getElementById("access-gate");
  const input = document.getElementById("access-code-input");
  const submit = document.getElementById("access-submit");
  const error = document.getElementById("access-error");
  const eyeBtn = document.getElementById("access-eye");

  let targetPage = null;

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

  if (submit) {
    submit.addEventListener("click", () => {
      const code = input.value.trim();

      if (code === "WXYZ") {
        error.style.display = "none";
        sessionStorage.setItem("sanctuaryAccess", "granted");
        sessionStorage.setItem("sanctuaryAccessTime", Date.now());

        window.location.href = targetPage;
      } else {
        error.style.display = "block";
      }
    });
  }

});
