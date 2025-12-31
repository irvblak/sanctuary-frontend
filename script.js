// script.js — Homepage gate logic (clean, deterministic, session-aware)

document.addEventListener("DOMContentLoaded", () => {

  // CONFIG
  const ACCESS_CODE = "WXYZ";
  const SESSION_KEY = "sanctuaryAccess";
  const SESSION_TIME_KEY = "sanctuaryAccessTime";
  const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

  // Elements
  const btnWhatsOn = document.getElementById("btn-whats-on");
  const btnInfo = document.getElementById("btn-info");
  const gate = document.getElementById("access-gate");
  const input = document.getElementById("access-code-input");
  const submit = document.getElementById("access-submit");
  const error = document.getElementById("access-error");
  const eyeBtn = document.getElementById("access-eye");

  let targetPage = null;

  // --- Helpers ---
  function sessionIsValid() {
    const granted = sessionStorage.getItem(SESSION_KEY);
    const time = sessionStorage.getItem(SESSION_TIME_KEY);

    if (granted !== "granted" || !time) return false;
    return Date.now() - Number(time) < SESSION_DURATION;
  }

  function grantSession() {
    sessionStorage.setItem(SESSION_KEY, "granted");
    sessionStorage.setItem(SESSION_TIME_KEY, Date.now());
  }

  // --- Gate display ---
  function showGate(destination) {
    targetPage = destination;
    gate.style.display = "block";
    error.style.display = "none";
    input.value = "";
    input.focus();
  }

  // --- Button handlers ---
  if (btnWhatsOn) {
    btnWhatsOn.addEventListener("click", () => {
      if (sessionIsValid()) {
        window.location.href = "events-calendar.html";
      } else {
        showGate("events-calendar.html");
      }
    });
  }

  if (btnInfo) {
    btnInfo.addEventListener("click", () => {
      if (sessionIsValid()) {
        window.location.href = "notices.html";
      } else {
        showGate("notices.html");
      }
    });
  }

  // --- Eye toggle ---
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

  // --- Submit access code ---
  if (submit) {
    submit.addEventListener("click", () => {
      const code = input.value.trim();

      if (code === ACCESS_CODE && targetPage) {
        grantSession();
        window.location.href = targetPage;
      } else {
        error.style.display = "block";
      }
    });
  }

});
