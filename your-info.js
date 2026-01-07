// your-info.js — canonical save + load for Members Directory

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("your-info-form");
  if (!form) return;

  const membershipInput = document.getElementById("membership-number");
  const statusMsg = document.getElementById("save-status");

  const STORAGE_KEY = "sanctuaryMembers";

  const residentDefs = [
    { idx: 0, landline: true },
    { idx: 1 },
    { idx: 2 },
    { idx: 3 }
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

  function readResidentsFromForm() {
    const residents = [];

    residentDefs.forEach(({ idx, landline }) => {
      const name = document.getElementById(`res${idx + 1}_name`)?.value.trim();
      const email = document.getElementById(`res${idx + 1}_email`)?.value.trim();
      const mobile = document.getElementById(`res${idx + 1}_mobile`)?.value.trim();
      const land = landline
        ? document.getElementById(`res${idx + 1}_landline`)?.value.trim()
        : "";

      if (name || email || mobile || land) {
        residents.push({
          name: name || "",
          email: email || "",
          mobile: mobile || "",
          landline: land || ""
        });
      }
    });

    return residents;
  }

  function populateForm(residents = []) {
    residents.forEach((res, i) => {
      if (!residentDefs[i]) return;
      document.getElementById(`res${i + 1}_name`).value = res.name || "";
      document.getElementById(`res${i + 1}_email`).value = res.email || "";
      document.getElementById(`res${i + 1}_mobile`).value = res.mobile || "";
      if (i === 0 && document.getElementById(`res1_landline`)) {
        document.getElementById(`res1_landline`).value = res.landline || "";
      }
    });
  }

  membershipInput.addEventListener("blur", () => {
    const id = membershipInput.value.trim().toUpperCase();
    if (!id) return;

    const all = loadAll();
    if (all[id]?.residents) {
      populateForm(all[id].residents);
    }
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    const id = membershipInput.value.trim().toUpperCase();
    if (!id) {
      statusMsg.textContent = "Please enter your membership number.";
      statusMsg.style.color = "darkred";
      return;
    }

    const residents = readResidentsFromForm();
    const all = loadAll();

    all[id] = { residents };
    saveAll(all);

    statusMsg.textContent = "Your information has been saved.";
    statusMsg.style.color = "green";
  });
});
