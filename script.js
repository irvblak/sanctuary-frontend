// script.js — Member login handler (trust-based)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const email = form.email.value.trim().toLowerCase();
    const pin = form.pin.value.trim();

    if (!email || !pin) return;

    // ---- Grant 8-hour access
localStorage.setItem(
  "sanctuaryAccessUntil",
  String(Date.now() + 8 * 60 * 60 * 1000) // 8 hours
);

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
