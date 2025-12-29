// =======================================================
// GATE LOGIC — HOMEPAGE (index.html)
// =======================================================

(function () {
  try {
    const ACCESS_CODE = "WXYZ"; // global site access code

    const gate = document.getElementById("access-gate");
    const input = document.getElementById("access-code-input");
    const submit = document.getElementById("access-submit");
    const error = document.getElementById("access-error");
    const toggle = document.querySelector(".toggle-visibility");

    const whatsOnBtn = document.querySelector('a[href="events-calendar.html"]');
    const infoBtn = document.querySelector('a[href="notices.html"]');

    let targetPage = null;

    // -------------------------------
    // Show gate when buttons clicked
    // -------------------------------
    function revealGate(page) {
      targetPage = page;
      error.style.display = "none";
      gate.style.display = "block";
      input.focus();
    }

    whatsOnBtn.addEventListener("click", function (e) {
      e.preventDefault();
      revealGate("events-calendar.html");
    });

    infoBtn.addEventListener("click", function (e) {
      e.preventDefault();
      revealGate("notices.html");
    });

    // -------------------------------
    // Toggle password visibility
    // -------------------------------
    toggle.addEventListener("click", function () {
      input.type = input.type === "password" ? "text" : "password";
    });

    // -------------------------------
    // Submit access code
    // -------------------------------
    submit.addEventListener("click", function () {
      const entered = input.value.trim();

      if (entered === ACCESS_CODE) {
        // Grant session access
        sessionStorage.setItem("siteAccessGranted", "true");

        // Navigate
        if (targetPage) {
          window.location.href = targetPage;
        }
      } else {
        error.style.display = "block";
      }
    });

  } catch (err) {
    console.error("Gate logic error:", err);
  }
})();
