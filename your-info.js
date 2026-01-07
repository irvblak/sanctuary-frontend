// =====================================
// Sanctuary Club – Your Information
// Single source of truth: localStorage["sanctuaryMembers"]
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("your-info.js loaded");

  const form = document.getElementById("your-info-form");
  if (!form) return;

  const membershipInput = document.getElementById("membership-number");
  const statusMsg = document.getElementById("save-status");

  const STORAGE_KEY = "sanctuaryMembers";

  // ---- Resident field mappings (IDs in HTML)
  const residentMaps = [
    { name: "res1_name", email: "res1_email", mobile: "res1_mobile", landline: "res1_landline" },
    { name: "res2_name", email: "res2_email", mobile: "res2_mobile" },
    { name: "res3_name", email: "res3_email", mobile: "res3_mobile" },
    { name: "res4_name", email: "res4_email", mobile: "res4_mobile" }
  ];

  // ---- Load entire directory
  function loadDirectory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  // ---- Save entire directory
  function saveDirectory(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  // ---- Populate form from storage
  function populateForm(entry) {
    if (!entry || !entry.residents) return;

    entry.residents.forEach((res, index) => {
      const map = residentMaps[index];
      if (!map) return;

      Object.keys(map).forEach(key => {
        const el = document.getElementById(map[key]);
        if (el && res[key]) {
          el.value = res[key];
        }
      });
    });
  }

  // ---- Collect form data
  function collectResidents() {
    const residents = [];

    residentMaps.forEach(map => {
      const resident = {};
      let hasData = false;

      Object.keys(map).forEach(key => {
        const el = document.getElementById(map[key]);
        if (el && el.value.trim() !== "") {
          resident[key] = el.value.trim();
          hasData = true;
        }
      });

      if (hasData) residents.push(resident);
    });

    return residents;
  }

  // ---- When membership number entered, pre-fill if exists
  membershipInput.addEventListener("blur", () => {
    const membership = membershipInput.value.trim().toUpperCase();
    if (!membership) return;

    const directory = loadDirectory();
    if (directory[membership]) {
      populateForm(directory[membership]);
    }
  });

  // ---- Save handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const membership = membershipInput.value.trim().toUpperCase();
    if (!membership) {
      statusMsg.textContent = "Please enter your membership number.";
      statusMsg.style.color = "darkred";
      return;
    }

    const residents = collectResidents();

    const directory = loadDirectory();
    directory[membership] = { residents };

    saveDirectory(directory);

    statusMsg.textContent = "Your information has been saved.";
    statusMsg.style.color = "green";

    console.log("Saved sanctuaryMembers:", directory);
  });
});
