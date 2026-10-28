const fs=require('fs'),vm=require('vm'),assert=require('assert');
const path=require('path');process.chdir(path.resolve(__dirname,'..'));
const source=fs.readFileSync('your-design-studio.html','utf8');
const start=source.indexOf('      function restoreStudioSession(){');
const end=source.indexOf('\n\n\n      /*',start);
assert(start>=0&&end>start);
const restore=source.slice(start,end);
function attempt({resident='SM99/1',confirmed='SM99/1',verified=true,privateVisit=true}={}){
 const data={hostAreaVerified:String(verified),currentResidentId:resident,currentMemberId:'SM99',verifiedResidentId:confirmed,ydsAuthToken:'synthetic-token',currentDisplayName:'Synthetic Member',hostAreaRoles:'["copy_editor"]'};
 let shown=0;const context={window:{SanctuaryAccess:{verifiedPrivateAccess:()=>privateVisit}},sessionStorage:{getItem:key=>data[key]||null},localStorage:{getItem:()=>null},decodeStudioToken:()=>({rid:resident,mid:'SM99'}),memberIdFromResidentRef:value=>value.split('/')[0],clean:value=>String(value||'').trim(),normaliseRole:value=>value,restoreActivityScopes:()=>{},recognisedStudioRole:()=>true,showStudio:()=>shown++,console};
 vm.runInNewContext(restore+'\nresult=restoreStudioSession();',context);return {restored:context.result,shown};
}
assert.equal(attempt().restored,true);
assert.equal(attempt({resident:'SM99/2',confirmed:'SM99/1'}).restored,false);
assert.equal(attempt({confirmed:''}).restored,false);
assert.equal(attempt({verified:false}).restored,false);
assert.equal(attempt({privateVisit:false}).restored,false);
const initStart=source.indexOf('      const enteringFromHub =');
const initEnd=source.indexOf('\n\n\n      els.verifyForm',initStart);
assert(initStart>=0&&initEnd>initStart);
for(const [search,expected]of[['?entry=1',0],['',1]]){
 let resumes=0;const context={URLSearchParams,location:{search},restoreStudioSession:()=>{resumes++;return true;},sharedMemberToken:()=>'',decodeStudioToken:()=>({})};
 vm.runInNewContext('let sharedVisitToken="";\n'+source.slice(initStart,initEnd),context);
 assert.equal(resumes,expected);
}
assert(fs.readFileSync('members-info.html','utf8').includes('href="your-design-studio.html?entry=1"'));
console.log('Fresh Hub entry shows the gate; matching Canvas return resumes; changed or unconfirmed identity cannot restore.');
