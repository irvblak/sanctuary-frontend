(function(){
"use strict";
if(window.SanctuaryDestinationIcons)return;
window.SanctuaryDestinationIcons=true;
const files={calendar:'calendar.png',education:'library-education.png',reading:'reading-room.png'};
function icon(kind){const img=document.createElement('img');img.src='assets/icons/'+files[kind];img.className='sanctuary-destination-icon';img.alt='';img.setAttribute('aria-hidden','true');img.width=28;img.height=28;return img;}
function decorate(){
 document.querySelectorAll('svg use').forEach(use=>{const ref=use.getAttribute('href')||use.getAttribute('xlink:href')||'';const kind=ref.endsWith('#book-open-text')?'reading':ref.endsWith('#graduation-cap')?'education':null;const svg=use.closest('svg');if(kind&&svg&&!svg.closest('.canvas-item,[contenteditable="true"]'))svg.replaceWith(icon(kind));});
 document.querySelectorAll('a,button,.studio-preamble h3').forEach(el=>{
  if(el.querySelector('.sanctuary-destination-icon')||el.closest('.canvas-item,[contenteditable="true"]'))return;
  const text=(el.textContent||'').trim(),label=el.getAttribute('aria-label')||'',raw=el.getAttribute('href')||el.dataset.target||'';
  let kind=el.dataset.destinationIcon||'';
  if(!kind&&(/(?:^|\/)events-calendar\.html(?:[?#]|$)/.test(raw)||text==='Calendar'))kind='calendar';
  if(!kind&&(/^(Library Education|Learning & Teaching|Learning and Teaching|Tuition & Guides)$/.test(text)||/Library Education/.test(label)))kind='education';
  if(!kind&&(/^(Library|Reading Room|Library Reading Room)$/.test(text)||/Reading Room/.test(label)))kind='reading';
  if(!kind)return;
  // Preserve readable labels, tooltips, destinations and existing click handlers.
  el.querySelectorAll('svg,img').forEach(old=>old.remove());
  for(const node of el.childNodes)if(node.nodeType===3)node.textContent=node.textContent.replace(/^[\s📅📆🗓️📖📚🎓]+/u,'');
  el.prepend(icon(kind));el.classList.add('sanctuary-icon-control');
 });
}
function install(){
 const style=document.createElement('style');style.textContent='.sanctuary-destination-icon{display:inline-block!important;width:28px!important;height:28px!important;object-fit:contain;vertical-align:middle;flex:0 0 28px;max-width:none!important}.sanctuary-icon-control{gap:.45rem}.sanctuary-icon-control>.sanctuary-destination-icon{margin-right:.35rem}.directory-links .sanctuary-destination-icon{width:26px!important;height:26px!important;flex-basis:26px}.studio-preamble .sanctuary-destination-icon{width:24px!important;height:24px!important;flex-basis:24px}#choiceButtons .sanctuary-destination-icon{width:34px!important;height:34px!important;flex-basis:34px}.studio-preamble h3{display:flex;align-items:center;gap:.45rem}';document.head.append(style);
 decorate();let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;decorate();});}).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
