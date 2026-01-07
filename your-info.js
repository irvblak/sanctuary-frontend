// your-info.js — FINAL CANONICAL VERSION
// Writes to shared directory storage: localStorage["sanctuaryMembers"]

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("your-info-form");
  if (!form) return;

  const membershipInput = document.getElementById("membership-number");
  const statusMsg = document.getElementById("save-status");

  const STORAGE_KEY = "sanctuaryMembers";

  const residentFields = [
    { name: "res1", ids: ["res1_name", "res1_email", "res1_mobile", "res1_landline"] },
    { name: "res2", ids: ["res2_name", "res2_email", "res2_mobile"] },
    { name: "res3", ids: ["res3_name", "res3_email", "res3_mobile"] },
    { name: "res4", ids: ["res4_name", "res4_email", "res4_mobile"] }
  ];

  function loadDirectory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveDirectory(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function populateForm(memberData) {
    residentFields.forEach(res => {
      const saved = memberData?.residents?.[res.name];
      if (!saved) return;

      res.ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && saved[id]) el.value = saved[id];
      });
    });
  }

  function collectResidents() {
    const residents = {};

    residentFields.forEach(res => {
      const entry = {};
      let hasData = false;

      res.ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.value.trim()) {
          entry[id] = el.value.trim();
          hasData = true;
        }
      });

      if (hasData) residents[res.name] = entry;
    });

    return residents;
  }

  membershipInput.addEventListener("blur", () => {
    const membership = membershipInput.value.trim().toUpperCase();
    if (!membership) return;

    const directory = loadDirectory();
    if (directory[membership]) {
      populateForm(directory[membership]);
    }
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    const membership = membershipInput.value.trim().toUpperCase();
    if (!membership) {
      statusMsg.textContent = "Please enter your membership number.";
      statusMsg.style.color = "darkred";
      return;
    }

    const directory = loadDirectory();
    const residents = collectResidents();

    directory[membership] = { residents };

    saveDirectory(directory);

    statusMsg.textContent = "Your information has been saved.";
    statusMsg.style.color = "green";
  });

});
