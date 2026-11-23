import Link from 'next/link';
import { ParallelGates, HadamardPaths } from './motivation-labs';
import chapters from '@/content/chapters.json';
import { ProofButton, ProofNode } from './proof-reader';
import { definitionTerms, definitionBlocks } from '@/lib/definitions';
import { theoremNames } from '@/lib/proofs';
import katex from 'katex';
import { GateLab } from './gate-lab';
import { gates } from '@/lib/quantum';
import {CircuitLab} from './labs';

const targets:Record<string,string>={
  'Basic Definitions page':'/definitions','Computational Power':'/power','Main Theorems':'/theorems','motivation':'/motivation','next section':'/families','consequences of this later':'/power#s178','Main Theorems section':'/theorems#s135',
  "Grover's algorithm":'/power#s158', 'PSPACE':'/theorems#s139',

};
const words=[...Object.keys(targets), ...Object.keys(theoremNames), ...Object.keys(definitionTerms)].sort((a,b)=>b.length-a.length);
const pattern=new RegExp('\\b('+words.join('|')+')\\b','gi');
function linked(text:string,current:string){
  const seen=new Set<string>();
  return text.split(pattern).map((part,i)=>{
    const key=words.find(w=>w.toLowerCase()===part.toLowerCase());
    if (!key) return part;
    if (key === 'Main Theorems section' && current.endsWith('#s12')) return <ProofButton key={i} id="theorem-s139">{part}</ProofButton>;
    const proof = theoremNames[key] ?? (targets[key]?.startsWith('/theorems#') ? targets[key].split('#')[1] : undefined);
    const entry = proof ? 'theorem-'+proof : definitionTerms[key.toLowerCase()];
    if (entry) {
      if (current === entry || seen.has(entry)) return part;
      seen.add(entry);
      return <ProofButton key={i} id={entry}>{part}</ProofButton>;
    }
    if(targets[key]===current||seen.has(key))return part;
    seen.add(key);return <Link key={i} href={targets[key]}>{part}</Link>;
  });
}
export function MathText({tex,display=false}:{tex:string,display?:boolean}){
  return <span className={display?'display-math':'inline-math'} dangerouslySetInnerHTML={{__html:katex.renderToString(tex,{displayMode:display,throwOnError:true,strict:'error'})}}/>
}
function inline(s:string,current:string){return s.split(/(\$[^$]+\$)/g).map((v,i)=>v.startsWith('$')?<MathText key={i} tex={v.slice(1,-1)}/>:<span key={i}>{linked(v,current)}</span>)}

const nodes=[['P',64,98,'/theorems#s122'],['BPP',190,42,'/theorems#s125'],['EQP',190,154,'/classes#s86'],['BQP',330,98,'/classes#s81'],['PSPACE',500,42,'/theorems#s139'],['QMA',500,154,'/classes#s93'],['NP',330,220,'/theorems#s135']] as const;
const edges=[[0,1],[0,2],[1,3],[2,3],[3,4],[3,5],[6,5]];
export function Containments(){return <figure className="graph"><figcaption>Known containments <small>A → B means A ⊆ B</small></figcaption><svg viewBox="0 0 580 252" aria-label="Containment graph"><defs><marker id="tip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10" fill="#56735d"/></marker></defs>
{edges.map(([a,b])=>{const [,x,y]=nodes[a], [,u,v]=nodes[b];const k=41/(u-x);return <line key={a+'-'+b} x1={x+40} x2={u-41} y1={y+(v-y)*k} y2={v-(v-y)*k} stroke="#56735d" strokeWidth="2" markerEnd="url(#tip)"/>})}
{nodes.map(([name,x,y,href])=>{
  const shape=<><rect x={x-40} y={y-20} width="80" height="40" rx="9" fill={name==='BQP'?'#c5e98e':'#fff'} stroke="#819986"/><text x={x} y={y+6} textAnchor="middle" fill="#193b2d" fontSize="17">{name}</text></>;
  const id = definitionTerms[name.toLowerCase()] ?? 'theorem-'+href.split('#')[1];
  return <ProofNode key={name} id={id} label={'Read about '+name}>{shape}</ProofNode>;
})}</svg></figure>}
export function Block({value,current}:{value:string,current:string}){
  if(value==='@creator')return <Link href="/circuit-creator">Open the circuit creator</Link>;
  const gate = gates.find(name => value === '@gate:'+name);
  if(gate)return <GateLab gate={gate}/>;
  if(value==='@parallel')return <ParallelGates/>;
  if(value==='@paths')return <HadamardPaths/>;
  if(value==='@roadmap')return <nav className="course-steps" aria-label="Course roadmap">{chapters.slice(1).map(c=><Link key={c.slug} href={'/'+c.slug}>{c.title}</Link>)}</nav>;
  if(value.startsWith('@aside\n')){
    const [,heading,...rows] = value.split('\n');
    return <details><summary>{heading}</summary>{rows.map((row,i)=><Block key={i} value={row} current={current}/>)}</details>;
  }
  if (/^(Source for|Reference:|References for|Reference for)/.test(value)) {
    return <p className="lesson-source">{value.split(/(https:\/\/[^\s;]+)/g).map((part,i)=>part.startsWith('https://')?<a href={part} key={i} aria-label={'Open source at '+new URL(part).hostname}>View source</a>:part)}</p>;
  }
  if(value==='@circuit')return <CircuitLab/>;
  if(value==='@containments')return <Containments/>;
  if(value.startsWith('$$'))return <MathText display tex={value.slice(2,-2)}/>;
  if(value.startsWith('```'))return <pre>{value.slice(3,-3)}</pre>;
  if(value.startsWith('Proof: '))return <ProofButton id="s23" className="proof-action">Proof of entanglement</ProofButton>;
  if(value.startsWith('### '))return <h3>{linked(value.slice(4),current)}</h3>;
  if(value.startsWith('Aside: '))return <details><summary>Aside · Complex amplitudes</summary><p>{inline(value.slice(7),current)}</p></details>;
  if(/^(Definition|Def):/.test(value))return <div className="definition">{definitionBlocks.has(value) && current !== definitionBlocks.get(value) ? <ProofButton id={definitionBlocks.get(value)!} className="eyebrow proof-link">Definition</ProofButton> : <span className="eyebrow">DEFINITION</span>}<p>{inline(value.replace(/^(Definition|Def): /,''),current)}</p></div>;
  return <p>{inline(value,current)}</p>;
}
