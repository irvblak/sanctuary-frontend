const API_BASE = "https://sanctuary-backend-8iqc.onrender.com";
const TOKEN_KEY = "adminToken";

const downloadCsvBtn = document.getElementById("downloadCsvBtn");
const copyEmailsBtn = document.getElementById("copyEmailsBtn");
const copyUniqueBtn = document.getElementById("copyUniqueBtn");

const warnBox = document.getElementById("warnBox");
const okBox = document.getElementById("okBox");

function showWarn(msg){
  warnBox.style.display = "block";
  warnBox.textContent = msg;
  okBox.style.display = "none";
  okBox.textContent = "";
}

function showOk(msg){
  okBox.style.display = "block";
  okBox.textContent = msg;
  warnBox.style.display = "none";
  warnBox.textContent = "";
}

function clearMessages(){
  warnBox.style.display = "none";
  warnBox.textContent = "";
  okBox.style.display = "none";
  okBox.textContent = "";
}

function getAdminToken(){
  return localStorage.getItem(TOKEN_KEY) || "";
}

function getAuthHeaders(extra = {}){
  const token = getAdminToken();
  return {
    "Authorization": `Bearer ${token}`,
    ...extra
  };
}

async function fetchText(url){
  const res = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders()
  });

  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();

  if (!res.ok){
    if (contentType.includes("application/json")){
      try{
        const data = JSON.parse(text);
        throw new Error(data.message || `Request failed (${res.status})`);
      }catch{
        throw new Error(`Request failed (${res.status})`);
      }
    }
    throw new Error(text || `Request failed (${res.status})`);
  }

  return text;
}

async function downloadCsv(){
  clearMessages();

  const token = getAdminToken();
  if (!token){
    showWarn("Admin token not found. Please log in again.");
    return;
  }

  downloadCsvBtn.disabled = true;

  try{
    const res = await fetch(`${API_BASE}/api/admin/emails.csv`, {
      method: "GET",
      headers: getAuthHeaders()
    });

    const contentType = res.headers.get("content-type") || "";

    if (!res.ok){
      if (contentType.includes("application/json")){
        const data = await res.json();
        throw new Error(data.message || `Export failed (${res.status})`);
      } else {
        const text = await res.text();
        throw new Error(text || `Export failed (${res.status})`);
      }
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    let filename = "sanctuary_emails.csv";
    const dispo = res.headers.get("content-disposition") || "";
    const match = dispo.match(/filename="?([^"]+)"?/i);
    if (match && match[1]) filename = match[1];

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    showOk("CSV export downloaded.");
  } catch (err){
    showWarn(err.message || "CSV export failed.");
  } finally {
    downloadCsvBtn.disabled = false;
  }
}

function normaliseLines(text){
  return text
    .split(/\r?\n/)
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);
}

async function copyToClipboard(text){
  try{
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
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

async function copyCommaEmails(){
  clearMessages();
  copyEmailsBtn.disabled = true;

  try{
    const text = await fetchText(`${API_BASE}/api/admin/emails.txt`);
    const emails = normaliseLines(text);

    if (!emails.length){
      showWarn("No email addresses were returned.");
      return;
    }

    const ok = await copyToClipboard(emails.join(", "));
    if (!ok){
      showWarn("Could not copy to clipboard on this browser.");
      return;
    }

    showOk(`Copied ${emails.length} email(s) as comma-separated text.`);
  } catch (err){
    showWarn(err.message || "Could not fetch email list.");
  } finally {
    copyEmailsBtn.disabled = false;
  }
}

async function copyUniqueLines(){
  clearMessages();
  copyUniqueBtn.disabled = true;

  try{
    const text = await fetchText(`${API_BASE}/api/admin/emails.txt`);
    const emails = Array.from(new Set(normaliseLines(text))).sort();

    if (!emails.length){
      showWarn("No email addresses were returned.");
      return;
    }

    const ok = await copyToClipboard(emails.join("\n"));
    if (!ok){
      showWarn("Could not copy to clipboard on this browser.");
      return;
    }

    showOk(`Copied ${emails.length} unique email(s), one per line.`);
  } catch (err){
    showWarn(err.message || "Could not fetch email list.");
  } finally {
    copyUniqueBtn.disabled = false;
  }
}

function init(){
  downloadCsvBtn.addEventListener("click", downloadCsv);
  copyEmailsBtn.addEventListener("click", copyCommaEmails);
  copyUniqueBtn.addEventListener("click", copyUniqueLines);
}

init();
