const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname,'../members-directory.js'),'utf8');
const code = source.slice(source.indexOf('let directoryAccessDenied'), source.indexOf('// ---------- Helpers'));
async function scenario(token,status,networkError=false) {
 let fallback=0,request;
 const context={sessionStorage:{getItem:k=>k==='authToken'?token:null},BACKEND_URL:'https://synthetic.invalid',loadMembersLocal:()=>{fallback++;return {cached:'private'};},console:{warn:()=>{}},fetch:async(url,options)=>{request=options;if(networkError)throw Error('offline');return {status,ok:status===200,json:async()=>({success:true,members:{SC99:{name:'Synthetic'}}})};}};
 vm.createContext(context);vm.runInContext(code,context);
 const result=await vm.runInContext('loadMembers()',context);
 return {result,fallback,request};
}
(async()=>{
 for(const token of ['',null]) {const r=await scenario(token,200);assert.equal(r.fallback,0);assert.equal(r.request,undefined);assert.equal(Object.keys(r.result).length,0);}
 for(const status of [401,403]) {const r=await scenario('synthetic-token',status);assert.equal(r.fallback,0);assert.equal(Object.keys(r.result).length,0);}
 const good=await scenario('synthetic-token',200);assert.equal(good.request.headers.Authorization,'Bearer synthetic-token');assert.ok(good.result.SC99);
 const offline=await scenario('synthetic-token',0,true);assert.equal(offline.fallback,1);
 // Other callers must supply the same present-session identity after protection.
 for(const file of ['role-holders.html','website-helpers.html']) {const text=fs.readFileSync(path.join(__dirname,'../'+file),'utf8');assert.ok(text.includes('"Authorization":"Bearer "+(sessionStorage.getItem("authToken")||sessionStorage.getItem("ydsAuthToken")||"")'));}
 const host=fs.readFileSync(path.join(__dirname,'../host-dashboard.html'),'utf8');assert.ok(host.includes('href="events-details.html?event_id='));assert.ok(!host.includes('href="event-details.html?event_id='));
 console.log('Private Directory requests authenticate, rejected/missing sessions do not display cached contacts; protected callers and Host link checked.');
})().catch(error=>{console.error(error);process.exitCode=1;});
