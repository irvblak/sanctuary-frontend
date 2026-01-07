// your-info.js
// Handles member self-editing of contact info (up to 4 residents)
// Also syncs data into Members Directory (sanctuaryMembers)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("your-info-form");
  if (!form) return;

  const membershipInput = document.getElementById("membership-number");
  const statusMsg = document.getElementById("save-status");

  const STORAGE_KEY = "sanctuaryMembers";

  const residentFields = [
    { key: "res1", name: "res1_name", email: "res1_email", mobile: "res1_mobile", landline: "res1_landline" },
    { key: "res2", name: "res2_name", email: "res2_email", mobile: "res2_mobile" },
    { key: "res3", name: "res3_name", email: "res3_email", mobile: "res3_mobile" },
    { key: "res4", name: "res4_name", email: "res4_email", mobile: "res4_mobile" }
  ];

  // -------- local per-member storage (unchanged)
  function memberKey(membership) {
    return `member_${membership}`;
  }

  function loadPersonal(membership) {
    const raw = localStorage.getItem(memberKey(membership));
    return raw ? JSON.parse(raw) : {};
  }

  function savePersonal(membership, data) {
    localStorage.setItem(memberKey(membership), JSON.stringify(data));
  }

  // -------- directory storage
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

  // -------- form helpers
  function populateForm(data) {
    residentFields.forEach(res => {
      const block = data[res.key];
      if (!block) return;

      Object.values(res).forEach(id => {
        const el = document.getElementById(id);
        if (el && block[id]) el.value = block[id];
      });
    });
  }

  function collectFormData() {
    const data = {};
    residentFields.forEach(res => {
      const entry = {};
      let hasAny = false;

      Object.values(res).forEach(id => {
        const el = document.getElementById(id);
        if (el && el.value.trim()) {
          entry[id] = el.value.trim();
          hasAny = true;
        }
      });

      if (hasAny) data[res.key] = entry;
    });
    return data;
  }

  // -------- sync into Members Directory
  function syncToDirectory(membership, personalData) {
    const directory = loadDirectory();
    const residents = [];

    residentFields.forEach(res => {
      const d = personalData[res.key];
      if (!d) return;

      residents.push({
        name: d[res.name] || "",
        email: d[res.email] || "",
        mobile: d[res.mobile] || "",
        landline: d[res.landline] || ""
      });
    });

    if (residents.length) {
      directory[membership] = { residents };
      saveDirectory(directory);
    }
  }

  // -------- load on membership blur
  membershipInput.addEventListener("blur", () => {
    const membership = membershipInput.value.trim();
    if (!membership) return;

    populateForm(loadPersonal(membership));
  });

  // -------- save handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const membership = membershipInput.value.trim();
    if (!membership) {
      statusMsg.textContent = "Please enter your membership number.";
      statusMsg.style.color = "darkred";
      return;
    }

    const data = collectFormData();
    savePersonal(membership, data);
    syncToDirectory(membership, data);

    statusMsg.textContent = "Your information has been saved.";
    statusMsg.style.color = "green";
  });
});
