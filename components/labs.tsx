'use client';

import { useState } from 'react';
const steps=['Initialize','Hadamard','CNOT','Measure'];
export function CircuitLab(){
  const [step,setStep]=useState(0);
  const [sample,setSample]=useState(0);
  function advance(n:number){if(n===3)setSample(Math.random()<.5?0:3);setStep(n)}
  const distribution=step===0?[1,0,0,0]:step===1?[.5,0,.5,0]:step===2?[.5,0,0,.5]:[0,1,2,3].map(i=>Number(sample===i));
  return <div className="lab"><strong>Bell circuit</strong>
    <svg viewBox="0 0 420 104" role="img" aria-label="Two zero-state inputs. Hadamard on the first qubit, then controlled NOT targeting the second, then measure both wires.">
    <g stroke="currentColor" strokeWidth="2" fill="none"><path d="M55 30H390 M55 80H390 M255 30V80"/><circle cx="255" cy="80" r="12"/><rect x="109" y="12" width="36" height="36" rx="4" fill={step>=1?'#c9ea8d':'#fff'}/><circle cx="255" cy="30" r="5" fill={step>=2?'#386b45':'currentColor'}/></g>
    {[30,80].map(y=><g key={y} transform={`translate(355 ${y})`} stroke="currentColor" strokeWidth="2" fill="none">
      <rect x="-17" y="-15" width="34" height="30" rx="4" fill={step===3?'#c9ea8d':'#fff'}/><path d="M-10 5 A10 10 0 0 1 10 5 M0 5 L7 -6"/>
    </g>)}
    <g fill="currentColor" fontSize="20"><text x="119" y="37">H</text><text x="9" y="36">|0⟩</text><text x="9" y="86">|0⟩</text></g></svg>
    <div className="step-buttons">{steps.map((s,i)=><button key={s} aria-pressed={i===step} onClick={()=>advance(i)}>{s}</button>)}</div>
    <div className="distribution" aria-live="polite">{distribution.map((p,i)=><div key={i}><small>|{i.toString(2).padStart(2,'0')}⟩</small><b>{100*p}%</b><meter min="0" max="1" value={p} aria-label={'Probability of '+i.toString(2).padStart(2,'0')}/></div>)}</div>
  </div>
}
