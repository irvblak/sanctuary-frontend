// your-info.js
// =====================================
// Sanctuary Club – Your Information
// Saves data into localStorage["sanctuaryMembers"]
// =====================================

const STORAGE_KEY = "sanctuaryMembers";

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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("your-info-form");
  if (!form) return;

  const membershipInput = document.getElementById("membership-number");
  const statusMsg = document.getElementById("save-status");

  const fields = [
    { name: "res1", prefix: "res1", landline: true },
    { name: "res2", prefix: "res2" },
    { name: "res3", prefix: "res3" },
    { name: "res4", prefix: "res4" }
  ];

  // ---- Load existing data when membership entered
  membershipInput.addEventListener("blur", () => {
    const id = membershipInput.value.trim();
    if (!id) return;

    const all = loadAllMembers();
    const member = all[id];
    if (!member || !Array.isArray(member.residents)) return;

    member.residents.forEach((res, idx) => {
      const f = fields[idx];
      if (!f) return;

      document.getElementById(`${f.prefix}_name`).value = res.name || "";
      document.getElementById(`${f.prefix}_email`).value = res.email || "";
      document.getElementById(`${f.prefix}_mobile`).value = res.mobile || "";

      if (f.landline) {
        document.getElementById(`${f.prefix}_landline`).value = res.landline || "";
      }
    });
  });

  // ---- Save handler
  form.addEventListener("submit", e => {
    e.preventDefault();

    const id = membershipInput.value.trim();
    if (!id) {
      statusMsg.textContent = "Please enter your membership number.";
      statusMsg.style.color = "darkred";
      return;
    }

    const residents = [];

    fields.forEach(f => {
      const name = document.getElementById(`${f.prefix}_name`).value.trim();
      const email = document.getElementById(`${f.prefix}_email`).value.trim();
      const mobile = document.getElementById(`${f.prefix}_mobile`).value.trim();
      const landline = f.landline
        ? document.getElementById(`${f.prefix}_landline`).value.trim()
        : "";

      if (name || email || mobile || landline) {
        const entry = { name, email, mobile };
        if (f.landline) entry.landline = landline;
        residents.push(entry);
      }
    });

    const all = loadAllMembers();
    all[id] = { residents };
    saveAllMembers(all);

    statusMsg.textContent = "Your information has been saved.";
    statusMsg.style.color = "green";
  });
});
