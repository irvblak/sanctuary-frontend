(function(){
"use strict";
const API="https://sanctuary-backend-8iqc.onrender.com";
function decode(token){try{let body=String(token||"").split(".")[0].replace(/-/g,"+").replace(/_/g,"/");while(body.length%4)body+="=";return JSON.parse(atob(body));}catch(_){return {};}}
function active(token){return Number(decode(token).exp)*1000>Date.now();}
const members=[sessionStorage.getItem("ydsAuthToken"),sessionStorage.getItem("authToken"),localStorage.getItem("memberToken"),sessionStorage.getItem("memberToken"),localStorage.getItem("authToken")].filter(t=>t&&active(t)&&decode(t).account_type!=="sch_publisher");
const admins=[sessionStorage.getItem("adminToken"),localStorage.getItem("adminToken")].filter(t=>t&&active(t)&&(decode(t).roles||[]).includes("admin"));
// Keep checks within the active resident's identity; stale tokens for another
// resident must never grant authority after an account switch.
const activeResident=String(sessionStorage.getItem("currentResidentId")||localStorage.getItem("currentResidentId")||decode(members[0]).rid||"").toUpperCase();
const activeMembership=String(sessionStorage.getItem("currentMemberId")||localStorage.getItem("currentMemberId")||activeResident.split("/")[0]||decode(members[0]).mid||"").toUpperCase();
const currentMembers=members.filter(t=>{const d=decode(t),rid=String(d.rid||"").toUpperCase();return rid?rid===activeResident:String(d.mid||"").toUpperCase()===activeMembership;});
const candidates=[...new Set([...currentMembers.filter(t=>(decode(t).roles||[]).includes("admin_website")),...currentMembers,...admins])];
let managerToken="",selectedMemberToken=currentMembers[0]||"";
const api={decode,token:()=>managerToken,memberToken:()=>selectedMemberToken,ready:null};window.SanctuaryContentAccess=api;
api.ready=(async()=>{
// A household login has no resident role identity. Reuse the resident already
// selected for this household, with a server-validated token and original expiry.
const household=currentMembers.find(t=>!decode(t).rid);
if(household&&/^(SM|SC)\d{2}\/[1-4]$/.test(activeResident)&&activeResident.split('/')[0]===String(decode(household).mid||'').toUpperCase()&&!decode(household).starter_pin){
 try{const response=await fetch(API+'/auth/studio-session',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+household},body:JSON.stringify({residentId:activeResident})});const data=await response.json().catch(()=>({}));
 if(response.ok&&data.token&&decode(data.token).rid===activeResident&&active(data.token)){selectedMemberToken=data.token;candidates.unshift(data.token);sessionStorage.setItem('ydsAuthToken',data.token);sessionStorage.setItem('authToken',data.token);sessionStorage.setItem('currentResidentId',activeResident);}}
 catch(_){/* Ordinary household access still remains available. */}
}
for(const candidate of candidates){for(let attempt=0;attempt<2;attempt++){try{const response=await fetch(API+"/api/content-authority",{headers:{Authorization:"Bearer "+candidate},cache:"no-store"});if(response.status>=500&&attempt===0)continue;const data=await response.json().catch(()=>({}));if(response.ok&&data.can_manage_content===true){managerToken=candidate;return true;}break;}catch(_){if(attempt===1)break;}}}return false;})();
})();

