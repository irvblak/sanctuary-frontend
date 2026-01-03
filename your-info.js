// your-info.js
// Handles member self-editing of contact info (up to 4 residents)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("your-info-form");
  if (!form) return;

  const membershipInput = document.getElementById("membership-number");
  const statusMsg = document.getElementById("save-status");

  const residentFields = [
    { name: "res1_name", email: "res1_email", mobile: "res1_mobile" },
    { name: "res2_name", email: "res2_email", mobile: "res2_mobile" },
    { name: "res3_name", email: "res3_email", mobile: "res3_mobile" },
    { name: "res4_name", email: "res4_email", mobile: "res4_mobile" }
  ];

  function storageKey(membership) {
    return `member_${membership}`;
  }

  function loadData(membership) {
    const raw = localStorage.getItem(storageKey(membership));
    return raw ? JSON.parse(raw) : {};
  }

  function saveData(membership, data) {
    localStorage.setItem(storageKey(membership), JSON.stringify(data));
  }

  function populateForm(data) {
    residentFields.forEach((res, index) => {
      Object.values(res).forEach((id) => {
        const el = document.getElementById(id);
        if (el && data[res.name]) {
          el.value = data[res.name][id] || "";
        }
      });
    });
  }

  function collectFormData() {
    const data = {};
    residentFields.forEach((res) => {
      const entry = {};
      let hasAny = false;

      Object.values(res).forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.value.trim() !== "") {
          entry[id] = el.value.trim();
          hasAny = true;
        }
      });

      if (hasAny) {
        data[res.name] = entry;
      }
    });
    return data;
  }

  membershipInput.addEventListener("blur", () => {
    const membership = membershipInput.value.trim();
    if (!membership) return;

    const data = loadData(membership);
    populateForm(data);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const membership = membershipInput.value.trim();
    if (!membership) {
      statusMsg.textContent = "Please enter your membership number.";
      statusMsg.style.color = "darkred";
      return;
    }

    const data = collectFormData();
    saveData(membership, data);

    statusMsg.textContent = "Your information has been saved.";
    statusMsg.style.color = "green";
  });
});
