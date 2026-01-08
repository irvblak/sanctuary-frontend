// members-directory.js
// =====================================
// Sanctuary Club – Members Directory
// Reads from localStorage["sanctuaryMembers"]
// =====================================

const STORAGE_KEY = "sanctuaryMembers";

// ---- Load all members
function loadMembers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

// ---- Pad helper
function pad(num) {
  return num.toString().padStart(2, "0");
}

// ---- Build Sanctuary Mews list
function buildMews() {
  const list = ["SCH"];
  for (let i = 1; i <= 73; i++) list.push(`SM${pad(i)}`);
  return list;
}

// ---- Build Sanctuary Court list
function buildCourt() {
  const list = [];
  for (let i = 1; i <= 43; i++) list.push(`SC${pad(i)}`);
  return list;
}

// ---- Render a grid
function renderGrid(containerId, memberIds, members, detailArea) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  let activeButton = null;

  memberIds.forEach(memberId => {
    const btn = document.createElement("button");
    btn.textContent = memberId;
    btn.className = "member-button";

    const data = members[memberId];
    const hasData = data && Array.isArray(data.residents) && data.residents.length > 0;

    if (!hasData) btn.classList.add("inactive");

    btn.addEventListener("click", () => {
      if (activeButton === btn) {
        btn.classList.remove("active");
        detailArea.innerHTML = "";
        activeButton = null;
        return;
      }

      if (activeButton) activeButton.classList.remove("active");

      activeButton = btn;
      btn.classList.add("active");
      detailArea.innerHTML = "";

      if (hasData) {
        renderMemberDetail(memberId, data, detailArea);
      }
    });

    container.appendChild(btn);
  });
}

// ---- Render household detail
function renderMemberDetail(memberId, data, container) {
  const wrapper = document.createElement("div");
  wrapper.className = "member-detail-wrapper";

  data.residents.forEach((res, idx) => {
    const card = document.createElement("div");
    card.className = "resident-card";

    card.innerHTML = `
      <div class="resident-header">Resident ${idx + 1}</div>
      <div class="resident-row"><span>Name</span><span>${res.name || "—"}</span></div>
      <div class="resident-row"><span>Email</span><span>${res.email || "—"}</span></div>
      <div class="resident-row"><span>Mobile</span><span>${res.mobile || "—"}</span></div>
      ${
        idx === 0
          ? `<div class="resident-row"><span>Landline</span><span>${res.landline || "—"}</span></div>`
          : ""
      }
    `;

    wrapper.appendChild(card);
  });

  container.appendChild(wrapper);
}

// ---- Init
document.addEventListener("DOMContentLoaded", () => {
  const members = loadMembers();
  const detailArea = document.getElementById("member-detail");

  renderGrid("members-mews", buildMews(), members, detailArea);
  renderGrid("members-court", buildCourt(), members, detailArea);
});
