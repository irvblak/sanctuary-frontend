process.chdir(require('path').resolve(__dirname,'..'));
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('members-info.html','utf8');
const script=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean).join('\n');
class Element {
  constructor(tag='div'){this.tag=tag;this.hidden=false;this.children=[];this.handlers={};this.attrs={};}
  append(...nodes){this.children.push(...nodes);}
  replaceChildren(...nodes){this.children=nodes;}
  addEventListener(name,fn){this.handlers[name]=fn;}
  setAttribute(key,value){this.attrs[key]=value;}
}
const tick=()=>new Promise(resolve=>setImmediate(resolve));
async function setup(people,{disabled=false,expired=false,other=false}={}){
 const elements={attention:new Element(),attentionList:new Element(),attentionToggle:new Element()};
 elements.attention.hidden=true;elements.attentionList.hidden=true;
 const saved={hostAreaVerified:'true',verifiedResidentId:'SM99/2',hostAreaRoles:'["art_editor"]',currentDisplayName:'Other synthetic resident'},requests=[],events={},documentEvents={};
 const token=Buffer.from(JSON.stringify({mid:other?'SC99':'SM99',exp:Math.floor(Date.now()/1000)+(expired?-10:3600)})).toString('base64url')+'.signature';
 const storage={getItem:key=>key==='authToken'?token:key==='currentMemberId'?'SM99':saved[key]||null,setItem:(key,value)=>saved[key]=value,removeItem:key=>delete saved[key]};
 const location={href:''};
 const document={getElementById:id=>elements[id],createElement:tag=>new Element(tag),querySelectorAll:()=>[],addEventListener:(name,fn)=>documentEvents[name]=fn,visibilityState:'visible'};
 let queue=people;
 const fetch=async(url,options)=>{
   requests.push({url,options});
   if(url.endsWith('/api/household-attention'))return {ok:true,json:async()=>({people:queue})};
   if(url.endsWith('/auth/studio-session')&&disabled)return {ok:false,json:async()=>({message:'Design Studio access has not been enabled for this resident'})};
   return {ok:true,json:async()=>({token:'selected-resident-token'})};
 };
 const context={document,sessionStorage:storage,localStorage:storage,location,
   window:{location,addEventListener:(name,fn)=>events[name]=fn},fetch,
   atob:s=>Buffer.from(s,'base64').toString('binary'),alert:message=>{throw Error(message);}};
 vm.runInNewContext(script,context);await tick();
 return {elements,saved,requests,location,events,documentEvents,setQueue:people=>queue=people};
}
(async()=>{
 const empty=await setup([]);assert(empty.elements.attention.hidden);
 const expired=await setup([],{expired:true});assert.equal(expired.requests.length,0);
 const other=await setup([],{other:true});assert.equal(other.requests.length,0);
 const people=[{resident_id:'SM99/1',name:'Synthetic Editor',counts:{writing:1,letters:2,pin:1}},{resident_id:'SM99/2',name:'Synthetic Curator',counts:{artwork:1}}];
 const ui=await setup(people);assert(!ui.elements.attention.hidden);assert.equal(ui.elements.attentionList.children.length,2);
 ui.elements.attentionToggle.handlers.click();assert(!ui.elements.attentionList.hidden);assert.equal(ui.elements.attentionToggle.attrs['aria-expanded'],'true');
 const section=ui.elements.attentionList.children[0];assert(section.children[0].textContent.includes('Synthetic Editor'));
 await section.children[1].children[0].handlers.click();assert(ui.requests[1].url.endsWith('/auth/studio-session'));assert.equal(JSON.parse(ui.requests[1].options.body).residentId,'SM99/1');assert.equal(ui.saved.ydsAuthToken,'selected-resident-token');assert.equal(ui.saved.currentResidentId,'SM99/1');assert.equal(ui.saved.hostAreaVerified,undefined);assert.equal(ui.saved.verifiedResidentId,undefined);assert.equal(ui.location.href,'editor-desk.html');
 ui.setQueue([]);ui.events.pageshow({persisted:true});await tick();assert(ui.elements.attention.hidden);assert.equal(ui.elements.attentionList.children.length,0);
 ui.setQueue(people);ui.documentEvents.visibilitychange();await tick();assert(!ui.elements.attention.hidden);
 const lettersRoute=await setup([{resident_id:'SM99/1',name:'Synthetic Letters Editor',counts:{letters:1}}]);await lettersRoute.elements.attentionList.children[0].children[1].children[0].handlers.click();assert.equal(lettersRoute.location.href,'panel-letters.html#reviewCard');
 const pin=await setup([{resident_id:'SM99/1',name:'Synthetic Admin',counts:{pin:1}}]);await pin.elements.attentionList.children[0].children[1].children[0].handlers.click();assert.equal(pin.location.href,'admin-login.html?return=pin-requests');assert.equal(pin.requests.length,1);
 const deniedStudio=await setup([{resident_id:'SM99/1',name:'Synthetic Editor',counts:{writing:1}}],{disabled:true});const row=deniedStudio.elements.attentionList.children[0].children[1];await row.children[0].handlers.click();const form=row.children[1];assert.equal(form.tag,'form');assert.equal(form.children[0].children[0].type,'password');form.children[0].children[0].value='synthetic-pin';await form.handlers.submit({preventDefault(){}});assert(deniedStudio.requests[2].url.endsWith('/auth/login'));assert.equal(deniedStudio.location.href,'editor-desk.html');assert.equal(form.children[0].children[0].value,'');
 const letters=fs.readFileSync('yds-entry-tree.js','utf8');assert(letters.includes('Letter to a Committee or the Panel'));assert(!letters.includes('Open review desk'));assert(!letters.includes('Review Letters to the'));
 const login=fs.readFileSync('admin-login.html','utf8');assert(login.includes("get('return') === 'pin-requests' ? 'admin-members-grid.html#pinRequestsList'"));
 const roleContext={window:{}};vm.runInNewContext(fs.readFileSync('content-structure.js','utf8'),roleContext);const roles=roleContext.window.SanctuaryContentStructure.REGISTER_GROUPS.flatMap(group=>group.roles);assert.equal(roles.find(role=>role[0]==='copy_editor')[1],'Literary Editor');assert.equal(roles.find(role=>role[0]==='letters_editor')[1],'Letters to Committees and Panel Editor');assert(fs.readFileSync('panel-letters.js','utf8').includes('if(entry.can_review)'));
 console.log('Hub visibility, grouping, stale sessions, resident routing, PIN gate, fallback and completion refresh passed.');
})().catch(error=>{console.error(error);process.exit(1);});
