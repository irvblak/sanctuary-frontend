const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../canvas-view-size.js'), 'utf8');
const events = new Map(), frames = [];
const props = {};
const stage = {clientWidth: 1008, clientHeight: 808};
const page = {innerHTML: '<div class="canvas-page landscape"><div style="left:8%;font-size:18px">Synthetic work</div></div>', style: {setProperty: (k,v) => props[k]=v}, closest: () => stage};
function control(value) { return {value, hidden: false, textContent: '', addEventListener: (event,fn) => events.set(value+':'+event,fn)}; }
const orientation = control('landscape'), controls = control('controls'), slider = control('100'), output = control('output'), fit = control('fit');
const ids = {creativePages: page, orientationSelect: orientation, landscapeViewControls: controls, landscapeViewSize: slider, landscapeViewValue: output, fitLandscapeViewBtn: fit};
let resize, mutation;
const context = {document: {readyState: 'complete', getElementById: id => ids[id]}, window: {addEventListener: (event,fn) => events.set('window:'+event,fn)}, getComputedStyle: () => ({paddingLeft:'4px',paddingRight:'4px',paddingTop:'4px',paddingBottom:'4px'}), requestAnimationFrame: fn => frames.push(fn), ResizeObserver: class {constructor(fn){resize=fn}observe(){}}, MutationObserver: class {constructor(fn){mutation=fn}observe(){}}};
function flush(){while(frames.length) frames.shift()();}
function size(){const scale=Number(props['--landscape-view-scale']); return {width:860*scale,height:860*210/297*scale};}
vm.runInNewContext(source, context);flush();
const saved=page.innerHTML;
assert.equal(controls.hidden,false);
assert.equal(output.textContent,'100%');
assert.ok(size().width<=1000+.001 && size().height<=800+.001);
assert.ok(Math.abs(size().width-1000)<.001);
slider.value='40';events.get('100:input')();flush();
assert.equal(output.textContent,'40%');
assert.ok(Math.abs(size().width-400)<.001);
assert.equal(page.innerHTML,saved,'View size must not alter saved artwork');
events.get('fit:click')();flush();assert.equal(slider.value,'100');
// Moving tools away gives the page a larger working area.
stage.clientWidth=1608;stage.clientHeight=908;resize();flush();
assert.ok(size().width>1000);
assert.ok(Math.abs(size().height-900)<.001);
// A small screen must still contain the whole page.
stage.clientWidth=328;stage.clientHeight=308;events.get('window:resize')();flush();
assert.ok(size().width<=320+.001 && size().height<=300+.001);
assert.ok(Math.abs(size().width/size().height-297/210)<.00001);
orientation.value='portrait';events.get('landscape:change')();flush();assert.equal(controls.hidden,true);
orientation.value='landscape';mutation();flush();assert.equal(controls.hidden,false);
assert.equal(page.innerHTML,saved);
console.log('Landscape fits wide/small workspaces, slider and detached-tool resizing preserve proportions and saved work; Portrait stays separate.');
