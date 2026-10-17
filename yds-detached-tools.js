(function(){
'use strict';
const nativeDocument=window.document;
window.SanctuaryYdsToolDock={create(options={}){
 let child=null,token='',poll=null,moved=[],listeners=[],closing=false,fullscreenClick=null,reviewDisabled=[];
 const toolDocument=()=>{try{return child&&!child.closed&&child.location.origin===location.origin?child.document:null;}catch(_){return null;}};
 function layout(){requestAnimationFrame(()=>{window.dispatchEvent(new Event('resize'));options.onLayout?.();});}
 function addListener(type,handler,settings){listeners.push({type,handler,settings});nativeDocument.addEventListener(type,handler,settings);if(type==='keydown')toolDocument()?.addEventListener(type,handler,settings);}
 const documentProxy=new Proxy(nativeDocument,{get(target,key){
  if(key==='getElementById')return id=>target.getElementById(id)||toolDocument()?.getElementById(id)||null;
  if(key==='querySelector')return selector=>target.querySelector(selector)||toolDocument()?.querySelector(selector)||null;
  if(key==='querySelectorAll')return selector=>[...target.querySelectorAll(selector),...(toolDocument()?.querySelectorAll(selector)||[])];
  if(key==='addEventListener')return addListener;
  if(key==='activeElement'){const td=toolDocument();return td?.hasFocus()&&td.activeElement!==td.body?td.activeElement:target.activeElement;}
  const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;
 }});
 function restore(closeWindow=true){
  if(!child&&!moved.length)return;
  const previous=child,td=toolDocument();
  if(fullscreenClick){nativeDocument.removeEventListener('pointerdown',fullscreenClick,true);fullscreenClick=null;}
  listeners.filter(x=>x.type==='keydown').forEach(x=>td?.removeEventListener(x.type,x.handler,x.settings));
  // Move the actual controls back, retaining values, listeners and selection state.
  reviewDisabled.forEach(({node,disabled})=>node.disabled=disabled);reviewDisabled=[];
  moved.forEach(({node,marker})=>{if(marker.parentNode)marker.replaceWith(node);});moved=[];
  nativeDocument.body.classList.remove('tools-detached');child=null;token='';clearInterval(poll);poll=null;
  const restoreButton=nativeDocument.getElementById('returnCanvasToolsBtn');if(restoreButton)restoreButton.hidden=true;
  layout();if(closeWindow&&previous&&!previous.closed)previous.close();
 }
 function attach(candidate,nonce){
  if(candidate!==child||nonce!==token||closing)return false;
  if(moved.length)return true;
  let td;try{if(candidate.location.origin!==location.origin)return false;td=candidate.document;}catch(_){return false;}
  const destination=td.getElementById('liveTools');if(!destination)return false;
  nativeDocument.querySelectorAll('style,link[rel="stylesheet"]').forEach(style=>{const copy=style.cloneNode(true);copy.dataset.canvasToolStyle='';td.head.insertBefore(copy,td.getElementById('toolWindowStyle'));});
  const nodes=[...nativeDocument.querySelectorAll('.canvas-compact-head,.canvas-side-left,.canvas-side-right,#toolsChoice,#repeatDatesBox'),...nativeDocument.querySelectorAll('input[type="file"]')];
  nodes.forEach(node=>{if(moved.some(x=>x.node.contains(node)))return;const marker=nativeDocument.createComment('YDS tool position');node.before(marker);moved.push({node,marker});const host=node.matches('.canvas-compact-head')?(td.getElementById('liveActions')||destination):node.matches('#toolsChoice,#repeatDatesBox')?(td.getElementById('liveDialogs')||destination):destination;host.appendChild(node);});
  const review=nativeDocument.body.classList.contains('editor-review');td.body.classList.toggle('editor-review',review);
  if(review)td.querySelectorAll('.canvas-side button,.canvas-side input,.canvas-side select,.canvas-side textarea').forEach(node=>{reviewDisabled.push({node,disabled:node.disabled});node.disabled=true;});
  if(review)td.querySelectorAll('[data-action="open-work"]').forEach(node=>node.disabled=true);
  listeners.filter(x=>x.type==='keydown').forEach(x=>td.addEventListener(x.type,x.handler,x.settings));
  nativeDocument.body.classList.add('tools-detached');const restoreButton=documentProxy.getElementById('returnCanvasToolsBtn');if(restoreButton)restoreButton.hidden=false;
  candidate.addEventListener('pagehide',()=>{if(child===candidate)restore(false);},{once:true});
  poll=setInterval(()=>{if(child?.closed)restore(false);},600);layout();return true;
 }
 function open(){
  if(child&&!child.closed){child.focus();return true;}
  options.beforeDetach?.();token=Array.from(crypto.getRandomValues(new Uint32Array(4)),x=>x.toString(16)).join('');
  child=window.open('design-studio-tools.html?live='+encodeURIComponent(token),'sanctuaryYdsTools_'+token,'width=850,height=900,resizable=yes,scrollbars=yes');
  if(!child){token='';alert('Your browser blocked the tools window. Allow pop-ups for Sanctuary Club, then try again. Your tools remain beside the canvas.');return false;}
  return true;
 }
 function screenStatus(text){const status=toolDocument()?.getElementById('toolStatus');if(status)status.textContent=text;}
 async function enterFullscreen(){try{await nativeDocument.documentElement.requestFullscreen();screenStatus('Canvas is full screen. Press Esc on the canvas monitor to leave full screen.');}catch(_){screenStatus('Use the canvas browser’s full-screen command, or maximise its window. Your work and controls are unchanged.');}}
 async function fullscreen(){
  if(nativeDocument.fullscreenElement){try{await nativeDocument.exitFullscreen();}catch(_){}return;}
  if(typeof nativeDocument.documentElement.requestFullscreen!=='function'){screenStatus('Use the canvas browser’s full-screen command, or maximise its window.');return;}
  if(!toolDocument()?.hasFocus()){await enterFullscreen();return;}
  // Browsers require a real click in the window entering full screen. Keep the
  // artwork monitor clear while inviting that click through the control window.
  if(fullscreenClick)nativeDocument.removeEventListener('pointerdown',fullscreenClick,true);
  fullscreenClick=event=>{if(!event.target.closest?.('.canvas-stage')||event.target.closest?.('.canvas-item'))return;nativeDocument.removeEventListener('pointerdown',fullscreenClick,true);fullscreenClick=null;enterFullscreen();};
  nativeDocument.addEventListener('pointerdown',fullscreenClick,true);window.focus();
  screenStatus('Click once on the blank canvas surround to enter full screen. Press Esc there to leave it.');
 }
 nativeDocument.addEventListener('dblclick',event=>{if(child&&nativeDocument.body.classList.contains('tools-detached')&&event.target.closest?.('.canvas-stage')&&!event.target.closest?.('.canvas-item')){event.preventDefault();fullscreen();}});
 nativeDocument.addEventListener('fullscreenchange',()=>{for(const id of ['fullscreenCanvasBtn','fullscreenFromToolsBtn']){const b=documentProxy.getElementById(id);if(b)b.textContent=nativeDocument.fullscreenElement?'Exit full screen':'Full screen canvas';}layout();});
 window.addEventListener('pagehide',()=>{closing=true;restore();});
 const api={document:documentProxy,alert(message){(toolDocument()?.defaultView||window).alert(message);},confirm(message){return (toolDocument()?.defaultView||window).confirm(message);},open,restore,fullscreen,attach,action(candidate,nonce,action){if(candidate!==child||nonce!==token)return false;options.onAction?.(action);return true;},connected(candidate,nonce){return candidate===child&&nonce===token&&!closing;}};
 window.SanctuaryYdsCanvasTools=api;return api;
}};
})();
