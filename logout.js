function logout() {
  // Clear any stored member/session data
  localStorage.clear();
  sessionStorage.clear();

  // Redirect to homepage
  window.location.href = "index.html";
}
