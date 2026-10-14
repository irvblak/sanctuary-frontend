(function(){
"use strict";
const API="https://sanctuary-backend-8iqc.onrender.com";
function decode(token){try{let body=String(token||"").split(".")[0].replace(/-/g,"+").replace(/_/g,"/");while(body.length%4)body+="=";return JSON.parse(atob(body));}catch(_){return {};}}
function active(token){const p=decode(token);return Number(p.exp)*1000>Date.now();}
const members=[sessionStorage.getItem("authToken"),sessionStorage.getItem("ydsAuthToken"),localStorage.getItem("authToken"),sessionStorage.getItem("memberToken"),localStorage.getItem("memberToken")].filter(t=>t&&active(t)&&decode(t).account_type!=="sch_publisher");
const admins=[sessionStorage.getItem("adminToken"),localStorage.getItem("adminToken")].filter(t=>t&&active(t)&&(decode(t).roles||[]).includes("admin"));
const candidate=members.find(t=>(decode(t).roles||[]).includes("admin_website"))||admins[0]||members[0]||"";
let allowed=false,resolved=false;
const api={decode,token:()=>allowed||(!resolved&&((decode(candidate).roles||[]).includes("admin_website")||(decode(candidate).roles||[]).includes("admin")))?candidate:"",ready:null};window.SanctuaryContentAccess=api;
api.ready=candidate?fetch(API+"/api/content-authority",{headers:{Authorization:"Bearer "+candidate},cache:"no-store"}).then(async response=>{const data=await response.json().catch(()=>({}));resolved=true;allowed=response.ok&&data.can_manage_content===true;return allowed;}).catch(()=>{resolved=true;return false;}):Promise.resolve(false);
})();
