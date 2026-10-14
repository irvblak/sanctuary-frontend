(function(){
"use strict";
const API="https://sanctuary-backend-8iqc.onrender.com",access=window.SanctuaryContentAccess;if(!access)return;
async function request(path,options={}){const response=await fetch(API+path,{...options,headers:{"Content-Type":"application/json",Authorization:"Bearer "+(access.token()||sessionStorage.getItem("authToken")||sessionStorage.getItem("ydsAuthToken")||localStorage.getItem("authToken")||sessionStorage.getItem("memberToken")||localStorage.getItem("memberToken")||""),...options.headers}});const data=await response.json().catch(()=>({}));if(!response.ok||data.success===false)throw new Error(data.message||"The action could not be completed.");return data;}
async function editPublication(id){
 const data=await request('/api/library-publications/'+encodeURIComponent(id));const item=data.publication||{};
 if(!item.canvas_data?.state){
  const host=document.getElementById("galleryViewer")?.open?document.getElementById("galleryViewer"):document.querySelector("main")||document.body;
  host.querySelector("[data-content-editor]")?.remove();
  const form=document.createElement("form");form.dataset.contentEditor="";form.style.cssText="padding:18px;margin:12px 0;background:#fff;border:1px solid #c8ced4;border-radius:12px;color:#203747";
  const title=document.createElement("input"),summary=document.createElement("textarea"),body=document.createElement("div");
  title.value=item.title||"";title.required=true;summary.value=item.summary||"";body.contentEditable="true";body.setAttribute("role","textbox");body.setAttribute("aria-label","Published work");body.setAttribute("aria-multiline","true");
  const template=document.createElement("template");template.innerHTML=item.body_html||"";template.content.querySelectorAll("script,iframe,object,embed,link,meta,form,input,button,textarea,select").forEach(el=>el.remove());template.content.querySelectorAll("*").forEach(el=>[...el.attributes].forEach(a=>{if(/^on/i.test(a.name)||a.name==="srcdoc"||(["href","src"].includes(a.name)&&/^\s*javascript:/i.test(a.value)))el.removeAttribute(a.name);}));body.append(template.content);
  for(const [label,field] of [["Title",title],["Summary",summary],["Published work",body]]){const wrapper=document.createElement("label");wrapper.style.cssText="display:block;margin-bottom:12px;font-weight:700";wrapper.append(document.createTextNode(label),field);field.style.cssText="display:block;width:100%;box-sizing:border-box;padding:10px;border:1px solid #c8ced4;border-radius:8px;min-height:44px;font:inherit;background:#fff;color:#203747";form.append(wrapper);}
  body.style.minHeight="160px";const save=document.createElement("button"),cancel=document.createElement("button");save.type="submit";save.textContent="Save published changes";save.className="btn";cancel.type="button";cancel.textContent="Cancel";cancel.className="btn";cancel.onclick=()=>form.remove();form.append(save,cancel);form.onsubmit=async event=>{event.preventDefault();save.disabled=true;try{await request('/api/library-publications/'+encodeURIComponent(id),{method:'PUT',body:JSON.stringify({title:title.value,summary:summary.value,body_html:body.innerHTML})});location.reload();}catch(error){alert(error.message);save.disabled=false;}};
  host.append(form);title.focus();return;
 }
 const canvas=item.canvas_data;
 const q=new URLSearchParams({publication_id:id,mode:item.mode||canvas.mode||'writer',destination:canvas.destination||item.category||'library',collection:'library',type:'standing',admin:'1'});
 location.href='design-studio-canvas.html?'+q;
}
function publicationControl(id,parent,canDelete=true){if(!id)return;parent.querySelector('[data-content-control]')?.remove();const box=document.createElement('span');box.dataset.contentControl='';box.style.cssText='display:inline-flex;gap:6px;flex-wrap:wrap;margin:8px';for(const [label,action] of [['Edit',async()=>editPublication(id)],['Delete',async()=>{if(!confirm('Delete this published work? This cannot be undone.'))return;await request('/api/library-publications/'+encodeURIComponent(id),{method:'DELETE'});location.href='library.html';}]]){if(label==='Delete'&&!canDelete)continue;const button=document.createElement('button');button.type='button';button.textContent=label;button.className='btn';button.onclick=async()=>{button.disabled=true;try{await action();}catch(error){alert(error.message);}finally{button.disabled=false;}};box.append(button);}parent.append(box);}
access.ready.then(async ok=>{
 const params=new URLSearchParams(location.search),path=location.pathname.toLowerCase();
 if(path.endsWith('/library-publications.html')&&params.get('id')){try{const permission=await request('/api/library-publications/'+encodeURIComponent(params.get('id'))+'/permissions');if(permission.can_edit)publicationControl(permission.publication_id,document.querySelector('main')||document.body,permission.can_delete);}catch(error){/* Public readers need no editing controls. */}}
 if(!ok)return;document.documentElement.dataset.waAdmin='true';
 if(path.endsWith('/library-gallery.html')){const viewer=document.getElementById('galleryViewer');const show=()=>{const id=viewer?.dataset.publicationId;if(id)publicationControl(id,viewer.querySelector('.viewer-actions')||viewer);};new MutationObserver(show).observe(viewer,{attributes:true,attributeFilter:['data-publication-id']});show();}
 document.querySelectorAll('[data-wa-admin-edit],[data-wa-admin-delete]').forEach(el=>el.hidden=false);
});
})();

