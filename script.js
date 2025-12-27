// script.js — Sanctuary Club access gate (authoritative)

document.addEventListener("DOMContentLoaded", function () {

  const ACCESS_CODE = "SM0185SC";

  // Elements (may or may not exist depending on page)
  const gate = document.getElementById("access-gate");
  const input = document.getElementById("access-code-input");
  const submit = document.getElementById("access-submit");
  const error = document.getElementById("access-error");
  const toggle = document.querySelector(".toggle-visibility");

  const whatsOnBtn = document.querySelector('a[href="events-calendar.html"]');
  const infoBtn = document.querySelector('a[href="notices.html"]');

  let pendingDestination = null;

  // If already granted, do nothing here
  if (localStorage.getItem("sanctuaryAccessGranted") === "true") {
    return;
  }

  // Show gate instead of navigating
  function intercept(e, destination) {
    e.preventDefault();
    pendingDestination = destination;
    if (gate) gate.style.display = "block";
    if (input) input.focus();
  }

  if (whatsOnBtn) {
    whatsOnBtn.addEventListener("click", (e) =>
      intercept(e, "events-calendar.html")
    );
  }

  if (infoBtn) {
    infoBtn.addEventListener("click", (e) =>
      intercept(e, "notices.html")
    );
  }

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
