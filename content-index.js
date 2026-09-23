(function(){
  "use strict";
  const API="https://sanctuary-backend-8iqc.onrender.com";
  const S=window.SanctuaryContentStructure;
  const collection=document.body.dataset.collection||"library";
  const esc=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const date=value=>{if(!value)return"";const d=new Date(value);return Number.isNaN(d.getTime())?"":d.toLocaleDateString("en-GB")};
  const itemHtml=item=>{
    const href=item.category==="gallery"?`library-gallery.html?id=${encodeURIComponent(item.publication_id||"")}`:`library-publications.html?id=${encodeURIComponent(item.publication_id||"")}`;
    const meta=[item.creator_name,item.creator_resident_id,date(item.published_at)].filter(Boolean).join(" · ");
    return `<a class="synopsis" href="${href}"><strong>${esc(item.title||"Untitled")}</strong>${item.summary?`<span>${esc(item.summary)}</span>`:""}<small>${esc(meta)}</small></a>`;
  };
  function sectionHtml(section,items){
    const own=items.filter(item=>S.publicationSection(item)===section.key);
    const subMap=new Map();
    own.forEach(item=>{const sub=S.publicationSubcategory(item);if(!subMap.has(sub))subMap.set(sub,[]);subMap.get(sub).push(item)});
    let content="";
    const definitions=section.subcategories||[];
    if(definitions.length){
      const seen=new Set();
      definitions.forEach(([key,label])=>{const matching=[...subMap.entries()].filter(([name])=>S.slug(name)===key).flatMap(([,list])=>list);const links=collection==="library"?(section.subcategoryLinks?.[key]||[]):[];seen.add(key);content+=subcategoryHtml(label,matching,links)});
      [...subMap.entries()].forEach(([name,list])=>{if(name&& !seen.has(S.slug(name)))content+=subcategoryHtml(name,list)});
      const direct=subMap.get("")||[];if(direct.length)content+=subcategoryHtml("Other published work",direct);
    }else{
      content=`<div class="synopsis-list">${own.length?own.map(itemHtml).join(""):'<p class="empty">No published work yet.</p>'}</div>`;
    }
    const galleryLink=section.gallery&&collection==="library"?'<a class="section-link" href="library-gallery.html">Open Gallery</a>':"";
    const linkList=collection==="library"?section.libraryLinks:section.schoolLinks;
    const fixedLinks=linkList?linkList.map(([label,url])=>`<a class="section-link" href="${url}">${esc(label)}</a>`).join(" "):"";
    const summary=collection==="library"?(section.libraryDescription||section.hat):section.hat;
    const summaryLine=summary?`<small>${esc(summary)}</small>`:"";
    return `<details class="section"><summary><span class="icon">${section.icon}</span><span><strong>${esc(section.title)}</strong>${summaryLine}</span><span class="arrow">›</span></summary><div class="section-body">${content}${galleryLink}${fixedLinks}</div></details>`;
  }
  function subcategoryHtml(name,items,links=[]){const fixed=links.length?links.map(([label,url])=>`<a class="synopsis" href="${url}"><strong>${esc(label)}</strong></a>`).join(""):"";return `<details class="subcategory"><summary>${esc(name)}</summary><div class="synopsis-list">${fixed}${items.length?items.map(itemHtml).join(""):fixed?"":'<p class="empty">No published work yet.</p>'}</div></details>`}
  function render(items){document.getElementById("sections").innerHTML=S.SECTIONS.map(section=>sectionHtml(section,items)).join("");document.querySelectorAll("details.section").forEach(section=>section.addEventListener("toggle",()=>{if(section.open)document.querySelectorAll("details.section").forEach(other=>{if(other!==section)other.open=false})}))}
  render([]);
  fetch(`${API}/api/library-publications`,{cache:"no-store",headers:{Accept:"application/json"}}).then(async response=>{const data=await response.json().catch(()=>({}));if(!response.ok||data.success===false)throw new Error(data.message||"Published work could not be loaded.");const all=Array.isArray(data.publications)?data.publications:[];const items=all.filter(item=>S.publicationCollection(item)===collection);render(items);document.getElementById("status").textContent=items.length?`${items.length} published item${items.length===1?"":"s"}.`:"No work has been published here yet."}).catch(error=>{console.error(error);document.getElementById("status").textContent="Published work could not be loaded. Please try again shortly."});
})();
