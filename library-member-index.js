(function(){
"use strict";
const root=document.getElementById("memberWorkIndex"),S=window.SanctuaryContentStructure;
if(!root||!S)return;
if(new URLSearchParams(location.search).has("section")){root.hidden=true;return;}
const API="https://sanctuary-backend-8iqc.onrender.com";
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
root.innerHTML='<h2>Find published work</h2><p>Choose any filters, then select a title to open the work.</p><div class="work-filters">'+
[["section","Section"],["category","Category"],["subcategory","Subcategory"],["member","Member"]].map(([id,label])=>'<label>'+label+'<select id="work-'+id+'"><option value="">All</option></select></label>').join('')+
'<label>Find a title or member<input id="work-search" type="search" placeholder="Type to search"></label><label>Sort by<select id="work-sort"><option value="newest">Date — newest first</option><option value="oldest">Date — oldest first</option><option value="member">Member name</option><option value="number">Membership number</option><option value="category">Section and category</option><option value="title">Title</option></select></label><button type="button" id="work-clear">Clear filters</button></div><p id="work-message" role="status" aria-live="polite">Loading published work…</p><div class="work-table-wrap"><table class="work-table"><caption class="work-sr">Published Library work</caption><thead><tr><th scope="col">Member</th><th scope="col">Membership no.</th><th scope="col">Date</th><th scope="col">Title</th><th scope="col">Section</th><th scope="col">Category / subcategory</th></tr></thead><tbody id="work-results"></tbody></table></div>';
const get=id=>document.getElementById("work-"+id),keys=["section","category","subcategory","member"];
let records=[],problems=[];
const compare=(a,b)=>a.localeCompare(b,"en-GB",{numeric:true,sensitivity:"base"});
function publication(item){
 const sectionKey=S.publicationSection(item),definition=S.SECTIONS.find(s=>s.key===sectionKey);
 const shelf=S.publicationSubcategory(item)||"",hat=S.PRODUCTION_HATS.find(h=>h.key===S.publicationHatKey(item));
 const section=sectionKey==="gallery"?"Gallery":sectionKey==="learning"?"Tuition & Guides":"Reading Room";
 const category=sectionKey==="learning"?(hat?.label||"Learning"):definition?.title||"Other work";
 const number=String(item.creator_resident_id||item.creator_member_id||"").toUpperCase();
 const name=item.creator_name||(number?"Member":"Sanctuary Club");
 return {section,category,subcategory:shelf,name,number,member:name+" ("+(number||"Club publication")+")",title:item.title||"Untitled",date:item.published_at||item.created_at||"",url:sectionKey==="gallery"?"library-gallery.html?id="+encodeURIComponent(item.publication_id||""):"library-publications.html?id="+encodeURIComponent(item.legacy_id||item.publication_id||"")};
}
function letter(t){
 const panel=t.destination==="panel",number=t.author_ref||"",name=t.author_name||"Member";
 return {section:"Reading Room",category:panel?"Letters to the Panel":"Letters to the Committees",subcategory:panel?"Panel":t.area||"",name,number,member:name+" ("+number+")",title:t.title||"Untitled letter",date:t.updated_at||t.created_at||"",url:"panel-letters.html?id="+encodeURIComponent(t.thread_id)};
}
function matches(row,except){return keys.every(key=>key===except||!get(key).value||row[key]===get(key).value);}
function filterOptions(){
 for(const key of keys){
  const select=get(key),old=select.value;
  const values=[...new Set(records.filter(row=>matches(row,key)).map(row=>row[key]).filter(Boolean))].sort(compare);
  select.innerHTML='<option value="">All '+({section:"sections",category:"categories",subcategory:"subcategories",member:"members"})[key]+'</option>'+values.map(v=>'<option value="'+esc(v)+'">'+esc(v)+'</option>').join("");
  if(values.includes(old))select.value=old;
 }
}
function render(){
 const query=get("search").value.trim().toLocaleLowerCase("en-GB"),sort=get("sort").value;
 const rows=records.filter(row=>matches(row)&&(!query||[row.title,row.name,row.number].some(v=>v.toLocaleLowerCase("en-GB").includes(query))));
 const stamp=r=>{const n=Date.parse(r.date);return Number.isFinite(n)?n:0;};
 rows.sort((a,b)=>{
  let n=sort==="newest"?stamp(b)-stamp(a):sort==="oldest"?stamp(a)-stamp(b):sort==="member"?compare(a.name,b.name):sort==="number"?compare(a.number,b.number):sort==="title"?compare(a.title,b.title):compare(a.section,b.section)||compare(a.category,b.category)||compare(a.subcategory,b.subcategory);
  return n||compare(a.title,b.title)||compare(a.number,b.number);
 });
 get("message").textContent=(rows.length?rows.length+" published item"+(rows.length===1?"":"s")+(rows.length!==records.length?" of "+records.length:"")+".":"No published work matches these choices.")+(problems.length?" "+problems.join(" ")+" Please reload to try again.":"");
 get("results").innerHTML=rows.map(row=>{const d=new Date(row.date),date=Number.isNaN(d.getTime())?"—":d.toLocaleDateString("en-GB");return '<tr><td>'+esc(row.name)+'</td><td>'+esc(row.number||"—")+'</td><td>'+esc(date)+'</td><td><a href="'+esc(row.url)+'">'+esc(row.title)+'</a></td><td>'+esc(row.section)+'</td><td>'+esc([row.category,row.subcategory].filter(Boolean).join(" / "))+'</td></tr>';}).join("");
}
keys.forEach((key,index)=>get(key).addEventListener("change",()=>{if(index<3)keys.slice(index+1,3).forEach(k=>get(k).value="");filterOptions();render();}));
get("search").addEventListener("input",render);get("sort").addEventListener("change",render);
get("clear").addEventListener("click",()=>{keys.forEach(k=>get(k).value="");get("search").value="";get("sort").value="newest";filterOptions();render();});
async function read(path){const response=await fetch(API+path,{cache:"no-store",headers:{Accept:"application/json"}});const data=await response.json();if(!response.ok||data.success===false)throw Error(path);return data;}
Promise.allSettled([read("/api/library-publications"),read("/api/panel-letters")]).then(results=>{
 results.forEach((result,i)=>{if(result.status==="fulfilled"){const data=result.value;records.push(...(i===0?(data.publications||[]).filter(item=>["library","gallery"].includes(S.publicationCollection(item))).map(publication):(data.threads||[]).map(letter)));}else problems.push(i===0?"Library work could not be loaded.":"Published letters could not be loaded.");});
 filterOptions();render();
});
})();
