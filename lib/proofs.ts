import chapters from '@/content/chapters.json';

export const proofStarts:Record<string,number> = {s122:1, s125:1, s135:1, s139:11, s171:1};
export const theoremNames:Record<string,string> = {
  'P ⊆ BPP':'classical-bounded', 'P ⊆ EQP':'s122', 'BPP ⊆ BQP':'s125', 'NP ⊆ QMA':'s135', 'BQP ⊆ PSPACE':'s139',
  'EQP ⊆ BQP':'exact-bounded', 'BQP ⊆ QMA':'ignore-witness', 'No-cloning theorem':'s171',
};

export function proofArticles() {
  return chapters.flatMap(c => c.sections.flatMap(section => {
    const {id, title, blocks} = section;
    const current = '/'+c.slug+'#'+id;
    if (id in proofStarts) {
      const end = id === 's171' ? blocks.length - 1 : blocks.length;
      return [{id,title,blocks:blocks.slice(proofStarts[id],end),current}];
    }
    if (id==='s23') return [{id,title:'Proof of entanglement',current,blocks:blocks.slice(1,-1).map(b => b.replace(/^Proof: /,''))}];
    if (id==='s86') return [{id:'exact-bounded',title:'EQP ⊆ BQP',blocks:[blocks[3].slice(0,blocks[3].indexOf(' But does')).replace(/^We can imagine.*? We can see clearly that /,'')],current}];
    if (id==='s93') return [{id:'ignore-witness',title:'BQP ⊆ QMA',blocks:[blocks[5].split(' We also know')[0]],current}];
    return [];
  }));
}
