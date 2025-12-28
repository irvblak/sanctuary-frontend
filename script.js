// script.js — Sanctuary Club core logic
document.addEventListener("DOMContentLoaded", () => {

  /* ======================================================
     ACCESS GATE — INDEX PAGE
     ====================================================== */

  const ACCESS_CODE = "SM0185SC";

  const gate = document.getElementById("access-gate");
  const input = document.getElementById("access-code-input");
  const submit = document.getElementById("access-submit");
  const error = document.getElementById("access-error");
  const navButtons = document.querySelectorAll(".nav-button");

  let pendingDestination = null;

  // If already granted, buttons go straight through
  const accessGranted =
    localStorage.getItem("sanctuaryAccessGranted") === "true";

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const dest = btn.dataset.dest;

      if (accessGranted) {
        window.location.href = dest;
      } else {
        pendingDestination = dest;
        if (gate) gate.style.display = "block";
        if (error) error.style.display = "none";
        if (input) input.focus();
      }
    });
  });

  // Submit access code
  if (submit) {
    submit.addEventListener("click", () => {
      if (!input) return;

      if (input.value.trim() === ACCESS_CODE) {
        localStorage.setItem("sanctuaryAccessGranted", "true");
        window.location.href = pendingDestination || "events-calendar.html";
      } else {
        if (error) error.style.display = "block";
      }
    });
  }

  // Allow Enter key
  if (input) {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        submit.click();
      }
    });
  }

  /* ======================================================
     PASSWORD VISIBILITY TOGGLE
     ====================================================== */

  document.querySelectorAll(".toggle-visibility").forEach(btn => {
    btn.addEventListener("click", () => {
      const field = btn.previousElementSibling;
      if (!field) return;
      field.type = field.type === "password" ? "text" : "password";
    });
  });

});
