import Link from 'next/link';
import {notFound} from 'next/navigation';
import chapters from '@/content/chapters.json';
import { ProofReader, ProofButton } from '@/components/proof-reader';
import { proofArticles, proofStarts } from '@/lib/proofs';
import { definitions, definitionHeadings } from '@/lib/definitions';
import {Block} from '@/components/reader';
export const dynamicParams=false;
export function generateStaticParams(){return chapters.map(c=>({section:c.slug}))}
type Props={params:Promise<{section:string}>};
export async function generateMetadata({params}:Props){const {section}=await params;return {title:chapters.find(c=>c.slug===section)?.title}}
export default async function Chapter({params}:Props){
  const {section}=await params;
  const index=chapters.findIndex(c=>c.slug===section);
  const c=chapters[index];if(!c)notFound();
  const next=chapters[index+1];
  const articles:Record<string,{title:string; kind:string; body:React.ReactNode}> = {};
  articles['theorem-classical-bounded'] = {title:'P ⊆ BPP',kind:'Theorem',body:null};
  for (const {id,title,blocks} of definitions) {
    articles[id] = {title,kind:'Definition',body:blocks.map((value,i)=><Block key={i} value={value} current={id}/>)};
  }
  for (const {id,title,blocks} of proofArticles()) {
    articles[id] = {title,kind:'Proof',body:blocks.map((value,i)=><Block key={i} value={value} current={id}/>)};
    if (id === 's23') continue;
    const theorem = 'theorem-'+id;
    const statement = id==='s171' ? blocks.at(-1)! : blocks[0];
    articles[theorem] = {title,kind:'Theorem',body:<><Block value={statement} current={theorem}/>
      <ProofButton id={id} className="proof-action">{id==='s139'?'Read the proof so far':'Read the proof'}</ProofButton></>};
  }
  function headingEntry(id:string) {
    return id in proofStarts ? 'theorem-'+id : definitionHeadings[id];
  }
  return <ProofReader key={c.slug} articles={articles}><article className="wrap"><div className="eyebrow"><Link href="/#chapters">CHAPTER INDEX</Link> / {String(index+1).padStart(2,'0')} OF 06</div><h1>{c.title}</h1><div className="chapter-layout"><div className="reading">
  {!c.sections.length&&<p className="placeholder">Motivation · Awaiting author’s draft</p>}
  {c.sections.map(s=>{
    const cut=proofStarts[s.id]??s.blocks.length;
    function render(start:number,end:number){return s.blocks.slice(start,end).map((v,i)=><Block value={v} key={start+i} current={'/'+c.slug+'#'+s.id}/>)}
    return <section id={s.id} key={s.id}><h2>{headingEntry(s.id) ? <ProofButton id={headingEntry(s.id)} className="proof-heading">{s.title}</ProofButton> : s.title}</h2>{render(0,cut)}{cut<s.blocks.length&&<ProofButton id={s.id} className="proof-action">{s.id==='s139'?'Read the proof so far':'Read the proof'}</ProofButton>}{s.id==='s171'&&render(s.blocks.length-1,s.blocks.length)}{s.id==='s158'&&<small className="source"><Link href="/references#papers">Sources · Grover and Bennett et al.</Link></small>}</section>})}
  <div className="next-links"><Link href={index?'/'+chapters[index-1].slug:'/#chapters'}>Previous · {index?chapters[index-1].title:'Chapter index'}</Link><Link href={next?'/'+next.slug:'/references'}>Next · {next?.title??'References'}</Link></div></div>
  <aside><nav aria-label="On this page"><strong>On this page</strong>{c.sections.map(s=>headingEntry(s.id) ? <ProofButton key={s.id} id={headingEntry(s.id)}>{s.title}</ProofButton> : <a key={s.id} href={'#'+s.id}>{s.title}</a>)}<Link href="/#chapters">All chapters</Link></nav></aside></div></article></ProofReader>
}
