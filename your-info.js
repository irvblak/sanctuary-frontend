// your-info.js
// Writes member data into the shared Members Directory store

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("your-info-form");
  if (!form) return;

  const membershipInput = document.getElementById("membership-number");
  const statusMsg = document.getElementById("save-status");

  const STORAGE_KEY = "sanctuaryMembers";

  const residentMap = [
    { prefix: "res1", landline: true },
    { prefix: "res2", landline: false },
    { prefix: "res3", landline: false },
    { prefix: "res4", landline: false }
  ];

  function loadAll() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveAll(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function populateForm(memberData) {
    if (!memberData?.residents) return;

    memberData.residents.forEach((res, idx) => {
      const map = residentMap[idx];
      if (!map) return;

      ["name", "email", "mobile", "landline"].forEach(field => {
        const el = document.getElementById(`${map.prefix}_${field}`);
        if (el && res[field]) el.value = res[field];
      });
    });
  }

  function collectResidents() {
    const residents = [];

    residentMap.forEach(map => {
      const res = {};
      let hasData = false;

      ["name", "email", "mobile", "landline"].forEach(field => {
        if (field === "landline" && !map.landline) return;
        const el = document.getElementById(`${map.prefix}_${field}`);
        if (el && el.value.trim()) {
          res[field] = el.value.trim();
          hasData = true;
        }
      });

      if (hasData) residents.push(res);
    });

    return residents;
  }

  membershipInput.addEventListener("blur", () => {
    const id = membershipInput.value.trim().toUpperCase();
    if (!id) return;

    const all = loadAll();
    populateForm(all[id]);
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    const id = membershipInput.value.trim().toUpperCase();
    if (!id) {
      statusMsg.textContent = "Please enter your membership number.";
      statusMsg.style.color = "darkred";
      return;
    }

    const residents = collectResidents();
    if (!residents.length) {
      statusMsg.textContent = "Nothing to save.";
      statusMsg.style.color = "#555";
      return;
    }

    const all = loadAll();
    all[id] = { residents };
    saveAll(all);

    statusMsg.textContent = "Your information has been saved.";
    statusMsg.style.color = "green";
  });
});
