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
    {key:"gallery",title:"Gallery",hat:"Artist",icon:"🎨",libraryDescription:"Artwork by members.",subcategories:[["photo","Photo"],["modern","Modern"],["traditional","Traditional"]],gallery:true},
    {key:"committee-news-information",title:"Committee News & Information",hat:"Committee Member / Club Secretary",icon:"📰",libraryDescription:"Club news, notices and Committee information."},
    {key:"residents-association-news-information",title:"Residents Association News & Information (RAN&I)",hat:"Residents Association Panel Member",icon:"👥",libraryDescription:"Panel news, notices and Residents Association information.",subcategories:[["news","News"],["info","Info"]]},
    {key:"general-useful-information",title:"General & Useful Information",hat:"Information Officer",icon:"💡",libraryDescription:"Useful information, recommendations, services and contacts.",subcategories:[["general-information","General Information"],["places-to-go","Places to Go"],["places-to-eat","Places to Eat"],["artisans-services","Artisans & Services"],["useful-contacts","Useful Contacts"],["manuals","Manuals"]],subcategoryLinks:{"general-information":[["Privacy, Security & Data Protection Notice","library-publications.html?id=privacy-security"]]}},
    {key:"administration",title:"Administration & Governance",hat:"Administration & Governance",icon:"🛠️",libraryDescription:"Website governance and Club and condominium administrative information.",subcategories:[["website","Website"],["website-custodian","Website Custodian"],["club-condominium-administration","Club & Condominium Administration"]],subcategoryLinks:{"website":[["Sanctuary Club Website Governance","website-governance.html"],["The Sanctuary Website Audit Trail","audit-trail-notice.html"],["Sanctuary Website Custody and Operating Guide","swcg-draft.html"]]}},
    {key:"services",title:"Services",hat:"Services",icon:"🔧",libraryDescription:"Service information and notices."},
    {key:"website-help",title:"Website Help",hat:"Website Helper",icon:"🌿",libraryDescription:"Practical website help and supporting information."},
    {key:"learning",title:"Tuition & Guides",hat:"All Role Holders",icon:"📘",libraryDescription:"Tuition, lessons and guides from Role Holders.",dynamicSubcategories:true,subcategories:[
      ["event-host","Event Host"],["activity-organiser","Activity Organiser"],["writer","Writer"],["artist","Artist"],
      ["committee-member","Committee Member"],["residents-association-panel-member","Residents Association Panel Member"],
      ["information-officer","Information Officer"],["services","Services"],["website-custodian-wc","Website Custodian (WC)"],["website-administration-wa","Website Administration (WA)"],["club-condominium-administration","Club & Condominium Administration"],["website-helper","Website Helper"]
    ],subcategoryLinks:{
      "event-host":[["Event Host Guide","role-guide.html?role=event-host"]],
      "activity-organiser":[["Activity Organiser Guide","role-guide.html?role=activity-organiser"]],
      "writer":[["Writer Guide","role-guide.html?role=writer"]],
      "artist":[["Artist Guide","role-guide.html?role=artist"],["Your Design Studio Guide","library-publications.html?id=design-studio-guide"]],
      "committee-member":[["Committee Publications Guide","role-guide.html?role=club-publications"]],
      "residents-association-panel-member":[["Residents Association Guide","role-guide.html?role=residents-association-panel"]],
      "administration":[["Administration Structure","library-publications.html?id=administration-structure"]],
      "website-helper":[["Website Helper Guide","role-guide.html?role=website-helper"]]
    }}
  ];
  const ALIASES={"clubhouse":"events","event-hosts":"events","notices-news":"committee-news-information","club-publications":"committee-news-information","committee":"committee-news-information","residents-association":"residents-association-news-information","writers":"reading-room","members-articles-stories":"reading-room","artists":"gallery","useful-information":"general-useful-information","information-officer":"general-useful-information","art-teacher":"gallery","website-helpers":"website-help","guides-help":"website-help","condominium":"administration","editorial":"administration"};
  const slug=value=>String(value||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  function originalSection(item){const canvas=item&&item.canvas_data&&typeof item.canvas_data==="object"?item.canvas_data:{};const raw=slug(canvas.section||canvas.department||item.section||item.department||item.category||"");return ALIASES[raw]||raw||"general-useful-information"}
  function publicationWorkKind(item){const canvas=item&&item.canvas_data&&typeof item.canvas_data==="object"?item.canvas_data:{};const collection=slug(item?.collection||canvas.collection||"library");const kind=slug(item?.work_kind||canvas.work_kind||"");return collection==="school"||kind==="learning"?"learning":"information"}
  function isManualPublication(item){
    const canvas=item?.canvas_data&&typeof item.canvas_data==="object"?item.canvas_data:{};
    const type=slug(item?.learning_type||canvas.learning_type||canvas.state?.learningType||"");
    const subject=slug(item?.subcategory||item?.tertiary_category||canvas.subcategory||canvas.tertiary_category||canvas.state?.tertiaryCategory||"");
    return type==="manual"||subject==="manuals"||slug(item?.category)==="manuals";
  }
  function publicationSection(item){return isManualPublication(item)?"general-useful-information":publicationWorkKind(item)==="learning"?"learning":originalSection(item)}
  function publicationCollection(){return"library"}
  const TEACHING_ROLES={
    host:"Event Host",activity:"Activity Organiser",writer:"Writer",artist:"Artist",
    "art-teacher":"Artist",committee:"Committee Member","club-publications":"Committee Member",
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
    if(raw==="art-teacher")return "Artist";
    const fallback={events:"Event Host","club-activities":"Activity Organiser","reading-room":"Writer",gallery:"Artist",
      "committee-news-information":"Committee Member","residents-association-news-information":"Residents Association Panel Member",
      "general-useful-information":"Information Officer","website-help":"Website Helper",administration:"Administration & Governance"};
    return fallback[originalSection(item)]||"Role Holder";
  }
  function publicationSubcategory(item){
    if(isManualPublication(item))return "Manuals";
    const canvas=item?.canvas_data&&typeof item.canvas_data==="object"?item.canvas_data:{};
    const scope=String(item?.subcategory_name||item?.tertiary_category||canvas.subcategory_name||canvas.tertiary_category||canvas.scope_name||"").trim();
    if(publicationWorkKind(item)!=="learning")return scope==="Website Custodian (WC)"?"Website Custodian":scope;
    const role=teachingRole(item);
    const generic=["library-guide","for-gallery","art-teacher","art-editor","website","website-custodian","club-condominium-administration"];
    return scope&&slug(scope)!==slug(role)&&!generic.includes(slug(scope))?role+" — "+scope:role;
  }
  const REGISTER_GROUPS=[{"label": "Events & Activities", "roles": [["host", "Event Host", "roleHost"], ["clubhouse_publisher", "Clubhouse Publisher", "roleClubhousePublisher"], ["activity_organiser", "Activity Organiser", "roleActivityOrganiser"]]}, {"label": "Committee Members", "roles": [["committee_chair", "Chair", "roleCommitteeChair"], ["committee_secretary", "Secretary", "roleCommitteeSecretary"], ["committee_treasurer", "Treasurer", "roleCommitteeTreasurer"], ["committee_officer", "Officer", "roleCommitteeOfficer"]]}, {"label": "Residents Association Panel Members", "roles": [["ra_chair", "Chair", "roleRaChair"], ["ra_secretary", "Secretary", "roleRaSecretary"], ["ra_treasurer", "Treasurer", "roleRaTreasurer"], ["ra_officer", "Officer", "roleRaOfficer"]]}, {"label": "Curators & Editors", "roles": [["copy_editor", "Copy Editor", "roleCopyEditor"], ["art_editor", "Art Editor or Curator", "roleArtEditor"]]}, {"label": "Other Club Roles", "roles": [["website_helper", "Website Helper", "roleWebsiteHelper"], ["services", "Services", "roleServices"], ["condominium_coordinator", "Condominium Coordinator", "roleCondominiumCoordinator"], ["information_officer", "Information Officer", "roleInformationOfficer"]]}, {"label": "Administration & Governance", "roles": [["website_custodian", "Website Custodian", "roleWebsiteCustodian"], ["admin_website", "Website Administration (WA)", "roleAdminWebsite"], ["admin_club", "Club & Condominium Administration", "roleAdminClub"]]}];
  const PRODUCTION_HATS=[{"key": "host", "label": "Event Host", "roles": ["host"], "mode": "host", "destination": "notices-news", "department": "events", "iconId": "role-host", "description": "Create Calendar, Library or Learning & Teaching work."}, {"key": "activity", "label": "Activity Organiser", "roles": ["activity_organiser"], "mode": "activity", "destination": "club-activities", "department": "club-activities", "iconId": "role-activity", "description": "Create Calendar, Library or Learning & Teaching work."}, {"key": "writer", "label": "Writer", "roles": ["writer", "news_contributor"], "mode": "writer", "destination": "members-articles-stories", "department": "reading-room", "iconId": "role-news", "fixedSubcategories": [["articles-stories", "Articles & Stories"], ["letter-to-committee", "Letter to the Committee"], ["letter-to-panel", "Letter to the Panel"]], "description": "Create Calendar, Library or Learning & Teaching work."}, {"key": "artist", "label": "Artist", "roles": ["artist"], "mode": "artist", "destination": "gallery", "department": "gallery", "iconId": "role-artist", "fixedSubcategories": [["photo", "Photo"], ["modern", "Modern"], ["traditional", "Traditional"]], "description": "Create Calendar, Library or Learning & Teaching work."}, {"key": "committee", "label": "Committee Member", "roles": ["committee", "committee_chair", "committee_secretary", "committee_treasurer", "committee_officer", "secretary", "treasurer"], "mode": "committee", "destination": "notices-news", "department": "committee-news-information", "iconId": "role-committee", "description": "Create Calendar, Library or Learning & Teaching work."}, {"key": "panel", "label": "Residents Association Panel Member", "roles": ["panel", "residents_association", "ra_chair", "ra_secretary", "ra_treasurer", "ra_officer", "panel_secretary"], "mode": "panel", "destination": "notices-news", "department": "residents-association-news-information", "iconId": "role-panel", "description": "Create Calendar, Library or Learning & Teaching work."}, {"key": "information-officer", "label": "Information Officer", "roles": ["information_officer"], "mode": "information-officer", "destination": "useful-information", "department": "general-useful-information", "iconId": "role-news", "fixedSubcategories": [["general-information", "General Information"], ["places-to-go", "Places to Go"], ["places-to-eat", "Places to Eat"], ["artisans-services", "Artisans & Services"], ["useful-contacts", "Useful Contacts"], ["manuals", "Manuals"]], "description": "Create Calendar, Library or Learning & Teaching work."}, {"key": "website-helper", "label": "Website Helper", "roles": ["website_helper"], "mode": "website-helper", "destination": "guides-help", "department": "website-help", "iconId": "role-helper", "fixedSubcategories": [["general-website-help", "General Website Help"], ["studio-help", "Studio Help"]], "description": "Create Calendar, Library or Learning & Teaching work."}, {"key": "services", "label": "Services", "roles": ["services"], "mode": "services", "destination": "notices-news", "department": "services", "iconId": "role-services", "description": "Create Calendar, Library or Learning & Teaching work."}, {"key": "condominium", "label": "Condominium Coordinator", "roles": ["condominium_coordinator", "condo_admin"], "mode": "administration", "destination": "administration", "department": "administration", "iconId": "role-admin", "fixedSubcategories": [["club-condominium-administration", "Club & Condominium Administration"]], "description": "Create Calendar, Library or Learning & Teaching work."}, {"key": "website-custodian", "label": "Website Custodian", "roles": ["website_custodian"], "mode": "administration", "destination": "administration", "department": "administration", "iconId": "role-admin", "fixedSubcategories": [["website-custodian", "Website Custodian"]], "description": "Create Calendar, Library or Learning & Teaching work."}, {"key": "website-administration", "label": "Website Administration (WA)", "roles": ["admin_website"], "mode": "administration", "destination": "administration", "department": "administration", "iconId": "role-admin", "fixedSubcategories": [["website", "Website"]], "description": "Create Calendar, Library or Learning & Teaching work."}, {"key": "club-administration", "label": "Club & Condominium Administration", "roles": ["admin_club"], "mode": "administration", "destination": "administration", "department": "administration", "iconId": "role-admin", "fixedSubcategories": [["club-condominium-administration", "Club & Condominium Administration"]], "description": "Create Calendar, Library or Learning & Teaching work."}];
  function hatSubjects(hat,assignedActivities){
    if(hat.key==="activity")return ACTIVITIES.filter(([key])=>!assignedActivities||assignedActivities.includes(key));
    return hat.fixedSubcategories||[];
  }
  function hatSubdivision(hat,subject){return hat.key==="activity"?(ACTIVITY_SUBCATEGORIES[subject]||[]):[];}
  function libraryTarget(hat,subject="",subdivision="",stream="teaching",kind="information"){
    if(subject==="manuals")return "library.html?section=general-useful-information&subject=Manuals#general-useful-information";
    const params=new URLSearchParams({section:kind==="learning"?"learning":hat.department,hat:hat.key});
    const main=hatSubjects(hat).find(([key])=>key===subject);
    const sub=hatSubdivision(hat,subject).find(([key])=>key===subdivision);
    if(main)params.set("subject",main[1]+(sub?" — "+sub[1]:""));
    if(kind==="learning")params.set("stream",stream==="learning"?"learning":"teaching");
    return "library.html?"+params.toString()+"#"+(kind==="learning"?"learning":hat.department);
  }
  function creationTarget(hat,kind,subject="",subdivision="",stream="teaching",actingRole=""){
    const main=hatSubjects(hat).find(([key])=>key===subject);
    const sub=hatSubdivision(hat,subject).find(([key])=>key===subdivision);
    const name=main?main[1]+(sub?" — "+sub[1]:""):"";
    const params=new URLSearchParams({from:"yds",acting_role:actingRole,department:hat.department,section:hat.department,scope:subject,scope_name:name,subcategory:subject,subcategory_name:name,tertiary:name,subdivision,hat:hat.key});
    if(kind==="calendar"){
      params.set("mode",hat.mode==="host"?"host":"post");params.set("source",hat.mode);params.set("status","draft");params.set("visibility","private");params.set("retention","60-days");
      return "host-event-form.html?"+params.toString();
    }
    params.set("mode",hat.mode);params.set("type","standing");params.set("destination",hat.destination);params.set("collection","library");params.set("retention","permanent");params.set("work_kind",kind==="learning"?"learning":"information");params.set("approval",["writer","artist"].includes(hat.mode)?"editor":"self");
    if(kind==="learning")params.set("learning_stream",stream==="learning"?"learning":"teaching");
    return "design-studio-canvas.html?"+params.toString();
  }
  function publicationLearningStream(item){const canvas=item?.canvas_data||{};const value=slug(item?.learning_stream||canvas.learning_stream||canvas.state?.learningStream||"teaching");return value==="learning"?"learning":"teaching";}
  function publicationHatKey(item){
    const canvas=item?.canvas_data||{};const mode=slug(item?.mode||canvas.mode);const role=slug(item?.acting_role||canvas.acting_role).replace(/-/g,"_");
    if(mode==="art-teacher")return "artist";
    const match=PRODUCTION_HATS.find(h=>h.roles.includes(role))||PRODUCTION_HATS.find(h=>h.mode===mode&&h.mode!=="administration");
    if(match)return match.key;
    const scope=slug(item?.tertiary_category||canvas.tertiary_category);
    if(mode==="administration")return scope==="website-custodian"?"website-custodian":scope==="website"?"website-administration":"club-administration";
    return "";
  }

  global.SanctuaryContentStructure={isManualPublication,REGISTER_GROUPS,PRODUCTION_HATS,hatSubjects,hatSubdivision,libraryTarget,creationTarget,publicationLearningStream,publicationHatKey,ACTIVITIES,ACTIVITY_SUBCATEGORIES,SECTIONS,ALIASES,slug,publicationSection,publicationCollection,publicationSubcategory,publicationWorkKind};
})(window);

