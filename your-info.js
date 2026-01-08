// your-info.js
// =====================================
// Sanctuary Club – Your Information
// Canonical storage: localStorage["sanctuaryMembers"]
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("your-info-form");
  if (!form) return;

  const membershipInput = document.getElementById("membership-number");
  const statusMsg = document.getElementById("save-status");

  const STORAGE_KEY = "sanctuaryMembers";

  // ---- Resident field mapping
  const residentsConfig = [
    { prefix: "res1", landline: true },
    { prefix: "res2", landline: false },
    { prefix: "res3", landline: false },
    { prefix: "res4", landline: false }
  ];

  // ---- Load full directory object
  function loadDirectory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  // ---- Save full directory object
  function saveDirectory(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  // ---- Populate form from stored data
  function populateForm(memberData) {
    residentsConfig.forEach((cfg, index) => {
      const res = memberData.residents?.[index];
      if (!res) return;

      setVal(`${cfg.prefix}_name`, res.name);
      setVal(`${cfg.prefix}_email`, res.email);
      setVal(`${cfg.prefix}_mobile`, res.mobile);

      if (cfg.landline) {
        setVal(`${cfg.prefix}_landline`, res.landline);
      }
    });
  }

  function setVal(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.value = value;
  }

  // ---- Collect residents from form
  function collectResidents() {
    const residents = [];

    residentsConfig.forEach(cfg => {
      const name = getVal(`${cfg.prefix}_name`);
      const email = getVal(`${cfg.prefix}_email`);
      const mobile = getVal(`${cfg.prefix}_mobile`);
      const landline = cfg.landline ? getVal(`${cfg.prefix}_landline`) : "";

      if (name || email || mobile || landline) {
        residents.push({
          name: name || "",
          email: email || "",
          mobile: mobile || "",
          landline: landline || ""
        });
      }
    });

    return residents;
  }

  function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  // ---- Load data when membership entered
  membershipInput.addEventListener("blur", () => {
    const memberId = membershipInput.value.trim().toUpperCase();
    if (!memberId) return;

    const directory = loadDirectory();
    if (directory[memberId]) {
      populateForm(directory[memberId]);
    }
  });

  // ---- Save handler
  form.addEventListener("submit", e => {
    e.preventDefault();

    const memberId = membershipInput.value.trim().toUpperCase();
    if (!memberId) {
      statusMsg.textContent = "Please enter your membership number.";
      statusMsg.style.color = "darkred";
      return;
    }

    const residents = collectResidents();

    const directory = loadDirectory();
    directory[memberId] = { residents };

    saveDirectory(directory);

    statusMsg.textContent = "Your information has been saved.";
    statusMsg.style.color = "green";
  });
});
