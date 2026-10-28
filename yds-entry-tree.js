(function(global){
'use strict';
const S=global.SanctuaryContentStructure;
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const svg=(id,library=false)=>'<svg aria-hidden="true" focusable="false"><use href="assets/icons/'+(library?'library-icons':'icons')+'.svg#'+esc(id)+'"></use></svg>';
const labels={host:'Event Organiser'};
global.SanctuaryYdsEntryTree={mount({root,choices,roles,activityScopes,residentRef='',requestedHat=''}){
 const area=String(residentRef).startsWith('SM')?'Mews':String(residentRef).startsWith('SC')?'Court':'';
 const caps=[...choices];
 // Letters are a universal member facility, even before a publishing name is set.
 if(!caps.some(h=>h.key==='writer'))caps.push({...S.PRODUCTION_HATS.find(h=>h.key==='writer'),lettersOnly:true});
 const isLetter=hat=>hat?.key==='writer'&&['letter-to-panel','letter-to-committee'].includes(state.subject);
 const letterSecretary=()=>'the Letters to Committees and Panel Editor';
 const state={hat:'',subject:'',subdivision:'',destination:'',stream:'',kind:''};
 const getHat=()=>caps.find(h=>h.key===state.hat);
 const label=hat=>labels[hat.key]||hat.label;
 function subjects(hat){return S.hatSubjects(hat,hat.key==='activity'?activityScopes:undefined,roles).filter(([key])=>!hat.lettersOnly||key!=='articles-stories');}
 function clearFrom(key){const keys=['hat','subject','subdivision','destination','stream','kind'];keys.slice(keys.indexOf(key)).forEach(k=>state[k]='');}
 function destinations(hat){
  if(isLetter(hat))return [{key:'information',label:'Reading Room',icon:'reading-room',hint:letterSecretary().replace(/^the /,'The ')+' reviews and may edit your letter and replies before publication.'}];
  const values=[{key:'calendar',label:'Calendar',icon:'calendar',hint:'Enter the event details and go to your canvas to create your Poster/Notice.'},
   {key:'information',label:hat.key==='artist'?'Gallery':'Reading Room',icon:'reading-room',hint:hat.key==='artist'?'Submit your artwork to the Curator for consideration.':hat.key==='writer'?'Submit your writing to the Literary Editor for publication under your name or pseudonym.':'Share general information on the corresponding Library shelf.'},
   {key:'learning',label:'Learning & Teaching',icon:'library-education',hint:'Prepare learning notes, a lesson or a guide for the corresponding Library shelf.'}];
  if(['artist','writer'].includes(hat.key))values.unshift({key:'private',label:'Just for you',symbol:'lock',hint:'Create for your own enjoyment and keep an editable copy. Nothing is submitted or published.'});
  return values;
 }
 function optionIcon(option){return option.icon?'<img src="assets/icons/'+option.icon+'.png" width="28" height="28" alt="">':option.symbol==='lock'?'<span aria-hidden="true">🔒</span>':'';}
 function optionsHtml(key,values){return '<div class="entry-options">'+values.map(o=>'<button type="button" class="entry-option'+(!o.hint?' compact':'')+'" data-entry-choice="'+key+'" data-value="'+esc(o.key)+'">'+optionIcon(o)+'<span><strong>'+esc(o.label)+'</strong>'+(o.hint?'<small>'+esc(o.hint)+'</small>':'')+'</span></button>').join('')+'</div>';}
 let stepNumber=0;
 function step(title,hint,key,values){
  const chosen=values.find(v=>v.key===state[key]);stepNumber++;
  return '<section class="entry-step"><span class="entry-number" aria-hidden="true">'+stepNumber+'</span><div class="entry-stephead"><h3>'+esc(title)+'</h3>'+(chosen?'<button class="entry-change" type="button" data-entry-change="'+key+'" aria-label="Change '+esc(title.toLowerCase())+'">Change</button>':'')+'</div>'+(chosen?'<p class="entry-selected">'+esc(chosen.label)+(chosen.hint?'<span>'+esc(chosen.hint)+'</span>':'')+'</p>':(hint?'<p class="entry-hint">'+esc(hint)+'</p>':'')+optionsHtml(key,values))+'</section>';
 }
 function actingRole(hat){return hat.subjectRoles?(hat.subjectRoles[state.subject]||[]).find(r=>roles.includes(r))||'':hat.roles.find(r=>roles.includes(r))||'';}
 function target(hat){
  if(isLetter(hat))return S.creationTarget(hat,'information',state.subject,state.subdivision,'teaching','');
  if(state.destination==='private')return 'design-studio-canvas.html?fun='+(hat.key==='writer'?'write':'create')+'&mode='+hat.mode;
  const url=S.creationTarget(hat,state.destination,state.subject,state.subdivision,state.stream,actingRole(hat));
  if(state.destination==='learning'){const [path,query]=url.split('?');const params=new URLSearchParams(query);params.set('learning_type',state.kind);return path+'?'+params.toString();}
  return url;
 }
 function readyText(hat){
  if(isLetter(hat))return 'Write your letter. It goes privately to '+letterSecretary()+' for review before publication in the Reading Room.';
  if(state.destination==='private')return 'Your canvas will open for work that is just for you. Save an editable copy to your device to continue later.';
  if(state.destination==='calendar')return 'Enter the event details and go to your canvas to create your Poster/Notice.';
  if(state.destination==='learning')return 'Prepare your '+(state.kind==='lesson'?'lesson':'guide')+' for the corresponding Library learning shelf. '+(hat.key==='artist'?'Submit it to the Curator when ready.':hat.key==='writer'?'Submit it to the Editor when ready.':'Publish it when ready.');
  return hat.key==='artist'?'Create your artwork and submit it to the Curator. It stays private until approved for the Gallery.':hat.key==='writer'?'Write and illustrate your piece, then submit it to the Literary Editor. It stays private until approved for publication.':'Create your information, then publish it to the appropriate Reading Room shelf.';
 }
 function render(){
  stepNumber=1;let html='<section class="entry-step"><span class="entry-number" aria-hidden="true">1</span><div class="entry-caprow"><h2>Which cap will you wear?</h2><div class="entry-capicons" role="group" aria-label="Choose your cap">'+caps.map(h=>'<button type="button" class="entry-cap" data-entry-choice="hat" data-value="'+h.key+'" aria-label="'+esc(label(h))+'" aria-pressed="'+(h.key===state.hat)+'">'+svg(h.iconId)+'<strong>'+esc(label(h))+'</strong></button>').join('')+'</div></div>'+(state.hat?'<p class="entry-capname" role="status">'+esc(label(getHat()))+'</p>':'')+'</section>';
  const hat=getHat();let complete=!!hat;
  function addSubject(){const values=subjects(hat);if(!values.length)return true;html+=step(hat.key==='activity'?'Which activity?':'Which subject?',hat.key==='activity'?'This determines the Library shelf for your work.':'Choose the subject this work belongs to.','subject',values.map(([key,label])=>({key,label})));return !!state.subject;}
  function addSubdivision(){const values=S.hatSubdivision(hat,state.subject,activityScopes);if(!values.length)return true;html+=step('Which group?','Choose the group this work is for.','subdivision',values.map(([key,label])=>({key,label})));return !!state.subdivision;}
  const creative=hat&&['writer','artist'].includes(hat.key);
  if(complete&&hat.key==='activity'&&!subjects(hat).length){html+='<p class="entry-message">No activity has been assigned. Please ask a Club Administrator.</p>';complete=false;}
  if(complete&&(hat.key==='writer'||!creative)){complete=addSubject();if(complete)complete=addSubdivision();}
  if(complete){html+=step('Where will your work go?','','destination',destinations(hat));complete=!!state.destination;}
  if(complete&&hat.key==='artist'&&['information','learning'].includes(state.destination)){complete=addSubject();}
  if(complete&&state.destination==='learning'){
   html+=step('Learning or teaching?','Choose whether you are recording your learning or helping others learn.','stream',[{key:'learning',label:'Learning',hint:'Record what you have learned or practised.'},{key:'teaching',label:'Teaching',hint:'Explain or demonstrate something for other members.'}]);complete=!!state.stream;
   if(complete){html+=step('What will you prepare?','','kind',[{key:'lesson',label:'Lesson',hint:'A topic or exercise to work through.'},{key:'guide',label:'Guide',hint:'An explanation or instructions to refer to.'}]);complete=!!state.kind;}
  }
  if(complete){stepNumber++;const letter=isLetter(hat);html+='<section class="entry-step"><span class="entry-number" aria-hidden="true">'+stepNumber+'</span><div class="entry-ready"><h3>Ready to begin</h3><p>'+esc(readyText(hat))+'</p><a class="btn entry-enter" href="'+esc(target(hat))+'">'+(state.destination==='calendar'?'Enter event details':letter?'Write your letter':'Open your canvas')+' <span aria-hidden="true">→</span></a></div></section>';}
  root.innerHTML=html+'<div class="entry-review-tools"><a class="btn secondary" href="panel-letters.html?compose=1">Letter to a Committee or the Panel</a></div>';
 }
 root.onclick=event=>{
  const pick=event.target.closest('[data-entry-choice]');if(pick&&root.contains(pick)){
   const key=pick.dataset.entryChoice,value=pick.dataset.value;
   if(key==='hat'){if(!caps.some(h=>h.key===value))return;clearFrom('hat');state.hat=value;}
   else{ // A previous branch can be revisited without retaining a later destination.
    const hat=getHat();if(!hat)return;
    if(key==='subject'&&hat.key==='writer'){clearFrom('subject');state.subject=value;}
    else if(key==='subject'&&hat.key==='artist'){state.subject=value;state.subdivision='';state.stream='';state.kind='';}
    else{clearFrom(key);state[key]=value;}
   }
   render();return;
  }
  const change=event.target.closest('[data-entry-change]');if(change&&root.contains(change)){
   const key=change.dataset.entryChange;
   if(key==='subject'&&getHat()?.key==='writer'){clearFrom('subject');}
   else if(key==='subject'&&getHat()?.key==='artist'){state.subject='';state.stream='';state.kind='';}
   else clearFrom(key);
   render();
  }
 };
 if(['letters-to-panel','letters-to-committee'].includes(requestedHat)){
  state.hat='writer';state.subject=requestedHat==='letters-to-panel'?'letter-to-panel':'letter-to-committee';
 }else if(caps.some(h=>h.key===requestedHat))state.hat=requestedHat;
 render();return {selectHat(key){if(caps.some(h=>h.key===key)){clearFrom('hat');state.hat=key;render();}}};
}};
})(window);



