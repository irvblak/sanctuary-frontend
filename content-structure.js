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
    {key:"gallery",title:"Gallery",hat:"Artist / Art Teacher",icon:"🎨",libraryDescription:"Artwork by members and Gallery work from the Art Teacher.",subcategories:[["photo","Photo"],["modern","Modern"],["traditional","Traditional"],["art-teacher","Art Teacher"],["art-editor","Art Editor or Curator"]],gallery:true},
    {key:"committee-news-information",title:"Committee News & Information",hat:"Committee Member / Club Secretary",icon:"📰",libraryDescription:"Club news, notices, privacy and Committee information.",subcategories:[["privacy-security","Privacy & Security"]],subcategoryLinks:{"privacy-security":[["Privacy, Security & Data Protection Notice","library-publications.html?id=privacy-security"]]}},
    {key:"residents-association-news-information",title:"Residents Association News & Information (RAN&I)",hat:"Residents Association Panel Member",icon:"👥",libraryDescription:"Panel news, notices and Residents Association information.",subcategories:[["news","News"],["info","Info"]]},
    {key:"general-useful-information",title:"General & Useful Information",hat:"Information Officer",icon:"💡",libraryDescription:"Useful information, recommendations, services and contacts.",subcategories:[["general-information","General Information"],["places-to-go","Places to Go"],["places-to-eat","Places to Eat"],["artisans-services","Artisans & Services"],["useful-contacts","Useful Contacts"]]},
    {key:"administration",title:"Administration & Governance",hat:"Administration & Governance",icon:"🛠️",libraryDescription:"Website governance and Club and condominium administrative information.",subcategories:[["website","Website"],["website-custodian","Website Custodian (WC)"],["club-condominium-administration","Club & Condominium Administration"]],subcategoryLinks:{"website":[["Sanctuary Club Website Governance","website-governance.html"],["The Sanctuary Website Audit Trail","audit-trail-notice.html"],["Sanctuary Website Custody and Operating Guide","swcg-draft.html"]]}},
    {key:"services",title:"Services",hat:"Services",icon:"🔧",libraryDescription:"Service information and notices."},
    {key:"website-help",title:"Website Help",hat:"Website Helper",icon:"🌿",libraryDescription:"Practical website help and supporting information."},
    {key:"learning",title:"Learning",hat:"All Role Holders",icon:"📘",libraryDescription:"Advice, guides, lessons and manuals from Role Holders.",dynamicSubcategories:true,subcategories:[
      ["event-host","Event Host"],["activity-organiser","Activity Organiser"],["writer","Writer"],["artist","Artist"],
      ["committee-member","Committee Member"],["residents-association-panel-member","Residents Association Panel Member"],
      ["information-officer","Information Officer"],["art-teacher","Art Teacher"],["copy-editor","Copy Editor"],["art-editor-or-curator","Art Editor or Curator"],["services","Services"],["website-custodian-wc","Website Custodian (WC)"],["website-administration-wa","Website Administration (WA)"],["club-condominium-administration","Club & Condominium Administration"],["website-helper","Website Helper"]
    ],subcategoryLinks:{
      "event-host":[["Event Host Guide","role-guide.html?role=event-host"]],
      "activity-organiser":[["Activity Organiser Guide","role-guide.html?role=activity-organiser"]],
      "writer":[["Writer Guide","role-guide.html?role=writer"]],
      "artist":[["Artist Guide","role-guide.html?role=artist"]],
      "committee-member":[["Committee Publications Guide","role-guide.html?role=club-publications"]],
      "residents-association-panel-member":[["Residents Association Guide","role-guide.html?role=residents-association-panel"]],
      "art-teacher":[["Your Design Studio Guide","library-publications.html?id=design-studio-guide"]],
      "administration":[["Administration Structure","library-publications.html?id=administration-structure"]],
      "website-helper":[["Website Helper Guide","role-guide.html?role=website-helper"]]
    }}
  ];
  const ALIASES={"event-hosts":"events","notices-news":"committee-news-information","club-publications":"committee-news-information","committee":"committee-news-information","residents-association":"residents-association-news-information","writers":"reading-room","members-articles-stories":"reading-room","artists":"gallery","useful-information":"general-useful-information","information-officer":"general-useful-information","art-teacher":"gallery","website-helpers":"website-help","guides-help":"website-help","condominium":"administration","editorial":"administration"};
  const slug=value=>String(value||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  function originalSection(item){const canvas=item&&item.canvas_data&&typeof item.canvas_data==="object"?item.canvas_data:{};const raw=slug(canvas.section||canvas.department||item.section||item.department||item.category||"");return ALIASES[raw]||raw||"general-useful-information"}
  function publicationWorkKind(item){const canvas=item&&item.canvas_data&&typeof item.canvas_data==="object"?item.canvas_data:{};const collection=slug(item?.collection||canvas.collection||"library");const kind=slug(item?.work_kind||canvas.work_kind||"");return collection==="school"||kind==="learning"?"learning":"information"}
  function publicationSection(item){return publicationWorkKind(item)==="learning"?"learning":originalSection(item)}
  function publicationCollection(){return"library"}
  const TEACHING_ROLES={
    host:"Event Host",activity:"Activity Organiser",writer:"Writer",artist:"Artist",
    "art-teacher":"Art Teacher",committee:"Committee Member","club-publications":"Committee Member",
    panel:"Residents Association Panel Member",services:"Services","information-officer":"Information Officer",
    "website-helper":"Website Helper",condominium:"Club & Condominium Administration"
  };
  function teachingRole(item){
    const canvas=item?.canvas_data&&typeof item.canvas_data==="object"?item.canvas_data:{};
    const acting=slug(item?.acting_role||canvas.acting_role);
    const named={"copy-editor":"Copy Editor",editor:"Copy Editor","art-editor":"Art Editor or Curator",
      "website-custodian":"Website Custodian (WC)","admin-website":"Website Administration (WA)",
      "admin-club":"Club & Condominium Administration","condominium-coordinator":"Club & Condominium Administration","condo-admin":"Club & Condominium Administration"};
    if(named[acting])return named[acting];
    const mode=slug(item?.mode||canvas.mode);
    if(TEACHING_ROLES[mode])return TEACHING_ROLES[mode];
    const raw=slug(canvas.section||canvas.department||item?.department||item?.category);
    if(raw==="art-teacher")return "Art Teacher";
    const fallback={events:"Event Host","club-activities":"Activity Organiser","reading-room":"Writer",gallery:"Artist",
      "committee-news-information":"Committee Member","residents-association-news-information":"Residents Association Panel Member",
      "general-useful-information":"Information Officer","website-help":"Website Helper",administration:"Administration & Governance"};
    return fallback[originalSection(item)]||"Role Holder";
  }
  function publicationSubcategory(item){
    const canvas=item?.canvas_data&&typeof item.canvas_data==="object"?item.canvas_data:{};
    const scope=String(item?.subcategory_name||item?.tertiary_category||canvas.subcategory_name||canvas.tertiary_category||canvas.scope_name||"").trim();
    if(publicationWorkKind(item)!=="learning")return scope;
    const role=teachingRole(item);
    const generic=["library-guide","for-gallery","art-teacher","art-editor","website","website-custodian","club-condominium-administration"];
    return scope&&slug(scope)!==slug(role)&&!generic.includes(slug(scope))?role+" — "+scope:role;
  }
  global.SanctuaryContentStructure={ACTIVITIES,ACTIVITY_SUBCATEGORIES,SECTIONS,ALIASES,slug,publicationSection,publicationCollection,publicationSubcategory,publicationWorkKind};
})(window);
