(function(){
"use strict";
const API="https://sanctuary-backend-8iqc.onrender.com";
const token=localStorage.getItem("adminToken")||sessionStorage.getItem("adminToken")||"";
if(!token)return;
function decode(t){try{let p=String(t).split(".")[0].replace(/-/g,"+").replace(/_/g,"/");while(p.length%4)p+="=";return JSON.parse(atob(p))}catch(_){return {}}}
const payload=decode(token);if(!Number(payload.exp)||Number(payload.exp)*1000<=Date.now())return;
async function validate(){try{const r=await fetch(API+"/api/admin/whoami",{headers:{Authorization:"Bearer "+token},cache:"no-store"});const d=await r.json().catch(()=>({}));return r.ok&&d.success===true&&d.is_admin===true}catch(_){return false}}
function eventId(){const q=new URLSearchParams(location.search);return q.get("event_id")||q.get("eventId")||q.get("id")||q.get("ref")||""}
function injectEventAdmin(){
 const id=eventId();if(!id)return;
 const box=document.createElement("div");box.id="waPageAdmin";box.style.cssText="position:fixed;right:12px;bottom:12px;z-index:99998;font:14px system-ui;display:flex;gap:6px;align-items:center";
 const open=document.createElement("button");open.textContent="Admin";open.style.cssText="border:1px solid #c8ced4;background:#eceff2;color:#59636c;border-radius:999px;padding:7px 11px;font-weight:700;cursor:pointer";
 const actions=document.createElement("span");actions.hidden=true;
 const edit=document.createElement("button");edit.textContent="Edit";const del=document.createElement("button");del.textContent="Delete";
 [edit,del].forEach(b=>b.style.cssText="border:1px solid #c8ced4;background:#fff;color:#4d5963;border-radius:999px;padding:7px 11px;font-weight:700;cursor:pointer");
 actions.append(edit,del);box.append(open,actions);document.body.appendChild(box);
 open.onclick=()=>{actions.hidden=!actions.hidden};
 edit.onclick=()=>{sessionStorage.setItem("sanctuaryEntryRoute","info");sessionStorage.setItem("sanctuaryAdminDirect","1");location.href="host-event-form.html?event_id="+encodeURIComponent(id)+"&admin=1"};
 del.onclick=async()=>{if(!confirm("Delete this event, its linked Notice and its bookings? This cannot be undone."))return;del.disabled=true;try{const r=await fetch(API+"/api/admin/events/"+encodeURIComponent(id),{method:"DELETE",headers:{Authorization:"Bearer "+token}});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.message||"Delete failed.");alert("Event removed.");location.href="events.html"}catch(e){alert(e.message);del.disabled=false}};
}
function injectDeclaredControls(){
 document.querySelectorAll("[data-wa-admin-edit],[data-wa-admin-delete]").forEach(el=>{el.hidden=false});
}
validate().then(ok=>{if(!ok)return;document.documentElement.dataset.waAdmin="true";if(location.pathname.toLowerCase().endsWith("/events-details.html")||location.pathname.toLowerCase().endsWith("events-details.html"))injectEventAdmin();injectDeclaredControls()});
})();