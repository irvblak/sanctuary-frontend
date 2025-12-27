// script.js — Sanctuary Club access gate (buttons version)

document.addEventListener("DOMContentLoaded", function () {

  const ACCESS_CODE = "SM0185SC";

  const gate = document.getElementById("access-gate");
  const input = document.getElementById("access-code-input");
  const submit = document.getElementById("access-submit");
  const error = document.getElementById("access-error");
  const toggle = document.querySelector(".toggle-visibility");

  const buttons = document.querySelectorAll(".hero-button[data-dest]");

  let pendingDestination = null;

  // If already granted, do nothing
  if (localStorage.getItem("sanctuaryAccessGranted") === "true") {
    return;
  }

  function showGate(destination) {
    pendingDestination = destination;
    if (gate) gate.style.display = "block";
    if (input) input.focus();
  }

  // Intercept button clicks
  buttons.forEach(btn => {
    btn.addEventListener("click", function () {
      const dest = btn.getAttribute("data-dest");
      showGate(dest);
    });
  });

  // Submit access code
  if (submit && input) {
    submit.addEventListener("click", function () {
      const value = input.value.trim();

      if (value === ACCESS_CODE) {
        localStorage.setItem("sanctuaryAccessGranted", "true");
        window.location.href = pendingDestination || "events-calendar.html";
      } else {
        if (error) error.style.display = "block";
      }
    });
  }

  // Enter key support
  if (input) {
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        submit.click();
      }
    });
  }

  // Toggle visibility
  if (toggle && input) {
    toggle.addEventListener("click", function () {
      input.type = input.type === "password" ? "text" : "password";
    });
  }

});
