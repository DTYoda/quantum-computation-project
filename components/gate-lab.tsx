'use client';

import { useState } from 'react';
import { apply, arity, operation, prepare, type Gate, type Input } from '@/lib/quantum';
import { InputPicker, StateChart } from './quantum-controls';

export function GateLab({ gate }: { gate: Gate }) {
  const count = arity[gate];
  const [values, setValues] = useState<Input[]>(Array.from({length: count}, (_, q) => q < count-1 ? '1' : '0'));
  const before = prepare(values);
  const op = operation(gate, count-1, count);
  return <div className="lab gate-lab">
    <div className="q-heading"><strong>Try {gate}</strong><small>{op.controls.map(q => 'q'+q).join(', ')}{op.controls.length ? ' control · ' : ''}q{op.target} target</small></div>
    <InputPicker values={values} onChange={setValues}/>
    <StateChart before={before} state={apply(before, op)}/>
  </div>;
}
