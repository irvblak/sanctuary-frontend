// your-info.js
// Handles member self-managed contact information
// Storage is local (localStorage) for now — no server required

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("member-info-form");
  if (!form) return;

  const memberNumberInput = document.getElementById("member-number");
  const residentCountSelect = document.getElementById("resident-count");
  const residentsContainer = document.getElementById("residents-container");
  const statusMsg = document.getElementById("save-status");

  const STORAGE_KEY_PREFIX = "sanctuary-member-";

  /* --------------------------------------------------
     Helpers
  -------------------------------------------------- */

  function storageKey(memberNumber) {
    return STORAGE_KEY_PREFIX + memberNumber.toUpperCase();
  }

  function clearResidents() {
    residentsContainer.innerHTML = "";
  }

  function createResidentFields(index, data = {}) {
    const wrapper = document.createElement("div");
    wrapper.className = "resident-block";

    wrapper.innerHTML = `
      <h4>Resident ${index + 1}</h4>
      <label>
        Name (optional)
        <input type="text" name="resident_name_${index}" value="${data.name || ""}">
      </label>

      <label>
        Email (optional)
        <input type="email" name="resident_email_${index}" value="${data.email || ""}">
      </label>

      <label>
        Mobile (optional)
        <input type="tel" name="resident_mobile_${index}" value="${data.mobile || ""}">
      </label>

      <label>
        Phone (optional)
        <input type="tel" name="resident_phone_${index}" value="${data.phone || ""}">
      </label>
    `;

    residentsContainer.appendChild(wrapper);
  }

  function buildResidents(count, existing = []) {
    clearResidents();
    for (let i = 0; i < count; i++) {
      createResidentFields(i, existing[i]);
    }
  }

  /* --------------------------------------------------
     Load existing data when membership number entered
  -------------------------------------------------- */

  memberNumberInput.addEventListener("change", () => {
    const memberNumber = memberNumberInput.value.trim();
    if (!memberNumber) return;

    const saved = localStorage.getItem(storageKey(memberNumber));
    if (!saved) {
      buildResidents(parseInt(residentCountSelect.value, 10));
      return;
    }

    try {
      const data = JSON.parse(saved);
      residentCountSelect.value = data.residentCount || 1;
      buildResidents(data.residentCount || 1, data.residents || []);
    } catch (e) {
      console.warn("Corrupt member data:", e);
      buildResidents(parseInt(residentCountSelect.value, 10));
    }
  });

  /* --------------------------------------------------
     Change resident count
  -------------------------------------------------- */

  residentCountSelect.addEventListener("change", () => {
    const count = parseInt(residentCountSelect.value, 10);
    buildResidents(count);
  });

  /* --------------------------------------------------
     Save
  -------------------------------------------------- */

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const memberNumber = memberNumberInput.value.trim();
    if (!memberNumber) {
      alert("Please enter your membership number.");
      return;
    }

    const residentCount = parseInt(residentCountSelect.value, 10);
    const residents = [];

    for (let i = 0; i < residentCount; i++) {
      residents.push({
        name: form[`resident_name_${i}`]?.value.trim() || "",
        email: form[`resident_email_${i}`]?.value.trim() || "",
        mobile: form[`resident_mobile_${i}`]?.value.trim() || "",
        phone: form[`resident_phone_${i}`]?.value.trim() || ""
      });
    }

    const payload = {
      memberNumber: memberNumber.toUpperCase(),
      residentCount,
      residents,
      savedAt: new Date().toISOString()
    };

    localStorage.setItem(storageKey(memberNumber), JSON.stringify(payload));

    statusMsg.textContent = "Your information has been saved.";
    statusMsg.style.display = "block";

    setTimeout(() => {
      statusMsg.style.display = "none";
    }, 3000);
  });
});
