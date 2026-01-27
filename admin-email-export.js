// Admin Email Export (frontend-only)
// Reads from localStorage: sanctuaryMembers + sanctuaryPins
// Auth: membership number + PIN (checked against stored hash)

const STORAGE_KEY = "sanctuaryMembers";
const PIN_KEY = "sanctuaryPins";

// Short-lived admin unlock (optional but sensible)
const ADMIN_KEY = "sanctuaryAdminAccess";
const ADMIN_TIME_KEY = "sanctuaryAdminAccessTime";
const ADMIN_TTL_MS = 30 * 60 * 1000; // 30 minutes

const adminMemberIdEl = document.getElementById("adminMemberId");
const adminPinEl = document.getElementById("adminPin");
const adminUnlockBtn = document.getElementById("adminUnlockBtn");
const adminStatusEl = document.getElementById("adminStatus");

const warnBox = document.getElementById("warnBox");
const tools = document.getElementById("tools");

const searchBox = document.getElementById("searchBox");
const downloadCsvBtn = document.getElementById("downloadCsvBtn");
const copyEmailsBtn = document.getElementById("copyEmailsBtn");
const copyUniqueBtn = document.getElementById("copyUniqueBtn");
const countsEl = document.getElementById("counts");
const rowsEl = document.getElementById("rows");

function showWarn(msg){
  warnBox.style.display = "block";
  warnBox.textContent = msg;
}
function clearWarn(){
  warnBox.style.display = "none";
  warnBox.textContent = "";
}

function baseId(raw){
  return String(raw || "").trim().split("/")[0];
}

function loadStore(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function loadPins(){
  try { return JSON.parse(localStorage.getItem(PIN_KEY)) || {}; }
  catch { return {}; }
}

function onlyDigits4(s){ return /^[0-9]{4}$/.test(s); }

async function sha256Hex(str){
  const enc = new TextEncoder().encode(str);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,"0")).join("");
}
async function pinHash(memberId, pin){
  return sha256Hex(`${memberId}::${pin}::sanctuary`);
}

function setAdminUnlocked(state){
  adminStatusEl.textContent = state ? "UNLOCKED" : "LOCKED";
  tools.style.display = state ? "block" : "none";
}

function isAdminSessionFresh(){
  try{
    const ok = sessionStorage.getItem(ADMIN_KEY) === "1";
    const t = Number(sessionStorage.getItem(ADMIN_TIME_KEY) || "0");
    return ok && t && (Date.now() - t) < ADMIN_TTL_MS;
  } catch {
    return false;
  }
}
function setAdminSession(){
  sessionStorage.setItem(ADMIN_KEY, "1");
  sessionStorage.setItem(ADMIN_TIME_KEY, String(Date.now()));
}
function clearAdminSession(){
  sessionStorage.removeItem(ADMIN_KEY);
  sessionStorage.removeItem(ADMIN_TIME_KEY);
}

function formatDate(ts){
  if (!ts) return "";
  try{
    return new Date(ts).toLocaleString();
  } catch {
    return "";
  }
}

function normaliseEmail(email){
  return String(email || "").trim().toLowerCase();
}

function extractRows(){
  const store = loadStore();
  const out = [];

  for (const memberIdKey of Object.keys(store)){
    const entry = store[memberIdKey] || {};
    const residents = Array.isArray(entry.residents) ? entry.residents : [];
    const updated = entry.updated || 0;

    residents.forEach((r, idx) => {
      const name = (r && r.name) ? String(r.name).trim() : "";
      const email = (r && r.email) ? String(r.email).trim() : "";
      const mobile = (r && r.mobile) ? String(r.mobile).trim() : "";
      const landline = (idx === 0 && r && r.landline) ? String(r.landline).trim() : "";

      // include row even if email empty (admin can see who hasn't filled in)
      out.push({
        memberId: memberIdKey,
        residentLabel: `${memberIdKey}/${idx + 1}`,
        name,
        email,
        mobile,
        landline,
        updated
      });
    });

    // If someone has joined but no residents array, include a placeholder row
    if (residents.length === 0 && entry.joined){
      out.push({
        memberId: memberIdKey,
        residentLabel: `${memberIdKey}/1`,
        name: "",
        email: "",
        mobile: "",
        landline: "",
        updated
      });
    }
  }

  // Sort: memberId then residentLabel
  out.sort((a,b) => (a.residentLabel || "").localeCompare(b.residentLabel || ""));
  return out;
}

let allRows = [];

