'use client';

import { useState } from 'react';

export function ParallelGates() {
  const [a,setA] = useState(false);
  const [b,setB] = useState(false);
  const out = Number(!a && !b);
  return <figure className="concept-lab">
    <figcaption>Parallel gates <small>Size 3 · Depth 2</small></figcaption>
    <div className="step-buttons"><button aria-pressed={a} onClick={()=>setA(!a)}>Input a = {Number(a)}</button>
      <button aria-pressed={b} onClick={()=>setB(!b)}>Input b = {Number(b)}</button></div>
    <svg viewBox="0 0 430 130" role="img" aria-label={`Two parallel NOT gates feed an AND gate. Output ${out}.`}>
      <g fill="none" stroke="currentColor" strokeWidth="2"><path d="M40 42H95 M40 92H95 M152 42H205V57H262 M152 92H205V77H262 M327 67H385"/></g>
      <g fill="#e6f1d8" stroke="#588366"><rect x="95" y="25" width="57" height="34" rx="6"/><rect x="95" y="75" width="57" height="34" rx="6"/><rect x="262" y="47" width="65" height="40" rx="6"/></g>
      <g textAnchor="middle" fill="currentColor" fontSize="17"><text x="25" y="47">{Number(a)}</text><text x="25" y="97">{Number(b)}</text><text x="124" y="48">NOT</text><text x="124" y="98">NOT</text><text x="180" y="36">{Number(!a)}</text><text x="180" y="110">{Number(!b)}</text><text x="295" y="73">AND</text><text x="398" y="73">{out}</text></g>
    </svg>
    <output aria-live="polite">¬a ∧ ¬b = {out}</output>
  </figure>;
}

export function HadamardPaths() {
  const [end,setEnd] = useState(1);
  const second = end ? '−½' : '+½';
  return <figure className="concept-lab paths">
    <figcaption>Two Hadamard gates <small>Input |0⟩</small></figcaption>
    <div className="step-buttons" aria-label="Inspect an output">{[0,1].map(i=><button key={i} aria-pressed={i===end} onClick={()=>setEnd(i)}>Output |{i}⟩</button>)}</div>
    <svg viewBox="0 0 440 160" role="img" aria-label={`Paths through zero and one contribute plus one half and ${end?'minus':'plus'} one half to output ${end}.`}>
      <g strokeWidth="3" fill="none"><path d="M56 82 Q112 82 165 39 H245 Q294 39 378 82" stroke="#9cdb95"/><path d="M56 82 Q112 82 165 125 H245 Q294 125 378 82" stroke={end?'#ebb08d':'#9cdb95'}/></g>
      <g fill="#163c30" stroke="#98ba9c">{[[55,82],[210,39],[210,125],[380,82]].map(([x,y])=><rect key={x+','+y} x={x-25} y={y-17} width="50" height="34" rx="8"/>)}</g>
      <g fill="#eff8e8" textAnchor="middle" fontSize="17"><text x="55" y="88">|0⟩</text><text x="210" y="45">|0⟩</text><text x="210" y="131">|1⟩</text><text x="380" y="88">|{end}⟩</text><text x="295" y="36">+½</text><text x="295" y="140">{second}</text><text x="126" y="88">H</text><text x="303" y="88">H</text></g>
    </svg>
    <output aria-live="polite">Amplitude: ½ {end?'−':'+'} ½ = {1-end} <span>P({end}) = {end?'0':'100'}%</span></output>
  </figure>;
}
