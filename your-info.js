// your-info.js — canonical member self-editing (writes to sanctuaryMembers)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("your-info-form");
  if (!form) return;

  const membershipInput = document.getElementById("membership-number");
  const statusMsg = document.getElementById("save-status");

  const STORAGE_KEY = "sanctuaryMembers";

  const residents = [
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

  function populateForm(memberData) {
    if (!memberData || !memberData.residents) return;

    memberData.residents.forEach((res, i) => {
      const map = residents[i];
      if (!map) return;

      Object.keys(map).forEach(key => {
        const el = document.getElementById(map[key]);
        if (el && res[key]) el.value = res[key];
      });
    });
  }

  function collectResidents() {
    const list = [];

    residents.forEach((map, i) => {
      const res = {};
      let hasData = false;

      Object.keys(map).forEach(key => {
        const el = document.getElementById(map[key]);
        if (el && el.value.trim()) {
          res[key] = el.value.trim();
          hasData = true;
        }
      });

      if (hasData) list.push(res);
    });

    return list;
  }

  membershipInput.addEventListener("blur", () => {
    const id = membershipInput.value.trim().toUpperCase();
    if (!id) return;

    const members = loadAllMembers();
    populateForm(members[id]);
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    const id = membershipInput.value.trim().toUpperCase();
    if (!id) {
      statusMsg.textContent = "Please enter your membership number.";
      statusMsg.style.color = "darkred";
      return;
    }

    const members = loadAllMembers();
    const residentsData = collectResidents();

    members[id] = { residents: residentsData };
    saveAllMembers(members);

    statusMsg.textContent = "Your information has been saved.";
    statusMsg.style.color = "green";
  });
});
