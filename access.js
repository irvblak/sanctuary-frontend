// access.js
// ================================
// Sanctuary Club – Access Guard
// Trust-based community model
// All member pages require access gate only
// ================================

(function () {
  const hasAccess =
    sessionStorage.getItem("sanctuaryAccess") === "granted";

  if (!hasAccess) {
    location.replace("index.html");
  }
})();
