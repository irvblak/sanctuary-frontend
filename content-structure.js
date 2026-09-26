(function(global){
  "use strict";

  const ACTIVITIES = [
    ["daffs-caff","Daff’s Caff"],
    ["book-club","Book Club"],
    ["bridge","Bridge"],
    ["mahjong","Mahjong"],
    ["rummikub","Rummikub"],
    ["bowls","Bowls"],
    ["table-tennis","Table Tennis"],
    ["cookery","Cookery"],
    ["fitness","Fitness"],
    ["walking-group","Walking Group"],
    ["art-group","Art Group"],
    ["gardening","Gardening"],
    ["computer-art","Computer Art"]
  ];

  const SECTIONS = [
    {key:"events",title:"Events",hat:"Event Host",icon:"🎪",libraryDescription:"Published Event Notices and lasting Event records.",schoolLinks:[["Event Host Guide","role-guide.html?role=event-host"]]},
    {key:"club-activities",title:"Club Activities",hat:"Activity Organiser",icon:"🌱",libraryDescription:"Information and publications for each regular Club activity.",subcategories:ACTIVITIES,schoolLinks:[["Activity Organiser Guide","role-guide.html?role=activity-organiser"]]},
    {key:"reading-room",title:"Reading Room",hat:"Writer",icon:"✍️",libraryDescription:"Articles, stories and other writing contributed by members.",schoolLinks:[["Writer Guide","role-guide.html?role=writer"]]},
    {key:"gallery",title:"Gallery",hat:"Artist",icon:"🎨",libraryDescription:"Members’ photography, modern art and traditional artwork.",subcategories:[["photo","Photo"],["modern","Modern"],["traditional","Traditional"]],gallery:true,schoolLinks:[["Artist Guide","role-guide.html?role=artist"]]},
    {key:"committee-news-information",title:"Committee News & Information",hat:"Committee Member",icon:"📰",libraryDescription:"Club news, notices, meetings and Committee information.",schoolLinks:[["Committee Publications Guide","role-guide.html?role=club-publications"]]},
    {key:"residents-association-news-information",title:"Residents Association News & Information (RAN&I)",hat:"Residents Association Panel Member",icon:"👥",libraryDescription:"Panel news, notices and Residents Association information.",subcategories:[["news","News"],["info","Info"]],subcategoryLinks:{"info":[["Sanctuary Website Custody and Operating Guide","swcg-draft.html"]]},schoolLinks:[["Residents Association Guide","role-guide.html?role=residents-association-panel"]]},
    {key:"general-useful-information",title:"General & Useful Information",hat:"Information Officer",icon:"💡",libraryDescription:"Useful information, recommendations, services and contacts.",subcategories:[["general-information","General Information"],["places-to-go","Places to Go"],["places-to-eat","Places to Eat"],["artisans-services","Artisans & Services"],["useful-contacts","Useful Contacts"]],subcategoryLinks:{"general-information":[["Privacy, Security & Data Protection Notice","library-publications.html?id=privacy-security"]]}},
    {key:"administration",title:"Administration",hat:"Administration",icon:"🛠️",libraryDescription:"Website, Club and condominium administrative information.",subcategories:[["website-administration","Website Administration"],["club-condominium-administration","Club & Condominium Administration"]],schoolLinks:[["Administration Structure","library-publications.html?id=administration-structure"]]},
    {key:"website-help",title:"Website Help",hat:"Website Helper",icon:"🌿",libraryDescription:"Practical help with the website and Your Design Studio.",schoolLinks:[["Website Helper Guide","role-guide.html?role=website-helper"],["Your Design Studio Guide","library-publications.html?id=design-studio-guide"]]}
  ];

  const ALIASES = {
    "event-hosts":"events","notices-news":"committee-news-information",
    "club-publications":"committee-news-information","committee":"committee-news-information",
    "residents-association":"residents-association-news-information",
    "writers":"reading-room","members-articles-stories":"reading-room",
    "artists":"gallery","useful-information":"general-useful-information",
    "information-officer":"general-useful-information","website-helpers":"website-help",
    "guides-help":"website-help","condominium":"administration","editorial":"administration"
  };

  const slug=value=>String(value||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  function publicationSection(item){
    const canvas=item&&item.canvas_data&&typeof item.canvas_data==="object"?item.canvas_data:{};
    const raw=slug(canvas.section||canvas.department||item.section||item.department||item.category||"");
    return ALIASES[raw]||raw||"general-useful-information";
  }
  function publicationCollection(item){return slug(item?.collection||item?.canvas_data?.collection||"library")||"library"}
  function publicationSubcategory(item){return String(item?.subcategory_name||item?.tertiary_category||item?.canvas_data?.subcategory_name||item?.canvas_data?.tertiary_category||"").trim()}

  global.SanctuaryContentStructure={ACTIVITIES,SECTIONS,ALIASES,slug,publicationSection,publicationCollection,publicationSubcategory};
})(window);
