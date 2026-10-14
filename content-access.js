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
const currentMembers=members.filter(t=>String(decode(t).rid||"").toUpperCase()===activeResident);
const candidates=[...new Set([...currentMembers.filter(t=>(decode(t).roles||[]).includes("admin_website")),...currentMembers,...admins])];
let managerToken="";
const api={decode,token:()=>managerToken,memberToken:()=>currentMembers[0]||"",ready:null};window.SanctuaryContentAccess=api;
api.ready=(async()=>{for(const candidate of candidates){for(let attempt=0;attempt<2;attempt++){try{const response=await fetch(API+"/api/content-authority",{headers:{Authorization:"Bearer "+candidate},cache:"no-store"});if(response.status>=500&&attempt===0)continue;const data=await response.json().catch(()=>({}));if(response.ok&&data.can_manage_content===true){managerToken=candidate;return true;}break;}catch(_){if(attempt===1)break;}}}return false;})();
})();
