import chapters from '@/content/chapters.json';

// Each entry selects the author's definition and its accompanying equations.
type Entry = { section: string; title: string; rows: number[]; aliases?: string[]; select?: (text: string) => string };
const entries: Entry[] = [
  {section:'s0', title:'Qubit', rows:[2], aliases:['qubits']},
  {section:'s0', title:'Normalization condition', rows:[4]},
  {section:'s0', title:'Measurement', rows:[5], aliases:['measurements']},
  {section:'s12', title:'Multiple qubit system', rows:[5], select: text => text.split(' We can use')[0]},
  {section:'s12', title:'Tensor product', rows:[9,10,11]},
  {section:'s23', title:'Entanglement', rows:[0], aliases:['entangled']},
  {section:'s29', title:'Quantum gate', rows:[2,3], select: text => text.startsWith('$$') ? text : text.slice(text.indexOf('a matrix U')).split(' Equivalently')[0].replace(/^a/, 'A'), aliases:['quantum gates']},
  {section:'s35', title:'Pauli-X gate', rows:[0]},
  {section:'s38', title:'Hadamard gate', rows:[0], aliases:['Hadamard']},
  {section:'s41', title:'CNOT gate', rows:[1], aliases:['CNOT']},
  {section:'toffoli', title:'Toffoli gate', rows:[0,1], aliases:['Toffoli']},
  {section:'s45', title:'Quantum circuit', rows:[1], aliases:['quantum circuits']},
  {section:'s53', title:'Circuit size', rows:[1]},
  {section:'s53', title:'Circuit depth', rows:[2]},
  {section:'s57', title:'Ancilla qubits', rows:[2], select: text => text.slice(text.indexOf('We may also need')).split(' Then,')[0], aliases:['ancilla qubit']},
  {section:'s57', title:'Exact quantum computation', rows:[4,5], aliases:['exact computation']},
  {section:'s57', title:'Bounded-error quantum computation', rows:[7,8], select: text => text.replace(/^We can also allow error, in a way very similar to randomized computation\. /,''), aliases:['bounded-error computation']},
  {section:'s64', title:'Quantum circuit family', rows:[1], aliases:['quantum circuit families']},
  {section:'s64', title:'Deciding a language with bounded error', rows:[2,3,4]},
  {section:'s71', title:'Circuit family size', rows:[1]},
  {section:'s71', title:'Circuit family depth', rows:[2]},
  {section:'s75', title:'Uniform quantum circuit family', rows:[3], aliases:['uniform quantum circuit families','uniform circuit families','polynomial-time uniformity']},
  {section:'s81', title:'BQP', rows:[1]},
  {section:'s86', title:'EQP', rows:[1]},
  {section:'s93', title:'QMA', rows:[3]},
  {section:'s93', title:'NP', rows:[1]},
];
const sections = chapters.flatMap(c => c.sections);
export const definitions = entries.map(entry => {
  const section = sections.find(s => s.id === entry.section)!;
  return {...entry, id:'def-'+entry.title.toLowerCase().replaceAll(' ','-'), blocks:entry.rows.map(i=>entry.select ? entry.select(section.blocks[i]) : section.blocks[i])};
});
export const definitionTerms:Record<string,string> = Object.fromEntries(definitions.flatMap(d =>
  [d.title,...(d.aliases ?? [])].map(word => [word.toLowerCase(), d.id])
));
export const definitionBlocks = new Map(definitions.flatMap(d =>
  d.blocks.filter(b => /^(Definition|Def):/.test(b)).map(b => [b,d.id] as const)
));
export const definitionHeadings:Record<string,string> = {
  s0:definitionTerms.qubit, s12:definitionTerms['multiple qubit system'], s23:definitionTerms.entanglement,
  s29:definitionTerms['quantum gate'], s35:definitionTerms['pauli-x gate'], s38:definitionTerms.hadamard,
  s41:definitionTerms.cnot, toffoli:definitionTerms.toffoli, s45:definitionTerms['quantum circuit'],
  s64:definitionTerms['deciding a language with bounded error'], s75:definitionTerms['uniform quantum circuit family'],
  s81:definitionTerms.bqp, s86:definitionTerms.eqp, s93:definitionTerms.qma,
};
