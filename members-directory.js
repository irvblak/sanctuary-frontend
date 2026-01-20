// members-directory.js
// Sanctuary Club – Members Directory (JOINED + DETAILS)

const STORAGE_KEY = "sanctuaryMembers";

// ---------- Load members safely
function loadMembers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

// ---------- Helpers
function pad(n) {
  return String(n).padStart(2, "0");
}

function buildMews() {
  const list = [];
  for (let i = 1; i <= 73; i++) list.push(`SM${pad(i)}`);
  return list;
}

function buildCourt() {
  const list = [];
  for (let i = 1; i <= 43; i++) list.push(`SC${pad(i)}`);
  return list;
}

// ---------- Render grid
function renderGrid(containerId, memberIds, members, detailArea) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  let activeBtn = null;

  memberIds.forEach(id => {
    const btn = document.createElement("button");
    btn.className = "member-button";
    btn.textContent = id;

    const data = members[id];

    const hasResidents =
      data &&
      Array.isArray(data.residents) &&
      data.residents.length > 0;

    const isJoined = !!(data && data.joined);

    // Highlight if joined OR has residents
    if (hasResidents || isJoined) btn.classList.add("has-data");
    else btn.classList.add("inactive");

    btn.onclick = () => {
      // If not joined and no residents, do nothing
      if (!hasResidents && !isJoined) return;

      // Toggle close
      if (activeBtn === btn) {
        btn.classList.remove("active");
        detailArea.innerHTML = "";
        activeBtn = null;
        return;
      }

      if (activeBtn) activeBtn.classList.remove("active");
      activeBtn = btn;
      btn.classList.add("active");
      detailArea.innerHTML = "";

      // Joined but no details yet
      if (isJoined && !hasResidents) {
        const msg = document.createElement("div");
        msg.style.padding = "0.9rem 1rem";
        msg.style.borderRadius = "10px";
        msg.style.background = "#fff";
        msg.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
        msg.style.color = "#444";
        msg.innerHTML = `<strong>${id}</strong><br><span style="color:#666;">Member joined — no contact details shared yet.</span>`;
        detailArea.appendChild(msg);
        return;
      }

      // Otherwise show details
      renderMemberDetail(id, data, detailArea);
    };

    container.appendChild(btn);
  });
}

// ---------- Render resident cards
function renderMemberDetail(memberId, data, container) {
  const wrap = document.createElement("div");
  wrap.className = "member-detail-wrapper";

  (data.residents || []).forEach((res, idx) => {
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

    wrap.appendChild(card);
  });

  container.appendChild(wrap);
}

// ---------- Init
document.addEventListener("DOMContentLoaded", () => {
  const members = loadMembers();
  const detailArea = document.getElementById("member-detail");

  renderGrid("members-mews", buildMews(), members, detailArea);
  renderGrid("members-court", buildCourt(), members, detailArea);
});
