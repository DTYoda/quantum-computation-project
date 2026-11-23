'use client';

import { basis, inputs, type Input } from '@/lib/quantum';

export function InputPicker({ values, onChange }: { values: Input[]; onChange: (next: Input[]) => void }) {
  return <div className="q-inputs">{values.map((value, q) =>
    <label key={q}>q{q} input <select value={value} onChange={e => onChange(values.map((old, i) => i === q ? e.target.value as Input : old))}>
      {inputs.map(v => <option key={v} value={v}>|{v}⟩</option>)}
    </select></label>
  )}</div>;
}

function number(value: number, decimals = 3) {
  return String(Number(value.toFixed(decimals)));
}

export function StateChart({ state, before }: { state: number[]; before?: number[] }) {
  const count = Math.log2(state.length);
  return <table className="q-chart"><caption className="q-sr">Computational-basis amplitudes and measurement probabilities in q0-first order</caption>
    <thead><tr><th>Basis</th>{before && <th>Input α</th>}<th>{before ? 'Output α' : 'Amplitude'}</th><th>Probability</th></tr></thead>
    <tbody>{state.map((v, i) => <tr key={i}>
      <th scope="row">|{basis(i, count)}⟩</th>{before && <td>{number(before[i])}</td>}<td>{number(v)}</td>
      <td><span className="q-bar"><i style={{ width: Math.min(100, v*v*100)+'%' }}/></span>{number(100*v*v, 1)}%</td>
    </tr>)}</tbody>
  </table>;
}
