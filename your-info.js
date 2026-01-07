// =====================================
// Sanctuary Club – Your Information
// Saves directly into Members Directory
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("your-info.js loaded");

  const form = document.getElementById("your-info-form");
  if (!form) return;

  const membershipInput = document.getElementById("membership-number");
  const statusMsg = document.getElementById("save-status");

  const DIRECTORY_KEY = "sanctuaryMembers";

  const residentFields = [
    { name: "res1_name", email: "res1_email", mobile: "res1_mobile", landline: "res1_landline" },
    { name: "res2_name", email: "res2_email", mobile: "res2_mobile" },
    { name: "res3_name", email: "res3_email", mobile: "res3_mobile" },
    { name: "res4_name", email: "res4_email", mobile: "res4_mobile" }
  ];

  // ---- Load full directory
  function loadDirectory() {
    try {
      return JSON.parse(localStorage.getItem(DIRECTORY_KEY)) || {};
    } catch {
      return {};
    }
  }

  // ---- Save full directory
  function saveDirectory(data) {
    localStorage.setItem(DIRECTORY_KEY, JSON.stringify(data));
  }

  // ---- Populate form if data already exists
  function populateForm(membership) {
    const directory = loadDirectory();
    const record = directory[membership];
    if (!record || !Array.isArray(record.residents)) return;

    record.residents.forEach((res, idx) => {
      const fields = residentFields[idx];
      if (!fields) return;

      Object.keys(fields).forEach((key) => {
        const el = document.getElementById(fields[key]);
        if (el && res[key]) el.value = res[key];
      });
    });
  }

  // ---- When membership number entered → auto-fill
  membershipInput.addEventListener("blur", () => {
    const membership = membershipInput.value.trim();
    if (membership) populateForm(membership);
  });

  // ---- Save handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const membership = membershipInput.value.trim();
    if (!membership) {
      statusMsg.textContent = "Please enter your membership number.";
      statusMsg.style.color = "darkred";
      return;
    }

    const residents = [];

    residentFields.forEach((fields) => {
      const entry = {};
      let hasAny = false;

      Object.keys(fields).forEach((key) => {
        const el = document.getElementById(fields[key]);
        if (el && el.value.trim()) {
          entry[key] = el.value.trim();
          hasAny = true;
        }
      });

      if (hasAny) residents.push(entry);
    });

    const directory = loadDirectory();
    directory[membership] = { residents };
    saveDirectory(directory);

    statusMsg.textContent = "Your information has been saved.";
    statusMsg.style.color = "green";
  });
});
