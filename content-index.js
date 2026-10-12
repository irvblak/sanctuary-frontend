(function(){
"use strict";
const API="https://sanctuary-backend-8iqc.onrender.com",S=window.SanctuaryContentStructure,params=new URLSearchParams(location.search);
const hashSection=location.hash.slice(1),selectedSection=params.get("section")||(S.SECTIONS.some(section=>section.key===hashSection)?hashSection:""),hatKey=params.get("hat")||"",subject=params.get("subject")||"";
const list=document.getElementById("sections"),directory=document.getElementById("contentDirectory"),status=document.getElementById("status"),heading=document.querySelector(".intro h1"),intro=document.querySelector(".intro p");
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const date=v=>{const d=new Date(v);return Number.isNaN(d.getTime())?"":d.toLocaleDateString("en-GB")};
function itemHtml(item){const id=item.legacy_id||item.publication_id||"",url=S.publicationSection(item)==="gallery"?"library-gallery.html?id="+encodeURIComponent(item.publication_id||""):"library-publications.html?id="+encodeURIComponent(id);return `<a class="synopsis" href="${url}"><strong>${esc(item.title||"Untitled")}</strong>${item.summary?`<span>${esc(item.summary)}</span>`:""}<small>${esc([item.creator_name,date(item.published_at)].filter(Boolean).join(" · "))}</small></a>`;}
function subjectFor(item){if(selectedSection!=="learning")return S.publicationSubcategory(item);const canvas=item.canvas_data||{};let name=String(item.tertiary_category||canvas.tertiary_category||canvas.state?.tertiaryCategory||"");return ["Art Teacher","Library Guide","For the Gallery"].includes(name)?"":name;}
function fixedLinks(section,items){let links=[];if(selectedSection==="learning"){
 if(!subject){if(hatKey){const hat=S.PRODUCTION_HATS.find(h=>h.key===hatKey);links=section.subcategoryLinks?.[S.slug(hat?.label||"")]||[];}else links=Object.values(section.subcategoryLinks||{}).flat();}
 }else if(subject){const definition=(section.subcategories||[]).find(([key,label])=>S.slug(subject)===key||S.slug(subject)===S.slug(label));links=definition?section.subcategoryLinks?.[definition[0]]||[]:[];}else links=Object.values(section.subcategoryLinks||{}).flat();
 const seen=new Set();return links.filter(([,url])=>{if(seen.has(url))return false;seen.add(url);return !items.some(item=>url.includes("id="+encodeURIComponent(item.legacy_id||item.publication_id||"__none__")));});}
if(!selectedSection){list.hidden=true;status.hidden=true;return;}
const section=S.SECTIONS.find(entry=>entry.key===selectedSection),hat=S.PRODUCTION_HATS.find(entry=>entry.key===hatKey);
directory.hidden=true;list.hidden=false;status.hidden=false;
if(heading){heading.textContent=[section?.title||"Published work",selectedSection==="learning"?hat?.label:"",subject].filter(Boolean).join(" — ");if(selectedSection==="learning")heading.style.color="#7a263a";}
if(intro)intro.textContent="Select a title to open the work.";
function render(items){const own=items.filter(item=>S.publicationSection(item)===selectedSection&&(!hatKey||selectedSection!=="learning"||S.publicationHatKey(item)===hatKey)&&(!subject||S.slug(subjectFor(item))===S.slug(subject))).sort((a,b)=>new Date(b.published_at||b.created_at||0)-new Date(a.published_at||a.created_at||0));const links=section?fixedLinks(section,own):[];
 list.innerHTML=`<section id="${esc(selectedSection)}"><p><a class="section-link" href="library.html#index">Published work index</a></p><div class="synopsis-list">${own.map(itemHtml).join("")}${links.map(([name,url])=>`<a class="synopsis" href="${esc(url)}"><strong>${esc(name)}</strong></a>`).join("")}${!own.length&&!links.length?'<p class="empty">No published work yet.</p>':""}</div></section>`;
 status.textContent=own.length?`${own.length} published item${own.length===1?"":"s"}.`:"";
}
render([]);status.textContent="Loading published work…";
fetch(`${API}/api/library-publications`,{cache:"no-store",headers:{Accept:"application/json"}}).then(async response=>{const data=await response.json().catch(()=>({}));if(!response.ok||data.success===false)throw new Error("Published work could not be loaded.");render((Array.isArray(data.publications)?data.publications:[]).filter(item=>S.publicationCollection(item)==="library"));}).catch(error=>{console.error(error);status.textContent="Published work could not be loaded. Please try again shortly.";});
})();
