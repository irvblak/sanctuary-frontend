/* Persistent on-site notices for approved, open correspondence to a member's body. */
(function(){
'use strict';
if(window.SanctuaryLetterNotifications)return;
const API='https://sanctuary-backend-8iqc.onrender.com';
let panel=null,busy=false;
function decode(token){try{let body=String(token||'').split('.')[0].replace(/-/g,'+').replace(/_/g,'/');body+='='.repeat((4-body.length%4)%4);return JSON.parse(atob(body));}catch(_){return {};}}
function memberToken(){
 if(!window.SanctuaryAccess?.verifiedPrivateAccess())return '';
 const mid=String(sessionStorage.getItem('currentMemberId')||localStorage.getItem('currentMemberId')||'').toUpperCase();
 return [sessionStorage.getItem('ydsAuthToken'),sessionStorage.getItem('authToken'),localStorage.getItem('memberToken'),sessionStorage.getItem('memberToken'),localStorage.getItem('authToken')].find(token=>{
  const d=decode(token);return token&&Number(d.exp)*1000>Date.now()&&!d.starter_pin&&d.account_type!=='sch_publisher'&&!String(d.sub||'').startsWith('admin:')&&/^(SM|SC)\d{2}$/.test(d.mid||'')&&(!mid||d.mid===mid);
 })||'';
}
function clear(){if(panel)panel.remove();panel=null;}
function render(people){
 const relevant=people.filter(person=>Array.isArray(person.cases)&&person.cases.length);
 if(!relevant.length){clear();return;}
 const open=panel?panel.querySelector('details').open:true;
 if(!panel){panel=document.createElement('aside');panel.id='sanctuary-letter-cases';panel.setAttribute('aria-label','Letters requiring attention');document.body.append(panel);}
 panel.replaceChildren();const details=document.createElement('details');details.open=open;
 const summary=document.createElement('summary'),count=new Set(relevant.flatMap(person=>person.cases.map(item=>item.thread_id))).size;
 summary.textContent='Letters in progress ('+count+')';details.append(summary);
 const content=document.createElement('div');content.className='letter-cases-content';
 for(const person of relevant){
  const heading=document.createElement('p');heading.className='letter-cases-person';heading.textContent=person.name+' ('+person.resident_id+')';content.append(heading);
  const list=document.createElement('ul');
  for(const item of person.cases){const row=document.createElement('li'),link=document.createElement('a'),destination=document.createElement('small');link.href='panel-letters.html?id='+encodeURIComponent(item.thread_id)+'&resident='+encodeURIComponent(person.resident_id);link.textContent=item.title||'Letter';destination.textContent=item.destination_label||'';row.append(link,destination);list.append(row);}
  content.append(list);
 }
 const note=document.createElement('p');note.className='letter-cases-note';note.textContent='These notices remain until the author or relevant Secretary closes the case.';content.append(note);details.append(content);panel.append(details);
}
async function refresh(){
 const token=memberToken();if(!token){clear();return;}
 if(busy||document.visibilityState==='hidden')return;
 busy=true;const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);
 try{
  const response=await fetch(API+'/api/household-letter-cases',{headers:{Authorization:'Bearer '+token},cache:'no-store',signal:controller.signal});
  if(memberToken()!==token){clear();return;}
  if(response.status===401||response.status===403){clear();return;}
  if(!response.ok)return;
  const data=await response.json();if(memberToken()!==token){clear();return;}
  if(data.success&&Array.isArray(data.people))render(data.people);
 }catch(_){/* Keep an existing notice through a temporary outage; never mark it closed locally. */}
 finally{clearTimeout(timeout);busy=false;}
}
window.SanctuaryLetterNotifications={refresh};
function start(){
 const style=document.createElement('style');style.textContent='#sanctuary-letter-cases{position:fixed;right:1rem;bottom:1rem;z-index:1000;width:min(360px,calc(100vw - 2rem));font:600 17px/1.45 system-ui,sans-serif;color:#203747;background:#fff;border:2px solid #7a263a;border-radius:14px;box-shadow:0 6px 24px #0003;overflow:hidden}#sanctuary-letter-cases summary{padding:.7rem 1rem;cursor:pointer;background:#7a263a;color:#fff;font-weight:800}#sanctuary-letter-cases .letter-cases-content{padding:.25rem 1rem .8rem;max-height:40vh;overflow:auto}#sanctuary-letter-cases ul{padding-left:1.2rem;margin:.35rem 0 .8rem}#sanctuary-letter-cases li{margin:.45rem 0}#sanctuary-letter-cases a{color:#123a78;overflow-wrap:anywhere}#sanctuary-letter-cases small{display:block;color:#52606f}#sanctuary-letter-cases .letter-cases-person{margin:.6rem 0 .2rem;font-weight:800}#sanctuary-letter-cases .letter-cases-note{font-size:.88rem;margin:.6rem 0 0}#sanctuary-letter-cases a:focus-visible,#sanctuary-letter-cases summary:focus-visible{outline:3px solid #00aca5;outline-offset:-3px}@media print{#sanctuary-letter-cases{display:none!important}}';document.head.append(style);
 refresh();window.addEventListener('pageshow',refresh);window.addEventListener('focus',refresh);window.addEventListener('storage',refresh);document.addEventListener('visibilitychange',refresh);setInterval(refresh,30000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
