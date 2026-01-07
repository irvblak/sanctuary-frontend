// your-info.js — FINAL, CANONICAL
// Writes directly to sanctuaryMembers for Members Directory compatibility

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("your-info-form");
  if (!form) return;

  const membershipInput = document.getElementById("membership-number");
  const statusMsg = document.getElementById("save-status");

  const STORAGE_KEY = "sanctuaryMembers";

  const residentsConfig = [
    { prefix: "res1", landline: true },
    { prefix: "res2" },
    { prefix: "res3" },
    { prefix: "res4" }
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

  function populateForm(memberData) {
    if (!memberData || !memberData.residents) return;

    residentsConfig.forEach(({ prefix }) => {
      const res = memberData.residents[prefix];
      if (!res) return;

      Object.keys(res).forEach(key => {
        const el = document.getElementById(key);
        if (el) el.value = res[key];
      });
    });
  }

  function collectResidents() {
    const residents = {};
    let hasAnyData = false;

    residentsConfig.forEach(({ prefix, landline }) => {
      const resData = {};
      let filled = false;

      ["name", "email", "mobile"].forEach(field => {
        const id = `${prefix}_${field}`;
        const el = document.getElementById(id);
        if (el && el.value.trim()) {
          resData[id] = el.value.trim();
          filled = true;
        }
      });

      if (landline) {
        const id = `${prefix}_landline`;
        const el = document.getElementById(id);
        if (el && el.value.trim()) {
          resData[id] = el.value.trim();
          filled = true;
        }
      }

      if (filled) {
        residents[prefix] = resData;
        hasAnyData = true;
      }
    });

    return hasAnyData ? residents : null;
  }

  // Load existing data when membership entered
  membershipInput.addEventListener("blur", () => {
    const memberId = membershipInput.value.trim();
    if (!memberId) return;

    const allMembers = loadAllMembers();
    populateForm(allMembers[memberId]);
  });

  // Save handler
  form.addEventListener("submit", e => {
    e.preventDefault();

    const memberId = membershipInput.value.trim();
    if (!memberId) {
      statusMsg.textContent = "Please enter your membership number.";
      statusMsg.style.color = "darkred";
      return;
    }

    const residents = collectResidents();
    if (!residents) {
      statusMsg.textContent = "Please enter at least one detail.";
      statusMsg.style.color = "darkred";
      return;
    }

    const allMembers = loadAllMembers();

    allMembers[memberId] = {
      residents
    };

    saveAllMembers(allMembers);

    statusMsg.textContent = "Your information has been saved.";
    statusMsg.style.color = "green";
  });
});
