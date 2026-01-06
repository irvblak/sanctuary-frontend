 // members-directory.js
// =====================================
// Sanctuary Club – Members Directory
// =====================================

// ---- Storage key (single source of truth)
const STORAGE_KEY = "sanctuaryMembers";

// ---- Load stored data
function loadMembers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

// ---- Save helper (future admin use)
function saveMembers(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ---- Utility: format member IDs
function pad(num) {
  return num.toString().padStart(2, "0");
}

// ---- Build member ID lists
function buildMemberList() {
  const list = [];

  // Clubhouse staff
  list.push("SCH");

  // Sanctuary Mews SM01–SM73
  for (let i = 1; i <= 73; i++) {
    list.push(`SM${pad(i)}`);
  }

  // Sanctuary Court SC01–SC43
  for (let i = 1; i <= 43; i++) {
    list.push(`SC${pad(i)}`);
  }

  return list;
}

// ---- Render directory grid
function renderDirectory() {
  const members = loadMembers();
  const container = document.getElementById("members-directory");
  const detailArea = document.getElementById("member-detail");

  if (!container || !detailArea) return;

  container.innerHTML = "";
  detailArea.innerHTML = "";

  let activeButton = null;

  buildMemberList().forEach(memberId => {
    const btn = document.createElement("button");
    btn.textContent = memberId;
    btn.className = "member-button";

    const hasData = !!members[memberId];
    if (!hasData) {
      btn.classList.add("inactive");
    }

    btn.addEventListener("click", () => {
      // Collapse previous
      if (activeButton === btn) {
        detailArea.innerHTML = "";
        activeButton.classList.remove("active");
        activeButton = null;
        return;
      }

      if (activeButton) {
        activeButton.classList.remove("active");
      }

      activeButton = btn;
      btn.classList.add("active");
      detailArea.innerHTML = "";

      if (!members[memberId]) return;

      renderMemberDetail(memberId, members[memberId], detailArea);
    });

    container.appendChild(btn);
  });
}

// ---- Render household detail
function renderMemberDetail(memberId, data, container) {
  const wrapper = document.createElement("div");
  wrapper.className = "member-detail-wrapper";

  const title = document.createElement("h3");
  title.textContent = memberId;
  wrapper.appendChild(title);

  (data.residents || []).forEach((res, idx) => {
    const card = document.createElement("div");
    card.className = "resident-card";

    card.innerHTML = `
      <div class="resident-header">Resident ${idx + 1}</div>
      <div class="resident-row"><span>Name</span><span>${res.name || "—"}</span></div>
      <div class="resident-row"><span>Email</span><span>${res.email || "—"}</span></div>
      <div class="resident-row"><span>Mobile</span><span>${res.mobile || "—"}</span></div>
      ${idx === 0
        ? `<div class="resident-row"><span>Landline</span><span>${res.landline || "—"}</span></div>`
        : ""
      }
    `;

    wrapper.appendChild(card);
  });

  container.appendChild(wrapper);
}

// ---- Init
document.addEventListener("DOMContentLoaded", renderDirectory);
