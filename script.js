// script.js — Homepage gate logic with session access (stable)

document.addEventListener("DOMContentLoaded", () => {

 // CONFIG
const ACCESS_CODE = "WXYZ";
const SESSION_KEY = "sanctuaryAccess";
const SESSION_TIME_KEY = "sanctuaryAccessTime";
 

  // Elements
  const btnWhatsOn = document.getElementById("btn-whats-on");
  const btnInfo = document.getElementById("btn-info");
  const gate = document.getElementById("access-gate");
  const input = document.getElementById("access-code-input");
  const submit = document.getElementById("access-submit");
  const error = document.getElementById("access-error");
  const eyeBtn = document.getElementById("access-eye");

  let targetPage = null;

  // ---- Helpers ----
  function hasAccess() {
    return sessionStorage.getItem(SESSION_KEY) === "granted";
  }

  function grantAccess() {
    sessionStorage.setItem(SESSION_KEY, "granted");
  }

  // ---- Navigation handling ----
  function handleNav(destination) {
    if (hasAccess()) {
      window.location.href = destination;
    } else {
      targetPage = destination;
      gate.style.display = "block";
      input.focus();
    }
  }

  if (btnWhatsOn) {
    btnWhatsOn.addEventListener("click", () => {
      handleNav("events-calendar.html");
    });
  }

  if (btnInfo) {
    btnInfo.addEventListener("click", () => {
      handleNav("notices.html");
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

      if (code === ACCESS_CODE) {
        error.style.display = "none";
        grantAccess();

        if (targetPage) {
          window.location.href = targetPage;
        }
      } else {
        error.style.display = "block";
      }
    });
  }

});
