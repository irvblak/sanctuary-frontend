(function(){
'use strict';const nonce=new URLSearchParams(location.search).get('live'),status=document.getElementById('toolStatus');let dock=null,poll=null;
function connected(){try{return window.opener&&!window.opener.closed&&dock?.connected(window,nonce);}catch(_){return false;}}
function disable(){status.textContent='The canvas is no longer connected. Open Tools & Guide from your canvas to reconnect.';status.classList.add('error');document.querySelectorAll('button').forEach(b=>b.disabled=true);clearInterval(poll);}
if(nonce){
 try{dock=window.opener?.SanctuaryYdsCanvasTools;if(!dock?.attach(window,nonce)){disable();return;}}catch(_){disable();return;}
 status.textContent='Connected — all controls are here. Double-click the blank canvas surround for full screen; Esc exits. Closing this window returns the controls to the canvas.';
 document.getElementById('returnToolsBtn').onclick=()=>{if(connected())dock.restore();else disable();};
 document.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>{if(connected())dock.action(window,nonce,b.dataset.action);else disable();});
 poll=setInterval(()=>{if(!connected())disable();},1000);
}else{
 status.textContent='File tools for the work you opened from Canvas.';document.getElementById('windowExplanation').textContent='Return to the canvas to move its working panels into a separate window.';document.getElementById('returnToolsBtn').textContent='Back to canvas';
 const target=sessionStorage.getItem('sanctuaryYdsToolsReturnV1')||'design-studio-canvas.html';
 function go(action=''){if(action)sessionStorage.setItem('sanctuaryYdsToolsActionV1',action);else sessionStorage.removeItem('sanctuaryYdsToolsActionV1');location.replace(target);}
 document.getElementById('returnToolsBtn').onclick=()=>go();document.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>go(b.dataset.action));
}
})();
