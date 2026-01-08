// =====================================
// Sanctuary Club — Your Information
// FINAL canonical version
// Writes to sanctuaryMembers (shared)
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "sanctuaryMembers";

  const form = document.getElementById("your-info-form");
  if (!form) return;

  const membershipInput = document.getElementById("membership-number");
  const statusMsg = document.getElementById("save-status");

  const residentFields = [
    { name: "res1_name", email: "res1_email", mobile: "res1_mobile", landline: "res1_landline" },
    { name: "res2_name", email: "res2_email", mobile: "res2_mobile" },
    { name: "res3_name", email: "res3_email", mobile: "res3_mobile" },
    { name: "res4_name", email: "res4_email", mobile: "res4_mobile" }
  ];

  function loadAllMembers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveAllMembers(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function populateForm(members, membership) {
    const entry = members[membership];
    if (!entry || !entry.residents) return;

    entry.residents.forEach((res, index) => {
      const map = residentFields[index];
      if (!map) return;

      Object.entries(map).forEach(([key, id]) => {
        const el = document.getElementById(id);
        if (el && res[key]) el.value = res[key];
      });
    });
  }

  function collectResidents() {
    const residents = [];

    residentFields.forEach(map => {
      const resident = {};
      let hasAny = false;

      Object.entries(map).forEach(([key, id]) => {
        const el = document.getElementById(id);
        if (el && el.value.trim() !== "") {
          resident[key] = el.value.trim();
          hasAny = true;
        }
      });

      if (hasAny) residents.push(resident);
    });

    return residents;
  }

  // Populate when membership number entered
  membershipInput.addEventListener("blur", () => {
    const membership = membershipInput.value.trim();
    if (!membership) return;

    const members = loadAllMembers();
    populateForm(members, membership);
  });

  // Save handler
  form.addEventListener("submit", e => {
    e.preventDefault();

    const membership = membershipInput.value.trim();
    if (!membership) {
      statusMsg.textContent = "Please enter your membership number.";
      statusMsg.style.color = "darkred";
      return;
    }

    const residents = collectResidents();
    const members = loadAllMembers();

    members[membership] = { residents };
    saveAllMembers(members);

    statusMsg.textContent = "Your information has been saved.";
    statusMsg.style.color = "green";
  });
});
