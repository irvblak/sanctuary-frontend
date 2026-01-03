// your-info.js
// Member self-managed contact details (local-only, safe, reversible)

(function () {
  const FORM_ID = "your-info-form";
  const STORAGE_KEY = "sanctuaryMemberInfo";

  const form = document.getElementById(FORM_ID);
  if (!form) return;

  const membershipInput = form.querySelector("#membership-number");
  const residentsContainer = document.getElementById("residents-container");
  const addResidentBtn = document.getElementById("add-resident");
  const statusMsg = document.getElementById("save-status");

  let memberData = loadAllData();

  // -------------------------------
  // Utilities
  // -------------------------------
  function loadAllData() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveAllData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memberData));
  }

  function createResidentBlock(index, data = {}) {
    const div = document.createElement("div");
    div.className = "resident-block";

    div.innerHTML = `
      <h3>Resident ${index + 1}</h3>

      <label>
        Name
        <input type="text" name="name" value="${data.name || ""}">
      </label>

      <label>
        Email
        <input type="email" name="email" value="${data.email || ""}">
      </label>

      <label>
        Mobile
        <input type="tel" name="mobile" value="${data.mobile || ""}">
      </label>

      <label>
        Phone
        <input type="tel" name="phone" value="${data.phone || ""}">
      </label>
    `;

    return div;
  }

  function renderResidents(residents = []) {
    residentsContainer.innerHTML = "";
    residents.forEach((r, i) => {
      residentsContainer.appendChild(createResidentBlock(i, r));
    });
  }

  function collectResidents() {
    const blocks = residentsContainer.querySelectorAll(".resident-block");
    const residents = [];

    blocks.forEach(block => {
      const inputs = block.querySelectorAll("input");
      const resident = {};

      inputs.forEach(input => {
        if (input.value.trim() !== "") {
          resident[input.name] = input.value.trim();
        }
      });

      if (Object.keys(resident).length > 0) {
        residents.push(resident);
      }
    });

    return residents;
  }

  // -------------------------------
  // Load existing member data
  // -------------------------------
  membershipInput.addEventListener("blur", () => {
    const key = membershipInput.value.trim();
    if (!key) return;

    const existing = memberData[key];
    if (existing && existing.residents) {
      renderResidents(existing.residents);
    } else {
      renderResidents([{}]);
    }
  });

  // -------------------------------
  // Add resident (max 4)
  // -------------------------------
  addResidentBtn.addEventListener("click", () => {
    const count = residentsContainer.children.length;
    if (count >= 4) return;

    residentsContainer.appendChild(createResidentBlock(count));
  });

  // -------------------------------
  // Save handler
  // -------------------------------
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const membership = membershipInput.value.trim();
    if (!membership) {
      statusMsg.textContent = "Membership number is required.";
      return;
    }

    const residents = collectResidents();

    memberData[membership] = {
      residents,
      updated: Date.now()
    };

    saveAllData();

    statusMsg.textContent = "Your information has been saved.";
    statusMsg.style.opacity = 1;
  });

})();
