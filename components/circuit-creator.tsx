'use client';

import { useRef, useState, type PointerEvent } from 'react';
import { apply, arity, basis, gates, operation, prepare, type Gate, type Input, type Operation } from '@/lib/quantum';
import { InputPicker, StateChart } from './quantum-controls';

type Circuit = { inputs: Input[]; ops: Operation[] };
const examples: Record<string, Circuit> = {
  'Bit flip': { inputs: ['0'], ops: [operation('X', 0, 1)] },
  'Interference': { inputs: ['0'], ops: [operation('H', 0, 1), operation('H', 0, 1)] },
  'Bell pair': { inputs: ['0','0'], ops: [operation('H', 0, 2), operation('CNOT', 1, 2)] },
  'Reversible AND': { inputs: ['1','1','0'], ops: [operation('Toffoli', 2, 3)] },
};
type Drag = { gate: Gate } | { index: number };

export function CircuitCreator() {
  const [circuit, setCircuit] = useState<Circuit>(examples['Bell pair']);
  const [step, setStep] = useState(2);
  const [tool, setTool] = useState<Gate>('H');
  const gesture = useRef<{ source: Drag; x: number; y: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [hover, setHover] = useState<string | null>(null);
  const [sample, setSample] = useState<string | null>(null);
  const { inputs, ops } = circuit;
  const count = inputs.length;
  const active = ops[step - 1];
  const state = ops.slice(0, step).reduce(apply, prepare(inputs));

  function update(next: Circuit, cursor: number) {
    setCircuit(next);
    setStep(cursor);
    setSample(null);
    setHover(null);
    if (arity[tool] > next.inputs.length) setTool('H');
  }
  function inspect(cursor: number) {
    setStep(cursor);
    setSample(null);
  }
  function place(source: Drag, column: number, wire: number) {
    const next = [...ops];
    let position = column;
    let op: Operation;
    if ('index' in source) {
      const original = next[source.index];
      if (!original) return;
      next.splice(source.index, 1);
      if (source.index < column) position--;
      // Swapping wire roles preserves a custom control when a gate is moved.
      op = { ...original, target: wire, controls: original.controls.map(q => q === wire ? original.target : q) };
    } else {
      if (arity[source.gate] > count) return;
      op = operation(source.gate, wire, count);
    }
    next.splice(position, 0, op);
    update({ inputs, ops: next }, position + 1);
  }
  function startDrag(event: PointerEvent, source: Drag) {
    if (event.button !== 0 || !event.isPrimary) return;
    suppressClick.current = false;
    gesture.current = { source, x: event.clientX, y: event.clientY, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function dropCell(event: PointerEvent) {
    return document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLButtonElement>('[data-cell]');
  }
  function moveDrag(event: PointerEvent) {
    const current = gesture.current;
    if (!current || !event.isPrimary) return;
    if (Math.hypot(event.clientX-current.x, event.clientY-current.y) > 4) current.moved = true;
    if (current.moved) setHover(dropCell(event)?.dataset.cell ?? null);
  }
  function finishDrag(event: PointerEvent) {
    const current = gesture.current;
    if (!current || !event.isPrimary) return;
    gesture.current = null;
    setHover(null);
    if (!current.moved) return;
    suppressClick.current = true;
    const cell = dropCell(event)?.dataset.cell;
    if (cell) {
      const [column, wire] = cell.split('-').map(Number);
      place(current.source, column, wire);
    }
  }
  function measure() {
    let threshold = Math.random();
    let outcome = state.findLastIndex(v => v*v > 0);
    for (let i = 0; i < state.length; i++) {
      threshold -= state[i] ** 2;
      if (threshold < 0) { outcome = i; break; }
    }
    setSample('|'+basis(outcome, count)+'⟩');
  }
  return <div className="lab builder" onPointerMove={moveDrag} onPointerUp={finishDrag}
    onPointerCancel={() => { gesture.current = null; setHover(null); }}
    onClickCapture={e => { if (suppressClick.current) { suppressClick.current = false; if (e.detail) e.stopPropagation(); } }}>
    <label className="q-label">Load example <select value="" onChange={e => {
      const next = examples[e.target.value];
      update(next, 0);
    }}><option value="" disabled>Choose a circuit…</option>{Object.keys(examples).map(name => <option key={name}>{name}</option>)}</select></label>
    <div className="q-settings"><label className="q-label">Wires <select value={count} onChange={e => {
      const size = Number(e.target.value);
      const retained = ops.filter(op => [op.target, ...op.controls].every(q => q < size));
      update({ inputs: Array.from({length:size}, (_, i) => inputs[i] ?? '0'), ops: retained }, retained.length);
    }}>{[1,2,3].map(n => <option key={n}>{n}</option>)}</select></label>
    <InputPicker values={inputs} onChange={next => update({inputs:next, ops}, step)}/></div>
    <div className="q-heading"><strong>Gate palette</strong><button disabled={!ops.length} onClick={() => update({inputs,ops:[]},0)}>Clear gates</button></div>
    <div className="q-palette">{gates.map(g => <button key={g} disabled={arity[g] > count} aria-pressed={tool === g}
      onPointerDown={e => startDrag(e, {gate:g})}
      onClick={() => setTool(g)}>{g}</button>)}</div>
    <p className="q-hint">Drag a gate onto its target wire, or select a gate and click +. Drop on a step to insert before it. Select a step to inspect or edit it.</p>
    <div className="q-scroll"><div className="q-board" style={{gridTemplateColumns:'42px repeat('+ (ops.length+1) +', minmax(46px, 1fr))'}}>
      <span/>{ops.map((_,i) => <button key={i} className="q-column" aria-label={'Inspect step '+(i+1)} aria-pressed={step===i+1} onClick={() => inspect(i+1)}>{i+1}</button>)}<small>ADD</small>
      {inputs.map((_,q) => <Wire key={q} wire={q} ops={ops} step={step} hover={hover} onInspect={i => inspect(i+1)} onPlace={i => place({gate:tool},i,q)}
        onDrag={startDrag}/>)}
    </div></div>
    {active && <div className="q-inspector"><strong>Step {step} · {active.gate}</strong>
      <label>Target <select value={active.target} onChange={e => place({index:step-1},step-1,Number(e.target.value))}>{inputs.map((_,q) => <option key={q} value={q}>q{q}</option>)}</select></label>
      {active.gate==='CNOT' && <label>Control <select value={active.controls[0]} onChange={e => update({inputs, ops:ops.map((op,i) => i===step-1?{...op,controls:[Number(e.target.value)]}:op)},step)}>
        {inputs.map((_,q) => q !== active.target && <option key={q} value={q}>q{q}</option>)}</select></label>}
      <button disabled={step===1} onClick={() => place({index:step-1},step-2,active.target)}>Earlier</button>
      <button disabled={step===ops.length} onClick={() => place({index:step-1},step+1,active.target)}>Later</button>
      <button onClick={() => update({inputs, ops:ops.filter((_,i) => i!==step-1)}, step-1)}>Remove</button>
    </div>}
    <div className="q-heading q-output"><strong>{step ? 'State after step '+step : 'Input state'}</strong><small>{step} / {ops.length}</small></div>
    <div className="q-actions"><button disabled={step===0} onClick={() => inspect(step-1)}>Previous step</button>
      <button disabled={step===ops.length} onClick={() => inspect(step+1)}>Next step</button>
      <button disabled={step===ops.length} onClick={() => inspect(ops.length)}>Run to end</button></div>
    <StateChart state={state}/>
    <div className="q-actions"><button onClick={measure}>Sample measurement</button><output aria-live="polite">{sample && 'Measured '+sample}</output></div>
  </div>;
}

function Wire({wire,ops,step,hover,onInspect,onPlace,onDrag}:{
  wire:number; ops:Operation[]; step:number; hover:string|null; onInspect:(i:number)=>void;
  onPlace:(i:number)=>void; onDrag:(event:PointerEvent,source:Drag)=>void;
}) {
  return <><span className="q-wire-label">q{wire}</span>{[...ops,undefined].map((op,i) => {
    const target = op?.target === wire;
    const control = op?.controls.includes(wire);
    const wires = op ? [op.target,...op.controls] : [];
    const above = wire > Math.min(...wires) && wire <= Math.max(...wires);
    const below = wire >= Math.min(...wires) && wire < Math.max(...wires);
    const label = op ? 'Step '+(i+1)+', '+op.gate+', q'+wire+(target?' target':control?' control':'') : 'Add gate on q'+wire;
    return <button key={i} aria-label={label} className={'q-cell'+(above?' above':'')+(below?' below':'')+(step===i+1 && op?' current':'')}
      data-cell={i+'-'+wire} data-hover={hover===i+'-'+wire}
      onPointerDown={e => { if(op && (target || control))onDrag(e,{index:i}); }}
      onClick={() => op ? onInspect(i) : onPlace(i)}>
      {target ? <b>{op!.controls.length?'⊕':op!.gate}</b> : control ? <b className="control-dot">●</b> : !op ? <b className="add-gate">+</b> : null}
    </button>;
  })}</>;
}
