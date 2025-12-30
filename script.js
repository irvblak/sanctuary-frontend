// script.js — Homepage gate + session grant + homepage logout
// Clean, defensive, deterministic

document.addEventListener("DOMContentLoaded", () => {

  // ================================
  // CONFIG
  // ================================
  const ACCESS_CODE = "WXYZ";
  const SESSION_KEY = "sanctuaryAccess";
  const SESSION_TIME_KEY = "sanctuaryAccessTime";

  // ================================
  // ELEMENTS
  // ================================
  const btnWhatsOn = document.getElementById("btn-whats-on");
  const btnInfo = document.getElementById("btn-info");
  const gate = document.getElementById("access-gate");
  const input = document.getElementById("access-code-input");
  const submit = document.getElementById("access-submit");
  const error = document.getElementById("access-error");
  const eyeBtn = document.getElementById("access-eye");
  const logoutLink = document.getElementById("logout-link");

  let targetPage = null;

  // ================================
  // SESSION CHECK (homepage)
  // ================================
  const hasAccess =
    sessionStorage.getItem(SESSION_KEY) === "granted";

  if (logoutLink && hasAccess) {
    logoutLink.style.display = "block";

    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.clear();
      window.location.href = "index.html";
    });
  }

  // ================================
  // SHOW GATE
  // ================================
  function showGate(destination) {
    targetPage = destination;
    if (gate) {
      gate.style.display = "block";
    }
    if (input) {
      input.focus();
    }
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

  // ================================
  // EYE TOGGLE
  // ================================
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

  // ================================
  // GRANT ACCESS
  // ================================
  function grantAccess() {
    sessionStorage.setItem(SESSION_KEY, "granted");
    sessionStorage.setItem(
      SESSION_TIME_KEY,
      Date.now().toString()
    );
  }

  // ================================
  // SUBMIT CODE
  // ================================
  if (submit) {
    submit.addEventListener("click", () => {
      const code = input.value.trim();

      if (code === ACCESS_CODE && targetPage) {
        error.style.display = "none";
        grantAccess();
        window.location.href = targetPage;
      } else {
        error.style.display = "block";
      }
    });
  }

});
