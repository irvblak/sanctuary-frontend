function logout() {
  // Remove only session-related keys
  localStorage.removeItem("token");        // member login token
  localStorage.removeItem("adminToken");   // admin login token (if present)

  // If you store memberId or similar session markers:
  localStorage.removeItem("memberId");
 // Remove access expiry
  localStorage.removeItem("sanctuaryAccessUntil");

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("adminToken");

  // Do NOT clear all localStorage — preserves saved data
  window.location.href = "index.html";
}
