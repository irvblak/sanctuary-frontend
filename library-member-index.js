(function(){
"use strict";
const root=document.getElementById("memberWorkIndex"),S=window.SanctuaryContentStructure;
if(!root||!S)return;
if(new URLSearchParams(location.search).has("section")){root.hidden=true;return;}
const API="https://sanctuary-backend-8iqc.onrender.com";
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const compare=(a,b)=>a.localeCompare(b,"en-GB",{numeric:true,sensitivity:"base"});
const sectionOrder=["Reading Room","Tuition & Guides","Gallery"];
root.innerHTML='<h2>Library indexes</h2><p>Browse all published work by section and category, or see each member’s work together. Select a title to open it.</p><div class="work-index-views" role="group" aria-label="Choose an index"><button type="button" data-work-view="category" aria-pressed="true" aria-controls="work-index-category">By section & category</button><button type="button" data-work-view="member" aria-pressed="false" aria-controls="work-index-member">By member</button></div><div class="work-index-tools"><button type="button" data-work-expand="true">Expand all headings</button><button type="button" data-work-expand="false">Collapse all headings</button></div><p id="work-index-status" role="status" aria-live="polite">Loading published work…</p><section id="work-index-category" aria-label="Index by section and category"></section><section id="work-index-member" aria-label="Index by member" hidden></section>';
const status=root.querySelector("#work-index-status"),categoryRoot=root.querySelector("#work-index-category"),memberRoot=root.querySelector("#work-index-member");
let records=[],view="category";
const fallbackHat={"events":"host","club-activities":"activity","reading-room":"writer","gallery":"artist","committee-news-information":"committee","residents-association-news-information":"panel","general-useful-information":"information-officer","website-help":"website-helper","services":"services","administration":"website-administration"};
function categoryFor(item,key,hat){
 const hatKey=S.isManualPublication(item)?"information-officer":hat?.key||fallbackHat[key];
 return S.libraryDestination(hatKey)?.label||"Other work";
}
function sectionIcon(label){
 const id=label==="Reading Room"?"book-open-text":label==="Tuition & Guides"?"graduation-cap":"";
 return id?'<svg class="work-section-icon" aria-hidden="true" focusable="false"><use href="assets/icons/library-icons.svg#'+id+'"></use></svg>':"";
}
function publication(item){
 const key=S.publicationSection(item),hat=S.PRODUCTION_HATS.find(h=>h.key===S.publicationHatKey(item));
 const section=key==="gallery"?"Gallery":key==="learning"?"Tuition & Guides":"Reading Room";
 const category=categoryFor(item,key,hat);
 const subcategory=(key==="learning"?S.publicationShelfSubject(item):S.publicationSubcategory(item))||"";
 const number=String(item.creator_resident_id||item.creator_member_id||"").toUpperCase();
 return {section,category,subcategory,name:item.creator_name||(number?"Member":"Sanctuary Club"),number,title:item.title||"Untitled",summary:item.summary||"",date:item.created_at||"",url:key==="gallery"?"library-gallery.html?id="+encodeURIComponent(item.publication_id||""):"library-publications.html?id="+encodeURIComponent(item.legacy_id||item.publication_id||"")};
}
function letter(t){
 return {section:"Reading Room",category:t.destination==="panel"?"Letters to the Panel":"Letters to the Committees",subcategory:t.destination==="panel"?"":t.area||"",name:t.author_name||"Member",number:String(t.author_ref||"").toUpperCase(),title:t.title||"Untitled letter",summary:t.summary||"",date:t.created_at||"",url:"panel-letters.html?id="+encodeURIComponent(t.thread_id)};
}
function dateLabel(value){if(!value)return "Creation date not recorded";const d=new Date(value);return Number.isNaN(d.getTime())?"Creation date not recorded":"Created "+d.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});}
function card(row,showLocation){
 return '<article class="work-synopsis"><h5><a href="'+esc(row.url)+'">'+esc(row.title)+'</a></h5><p class="work-synopsis-meta">'+esc(dateLabel(row.date))+'<span aria-hidden="true"> · </span>'+esc(row.name)+(row.number?' <span class="work-member-ref">'+esc(row.number)+'</span>':"")+'</p>'+(row.summary?'<p class="work-synopsis-description">'+esc(row.summary)+'</p>':"")+(showLocation?'<p class="work-synopsis-shelf">'+esc([row.section,row.category,row.subcategory].filter(Boolean).join(" / "))+'</p>':"")+'</article>';
}
function groups(rows,key){const map=new Map();for(const row of rows){const value=key(row);if(!map.has(value))map.set(value,[]);map.get(value).push(row);}return [...map.entries()].sort(([a],[b])=>compare(a,b));}
function titleOrder(rows){return [...rows].sort((a,b)=>compare(a.title,b.title)||compare(a.name,b.name)||compare(a.number,b.number));}
function count(rows){return '<span class="work-index-count">'+rows.length+' '+(rows.length===1?"work":"works")+'</span>';}
function heading(label,rows,body,level,kind){
 return '<details class="work-index-group '+kind+'"><summary><span class="work-index-chevron" aria-hidden="true">▸</span><h'+level+'>'+sectionIcon(label)+esc(label)+'</h'+level+'>'+count(rows)+'</summary><div class="work-index-group-body">'+body+'</div></details>';
}
function render(){
 categoryRoot.innerHTML=sectionOrder.map(section=>{
  const own=records.filter(row=>row.section===section);
  const categoryGroups=groups(own,row=>row.category);
  const destinations=section==="Gallery"?S.LIBRARY_DESTINATIONS.filter(d=>d.hat==="artist"):S.LIBRARY_DESTINATIONS;
  if(section==="Reading Room")["Letters to the Panel","Letters to the Committees"].forEach(label=>{if(!categoryGroups.some(([name])=>name===label))categoryGroups.push([label,[]]);});
  destinations.forEach(({label})=>{if(!categoryGroups.some(([name])=>name===label))categoryGroups.push([label,[]]);});
  categoryGroups.sort(([a],[b])=>compare(a,b));
  const categories=categoryGroups.map(([label,items])=>{
   const subjectGroups=groups(items,row=>row.subcategory);
   const destination=S.LIBRARY_DESTINATIONS.find(d=>d.label===label);
   if(label==="Letters to the Committees")["Mews","Court"].forEach(sub=>{if(!subjectGroups.some(([name])=>name===sub))subjectGroups.push([sub,[]]);});
   if(destination)S.libraryDestinationSubjects(destination.hat).filter(sub=>!(section==="Tuition & Guides"&&sub==="Manuals")).forEach(sub=>{
    if(!subjectGroups.some(([name])=>S.slug(name)===S.slug(sub)))subjectGroups.push([sub,[]]);
   });
   subjectGroups.sort(([a],[b])=>compare(a,b));
   const subcategories=subjectGroups.map(([sub,rows])=>{
    const cards=titleOrder(rows).map(row=>card(row,false)).join("");
    return sub?heading(sub,rows,cards||'<p class="work-index-empty">No published work yet.</p>',5,"work-index-subcategory"):cards;
   }).join("");
   return heading(label,items,subcategories||'<p class="work-index-empty">No published work yet.</p>',4,"work-index-category");
  }).join("");
  return heading(section,own,categories||'<p class="work-index-empty">No published work yet.</p>',3,"work-index-section");
 }).join("");
 memberRoot.innerHTML=groups(records,row=>(row.number||row.name)).map(([,rows])=>({rows,name:rows[0].name,number:rows[0].number})).sort((a,b)=>compare(a.name,b.name)||compare(a.number,b.number)).map(({rows,name,number})=>heading(name+(number?" — "+number:""),rows,titleOrder(rows).map(row=>card(row,true)).join(""),3,"work-index-person")).join("");
}
root.querySelectorAll("[data-work-view]").forEach(button=>button.addEventListener("click",()=>{
 view=button.dataset.workView;categoryRoot.hidden=view!=="category";memberRoot.hidden=view!=="member";
 root.querySelectorAll("[data-work-view]").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
}));
root.querySelectorAll("[data-work-expand]").forEach(button=>button.addEventListener("click",()=>{
 (view==="category"?categoryRoot:memberRoot).querySelectorAll("details").forEach(details=>details.open=button.dataset.workExpand==="true");
}));
async function read(path){const response=await fetch(API+path,{cache:"no-store",headers:{Accept:"application/json"}});const data=await response.json();if(!response.ok||data.success===false)throw Error(path);return data;}
Promise.allSettled([read("/api/library-publications"),read("/api/panel-letters")]).then(results=>{
 const errors=[];
 results.forEach((result,i)=>{
  if(result.status==="fulfilled"){
   const data=result.value,items=i===0?(Array.isArray(data.publications)?data.publications:[]):(Array.isArray(data.threads)?data.threads:[]);
   records.push(...(i===0?items.filter(item=>!item.status||item.status==="published").map(publication):items.filter(item=>!item.letter_status||item.letter_status==="published").map(letter)));
  }else errors.push(i===0?"Library work could not be loaded.":"Published letters could not be loaded.");
 });
 render();
 status.textContent=(records.length?records.length+" published "+(records.length===1?"work":"works")+". Both indexes contain the same work.":"No published work yet.")+(errors.length?" "+errors.join(" ")+" Please reload to try again.":"");
});
})();