function renderTable(){
  const q = String(searchBox.value || "").trim().toLowerCase();

  const filtered = !q ? allRows : allRows.filter(r => {
    const hay = `${r.memberId} ${r.residentLabel} ${r.name} ${r.email}`.toLowerCase();
    return hay.includes(q);
  });

  rowsEl.innerHTML = "";
  let withEmail = 0;

  filtered.forEach(r => {
    if (normaliseEmail(r.email)) withEmail++;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(r.memberId)}</td>
      <td>
        <div><strong>${escapeHtml(r.residentLabel)}</strong></div>
        <div class="muted">${escapeHtml(r.name || "—")}</div>
      </td>
      <td>${r.email ? `<a href="mailto:${encodeAttr(r.email)}">${escapeHtml(r.email)}</a>` : `<span class="muted">—</span>`}</td>
      <td>${escapeHtml(r.mobile || "—")}</td>
      <td>${escapeHtml(r.landline || "—")}</td>
      <td class="right"><span class="muted">${escapeHtml(formatDate(r.updated) || "—")}</span></td>
    `;
    rowsEl.appendChild(tr);
  });

  const total = filtered.length;
  const totalWithEmail = withEmail;
  countsEl.textContent = `${total} row(s) shown • ${totalWithEmail} with email • ${allRows.length} total row(s) in this browser`;
}

function encodeAttr(s){
  return String(s || "").replace(/"/g, "&quot;");
}
function escapeHtml(s){
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toCsv(rows){
  const headers = ["memberId","resident","name","email","mobile","landline","updated"];
  const lines = [headers.join(",")];

  rows.forEach(r => {
    const vals = [
      r.memberId,
      r.residentLabel,
      r.name,
      r.email,
      r.mobile,
      r.landline,
      r.updated ? new Date(r.updated).toISOString() : ""
    ].map(csvCell);

    lines.push(vals.join(","));
  });

  return lines.join("\n");
}

function csvCell(v){
  const s = String(v ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g,'""')}"`;
  return s;
}

function downloadText(filename, text){
  const blob = new Blob([text], {type:"text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function copyToClipboard(text){
  try{
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try{
      document.execCommand("copy");
      ta.remove();
      return true;
    } catch {
      ta.remove();
      return false;
    }
  }
}

function updateUnlockBtnEnabled(){
  const mid = baseId(adminMemberIdEl.value);
  const pin = adminPinEl.value.trim();
  adminUnlockBtn.disabled = !(mid && onlyDigits4(pin));
}

async function handleAdminUnlock(){
  clearWarn();

  const memberIdKey = baseId(adminMemberIdEl.value);
  if (!memberIdKey) return showWarn("Enter your admin membership number first.");
  const pin = adminPinEl.value.trim();
  if (!onlyDigits4(pin)) return showWarn("Enter a 4-digit admin PIN.");

  const pins = loadPins();
  if (!pins[memberIdKey]){
    return showWarn(
      "No PIN found for this membership number in this browser.\n\n" +
      "This admin tool checks the same PIN storage as Your Information.\n" +
      "If you are on a different device/browser, it won’t know your PIN yet."
    );
  }

  const ok = (await pinHash(memberIdKey, pin)) === pins[memberIdKey];
  if (!ok) return showWarn("Incorrect PIN.");

  setAdminSession();
  setAdminUnlocked(true);

  allRows = extractRows();
  renderTable();

  if (allRows.length === 0){
    showWarn(
      "No member data found in this browser’s localStorage.\n\n" +
      "That means nobody has saved their info on THIS device/browser.\n" +
      "If you need a community-wide export, we’ll need to move member data to the backend."
    );
  }
}

function init(){
  adminMemberIdEl.addEventListener("input", updateUnlockBtnEnabled);
  adminPinEl.addEventListener("input", updateUnlockBtnEnabled);
  adminPinEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !adminUnlockBtn.disabled) handleAdminUnlock();
  });
  adminUnlockBtn.addEventListener("click", handleAdminUnlock);

  searchBox.addEventListener("input", renderTable);

  downloadCsvBtn.addEventListener("click", () => {
    // Export ALL rows currently visible after filter
    const q = String(searchBox.value || "").trim().toLowerCase();
    const rows = !q ? allRows : allRows.filter(r => {
      const hay = `${r.memberId} ${r.residentLabel} ${r.name} ${r.email}`.toLowerCase();
      return hay.includes(q);
    });

    const csv = toCsv(rows);
    const stamp = new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");
    downloadText(`sanctuary-emails-${stamp}.csv`, csv);
  });

  copyEmailsBtn.addEventListener("click", async () => {
    const emails = allRows
      .map(r => normaliseEmail(r.email))
      .filter(Boolean);

    // Dedup but keep order
    const seen = new Set();
    const unique = [];
    for (const e of emails){
      if (!seen.has(e)){
        seen.add(e);
        unique.push(e);
      }
    }

    const ok = await copyToClipboard(unique.join(", "));
    if (!ok) showWarn("Could not copy to clipboard on this browser.");
    else alert(`Copied ${unique.length} email(s) to clipboard.`);
  });

  copyUniqueBtn.addEventListener("click", async () => {
    const emails = allRows
      .map(r => normaliseEmail(r.email))
      .filter(Boolean);

    const unique = Array.from(new Set(emails)).sort();
    const ok = await copyToClipboard(unique.join("\n"));
    if (!ok) showWarn("Could not copy to clipboard on this browser.");
    else alert(`Copied ${unique.length} unique email(s) (one per line).`);
  });

  // Auto-unlock if session is fresh
  if (isAdminSessionFresh()){
    setAdminUnlocked(true);
    allRows = extractRows();
    renderTable();
  } else {
    clearAdminSession();
    setAdminUnlocked(false);
  }

  updateUnlockBtnEnabled();
}

init();
