// script.js — Sanctuary Club access gate (fixed interception)

document.addEventListener("DOMContentLoaded", function () {

  const ACCESS_CODE = "SM0185SC";

  const gate = document.getElementById("access-gate");
  const input = document.getElementById("access-code-input");
  const submit = document.getElementById("access-submit");
  const error = document.getElementById("access-error");
  const toggle = document.querySelector(".toggle-visibility");

  const links = document.querySelectorAll(
    'a[href="events-calendar.html"], a[href="notices.html"]'
  );

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

  // HARD block navigation at capture phase
  links.forEach(link => {
    link.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        showGate(link.getAttribute("href"));
      },
      true // capture phase — critical
    );
  });

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

  if (input) {
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        submit.click();
      }
    });
  }

  if (toggle && input) {
    toggle.addEventListener("click", function () {
      input.type = input.type === "password" ? "text" : "password";
    });
  }

});
