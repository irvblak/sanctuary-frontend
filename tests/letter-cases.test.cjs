const fs=require('fs'),vm=require('vm'),assert=require('assert');
process.chdir(require('path').resolve(__dirname,'..'));
const tick=()=>new Promise(resolve=>setImmediate(resolve));
class Element{
 constructor(tag='div'){this.tag=tag;this.children=[];this.attributes={};this.selectors={};this.hidden=false;}
 append(...nodes){for(const node of nodes){this.children.push(node);node.parent=this;}}
 replaceChildren(...nodes){this.children=[];this.append(...nodes);}
 remove(){if(this.parent)this.parent.children=this.parent.children.filter(node=>node!==this);}
 setAttribute(key,value){this.attributes[key]=value;}
 querySelector(key){if(key==='details')return this.children.find(node=>node.tag==='details');return this.selectors[key]||(this.selectors[key]=new Element());}
}
async function notificationTest(){
 let people=[],signedIn=true,code=200,calls=0;
 const body=new Element('body'),head=new Element('head'),events={};
 const token=Buffer.from(JSON.stringify({mid:'SM99',exp:Math.floor(Date.now()/1000)+3600})).toString('base64url')+'.synthetic';
 const store={getItem:key=>key==='authToken'?token:key==='currentMemberId'?'SM99':null};
 const context={window:{SanctuaryAccess:{verifiedPrivateAccess:()=>signedIn},addEventListener:(name,fn)=>events[name]=fn},document:{body,head,readyState:'complete',visibilityState:'visible',createElement:tag=>new Element(tag),addEventListener:(name,fn)=>events[name]=fn},sessionStorage:store,localStorage:store,AbortController,setTimeout,clearTimeout,setInterval:(fn,delay)=>{assert.equal(delay,30000);events.interval=fn;},atob:s=>Buffer.from(s,'base64').toString('binary'),fetch:async()=>{calls++;return {ok:code===200,status:code,json:async()=>({success:true,people})};}};
 vm.runInNewContext(fs.readFileSync('letter-notifications.js','utf8'),context);await tick();assert.equal(body.children.length,0);
 people=[{resident_id:'SM99/1',name:'Synthetic Chair',cases:[{thread_id:'CASE-1',title:'Test case',destination_label:'Letters to the Panel'}]},{resident_id:'SM99/2',name:'Synthetic Officer',cases:[{thread_id:'CASE-1',title:'Test case',destination_label:'Letters to the Panel'}]}];
 await context.window.SanctuaryLetterNotifications.refresh();assert.equal(body.children.length,1);
 const panel=body.children[0];let details=panel.children[0];assert.equal(details.children[0].textContent,'Letters in progress (1)');assert.equal(details.open,true);
 assert(!panel.children.some(node=>node.tag==='button'));
 details.open=false;await events.interval();assert.equal(panel.children[0].open,false);assert.equal(body.children.length,1);
 code=503;await events.focus();assert.equal(body.children.length,1); // A temporary outage is not case closure.
 code=200;people=[];await context.window.SanctuaryLetterNotifications.refresh();assert.equal(body.children.length,0);
 people=[{resident_id:'SM99/1',name:'Synthetic Chair',cases:[{thread_id:'CASE-1',title:'Test case'}]}];await events.interval();assert.equal(body.children.length,1);
 signedIn=false;await events.focus();assert.equal(body.children.length,0);const before=calls;await events.interval();assert.equal(calls,before);
 signedIn=true;await events.interval();assert.equal(body.children.length,1);code=401;await events.interval();assert.equal(body.children.length,0);
}
async function libraryTest(){
 const parts={};for(const id of ['#work-index-status','#work-index-category','#work-index-member'])parts[id]=new Element();
 const root={querySelector:id=>parts[id],querySelectorAll:()=>[]};
 const context={window:{},document:{getElementById:()=>root},location:{search:''},URLSearchParams,fetch:async url=>({ok:true,json:async()=>url.endsWith('/api/panel-letters')?{threads:[{thread_id:'P',destination:'panel',title:'Panel test',letter_status:'published',author_ref:'SM99/1'},{thread_id:'M',destination:'committee',area:'Mews',title:'Mews test',letter_status:'published',author_ref:'SM99/1'},{thread_id:'C',destination:'committee',area:'Court',title:'Court test',letter_status:'published',status:'finalised',author_ref:'SC99/1'}]}:{publications:[]}})};
 vm.runInNewContext(fs.readFileSync('content-structure.js','utf8'),context);vm.runInNewContext(fs.readFileSync('library-member-index.js','utf8'),context);await tick();await tick();
 const html=parts['#work-index-category'].innerHTML;
 assert.equal((html.match(/<h4>Letters to…<\/h4>/g)||[]).length,1);
 for(const destination of ['Mews Committee','Court Committee','Panel'])assert(html.includes('<h5>'+destination+'</h5>'));
 assert(!html.includes('<h5>Letters to the Committee</h5>'));assert(!html.includes('<h5>Letters to the Panel</h5>'));
 assert(html.includes('<strong>In progress</strong>'));assert(html.includes('<strong>Closed</strong>'));
 assert(html.includes('panel-letters.html?id=C'));assert(parts['#work-index-member'].innerHTML.includes('Reading Room / Letters to… / Panel'));
}
async function controlsTest(){
 const source=fs.readFileSync('panel-letters.js','utf8'),start=source.indexOf('function renderThread(t)'),end=source.indexOf("$('chooseResidentBtn')",start);
 const elements={indexCard:new Element(),threadView:new Element(),replyCard:new Element()};let refreshed=0;
 const closed={title:'Synthetic case',author_name:'Synthetic Author',author_ref:'SC99/1',area:'Mews',destination:'committee',status:'finalised',entries:[],can_reply:false,can_close:false};
 const context={document:{createElement:tag=>new Element(tag)},$:id=>elements[id],esc:value=>String(value||''),date:value=>value||'',destinationName:()=> 'Mews Committee',threadDestination:()=> 'committee',identity:()=>({rid:'SC99/1'}),button:(label,handler)=>({tag:'button',textContent:label,handler}),window:{print(){},SanctuaryLetterNotifications:{refresh:()=>refreshed++}},confirm:()=>true,request:async(path,options)=>{assert(path.endsWith('/status'));assert.equal(JSON.parse(options.body).status,'finalised');return {thread:closed};},id:'CASE-1',location:{href:''}};
 vm.runInNewContext(source.slice(start,end),context);
 const open={...closed,status:'open',can_reply:true,can_close:true};context.renderThread(open);assert.equal(elements.replyCard.hidden,false);
 const actions=elements.threadView.children[0].querySelector('.actions');assert(actions.children.some(node=>node.textContent==='Close case'));
 await actions.children.find(node=>node.textContent==='Close case').handler();assert.equal(refreshed,1);assert.equal(elements.replyCard.hidden,true);
 context.renderThread({...open,can_reply:false,can_close:false});assert.equal(elements.replyCard.hidden,true);assert(!elements.threadView.children[0].querySelector('.actions').children.some(node=>node.textContent==='Close case'));
}
(async()=>{await notificationTest();await libraryTest();await controlsTest();console.log('Persistent notices, closure clearing, Reading Room hierarchy and read-only controls passed.');})().catch(error=>{console.error(error);process.exit(1);});
