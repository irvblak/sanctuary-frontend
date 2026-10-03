(function(){
  "use strict";

  function samePage(url){
    try{
      const here=new URL(location.href);
      const there=new URL(url,location.href);
      return here.pathname===there.pathname&&here.search===there.search;
    }catch(_){return false}
  }

  function previousPage(event){
    event.preventDefault();
    if(history.length>1&&!samePage(document.referrer)){
      history.back();
      return;
    }
    location.href="members-info.html";
  }

  function hasExistingLink(filename){
    return Array.from(document.querySelectorAll("a[href]")).some(function(link){
      try{
        return new URL(link.getAttribute("href"),location.href).pathname.endsWith("/"+filename);
      }catch(_){
        return false;
      }
    });
  }

  function makeBar(position,options){
    const nav=document.createElement("nav");
    nav.className="sanctuary-site-navigation sanctuary-site-navigation-"+position;
    nav.setAttribute("aria-label",position==="top"?"Page navigation":"Page navigation at end of page");

    const links=['<a href="#" class="sanctuary-nav-back">← Previous Page</a>'];
    if(options.showCalendar)links.push('<a href="events-calendar.html">Calendar</a>');
    if(options.showHub)links.push('<a href="members-info.html">Members Hub</a>');
    nav.innerHTML=links.join("");

    nav.querySelector(".sanctuary-nav-back").addEventListener("click",previousPage);
    return nav;
  }

  function install(){
    if(!document.body||document.querySelector(".sanctuary-site-navigation"))return;

    const style=document.createElement("style");
    style.textContent=".sanctuary-site-navigation{width:min(1180px,calc(100% - 24px));margin:8px auto;display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;font:800 14px/1.2 system-ui,-apple-system,Segoe UI,sans-serif}.sanctuary-site-navigation a{display:inline-flex;align-items:center;justify-content:center;padding:7px 11px;border:1px solid #cbd9e4;border-radius:999px;background:#fff;color:#174f73;text-decoration:none;box-shadow:0 3px 10px rgba(20,60,80,.06)}.sanctuary-site-navigation a:hover,.sanctuary-site-navigation a:focus{background:#eef6fb;border-color:#6f9eb8}.sanctuary-site-navigation-bottom{margin-top:18px;margin-bottom:14px}@media print{.sanctuary-site-navigation{display:none!important}}";
    document.head.appendChild(style);

    /*
      Older pages may already contain Calendar and/or Members Hub links.
      Keep those page-specific controls and add only navigation that is
      genuinely missing, so the shared bar does not duplicate buttons.
    */
    const options={
      showCalendar:!hasExistingLink("events-calendar.html"),
      showHub:!hasExistingLink("members-info.html")
    };

    document.body.insertBefore(makeBar("top",options),document.body.firstChild);
    document.body.appendChild(makeBar("bottom",options));
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});
  else install();
})();
