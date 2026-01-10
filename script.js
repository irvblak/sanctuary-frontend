// script.js — Member login handler (trust-based)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const email = form.email.value.trim().toLowerCase();
    const pin = form.pin.value.trim();

    if (!email || !pin) return;

    // ---- Grant access
    sessionStorage.setItem("sanctuaryAccess", "granted");
    sessionStorage.setItem("sanctuaryAccessTime", Date.now());

    // ---- Derive stable memberId from email
    // Non-sensitive, deterministic
    const memberId = email
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 12);

    sessionStorage.setItem("memberId", memberId);

    // ---- Redirect to Home
    window.location.href = "index.html";
  });
});
