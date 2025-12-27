// script.js
document.addEventListener("DOMContentLoaded", function () {

  const ACCESS_CODE = "sanctuary"; // change if needed

  const accessGate = document.getElementById("access-gate");
  const accessInput = document.getElementById("access-code-input");
  const accessSubmit = document.getElementById("access-submit");
  const accessError = document.getElementById("access-error");
  const toggleVisibility = document.querySelector(".toggle-visibility");

  // Pages that require access
  const protectedPages = [
    "events-calendar.html",
    "notices.html"
  ];

  const currentPage = window.location.pathname.split("/").pop();

  const accessGranted = localStorage.getItem("sanctuaryAccessGranted") === "true";

  /* --------------------------------------------------
     PROTECTED PAGE GUARD
  -------------------------------------------------- */
  if (protectedPages.includes(currentPage) && !accessGranted) {
    window.location.href = "index.html";
    return;
  }

  /* --------------------------------------------------
     INDEX PAGE — SHOW ACCESS GATE WHEN NEEDED
  -------------------------------------------------- */
  if (currentPage === "" || currentPage === "index.html") {

    if (!accessGranted && accessGate) {
      accessGate.style.display = "block";
    }

    if (accessSubmit) {
      accessSubmit.addEventListener("click", function () {
        const entered = accessInput.value.trim();

        if (entered === ACCESS_CODE) {
          localStorage.setItem("sanctuaryAccessGranted", "true");
          window.location.href = "events-calendar.html";
        } else {
          accessError.style.display = "block";
        }
      });
    }

    if (toggleVisibility && accessInput) {
      toggleVisibility.addEventListener("click", function () {
        accessInput.type =
          accessInput.type === "password" ? "text" : "password";
      });
    }
  }

});
