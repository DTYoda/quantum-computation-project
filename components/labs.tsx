'use client';

import { useState } from 'react';
import { apply, operation, productState } from '@/lib/quantum';
import { StateChart } from './quantum-controls';

// Orthographic projection of a unit sphere tilted toward the reader.
function project(theta: number, phi: number) {
  const x = Math.sin(theta) * Math.cos(phi);
  const y = Math.sin(theta) * Math.sin(phi);
  const z = Math.cos(theta);
  return [185 + 102 * (.82 * x - .572 * y), 132 - 102 * (.92 * z - .392 * (.572 * x + .82 * y))];
}
function curve(point: (t: number) => number[]) {
  return Array.from({length: 101}, (_, i) => point(i / 100).map(n => n.toFixed(2)).join(',')).join(' ');
}
const grid = [
  ...Array.from({length: 17}, (_, i) => curve(t => project((i+1)*Math.PI/18, t*2*Math.PI))),
  ...Array.from({length: 28}, (_, i) => curve(t => project(t*Math.PI, i*Math.PI/14))),
];

export function StateLab() {
  const [angle, setAngle] = useState(60);
  const [count, setCount] = useState(1);
  const [jointAngle, setJointAngle] = useState(90);
  const [correlate, setCorrelate] = useState(true);
  const halfAngle = jointAngle * Math.PI / 360;
  const first = [Math.cos(halfAngle), Math.sin(halfAngle)];
  const factors = Array.from({length:count}, (_, q) => q === 0 || !correlate ? first : [1, 0]);
  let joint = productState(factors);
  if (correlate) {
    for (let q = 1; q < count; q++) joint = apply(joint, operation('CNOT', q, count));
  }
  const [x,y] = project(angle*Math.PI/180,0);
  const zero = Math.round(100*Math.cos(angle*Math.PI/360)**2);
  return <section className="instrument" aria-label="Interactive state explorer">
    <div className="instrument-head"><span className="led"/> State explorer <label className="q-count"><select aria-label="System size" value={count} onChange={e => setCount(Number(e.target.value))}>
      {[1,2,3].map(n => <option key={n} value={n}>{n} qubit{n>1?'s':''}</option>)}</select></label></div>
    {count === 1 ? <><svg viewBox="0 0 370 260" className="sphere" role="img" aria-label={'Bloch sphere, polar angle '+angle+' degrees, phase zero'}>
      <defs><radialGradient id="globe"><stop stopColor="#22694e"/><stop offset="1" stopColor="#0c2e26"/></radialGradient></defs>
      <circle cx="185" cy="132" r="102" fill="url(#globe)" />
      {grid.map((points,i)=><polyline key={i} points={points} fill="none" stroke="#87e5ad" strokeOpacity=".32" strokeWidth=".78"/>)}
      <path d="M185 13V246 M65 169L306 95" stroke="#a0e8c3" strokeOpacity=".52" strokeDasharray="3 5"/>
      <g fill="#c1fbd6" fontFamily="monospace" fontSize="14"><text x="194" y="20">|0⟩</text><text x="194" y="250">|1⟩</text></g>
      <line x1="185" y1="132" x2={x} y2={y} stroke="#daff85" strokeWidth="3"/><circle cx="185" cy="132" r="3" fill="#daff85"/><circle cx={x} cy={y} r="11" fill="#d6ff75" opacity=".24"/><circle cx={x} cy={y} r="5" fill="#deff8f"/>
    </svg>
    <div className="dial"><label htmlFor="angle">Polar angle θ <output>{angle}°</output></label><input id="angle" type="range" min="0" max="180" value={angle} onChange={e=>setAngle(Number(e.target.value))}/>
    <div className="readouts"><span>P(0) <b>{zero}%</b></span><span>P(1) <b>{100-zero}%</b></span></div></div>
    </> : <div className="joint">
      <div className="joint-mode"><button aria-pressed={correlate} onClick={() => setCorrelate(true)}>{count===2?'Bell family':'GHZ family'}</button>
        <button aria-pressed={!correlate} onClick={() => setCorrelate(false)}>Product states</button></div>
      <StateChart state={joint}/>
      <div className="dial"><label htmlFor="joint-angle">{correlate?'q0 preparation angle':'Angle on each qubit'} θ <output>{jointAngle}°</output></label>
      <input id="joint-angle" type="range" min="0" max="360" value={jointAngle} onChange={e=>setJointAngle(Number(e.target.value))}/>
      <small>{correlate ? 'Rotate q0, then CNOT from q0 to each other wire.' : 'Apply the same Y rotation to each zero-state qubit.'}</small></div>
    </div>}
  </section>;
}

const steps=['Initialize','Hadamard','CNOT','Measure'];
export function CircuitLab(){
  const [step,setStep]=useState(0);
  const [sample,setSample]=useState(0);
  function advance(n:number){if(n===3)setSample(Math.random()<.5?0:3);setStep(n)}
  const distribution=step===0?[1,0,0,0]:step===1?[.5,0,.5,0]:step===2?[.5,0,0,.5]:[0,1,2,3].map(i=>Number(sample===i));
  return <div className="lab"><strong>Bell circuit</strong>
    <svg viewBox="0 0 420 104" role="img" aria-label="Two zero-state inputs. Hadamard on the first qubit, then controlled NOT targeting the second.">
    <g stroke="currentColor" strokeWidth="2" fill="none"><path d="M55 30H390 M55 80H390 M255 30V80"/><circle cx="255" cy="80" r="12"/><rect x="109" y="12" width="36" height="36" rx="4" fill={step>=1?'#c9ea8d':'#fff'}/><circle cx="255" cy="30" r="5" fill={step>=2?'#386b45':'currentColor'}/></g>
    <g fill="currentColor" fontSize="20"><text x="119" y="37">H</text><text x="9" y="36">|0⟩</text><text x="9" y="86">|0⟩</text></g></svg>
    <div className="step-buttons">{steps.map((s,i)=><button key={s} aria-pressed={i===step} onClick={()=>advance(i)}>{s}</button>)}</div>
    <div className="distribution" aria-live="polite">{distribution.map((p,i)=><div key={i}><small>|{i.toString(2).padStart(2,'0')}⟩</small><b>{100*p}%</b><meter min="0" max="1" value={p} aria-label={'Probability of '+i.toString(2).padStart(2,'0')}/></div>)}</div>
  </div>
}
