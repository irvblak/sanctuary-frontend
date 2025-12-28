// script.js — homepage gate + navigation only

document.addEventListener("DOMContentLoaded", function () {

  const ACCESS_CODE = "WXYZ"; // <-- change this if needed

  const btnWhatsOn = document.getElementById("btn-whats-on");
  const btnInfo = document.getElementById("btn-info");

  const gate = document.getElementById("access-gate");
  const input = document.getElementById("access-code-input");
  const submit = document.getElementById("access-submit");
  const error = document.getElementById("access-error");

  let pendingDestination = null;

  // Show gate when either button is clicked
  function revealGate(destination) {
    pendingDestination = destination;
    gate.style.display = "block";
    error.style.display = "none";
    input.value = "";
    input.focus();
  }

  if (btnWhatsOn) {
    btnWhatsOn.addEventListener("click", function () {
      revealGate("events-calendar.html");
    });
  }

  if (btnInfo) {
    btnInfo.addEventListener("click", function () {
      revealGate("notices.html");
    });
  }

  // Handle access code submission
  if (submit) {
    submit.addEventListener("click", function () {
      const entered = input.value.trim();

      if (entered === ACCESS_CODE) {
        sessionStorage.setItem("siteAccessGranted", "true");
        window.location.href = pendingDestination;
      } else {
        error.style.display = "block";
      }
    });
  }

  // Optional: Enter key submits
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      submit.click();
    }
  });

});
