// members-directory.js
// Sanctuary Club – Members Directory (backend-first + local fallback)
// Contact status colours aligned with Your Information (YI)

const STORAGE_KEY = "sanctuaryMembers";
const BACKEND_URL = "https://sanctuary-backend-8iqc.onrender.com";

// ---------- Load members safely (local fallback)
function loadMembersLocal() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

// ---------- Load members from backend first
async function loadMembers() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/members-directory`, {
      method: "GET",
      headers: { "Accept": "application/json" },
      mode: "cors"
    });

    const data = await res.json().catch(() => null);

    if (res.ok && data && data.success && data.members && typeof data.members === "object") {
      return data.members;
    }
  } catch (err) {
    console.warn("Members Directory backend load failed; using local fallback.", err);
  }

  return loadMembersLocal();
}

// ---------- Helpers
function pad(n) {
  return String(n).padStart(2, "0");
}

function buildSch() {
  return ["SCH"];
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

function hasResidents(data) {
  return (
    data &&
    Array.isArray(data.residents) &&
    data.residents.length > 0
  );
}

function clean(v) {
  return String(v || "").trim();
}

function isFilledOrNA(v) {
  const s = clean(v).toLowerCase();
  return !!s && (s === "n/a" || s.length > 0);
}

function hasAnyVisibleContact(data) {
  if (!hasResidents(data)) return false;

  return data.residents.some((res, idx) => {
    return (
      clean(res.name) ||
      clean(res.email) ||
      clean(res.mobile) ||
      (idx === 0 && clean(res.landline))
    );
  });
}

function getContactStatus(data) {
  if (!data || !data.joined) return "inactive";
  if (!hasResidents(data)) return "basic";

  let any = false;
  let all = true;

  data.residents.forEach((res, idx) => {
    const fields = [
      res.name,
      res.email,
      res.mobile
    ];

    if (idx === 0) fields.push(res.landline);

    fields.forEach(value => {
      if (clean(value)) any = true;
      if (!isFilledOrNA(value)) all = false;
    });
  });

  if (all) return "complete";
  if (any || hasAnyVisibleContact(data)) return "partial";
  return "basic";
}

function statusLabel(status) {
  if (status === "complete") return "🟢 Contact Info Complete";
  if (status === "partial") return "🟡 Contact Info Partial";
  if (status === "basic") return "🔵 Basic Member Entry";
  return "";
}

// Backwards-compatibility:
// If SCH isn't stored as "SCH" yet, look for the first populated SCH01..SCH06.
function resolveSchData(members) {
  const direct = members["SCH"];
  if (direct && (hasResidents(direct) || direct.joined)) {
    return { idForDisplay: "SCH", data: direct, sourceId: "SCH" };
  }

  for (let i = 1; i <= 6; i++) {
    const legacyId = "SCH" + pad(i);
    const legacy = members[legacyId];
    if (legacy && (hasResidents(legacy) || legacy.joined)) {
      return { idForDisplay: "SCH", data: legacy, sourceId: legacyId };
    }
  }

  return { idForDisplay: "SCH", data: null, sourceId: null };
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

    let data = members[id];
    let displayId = id;

    if (id === "SCH") {
      const resolved = resolveSchData(members);
      data = resolved.data;
      displayId = resolved.idForDisplay;
    }

    const status = getContactStatus(data);
    const isUsable = true;

    if (status === "complete") btn.classList.add("contact-complete");
    else if (status === "partial") btn.classList.add("contact-partial");
    else if (status === "basic") btn.classList.add("contact-basic");
    else btn.classList.add("inactive");

    btn.title = statusLabel(status);

    btn.onclick = () => {
      if (!isUsable) return;

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

      if (!hasResidents(data)) {
        const msg = document.createElement("div");
        msg.style.padding = "0.9rem 1rem";
        msg.style.borderRadius = "10px";
        msg.style.background = "#fff";
        msg.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
        msg.style.color = "#444";
        msg.innerHTML = `
          <strong>${displayId}</strong><br>
          <span style="color:#666;">${statusLabel(status)}</span><br>
          <span style="color:#666;">Member joined — no contact details shared yet.</span>
        `;
        detailArea.appendChild(msg);
        return;
      }

      renderMemberDetail(displayId, data, detailArea, status);
    };

    container.appendChild(btn);
  });
}

// ---------- Render resident cards
function renderMemberDetail(memberId, data, container, status) {
  const heading = document.createElement("div");
  heading.style.margin = "0 0 0.75rem";
  heading.style.color = "#555";
  heading.innerHTML = `<strong>${memberId}</strong> — ${statusLabel(status)}`;
  container.appendChild(heading);

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
document.addEventListener("DOMContentLoaded", async () => {
  const members = await loadMembers();
  const detailArea = document.getElementById("member-detail");

  renderGrid("members-sch", buildSch(), members, detailArea);
  renderGrid("members-mews", buildMews(), members, detailArea);
  renderGrid("members-court", buildCourt(), members, detailArea);
});
