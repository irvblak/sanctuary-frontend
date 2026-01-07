// your-info.js
// Handles member self-editing of contact info (up to 4 residents)
// Writes to BOTH personal storage and shared directory storage

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("your-info-form");
  if (!form) return;

  const membershipInput = document.getElementById("membership-number");
  const statusMsg = document.getElementById("save-status");

  const STORAGE_KEY = "sanctuaryMembers";

  const residents = [
    { prefix: "res1", hasLandline: true },
    { prefix: "res2" },
    { prefix: "res3" },
    { prefix: "res4" }
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
    if (!memberData || !memberData.residents) return;

    memberData.residents.forEach((res, idx) => {
      const base = residents[idx]?.prefix;
      if (!base) return;

      if (res.name) document.getElementById(`${base}_name`).value = res.name;
      if (res.email) document.getElementById(`${base}_email`).value = res.email;
      if (res.mobile) document.getElementById(`${base}_mobile`).value = res.mobile;
      if (res.landline)
        document.getElementById(`${base}_landline`).value = res.landline;
    });
  }

  function collectResidents() {
    const list = [];

    residents.forEach(({ prefix, hasLandline }) => {
      const name = document.getElementById(`${prefix}_name`)?.value.trim();
      const email = document.getElementById(`${prefix}_email`)?.value.trim();
      const mobile = document.getElementById(`${prefix}_mobile`)?.value.trim();
      const landline = hasLandline
        ? document.getElementById(`${prefix}_landline`)?.value.trim()
        : "";

      if (name || email || mobile || landline) {
        list.push({
          name: name || "",
          email: email || "",
          mobile: mobile || "",
          landline: landline || ""
        });
      }
    });

    return list;
  }

  membershipInput.addEventListener("blur", () => {
    const membership = membershipInput.value.trim();
    if (!membership) return;

    const directory = loadDirectory();
    populateForm(directory[membership]);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const membership = membershipInput.value.trim();
    if (!membership) {
      statusMsg.textContent = "Please enter your membership number.";
      statusMsg.style.color = "darkred";
      return;
    }

    const residentsData = collectResidents();
    const directory = loadDirectory();

    directory[membership] = {
      residents: residentsData
    };

    saveDirectory(directory);

    statusMsg.textContent = "Your information has been saved.";
    statusMsg.style.color = "green";
  });
});
