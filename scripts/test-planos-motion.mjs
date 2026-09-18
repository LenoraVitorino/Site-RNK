import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const require=createRequire(process.cwd()+'/package.json');
const {transformSync}=require('esbuild');
const source=readFileSync('src/components/home2/PlanosPalco.astro','utf8').split('<script>')[1].split('</script>')[0];
class Element {
 constructor(){this.style={};this.attrs={};this.events={};this.inert=false;this.classes=new Set();this.classList={toggle:(k,v)=>v?this.classes.add(k):this.classes.delete(k),remove:k=>this.classes.delete(k)};}
 setAttribute(k,v){this.attrs[k]=v} removeAttribute(k){delete this.attrs[k];if(k==='style')this.style={}} toggleAttribute(k,v){if(v)this.attrs[k]='';else delete this.attrs[k]} addEventListener(k,v){this.events[k]=v}
}
const layers=Array.from({length:5},()=>new Element()), icons=layers.map(()=>new Element()),names=layers.map(()=>new Element()),anchors=layers.map(()=>new Element());
const images=layers.map(()=>new Element()),infos=layers.map(()=>new Element());
layers.forEach((x,i)=>x.querySelector=k=>k==='[data-imagem]'?images[i]:infos[i]);
icons.forEach(x=>{x.pieces=[new Element(),new Element()];x.querySelectorAll=()=>x.pieces});
const section=new Element(),track=new Element(),header=new Element();
let mediaHandler;const media={matches:true,addEventListener:(_,f)=>mediaHandler=f};
const events={},frames=new Map();let seq=0,time=0;
const c={console,document:{querySelector:()=>section,getElementById:()=>header,body:new Element(),fonts:{ready:{then:f=>f()}}},matchMedia:()=>media,scrollY:1000,ResizeObserver:class{observe(){}},addEventListener:(k,f)=>events[k]=f,requestAnimationFrame:f=>{frames.set(++seq,f);return seq},cancelAnimationFrame:id=>frames.delete(id),clearTimeout(){},setTimeout(){},performance:{now:()=>time}};
c.window=c;c.scrollTo=({top})=>{c.scrollY=top;events.scroll()};
section.querySelector=()=>track;track.offsetHeight=4500;track.getBoundingClientRect=()=>({top:1000-c.scrollY});track.querySelector=()=>({offsetHeight:900});
track.querySelectorAll=k=>({'[data-plano]':layers,'[data-icone]':icons,'[data-nome]':names,'[data-plano-ir]':anchors}[k]);
vm.runInNewContext(transformSync(source,{loader:'ts',target:'es2022'}).code,c);
const flush=()=>{for(let i=0;frames.size&&i<300;i++){time+=16;let jobs=[...frames.values()];frames.clear();jobs.forEach(f=>f(time))}assert.equal(frames.size,0,'animation settles')};
const scroll=y=>{c.scrollY=y;events.scroll();flush()};
for(const i of [0,1,2,3,4,3,2,1,0]){scroll(1000+i*900);assert.equal(layers.filter(x=>!x.inert).length,1);assert.equal(layers[i].inert,false);assert.ok(Number(names[i].style.opacity)>.99);assert.ok(Number(icons[i].style.opacity)>.99)}
for(let i=0;i<4;i++){scroll(1000+(i+.5)*900);assert.ok(Number(icons[i].style.opacity)+Number(icons[i+1].style.opacity)>.9,'continuous central silhouette');assert.match(layers[i+1].style.clipPath,/50\.000%/)}
scroll(4600);assert.ok(header.classes.has('header--oculto'),'last plan keeps header hidden');scroll(5200);assert.ok(!header.classes.has('header--oculto'),'header returns after exit');
media.matches=false;mediaHandler();assert.ok(layers.every(x=>!x.inert&&!('aria-hidden'in x.attrs)));assert.ok(!('data-animado'in section.attrs));
media.matches=true;mediaHandler();assert.ok('data-animado'in section.attrs);assert.equal(layers.filter(x=>!x.inert).length,1);
console.log('PASS: five plans forward/reverse, continuous icons, wipe, inactive links, header exit, reduced-motion/mobile reset and desktop restore.');
