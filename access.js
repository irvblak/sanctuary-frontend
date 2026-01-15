// access.js
// --------------------------------------------------
// Sanctuary Club – simple session gate
// --------------------------------------------------

(function () {
  try {
    const memberId = sessionStorage.getItem("memberId");

    // If no active session, redirect to Home
    if (!memberId) {
      window.location.replace("index.html");
      return;
    }

    // If session exists, allow page to render
  } catch (e) {
    // Absolute fallback: never allow a blank page
    window.location.replace("index.html");
  }
})();
