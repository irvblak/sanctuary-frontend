// =====================================
// Sanctuary Club – Your Information
// Canonical member self-editing script
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("your-info-form");
  if (!form) return;

  const membershipInput = document.getElementById("membership-number");
  const statusMsg = document.getElementById("save-status");

  const STORAGE_KEY = "sanctuaryMembers";

  // ---- Helpers --------------------------------------------------

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

  function normaliseMembership(raw) {
    return raw.trim().toUpperCase();
  }

  // ---- Collect residents from form ----------------------------

  function collectResidents() {
    const residents = [];

    for (let i = 1; i <= 4; i++) {
      const name = document.getElementById(`res${i}_name`)?.value.trim() || "";
      const email = document.getElementById(`res${i}_email`)?.value.trim() || "";
      const mobile = document.getElementById(`res${i}_mobile`)?.value.trim() || "";
      const landline =
        i === 1
          ? document.getElementById("res1_landline")?.value.trim() || ""
          : "";

      if (name || email || mobile || landline) {
        residents.push({ name, email, mobile, landline });
      }
    }

    return residents;
  }

  // ---- Populate form from stored data --------------------------

  function populateForm(memberData) {
    if (!memberData || !Array.isArray(memberData.residents)) return;

    memberData.residents.forEach((res, idx) => {
      const i = idx + 1;
      if (i > 4) return;

      if (res.name)
        document.getElementById(`res${i}_name`).value = res.name;
      if (res.email)
        document.getElementById(`res${i}_email`).value = res.email;
      if (res.mobile)
        document.getElementById(`res${i}_mobile`).value = res.mobile;
      if (i === 1 && res.landline)
        document.getElementById("res1_landline").value = res.landline;
    });
  }

  // ---- Load existing data when membership entered --------------

  membershipInput.addEventListener("blur", () => {
    const membership = normaliseMembership(membershipInput.value);
    if (!membership) return;

    membershipInput.value = membership;

    const allMembers = loadAllMembers();
    populateForm(allMembers[membership]);
  });

  // ---- Save handler --------------------------------------------

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const membership = normaliseMembership(membershipInput.value);

    if (!membership) {
      statusMsg.textContent = "Please enter your membership number.";
      statusMsg.style.color = "darkred";
      return;
    }

    const residents = collectResidents();
    const allMembers = loadAllMembers();

    if (residents.length === 0) {
      delete allMembers[membership];
    } else {
      allMembers[membership] = { residents };
    }

    saveAllMembers(allMembers);

    statusMsg.textContent = "Your information has been saved.";
    statusMsg.style.color = "green";
  });
});
