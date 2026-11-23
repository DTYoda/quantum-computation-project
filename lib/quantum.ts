// q0 is the leftmost bit in each basis label. These gates and inputs have real amplitudes.
export const inputs = ['0', '1', '+', '−'] as const;
export type Input = typeof inputs[number];
export const gates = ['X', 'H', 'CNOT', 'Toffoli'] as const;
export type Gate = typeof gates[number];
export type Operation = { gate: Gate; target: number; controls: number[] };
export const arity: Record<Gate, number> = { X: 1, H: 1, CNOT: 2, Toffoli: 3 };

export function operation(gate: Gate, target: number, count: number): Operation {
  const others = Array.from({ length: count }, (_, q) => q).filter(q => q !== target);
  return { gate, target, controls: others.slice(0, arity[gate] - 1) };
}

export function productState(factors: number[][]): number[] {
  return factors.reduce((state, [a, b]) => state.flatMap(v => [v * a, v * b]), [1]);
}

export function prepare(values: Input[]) {
  const h = Math.SQRT1_2;
  const vectors: Record<Input, number[]> = { '0': [1, 0], '1': [0, 1], '+': [h, h], '−': [h, -h] };
  return productState(values.map(value => vectors[value]));
}

export function apply(state: number[], op: Operation) {
  const count = Math.log2(state.length);
  const mask = (q: number) => 1 << (count - q - 1);
  const targetBit = mask(op.target);
  const controlBits = op.controls.reduce((bits, q) => bits | mask(q), 0);
  const result = [...state];
  for (let i = 0; i < state.length; i++) {
    if ((i & targetBit) || (i & controlBits) !== controlBits) continue;
    const j = i | targetBit;
    const [a, b] = [state[i], state[j]];
    if (op.gate === 'H') {
      result[i] = (a + b) * Math.SQRT1_2;
      result[j] = (a - b) * Math.SQRT1_2;
    } else {
      result[i] = b;
      result[j] = a;
    }
  }
  return result;
}

export function basis(index: number, count: number) {
  return index.toString(2).padStart(count, '0');
}
