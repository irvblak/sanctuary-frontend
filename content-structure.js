(function(global){
  "use strict";
  const ACTIVITIES=[
    ["art-club","Art Club"],["book-club","Book Club"],["bowls","Bowls"],["bridge","Bridge"],
    ["computer-art","Computer Art"],["cookery","Cookery"],["daffs-caff","Daff’s Caff"],["discussion-group","Discussion Group"],["fitness","Fitness"],
    ["gardening","Gardening"],["mahjong","Mahjong"],["quiz","Quiz"],["raconteurs","Raconteurs"],
    ["rummikub","Rummikub"],["spa","Spa"],["table-tennis","Table Tennis"],["walking-group","Walking Group"]
  ];
  const ACTIVITY_SUBCATEGORIES={spa:[["ladies","Ladies"],["gentlemen","Gentlemen"]]};
  const SECTIONS=[
    {key:"events",title:"Events",hat:"Event Host",icon:"🎪",libraryDescription:"Event Notices and lasting Event information."},
    {key:"club-activities",title:"Club Activities",hat:"Activity Organiser",icon:"🌱",libraryDescription:"Information and work from each Club activity.",subcategories:ACTIVITIES},
    {key:"reading-room",title:"Reading Room",hat:"Writer",icon:"✍️",libraryDescription:"Articles, stories and courteous correspondence by members.",subcategories:[["articles-stories","Articles & Stories"],["letter-to-committee","Letter to the Committee"],["letter-to-panel","Letter to the Panel"]]},
    {key:"gallery",title:"Gallery",hat:"Artist / Art Teacher",icon:"🎨",libraryDescription:"Artwork by members and Gallery work from the Art Teacher.",subcategories:[["photo","Photo"],["modern","Modern"],["traditional","Traditional"],["art-teacher","Art Teacher"]],gallery:true},
    {key:"committee-news-information",title:"Committee News & Information",hat:"Committee Member / Club Secretary",icon:"📰",libraryDescription:"Club news, notices, governance, privacy and Committee information.",subcategories:[["governance","Governance"],["privacy-security","Privacy & Security"]],subcategoryLinks:{"governance":[["Sanctuary Club Website Governance","website-governance.html"],["The Sanctuary Website Audit Trail","audit-trail-notice.html"]],"privacy-security":[["Privacy, Security & Data Protection Notice","library-publications.html?id=privacy-security"]]}},
    {key:"residents-association-news-information",title:"Residents Association News & Information (RAN&I)",hat:"Residents Association Panel Member",icon:"👥",libraryDescription:"Panel news, notices and Residents Association information.",subcategories:[["news","News"],["info","Info"]]},
    {key:"general-useful-information",title:"General & Useful Information",hat:"Information Officer",icon:"💡",libraryDescription:"Useful information, recommendations, services and contacts.",subcategories:[["general-information","General Information"],["places-to-go","Places to Go"],["places-to-eat","Places to Eat"],["artisans-services","Artisans & Services"],["useful-contacts","Useful Contacts"]]},
    {key:"administration",title:"Administration",hat:"Administration",icon:"🛠️",libraryDescription:"Website, Club and condominium administrative information.",subcategories:[["website-administration","Website Administration"],["club-condominium-administration","Club & Condominium Administration"]],subcategoryLinks:{"website-administration":[["Sanctuary Website Custody and Operating Guide","swcg-draft.html"]]}},
    {key:"website-help",title:"Website Help",hat:"Website Helper",icon:"🌿",libraryDescription:"Practical website help and supporting information."},
    {key:"learning",title:"Learning",hat:"All Role Holders",icon:"📘",libraryDescription:"Advice, guides, lessons and manuals from Role Holders.",dynamicSubcategories:true,subcategories:[
      ["event-host","Event Host"],["activity-organiser","Activity Organiser"],["writer","Writer"],["artist","Artist"],
      ["committee-member","Committee Member"],["residents-association-panel-member","Residents Association Panel Member"],
      ["information-officer","Information Officer"],["art-teacher","Art Teacher"],["administration","Administration"],["website-helper","Website Helper"]
    ],subcategoryLinks:{
      "event-host":[["Event Host Guide","role-guide.html?role=event-host"]],
      "activity-organiser":[["Activity Organiser Guide","role-guide.html?role=activity-organiser"]],
      "writer":[["Writer Guide","role-guide.html?role=writer"]],
      "artist":[["Artist Guide","role-guide.html?role=artist"]],
      "committee-member":[["Committee Publications Guide","role-guide.html?role=club-publications"]],
      "residents-association-panel-member":[["Residents Association Guide","role-guide.html?role=residents-association-panel"]],
      "art-teacher":[["Your Design Studio — Quick Guide","library-publications.html?id=design-studio-guide"],["Your Design Studio — Publishing Guide","library-publications.html?id=design-studio-publishing"]],
      "administration":[["Administration Structure","library-publications.html?id=administration-structure"]],
      "website-helper":[["Website Helper Guide","role-guide.html?role=website-helper"],["Your Design Studio Guide","library-publications.html?id=design-studio-guide"]]
    }}
  ];
  const ALIASES={"event-hosts":"events","notices-news":"committee-news-information","club-publications":"committee-news-information","committee":"committee-news-information","residents-association":"residents-association-news-information","writers":"reading-room","members-articles-stories":"reading-room","artists":"gallery","useful-information":"general-useful-information","information-officer":"general-useful-information","art-teacher":"gallery","website-helpers":"website-help","guides-help":"website-help","condominium":"administration","editorial":"administration"};
  const slug=value=>String(value||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  function originalSection(item){const canvas=item&&item.canvas_data&&typeof item.canvas_data==="object"?item.canvas_data:{};const raw=slug(canvas.section||canvas.department||item.section||item.department||item.category||"");return ALIASES[raw]||raw||"general-useful-information"}
  function publicationWorkKind(item){const canvas=item&&item.canvas_data&&typeof item.canvas_data==="object"?item.canvas_data:{};const collection=slug(item?.collection||canvas.collection||"library");const kind=slug(item?.work_kind||canvas.work_kind||"");return collection==="school"||kind==="learning"?"learning":"information"}
  function publicationSection(item){return publicationWorkKind(item)==="learning"?"learning":originalSection(item)}
  function publicationCollection(){return"library"}
  function publicationSubcategory(item){const canvas=item&&item.canvas_data&&typeof item.canvas_data==="object"?item.canvas_data:{};const scope=String(item?.subcategory_name||item?.tertiary_category||canvas.subcategory_name||canvas.tertiary_category||canvas.scope_name||"").trim();if(publicationWorkKind(item)!=="learning")return scope;const section=SECTIONS.find(entry=>entry.key===originalSection(item));const role=section?.hat||section?.title||"Role Holder";return scope&&slug(scope)!==slug(role)?role+" — "+scope:role}
  global.SanctuaryContentStructure={ACTIVITIES,ACTIVITY_SUBCATEGORIES,SECTIONS,ALIASES,slug,publicationSection,publicationCollection,publicationSubcategory,publicationWorkKind};
})(window);
