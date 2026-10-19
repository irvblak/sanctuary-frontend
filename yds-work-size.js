(function(){
  'use strict';
  const MB=1000000;
  window.SanctuaryYdsWorkSize={watch(pages,output){
    let timer=null;
    function update(){
      timer=null;
      // Estimate the serialized artwork, including embedded image data. Do not
      // resize images or recapture drawing canvases just to update the meter.
      const bytes=new Blob([JSON.stringify({html:pages.innerHTML})]).size;
      const images=pages.querySelectorAll('.canvas-item[data-kind="image"]').length;
      const size=bytes<MB?`${Math.max(1,Math.ceil(bytes/1000))} KB`:`${(bytes/MB).toFixed(1)} MB`;
      const large=bytes>=20*MB;
      output.classList.toggle('large',large);
      output.textContent=`${images} illustration${images===1?'':'s'} · Estimated artwork size: ${size}.`+
        (large?' Large work may be slower to edit, save and open, especially on smaller devices. Keep an editable copy on your device as a backup.':'');
    }
    function schedule(){
      if(timer!==null)clearTimeout(timer);
      timer=setTimeout(update,500);
    }
    const observer=new MutationObserver(schedule);
    observer.observe(pages,{subtree:true,childList:true,attributes:true,characterData:true});
    update();
    window.addEventListener('pagehide',()=>{observer.disconnect();if(timer!==null)clearTimeout(timer);},{once:true});
    return {update};
  }};
})();
